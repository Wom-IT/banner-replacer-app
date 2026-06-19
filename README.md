# Banner Replacer

A modern, responsive web application for managing signature banners in Azure Blob Storage. Upload, archive, and replace banners with a clean, intuitive interface.

## Features

- 📸 **Banner Preview** - View the current banner in real-time
- 📤 **Easy Upload** - Drag & drop or click to upload new banners
- 📦 **Auto Archive** - Automatically archive the old banner before replacing
- 🔒 **SAS Token Auth** - Secure authentication using Azure SAS tokens
- ✨ **Responsive Design** - Works on desktop and mobile devices
- 🎨 **Beautiful UI** - Modern gradient design with smooth interactions

## Setup

1. Update the configuration in `index.html`:
   - `storageAccount` - Your Azure Storage Account name
   - `container` - Your blob container name
   - `sasToken` - Your SAS token for authentication
   - `bannerName` - The name of the banner blob
   - `archiveFolder` - Folder path for archived banners

2. Open `index.html` in a web browser (served over HTTP/HTTPS, not file://)

3. Upload a new banner image (PNG or JPG recommended: 1920x400px)

## Usage

1. **View Current Banner** - The app loads and displays your current banner
2. **Upload New Banner** - Select or drag-drop a new image
3. **Review Preview** - See how the new banner will look
4. **Replace** - Click "Replace Banner" and confirm
5. **Archive** - Your old banner is automatically archived before replacement

## Branches

- **master** - Production code without test features
- **testing** - Includes test mode for safe testing (uses test-banner.png)

## Test Mode (testing branch only)

Enable test mode to safely test all operations without affecting the production banner:

- Uses `test-banner.png` instead of `wide-banner.png`
- Archives to `test-archives/` instead of `not-in-use/`
- Logs detailed operation information to browser console
- Perfect for verifying upload, archive, and copy operations

## Requirements

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Azure Storage Account with blob container and SAS token
- Internet connection

## License

MIT
