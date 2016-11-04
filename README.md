<p align="center">
  <img src="https://raw.github.com/JSystemsTech/backbone-collection-predefined-filters/master/logo-main.png" alt="Backbone Collection Predefined Filters Logo"/>
</p>

---
An extention of Backbone Collection that allows for predefined filter(s) to be added/removed/applied/unapplied on the collection

[![Release Status](https://img.shields.io/badge/Release%20Status-Unreleased%20Development%20still%20in%20progress-red.svg?style=flat)](https://www.npmjs.com/package/Backbone-Collection-Predefined-Filters)
[![NPM version](http://img.shields.io/npm/v/Backbone-Collection-Predefined-Filters.svg?style=flat)](https://www.npmjs.com/package/Backbone-Collection-Predefined-Filters) [![NPM downloads](http://img.shields.io/npm/dm/Backbone-Collection-Predefined-Filters.svg?style=flat)](https://www.npmjs.com/package/Backbone-Collection-Predefined-Filters) [![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)][license-url] [![Build Status](https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters.svg?branch=master)](https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters?branch=master) [![Dependency Status](https://david-dm.org/JSystemsTech/backbone-collection-predefined-filters.svg?style=flat)](https://david-dm.org/JSystemsTech/backbone-collection-predefined-filters) [![Coverage Status](https://coveralls.io/repos/github/JSystemsTech/backbone-collection-predefined-filters/badge.svg?branch=master)](https://coveralls.io/repos/github/JSystemsTech/backbone-collection-predefined-filters?branch=master)
---

## <a name="pagetop"></a>Table of Contents
1. [Installation](#installation)
2. [Usage](#usage)
3. [Tests](#tests)
4. [Filter Templates](#filter-templates)
  * [Date Range Filter Template](#filter-templates-date-range)
  * [Or Filter Template](#filter-templates-or)
  * [Range Filter Template](#filter-templates-range)
  * [Text Search Filter Template](#filter-templates-text-search)
5. [Contributing](#contributing)
6. [Release History](#release-history)
7. [Travis CI Build History](#build-history)

## <a name="installation"></a>Installation
| Installation Type | Command                                                   |
|:-----------------:|-----------------------------------------------------------|
| npm 	            | npm install Backbone-Collection-Predefined-Filters --save |
| bower             | bower install Backbone-Collection-Predefined-Filters 	 	|

## <a name="usage"></a>Usage

 Initialialize a new Instance of PredefinedFilterCollection with new Backbone.PredefinedFilterCollection(models, options)

##### Configuarable Option Parameters
| Option Name | Expected Input Type | Default Value | Notes |
|     ---	    |	---    			  | --- | --- |
|options.predefinedFilters|Object| []|An object list of user defined functions with unique filter names as keys |
|options.appliedPredefinedFilters|Object| []|An object list of user defined booleans with unique filter names as keys which set the state of the currently applied filters |
|options.pagingOptions.modelsPerPage|Number| *The number of models in the collection (i.e. Show entire collection on 1 page)*|The maximum number of models each page has |
|options.pagingOptions.enableLooping|Boolean| true|If set to true calling **nextPage** or **previousPage** will cycle through the pages continiously. If set to false the start and last page are the lower and upper limits. |
|options.pagingOptions.startPage|Number| 1|The page number of models to render first |

#### Available Collection Functions
| Function Name | Expected Parameters | Notes |
|     ---	    |	---    			  | --- |
|nextPage||Sets Models to the next available Page. If options.pagingOptions.enableLooping is set to false then if the previous page number is < 1 the first page is returned.|
|previousPage||Sets Models to the next available Page. If options.pagingOptions.enableLooping is set to false then if the next available page number is > the total number of pages the last page is returned.|
|goToPage|**pageNumber** (*Number* - Number of Page to navigate to.)|Sets the current models to the specified page. If the input page number is > the total number of pages the last page is returned. If the input page number < 1 the first page is returned.|
|addPredefinedFilterFromTemplate|**name** (*String* - unique key value for collection filter list)<br/>**templateName** (*String* - Type of Filter to add from filter template list. *See [Filter Templates](#filter-templates) for more information about individual filter template types*)<br/>**options** (*Object* - A configuation object passed to the filter template builder. *See [Filter Templates](#filter-templates) for more information about individual filter template options*)<br/>**applyImmediately** (*Boolean* - Immediatelly applies the filter to the collection. Defaults to false if not specified)||
|addPredefinedFilter|**name** (*String* - unique key value for collection filter list)<br/>**filterFunction** (*Function* - A function that takes in a model as a parameter and returns a boolean)<br/>**applyImmediately** (*Boolean/String* - Immediatelly applies the filter to the collection. Defaults to false if not specified. Pass in a string value of '!' to immediately apply the NOT filter. *See [Using NOT filters](#not-filter-info) for more information*)||
|applyPredefinedFilter|**name** (*String/Object* - unique key value or Object list of values with filter name/boolean as the key/value pair)<br/>**value** (*Boolean* - If *true* enables filter. If *false* disables the filters. Defaults to toggling the current state of the filter if undefined)|*Note* if **name** is passed in as an object **value** is ignored and is substituted by the value in each entry in **name**)|
|addPredefinedFilter|**name** (*String* - unique key value for collection filter list)||


##### Code Examples

``` javascript
var predefinedFilterCollection = require('backbone-collection-predefined-filters');
var models = [/*SomeArrayOfBackboneModels*/];
var options = {
    predefinedFilters: {
        'test-filter-1': /*Some Filter function 1*/,
        'test-filter-2': /*Some Filter function 2*/,
        'test-filter-3': /*Some Filter function 3*/,
        'test-filter-4': /*Some Filter function 4*/
    },
    appliedPredefinedFilters: {
        'test-filter-1': true,
        'test-filter-2': false,
        'test-filter-4': false
    },
    pagingOptions: {
        modelsPerPage: 10,
        enableLooping: true,
        startPage: 1
    }
};

/*Declare Basic Collection No options passed in*/
var exampleOneCollection = new predefinedFilterCollection(models);
/*Add filter to Collection*/
exampleOneCollection.addPredefinedFilter('test-filter-1', someTestFilterFunction1);
/*Apply filter to Collection*/
exampleOneCollection.applyPredefinedFilter('test-filter-1', true);
/*Unapply filter from Collection*/
exampleOneCollection.applyPredefinedFilter('test-filter-1', false);
/*Remove filter from Collection*/
exampleOneCollection.removePredefinedFilter('test-filter-1');

/*Declare Basic Collection with options passed in*/
var exampleTwoCollection = new predefinedFilterCollection(options);
/* Set Applied filter status to multiple filters at once*/
exampleTwoCollection.applyPredefinedFilter({
    'test-filter-1': false,
    'test-filter-2': true,
    'test-filter-4': true
});

/*Declare Basic Collection with paging options passed in*/
var exampleThreeCollection = new predefinedFilterCollection(options);
/*Get Next Page of Models*/
exampleThreeCollection.nextPage();
/*Get Previous Page of Models*/
exampleThreeCollection.previousPage();
/*Get Page 5 of Models*/
exampleThreeCollection.goToPage(5);
```


## <a name="tests"></a>Tests
| Coverage Test Results 											| Unit Test Run											   |
|-------------------------------------------------------------------|----------------------------------------------------------|
| [![Lines Covered][coverage-lines-badge]][coverage-url]     		| [![Travis Build Number][travis-build-badge]][travis-url] |
| [![Statements Covered][coverage-statements-badge]][coverage-url]  | [![Number of Tests][tests-total-badge]][travis-url]	   |
| [![Functions Covered][coverage-functions-badge]][coverage-url]    | [![Tests Passed][tests-passed-badge]][travis-url]		   |
| [![Branches Covered][coverage-branches-badge]][coverage-url]      | [![Tests Failed][tests-failed-badge]][travis-url]		   |


## <a name="filter-templates"></a>Filter Templates

#### <a name="filter-templates-date-range"></a>Date Range Filter Template
   Add new Date Range Filter by calling examplePredefinedFilterCollection.addPredefinedFilterFromTemplate('example-date-range-filter-name', 'DateRangeFilter', *data-range-filter-options* ); Below are the following options parameters.
##### Configuarable Option Parameters
| Option Name | Expected Input Type | Default Value | Notes |
|     ---	    |	---    			  | --- | --- |
|options.start.value|String| '1970/01/01 00:00:00'|A date string in moment format |
|options.start.format|String| 'YYYY/MM/DD HH:mm:ss'|A String defining the format of *options.start.value* . |
|options.start.isInUTC|Boolean| true|Flag to set whether or not the formated date string is in UTC time |
|options.start.includeInRange|Boolean| true|if set to *true* comparedValue must be >= start date. If set to *false* comparedValue must be > start date. |
|options.start.ignore|Boolean| false|Completely ignores the start date boundry. Use this option if you are trying to find values < or <= the end date. |
|options.end.value|String| 'now'|A date string in moment format |
|options.end.format|String| 'YYYY/MM/DD HH:mm:ss'|A String defining the format of *options.end.value* . |
|options.end.isInUTC|Boolean| true|Flag to set whether or not the formated date string is in UTC time |
|options.end.includeInRange|Boolean| true|if set to *true* comparedValue must be <= end date. If set to *false* comparedValue must be < end date. |
|options.end.ignore|Boolean| false|Completely ignores the end date boundry. Use this option if you are trying to find values > or >= the start date. |
|options.filterableModelAttributes|Array||Array of Objects containing the list of model attribute to include in the filter and the configuration for those modle attributes|
|options.filterableModelAttributes[n].attribute|String| []|String containing model attribute name. Example *'someDate'* is equivalent to returning *model.get('someDate')*. Nested values are supported. If you need to retrieve a nested value pass the string as follows 'someData.date'. Equivalent to returning *model.get('someData').date*. You can keep adding to the nested value layers as such: 'someData.moreData.evenMoreDate. ... .finallyMyDateAttribute' equivalently calls *model.get('someData').moreData.evenMoreDate. ... .finallyMyDateAttribute* .|
|options.filterableModelAttributes[n].format|String| 'YYYY/MM/DD HH:mm:ss'|A String defining the format of the model attribute value. |
|options.filterableModelAttributes[n].isInUTC|Boolean| true|Flag to set whether or not the formated date string is in UTC time |


##### Code Examples

``` javascript
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
```


documentation coming soon!

[Return to Top](#pagetop)

#### <a name="filter-templates-or"></a>Or Filter Template
   Add new Range Filter by calling examplePredefinedFilterCollection.addPredefinedFilterFromTemplate('example-range-filter-name', 'Or', *or-filter-options* );
Below are the following options parameters.
##### Configuarable Option Parameters
| Option Name | Expected Input Type | Default Value | Notes |
|     ---	    |	---    			  | --- | --- |
|options.filters|Array| []|Array of Strings listing out the filter names. Any model that is returned from the listed filters is included. |


##### Code Examples

``` javascript

```


documentation for Or Filter Template still under construction

[Return to Top](#pagetop)

#### <a name="filter-templates-range"></a>Range Filter Template
   Add new Range Filter by calling examplePredefinedFilterCollection.addPredefinedFilterFromTemplate('example-range-filter-name', 'RangeFilter', *range-filter-options* ); Below are the following options parameters.
##### Configuarable Option Parameters
| Option Name | Expected Input Type | Default Value | Notes |
|     ---	    |	---    			  | --- | --- |
|options.start.value|String| 0|A numeric value |
|options.start.includeInRange|Boolean| true|if set to *true* comparedValue must be >= start value. If set to *false* comparedValue must be > start value. |
|options.start.ignore|Boolean| false|Completely ignores the start value boundry. Use this option if you are trying to find values < or <= the end value. |
|options.end.value|String| 100|A numeric value |
|options.end.includeInRange|Boolean| true|if set to *true* comparedValue must be <= end value. If set to *false* comparedValue must be < end value. |
|options.end.ignore|Boolean| false|Completely ignores the end value boundry. Use this option if you are trying to find values > or >= the start value. |
|options.filterableModelAttributes|Array| []|Array of Strings containing the list of model attributes to include in the filter. Example *'someDate'* is equivalent to returning *model.get('someDate')*. Nested values are supported. If you need to retrieve a nested value pass the string as follows 'someData.value'. Equivalent to returning *model.get('someData').value*. You can keep adding to the nested value layers as such: 'someData.moreData.evenMoreData. ... .finallyMyAttribute' equivalently calls *model.get('someData').moreData.evenMoreData. ... .finallyMyAttribute* .|


##### Code Examples

``` javascript

```


documentation for Range Filter Template still under construction

[Return to Top](#pagetop)

#### <a name="filter-templates-text-search"></a>Text Search Filter Template
   Add new Range Filter by calling examplePredefinedFilterCollection.addPredefinedFilterFromTemplate('example-text-search-filter-name', 'TextSearch', *test-search-filter-options* ); Below are the following options parameters.
##### Configuarable Option Parameters
| Option Name | Expected Input Type | Default Value | Notes |
|     ---	    |	---    			  | --- | --- |
|options.inputValue|String/Number/Boolean| ''|String, Number, or Boolean value to search for. |
|options.caseSensitive|Boolean| false|Flag to indicate to match results with exact case of *inputValue* or not. |
|options.minimumInputLength|Number| 1|Minimum of charactors in *inputValue* necessary to invoke the filter. If the minimun length is not met the filter returns all models effectively not running the filter. Helpful for use with typeahead functionality. |
|options.filterableModelAttributes|Array| []|Array of Strings containing the list of model attributes to include in the filter. Example *'someData'* is equivalent to returning *model.get('someData')*. Nested values are supported. If you need to retrieve a nested value pass the string as follows 'someData.value'. Equivalent to returning *model.get('someData').value*. You can keep adding to the nested value layers as such: 'someData.moreData.evenMoreData. ... .finallyMyAttribute' equivalently calls *model.get('someData').moreData.evenMoreData. ... .finallyMyAttribute* .|


##### Code Examples

``` javascript

```


documentation for Text Search Filter Template still under construction

[Return to Top](#pagetop)


## <a name="contributing"></a>Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## <a name="release-history"></a>Release History

* **1.0.0** Initial release

## <a name="build-history"></a>Travis CI Build History

<table><tr><th>Build Number</th><th>Result</th></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI%201.0.55-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI%201.0.54-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI%201.0.53-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI%201.0.52-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI%201.0.51-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.50-Failed-red.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.49-Failed-red.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.48-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.47-Cancelled-lightgrey.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.46-Cancelled-lightgrey.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.45-Cancelled-lightgrey.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.44-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.43-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.42-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.41-Unknown-yellow.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.40-Unknown-yellow.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.39-Unknown-yellow.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.38-Unknown-yellow.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.37-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.36-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.35-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.34-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.33-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.32-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.31-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.30-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.29-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.28-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.27-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.26-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.25-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.24-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.23-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.22-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.21-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.20-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.19-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.18-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.17-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.16-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.15-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.14-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.13-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.12-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.11-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.10-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.9-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.8-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.7-Failed-red.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.6-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.5-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.4-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.3-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.2-Passed-brightgreen.svg?style=flat"/></a></td></tr>
<tr><td colspan="2"><a href="https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds"><img src="https://img.shields.io/badge/TravisCI 1.0.1-Failed-red.svg?style=flat"/></a></td></tr>
</table>


[Return to Top](#pagetop)

[release-status-badge]: https://img.shields.io/badge/Release%20Status-Unreleased%20Development%20still%20in%20progress-red.svg?style=flat
[main-logo]: logo-main.png?raw=true "Backbone Collection Predefined Filters"
[license-image]: http://img.shields.io/badge/license-MIT-blue.svg?style=flat
[license-url]: LICENSE

[npm-url]: https://npmjs.org/package/backbone-collection-predefined-filters
[npm-version-image]: http://img.shields.io/npm/v/backbone-collection-predefined-filters.svg?style=flat
[npm-downloads-image]: http://img.shields.io/npm/dm/backbone-collection-predefined-filters.svg?style=flat

[travis-url]: https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters
[travis-builds-url]: https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters/builds
[travis-image]: https://travis-ci.org/JSystemsTech/backbone-collection-predefined-filters.svg?branch=master

[dependancies-image]:https://david-dm.org/JSystemsTech/backbone-collection-predefined-filters.svg?style=flat
[dependancies-url]:https://david-dm.org/JSystemsTech/backbone-collection-predefined-filters

[coverage-url]: https://coveralls.io/github/JSystemsTech/backbone-collection-predefined-filters?branch=master
[coverage-badge]: https://coveralls.io/repos/github/JSystemsTech/backbone-collection-predefined-filters/badge.svg?branch=master


[coverage-lines-badge]: https://img.shields.io/badge/Lines-314%2F314%20100%25-brightgreen.svg?style=flat
[coverage-statements-badge]: https://img.shields.io/badge/Statements-314%2F314%20100%25-brightgreen.svg?style=flat
[coverage-branches-badge]: https://img.shields.io/badge/Branches-242%2F242%20100%25-brightgreen.svg?style=flat
[coverage-functions-badge]: https://img.shields.io/badge/Functions-63%2F63%20100%25-brightgreen.svg?style=flat
[tests-passed-badge]: https://img.shields.io/badge/Tests%20Passed-2493-brightgreen.svg?style=flat
[tests-failed-badge]: https://img.shields.io/badge/Tests%20Failed-0-brightgreen.svg?style=flat
[tests-total-badge]: https://img.shields.io/badge/Number%20of%20Tests-2493-blue.svg?style=flat
[travis-build-badge]: https://img.shields.io/badge/Travis%20Build%20%23-55-4B0082.svg?style=flat
