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
{{>filter-templates-table-of-contents-content}}
5. [Contributing](#contributing)
6. [Release History](#release-history)
7. [Travis CI Build History](#build-history)

## <a name="installation"></a>Installation
| Installation Type | Command|
|     :---:      	|	---  |
| npm 	            | npm install Backbone-Collection-Predefined-Filters --save |
| bower             | bower install Backbone-Collection-Predefined-Filters 	 	|

## <a name="usage"></a>Usage

{{>available-collection-functions}}


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

{{>filter-templates-content}}

## <a name="contributing"></a>Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## <a name="release-history"></a>Release History

* **1.0.0** Initial release

## <a name="build-history"></a>Travis CI Build History
<details>
<summary>Show Build History Table</summary>
{{>build-history-content}}
</details>
[Return to Top](#pagetop)

{{>build-history-content-badge-urls}}


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
