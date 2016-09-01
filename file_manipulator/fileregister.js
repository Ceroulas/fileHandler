'use strict';

var watch = require('watch');
var readline = require('readline');
var fs = require('fs');

var verifyIfDatFile = require('./verifyifisdatfile.js');
var fileManipulator = require('./filemanipulator.js');

watch.createMonitor(__dirname+'/../data/in/', function(monitor){
		monitor.on("created", function(f, stat){
			console.log('File created: '+ f)
			registerFile(f);
		});
});

function registerFile(inputfileName){
	var outputName = inputfileName.split(/(\\|\/)/g).pop();
	var outputNameWithoutExt = outputName.substring(outputName.lastIndexOf('/')+1, outputName.lastIndexOf('.'));

	if(verifyIfDatFile(outputName)){

		var ws = fs.createWriteStream(__dirname+'/../data/out/'+outputNameWithoutExt+'.done.dat');

		var lineReader = readline.createInterface({
		  input: fs.createReadStream(inputfileName)
		});

		lineReader.on('line', function (line) {
		  	fileManipulator.readInfoFromLine(line);	  		
		});
		lineReader.on('close', function(){

			ws.write('Amount of clients in the input file: '+ fileManipulator.getInfoMap('costumerCount') + '\n' 
					+ 'Amount of salesman in the input file: '+ fileManipulator.getInfoMap('salemanCount') + '\n'
					+ 'ID of the most expensive sale: '+fileManipulator.calculateMostExpensiveSale()+ '\n'
					+ 'Worst salesman ever: '+fileManipulator.calculateWorstSaleman()+ '\n');
			ws.close();
			fileManipulator.resetInfosFromArrays();
			lineReader.close();
		});
	}	
}