'use strict';
var _ = require('underscore'),
    utils = require('../test/test-utils'),
    expect = require('must');

describe('### Testing Predefined Filter Collection Functionality with base data ###', function() {
    describe('# Testing base functionality', function() {
        var options = {
            predefinedFilters: {
                'test-filter-1': utils.filter1,
                'test-filter-2': utils.filter2,
                'test-filter-3': utils.filter3,
                'test-filter-4': utils.filter4
            },
            appliedPredefinedFilters: {
                'test-filter-1': true,
                'test-filter-2': false,
                'test-filter-4': false
            }
        };
        var testCollection_base = utils.getBaseCollection(true);
        var testCollection_base2 = utils.getBaseCollection(true);
        var testCollection_base2b = utils.getBaseCollection(true);
        var testCollection_base3 = utils.getBaseCollection(true);
        var testCollection_base4 = utils.getBaseCollection(true);
        var testCollection_base5 = utils.getBaseCollection(true);
        var testCollection_base6 = utils.getBaseCollection(true);
        var testCollection_base7 = utils.getBaseCollection(true);
        var testCollection_base8 = utils.getBaseCollection();
        var testCollection_base9 = utils.getBaseCollection(false, options);
        var testCollection_base10 = utils.getBaseCollection(true);

        describe('* Collection Models are set', function() {
            it('Returns expected number of models', function() {
                expect(testCollection_base.models.length).to.equal(3);
            });
            it('Returns expected model_1', function() {
                expect(utils.hasModel(testCollection_base, utils.modelAttributes.modelA)).to.equal(true);
            });
            it('Returns expected model_2', function() {
                expect(utils.hasModel(testCollection_base, utils.modelAttributes.modelB)).to.equal(true);
            });
            it('Returns expected model_3', function() {
                expect(utils.hasModel(testCollection_base, utils.modelAttributes.modelC)).to.equal(true);
            });
            describe('- Original Models are set', function() {
                it('Returns expected number of models', function() {
                    expect(testCollection_base.originalModels.length).to.equal(3);
                });
                it('Returns expected model_1', function() {
                    expect(utils.hasModel(testCollection_base, utils.modelAttributes.modelA, true)).to.equal(true);
                });
                it('Returns expected model_2', function() {
                    expect(utils.hasModel(testCollection_base, utils.modelAttributes.modelB, true)).to.equal(true);
                });
                it('Returns expected model_3', function() {
                    expect(utils.hasModel(testCollection_base, utils.modelAttributes.modelC, true)).to.equal(true);
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
            it('Apply utils.filter1 is set to false', function() {
                expect(testCollection_base._appliedPredefinedFilters['test-filter-1']).to.equal(false);
            });
            it('Apply utils.filter2 is set to false', function() {
                expect(testCollection_base._appliedPredefinedFilters['test-filter-2']).to.equal(false);
            });
            it('Apply utils.filter3 is set to false', function() {
                expect(testCollection_base._appliedPredefinedFilters['test-filter-3']).to.equal(false);
            });
            it('Apply utils.filter4 is set to false', function() {
                expect(testCollection_base._appliedPredefinedFilters['test-filter-4']).to.equal(false);
            });
        });
        describe('* Apply Filter 1', function() {
            testCollection_base2.applyPredefinedFilter('test-filter-1', true);
            it('_predefinedFiltersApplied is set to true', function() {
                expect(testCollection_base2._predefinedFiltersApplied).to.equal(true);
            });
            it('Apply utils.filter1 is set to true', function() {
                expect(testCollection_base2._appliedPredefinedFilters['test-filter-1']).to.equal(true);
            });
            it('Apply utils.filter2 is set to false', function() {
                expect(testCollection_base2._appliedPredefinedFilters['test-filter-2']).to.equal(false);
            });
            it('Apply utils.filter3 is set to false', function() {
                expect(testCollection_base2._appliedPredefinedFilters['test-filter-3']).to.equal(false);
            });
            it('Apply utils.filter4 is set to false', function() {
                expect(testCollection_base2._appliedPredefinedFilters['test-filter-4']).to.equal(false);
            });
            it('Returns expected number of models', function() {
                expect(testCollection_base2.models.length).to.equal(1);
            });
            it('Returns expected model', function() {
                expect(utils.hasModel(testCollection_base2, utils.modelAttributes.modelA)).to.equal(true);
            });
            describe('- Original Models is unaffected', function() {
                it('Returns expected number of models', function() {
                    expect(testCollection_base2.originalModels.length).to.equal(3);
                });
                it('Returns expected model_1', function() {
                    expect(utils.hasModel(testCollection_base2, utils.modelAttributes.modelA, true)).to.equal(true);
                });
                it('Returns expected model_2', function() {
                    expect(utils.hasModel(testCollection_base2, utils.modelAttributes.modelB, true)).to.equal(true);
                });
                it('Returns expected model_3', function() {
                    expect(utils.hasModel(testCollection_base2, utils.modelAttributes.modelC, true)).to.equal(true);
                });
            });
        });
        describe('* Apply Filter 1 and Filter 3 as object parameter', function() {
            testCollection_base2b.applyPredefinedFilter({
                'test-filter-1': true,
                'test-filter-3': true
            });
            it('_predefinedFiltersApplied is set to true', function() {
                expect(testCollection_base2b._predefinedFiltersApplied).to.equal(true);
            });
            it('Apply utils.filter1 is set to true', function() {
                expect(testCollection_base2b._appliedPredefinedFilters['test-filter-1']).to.equal(true);
            });
            it('Apply utils.filter2 is set to false', function() {
                expect(testCollection_base2b._appliedPredefinedFilters['test-filter-2']).to.equal(false);
            });
            it('Apply utils.filter3 is set to true', function() {
                expect(testCollection_base2b._appliedPredefinedFilters['test-filter-3']).to.equal(true);
            });
            it('Apply utils.filter4 is set to false', function() {
                expect(testCollection_base2b._appliedPredefinedFilters['test-filter-4']).to.equal(false);
            });
            it('Returns expected number of models', function() {
                expect(testCollection_base2b.models.length).to.equal(1);
            });
            it('Returns expected model', function() {
                expect(utils.hasModel(testCollection_base2b, utils.modelAttributes.modelA)).to.equal(true);
            });
            describe('- Original Models is unaffected', function() {
                it('Returns expected number of models', function() {
                    expect(testCollection_base2b.originalModels.length).to.equal(3);
                });
                it('Returns expected model_1', function() {
                    expect(utils.hasModel(testCollection_base2b, utils.modelAttributes.modelA, true)).to.equal(true);
                });
                it('Returns expected model_2', function() {
                    expect(utils.hasModel(testCollection_base2b, utils.modelAttributes.modelB, true)).to.equal(true);
                });
                it('Returns expected model_3', function() {
                    expect(utils.hasModel(testCollection_base2b, utils.modelAttributes.modelC, true)).to.equal(true);
                });
            });
        });
        describe('* Unapply Filter 1', function() {
            testCollection_base3.applyPredefinedFilter('test-filter-1', true);
            testCollection_base3.applyPredefinedFilter('test-filter-1', false);
            it('_predefinedFiltersApplied is set to false', function() {
                expect(testCollection_base3._predefinedFiltersApplied).to.equal(false);
            });
            it('Apply utils.filter1 is set to true', function() {
                expect(testCollection_base3._appliedPredefinedFilters['test-filter-1']).to.equal(false);
            });
            it('Apply utils.filter2 is set to false', function() {
                expect(testCollection_base3._appliedPredefinedFilters['test-filter-2']).to.equal(false);
            });
            it('Apply utils.filter3 is set to false', function() {
                expect(testCollection_base3._appliedPredefinedFilters['test-filter-3']).to.equal(false);
            });
            it('Apply utils.filter4 is set to false', function() {
                expect(testCollection_base3._appliedPredefinedFilters['test-filter-4']).to.equal(false);
            });
            it('Returns expected number of models', function() {
                expect(testCollection_base3.models.length).to.equal(3);
            });
            it('Returns expected model_1', function() {
                expect(utils.hasModel(testCollection_base3, utils.modelAttributes.modelA)).to.equal(true);
            });
            it('Returns expected model_2', function() {
                expect(utils.hasModel(testCollection_base3, utils.modelAttributes.modelB)).to.equal(true);
            });
            it('Returns expected model_3', function() {
                expect(utils.hasModel(testCollection_base3, utils.modelAttributes.modelC)).to.equal(true);
            });
            describe('- Original Models is unaffected', function() {
                it('Returns expected number of models', function() {
                    expect(testCollection_base3.originalModels.length).to.equal(3);
                });
                it('Returns expected model_1', function() {
                    expect(utils.hasModel(testCollection_base3, utils.modelAttributes.modelA, true)).to.equal(true);
                });
                it('Returns expected model_2', function() {
                    expect(utils.hasModel(testCollection_base3, utils.modelAttributes.modelB, true)).to.equal(true);
                });
                it('Returns expected model_3', function() {
                    expect(utils.hasModel(testCollection_base3, utils.modelAttributes.modelC, true)).to.equal(true);
                });
            });
        });
        describe('* Remove Filter 1', function() {
            testCollection_base4.applyPredefinedFilter('test-filter-1', true);
            testCollection_base4.removePredefinedFilter('test-filter-1', true);
            it('_predefinedFiltersApplied is set to false', function() {
                expect(testCollection_base4._predefinedFiltersApplied).to.equal(false);
            });
            it('Predefined utils.filter1 is undefined', function() {
                expect(testCollection_base4.predefinedFilters['test-filter-1']).to.equal(undefined);
            });
            it('Apply utils.filter1 is undefined', function() {
                expect(testCollection_base4._appliedPredefinedFilters['test-filter-1']).to.equal(undefined);
            });
            it('Apply utils.filter2 is set to false', function() {
                expect(testCollection_base4._appliedPredefinedFilters['test-filter-2']).to.equal(false);
            });
            it('Apply utils.filter3 is set to false', function() {
                expect(testCollection_base4._appliedPredefinedFilters['test-filter-3']).to.equal(false);
            });
            it('Apply utils.filter4 is set to false', function() {
                expect(testCollection_base4._appliedPredefinedFilters['test-filter-4']).to.equal(false);
            });
            it('Returns expected number of models', function() {
                expect(testCollection_base4.models.length).to.equal(3);
            });
            it('Returns expected model_1', function() {
                expect(utils.hasModel(testCollection_base4, utils.modelAttributes.modelA)).to.equal(true);
            });
            it('Returns expected model_2', function() {
                expect(utils.hasModel(testCollection_base4, utils.modelAttributes.modelB)).to.equal(true);
            });
            it('Returns expected model_3', function() {
                expect(utils.hasModel(testCollection_base4, utils.modelAttributes.modelC)).to.equal(true);
            });
            describe('- Original Models is unaffected', function() {
                it('Returns expected number of models', function() {
                    expect(testCollection_base4.originalModels.length).to.equal(3);
                });
                it('Returns expected model_1', function() {
                    expect(utils.hasModel(testCollection_base4, utils.modelAttributes.modelA, true)).to.equal(true);
                });
                it('Returns expected model_2', function() {
                    expect(utils.hasModel(testCollection_base4, utils.modelAttributes.modelB, true)).to.equal(true);
                });
                it('Returns expected model_3', function() {
                    expect(utils.hasModel(testCollection_base4, utils.modelAttributes.modelC, true)).to.equal(true);
                });
            });
        });
        describe('* Testing Collection Triggers', function() {
            describe('- Apply Filter 1', function() {
                testCollection_base5.trigger('predefined-filters:apply', 'test-filter-1', true);
                it('_predefinedFiltersApplied is set to true', function() {
                    expect(testCollection_base2._predefinedFiltersApplied).to.equal(true);
                });
                it('Apply utils.filter1 is set to true', function() {
                    expect(testCollection_base5._appliedPredefinedFilters['test-filter-1']).to.equal(true);
                });
                it('Apply utils.filter2 is set to false', function() {
                    expect(testCollection_base5._appliedPredefinedFilters['test-filter-2']).to.equal(false);
                });
                it('Apply utils.filter3 is set to false', function() {
                    expect(testCollection_base5._appliedPredefinedFilters['test-filter-3']).to.equal(false);
                });
                it('Apply utils.filter4 is set to false', function() {
                    expect(testCollection_base5._appliedPredefinedFilters['test-filter-4']).to.equal(false);
                });
                it('Returns expected number of models', function() {
                    expect(testCollection_base5.models.length).to.equal(1);
                });
                it('Returns expected model', function() {
                    expect(utils.hasModel(testCollection_base5, utils.modelAttributes.modelA)).to.equal(true);
                });
                describe('> Original Models is unaffected', function() {
                    it('Returns expected number of models', function() {
                        expect(testCollection_base5.originalModels.length).to.equal(3);
                    });
                    it('Returns expected model_1', function() {
                        expect(utils.hasModel(testCollection_base5, utils.modelAttributes.modelA, true)).to.equal(true);
                    });
                    it('Returns expected model_2', function() {
                        expect(utils.hasModel(testCollection_base5, utils.modelAttributes.modelB, true)).to.equal(true);
                    });
                    it('Returns expected model_3', function() {
                        expect(utils.hasModel(testCollection_base5, utils.modelAttributes.modelC, true)).to.equal(true);
                    });
                });
            });
            describe('- Unapply Filter 1', function() {
                testCollection_base6.applyPredefinedFilter('test-filter-1', true);
                testCollection_base6.trigger('predefined-filters:apply', 'test-filter-1', false);
                it('_predefinedFiltersApplied is set to false', function() {
                    expect(testCollection_base6._predefinedFiltersApplied).to.equal(false);
                });
                it('Apply utils.filter1 is set to true', function() {
                    expect(testCollection_base6._appliedPredefinedFilters['test-filter-1']).to.equal(false);
                });
                it('Apply utils.filter2 is set to false', function() {
                    expect(testCollection_base6._appliedPredefinedFilters['test-filter-2']).to.equal(false);
                });
                it('Apply utils.filter3 is set to false', function() {
                    expect(testCollection_base6._appliedPredefinedFilters['test-filter-3']).to.equal(false);
                });
                it('Apply utils.filter4 is set to false', function() {
                    expect(testCollection_base6._appliedPredefinedFilters['test-filter-4']).to.equal(false);
                });
                it('Returns expected number of models', function() {
                    expect(testCollection_base6.models.length).to.equal(3);
                });
                it('Returns expected model_1', function() {
                    expect(utils.hasModel(testCollection_base6, utils.modelAttributes.modelA)).to.equal(true);
                });
                it('Returns expected model_2', function() {
                    expect(utils.hasModel(testCollection_base6, utils.modelAttributes.modelB)).to.equal(true);
                });
                it('Returns expected model_3', function() {
                    expect(utils.hasModel(testCollection_base6, utils.modelAttributes.modelC)).to.equal(true);
                });
                describe('> Original Models is unaffected', function() {
                    it('Returns expected number of models', function() {
                        expect(testCollection_base6.originalModels.length).to.equal(3);
                    });
                    it('Returns expected model_1', function() {
                        expect(utils.hasModel(testCollection_base6, utils.modelAttributes.modelA, true)).to.equal(true);
                    });
                    it('Returns expected model_2', function() {
                        expect(utils.hasModel(testCollection_base6, utils.modelAttributes.modelB, true)).to.equal(true);
                    });
                    it('Returns expected model_3', function() {
                        expect(utils.hasModel(testCollection_base6, utils.modelAttributes.modelC, true)).to.equal(true);
                    });
                });
            });
            describe('* Remove Filter 1', function() {
                testCollection_base7.applyPredefinedFilter('test-filter-1', true);
                testCollection_base7.trigger('predefined-filters:remove', 'test-filter-1');
                it('_predefinedFiltersApplied is set to false', function() {
                    expect(testCollection_base7._predefinedFiltersApplied).to.equal(false);
                });
                it('Predefined utils.filter1 is undefined', function() {
                    expect(testCollection_base7.predefinedFilters['test-filter-1']).to.equal(undefined);
                });
                it('Apply utils.filter1 is undefined', function() {
                    expect(testCollection_base7._appliedPredefinedFilters['test-filter-1']).to.equal(undefined);
                });
                it('Apply utils.filter2 is set to false', function() {
                    expect(testCollection_base7._appliedPredefinedFilters['test-filter-2']).to.equal(false);
                });
                it('Apply utils.filter3 is set to false', function() {
                    expect(testCollection_base7._appliedPredefinedFilters['test-filter-3']).to.equal(false);
                });
                it('Apply utils.filter4 is set to false', function() {
                    expect(testCollection_base7._appliedPredefinedFilters['test-filter-4']).to.equal(false);
                });
                it('Returns expected number of models', function() {
                    expect(testCollection_base7.models.length).to.equal(3);
                });
                it('Returns expected model_1', function() {
                    expect(utils.hasModel(testCollection_base7, utils.modelAttributes.modelA)).to.equal(true);
                });
                it('Returns expected model_2', function() {
                    expect(utils.hasModel(testCollection_base7, utils.modelAttributes.modelB)).to.equal(true);
                });
                it('Returns expected model_3', function() {
                    expect(utils.hasModel(testCollection_base7, utils.modelAttributes.modelC)).to.equal(true);
                });
                describe('> Original Models is unaffected', function() {
                    it('Returns expected number of models', function() {
                        expect(testCollection_base7.originalModels.length).to.equal(3);
                    });
                    it('Returns expected model_1', function() {
                        expect(utils.hasModel(testCollection_base7, utils.modelAttributes.modelA, true)).to.equal(true);
                    });
                    it('Returns expected model_2', function() {
                        expect(utils.hasModel(testCollection_base7, utils.modelAttributes.modelB, true)).to.equal(true);
                    });
                    it('Returns expected model_3', function() {
                        expect(utils.hasModel(testCollection_base7, utils.modelAttributes.modelC, true)).to.equal(true);
                    });
                });
            });
            describe('- Add Filters', function() {
                testCollection_base8.trigger('predefined-filters:add', 'test-filter-1', utils.filter1, false);
                testCollection_base8.trigger('predefined-filters:add', 'test-filter-2', utils.filter2, false);
                testCollection_base8.trigger('predefined-filters:add', 'test-filter-3', utils.filter3, false);
                testCollection_base8.trigger('predefined-filters:add', 'test-filter-4', utils.filter4, false);
                it('_predefinedFiltersApplied is set to false', function() {
                    expect(testCollection_base8._predefinedFiltersApplied).to.equal(false);
                });
                it('Apply utils.filter1 is set to false', function() {
                    expect(testCollection_base8._appliedPredefinedFilters['test-filter-1']).to.equal(false);
                });
                it('Apply utils.filter2 is set to false', function() {
                    expect(testCollection_base8._appliedPredefinedFilters['test-filter-2']).to.equal(false);
                });
                it('Apply utils.filter3 is set to false', function() {
                    expect(testCollection_base8._appliedPredefinedFilters['test-filter-3']).to.equal(false);
                });
                it('Apply utils.filter4 is set to false', function() {
                    expect(testCollection_base8._appliedPredefinedFilters['test-filter-4']).to.equal(false);
                });
            });
        });
        describe('* Initialize with options', function() {
            testCollection_base9.applyPredefinedFilter('test-filter-1', true);
            it('_predefinedFiltersApplied is set to true', function() {
                expect(testCollection_base9._predefinedFiltersApplied).to.equal(true);
            });
            it('Apply utils.filter1 is set to true', function() {
                expect(testCollection_base9._appliedPredefinedFilters['test-filter-1']).to.equal(true);
            });
            it('Apply utils.filter2 is set to false', function() {
                expect(testCollection_base9._appliedPredefinedFilters['test-filter-2']).to.equal(false);
            });
            it('Apply utils.filter3 is set to false', function() {
                expect(testCollection_base9._appliedPredefinedFilters['test-filter-3']).to.equal(false);
            });
            it('Apply utils.filter4 is set to false', function() {
                expect(testCollection_base9._appliedPredefinedFilters['test-filter-4']).to.equal(false);
            });
            it('Returns expected number of models', function() {
                expect(testCollection_base9.models.length).to.equal(1);
            });
            it('Returns expected model', function() {
                expect(utils.hasModel(testCollection_base9, utils.modelAttributes.modelA)).to.equal(true);
            });
            describe('- Original Models is unaffected', function() {
                it('Returns expected number of models', function() {
                    expect(testCollection_base9.originalModels.length).to.equal(3);
                });
                it('Returns expected model_1', function() {
                    expect(utils.hasModel(testCollection_base9, utils.modelAttributes.modelA, true)).to.equal(true);
                });
                it('Returns expected model_2', function() {
                    expect(utils.hasModel(testCollection_base9, utils.modelAttributes.modelB, true)).to.equal(true);
                });
                it('Returns expected model_3', function() {
                    expect(utils.hasModel(testCollection_base9, utils.modelAttributes.modelC, true)).to.equal(true);
                });
            });
        });
        describe('* Verify on Change of Model data', function() {
            testCollection_base10.add(utils.generateTestModel(utils.modelAttributes.modelE));
            testCollection_base10.applyPredefinedFilter('test-filter-1', true);
            testCollection_base10.models[1].set('testIntData', 2);
            it('_predefinedFiltersApplied is set to true', function() {
                expect(testCollection_base10._predefinedFiltersApplied).to.equal(true);
            });
            it('Apply utils.filter1 is set to true', function() {
                expect(testCollection_base10._appliedPredefinedFilters['test-filter-1']).to.equal(true);
            });
            it('Apply utils.filter2 is set to false', function() {
                expect(testCollection_base10._appliedPredefinedFilters['test-filter-2']).to.equal(false);
            });
            it('Apply utils.filter3 is set to false', function() {
                expect(testCollection_base10._appliedPredefinedFilters['test-filter-3']).to.equal(false);
            });
            it('Apply utils.filter4 is set to false', function() {
                expect(testCollection_base10._appliedPredefinedFilters['test-filter-4']).to.equal(false);
            });
            it('Returns expected number of models', function() {
                expect(testCollection_base10.models.length).to.equal(1);
            });
            it('Returns expected model', function() {
                expect(utils.hasModel(testCollection_base10, utils.modelAttributes.modelA)).to.equal(true);
            });
            describe('- Original Models is updated', function() {
                it('Returns expected number of models', function() {
                    expect(testCollection_base10.originalModels.length).to.equal(4);
                });
                it('Returns expected model_1', function() {
                    expect(utils.hasModel(testCollection_base10, utils.modelAttributes.modelA, true)).to.equal(true);
                });
                it('Returns expected model_2', function() {
                    expect(utils.hasModel(testCollection_base10, utils.modelAttributes.modelB, true)).to.equal(true);
                });
                it('Returns expected model_3', function() {
                    expect(utils.hasModel(testCollection_base10, utils.modelAttributes.modelC, true)).to.equal(true);
                });
                it('Returns expected model_4', function() {
                    expect(utils.hasModel(testCollection_base10, {
                        testIntData: 2,
                        testStrData: 'this is test E in 2b'
                    }, true)).to.equal(true);
                });
            });
        });
    });
    describe('# Testing utils.filter1', function() {
        var testCollection_1 = utils.getBaseCollection();
        testCollection_1.addPredefinedFilter('test-filter-1', utils.filter1, true);
        it('Returns expected number of models', function() {
            expect(testCollection_1.models.length).to.equal(1);
        });
        it('Returns expected model', function() {
            expect(utils.hasModel(testCollection_1, utils.modelAttributes.modelA)).to.equal(true);
        });
        describe('* Original Models is unaffected', function() {
            it('Returns expected number of models', function() {
                expect(testCollection_1.originalModels.length).to.equal(3);
            });
            it('Returns expected model_1', function() {
                expect(utils.hasModel(testCollection_1, utils.modelAttributes.modelA, true)).to.equal(true);
            });
            it('Returns expected model_2', function() {
                expect(utils.hasModel(testCollection_1, utils.modelAttributes.modelB, true)).to.equal(true);
            });
            it('Returns expected model_3', function() {
                expect(utils.hasModel(testCollection_1, utils.modelAttributes.modelC, true)).to.equal(true);
            });
        });
    });
    describe('# Testing utils.filter2', function() {
        var testCollection_2 = utils.getBaseCollection();
        testCollection_2.addPredefinedFilter('test-filter-2', utils.filter2, true);
        it('Returns expected number of models', function() {
            expect(testCollection_2.models.length).to.equal(1);
        });
        it('Returns expected model', function() {
            expect(utils.hasModel(testCollection_2, utils.modelAttributes.modelC)).to.equal(true);
        });
        describe('* Original Models is unaffected', function() {
            it('Returns expected number of models', function() {
                expect(testCollection_2.originalModels.length).to.equal(3);
            });
            it('Returns expected model_1', function() {
                expect(utils.hasModel(testCollection_2, utils.modelAttributes.modelA, true)).to.equal(true);
            });
            it('Returns expected model_2', function() {
                expect(utils.hasModel(testCollection_2, utils.modelAttributes.modelB, true)).to.equal(true);
            });
            it('Returns expected model_3', function() {
                expect(utils.hasModel(testCollection_2, utils.modelAttributes.modelC, true)).to.equal(true);
            });
        });
    });
    describe('# Testing utils.filter3', function() {
        var testCollection_3 = utils.getBaseCollection();
        testCollection_3.addPredefinedFilter('test-filter-3', utils.filter3, true);
        it('Returns expected number of models', function() {
            expect(testCollection_3.models.length).to.equal(2);
        });
        it('Returns expected model_1', function() {
            expect(utils.hasModel(testCollection_3, utils.modelAttributes.modelA)).to.equal(true);
        });
        it('Returns expected model_2', function() {
            expect(utils.hasModel(testCollection_3, utils.modelAttributes.modelC)).to.equal(true);
        });
        describe('* Original Models is unaffected', function() {
            it('Returns expected number of models', function() {
                expect(testCollection_3.originalModels.length).to.equal(3);
            });
            it('Returns expected model_1', function() {
                expect(utils.hasModel(testCollection_3, utils.modelAttributes.modelA, true)).to.equal(true);
            });
            it('Returns expected model_2', function() {
                expect(utils.hasModel(testCollection_3, utils.modelAttributes.modelB, true)).to.equal(true);
            });
            it('Returns expected model_3', function() {
                expect(utils.hasModel(testCollection_3, utils.modelAttributes.modelC, true)).to.equal(true);
            });
        });
    });
    describe('# Testing utils.filter1 + utils.filter3', function() {
        var testCollection_4 = utils.getBaseCollection();
        testCollection_4.addPredefinedFilter('test-filter-1', utils.filter1, true);
        testCollection_4.addPredefinedFilter('test-filter-3', utils.filter3, true);
        it('Returns expected number of models', function() {
            expect(testCollection_4.models.length).to.equal(1);
        });
        it('Returns expected model', function() {
            expect(utils.hasModel(testCollection_4, utils.modelAttributes.modelA)).to.equal(true);
        });
        describe('* Original Models is unaffected', function() {
            it('Returns expected number of models', function() {
                expect(testCollection_4.originalModels.length).to.equal(3);
            });
            it('Returns expected model_1', function() {
                expect(utils.hasModel(testCollection_4, utils.modelAttributes.modelA, true)).to.equal(true);
            });
            it('Returns expected model_2', function() {
                expect(utils.hasModel(testCollection_4, utils.modelAttributes.modelB, true)).to.equal(true);
            });
            it('Returns expected model_3', function() {
                expect(utils.hasModel(testCollection_4, utils.modelAttributes.modelC, true)).to.equal(true);
            });
        });
    });
    describe('# Testing utils.filter2 + utils.filter3', function() {
        var testCollection_5 = utils.getBaseCollection();
        testCollection_5.addPredefinedFilter('test-filter-2', utils.filter2, true);
        testCollection_5.addPredefinedFilter('test-filter-3', utils.filter3, true);
        it('Returns expected number of models', function() {
            expect(testCollection_5.models.length).to.equal(1);
        });
        it('Returns expected model', function() {
            expect(utils.hasModel(testCollection_5, utils.modelAttributes.modelC)).to.equal(true);
        });
        describe('* Original Models is unaffected', function() {
            it('Returns expected number of models', function() {
                expect(testCollection_5.originalModels.length).to.equal(3);
            });
            it('Returns expected model_1', function() {
                expect(utils.hasModel(testCollection_5, utils.modelAttributes.modelA, true)).to.equal(true);
            });
            it('Returns expected model_2', function() {
                expect(utils.hasModel(testCollection_5, utils.modelAttributes.modelB, true)).to.equal(true);
            });
            it('Returns expected model_3', function() {
                expect(utils.hasModel(testCollection_5, utils.modelAttributes.modelC, true)).to.equal(true);
            });
        });
    });
    describe('* Testing utils.filter1 + utils.filter2', function() {
        var testCollection_6 = utils.getBaseCollection();
        testCollection_6.addPredefinedFilter('test-filter-1', utils.filter1, true);
        testCollection_6.addPredefinedFilter('test-filter-2', utils.filter2, true);
        it('Returns expected number of models', function() {
            expect(testCollection_6.models.length).to.equal(0);
        });
        describe('* Original Models is unaffected', function() {
            it('Returns expected number of models', function() {
                expect(testCollection_6.originalModels.length).to.equal(3);
            });
            it('Returns expected model_1', function() {
                expect(utils.hasModel(testCollection_6, utils.modelAttributes.modelA, true)).to.equal(true);
            });
            it('Returns expected model_2', function() {
                expect(utils.hasModel(testCollection_6, utils.modelAttributes.modelB, true)).to.equal(true);
            });
            it('Returns expected model_3', function() {
                expect(utils.hasModel(testCollection_6, utils.modelAttributes.modelC, true)).to.equal(true);
            });
        });
    });
    describe('# Testing addModel', function() {
        var testCollection_7 = utils.getBaseCollection();
        testCollection_7.addPredefinedFilter('test-filter-2', utils.filter2, true);
        testCollection_7.addPredefinedFilter('test-filter-3', utils.filter3, true);
        testCollection_7.add(utils.generateTestModel(utils.modelAttributes.modelD));
        it('Returns expected number of models', function() {
            expect(testCollection_7.models.length).to.equal(2);
        });
        it('Returns expected model_1', function() {
            expect(utils.hasModel(testCollection_7, utils.modelAttributes.modelC)).to.equal(true);
        });
        it('Returns expected model_2', function() {
            expect(utils.hasModel(testCollection_7, utils.modelAttributes.modelD)).to.equal(true);
        });
        describe('* Model added to original Models', function() {
            it('Returns expected number of models', function() {
                expect(testCollection_7.originalModels.length).to.equal(4);
            });
            it('Model is added', function() {
                expect(utils.hasModel(testCollection_7, utils.modelAttributes.modelD, true)).to.equal(true);
            });
        });
    });
    describe('# Testing removeModel', function() {
        var testCollection_8 = utils.getBaseCollection();
        testCollection_8.addPredefinedFilter('test-filter-2', utils.filter2, true);
        testCollection_8.addPredefinedFilter('test-filter-3', utils.filter3, true);
        testCollection_8.add(utils.generateTestModel(utils.modelAttributes.modelD));
        testCollection_8.remove(testCollection_8.where(utils.modelAttributes.modelC)[0]);
        it('Returns expected number of models', function() {
            expect(testCollection_8.models.length).to.equal(1);
        });
        it('Returns expected model', function() {
            expect(utils.hasModel(testCollection_8, utils.modelAttributes.modelD)).to.equal(true);
        });
        describe('* Model removed from original Models', function() {
            it('Returns expected number of models', function() {
                expect(testCollection_8.originalModels.length).to.equal(3);
            });
            it('Model is removed', function() {
                expect(utils.hasModel(testCollection_8, utils.modelAttributes.modelC, true)).to.equal(false);
            });
        });
    });
    describe('# Testing Or Clause filter', function() {
        var testCollection_9 = utils.getBaseCollection();
        testCollection_9.addPredefinedFilter('test-filter-4', utils.filter4, true);
        it('Returns expected number of models', function() {
            expect(testCollection_9.models.length).to.equal(2);
        });
        it('Returns expected model_1', function() {
            expect(utils.hasModel(testCollection_9, utils.modelAttributes.modelA)).to.equal(true);
        });
        it('Returns expected model_2', function() {
            expect(utils.hasModel(testCollection_9, utils.modelAttributes.modelA)).to.equal(true);
        });
        describe('* Original Models is unaffected', function() {
            it('Returns expected number of models', function() {
                expect(testCollection_9.originalModels.length).to.equal(3);
            });
            it('Returns expected model_1', function() {
                expect(utils.hasModel(testCollection_9, utils.modelAttributes.modelA, true)).to.equal(true);
            });
            it('Returns expected model_2', function() {
                expect(utils.hasModel(testCollection_9, utils.modelAttributes.modelB, true)).to.equal(true);
            });
            it('Returns expected model_3', function() {
                expect(utils.hasModel(testCollection_9, utils.modelAttributes.modelC, true)).to.equal(true);
            });
        });
    });
});
describe('### Testing Predefined Filter Collection Functionality with large Mock data ###', function() {
    describe('# Testing Male/Female Filters', function() {
        var mockCollection = utils.getMockCollection();
        var mockCollection2 = utils.getMockCollection();
        mockCollection.addPredefinedFilter('utils.findMales', utils.findMales, true);
        mockCollection2.addPredefinedFilter('utils.findFemales', utils.findFemales, true);
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

        var mockCollection = utils.getMockCollection({
            pagingOptions: {
                modelsPerPage: 10
            }
        });
        var mockCollectionInvalidOptions = utils.getMockCollection({
            pagingOptions: {
                modelsPerPage: 0
            }
        });
        mockCollection.trigger('sync');
        mockCollectionInvalidOptions.trigger('sync');
        it('Collection with invalid Paging Options has 1000 pages', function() {
            expect(mockCollectionInvalidOptions.pagingInfo.pages).to.equal(1000);
        });
        describe('* Verfiy get next/prev page', function() {
            describe('- Verfiy paging info', function() {
                var mockCollectionStartLastPage = utils.getMockCollection({
                    pagingOptions: {
                        modelsPerPage: 10,
                        startPage: 100
                    }
                });
                var mockCollectionStartFirstPage = utils.getMockCollection({
                    pagingOptions: {
                        modelsPerPage: 10,
                        startPage: 1
                    }
                });
                var mockCollectionStartPage50 = utils.getMockCollection({
                    pagingOptions: {
                        modelsPerPage: 10,
                        startPage: 50
                    }
                });
                mockCollectionStartLastPage.trigger('sync');
                mockCollectionStartFirstPage.trigger('sync');
                mockCollectionStartPage50.trigger('sync');
                it('mockCollectionStartLastPage has nextPage', function() {
                    expect(mockCollectionStartLastPage.pagingInfo.hasNextPage).to.equal(true);
                });
                it('mockCollectionStartLastPage next page is 1', function() {
                    expect(mockCollectionStartLastPage.pagingInfo.nextPage).to.equal(1);
                });
                it('mockCollectionStartLastPage has prevPage', function() {
                    expect(mockCollectionStartLastPage.pagingInfo.hasPreviousPage).to.equal(true);
                });
                it('mockCollectionStartLastPage prev page is 99', function() {
                    expect(mockCollectionStartLastPage.pagingInfo.previousPage).to.equal(99);
                });

                it('mockCollectionStartFirstPage has nextPage', function() {
                    expect(mockCollectionStartFirstPage.pagingInfo.hasNextPage).to.equal(true);
                });
                it('mockCollectionStartFirstPage next page is 2', function() {
                    expect(mockCollectionStartFirstPage.pagingInfo.nextPage).to.equal(2);
                });
                it('mockCollectionStartFirstPage has prevPage', function() {
                    expect(mockCollectionStartFirstPage.pagingInfo.hasPreviousPage).to.equal(true);
                });
                it('mockCollectionStartFirstPage prev page is 100', function() {
                    expect(mockCollectionStartFirstPage.pagingInfo.previousPage).to.equal(100);
                });

                it('mockCollectionStartPage50 has nextPage', function() {
                    expect(mockCollectionStartPage50.pagingInfo.hasNextPage).to.equal(true);
                });
                it('mockCollectionStartPage50 next page is 51', function() {
                    expect(mockCollectionStartPage50.pagingInfo.nextPage).to.equal(51);
                });
                it('mockCollectionStartPage50 has prevPage', function() {
                    expect(mockCollectionStartPage50.pagingInfo.hasPreviousPage).to.equal(true);
                });
                it('mockCollectionStartPage50 prev page is 49', function() {
                    expect(mockCollectionStartPage50.pagingInfo.previousPage).to.equal(49);
                });
            });
            describe('- Verfiy after getting next page', function() {
                var mockCollectionStartLastPage = utils.getMockCollection({
                    pagingOptions: {
                        modelsPerPage: 10,
                        startPage: 100
                    }
                });
                var mockCollectionStartFirstPage = utils.getMockCollection({
                    pagingOptions: {
                        modelsPerPage: 10,
                        startPage: 1
                    }
                });
                var mockCollectionStartPage50 = utils.getMockCollection({
                    pagingOptions: {
                        modelsPerPage: 10,
                        startPage: 50
                    }
                });
                mockCollectionStartLastPage.trigger('sync');
                mockCollectionStartFirstPage.trigger('sync');
                mockCollectionStartPage50.trigger('sync');
                mockCollectionStartLastPage.nextPage();
                mockCollectionStartFirstPage.nextPage();
                mockCollectionStartPage50.nextPage();
                it('mockCollectionStartLastPage has nextPage', function() {
                    expect(mockCollectionStartLastPage.pagingInfo.hasNextPage).to.equal(true);
                });
                it('mockCollectionStartLastPage next page is 2', function() {
                    expect(mockCollectionStartLastPage.pagingInfo.nextPage).to.equal(2);
                });
                it('mockCollectionStartLastPage has prevPage', function() {
                    expect(mockCollectionStartLastPage.pagingInfo.hasPreviousPage).to.equal(true);
                });
                it('mockCollectionStartLastPage prev page is 100', function() {
                    expect(mockCollectionStartLastPage.pagingInfo.previousPage).to.equal(100);
                });

                it('mockCollectionStartFirstPage has nextPage', function() {
                    expect(mockCollectionStartFirstPage.pagingInfo.hasNextPage).to.equal(true);
                });
                it('mockCollectionStartFirstPage next page is 3', function() {
                    expect(mockCollectionStartFirstPage.pagingInfo.nextPage).to.equal(3);
                });
                it('mockCollectionStartFirstPage has prevPage', function() {
                    expect(mockCollectionStartFirstPage.pagingInfo.hasPreviousPage).to.equal(true);
                });
                it('mockCollectionStartFirstPage prev page is 1', function() {
                    expect(mockCollectionStartFirstPage.pagingInfo.previousPage).to.equal(1);
                });

                it('mockCollectionStartPage50 has nextPage', function() {
                    expect(mockCollectionStartPage50.pagingInfo.hasNextPage).to.equal(true);
                });
                it('mockCollectionStartPage50 next page is 52', function() {
                    expect(mockCollectionStartPage50.pagingInfo.nextPage).to.equal(52);
                });
                it('mockCollectionStartPage50 has prevPage', function() {
                    expect(mockCollectionStartPage50.pagingInfo.hasPreviousPage).to.equal(true);
                });
                it('mockCollectionStartPage50 prev page is 50', function() {
                    expect(mockCollectionStartPage50.pagingInfo.previousPage).to.equal(50);
                });
            });
            describe('- Verfiy after getting prev page', function() {
                var mockCollectionStartLastPage = utils.getMockCollection({
                    pagingOptions: {
                        modelsPerPage: 10,
                        startPage: 100
                    }
                });
                var mockCollectionStartFirstPage = utils.getMockCollection({
                    pagingOptions: {
                        modelsPerPage: 10,
                        startPage: 1
                    }
                });
                var mockCollectionStartPage50 = utils.getMockCollection({
                    pagingOptions: {
                        modelsPerPage: 10,
                        startPage: 50
                    }
                });
                mockCollectionStartLastPage.trigger('sync');
                mockCollectionStartFirstPage.trigger('sync');
                mockCollectionStartPage50.trigger('sync');
                mockCollectionStartLastPage.previousPage();
                mockCollectionStartFirstPage.previousPage();
                mockCollectionStartPage50.previousPage();
                it('mockCollectionStartLastPage has nextPage', function() {
                    expect(mockCollectionStartLastPage.pagingInfo.hasNextPage).to.equal(true);
                });
                it('mockCollectionStartLastPage next page is 100', function() {
                    expect(mockCollectionStartLastPage.pagingInfo.nextPage).to.equal(100);
                });
                it('mockCollectionStartLastPage has prevPage', function() {
                    expect(mockCollectionStartLastPage.pagingInfo.hasPreviousPage).to.equal(true);
                });
                it('mockCollectionStartLastPage prev page is 98', function() {
                    expect(mockCollectionStartLastPage.pagingInfo.previousPage).to.equal(98);
                });

                it('mockCollectionStartFirstPage has nextPage', function() {
                    expect(mockCollectionStartFirstPage.pagingInfo.hasNextPage).to.equal(true);
                });
                it('mockCollectionStartFirstPage next page is 1', function() {
                    expect(mockCollectionStartFirstPage.pagingInfo.nextPage).to.equal(1);
                });
                it('mockCollectionStartFirstPage has prevPage', function() {
                    expect(mockCollectionStartFirstPage.pagingInfo.hasPreviousPage).to.equal(true);
                });
                it('mockCollectionStartFirstPage prev page is 99', function() {
                    expect(mockCollectionStartFirstPage.pagingInfo.previousPage).to.equal(99);
                });

                it('mockCollectionStartPage50 has nextPage', function() {
                    expect(mockCollectionStartPage50.pagingInfo.hasNextPage).to.equal(true);
                });
                it('mockCollectionStartPage50 next page is 50', function() {
                    expect(mockCollectionStartPage50.pagingInfo.nextPage).to.equal(50);
                });
                it('mockCollectionStartPage50 has prevPage', function() {
                    expect(mockCollectionStartPage50.pagingInfo.hasPreviousPage).to.equal(true);
                });
                it('mockCollectionStartPage50 prev page is 48', function() {
                    expect(mockCollectionStartPage50.pagingInfo.previousPage).to.equal(48);
                });
            });
            describe('- Verfiy after getting next page looping disabled', function() {
                var mockCollectionStartLastPage = utils.getMockCollection({
                    pagingOptions: {
                        modelsPerPage: 10,
                        startPage: 100,
                        enableLooping: false
                    }
                });
                var mockCollectionStartFirstPage = utils.getMockCollection({
                    pagingOptions: {
                        modelsPerPage: 10,
                        startPage: 1,
                        enableLooping: false
                    }
                });
                var mockCollectionStartPage50 = utils.getMockCollection({
                    pagingOptions: {
                        modelsPerPage: 10,
                        startPage: 50,
                        enableLooping: false
                    }
                });
                mockCollectionStartLastPage.trigger('sync');
                mockCollectionStartFirstPage.trigger('sync');
                mockCollectionStartPage50.trigger('sync');
                mockCollectionStartLastPage.nextPage();
                mockCollectionStartFirstPage.nextPage();
                mockCollectionStartPage50.nextPage();
                it('mockCollectionStartLastPage has no nextPage', function() {
                    expect(mockCollectionStartLastPage.pagingInfo.hasNextPage).to.equal(false);
                });
                it('mockCollectionStartLastPage next page is 100', function() {
                    expect(mockCollectionStartLastPage.pagingInfo.nextPage).to.equal(100);
                });
                it('mockCollectionStartLastPage has prevPage', function() {
                    expect(mockCollectionStartLastPage.pagingInfo.hasPreviousPage).to.equal(true);
                });
                it('mockCollectionStartLastPage prev page is 99', function() {
                    expect(mockCollectionStartLastPage.pagingInfo.previousPage).to.equal(99);
                });

                it('mockCollectionStartFirstPage has nextPage', function() {
                    expect(mockCollectionStartFirstPage.pagingInfo.hasNextPage).to.equal(true);
                });
                it('mockCollectionStartFirstPage next page is 3', function() {
                    expect(mockCollectionStartFirstPage.pagingInfo.nextPage).to.equal(3);
                });
                it('mockCollectionStartFirstPage has prevPage', function() {
                    expect(mockCollectionStartFirstPage.pagingInfo.hasPreviousPage).to.equal(true);
                });
                it('mockCollectionStartFirstPage prev page is 1', function() {
                    expect(mockCollectionStartFirstPage.pagingInfo.previousPage).to.equal(1);
                });

                it('mockCollectionStartPage50 has nextPage', function() {
                    expect(mockCollectionStartPage50.pagingInfo.hasNextPage).to.equal(true);
                });
                it('mockCollectionStartPage50 next page is 52', function() {
                    expect(mockCollectionStartPage50.pagingInfo.nextPage).to.equal(52);
                });
                it('mockCollectionStartPage50 has prevPage', function() {
                    expect(mockCollectionStartPage50.pagingInfo.hasPreviousPage).to.equal(true);
                });
                it('mockCollectionStartPage50 prev page is 50', function() {
                    expect(mockCollectionStartPage50.pagingInfo.previousPage).to.equal(50);
                });
            });
            describe('- Verfiy after getting prev page looping disabled', function() {
                var mockCollectionStartLastPage = utils.getMockCollection({
                    pagingOptions: {
                        modelsPerPage: 10,
                        startPage: 100,
                        enableLooping: false
                    }
                });
                var mockCollectionStartFirstPage = utils.getMockCollection({
                    pagingOptions: {
                        modelsPerPage: 10,
                        startPage: 1,
                        enableLooping: false
                    }
                });
                var mockCollectionStartPage50 = utils.getMockCollection({
                    pagingOptions: {
                        modelsPerPage: 10,
                        startPage: 50,
                        enableLooping: false
                    }
                });
                mockCollectionStartLastPage.trigger('sync');
                mockCollectionStartFirstPage.trigger('sync');
                mockCollectionStartPage50.trigger('sync');
                mockCollectionStartLastPage.previousPage();
                mockCollectionStartFirstPage.previousPage();
                mockCollectionStartPage50.previousPage();
                it('mockCollectionStartLastPage has nextPage', function() {
                    expect(mockCollectionStartLastPage.pagingInfo.hasNextPage).to.equal(true);
                });
                it('mockCollectionStartLastPage next page is 100', function() {
                    expect(mockCollectionStartLastPage.pagingInfo.nextPage).to.equal(100);
                });
                it('mockCollectionStartLastPage has prevPage', function() {
                    expect(mockCollectionStartLastPage.pagingInfo.hasPreviousPage).to.equal(true);
                });
                it('mockCollectionStartLastPage prev page is 98', function() {
                    expect(mockCollectionStartLastPage.pagingInfo.previousPage).to.equal(98);
                });

                it('mockCollectionStartFirstPage has nextPage', function() {
                    expect(mockCollectionStartFirstPage.pagingInfo.hasNextPage).to.equal(true);
                });
                it('mockCollectionStartFirstPage next page is 2', function() {
                    expect(mockCollectionStartFirstPage.pagingInfo.nextPage).to.equal(2);
                });
                it('mockCollectionStartFirstPage has no prevPage', function() {
                    expect(mockCollectionStartFirstPage.pagingInfo.hasPreviousPage).to.equal(false);
                });
                it('mockCollectionStartFirstPage prev page is 1', function() {
                    expect(mockCollectionStartFirstPage.pagingInfo.previousPage).to.equal(1);
                });

                it('mockCollectionStartPage50 has nextPage', function() {
                    expect(mockCollectionStartPage50.pagingInfo.hasNextPage).to.equal(true);
                });
                it('mockCollectionStartPage50 next page is 50', function() {
                    expect(mockCollectionStartPage50.pagingInfo.nextPage).to.equal(50);
                });
                it('mockCollectionStartPage50 has prevPage', function() {
                    expect(mockCollectionStartPage50.pagingInfo.hasPreviousPage).to.equal(true);
                });
                it('mockCollectionStartPage50 prev page is 48', function() {
                    expect(mockCollectionStartPage50.pagingInfo.previousPage).to.equal(48);
                });
            });
            describe('- Verfiy getting page greater than pages length returns last page', function() {
                var mockCollectionStartLastPage = utils.getMockCollection({
                    pagingOptions: {
                        modelsPerPage: 10,
                        startPage: 143
                    }
                });
                mockCollectionStartLastPage.trigger('sync');
                it('mockCollectionStartLastPage has nextPage', function() {
                    expect(mockCollectionStartLastPage.pagingInfo.hasNextPage).to.equal(true);
                });
                it('mockCollectionStartLastPage next page is 1', function() {
                    expect(mockCollectionStartLastPage.pagingInfo.nextPage).to.equal(1);
                });
                it('mockCollectionStartLastPage has prevPage', function() {
                    expect(mockCollectionStartLastPage.pagingInfo.hasPreviousPage).to.equal(true);
                });
                it('mockCollectionStartLastPage prev page is 99', function() {
                    expect(mockCollectionStartLastPage.pagingInfo.previousPage).to.equal(99);
                });
            });
            describe('- Verfiy getting page number < 0  returns first page', function() {
                var mockCollectionStartFirstPage = utils.getMockCollection({
                    pagingOptions: {
                        modelsPerPage: 10,
                        startPage: 0
                    }
                });
                mockCollectionStartFirstPage.trigger('sync');
                it('mockCollectionStartFirstPage has nextPage', function() {
                    expect(mockCollectionStartFirstPage.pagingInfo.hasNextPage).to.equal(true);
                });
                it('mockCollectionStartFirstPage next page is 2', function() {
                    expect(mockCollectionStartFirstPage.pagingInfo.nextPage).to.equal(2);
                });
                it('mockCollectionStartFirstPage has prevPage', function() {
                    expect(mockCollectionStartFirstPage.pagingInfo.hasPreviousPage).to.equal(true);
                });
                it('mockCollectionStartFirstPage prev page is 100', function() {
                    expect(mockCollectionStartFirstPage.pagingInfo.previousPage).to.equal(100);
                });
            });
        });
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

        var mockCollection = utils.getMockCollection({
            pagingOptions: {
                modelsPerPage: 20
            }
        });
        mockCollection.trigger('sync');
        mockCollection.trigger('predefined-filters:add', 'utils.findMales', utils.findMales, true);
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