'use strict';
module.exports =  Saleman;

function Saleman(CPF, name, salary) {
	Saleman.count = ++Saleman.count || 1;
	
	this.CPF = CPF;
	this.name = name;
	this.salary = salary;
}

