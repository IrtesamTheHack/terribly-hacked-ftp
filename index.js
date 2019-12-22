const fs = require('fs');
const path = require('path');
const express = require('express'); // Web server
const config = require('./config'); // Generic configuration
const sirv = require('sirv'); // Static file middleware
const api = require('./routes/api');

const indexPage = fs.readFileSync(path.join(config.publicDir, 'index.html'));

// Define the main application
const app = express({
	onNoMatch: (request, response) => response.end(indexPage),
});

// Set up global middlewares
app.use(sirv(config.publicDir, {dev: true}));

// Register the API routes and auth routes
app.use('/api', api);
app.set('view engine', 'ejs');

// Start the server
app.listen(config.port, () => {
	console.log(`Listening on port ${config.port}~!`);
});