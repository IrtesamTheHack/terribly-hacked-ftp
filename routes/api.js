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

apiApp.post('/upload', (req,res) => {
	if (!req.files || Object.keys(req.files).length === 0) {
		return res.status(400).send('No files were uploaded.');
	  }
	log.success(req.files);
	
	  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
	  let sampleFile = req.files.sampleFile;
	  let uploadPath = config.serverDir + '/' + sampleFile.name;
	
	  // Use the mv() method to place the file somewhere on your server
	  sampleFile.mv(uploadPath, function(err) {
		if (err) {
			return res.status(500).send(err);
		}
	
		res.send('File uploaded!');
	  });
});

module.exports = apiApp;