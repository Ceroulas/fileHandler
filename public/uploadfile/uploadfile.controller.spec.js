describe('UploadController function', function() {

  describe('UploadController', function() {
    var scope, mockFileUpload, mockVerifyDatFile, UploadController;

    beforeEach(module('uploadApp'));

    beforeEach(

      mockFileUpload = jasmine.createSpyObj( 'fileUpload', 'uploadFileToUrl');
      mockVerifyDatFile = jasmine.createSpyObj( 'verifyDatFile' , 'verifyIfIsDatFile');

      inject(function($rootScope, $controller, fileUpload, verifyDatFile) {
        
        scope =  $rootScope.$new();
        
        mockFileUpload.uploadFileToUrl


        UploadController = $controller('UploadController', {
          $scope: scope,
          fileUpload: mockFileUpload,
          verifyDatFile: mockVerifyDatFile
        });
    }));

    it('should call fileUpload method', function() {
        expect(mockFileUpload.uploadFileToUrl).toHaveBeenCalled();
        expect(scope.content).toEqual('Output file not ready!');
    });

  });
});