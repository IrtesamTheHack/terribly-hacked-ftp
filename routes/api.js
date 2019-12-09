const log = require('another-logger');
const apiApp = require('express')();
const superagent = require('superagent');
const fs = require('fs');
const config = require('../config');
const path = require('path');
const util = require('util');
const multer = require('multer');

const storage = multer.diskStorage({
	destination: config.serverDir,
	filename: function(req, file, cb){
	  cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
  });

  const upload = multer({
	storage: storage,
	limits:{fileSize: 1000000},
  }).single('file');

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
	upload(req, res, (err) => {
		if (err) {
			throw err;
		}
		res.end();
	  });
});



function checkFileType(file, cb){
	// Allowed ext
	const filetypes = /jpeg|jpg|png|gif/;
	// Check ext
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	// Check mime
	const mimetype = filetypes.test(file.mimetype);
  
	if(mimetype && extname){
	  return cb(null,true);
	} else {
	  cb('Error: Images Only!');
	}
  }

module.exports = apiApp;