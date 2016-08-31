angular.module('uploadApp')
		.service('verifyDatFile', ['$window', function($window){
			var verifyIfIsDatFile = function (file){
				var fileExtension = '';
				if(typeof file.name !== 'undefined'){
					fileExtension = file.name.split('.').pop();
					
					if(fileExtension !== 'dat'){
        				$window.alert("Not a .dat file.");
         				return false;
       				}
       				return true;
				}else{
					$window.alert("Not a file.");
					return false;
				}	

			};
			return {verifyIfIsDatFile: verifyIfIsDatFile};
		}]);
