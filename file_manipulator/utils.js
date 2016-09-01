'use strict';

module.exports = {

	findFileName: function(filePath){
		return filePath.split(/(\\|\/)/g).pop();
	},

	fileWithoutExtension: function(fileName){
		return fileName.substring(fileName.lastIndexOf('/')+1, fileName.lastIndexOf('.'));
	},

	verifyIfDatFile: function (outputName){
		var extensionFile = outputName.split('.').pop();
		if(extensionFile !== 'dat'){
			console.log('Not a .dat file!');
			return false;
		}
		return true;
	},

	mapArray: function(array){
		return array.map(function(element){
			return element.value;
		});
	},

	findIfExistentInArray: function(array, findCode){
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
};