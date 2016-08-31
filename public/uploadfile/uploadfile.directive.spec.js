/*describe('fileModel', function () {

    var $compile, $rootScope, directiveElem;

    beforeEach(module("uploadApp"));

    beforeEach(function(){

        inject(function(_$compile_, _$rootScope_){
            $compile = _$compile_;
            $rootScope = _$rootScope_;
        });

        directiveElem = getCompiledElement();
    });

    function getCompiledElement(){
        var element = angular.element('<input name="fileInput" id="input-1" type="file" class="form-control input-lg" ng-model="myFile" file-model="myFile" ng-required="true" ng-accept="".dat""/><button id="uploadFile" type="submit" class="btn btn-success btn-lg" ng-click="uploadFile()" ng-disabled="myForm.$invalid || isProcessing"> Upload File </button>');
        var compiledElement = $compile(element)($rootScope);
        console.log('element: '+element);
        console.log('compiledElement: '+compiledElement);
        $rootScope.uploadFile = function(){
            angular.element('#uploadFile').trigger('click');
        };
    
        $rootScope.$digest();
        return compiledElement;
    }

    it('should have input element', function () {
        var inputElement = directiveElem.find('input');
        console.log('Testa2: '+inputElement);
        expect(inputElement).toBeDefined();
    });

    it('watched the change function', function () {
        var file = {
            name: "test.txt",
            size: 1000    
        };

        var fileList = {
            0: file,
            length: 1,
            item: function (index) { return file; }
        };
        var inputElement = directiveElem.find('input');
        var buttonElement = directiveElem.find('#uploadFile');
        console.log('TEsta1: '+inputElement);
        inputElement.files = fileList;
        directiveElem.triggerHandler({
            type: 'change',
            target: {
                files: fileList
            }
        });
        $rootScope.$digest();
        buttonElement.triggerHandler('click');
    }); 


});*/