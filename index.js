const fs = require('fs');
const path = require('path');
const polka = require('polka'); // Web server
const log = require('another-logger'); // Logging utility
const logging = require('./util/logging'); // Request logging middleware
const config = require('./config'); // Generic configuration

// Routes for non-frontend things
const api = require('./routes/api');

const indexPage = fs.readFileSync(path.join(config.publicDir, 'index.html'));

// Define the main application
const app = polka({
	// The frontend uses history mode, so any route that isn't already defined
	// gets the frontend index page and Vue handles it from there (including
	// rendering a "not found" page when appropriate)
	onNoMatch: (request, response) => response.end(indexPage),
});

// Set up global middlewares
app.use(
	// Request logging
	logging,
);

// Register the API routes and auth routes
app.use('/api', api);

// Start the server
app.listen(config.port, () => {
	log.success(`Listening on port ${config.port}~!`);
});