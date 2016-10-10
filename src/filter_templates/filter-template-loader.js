(function(factory) {
  'use strict';
  var FilterTemplatePaths = [
    "./text_search/text-search-filter",
    "./date_range/date-range-filter",
    "./range/range-filter",
    "./or/or-filter"
  ];
  /* istanbul ignore next */
  // CommonJS
  if (typeof exports == "object" && typeof require == "function") {
    module.exports = factory(
      require("./text_search/text-search-filter"),
      require("./date_range/date-range-filter"),
      require("./range/range-filter"),
      require("./or/or-filter"));
  }
  // AMD
  else if (typeof define == "function" && define.amd) {
    _.each(FilterTemplates, function(path, templateName) {
      FilterTemplatePaths.push(path);
    });
    define(FilterTemplatePaths, factory);
  }
}(function(TextSearchFilter, DateRangeFilter, RangeFilter, Or) {
  'use strict';
  return {
    TextSearchFilter: TextSearchFilter,
    DateRangeFilter: DateRangeFilter,
    RangeFilter: RangeFilter,
    Or: Or
  }
}));