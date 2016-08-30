'use strict';

require('autoinstall');

var Watcher = require('./watcher.js')

var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var watch = require('watch');

var app = express();
var port = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));

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
	


	watch.createMonitor(__dirname+'/data/out/', function(monitor){
		monitor.once("created", function(file, stat){
			console.log('File created: '+ file)
			res.sendFile(file);
		});
	});

});


app.listen(port, function(){
	console.log('App listening on port: '+ port);
});

