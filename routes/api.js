const log = require('another-logger');
const apiApp = require('express')();
const superagent = require('superagent');
const fs = require('fs');
const config = require('../config');
const path = require('path');
const util = require('util');

apiApp.get('/dirlist', (req, res) => {
	let dirArr = [];
	let files = [];
	const readDir = util.promisify(fs.readdir);
	const stat = util.promisify(fs.stat);

	readDir(config.serverDir).then(async (items)=> {
		files = items.slice(items);
	}).then(async () => {
		for (var i=0; i<files.length; i++) {
			var file = config.serverDir + '/' + files[i];
			const promise = await stat(file).then((data)=> {
				return {
					"name": path.basename(file),
					"size": data["size"],
				};
			});
			dirArr.push(promise);
		}
	}).then(()=> {
		res.json(dirArr);
	});
});

module.exports = apiApp;