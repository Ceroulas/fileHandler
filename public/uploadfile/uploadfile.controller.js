angular.module('uploadApp')
		.controller('UploadController', ['$scope','fileUpload','verifyDatFile',function($scope, fileUpload, verifyDatFile){

			$scope.content = 'Output file not ready!';
	
			$scope.uploadFile = function(){
		        var file = $scope.myFile;
		        var uploadUrl = "/fileUpload";

		        if(verifyDatFile.verifyIfIsDatFile(file)){

			        $scope.isProcessing  = true;
			        var outputFileData = fileUpload.uploadFileToUrl(file, uploadUrl);
	 				outputFileData.then(function(result){
	 					$scope.content = result.data;
	 					$scope.isProcessing  = false;
	 				});
	 			}	
    		};
    		
		}]);


