// Configuration file for MedNet Document Processor
const CONFIG = {
    // Webhook URL for document processing
    WEBHOOK_URL: 'https://n8n-test.iohealth.com/webhook/4cac2e27-c4f9-4d2d-8260-44cc8bedb55f',
    
    // CORS Proxy settings
    USE_CORS_PROXY: true,
    CORS_PROXY_BASE_URL: 'http://localhost:3002',
    
    // File upload limits
    MAX_FILE_SIZE: 50 * 1024 * 1024, // 50 MB in bytes
    MAX_FILES: 5,
    
    // Required fields validation
    REQUIRED_FIELDS: ['claimed_amount'],
    EITHER_OR_FIELDS: []
};

// Computed values based on configuration
CONFIG.CORS_PROXY_UPLOAD_URL = `${CONFIG.CORS_PROXY_BASE_URL}/upload`;
CONFIG.CORS_PROXY_RESUME_URL = `${CONFIG.CORS_PROXY_BASE_URL}/resume`;
CONFIG.CORS_PROXY_CODING_URL = `${CONFIG.CORS_PROXY_BASE_URL}/coding`;

