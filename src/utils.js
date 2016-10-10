(function(factory) {
  'use strict';
  /* istanbul ignore next */
  // CommonJS
  if (typeof exports == "object" && typeof require == "function") {
    module.exports = factory(require("underscore"), require("drilldown"));
  }
  // AMD
  else if (typeof define == "function" && define.amd) {
    define(["underscore", "drilldown"], factory);
  }
}(function(_, dd) {
  'use strict';
  return {
    getNestedModelAttribute: function(model, attribute, separator) {
      var separator = separator || '.';
      if (attribute.indexOf(separator) <= -1) {
        return model.get(attribute);
      }
      var path = attribute.split(separator);
      var nestedValue = dd(model.attributes);
      _.each(path, function(layer) {
        nestedValue = nestedValue(layer);
      });
      return nestedValue.val
    }
  };
}));