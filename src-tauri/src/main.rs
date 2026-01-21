// Prevents additional console window on Windows in release builds
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
use tauri_plugin_notification::NotificationExt;

// Command to show notification
#[tauri::command]
async fn show_notification(
    app: tauri::AppHandle,
    title: String,
    message: String,
) -> Result<(), String> {
    app.notification()
        .builder()
        .title(title)
        .body(message)
        .show()
        .map_err(|e: tauri_plugin_notification::Error| e.to_string())?;

    Ok(())
}

// Command to set window decorations
#[tauri::command]
async fn set_decorations(window: tauri::Window, decorations: bool) -> Result<(), String> {
    window
        .set_decorations(decorations)
        .map_err(|e| e.to_string())?;
    Ok(())
}

// Command to set window size
#[tauri::command]
async fn set_window_size(window: tauri::Window, width: u32, height: u32) -> Result<(), String> {
    window
        .set_size(tauri::Size::Physical(tauri::PhysicalSize { width, height }))
        .map_err(|e| e.to_string())?;
    window.center().map_err(|e| e.to_string())?;
    Ok(())
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_notification::init())
        .invoke_handler(tauri::generate_handler![show_notification, set_decorations, set_window_size])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
