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
  /**
   * {{constructor}} Add new Date Range Filter by calling examplePredefinedFilterCollection.addPredefinedFilterFromTemplate('example-date-range-filter-name', 'DateRangeFilter', *data-range-filter-options* ); Below are the following options parameters.
   *
   * @property {String} options.start.value A date string in moment format {{default}} '1970/01/01 00:00:00'
   * @property {String} options.start.format A String defining the format of *options.start.value* . {{default}} 'YYYY/MM/DD HH:mm:ss'
   * @property {Boolean} options.start.isInUTC Flag to set whether or not the formated date string is in UTC time {{default}} true
   * @property {Boolean} options.start.includeInRange if set to *true* comparedValue must be >= start date. If set to *false* comparedValue must be > start date. {{default}} true
   * @property {Boolean} options.start.ignore Completely ignores the start date boundry. Use this option if you are trying to find values < or <= the end date. {{default}} false
   * @property {String} options.end.value A date string in moment format {{default}} 'now'
   * @property {String} options.end.format A String defining the format of *options.end.value* . {{default}} 'YYYY/MM/DD HH:mm:ss'
   * @property {Boolean} options.end.isInUTC Flag to set whether or not the formated date string is in UTC time {{default}} true
   * @property {Boolean} options.end.includeInRange if set to *true* comparedValue must be <= end date. If set to *false* comparedValue must be < end date. {{default}} true
   * @property {Boolean} options.end.ignore Completely ignores the end date boundry. Use this option if you are trying to find values > or >= the start date. {{default}} false
   * @property {Array} options.filterableModelAttributes Array of Objects containing the list of model attribute to include in the filter and the configuration for those modle attributes
   * @property {String} options.filterableModelAttributes[n].attribute String containing model attribute name. Example *'someDate'* is equivalent to returning *model.get('someDate')*. Nested values are supported. If you need to retrieve a nested value pass the string as follows 'someData.date'. Equivalent to returning *model.get('someData').date*. You can keep adding to the nested value layers as such: 'someData.moreData.evenMoreDate. ... .finallyMyDateAttribute' equivalently calls *model.get('someData').moreData.evenMoreDate. ... .finallyMyDateAttribute* .{{default}} []   
   * @property {String} options.filterableModelAttributes[n].format A String defining the format of the model attribute value. {{default}} 'YYYY/MM/DD HH:mm:ss'
   * @property {Boolean} options.filterableModelAttributes[n].isInUTC Flag to set whether or not the formated date string is in UTC time {{default}} true
   */
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