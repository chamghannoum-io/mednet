// Simple CORS Proxy for n8n Resume Endpoint
// Run with: node cors-proxy.js

const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3002;

// Enable CORS for all routes
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Proxy endpoint
app.post('/resume', async (req, res) => {
    try {
        const { resumeUrl, data } = req.body;
        
        if (!resumeUrl) {
            return res.status(400).json({ error: 'resumeUrl is required' });
        }

        console.log('Proxying request to:', resumeUrl);
        console.log('With data:', JSON.stringify(data, null, 2));

        // Forward the request to n8n
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

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'CORS proxy is running' });
});

app.listen(PORT, () => {
    console.log(`\n✓ CORS Proxy Server running on http://localhost:${PORT}`);
    console.log(`\nUsage:`);
    console.log(`POST http://localhost:${PORT}/resume`);
    console.log(`Body: { "resumeUrl": "...", "data": {...} }\n`);
});