'use strict';
var multer = require('multer');
var watch = require('watch');

module.exports = function(app) {

	var storage = multer.diskStorage({
		destination: function(req, file, cb){
			cb(null, 'data/in/');
		},
		filename: function(req, file, cb){
			cb(null, file.originalname);
		}
	});

	var upload = multer({ storage: storage});

	app.post('/fileUpload', upload.any(), function(req, res){
		var outputName = req.files[0].filename.split(/(\\|\/)/g).pop();
		var outputNameWithoutExt = outputName.substring(outputName.lastIndexOf('/')+1, outputName.lastIndexOf('.'));
		
		watch.createMonitor(__dirname+'/../data/out/', function(monitor){
			monitor.once("created", function(file, stat){
				console.log('File created: '+ file)
				res.sendFile(file);
			});
		});

	});
}