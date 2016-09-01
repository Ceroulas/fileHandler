'use strict';

require('autoinstall');

var fileManipulatorWatcher = require('./file_manipulator/fileregister.js')

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));

require('./file_manipulator/routes.js')(app);

app.listen(port, function(){
	console.log('App listening on port: '+ port);
});

