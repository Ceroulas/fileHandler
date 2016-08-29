'use strict';
module.exports = Costumer;

function Costumer(CNPJ, name, businessArea) {
	Costumer.count = ++Costumer.count || 1;
	
	this.CNPJ = CNPJ;
	this.name = name;
	this.businessArea = businessArea;
	
}