
describe('uploadFile.Service', function(){
	var httpBackend, fileRequestHandler, fileUploadObj;
	beforeEach(function(){
		module('uploadApp');
	});

	beforeEach(inject(function($httpBackend, fileUpload){
		httpBackend = $httpBackend;

		fileRequestHandler = httpBackend.when('POST', '/fileUpload')
										.respond('Test flat file.');

		fileUploadObj = fileUpload;
	}));

	afterEach(function() {
    	httpBackend.verifyNoOutstandingExpectation();
    	httpBackend.verifyNoOutstandingRequest();
   	});

	
	it('should send file to server', function(){
		
		var f = new File([""], "filename");
		var url = '/uploadFile'; 
		var fd = new FormData();
		fd.append('file', f);

		httpBackend.expectPOST(url, fd).respond(200);

		fileUploadObj.uploadFileToUrl(f, url);

		httpBackend.flush();

	});

});