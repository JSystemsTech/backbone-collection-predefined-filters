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
  /**
   * {{constructor}} Add new Range Filter by calling examplePredefinedFilterCollection.addPredefinedFilterFromTemplate('example-range-filter-name', 'RangeFilter', *range-filter-options* ); Below are the following options parameters.
   *
   * @property {String} options.start.value A numeric value {{default}} 0
   * @property {Boolean} options.start.includeInRange if set to *true* comparedValue must be >= start value. If set to *false* comparedValue must be > start value. {{default}} true
   * @property {Boolean} options.start.ignore Completely ignores the start value boundry. Use this option if you are trying to find values < or <= the end value. {{default}} false
   * @property {String} options.end.value A numeric value {{default}} 100
   * @property {Boolean} options.end.includeInRange if set to *true* comparedValue must be <= end value. If set to *false* comparedValue must be < end value. {{default}} true
   * @property {Boolean} options.end.ignore Completely ignores the end value boundry. Use this option if you are trying to find values > or >= the start value. {{default}} false
   * @property {Array} options.filterableModelAttributes Array of Strings containing the list of model attributes to include in the filter. Example *'someDate'* is equivalent to returning *model.get('someDate')*. Nested values are supported. If you need to retrieve a nested value pass the string as follows 'someData.value'. Equivalent to returning *model.get('someData').value*. You can keep adding to the nested value layers as such: 'someData.moreData.evenMoreData. ... .finallyMyAttribute' equivalently calls *model.get('someData').moreData.evenMoreData. ... .finallyMyAttribute* .{{default}} []
   */
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