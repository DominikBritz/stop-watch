const { invoke } = window.__TAURI__ ? window.__TAURI__.core : { invoke: () => Promise.resolve() };

// State
let timerInterval = null;
let currentTime = 0; // in seconds
let initialTime = 0;
let isRunning = false;
let isPaused = false;
let mode = 'down'; // 'up' or 'down'

// DOM Elements
const timerDisplay = document.getElementById('timerDisplay');
const timeInput = document.getElementById('timeInput');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const modeUp = document.getElementById('modeUp');
const modeDown = document.getElementById('modeDown');
const notificationToggle = document.getElementById('notificationToggle');

// Initialize
function init() {
    loadSettings();
    updateDisplay();
    attachEventListeners();
    parseTimeInput();
}

// Load settings from localStorage
function loadSettings() {
    const notificationEnabled = localStorage.getItem('notificationEnabled');
    if (notificationEnabled !== null) {
        notificationToggle.checked = notificationEnabled === 'true';
    }
}

// Save settings to localStorage
function saveSettings() {
    localStorage.setItem('notificationEnabled', notificationToggle.checked);
}

// Attach event listeners
function attachEventListeners() {
    startBtn.addEventListener('click', handleStart);
    pauseBtn.addEventListener('click', handlePause);
    resetBtn.addEventListener('click', handleReset);

    modeUp.addEventListener('change', () => {
        mode = 'up';
        if (!isRunning) {
            resetTimer();
        }
    });

    modeDown.addEventListener('change', () => {
        mode = 'down';
        if (!isRunning) {
            resetTimer();
        }
    });

    timeInput.addEventListener('change', parseTimeInput);
    timeInput.addEventListener('blur', parseTimeInput);

    notificationToggle.addEventListener('change', saveSettings);
}

// Parse time input (HH:MM:SS format)
function parseTimeInput() {
    const value = timeInput.value.trim();
    const parts = value.split(':');

    if (parts.length === 3) {
        const hours = parseInt(parts[0]) || 0;
        const minutes = parseInt(parts[1]) || 0;
        const seconds = parseInt(parts[2]) || 0;

        initialTime = hours * 3600 + minutes * 60 + seconds;

        if (!isRunning) {
            resetTimer();
        }
    }
}

// Format time as HH:MM:SS
function formatTime(totalSeconds) {
    const hours = Math.floor(Math.abs(totalSeconds) / 3600);
    const minutes = Math.floor((Math.abs(totalSeconds) % 3600) / 60);
    const seconds = Math.abs(totalSeconds) % 60;

    const sign = totalSeconds < 0 ? '-' : '';

    return sign +
           String(hours).padStart(2, '0') + ':' +
           String(minutes).padStart(2, '0') + ':' +
           String(seconds).padStart(2, '0');
}

// Update display
async function updateDisplay() {
    timerDisplay.textContent = formatTime(currentTime);

    if (isRunning && !isPaused) {
        timerDisplay.classList.add('running');
        timerDisplay.classList.remove('paused');
        document.body.classList.add('minimal-mode');
        await resizeWindowMinimal();
    } else if (isPaused) {
        timerDisplay.classList.remove('running');
        timerDisplay.classList.add('paused');
        document.body.classList.add('minimal-mode');
        await resizeWindowMinimal();
    } else {
        timerDisplay.classList.remove('running', 'paused');
        document.body.classList.remove('minimal-mode');
        await resizeWindowNormal();
    }
}

// Resize window for minimal mode
async function resizeWindowMinimal() {
    try {
        if (window.__TAURI__) {
            await invoke('set_decorations', { decorations: false });
            await invoke('set_window_size', { width: 700, height: 150 });
        }
    } catch (error) {
        console.error('Failed to resize window:', error);
    }
}

// Resize window for normal mode
async function resizeWindowNormal() {
    try {
        if (window.__TAURI__) {
            await invoke('set_decorations', { decorations: true });
            await invoke('set_window_size', { width: 500, height: 700 });
        }
    } catch (error) {
        console.error('Failed to resize window:', error);
    }
}

// Handle start button
function handleStart() {
    if (isRunning) {
        return;
    }

    isRunning = true;
    isPaused = false;
    startBtn.textContent = 'Running';
    startBtn.disabled = true;

    startTimer();
}

// Start timer
function startTimer() {
    timerInterval = setInterval(() => {
        if (mode === 'down') {
            currentTime--;

            // Check if countdown completed
            if (currentTime <= 0) {
                currentTime = 0;
                stopTimer();
                handleCountdownComplete();
            }
        } else {
            currentTime++;
        }

        updateDisplay();
    }, 1000);

    updateDisplay();
}

// Stop timer
function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    isRunning = false;
    isPaused = false;
    startBtn.textContent = 'Start';
    startBtn.disabled = false;
    updateDisplay();
}

// Handle pause button
function handlePause() {
    if (!isRunning) {
        return;
    }

    if (isPaused) {
        // Resume
        isPaused = false;
        startTimer();
    } else {
        // Pause
        isPaused = true;
        clearInterval(timerInterval);
        timerInterval = null;
    }

    updateDisplay();
}

// Handle reset button
function handleReset() {
    resetTimer();
}

// Reset timer
function resetTimer() {
    stopTimer();

    if (mode === 'down') {
        currentTime = initialTime;
    } else {
        currentTime = 0;
    }

    updateDisplay();
}

// Play beep sound
function playBeep() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.value = 0.5;

        oscillator.start();

        // Beep 3 times
        setTimeout(() => { gainNode.gain.value = 0; }, 200);
        setTimeout(() => { gainNode.gain.value = 0.5; }, 300);
        setTimeout(() => { gainNode.gain.value = 0; }, 500);
        setTimeout(() => { gainNode.gain.value = 0.5; }, 600);
        setTimeout(() => { gainNode.gain.value = 0; }, 800);
        setTimeout(() => {
            oscillator.stop();
            audioContext.close();
        }, 900);
    } catch (error) {
        console.error('Failed to play beep:', error);
    }
}

// Handle countdown complete
async function handleCountdownComplete() {
    // Flash the display
    timerDisplay.style.color = '#ff4444';
    setTimeout(() => { timerDisplay.style.color = ''; }, 500);

    if (notificationToggle.checked) {
        // Play beep sound
        playBeep();
    }
}

// Initialize on load
init();
