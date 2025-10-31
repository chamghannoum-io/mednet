# MedNet Document Processing Interface

Professional HTML interface for uploading medical documents to n8n, with editable field validation and workflow resumption.

## Quick Start

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

## Files

- `mednet-upload.html` - Main interface
- `cors-proxy.js` - CORS proxy server
- `webhook-test.html` - Diagnostic tool
- `CORS_FIX_GUIDE.md` - Complete troubleshooting guide
- `WORKFLOW_DOCUMENTATION.md` - Full workflow documentation

## Configuration

Edit `mednet-upload.html`:

```javascript
const WEBHOOK_URL = 'https://n8n-interns.iohealth.im/webhook/...';

const USE_CORS_PROXY = false; 
const CORS_PROXY_URL = 'http://localhost:3002/resume';
```

## How It Works

1. User uploads medical document
2. File sent to n8n webhook for processing
3. n8n extracts data and returns JSON with `resumeUrl`
4. Interface displays editable fields
5. User corrects any errors
6. Clicks "Save Changes" → data sent to `resumeUrl`
7. n8n workflow resumes with corrected data
