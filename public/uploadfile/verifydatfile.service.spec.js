
describe('verifyDatFile.Service', function(){
	var mockWindow, verifyDatFileObj;
	
	beforeEach(function(){
		module(function($provide){
			$provide.service('$window', function(){
				this.alert = jasmine.createSpy('alert');
			});
		})
		module('uploadApp');
	});

	beforeEach(inject(function($window, verifyDatFile){
		mockWindow = $window;
		verifyDatFileObj = verifyDatFile;
	}));

	it('it should alert if is not a .dat file', function(){
		var file = { name:"test.txt"};

		verifyDatFileObj.verifyIfIsDatFile(file);

		expect(mockWindow.alert).toHaveBeenCalledWith("Not a .dat file.");
	});

	it('it should not alert if it is a .dat file', function(){
		var file = { name:"test.dat"};

		verifyDatFileObj.verifyIfIsDatFile(file);

		expect(mockWindow.alert).not.toHaveBeenCalled();
	});

	it('it should return true if it is a .dat file', function(){
		var file = { name:"test.dat"};

		var result = verifyDatFileObj.verifyIfIsDatFile(file);

		expect(result).toBe(true);
	});

	it('it should return false if it is not a .dat file', function(){
		var file = { name:"test.txt"};

		var result = verifyDatFileObj.verifyIfIsDatFile(file);

		expect(result).toBe(false);
	});	

	it('it should return false, input is not a file', function(){
		var file = '';

		var result = verifyDatFileObj.verifyIfIsDatFile(file);

		expect(mockWindow.alert).toHaveBeenCalledWith("Not a file.");
		expect(result).toBe(false);
	});

	it('it should return false, file does not have property name', function(){
		var file = { something: 'text.dat'};

		var result = verifyDatFileObj.verifyIfIsDatFile(file);

		expect(mockWindow.alert).toHaveBeenCalledWith("Not a file.");
		expect(result).toBe(false);
	});
});
