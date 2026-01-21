# Stopwatch Application

A minimal, dark-themed stopwatch application built with Tauri and Rust.

## Features

- **Count Up/Down Modes**: Switch between counting up from zero or counting down from a set time
- **Clean Dark UI**: Minimal interface with smooth animations
- **Hover Controls**: Pause and reset buttons appear on hover over the timer
- **Notifications**: Optional system notifications when countdown completes
- **Cross-Platform**: Works on Windows, macOS, and Linux

## Prerequisites

Before you can build and run this application, you need to install:

1. **Rust** (required for Tauri)
   - Windows: Download and run [rustup-init.exe](https://rustup.rs/)
   - Follow the installation wizard
   - Restart your terminal after installation

2. **Node.js** (already installed - v22.13.0 detected)

3. **WebView2** (Windows only)
   - Usually pre-installed on Windows 10/11
   - If needed, download from [Microsoft Edge WebView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/)

## Installation

1. Install Rust from https://rustup.rs/ (if not already installed)

2. Install Node dependencies:
   ```bash
   npm install
   ```

3. Install Tauri CLI:
   ```bash
   npm install --save-dev @tauri-apps/cli@latest
   ```

## Development

Run the application in development mode:

```bash
npm run dev
```

This will start the Tauri development server with hot-reload enabled.

## Building

Create a production build:

```bash
npm run build
```

The built application will be in `src-tauri/target/release/`.

For Windows, you'll also get an installer in `src-tauri/target/release/bundle/`.

## Usage

1. **Set Time**: Enter the desired time in HH:MM:SS format (e.g., 00:05:00 for 5 minutes)
2. **Choose Mode**: Select either "Count Up" or "Count Down"
3. **Start**: Click the Start button to begin the timer
4. **Hover Controls**: Hover over the timer display to reveal pause (⏸) and reset (↻) buttons
5. **Notifications**: Enable/disable notifications in the settings section

## Project Structure

```
stop-watch/
├── src/                    # Frontend files
│   ├── index.html         # Main UI structure
│   ├── styles.css         # Dark mode styling
│   └── app.js             # Timer logic and interactions
├── src-tauri/             # Rust backend
│   ├── src/
│   │   └── main.rs        # Notification commands
│   ├── Cargo.toml         # Rust dependencies
│   └── tauri.conf.json    # Tauri configuration
└── package.json           # Node dependencies
```

## Icons

To add custom icons for your application:

1. Create icons in the following sizes:
   - 32x32.png
   - 128x128.png
   - 128x128@2x.png (256x256)
   - icon.ico (Windows)
   - icon.icns (macOS)

2. Place them in `src-tauri/icons/`

3. You can use [Tauri Icon Generator](https://tauri.app/v1/guides/features/icons/) or online tools to create icons from a single source image

## Troubleshooting

### Rust not found
- Make sure Rust is installed: `rustc --version`
- Restart your terminal after installing Rust
- Check that Cargo is in your PATH: `cargo --version`

### Build errors
- Try updating Rust: `rustup update`
- Clear the build cache: `cargo clean` in the `src-tauri` directory
- Delete `node_modules` and run `npm install` again

### Notifications not working
- Ensure notifications are enabled in your OS settings
- Check that the notification permission is granted to the application

## License

MIT
