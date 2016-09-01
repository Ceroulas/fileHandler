'use strict';
var multer = require('multer');
var watch = require('watch');
var utils = require('./utils.js')

var pathOut = __dirname+'/../data/out/';
var urlPost = '/fileUpload';

var storage = multer.diskStorage({
	destination: function(req, file, cb){
		cb(null, 'data/in/');
	},
	filename: function(req, file, cb){
		cb(null, file.originalname);
	}
});

var upload = multer({ storage: storage});

module.exports = function(app) {

	app.post(urlPost, upload.any(), function(req, res){
		var outputName = utils.findFileName(req.files[0].filename);
		var outputNameWithoutExt = utils.fileWithoutExtension(outputName);

		watch.createMonitor(pathOut, function(monitor){
			monitor.once("created", function(file, stat){
				console.log('File created: '+ file)
				res.sendFile(file);
			});
		});

	});
}