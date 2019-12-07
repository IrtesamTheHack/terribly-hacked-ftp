const log = require('another-logger');
const apiApp = require('express')();
const superagent = require('superagent');
const fs = require('fs');
const config = require('../config');
const path = require('path');
const util = require('util');
const store = require('vuex');

apiApp.get('/dirlist', (req, res) => {
	let dirArr = [];
	let files = [];
	const readDir = util.promisify(fs.readdir);
	const stat = util.promisify(fs.stat);

	readDir(config.serverDir).then(async (items)=> {
		files = items.slice(items);
	}).then(async () => {
		var count = 0;
		for (var i=0; i<files.length; i++) {
			var file = config.serverDir + '/' + files[i];
			const promise = await stat(file).then((data)=> {
				return {
					"id" : ++count,
					"name": path.basename(file),
					"size": data["size"].toString(),
				};
			});
			dirArr.push(promise);
		}
	}).then(()=> {
		res.json(dirArr);
		res.end();
	});
});

apiApp.get('/download/:fileName', (req,res) => {
	const file = config.serverDir + '/' + req.params.fileName;
	res.download(file);
});

module.exports = apiApp;