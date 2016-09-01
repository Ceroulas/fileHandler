'use strict';

var watch = require('watch');
var readline = require('readline');
var fs = require('fs');

var fileManipulator = require('./filemanipulator.js');
var utils = require('./utils.js')
var pathIn = __dirname+'/../data/in/';

watch.createMonitor(pathIn, function(monitor){
		monitor.on("created", function(file, stat){
			console.log('File created: '+ file)
			configFile(file);
		});
});

function configFile(inputFile){
	var inputFileName = utils.findFileName(inputFile);
	
	if(utils.verifyIfDatFile(inputFileName)){
		var inputNameWithoutExt = utils.fileWithoutExtension(inputFileName);
		configStreams(inputNameWithoutExt,inputFile);
	}	
}

function configStreams(inputNameWithoutExt,inputFile){
	var writeStream = configWriteStream(inputNameWithoutExt);
	configReadStream(writeStream, inputFile);
}

function configWriteStream(inputNameWithoutExt){
	return fs.createWriteStream(__dirname+'/../data/out/'+inputNameWithoutExt+'.done.dat');
}

function configReadStream(writeStream, inputFile){
	var lineReader = readline.createInterface({
	  input: fs.createReadStream(inputFile)
	});
	readInputFile(lineReader, writeStream);
}

function readInputFile(lineReader,writeStream){
	lineReader.on('line', function (line) {
	  	fileManipulator.readInfoFromLine(line);	  		
	});
	lineReader.on('close', function(){
		registerOutputFile(writeStream);
		closeStreams(writeStream, lineReader);
	});
}

function registerOutputFile(writeStream){
	writeStream.write('Amount of clients in the input file: '+ fileManipulator.getInfoMap('costumerCount') + '\n' 
			+ 'Amount of salesman in the input file: '+ fileManipulator.getInfoMap('salesmanCount') + '\n'
			+ 'ID of the most expensive sale: '+fileManipulator.calculateMostExpensiveSale()+ '\n'
			+ 'Worst salesman ever: '+fileManipulator.calculateWorstSalesman()+ '\n');
}

function closeStreams(writeStream, lineReader){
	writeStream.close();
	fileManipulator.resetInfosFromArrays();
	lineReader.close();
}