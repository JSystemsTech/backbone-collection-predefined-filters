(function(factory) {
  'use strict';
  /* istanbul ignore next */
  // CommonJS
  if (typeof exports == "object" && typeof require == "function") {
    module.exports = factory(require("underscore"), require("../../utils"));
  }
  // AMD
  else if (typeof define == "function" && define.amd) {
    define(["underscore", "../../../utils"], factory);
  }
}(function(_, utils) {
  'use strict';
  var textSearchFilterBuilder = function(options) {
    options = _.defaults(options, {
      inputValue: '',
      caseSensitive: false,
      minimumInputLength: 1,
      filterableModelAttributes: []
    });
    var runFilter = (options.inputValue.length >= options.minimumInputLength) && !_.isEmpty(options.filterableModelAttributes)
    return function(model) {
      if (runFilter === false) {
        return true;
      }
      var matchingAttributes = _.find(options.filterableModelAttributes, function(attribute) {
        var value = utils.getNestedModelAttribute(model, attribute);
        if (!_.isUndefined(value)) {
          value = value.toString();
        }else{
          return false;
        }
        if (options.caseSensitive === false) {
          return value.toLowerCase().indexOf(options.inputValue.toLowerCase()) !== -1;
        } else {
          return value.indexOf(options.inputValue) !== -1;
        }
      });
      if (!_.isUndefined(matchingAttributes)) {
        return true
      }
      return false;
    };
  };
  return textSearchFilterBuilder
}));