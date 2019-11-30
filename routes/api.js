const log = require('another-logger');
const apiApp = require('polka')();
const superagent = require('superagent');

apiApp.get('/',(req, res) => {
	log.success("Something.");
});

module.exports = apiApp;