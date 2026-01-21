Icon Placeholder Directory
==========================

This directory should contain the application icons in the following formats:

Required Icons:
- 32x32.png (32x32 pixels)
- 128x128.png (128x128 pixels)
- 128x128@2x.png (256x256 pixels)
- icon.ico (Windows icon, multi-resolution)
- icon.icns (macOS icon)

How to Generate Icons:
1. Create a single 1024x1024 PNG source image
2. Use an online tool or Tauri's icon generator:
   - Online: https://www.icoconverter.com/
   - Tauri CLI: `npm run tauri icon path/to/source.png`

For now, Tauri will use default icons if these are not provided.
You can add custom icons later before final distribution.
