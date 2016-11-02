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
  /**
   * {{constructor}} Add new Range Filter by calling examplePredefinedFilterCollection.addPredefinedFilterFromTemplate('example-text-search-filter-name', 'TextSearch', *test-search-filter-options* ); Below are the following options parameters.
   *
   * @property {String/Number/Boolean} options.inputValue String, Number, or Boolean value to search for. {{default}} ''
   * @property {Boolean} options.caseSensitive Flag to indicate to match results with exact case of *inputValue* or not. {{default}} false
   * @property {Number} options.minimumInputLength Minimum of charactors in *inputValue* necessary to invoke the filter. If the minimun length is not met the filter returns all models effectively not running the filter. Helpful for use with typeahead functionality. {{default}} 1
   * @property {Array} options.filterableModelAttributes Array of Strings containing the list of model attributes to include in the filter. Example *'someData'* is equivalent to returning *model.get('someData')*. Nested values are supported. If you need to retrieve a nested value pass the string as follows 'someData.value'. Equivalent to returning *model.get('someData').value*. You can keep adding to the nested value layers as such: 'someData.moreData.evenMoreData. ... .finallyMyAttribute' equivalently calls *model.get('someData').moreData.evenMoreData. ... .finallyMyAttribute* .{{default}} []
   */
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