![Backbone Collection Predefined Filters Logo][main-logo]
---
An extention of Backbone Collection that allows for predefined filter(s) to be added/removed/applied/unapplied on the collection

[![NPM version][npm-version-image]][npm-url] [![NPM downloads][npm-downloads-image]][npm-url] [![MIT License][license-image]][license-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][dependancies-image]][dependancies-url] [![Coverage Status][coverage-badge]][coverage-url]
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
| Installation Type | Command|
|     :---:      	|	---  |
| npm 	            | npm install Backbone-Collection-Predefined-Filters --save |
| bower             | bower install Backbone-Collection-Predefined-Filters 	 	|

## <a name="usage"></a>Usage

#### Available Collection Functions
| Function Name | Expected Parameters | Notes |
|     ---	    |	---    			  | --- |
| addPredefinedFilter 				| **name** (String -unique key value for collection filter list)<br/>**filterFunction** (Function - A function that takes in a model as a parameter and returns a boolean)<br/>**applyImmediately** (Boolean *optional* - Immediatelly applies the filter to the collection. Defaults to false if not specified	| |
| addPredefinedFilterFromTemplate 	| **name** (String -unique key value for collection filter list)<br/>**templateName** (String - Type of Filter to add from filter template list. *See [Filter Templates](#filter-templates) for more information about individual filter template types*)<br/>**options** (Object - A configuation object passed to the filter template builder. *See [Filter Templates](#filter-templates) for more information about individual filter template options*)<br/>**applyImmediately** (Boolean *optional* - Immediatelly applies the filter to the collection. Defaults to false if not specified	| |
| applyPredefinedFilter 			| **name** (String OR Object -unique key value or Object list of values with filter name/boolean as the key/value pair)<br/> **value** (Boolean *optional* -If *true* enables filter. If *false* disables the filters. Defaults to toggling the current state of the filter if undefined. *Note* if **name** is passed in as an object **value** is ignored and is substituted by the value in each entry in **name**)| |
| removePredefinedFilter 			| **name** (String -unique key value for collection filter list)| |
| **...With Paging Enabled...**      |  | |
| nextPage      | | |
| previousPage      | | |
| goToPage      | **pageNumber** Integer -page number to navigate to. | Returns last page if **pageNumber** is greater than the number of pages & returns the first page if **pageNumber** is less than 1|


<details>
<summary>Code Examples</summary>
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
</details>

## <a name="tests"></a>Tests
| Coverage Test Results 											| Unit Test Run											   |
|     ---      														|		---    										   	   |
| [![Lines Covered][coverage-lines-badge]][coverage-url]     		| [![Travis Build Number][travis-build-badge]][travis-url] |
| [![Statements Covered][coverage-statements-badge]][coverage-url]  | [![Number of Tests][tests-total-badge]][travis-url]	   |
| [![Functions Covered][coverage-functions-badge]][coverage-url]    | [![Tests Passed][tests-passed-badge]][travis-url]		   |
| [![Branches Covered][coverage-branches-badge]][coverage-url]      | [![Tests Failed][tests-failed-badge]][travis-url]		   |


## <a name="filter-templates"></a>Filter Templates

#### <a name="filter-templates-date-range"></a>Date Range Filter Template
   documentation coming soon!

#### <a name="filter-templates-or"></a>Or Filter Template
   documentation for Or Filter Template still under construction

#### <a name="filter-templates-range"></a>Range Filter Template
   documentation for Range Filter Template still under construction

#### <a name="filter-templates-text-search"></a>Text Search Filter Template
   documentation for Text Search Filter Template still under construction


## <a name="contributing"></a>Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## <a name="release-history"></a>Release History

* **1.0.0** Initial release

## <a name="build-history"></a>Travis CI Build History
| Build Number : Result |
| --- 					  |
| [![Travis Build Number 42][build-history-badge-42-url]][travis-builds-url] |
| [![Travis Build Number 37][build-history-badge-37-url]][travis-builds-url] |
| [![Travis Build Number 36][build-history-badge-36-url]][travis-builds-url] |
| [![Travis Build Number 35][build-history-badge-35-url]][travis-builds-url] |
| [![Travis Build Number 34][build-history-badge-34-url]][travis-builds-url] |
| [![Travis Build Number 33][build-history-badge-33-url]][travis-builds-url] |
| [![Travis Build Number 32][build-history-badge-32-url]][travis-builds-url] |
| [![Travis Build Number 31][build-history-badge-31-url]][travis-builds-url] |
| [![Travis Build Number 30][build-history-badge-30-url]][travis-builds-url] |
| [![Travis Build Number 29][build-history-badge-29-url]][travis-builds-url] |
| [![Travis Build Number 28][build-history-badge-28-url]][travis-builds-url] |
| [![Travis Build Number 27][build-history-badge-27-url]][travis-builds-url] |
| [![Travis Build Number 26][build-history-badge-26-url]][travis-builds-url] |
| [![Travis Build Number 25][build-history-badge-25-url]][travis-builds-url] |
| [![Travis Build Number 24][build-history-badge-24-url]][travis-builds-url] |
| [![Travis Build Number 23][build-history-badge-23-url]][travis-builds-url] |
| [![Travis Build Number 22][build-history-badge-22-url]][travis-builds-url] |
| [![Travis Build Number 21][build-history-badge-21-url]][travis-builds-url] |
| [![Travis Build Number 20][build-history-badge-20-url]][travis-builds-url] |
| [![Travis Build Number 19][build-history-badge-19-url]][travis-builds-url] |
| [![Travis Build Number 18][build-history-badge-18-url]][travis-builds-url] |
| [![Travis Build Number 17][build-history-badge-17-url]][travis-builds-url] |
| [![Travis Build Number 16][build-history-badge-16-url]][travis-builds-url] |
| [![Travis Build Number 15][build-history-badge-15-url]][travis-builds-url] |
| [![Travis Build Number 14][build-history-badge-14-url]][travis-builds-url] |
| [![Travis Build Number 13][build-history-badge-13-url]][travis-builds-url] |
| [![Travis Build Number 12][build-history-badge-12-url]][travis-builds-url] |
| [![Travis Build Number 11][build-history-badge-11-url]][travis-builds-url] |
| [![Travis Build Number 10][build-history-badge-10-url]][travis-builds-url] |
| [![Travis Build Number 9][build-history-badge-9-url]][travis-builds-url] |
| [![Travis Build Number 8][build-history-badge-8-url]][travis-builds-url] |
| [![Travis Build Number 7][build-history-badge-7-url]][travis-builds-url] |
| [![Travis Build Number 6][build-history-badge-6-url]][travis-builds-url] |
| [![Travis Build Number 5][build-history-badge-5-url]][travis-builds-url] |
| [![Travis Build Number 4][build-history-badge-4-url]][travis-builds-url] |
| [![Travis Build Number 3][build-history-badge-3-url]][travis-builds-url] |
| [![Travis Build Number 2][build-history-badge-2-url]][travis-builds-url] |
| [![Travis Build Number 1][build-history-badge-1-url]][travis-builds-url] |


[Return to Top](#pagetop)

[build-history-badge-42-url]: https://img.shields.io/badge/TravisCI%201.0.0.42-Passed-brightgreen.svg?style=flat
[build-history-badge-37-url]: https://img.shields.io/badge/TravisCI%201.0.0.37-Passed-brightgreen.svg?style=flat
[build-history-badge-36-url]: https://img.shields.io/badge/TravisCI%201.0.0.36-Passed-brightgreen.svg?style=flat
[build-history-badge-35-url]: https://img.shields.io/badge/TravisCI%201.0.0.35-Passed-brightgreen.svg?style=flat
[build-history-badge-34-url]: https://img.shields.io/badge/TravisCI%201.0.0.34-Passed-brightgreen.svg?style=flat
[build-history-badge-33-url]: https://img.shields.io/badge/TravisCI%201.0.0.33-Passed-brightgreen.svg?style=flat
[build-history-badge-32-url]: https://img.shields.io/badge/TravisCI%201.0.0.32-Passed-brightgreen.svg?style=flat
[build-history-badge-31-url]: https://img.shields.io/badge/TravisCI%201.0.0.31-Passed-brightgreen.svg?style=flat
[build-history-badge-30-url]: https://img.shields.io/badge/TravisCI%201.0.0.30-Passed-brightgreen.svg?style=flat
[build-history-badge-29-url]: https://img.shields.io/badge/TravisCI%201.0.0.29-Passed-brightgreen.svg?style=flat
[build-history-badge-28-url]: https://img.shields.io/badge/TravisCI%201.0.0.28-Passed-brightgreen.svg?style=flat
[build-history-badge-27-url]: https://img.shields.io/badge/TravisCI%201.0.0.27-Passed-brightgreen.svg?style=flat
[build-history-badge-26-url]: https://img.shields.io/badge/TravisCI%201.0.0.26-Passed-brightgreen.svg?style=flat
[build-history-badge-25-url]: https://img.shields.io/badge/TravisCI%201.0.0.25-Passed-brightgreen.svg?style=flat
[build-history-badge-24-url]: https://img.shields.io/badge/TravisCI%201.0.0.24-Passed-brightgreen.svg?style=flat
[build-history-badge-23-url]: https://img.shields.io/badge/TravisCI%201.0.0.23-Passed-brightgreen.svg?style=flat
[build-history-badge-22-url]: https://img.shields.io/badge/TravisCI%201.0.0.22-Passed-brightgreen.svg?style=flat
[build-history-badge-21-url]: https://img.shields.io/badge/TravisCI%201.0.0.21-Passed-brightgreen.svg?style=flat
[build-history-badge-20-url]: https://img.shields.io/badge/TravisCI%201.0.0.20-Passed-brightgreen.svg?style=flat
[build-history-badge-19-url]: https://img.shields.io/badge/TravisCI%201.0.0.19-Passed-brightgreen.svg?style=flat
[build-history-badge-18-url]: https://img.shields.io/badge/TravisCI%201.0.0.18-Passed-brightgreen.svg?style=flat
[build-history-badge-17-url]: https://img.shields.io/badge/TravisCI%201.0.0.17-Passed-brightgreen.svg?style=flat
[build-history-badge-16-url]: https://img.shields.io/badge/TravisCI%201.0.0.16-Passed-brightgreen.svg?style=flat
[build-history-badge-15-url]: https://img.shields.io/badge/TravisCI%201.0.0.15-Passed-brightgreen.svg?style=flat
[build-history-badge-14-url]: https://img.shields.io/badge/TravisCI%201.0.0.14-Passed-brightgreen.svg?style=flat
[build-history-badge-13-url]: https://img.shields.io/badge/TravisCI%201.0.0.13-Passed-brightgreen.svg?style=flat
[build-history-badge-12-url]: https://img.shields.io/badge/TravisCI%201.0.0.12-Passed-brightgreen.svg?style=flat
[build-history-badge-11-url]: https://img.shields.io/badge/TravisCI%201.0.0.11-Passed-brightgreen.svg?style=flat
[build-history-badge-10-url]: https://img.shields.io/badge/TravisCI%201.0.0.10-Passed-brightgreen.svg?style=flat
[build-history-badge-9-url]: https://img.shields.io/badge/TravisCI%201.0.0.9-Passed-brightgreen.svg?style=flat
[build-history-badge-8-url]: https://img.shields.io/badge/TravisCI%201.0.0.8-Passed-brightgreen.svg?style=flat
[build-history-badge-7-url]: https://img.shields.io/badge/TravisCI%201.0.0.7-Failed-red.svg?style=flat
[build-history-badge-6-url]: https://img.shields.io/badge/TravisCI%201.0.0.6-Passed-brightgreen.svg?style=flat
[build-history-badge-5-url]: https://img.shields.io/badge/TravisCI%201.0.0.5-Passed-brightgreen.svg?style=flat
[build-history-badge-4-url]: https://img.shields.io/badge/TravisCI%201.0.0.4-Passed-brightgreen.svg?style=flat
[build-history-badge-3-url]: https://img.shields.io/badge/TravisCI%201.0.0.3-Passed-brightgreen.svg?style=flat
[build-history-badge-2-url]: https://img.shields.io/badge/TravisCI%201.0.0.2-Passed-brightgreen.svg?style=flat
[build-history-badge-1-url]: https://img.shields.io/badge/TravisCI%201.0.0.1-Failed-red.svg?style=flat


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


[coverage-lines-badge]: https://img.shields.io/badge/Lines-288%2F288%20100%25-brightgreen.svg?style=flat
[coverage-statements-badge]: https://img.shields.io/badge/Statements-288%2F288%20100%25-brightgreen.svg?style=flat
[coverage-branches-badge]: https://img.shields.io/badge/Branches-226%2F226%20100%25-brightgreen.svg?style=flat
[coverage-functions-badge]: https://img.shields.io/badge/Functions-59%2F59%20100%25-brightgreen.svg?style=flat
[tests-passed-badge]: https://img.shields.io/badge/Tests%20Passed-2385-brightgreen.svg?style=flat
[tests-failed-badge]: https://img.shields.io/badge/Tests%20Failed-0-brightgreen.svg?style=flat
[tests-total-badge]: https://img.shields.io/badge/Number%20of%20Tests-2385-blue.svg?style=flat
[travis-build-badge]: https://img.shields.io/badge/Travis%20Build%20%23-42-4B0082.svg?style=flat
