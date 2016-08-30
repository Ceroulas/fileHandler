angular.module('uploadApp')
		.controller('UploadController', ['$scope','fileUpload', function($scope, fileUpload){

			$scope.content = 'Output file not ready!';
			
			$scope.uploadFile = function(){
		        var file = $scope.myFile;
		        var uploadUrl = "/fileUpload";

		        $scope.isProcessing  = true;
		        var outputFileData = fileUpload.uploadFileToUrl(file, uploadUrl);
 				outputFileData.then(function(result){
 					$scope.content = result.data;
 					$scope.isProcessing  = false;
 				})
    		};
    		
		}]);


