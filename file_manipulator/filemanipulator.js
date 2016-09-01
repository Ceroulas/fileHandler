'use strict';

var Salesman = require('./models/salesman.js');
var Costumer = require('./models/costumer.js');
var utils = require('./utils.js')

const ATTR_SEPARATOR = 'ç';
const SALESMAN_ID = '001';
const COSTUMER_ID = '002';
const SALE_ID = '003';

var infoMap = new Map();
var salesArr = [];
var costumerArr = [];
var salesmanArr  = [];

module.exports = {

	readInfoFromLine: function(line){
		var splitLine = line.split(ATTR_SEPARATOR);
		switch(splitLine[0]){
			case SALESMAN_ID:
				fillSalesmanInfo(splitLine);
				break;
			case COSTUMER_ID:
				fillCostumerInfo(splitLine);
				break;
			case SALE_ID:
				fillSalesInfo(splitLine);
				break;
			default:
				console.error("Wrong ID code!");	
		}
	},

	resetInfosFromArrays: function(){
		Salesman.count = 0;
		Costumer.count = 0;
		infoMap.clear();
		salesArr.length = 0;
		salesmanArr.length = 0;
		costumerArr.length = 0;
	},

	getInfoMap: function(index){
		return infoMap.get(index).toString();
	},

	calculateMostExpensiveSale: function() {
		return Math.max.apply(null, utils.mapArray(salesArr));
	},

	calculateWorstSalesman: function() {
		var minSale = Math.min.apply(null, utils.mapArray(salesArr));
		var worstSalesman = '';
		for (var i = 0, len = salesArr.length; i < len; i++) {
	    	if(salesArr[i].value == minSale){	    	
	    		worstSalesman = salesArr[i].salesman;
	    	}	
		}
		return worstSalesman;
	}
};

function fillSalesmanInfo(splitLine){
	var cpf = splitLine[1];
	var name = splitLine[2];
	var salary = splitLine[3];

	if(!utils.findIfExistentInArray(salesmanArr, cpf)){
		salesmanArr.push(cpf);
		var newSalesman = new Salesman(cpf, name, salary);
		infoMap.set('salesmanCount', Salesman.count);
	}	
}

function fillCostumerInfo(splitLine){
	var cnpj = splitLine[1];
	var name = splitLine[2];
	var businessArea = splitLine[3];

	if(!utils.findIfExistentInArray(costumerArr, cnpj)){
		costumerArr.push(cnpj);
		var newCostumer = new Costumer(cnpj, name, businessArea);
		infoMap.set('costumerCount', Costumer.count);
	}
}

function fillSalesInfo(splitLine){
	var id = splitLine[1];
	var salesmanName = splitLine[3];
	var valSale = calculateSalesFromSalesman(splitLine[2]);

	var saleObj = { salesman: salesmanName, value: valSale};
	salesArr.push(saleObj);
}

function calculateSalesFromSalesman(splitLine){
	var salesFromSalesman = splitLine.replace(/[\[\]]+/g, '');
	var saleSplit = salesFromSalesman.split(',');

	var sumSales = 0;
	for(var i=0; i<saleSplit.length; i++){
		sumSales += calculateValueOfSale(saleSplit[i]);	
	}
	return sumSales;
}

function calculateValueOfSale(saleSplit){
	var oneSale = saleSplit.split('-');
	var itemID = oneSale[0];
	var itemQuantity = oneSale[1];
	var itemPrice = oneSale[2];

	return (itemQuantity * itemPrice);
}
