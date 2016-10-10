'use strict';
var utils = require('../../../test/test-utils'),
	expect = require('must');

describe('### Testing Range Filter ###', function() {
	describe('# Testing Base Range Filter Options no options', function() {
		var mockCollection = utils.getMock2Collection();
		mockCollection.addPredefinedFilterFromTemplate('range-filter', 'RangeFilter', {}, true);
		it('Returns expected number of models', function() {
			expect(mockCollection.models.length).to.equal(0);
		});
	});
	describe('# Testing Base Range Filter Options', function() {
		var mockCollection = utils.getMock2Collection();
		mockCollection.addPredefinedFilterFromTemplate('range-filter', 'RangeFilter', {
			filterableModelAttributes: ['age', 'registered.age']
		}, true);
		it('Returns expected number of models', function() {
			expect(mockCollection.models.length).to.equal(1000);
		});
	});
	describe('# Testing Base Date Range Filter Options Invalid attribute', function() {
		var mockCollection = utils.getMock2Collection();
		mockCollection.addPredefinedFilterFromTemplate('range-filter', 'RangeFilter', {
			filterableModelAttributes: ['registered.age.invalid']
		}, true);
		it('Returns expected number of models', function() {
			expect(mockCollection.models.length).to.equal(0);
		});
	});
	describe('# Testing Base Range Filter Options Start >= 50 End <= 60', function() {
		var mockCollection = utils.getMock2Collection();
		mockCollection.addPredefinedFilterFromTemplate('range-filter', 'RangeFilter', {
			start: {
				value: 50
			},
			end: {
				value: 60
			},
			filterableModelAttributes: ['age', 'registered.age']
		}, true);
		it('Returns expected number of models', function() {
			expect(mockCollection.models.length).to.equal(200);
		});
	});
	describe('# Testing Base Range Filter Options Start > 50 End < 60', function() {
		var mockCollection = utils.getMock2Collection();
		mockCollection.addPredefinedFilterFromTemplate('range-filter', 'RangeFilter', {
			start: {
				value: 50,
				includeInRange: false
			},
			end: {
				value: 60,
				includeInRange: false
			},
			filterableModelAttributes: ['age', 'registered.age']
		}, true);
		it('Returns expected number of models', function() {
			expect(mockCollection.models.length).to.equal(159);
		});
	});
	describe('# Testing Base Range Filter Options ignore End Date', function() {
		var mockCollection = utils.getMock2Collection();
		mockCollection.addPredefinedFilterFromTemplate('range-filter', 'RangeFilter', {
			start: {
				value: 50
			},
			end: {
				ignore: true
			},
			filterableModelAttributes: ['age', 'registered.age']
		}, true);
		it('Returns expected number of models', function() {
			expect(mockCollection.models.length).to.equal(348);
		});
	});
	describe('# Testing Base Range Filter Options ignore Start Date', function() {
		var mockCollection = utils.getMock2Collection();
		mockCollection.addPredefinedFilterFromTemplate('range-filter', 'RangeFilter', {
			start: {
				ignore: true
			},
			end: {
				value: 60
			},
			filterableModelAttributes: ['age', 'registered.age']
		}, true);
		it('Returns expected number of models', function() {
			expect(mockCollection.models.length).to.equal(977);
		});
	});
	describe('# Testing Base Range Filter Options ignore Start Date & End Date', function() {
		var mockCollection = utils.getMock2Collection();
		mockCollection.addPredefinedFilterFromTemplate('range-filter', 'RangeFilter', {
			start: {
				ignore: true
			},
			end: {
				ignore: true
			},
			filterableModelAttributes: ['age', 'registered.age']
		}, true);
		it('Returns expected number of models', function() {
			expect(mockCollection.models.length).to.equal(1000);
		});
	});
});