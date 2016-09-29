'use strict';

var preDefCollection = require('../src/backbone-collection-predefined-filters'),
    MOCK_DATA = require('../test/MOCK_DATA'),
    _ = require('underscore'),
    Backbone = require('backbone')
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
    },
    modelE: {
        testIntData: 1,
        testStrData: 'this is test E in 2b'
    }
};
var getBaseCollection = function(addBasePredefinedFilters, options) {
    var baseCollection = new preDefCollection([generateTestModel(modelAttributes.modelA), generateTestModel(modelAttributes.modelB), generateTestModel(modelAttributes.modelC)], options);
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
module.exports = {
    generateTestModel: generateTestModel,
    modelAttributes: modelAttributes,
    getBaseCollection: getBaseCollection,
    getMockCollection: getMockCollection,
    hasModel: hasModel,
    filter1: filter1,
    filter2: filter2,
    filter3: filter3,
    filter4: filter4,
    findFemales: findFemales,
    findMales: findMales,
    findSchoolEmail: findSchoolEmail,
    findGovernmentEmail: findGovernmentEmail,
    findSchoolOrGovEmail: findSchoolOrGovEmail
};