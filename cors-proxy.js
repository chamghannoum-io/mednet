const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const FormData = require('form-data');
const multer = require('multer');

const app = express();
const PORT = 3002;
const upload = multer();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// File upload proxy endpoint
app.post('/upload', upload.any(), async (req, res) => {
    try {
        const webhookUrl = req.body.webhookUrl || 'https://n8n-test.iohealth.com/webhook/4cac2e27-c4f9-4d2d-8260-44cc8bedb55f';
        
        console.log('Proxying file upload to:', webhookUrl);
        console.log('Files received:', req.files?.length || 0);

        const formData = new FormData();
        
        // Append all files
        if (req.files) {
            req.files.forEach(file => {
                formData.append('file', file.buffer, {
                    filename: file.originalname,
                    contentType: file.mimetype
                });
            });
        }

        const response = await fetch(webhookUrl, {
            method: 'POST',
            body: formData,
            headers: formData.getHeaders()
        });

        const result = await response.json().catch(() => ({}));
        
        console.log('n8n upload response status:', response.status);
        
        res.status(response.status).json(result);

    } catch (error) {
        console.error('Upload proxy error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Resume workflow proxy endpoint
app.post('/resume', async (req, res) => {
    try {
        const { resumeUrl, data } = req.body;
        
        if (!resumeUrl) {
            return res.status(400).json({ error: 'resumeUrl is required' });
        }

        console.log('Proxying request to:', resumeUrl);
        console.log('With data:', JSON.stringify(data, null, 2));

        const response = await fetch(resumeUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        const result = await response.json().catch(() => ({}));
        
        console.log('n8n response:', result);
        
        res.json({
            success: true,
            status: response.status,
            data: result
        });

    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'CORS proxy is running' });
});

app.listen(PORT, () => {
    console.log(`\n✓ CORS Proxy Server running on http://localhost:${PORT}`);
    console.log(`\nUsage:`);
    console.log(`POST http://localhost:${PORT}/resume`);
    console.log(`Body: { "resumeUrl": "...", "data": {...} }\n`);
});