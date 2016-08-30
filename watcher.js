'use strict';

var watch = require('watch');
var readline = require('readline');
var fs = require('fs');

var Saleman = require('./salesman.js');
var Costumer = require('./costumer.js');

var infoMap = new Map();
var salesArr = [];
var costumerArr = [];
var salemanArr  = [];

watch.createMonitor(__dirname+'/data/in/', function(monitor){
		monitor.on("created", function(f, stat){
			console.log('File created: '+ f)
			manipulateFiles(f);
		});
});

function manipulateFiles(inputfileName){
	var outputName = inputfileName.split(/(\\|\/)/g).pop();
	var outputNameWithoutExt = outputName.substring(outputName.lastIndexOf('/')+1, outputName.lastIndexOf('.'));

	var ws = fs.createWriteStream(__dirname+'/data/out/'+outputNameWithoutExt+'.done.dat');

	var lineReader = readline.createInterface({
	  input: fs.createReadStream(inputfileName)
	});

	lineReader.on('line', function (line) {
	  	readInfo(line);	  		
	});
	lineReader.on('close', function(){

		ws.write('Amount of clients in the input file: '+ infoMap.get('costumerCount').toString() + '\n' 
				+ 'Amount of saleman in the input file: '+ infoMap.get('salemanCount').toString() + '\n'
				+ 'ID of the most expensive sale: '+calculateMostExpensiveSale()+ '\n'
				+ 'Worst saleman ever: '+calculateWorstSaleman()+ '\n');
		ws.close();
		resetInfos();
		lineReader.close();
	});
}

function readInfo(line){
	var splitLine = line.split('ç');

	switch(splitLine[0]){
		case '001':
			fillSalemanInfo(splitLine);
			break;
		case '002':
			fillCostumerInfo(splitLine);
			break;
		default:
			fillSalesInfo(splitLine);
	}

}

function resetInfos(){
	Saleman.count = 0;
	Costumer.count = 0;
	infoMap.clear();
	salesArr.length = 0;
	salemanArr.length = 0;
	costumerArr.length = 0;
}

function calculateMostExpensiveSale() {
	
	var maxSale = Math.max.apply(null, salesArr.map(function(sale){return sale.value}));

	return maxSale;
}

function calculateWorstSaleman() {
	var minSale = Math.min.apply(null, salesArr.map(function(sale){return sale.value;}));
	var worstSaleman = '';
	for (var i = 0, len = salesArr.length; i < len; i++) {
    	if(salesArr[i].value == minSale){	    	
    		worstSaleman = salesArr[i].saleman;
    	}	
	}
	
	return worstSaleman;
}

function fillSalemanInfo(splitLine){
	var cpf = splitLine[1];
	var name = splitLine[2];
	var salary = splitLine[3];

	if(!findIfExistent(salemanArr, cpf)){
		salemanArr.push(cpf);
		var newSaleman = new Saleman(cpf, name, salary);
		infoMap.set('salemanCount', Saleman.count);	
	}
	
}

function fillCostumerInfo(splitLine){
	var cnpj = splitLine[1];
	var name = splitLine[2];
	var businessArea = splitLine[3];

	if(!findIfExistent(costumerArr, cnpj)){
		costumerArr.push(cnpj);
		var newCostumer = new Costumer(cnpj, name, businessArea);
		infoMap.set('costumerCount', Costumer.count);
	}
	
}

function findIfExistent(array, findCode){

	if(array.length > 0){
		for(var i = 0; i < array.length; i++){
			if(array[i] == findCode)
				return true;
		}
		return false;
	}else{
		return false;
	}

}

function fillSalesInfo(splitLine){
	var id = splitLine[1];
	var salemanName = splitLine[3];

	var valSale = calculateSalesFromSaleman(splitLine[2]);

	var obj = { saleman: salemanName, value: valSale};
	salesArr.push(obj);
}

function calculateSalesFromSaleman(splitLine){
	var salesFromSaleman = replaceAll(splitLine, ',', ' ');
	salesFromSaleman = salesFromSaleman.replace('[', '');
	salesFromSaleman = salesFromSaleman.replace(']', '');

	var saleSplit = salesFromSaleman.split(' ');
	var sumSales = 0;
	
	for(var i=0; i<saleSplit.length; i++){
		sumSales += calculateSale(saleSplit[i]);	
	}
	return sumSales;
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}


function calculateSale(saleSplit){
	var oneSale = saleSplit.split('-');
	var itemID = oneSale[0];
	var itemQuantity = oneSale[1];
	var itemPrice = oneSale[2];

	return (itemQuantity * itemPrice);
}
