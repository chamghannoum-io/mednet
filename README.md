# MedNet Document Processing Interface

Professional HTML interface for uploading medical documents to n8n, with editable field validation and workflow resumption.

## 🚀 Quick Start

### Option 1: Use CORS Proxy (Fastest for Testing)

```bash
# Install dependencies
npm install

# Start the proxy server
npm start
```

Then open `mednet-upload.html` in your browser and change:
```javascript
const USE_CORS_PROXY = true;
```

### Option 2: Fix n8n CORS (Recommended for Production)

Add these headers to your n8n webhook response:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

See `CORS_FIX_GUIDE.md` for detailed instructions.

## 📁 Files

- `mednet-upload.html` - Main interface
- `cors-proxy.js` - CORS proxy server
- `webhook-test.html` - Diagnostic tool
- `CORS_FIX_GUIDE.md` - Complete troubleshooting guide
- `WORKFLOW_DOCUMENTATION.md` - Full workflow documentation

## 🔧 Configuration

Edit `mednet-upload.html`:

```javascript
// Your n8n webhook URL
const WEBHOOK_URL = 'https://n8n-interns.iohealth.im/webhook/...';

// Enable proxy if needed
const USE_CORS_PROXY = false; // Set to true if using proxy
const CORS_PROXY_URL = 'http://localhost:3000/resume';
```

## 📝 How It Works

1. User uploads medical document
2. File sent to n8n webhook for processing
3. n8n extracts data and returns JSON with `resumeUrl`
4. Interface displays editable fields
5. User corrects any errors
6. Clicks "Save Changes" → data sent to `resumeUrl`
7. n8n workflow resumes with corrected data

## 🐛 Troubleshooting

### CORS Error?
Run the test tool: `webhook-test.html`

### 413 Error?
File too large - reduce size or increase n8n payload limit

### Can't connect to webhook?
Check n8n is running and webhook URL is correct

## 📚 Documentation

- [Complete CORS Fix Guide](CORS_FIX_GUIDE.md)
- [Workflow Documentation](WORKFLOW_DOCUMENTATION.md)

## ✅ Testing

1. Start proxy (if using): `npm start`
2. Open `webhook-test.html` to test connection
3. Open `mednet-upload.html` to use interface
4. Upload a small test file
5. Verify fields display correctly
6. Edit fields and save

## 🎨 Features

- ✅ Drag-and-drop file upload
- ✅ Real-time file size validation
- ✅ Dynamic field rendering (text, boolean, array)
- ✅ Inline editing with change tracking
- ✅ Workflow resumption with updated data
- ✅ Professional MedNet branding
- ✅ Comprehensive error handling
- ✅ Export to JSON

## 💡 Tips

- Keep files under 10 MB for best performance
- Use proxy for local development
- Configure CORS headers for production
- Check browser console for detailed errors

## 🔒 Security Note

The proxy server is for **development only**. In production:
- Configure CORS properly in n8n
- Use HTTPS
- Validate input data
- Implement authentication if needed