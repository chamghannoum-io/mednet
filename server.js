const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'interface.html'));
});

app.listen(PORT, () => {
    console.log(`\n✓ Web Server running on http://localhost:${PORT}`);
    console.log(`Open http://localhost:${PORT} in your browser\n`);
});

