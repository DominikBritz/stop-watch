# Setup Instructions - Next Steps

The Stopwatch application structure has been created! Here's what you need to do to get it running:

## Step 1: Install Rust

Rust is required to build the Tauri application.

**Windows Installation:**
1. Download rustup-init.exe from https://rustup.rs/
2. Run the installer
3. Follow the prompts (default options are fine)
4. Restart your terminal/command prompt

**Verify Installation:**
```bash
rustc --version
cargo --version
```

## Step 2: Install Project Dependencies

Once Rust is installed, run:

```bash
npm install
```

This will install the Tauri CLI and other dependencies.

## Step 3: Run the Application

### Development Mode (with hot-reload):
```bash
npm run dev
```

### Production Build:
```bash
npm run build
```

The executable will be in `src-tauri/target/release/`.

## What's Been Implemented

✅ **Frontend (HTML/CSS/JS)**
- Dark mode UI with clean, minimal design
- Time input field (HH:MM:SS format)
- Count up/down mode selector
- Large timer display
- Hover-activated pause and reset buttons
- Settings panel for notification toggle
- Smooth animations and transitions

✅ **Backend (Rust)**
- Tauri application setup
- System notification support
- Window configuration (500x700, resizable)

✅ **Features**
- Timer logic (count up and count down)
- Pause/Resume functionality
- Reset functionality
- Settings persistence (localStorage)
- Optional notifications on countdown completion

## Testing the Application

Once running, test these features:

1. **Count Down Mode**:
   - Enter "00:00:05" in the time input
   - Make sure "Count Down" is selected
   - Click "Start"
   - Watch it count down from 5 seconds
   - Hover over the timer to see pause/reset buttons

2. **Count Up Mode**:
   - Select "Count Up"
   - Click "Start"
   - Watch it count up from 00:00:00

3. **Pause/Resume**:
   - Start the timer
   - Hover and click pause (⏸)
   - Click pause again to resume

4. **Reset**:
   - Start the timer
   - Hover and click reset (↻)
   - Timer should return to initial value

5. **Notifications**:
   - Enable "Enable notifications" in settings
   - Set a short countdown (5 seconds)
   - Wait for completion - should show system notification

## Customization

### Change Window Size
Edit `src-tauri/tauri.conf.json`:
```json
"width": 500,
"height": 700
```

### Change Colors
Edit `src/styles.css`:
```css
:root {
    --bg-primary: #0d0d0d;
    --accent: #4a9eff;
    /* ... other variables */
}
```

### Add Icons
1. Create icons (see `src-tauri/icons/ICONS_README.txt`)
2. Place in `src-tauri/icons/` directory

## Troubleshooting

**Issue: "rustc: command not found"**
- Install Rust from https://rustup.rs/
- Restart terminal

**Issue: Build errors**
- Run `cargo clean` in `src-tauri/` directory
- Try `rustup update`
- Delete `node_modules/` and run `npm install` again

**Issue: Notifications not working**
- Check OS notification permissions
- Make sure the checkbox is enabled in settings
- Try running in production build (`npm run build`)

## Next Steps

1. Install Rust (if not done)
2. Run `npm install`
3. Run `npm run dev`
4. Test all features
5. Optionally add custom icons
6. Build for production with `npm run build`

Enjoy your minimal stopwatch application!
