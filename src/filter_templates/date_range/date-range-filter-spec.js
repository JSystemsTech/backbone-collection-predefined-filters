'use strict';
var utils = require('../../../test/test-utils'),
	expect = require('must');

describe('### Testing Date Range Filter ###', function() {
	describe('# Testing Base Date Range Filter Options no options', function() {
		var mockCollection = utils.getMock2Collection();
		mockCollection.addPredefinedFilterFromTemplate('date-range-filter', 'DateRangeFilter', {}, true);
		it('Returns expected number of models', function() {
			expect(mockCollection.models.length).to.equal(0);
		});
	});
	describe('# Testing Base Date Range Filter Options', function() {
		var mockCollection = utils.getMock2Collection();
		mockCollection.addPredefinedFilterFromTemplate('date-range-filter', 'DateRangeFilter', {
			filterableModelAttributes: [{
				attribute: 'birthdate',
				format: 'YYYY/MM/DD HH:mm:ss A',
				isInUTC: true
			}, {
				attribute: 'registered.date',
				format: 'YYYY/MM/DD HH:mm:ss',
				isInUTC: true
			}]
		}, true);
		it('Returns expected number of models', function() {
			expect(mockCollection.models.length).to.equal(804);
		});
	});
	describe('# Testing Base Date Range Filter Options Invalid attribute', function() {
		var mockCollection = utils.getMock2Collection();
		mockCollection.addPredefinedFilterFromTemplate('date-range-filter', 'DateRangeFilter', {
			filterableModelAttributes: [{
				attribute: 'registered.date.invalid',
				format: 'YYYY/MM/DD HH:mm:ss',
				isInUTC: true
			}]
		}, true);
		it('Returns expected number of models', function() {
			expect(mockCollection.models.length).to.equal(0);
		});
	});
	describe('# Testing Base Date Range Filter Options undefined isInUTC & format for attribute', function() {
		var mockCollection = utils.getMock2Collection();
		mockCollection.addPredefinedFilterFromTemplate('date-range-filter', 'DateRangeFilter', {
			filterableModelAttributes: [{
				attribute: 'registered.date'
			}]
		}, true);
		it('Returns expected number of models', function() {
			expect(mockCollection.models.length).to.equal(804);
		});
	});
	describe('# Testing Base Date Range Filter Options add start date', function() {
		var mockCollection = utils.getMock2Collection();
		mockCollection.addPredefinedFilterFromTemplate('date-range-filter', 'DateRangeFilter', {
			start: {
				value: '1991/03/13 14:19:04',
				format: 'YYYY/MM/DD HH:mm:ss'
			},
			filterableModelAttributes: [{
				attribute: 'registered.date',
				format: 'YYYY/MM/DD HH:mm:ss',
				isInUTC: true
			}]
		}, true);
		it('Returns expected number of models', function() {
			expect(mockCollection.models.length).to.equal(423);
		});
	});
	describe('# Testing Base Date Range Filter Options add non utc start date', function() {
		var mockCollection = utils.getMock2Collection();
		mockCollection.addPredefinedFilterFromTemplate('date-range-filter', 'DateRangeFilter', {
			start: {
				value: '1991/03/13 14:19:04',
				format: 'YYYY/MM/DD HH:mm:ss',
				isInUTC: false
			},
			filterableModelAttributes: [{
				attribute: 'registered.date',
				format: 'YYYY/MM/DD HH:mm:ss',
				isInUTC: true
			}]
		}, true);
		it('Returns expected number of models', function() {
			expect(mockCollection.models.length).to.equal(422);
		});
	});
	describe('# Testing Base Date Range Filter Options add end date', function() {
		var mockCollection = utils.getMock2Collection();
		mockCollection.addPredefinedFilterFromTemplate('date-range-filter', 'DateRangeFilter', {
			end: {
				value: '1991/03/13 14:19:04',
				format: 'YYYY/MM/DD HH:mm:ss'
			},
			filterableModelAttributes: [{
				attribute: 'registered.date',
				format: 'YYYY/MM/DD HH:mm:ss',
				isInUTC: true
			}]
		}, true);
		it('Returns expected number of models', function() {
			expect(mockCollection.models.length).to.equal(382);
		});
	});
	describe('# Testing Base Date Range Filter Options add end date with non utc attributes', function() {
		var mockCollection = utils.getMock2Collection();
		mockCollection.addPredefinedFilterFromTemplate('date-range-filter', 'DateRangeFilter', {
			end: {
				value: '1991/03/13 14:19:04',
				format: 'YYYY/MM/DD HH:mm:ss',
				isInUTC: true
			},
			filterableModelAttributes: [{
				attribute: 'registered.date',
				format: 'YYYY/MM/DD HH:mm:ss',
				isInUTC: false
			}]
		}, true);
		it('Returns expected number of models', function() {
			expect(mockCollection.models.length).to.equal(381);
		});
	});
	describe('# Testing Date Range Filter With End Date', function() {
		var mockCollection = utils.getMock2Collection();
		mockCollection.addPredefinedFilterFromTemplate('date-range-filter', 'DateRangeFilter', {
			start: {
				value: '1991-01-01',
				format: 'YYYY-MM-DD',
				includeInRange: true
			},
			end: {
				value: '1991/03/13 14:19:04',
				format: 'YYYY/MM/DD HH:mm:ss',
				includeInRange: true
			},
			filterableModelAttributes: [{
				attribute: 'registered.date',
				format: 'YYYY/MM/DD HH:mm:ss',
				isInUTC: true
			}]
		}, true);
		it('Returns expected number of models', function() {
			expect(mockCollection.models.length).to.equal(5);
		});
	});
	describe('# Testing Date Range Filter With End Date not including start & end dates in range', function() {
		var mockCollection = utils.getMock2Collection();
		mockCollection.addPredefinedFilterFromTemplate('date-range-filter', 'DateRangeFilter', {
			start: {
				value: '1991-01-01',
				format: 'YYYY-MM-DD',
				includeInRange: false
			},
			end: {
				value: '1991/03/13 14:19:04',
				format: 'YYYY/MM/DD HH:mm:ss',
				includeInRange: false
			},
			filterableModelAttributes: [{
				attribute: 'registered.date',
				format: 'YYYY/MM/DD HH:mm:ss',
				isInUTC: true
			}]
		}, true);
		it('Returns expected number of models', function() {
			expect(mockCollection.models.length).to.equal(4);
		});
	});
	describe('# Testing Date Range Filter Ignoring both Start & End Dates', function() {
		var mockCollection = utils.getMock2Collection();
		mockCollection.addPredefinedFilterFromTemplate('date-range-filter', 'DateRangeFilter', {
			start: {
				ignore: true
			},
			end: {
				ignore: true
			},
			filterableModelAttributes: [{
				attribute: 'registered.date',
				format: 'YYYY/MM/DD HH:mm:ss',
				isInUTC: true
			}]
		}, true);
		it('Returns expected number of models', function() {
			expect(mockCollection.models.length).to.equal(1000);
		});
	});
	describe('# Testing Date Range Filter Ignoring Start Date', function() {
		var mockCollection = utils.getMock2Collection();
		mockCollection.addPredefinedFilterFromTemplate('date-range-filter', 'DateRangeFilter', {
			start: {
				ignore: true
			},
			end: {
				value: '1991/03/13 14:19:04',
				format: 'YYYY/MM/DD HH:mm:ss'
			},
			filterableModelAttributes: [{
				attribute: 'registered.date',
				format: 'YYYY/MM/DD HH:mm:ss',
				isInUTC: true
			}]
		}, true);
		it('Returns expected number of models', function() {
			expect(mockCollection.models.length).to.equal(578);
		});
	});
	describe('# Testing Date Range Filter Ignoring End Date', function() {
		var mockCollection = utils.getMock2Collection();
		mockCollection.addPredefinedFilterFromTemplate('date-range-filter', 'DateRangeFilter', {
			start: {
				value: '1991/03/13 14:19:04',
				format: 'YYYY/MM/DD HH:mm:ss',
				includeInRange: false
			},
			end: {
				ignore: true
			},
			filterableModelAttributes: [{
				attribute: 'registered.date',
				format: 'YYYY/MM/DD HH:mm:ss',
				isInUTC: true
			}]
		}, true);
		it('Returns expected number of models', function() {
			expect(mockCollection.models.length).to.equal(422);
		});
	});
});