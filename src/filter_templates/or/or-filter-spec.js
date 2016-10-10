'use strict';
var utils = require('../../../test/test-utils'),
	expect = require('must');

describe('### Testing Or Filter ###', function() {
	describe('# Testing Or Filter With no options', function() {
		var testCollection = utils.getBaseCollection();
		testCollection.addPredefinedFilter('test-filter-1', utils.filter1);
		testCollection.addPredefinedFilter('test-filter-3', utils.filter3);
		testCollection.addPredefinedFilterFromTemplate('test-or-filter', 'Or', {}, true);
		it('Returns expected number of models', function() {
			expect(testCollection.models.length).to.equal(3);
		});
		it('Returns expected model_1', function() {
			expect(utils.hasModel(testCollection, utils.modelAttributes.modelA)).to.equal(true);
		});
		it('Returns expected model_2', function() {
			expect(utils.hasModel(testCollection, utils.modelAttributes.modelB)).to.equal(true);
		});
		it('Returns expected model_3', function() {
			expect(utils.hasModel(testCollection, utils.modelAttributes.modelC)).to.equal(true);
		});
		describe('* Original Models is unaffected', function() {
			it('Returns expected number of models', function() {
				expect(testCollection.originalModels.length).to.equal(3);
			});
			it('Returns expected model_1', function() {
				expect(utils.hasModel(testCollection, utils.modelAttributes.modelA, true)).to.equal(true);
			});
			it('Returns expected model_2', function() {
				expect(utils.hasModel(testCollection, utils.modelAttributes.modelB, true)).to.equal(true);
			});
			it('Returns expected model_3', function() {
				expect(utils.hasModel(testCollection, utils.modelAttributes.modelC, true)).to.equal(true);
			});
		});
	});
	describe('# Testing Or Filter Options', function() {
		var testCollection = utils.getBaseCollection();
		testCollection.addPredefinedFilter('test-filter-1', utils.filter1);
		testCollection.addPredefinedFilter('test-filter-3', utils.filter3);
		testCollection.addPredefinedFilterFromTemplate('test-or-filter', 'Or', {
			filters: ['test-filter-1', 'test-filter-3']
		}, true);
		it('Returns expected number of models', function() {
			expect(testCollection.models.length).to.equal(2);
		});
		it('Returns expected model_1', function() {
			expect(utils.hasModel(testCollection, utils.modelAttributes.modelA)).to.equal(true);
		});
		it('Returns expected model_2', function() {
			expect(utils.hasModel(testCollection, utils.modelAttributes.modelC)).to.equal(true);
		});
		describe('* Original Models is unaffected', function() {
			it('Returns expected number of models', function() {
				expect(testCollection.originalModels.length).to.equal(3);
			});
			it('Returns expected model_1', function() {
				expect(utils.hasModel(testCollection, utils.modelAttributes.modelA, true)).to.equal(true);
			});
			it('Returns expected model_2', function() {
				expect(utils.hasModel(testCollection, utils.modelAttributes.modelB, true)).to.equal(true);
			});
			it('Returns expected model_3', function() {
				expect(utils.hasModel(testCollection, utils.modelAttributes.modelC, true)).to.equal(true);
			});
		});
	});
	describe('# Testing Or Filter Options with undefined filter', function() {
		var testCollection = utils.getBaseCollection();
		testCollection.addPredefinedFilter('test-filter-1', utils.filter1);
		testCollection.addPredefinedFilter('test-filter-3', utils.filter3);
		testCollection.addPredefinedFilterFromTemplate('test-or-filter', 'Or', {
			filters: ['test-filter-1', 'test-filter-3', 'undefined-filter']
		}, true);
		it('Returns expected number of models', function() {
			expect(testCollection.models.length).to.equal(2);
		});
		it('Returns expected model_1', function() {
			expect(utils.hasModel(testCollection, utils.modelAttributes.modelA)).to.equal(true);
		});
		it('Returns expected model_2', function() {
			expect(utils.hasModel(testCollection, utils.modelAttributes.modelC)).to.equal(true);
		});
		describe('* Original Models is unaffected', function() {
			it('Returns expected number of models', function() {
				expect(testCollection.originalModels.length).to.equal(3);
			});
			it('Returns expected model_1', function() {
				expect(utils.hasModel(testCollection, utils.modelAttributes.modelA, true)).to.equal(true);
			});
			it('Returns expected model_2', function() {
				expect(utils.hasModel(testCollection, utils.modelAttributes.modelB, true)).to.equal(true);
			});
			it('Returns expected model_3', function() {
				expect(utils.hasModel(testCollection, utils.modelAttributes.modelC, true)).to.equal(true);
			});
		});
	});
});