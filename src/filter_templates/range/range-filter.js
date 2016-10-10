(function(factory) {
  'use strict';
  /* istanbul ignore next */
  // CommonJS
  if (typeof exports == "object" && typeof require == "function") {
    module.exports = factory(require("underscore"), require("../../utils"));
  }
  // AMD
  else if (typeof define == "function" && define.amd) {
    define(["underscore", "../../utils"], factory);
  }
}(function(_, utils) {
  'use strict';
  var getDefaultsConfig = function(value) {
    return {
      value: value,
      includeInRange: true,
      ignore: false
    };
  };
  var rangeFilterBuilder = function(filter_options) {
    var options = _.defaults(filter_options, {
      start: _.defaults(filter_options.start || {}, getDefaultsConfig(0)),
      end: _.defaults(filter_options.end || {}, getDefaultsConfig(100)),
      filterableModelAttributes: []
    });
    return function(model) {
      if (options.start.ignore === true && options.end.ignore === true) {
        return true;
      }
      var matchingAttributes = _.find(options.filterableModelAttributes, function(attribute) {
        var compareValue = utils.getNestedModelAttribute(model, attribute);
        if (_.isUndefined(compareValue)) {
          return false;
        }
        var isInStartRange = true;
        var isInEndRange = true;
        if (options.start.ignore === false) {
          if (options.start.includeInRange === true) {
            isInStartRange = compareValue >= options.start.value;
          } else {
            isInStartRange = compareValue > options.start.value;
          }
        }
        if (isInStartRange && options.end.ignore === false) {
          if (options.end.includeInRange === true) {
            isInEndRange = compareValue <= options.end.value;
          } else {
            isInEndRange = compareValue < options.end.value;
          }
        }
        return isInStartRange && isInEndRange;
      });
      if (!_.isUndefined(matchingAttributes)) {
        return true
      }
      return false;
    };
  };
  return rangeFilterBuilder
}));