(function(factory) {
  'use strict';
  /* istanbul ignore next */
  // CommonJS
  if (typeof exports == "object" && typeof require == "function") {
    module.exports = factory(require("underscore"), require("moment"), require("../../utils"));
  }
  // AMD
  else if (typeof define == "function" && define.amd) {
    define(["underscore", "moment", "../../utils"], factory);
  }
}(function(_, moment, utils) {
  'use strict';
  var DEFAULT_FORMAT = 'YYYY/MM/DD HH:mm:ss';
  var getDefaultsConfig = function(momentDateString) {
    return {
      value: momentDateString,
      format: DEFAULT_FORMAT,
      isInUTC: true,
      includeInRange: true,
      ignore: false
    };
  };
  var dateRangeFilterBuilder = function(filter_options) {
    var options = _.defaults(filter_options, {
      start: _.defaults(filter_options.start || {}, getDefaultsConfig('1970/01/01 00:00:00')),
      end: _.defaults(filter_options.end || {}, getDefaultsConfig('now')),
      filterableModelAttributes: []
    });
    return function(model) {
      if (options.start.ignore === true && options.end.ignore === true) {
        return true;
      }
      var getMomentDate = function(value, dateConfig) {
        var format = dateConfig.format || DEFAULT_FORMAT,
          isInUTC = dateConfig.isInUTC || false;
        if (value === 'now') {
          return moment.utc();
        } else if (dateConfig.isInUTC === true) {
          return moment.utc(value, format);
        }
        return moment(value, format).utc();
      };
      var startDate = getMomentDate(options.start.value, options.start);
      var endDate = getMomentDate(options.end.value, options.end);
      var matchingAttributes = _.find(options.filterableModelAttributes, function(dateConfig) {
        var compareDate = utils.getNestedModelAttribute(model, dateConfig.attribute);
        if (_.isUndefined(compareDate)) {
          return false;
        }
        compareDate = getMomentDate(compareDate, dateConfig);
        var isInStartRange = true;
        var isInEndRange = true;
        if (options.start.ignore === false) {
          if (options.start.includeInRange === true) {
            isInStartRange = compareDate.valueOf() >= startDate.valueOf();
          } else {
            isInStartRange = compareDate.valueOf() > startDate.valueOf();
          }
        }
        if (isInStartRange && options.end.ignore === false) {
          if (options.end.includeInRange === true) {
            isInEndRange = compareDate.valueOf() <= endDate.valueOf();
          } else {
            isInEndRange = compareDate.valueOf() < endDate.valueOf();
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
  return dateRangeFilterBuilder
}));