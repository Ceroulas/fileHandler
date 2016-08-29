'use strict';

require('autoinstall');

var Saleman = require('./salesman.js');
var Costumer = require('./costumer.js');
var Watcher = require('./watcher.js')

var express = require('express');

var app = express();
var port = 3000;


app.use(express.static(__dirname + '/public'));

app.post('/fileUpload', function(req, res){
	
});

app.listen(port, function(){
	console.log('App listening on port: '+ port);
});

