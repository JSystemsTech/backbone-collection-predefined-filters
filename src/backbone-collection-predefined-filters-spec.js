'use strict';

var preDefCollection = require('./backbone-collection-predefined-filters'),
    MOCK_DATA = require('../test/MOCK_DATA'),
    _ = require('underscore'),
    Backbone = require('backbone'),
    expect = require('must');
var generateTestModel = function(attributes) {
    return new Backbone.Model(attributes);
}
var modelAttributes = {
    modelA: {
        testIntData: 1,
        testStrData: 'this is test A in 1a'
    },
    modelB: {
        testIntData: 2,
        testStrData: 'this is test B in 2b'
    },
    modelC: {
        testIntData: 3,
        testStrData: 'this is test C in 1c'
    },
    modelD: {
        testIntData: 4,
        testStrData: 'this is test C in 1d'
    }
};
var getBaseCollection = function(addBasePredefinedFilters) {
    var baseCollection = new preDefCollection([generateTestModel(modelAttributes.modelA), generateTestModel(modelAttributes.modelB), generateTestModel(modelAttributes.modelC)]);
    if (!_.isUndefined(addBasePredefinedFilters) && addBasePredefinedFilters === true) {
        baseCollection.addPredefinedFilter('test-filter-1', filter1);
        baseCollection.addPredefinedFilter('test-filter-2', filter2);
        baseCollection.addPredefinedFilter('test-filter-3', filter3);
        baseCollection.addPredefinedFilter('test-filter-4', filter4);
    }
    return baseCollection;
};
var getMockCollection = function(options) {
    var models = [];
    _.each(MOCK_DATA, function(data) {
        models.push(generateTestModel(data));
    });
    return new preDefCollection(models, options);
};
var hasModel = function(collection, attributes, checkOriginalModels) {
    var searched = collection.where(attributes);
    if (!_.isUndefined(checkOriginalModels) && checkOriginalModels === true) {
        searched = _.filter(collection.originalModels, function(model) {
            return _.isMatch(model.attributes, attributes);
        });
    }
    if (searched.length >= 1) {
        return true;
    }
    return false;
}
var filter1 = function(model) {
    return model.get('testIntData') === 1;
};
var filter2 = function(model) {
    var searchStr = 'test C';
    return model.get('testStrData').toLowerCase().indexOf(searchStr.toLowerCase()) !== -1;
};
var filter3 = function(model) {
    var searchStr = 'in 1';
    return model.get('testStrData').toLowerCase().indexOf(searchStr.toLowerCase()) !== -1;
};
var filter4 = function(model) {
    return filter1(model) || filter2(model);
};
var findFemales = function(model) {
    return model.get('gender') === 'Female';
};
var findMales = function(model) {
    return model.get('gender') === 'Male';
};
var findSchoolEmail = function(model) {
    var searchStr = '.edu';
    return model.get('email').toLowerCase().indexOf(searchStr.toLowerCase()) !== -1;
};
var findGovernmentEmail = function(model) {
    var searchStr = '.gov';
    return model.get('email').toLowerCase().indexOf(searchStr.toLowerCase()) !== -1;
};
var findSchoolOrGovEmail = function(model) {
    return findSchoolEmail(model) || findGovernmentEmail(model);
};

describe('### Testing Predefined Filter Collection Functionality with base data ###', function() {
    describe('# Testing base functionality', function() {
        var testCollection_base = getBaseCollection(true);
        var testCollection_base2 = getBaseCollection(true);
        var testCollection_base3 = getBaseCollection(true);
        var testCollection_base4 = getBaseCollection(true);
        var testCollection_base5 = getBaseCollection(true);
        var testCollection_base6 = getBaseCollection(true);
        var testCollection_base7 = getBaseCollection(true);
        var testCollection_base8 = getBaseCollection();

        describe('* Collection Models are set', function() {
            it('Returns expected number of models', function() {
                expect(testCollection_base.models.length).to.equal(3);
            });
            it('Returns expected model_1', function() {
                expect(hasModel(testCollection_base, modelAttributes.modelA)).to.equal(true);
            });
            it('Returns expected model_2', function() {
                expect(hasModel(testCollection_base, modelAttributes.modelB)).to.equal(true);
            });
            it('Returns expected model_3', function() {
                expect(hasModel(testCollection_base, modelAttributes.modelC)).to.equal(true);
            });
            describe('- Original Models are set', function() {
                it('Returns expected number of models', function() {
                    expect(testCollection_base.originalModels.length).to.equal(3);
                });
                it('Returns expected model_1', function() {
                    expect(hasModel(testCollection_base, modelAttributes.modelA, true)).to.equal(true);
                });
                it('Returns expected model_2', function() {
                    expect(hasModel(testCollection_base, modelAttributes.modelB, true)).to.equal(true);
                });
                it('Returns expected model_3', function() {
                    expect(hasModel(testCollection_base, modelAttributes.modelC, true)).to.equal(true);
                });
            });
        });
        describe('* Filter functions are set', function() {
            it('predefinedFilters is set', function() {
                expect(Object.keys(testCollection_base.predefinedFilters).length).to.equal(4);
            });
            it('_predefinedFiltersApplied is set to false', function() {
                expect(testCollection_base._predefinedFiltersApplied).to.equal(false);
            });
            it('Apply filter1 is set to false', function() {
                expect(testCollection_base._appliedPredefinedFilters['test-filter-1']).to.equal(false);
            });
            it('Apply filter2 is set to false', function() {
                expect(testCollection_base._appliedPredefinedFilters['test-filter-2']).to.equal(false);
            });
            it('Apply filter3 is set to false', function() {
                expect(testCollection_base._appliedPredefinedFilters['test-filter-3']).to.equal(false);
            });
            it('Apply filter4 is set to false', function() {
                expect(testCollection_base._appliedPredefinedFilters['test-filter-4']).to.equal(false);
            });
        });
        describe('* Apply Filter 1', function() {
            testCollection_base2.applyPredefinedFilter('test-filter-1', true);
            it('_predefinedFiltersApplied is set to true', function() {
                expect(testCollection_base2._predefinedFiltersApplied).to.equal(true);
            });
            it('Apply filter1 is set to true', function() {
                expect(testCollection_base2._appliedPredefinedFilters['test-filter-1']).to.equal(true);
            });
            it('Apply filter2 is set to false', function() {
                expect(testCollection_base2._appliedPredefinedFilters['test-filter-2']).to.equal(false);
            });
            it('Apply filter3 is set to false', function() {
                expect(testCollection_base2._appliedPredefinedFilters['test-filter-3']).to.equal(false);
            });
            it('Apply filter4 is set to false', function() {
                expect(testCollection_base2._appliedPredefinedFilters['test-filter-4']).to.equal(false);
            });
            it('Returns expected number of models', function() {
                expect(testCollection_base2.models.length).to.equal(1);
            });
            it('Returns expected model', function() {
                expect(hasModel(testCollection_base2, modelAttributes.modelA)).to.equal(true);
            });
            describe('- Original Models is unaffected', function() {
                it('Returns expected number of models', function() {
                    expect(testCollection_base2.originalModels.length).to.equal(3);
                });
                it('Returns expected model_1', function() {
                    expect(hasModel(testCollection_base2, modelAttributes.modelA, true)).to.equal(true);
                });
                it('Returns expected model_2', function() {
                    expect(hasModel(testCollection_base2, modelAttributes.modelB, true)).to.equal(true);
                });
                it('Returns expected model_3', function() {
                    expect(hasModel(testCollection_base2, modelAttributes.modelC, true)).to.equal(true);
                });
            });
        });
        describe('* Unapply Filter 1', function() {
            testCollection_base3.applyPredefinedFilter('test-filter-1', true);
            testCollection_base3.applyPredefinedFilter('test-filter-1', false);
            it('_predefinedFiltersApplied is set to false', function() {
                expect(testCollection_base3._predefinedFiltersApplied).to.equal(false);
            });
            it('Apply filter1 is set to true', function() {
                expect(testCollection_base3._appliedPredefinedFilters['test-filter-1']).to.equal(false);
            });
            it('Apply filter2 is set to false', function() {
                expect(testCollection_base3._appliedPredefinedFilters['test-filter-2']).to.equal(false);
            });
            it('Apply filter3 is set to false', function() {
                expect(testCollection_base3._appliedPredefinedFilters['test-filter-3']).to.equal(false);
            });
            it('Apply filter4 is set to false', function() {
                expect(testCollection_base3._appliedPredefinedFilters['test-filter-4']).to.equal(false);
            });
            it('Returns expected number of models', function() {
                expect(testCollection_base3.models.length).to.equal(3);
            });
            it('Returns expected model_1', function() {
                expect(hasModel(testCollection_base3, modelAttributes.modelA)).to.equal(true);
            });
            it('Returns expected model_2', function() {
                expect(hasModel(testCollection_base3, modelAttributes.modelB)).to.equal(true);
            });
            it('Returns expected model_3', function() {
                expect(hasModel(testCollection_base3, modelAttributes.modelC)).to.equal(true);
            });
            describe('- Original Models is unaffected', function() {
                it('Returns expected number of models', function() {
                    expect(testCollection_base3.originalModels.length).to.equal(3);
                });
                it('Returns expected model_1', function() {
                    expect(hasModel(testCollection_base3, modelAttributes.modelA, true)).to.equal(true);
                });
                it('Returns expected model_2', function() {
                    expect(hasModel(testCollection_base3, modelAttributes.modelB, true)).to.equal(true);
                });
                it('Returns expected model_3', function() {
                    expect(hasModel(testCollection_base3, modelAttributes.modelC, true)).to.equal(true);
                });
            });
        });
        describe('* Remove Filter 1', function() {
            testCollection_base4.applyPredefinedFilter('test-filter-1', true);
            testCollection_base4.removePredefinedFilter('test-filter-1', true);
            it('_predefinedFiltersApplied is set to false', function() {
                expect(testCollection_base4._predefinedFiltersApplied).to.equal(false);
            });
            it('Predefined filter1 is undefined', function() {
                expect(testCollection_base4.predefinedFilters['test-filter-1']).to.equal(undefined);
            });
            it('Apply filter1 is undefined', function() {
                expect(testCollection_base4._appliedPredefinedFilters['test-filter-1']).to.equal(undefined);
            });
            it('Apply filter2 is set to false', function() {
                expect(testCollection_base4._appliedPredefinedFilters['test-filter-2']).to.equal(false);
            });
            it('Apply filter3 is set to false', function() {
                expect(testCollection_base4._appliedPredefinedFilters['test-filter-3']).to.equal(false);
            });
            it('Apply filter4 is set to false', function() {
                expect(testCollection_base4._appliedPredefinedFilters['test-filter-4']).to.equal(false);
            });
            it('Returns expected number of models', function() {
                expect(testCollection_base4.models.length).to.equal(3);
            });
            it('Returns expected model_1', function() {
                expect(hasModel(testCollection_base4, modelAttributes.modelA)).to.equal(true);
            });
            it('Returns expected model_2', function() {
                expect(hasModel(testCollection_base4, modelAttributes.modelB)).to.equal(true);
            });
            it('Returns expected model_3', function() {
                expect(hasModel(testCollection_base4, modelAttributes.modelC)).to.equal(true);
            });
            describe('- Original Models is unaffected', function() {
                it('Returns expected number of models', function() {
                    expect(testCollection_base4.originalModels.length).to.equal(3);
                });
                it('Returns expected model_1', function() {
                    expect(hasModel(testCollection_base4, modelAttributes.modelA, true)).to.equal(true);
                });
                it('Returns expected model_2', function() {
                    expect(hasModel(testCollection_base4, modelAttributes.modelB, true)).to.equal(true);
                });
                it('Returns expected model_3', function() {
                    expect(hasModel(testCollection_base4, modelAttributes.modelC, true)).to.equal(true);
                });
            });
        });
        describe('* Testing Collection Triggers', function() {
            describe('- Apply Filter 1', function() {
                testCollection_base5.trigger('predefined-filters:apply', 'test-filter-1', true);
                it('_predefinedFiltersApplied is set to true', function() {
                    expect(testCollection_base2._predefinedFiltersApplied).to.equal(true);
                });
                it('Apply filter1 is set to true', function() {
                    expect(testCollection_base5._appliedPredefinedFilters['test-filter-1']).to.equal(true);
                });
                it('Apply filter2 is set to false', function() {
                    expect(testCollection_base5._appliedPredefinedFilters['test-filter-2']).to.equal(false);
                });
                it('Apply filter3 is set to false', function() {
                    expect(testCollection_base5._appliedPredefinedFilters['test-filter-3']).to.equal(false);
                });
                it('Apply filter4 is set to false', function() {
                    expect(testCollection_base5._appliedPredefinedFilters['test-filter-4']).to.equal(false);
                });
                it('Returns expected number of models', function() {
                    expect(testCollection_base5.models.length).to.equal(1);
                });
                it('Returns expected model', function() {
                    expect(hasModel(testCollection_base5, modelAttributes.modelA)).to.equal(true);
                });
                describe('> Original Models is unaffected', function() {
                    it('Returns expected number of models', function() {
                        expect(testCollection_base5.originalModels.length).to.equal(3);
                    });
                    it('Returns expected model_1', function() {
                        expect(hasModel(testCollection_base5, modelAttributes.modelA, true)).to.equal(true);
                    });
                    it('Returns expected model_2', function() {
                        expect(hasModel(testCollection_base5, modelAttributes.modelB, true)).to.equal(true);
                    });
                    it('Returns expected model_3', function() {
                        expect(hasModel(testCollection_base5, modelAttributes.modelC, true)).to.equal(true);
                    });
                });
            });
            describe('- Unapply Filter 1', function() {
                testCollection_base6.applyPredefinedFilter('test-filter-1', true);
                testCollection_base6.trigger('predefined-filters:apply', 'test-filter-1', false);
                it('_predefinedFiltersApplied is set to false', function() {
                    expect(testCollection_base6._predefinedFiltersApplied).to.equal(false);
                });
                it('Apply filter1 is set to true', function() {
                    expect(testCollection_base6._appliedPredefinedFilters['test-filter-1']).to.equal(false);
                });
                it('Apply filter2 is set to false', function() {
                    expect(testCollection_base6._appliedPredefinedFilters['test-filter-2']).to.equal(false);
                });
                it('Apply filter3 is set to false', function() {
                    expect(testCollection_base6._appliedPredefinedFilters['test-filter-3']).to.equal(false);
                });
                it('Apply filter4 is set to false', function() {
                    expect(testCollection_base6._appliedPredefinedFilters['test-filter-4']).to.equal(false);
                });
                it('Returns expected number of models', function() {
                    expect(testCollection_base6.models.length).to.equal(3);
                });
                it('Returns expected model_1', function() {
                    expect(hasModel(testCollection_base6, modelAttributes.modelA)).to.equal(true);
                });
                it('Returns expected model_2', function() {
                    expect(hasModel(testCollection_base6, modelAttributes.modelB)).to.equal(true);
                });
                it('Returns expected model_3', function() {
                    expect(hasModel(testCollection_base6, modelAttributes.modelC)).to.equal(true);
                });
                describe('> Original Models is unaffected', function() {
                    it('Returns expected number of models', function() {
                        expect(testCollection_base6.originalModels.length).to.equal(3);
                    });
                    it('Returns expected model_1', function() {
                        expect(hasModel(testCollection_base6, modelAttributes.modelA, true)).to.equal(true);
                    });
                    it('Returns expected model_2', function() {
                        expect(hasModel(testCollection_base6, modelAttributes.modelB, true)).to.equal(true);
                    });
                    it('Returns expected model_3', function() {
                        expect(hasModel(testCollection_base6, modelAttributes.modelC, true)).to.equal(true);
                    });
                });
            });
            describe('* Remove Filter 1', function() {
                testCollection_base7.applyPredefinedFilter('test-filter-1', true);
                testCollection_base7.trigger('predefined-filters:remove', 'test-filter-1');
                it('_predefinedFiltersApplied is set to false', function() {
                    expect(testCollection_base7._predefinedFiltersApplied).to.equal(false);
                });
                it('Predefined filter1 is undefined', function() {
                    expect(testCollection_base7.predefinedFilters['test-filter-1']).to.equal(undefined);
                });
                it('Apply filter1 is undefined', function() {
                    expect(testCollection_base7._appliedPredefinedFilters['test-filter-1']).to.equal(undefined);
                });
                it('Apply filter2 is set to false', function() {
                    expect(testCollection_base7._appliedPredefinedFilters['test-filter-2']).to.equal(false);
                });
                it('Apply filter3 is set to false', function() {
                    expect(testCollection_base7._appliedPredefinedFilters['test-filter-3']).to.equal(false);
                });
                it('Apply filter4 is set to false', function() {
                    expect(testCollection_base7._appliedPredefinedFilters['test-filter-4']).to.equal(false);
                });
                it('Returns expected number of models', function() {
                    expect(testCollection_base7.models.length).to.equal(3);
                });
                it('Returns expected model_1', function() {
                    expect(hasModel(testCollection_base7, modelAttributes.modelA)).to.equal(true);
                });
                it('Returns expected model_2', function() {
                    expect(hasModel(testCollection_base7, modelAttributes.modelB)).to.equal(true);
                });
                it('Returns expected model_3', function() {
                    expect(hasModel(testCollection_base7, modelAttributes.modelC)).to.equal(true);
                });
                describe('> Original Models is unaffected', function() {
                    it('Returns expected number of models', function() {
                        expect(testCollection_base7.originalModels.length).to.equal(3);
                    });
                    it('Returns expected model_1', function() {
                        expect(hasModel(testCollection_base7, modelAttributes.modelA, true)).to.equal(true);
                    });
                    it('Returns expected model_2', function() {
                        expect(hasModel(testCollection_base7, modelAttributes.modelB, true)).to.equal(true);
                    });
                    it('Returns expected model_3', function() {
                        expect(hasModel(testCollection_base7, modelAttributes.modelC, true)).to.equal(true);
                    });
                });
            });
            describe('- Add Filters', function() {
                testCollection_base8.trigger('predefined-filters:add', 'test-filter-1', filter1, false);
                testCollection_base8.trigger('predefined-filters:add', 'test-filter-2', filter2, false);
                testCollection_base8.trigger('predefined-filters:add', 'test-filter-3', filter3, false);
                testCollection_base8.trigger('predefined-filters:add', 'test-filter-4', filter4, false);
                it('_predefinedFiltersApplied is set to false', function() {
                    expect(testCollection_base8._predefinedFiltersApplied).to.equal(false);
                });
                it('Apply filter1 is set to false', function() {
                    expect(testCollection_base8._appliedPredefinedFilters['test-filter-1']).to.equal(false);
                });
                it('Apply filter2 is set to false', function() {
                    expect(testCollection_base8._appliedPredefinedFilters['test-filter-2']).to.equal(false);
                });
                it('Apply filter3 is set to false', function() {
                    expect(testCollection_base8._appliedPredefinedFilters['test-filter-3']).to.equal(false);
                });
                it('Apply filter4 is set to false', function() {
                    expect(testCollection_base8._appliedPredefinedFilters['test-filter-4']).to.equal(false);
                });
            });
        });
    });
    describe('# Testing filter1', function() {
        var testCollection_1 = getBaseCollection();
        testCollection_1.addPredefinedFilter('test-filter-1', filter1, true);
        it('Returns expected number of models', function() {
            expect(testCollection_1.models.length).to.equal(1);
        });
        it('Returns expected model', function() {
            expect(hasModel(testCollection_1, modelAttributes.modelA)).to.equal(true);
        });
        describe('* Original Models is unaffected', function() {
            it('Returns expected number of models', function() {
                expect(testCollection_1.originalModels.length).to.equal(3);
            });
            it('Returns expected model_1', function() {
                expect(hasModel(testCollection_1, modelAttributes.modelA, true)).to.equal(true);
            });
            it('Returns expected model_2', function() {
                expect(hasModel(testCollection_1, modelAttributes.modelB, true)).to.equal(true);
            });
            it('Returns expected model_3', function() {
                expect(hasModel(testCollection_1, modelAttributes.modelC, true)).to.equal(true);
            });
        });
    });
    describe('# Testing filter2', function() {
        var testCollection_2 = getBaseCollection();
        testCollection_2.addPredefinedFilter('test-filter-2', filter2, true);
        it('Returns expected number of models', function() {
            expect(testCollection_2.models.length).to.equal(1);
        });
        it('Returns expected model', function() {
            expect(hasModel(testCollection_2, modelAttributes.modelC)).to.equal(true);
        });
        describe('* Original Models is unaffected', function() {
            it('Returns expected number of models', function() {
                expect(testCollection_2.originalModels.length).to.equal(3);
            });
            it('Returns expected model_1', function() {
                expect(hasModel(testCollection_2, modelAttributes.modelA, true)).to.equal(true);
            });
            it('Returns expected model_2', function() {
                expect(hasModel(testCollection_2, modelAttributes.modelB, true)).to.equal(true);
            });
            it('Returns expected model_3', function() {
                expect(hasModel(testCollection_2, modelAttributes.modelC, true)).to.equal(true);
            });
        });
    });
    describe('# Testing filter3', function() {
        var testCollection_3 = getBaseCollection();
        testCollection_3.addPredefinedFilter('test-filter-3', filter3, true);
        it('Returns expected number of models', function() {
            expect(testCollection_3.models.length).to.equal(2);
        });
        it('Returns expected model_1', function() {
            expect(hasModel(testCollection_3, modelAttributes.modelA)).to.equal(true);
        });
        it('Returns expected model_2', function() {
            expect(hasModel(testCollection_3, modelAttributes.modelC)).to.equal(true);
        });
        describe('* Original Models is unaffected', function() {
            it('Returns expected number of models', function() {
                expect(testCollection_3.originalModels.length).to.equal(3);
            });
            it('Returns expected model_1', function() {
                expect(hasModel(testCollection_3, modelAttributes.modelA, true)).to.equal(true);
            });
            it('Returns expected model_2', function() {
                expect(hasModel(testCollection_3, modelAttributes.modelB, true)).to.equal(true);
            });
            it('Returns expected model_3', function() {
                expect(hasModel(testCollection_3, modelAttributes.modelC, true)).to.equal(true);
            });
        });
    });
    describe('# Testing filter1 + filter3', function() {
        var testCollection_4 = getBaseCollection();
        testCollection_4.addPredefinedFilter('test-filter-1', filter1, true);
        testCollection_4.addPredefinedFilter('test-filter-3', filter3, true);
        it('Returns expected number of models', function() {
            expect(testCollection_4.models.length).to.equal(1);
        });
        it('Returns expected model', function() {
            expect(hasModel(testCollection_4, modelAttributes.modelA)).to.equal(true);
        });
        describe('* Original Models is unaffected', function() {
            it('Returns expected number of models', function() {
                expect(testCollection_4.originalModels.length).to.equal(3);
            });
            it('Returns expected model_1', function() {
                expect(hasModel(testCollection_4, modelAttributes.modelA, true)).to.equal(true);
            });
            it('Returns expected model_2', function() {
                expect(hasModel(testCollection_4, modelAttributes.modelB, true)).to.equal(true);
            });
            it('Returns expected model_3', function() {
                expect(hasModel(testCollection_4, modelAttributes.modelC, true)).to.equal(true);
            });
        });
    });
    describe('# Testing filter2 + filter3', function() {
        var testCollection_5 = getBaseCollection();
        testCollection_5.addPredefinedFilter('test-filter-2', filter2, true);
        testCollection_5.addPredefinedFilter('test-filter-3', filter3, true);
        it('Returns expected number of models', function() {
            expect(testCollection_5.models.length).to.equal(1);
        });
        it('Returns expected model', function() {
            expect(hasModel(testCollection_5, modelAttributes.modelC)).to.equal(true);
        });
        describe('* Original Models is unaffected', function() {
            it('Returns expected number of models', function() {
                expect(testCollection_5.originalModels.length).to.equal(3);
            });
            it('Returns expected model_1', function() {
                expect(hasModel(testCollection_5, modelAttributes.modelA, true)).to.equal(true);
            });
            it('Returns expected model_2', function() {
                expect(hasModel(testCollection_5, modelAttributes.modelB, true)).to.equal(true);
            });
            it('Returns expected model_3', function() {
                expect(hasModel(testCollection_5, modelAttributes.modelC, true)).to.equal(true);
            });
        });
    });
    describe('* Testing filter1 + filter2', function() {
        var testCollection_6 = getBaseCollection();
        testCollection_6.addPredefinedFilter('test-filter-1', filter1, true);
        testCollection_6.addPredefinedFilter('test-filter-2', filter2, true);
        it('Returns expected number of models', function() {
            expect(testCollection_6.models.length).to.equal(0);
        });
        describe('* Original Models is unaffected', function() {
            it('Returns expected number of models', function() {
                expect(testCollection_6.originalModels.length).to.equal(3);
            });
            it('Returns expected model_1', function() {
                expect(hasModel(testCollection_6, modelAttributes.modelA, true)).to.equal(true);
            });
            it('Returns expected model_2', function() {
                expect(hasModel(testCollection_6, modelAttributes.modelB, true)).to.equal(true);
            });
            it('Returns expected model_3', function() {
                expect(hasModel(testCollection_6, modelAttributes.modelC, true)).to.equal(true);
            });
        });
    });
    describe('# Testing addModel', function() {
        var testCollection_7 = getBaseCollection();
        testCollection_7.addPredefinedFilter('test-filter-2', filter2, true);
        testCollection_7.addPredefinedFilter('test-filter-3', filter3, true);
        testCollection_7.add(generateTestModel(modelAttributes.modelD));
        it('Returns expected number of models', function() {
            expect(testCollection_7.models.length).to.equal(2);
        });
        it('Returns expected model_1', function() {
            expect(hasModel(testCollection_7, modelAttributes.modelC)).to.equal(true);
        });
        it('Returns expected model_2', function() {
            expect(hasModel(testCollection_7, modelAttributes.modelD)).to.equal(true);
        });
        describe('* Model added to original Models', function() {
            it('Returns expected number of models', function() {
                expect(testCollection_7.originalModels.length).to.equal(4);
            });
            it('Model is added', function() {
                expect(hasModel(testCollection_7, modelAttributes.modelD, true)).to.equal(true);
            });
        });
    });
    describe('# Testing removeModel', function() {
        var testCollection_8 = getBaseCollection();
        testCollection_8.addPredefinedFilter('test-filter-2', filter2, true);
        testCollection_8.addPredefinedFilter('test-filter-3', filter3, true);
        testCollection_8.add(generateTestModel(modelAttributes.modelD));
        testCollection_8.remove(testCollection_8.where(modelAttributes.modelC)[0]);
        it('Returns expected number of models', function() {
            expect(testCollection_8.models.length).to.equal(1);
        });
        it('Returns expected model', function() {
            expect(hasModel(testCollection_8, modelAttributes.modelD)).to.equal(true);
        });
        describe('* Model removed from original Models', function() {
            it('Returns expected number of models', function() {
                expect(testCollection_8.originalModels.length).to.equal(3);
            });
            it('Model is removed', function() {
                expect(hasModel(testCollection_8, modelAttributes.modelC, true)).to.equal(false);
            });
        });
    });
    describe('# Testing Or Clause filter', function() {
        var testCollection_9 = getBaseCollection();
        testCollection_9.addPredefinedFilter('test-filter-4', filter4, true);
        it('Returns expected number of models', function() {
            expect(testCollection_9.models.length).to.equal(2);
        });
        it('Returns expected model_1', function() {
            expect(hasModel(testCollection_9, modelAttributes.modelA)).to.equal(true);
        });
        it('Returns expected model_2', function() {
            expect(hasModel(testCollection_9, modelAttributes.modelA)).to.equal(true);
        });
        describe('* Original Models is unaffected', function() {
            it('Returns expected number of models', function() {
                expect(testCollection_9.originalModels.length).to.equal(3);
            });
            it('Returns expected model_1', function() {
                expect(hasModel(testCollection_9, modelAttributes.modelA, true)).to.equal(true);
            });
            it('Returns expected model_2', function() {
                expect(hasModel(testCollection_9, modelAttributes.modelB, true)).to.equal(true);
            });
            it('Returns expected model_3', function() {
                expect(hasModel(testCollection_9, modelAttributes.modelC, true)).to.equal(true);
            });
        });
    });
});
describe('### Testing Predefined Filter Collection Functionality with large Mock data ###', function() {
    describe('# Testing Male/Female Filters', function() {
        var mockCollection = getMockCollection();
        var mockCollection2 = getMockCollection();
        mockCollection.addPredefinedFilter('findMales', findMales, true);
        mockCollection2.addPredefinedFilter('findFemales', findFemales, true);
        it('All Personal found', function() {
            expect(mockCollection.models.length + mockCollection2.models.length).to.equal(1000);
        });
        it('Find all Male personal', function() {
            expect(mockCollection.models.length).to.equal(490);
        });
        it('Find all Female personal', function() {
            expect(mockCollection2.models.length).to.equal(510);
        });
        describe('* Original Models is unaffected', function() {
            it('First Collection Returns expected number of models', function() {
                expect(mockCollection.originalModels.length).to.equal(1000);
            });
            it('Second Collection Returns expected number of models', function() {
                expect(mockCollection2.originalModels.length).to.equal(1000);
            });
        });
    });
    describe('# Testing Base Paging', function() {

        var mockCollection = getMockCollection({
            pagingOptions: {
                modelsPerPage: 10
            }
        });
        mockCollection.trigger('sync');
        it('Collection has 100 pages', function() {
            expect(mockCollection.pagingInfo.pages).to.equal(100);
        });
        describe('* First Page Contains Correct models', function() {

            it('First page has 10 models', function() {
                expect(mockCollection._pages[0].length).to.equal(10);
            });
            it('Collection Models has 10', function() {
                expect(mockCollection.models.length).to.equal(10);
            });
            _.each(mockCollection.models, function(model, index) {
                var matchModel = _.where(mockCollection._pages[0], {
                    cid: model.cid
                })[0] !== undefined;
                it('Returns Expected Model at index ' + index, function() {
                    expect(matchModel).to.equal(true);
                });
            });
        });
        describe('* Original Models is unaffected', function() {
            it('First Collection Returns expected number of models', function() {
                expect(mockCollection.originalModels.length).to.equal(1000);
            });
        });
        describe('* All data in pages maps back to original Models', function() {
            _.each(mockCollection._pages, function(page, page_index) {
                describe('- Verifying page ' + (page_index + 1), function() {
                    _.each(mockCollection.models, function(model, index) {
                        var matchModel = _.where(mockCollection.originalModels, {
                            cid: model.cid
                        })[0] !== undefined;
                        it('Returns Expected Model at index ' + index, function() {
                            expect(matchModel).to.equal(true);
                        });
                    });
                });
            });
        });

    });
    describe('# Testing Pagination With applied filters', function() {

        var mockCollection = getMockCollection({
            pagingOptions: {
                modelsPerPage: 20
            }
        });
        mockCollection.trigger('sync');
        mockCollection.trigger('predefined-filters:add', 'findMales', findMales, true);
        it('Collection has 100 pages', function() {
            expect(mockCollection.pagingInfo.pages).to.equal(25);
        });
        describe('* First Page Contains Correct models', function() {

            it('First page has 10 models', function() {
                expect(mockCollection._pages[0].length).to.equal(20);
            });
            it('Collection Models has 10', function() {
                expect(mockCollection.models.length).to.equal(20);
            });
            _.each(mockCollection.models, function(model, index) {
                var matchModel = _.where(mockCollection._pages[0], {
                    cid: model.cid
                })[0] !== undefined;
                it('Returns Expected Model at index ' + index, function() {
                    expect(matchModel).to.equal(true);
                });
            });
        });
        describe('* Original Models is unaffected', function() {
            it('First Collection Returns expected number of models', function() {
                expect(mockCollection.originalModels.length).to.equal(1000);
            });
        });
        describe('* All data in pages maps back to original Models', function() {
            _.each(mockCollection._pages, function(page, page_index) {
                describe('- Verifying page ' + (page_index + 1), function() {
                    _.each(mockCollection.models, function(model, index) {
                        var matchModel = _.where(mockCollection.originalModels, {
                            cid: model.cid
                        })[0] !== undefined;
                        it('Returns Expected Model at index ' + index, function() {
                            expect(matchModel).to.equal(true);
                        });
                    });
                });
            });
        });

    });
});