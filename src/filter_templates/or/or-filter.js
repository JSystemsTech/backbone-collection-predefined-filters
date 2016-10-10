(function(factory) {
  'use strict';
  /* istanbul ignore next */
  // CommonJS
  if (typeof exports == "object" && typeof require == "function") {
    module.exports = factory(require("underscore"));
  }
  // AMD
  else if (typeof define == "function" && define.amd) {
    define(["underscore"], factory);
  }
}(function(_, moment) {
  'use strict';
  var orFilterBuilder = function(filter_options, collection) {
    var options = _.defaults(filter_options, {
      filters: []
    });
    return function(model) {
      if(_.isEmpty(options.filters)){
        return true;
      }
      var matchingFilter = _.find(options.filters, function(filter) {
        if(!_.isUndefined(collection.predefinedFilters[filter])){
          return collection.predefinedFilters[filter](model);
        }
        return false;
      });
      if (!_.isUndefined(matchingFilter)) {
        return true
      }
      return false;
    };
  };
  return orFilterBuilder
}));