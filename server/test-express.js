const express = require('express');
const app = express();
app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.listen(5000, () => console.log('JS SERVER RUNNING ON 5000'));
