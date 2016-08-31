'use strict';

module.exports = function verifyIfDatFile(outputName){
	var extensionFile = outputName.split('.').pop()
	if(extensionFile !== 'dat'){
		console.log('Not a .dat file!');
		return false;
	}
	return true;
}