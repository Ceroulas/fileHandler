'use strict';

require('autoinstall');

var watch = require('watch');
var express = require('express');
var rl = require('readline');
var fs = require('fs');
var app = express();
var port = 3000;

var infoMap = new Map();

app.get('/', function(req, res){
	res.send('Hello world!');
});


watch.createMonitor(__dirname+'/data/', function(monitor){
	monitor.on("changed", function(f, stat){
		manipulateFiles(f);
	});
});

function manipulateFiles(fileName){
	/*fs.readFile(fileName, 'utf8', function(err, data){
		if(err) return console.log(err);

		fs.writeFile(fileName+'out.dat', data, function(err, res){
			if(err) return console.log(err);
			console.log('sucesso: '+ res);
		});

	});*/

	var lineReader = rl.createInterface({
	  input: fs.createReadStream(fileName)
	});

	lineReader.on('line', function (line) {
	  	readInfo(line);
	  	calculateInfoOutputFile();
	});

	
}

function readInfo(line){
	var splitLine = line.split('ç');

	switch(splitLine[0]){
		case '001':
			fillSalesmanInfo(splitLine);
			break;
		case '002':
			fillCostumerInfo(splitLine);
			break;
		default:
			fillSalesInfo(splitLine);
	}

}

function calculateInfoOutputFile(){

}
function fillSalesmanInfo(splitLine){
	var cpf = splitLine[1];
	var name = splitLine[2];
	var salary = splitLine[3];

	var newSalesman = new Salesman(cpf, name, salary);
	
	infoMap.set('salesmanCount', Salesman.count);
};

function fillCostumerInfo(splitLine){
	var cnpj = splitLine[1];
	var name = splitLine[2];
	var businessArea = splitLine[3];

	var newCostumer = new Costumer(cnpj, name, businessArea);

	infoMap.set('costumerCount', Costumer.count);
};

function fillSalesInfo(splitLine){
	var id = splitLine[1];
	var SalesmanName = splitLine[3];

	var valSale = calculateSalesFromSalesman(splitLine[2]);

	var newSales = new Sales(id, valSale, SalesmanName);

	infoMap.set('idMostExpensive', Sales.idMostExpensiveSale);
	infoMap.set('worstSalesman', Sales.worstSalesman);

};

function calculateSalesFromSalesman(splitLine){
	var salesFromSalesman = replaceAll(splitLine, ',', ' ');
	salesFromSalesman = salesFromSalesman.replace('[', '');
	salesFromSalesman = salesFromSalesman.replace(']', '');

	var saleSplit = salesFromSalesman.split(' ');
	var sumSales = 0;
	
	for(var i=0; i<saleSplit.length; i++){
		sumSales += calculateSale(saleSplit[i]);	
	}
	return sumSales;
}

function calculateSale(saleSplit){
	
	var oneSale = saleSplit.split('-');
	var itemID = oneSale[0];
	var itemQuantity = oneSale[1];
	var itemPrice = oneSale[2];

	return (itemQuantity * itemPrice);

}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}
function escapeRegExp(str) {
    return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function Salesman() {
	Salesman.count = ++Salesman.count || 1;

	return function Salesman(CPF, name, salary){
		this.CPF = CPF;
		this.name = name;
		this.salary = salary;
	}
}

function Costumer() {
	Costumer.count = ++Costumer.count || 1;

	return function Costumer(CNPJ, name, businessArea){
		this.CNPJ = CNPJ;
		this.name = name;
		this.businessArea = businessArea;
	}
}

function Sales() {
	
	return function Sales(id, valSale,SalesmanName){
		this.id = id;
		this.valSale = valSale;
		this.SalesmanName = SalesmanName;
	}
}

app.listen(port, function(){
	console.log('App listening on port: '+ port);
});

