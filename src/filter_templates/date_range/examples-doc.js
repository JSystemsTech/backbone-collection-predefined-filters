var examplePredefinedFilterCollection = new Backbone.PredefinedFiltersCollection([/* some list of models */]);
// Base Default Options
var options = {
	start: {},
	end: {},
	filterableModelAttributes: []
};

// add basic model attribute to filter against
options.filterableModelAttributes.push({
	attribute: 'dateOfBirth'
});

// add nested model attribute to filter against
options.filterableModelAttributes.push({
	attribute: 'history.independanceDay.dateOfDeclarationOfIndependance'
});

// add model attribute to filter against that is in another foramt and is not in UTC
options.filterableModelAttributes.push({
	attribute: 'serverconfig.servertime',
	format: 'YYYYMMDDHHmmss',
	isInUTC: false
});

// set filter to only look for dates on or after a given date
options.end.ignore = true;

// set filter to only look for dates only after a given date
options.end.ignore = true;
options.start.includeInRange = false;

// set filter to only look for dates on or before a given date
options.start.ignore = true;

// set filter to only look for dates only before a given date
options.start.ignore = true;
options.end.includeInRange = false;

// set specific start date value
options.start.value = '08-10-1982 10:53:41';
options.start.format = 'MM-DD-YYYY HH:mm:ss';
options.start.isInUTC = false;

// set specific end date value
options.end.value = '09/13/2010 11:04:23 AM';
options.end.format = 'MM/DD/YYYY hh:mm:ss A';
options.end.isInUTC = true;

// Add Date Range Filter to Collection
examplePredefinedFilterCollection.addPredefinedFilterFromTemplate('example-date-range-filter-name', 'DateRangeFilter', options);

// Add Date Range Filter to Collection and apply Immediately 
examplePredefinedFilterCollection.addPredefinedFilterFromTemplate('example-date-range-filter-name', 'DateRangeFilter', options, true);