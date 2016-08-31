describe('UploadController function', function() {

  describe('UploadController', function() {
    var scope, mockFileUpload, mockVerifyDatFile, UploadController;

    beforeEach(module('uploadApp'));

    beforeEach(inject(function($rootScope, $controller, fileUpload, verifyDatFile) {
      
      scope =  $rootScope.$new();
      mockFileUpload = fileUpload;
      mockVerifyDatFile =  verifyDatFile;
      
      spyOn(mockFileUpload, 'uploadFileToUrl');
      spyOn(mockVerifyDatFile, 'verifyIfIsDatFile');

      UploadController = $controller('UploadController', {
        $scope: scope,
        fileUpload: mockFileUpload,
        verifyDatFile: mockVerifyDatFile
      });
    }));

    it('should call fileUpload method', function() {
        expect(mockFileUpload.uploadFileToUrl).toHaveBeenCalled();
        expect(UploadController.isProcessing).toBe(true);
    });

  });
});