'use strict';
var _ = require('underscore'),
	utils = require('../../../test/test-utils'),
	expect = require('must');

describe('### Testing Text Search Filter ###', function() {
	describe('# Testing Base Text Search Filter Options', function() {
		var mockCollection = utils.getMockCollection();
		mockCollection.addPredefinedFilterFromTemplate('text-search-filter', 'TextSearchFilter', {
			inputValue: 'mark',
			caseSensitive: false,
			minimumInputLength: 1,
			filterableModelAttributes: ['first_name', 'last_name']
		}, true);
		it('Returns expected number of models', function() {
			expect(mockCollection.models.length).to.equal(4);
		});
	});
	describe('# Testing Base Text Search Filter Options with undefined nested attribute', function() {
		var mockCollection = utils.getMockCollection();
		mockCollection.addPredefinedFilterFromTemplate('text-search-filter', 'TextSearchFilter', {
			inputValue: 'mark',
			caseSensitive: false,
			minimumInputLength: 1,
			filterableModelAttributes: ['first_name.invalid_attribute']
		}, true);
		it('Returns expected number of models', function() {
			expect(mockCollection.models.length).to.equal(0);
		});
	});
	describe('# Testing Case Sensitive Text Search Filter', function() {
		var mockCollection = utils.getMockCollection();
		mockCollection.addPredefinedFilterFromTemplate('text-search-filter', 'TextSearchFilter', {
			inputValue: 'Car',
			caseSensitive: true,
			minimumInputLength: 1,
			filterableModelAttributes: ['first_name', 'last_name', 'email']
		}, true);
		it('Returns expected number of models', function() {
			expect(mockCollection.models.length).to.equal(40);
		});
	});
	describe('# Testing Text Search Filter With Minimum Input Length 3', function() {
		describe('* Where Input length is less than 3', function() {
			var mockCollection = utils.getMockCollection();
			mockCollection.addPredefinedFilterFromTemplate('text-search-filter', 'TextSearchFilter', {
				inputValue: 'Ca',
				caseSensitive: false,
				minimumInputLength: 3,
				filterableModelAttributes: ['first_name', 'last_name', 'email']
			}, true);
			it('Returns expected number of models', function() {
				expect(mockCollection.models.length).to.equal(1000);
			});
		});
		describe('* Where Input length is 3', function() {
			var mockCollection = utils.getMockCollection();
			mockCollection.addPredefinedFilterFromTemplate('text-search-filter', 'TextSearchFilter', {
				inputValue: 'Car',
				caseSensitive: false,
				minimumInputLength: 3,
				filterableModelAttributes: ['first_name', 'last_name', 'email']
			}, true);
			it('Returns expected number of models', function() {
				expect(mockCollection.models.length).to.equal(44);
			});
		});
		describe('* Where Input length is greator than 3', function() {
			var mockCollection = utils.getMockCollection();
			mockCollection.addPredefinedFilterFromTemplate('text-search-filter', 'TextSearchFilter', {
				inputValue: 'Caro',
				caseSensitive: false,
				minimumInputLength: 3,
				filterableModelAttributes: ['first_name', 'last_name', 'email']
			}, true);
			it('Returns expected number of models', function() {
				expect(mockCollection.models.length).to.equal(12);
			});
		});
	});
	describe('# Testing Case Sensitive Text Search Filter With Minimum Input Length 3', function() {
		describe('* Where Input length is less than 3', function() {
			var mockCollection = utils.getMockCollection();
			mockCollection.addPredefinedFilterFromTemplate('text-search-filter', 'TextSearchFilter', {
				inputValue: 'Ca',
				caseSensitive: true,
				minimumInputLength: 3,
				filterableModelAttributes: ['first_name', 'last_name', 'email']
			}, true);
			it('Returns expected number of models', function() {
				expect(mockCollection.models.length).to.equal(1000);
			});
		});
		describe('* Where Input length is 3', function() {
			var mockCollection = utils.getMockCollection();
			mockCollection.addPredefinedFilterFromTemplate('text-search-filter', 'TextSearchFilter', {
				inputValue: 'Car',
				caseSensitive: true,
				minimumInputLength: 3,
				filterableModelAttributes: ['first_name', 'last_name', 'email']
			}, true);
			it('Returns expected number of models', function() {
				expect(mockCollection.models.length).to.equal(40);
			});
		});
		describe('* Where Input length is greator than 3', function() {
			var mockCollection = utils.getMockCollection();
			mockCollection.addPredefinedFilterFromTemplate('text-search-filter', 'TextSearchFilter', {
				inputValue: 'Caro',
				caseSensitive: true,
				minimumInputLength: 3,
				filterableModelAttributes: ['first_name', 'last_name', 'email']
			}, true);
			it('Returns expected number of models', function() {
				expect(mockCollection.models.length).to.equal(12);
			});
		});
	});
});