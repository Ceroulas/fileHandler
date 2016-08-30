angular.module('uploadApp')
		.service('fileUpload', ['$http', function ($http) {
		    var uploadFileToUrl = function(file, uploadUrl){
		    	console.log('entrei');
		        var fd = new FormData();
		        fd.append('file', file);
			    return $http.post(uploadUrl, fd, {
		            		transformRequest: angular.identity,
		            		headers: {'Content-Type': undefined}
		        			})
					        .success(function(data){
					        	return data;
					        })
					        .error(function(err){
					        	return err;
					        });
		    };
		    return {uploadFileToUrl: uploadFileToUrl};
		}]);

