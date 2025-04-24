// server.js
const express = require('express');
const path = require('path');
const app = express();
const router = require('./router');
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Use the routes defined in router.js

app.use('/', router);

//Start the server
app.listen(PORT, () => {
   console.log(`Server is running on http://localhost:${PORT}`);
});
