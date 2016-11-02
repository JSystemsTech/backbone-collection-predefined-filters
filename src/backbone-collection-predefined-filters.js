(function(factory) {
    'use strict';
    /* istanbul ignore next */
    // CommonJS
    if (typeof exports == "object" && typeof require == "function") {
        module.exports = factory(require("underscore"), require("backbone"), require("async"), require("./filter_templates/filter-template-loader"));
    }
    // AMD
    else if (typeof define == "function" && define.amd) {
        define(["underscore", "backbone", "async", "./filter_templates/filter-template-loader"], factory);
    }
    // Browser
    else if (typeof _ !== "undefined" && typeof Backbone !== "undefined") {
        var oldPredefinedFilterCollection = Backbone.PredefinedFilterCollection;
        var PredefinedFilterCollection = factory(_, Backbone);

        /**
           __BROWSER ONLY__
           If you already have an object named `PredefinedFilterCollection` attached to the
           `Backbone` module, you can use this to return a local reference to this
           PredefinedFilterCollection class and reset the name PredefinedFilterCollection to its
           previous definition.
               // The left hand side gives you a reference to this
               // PredefinedFilterCollection implementation, the right hand side
               // resets PredefinedFilterCollection to your other PredefinedFilterCollection.
               var PredefinedFilterCollection = PredefinedFilterCollection.noConflict();
           @static
           @return {PredefinedFilterCollection}
        */
        Backbone.PredefinedFilterCollection.noConflict = function() {
            Backbone.PredefinedFilterCollection = oldPredefinedFilterCollection;
            return PredefinedFilterCollection;
        };
    }
}(function(_, Backbone, Async, FilterTemplates) {
    'use strict';
    var PredefinedFilterCollection = Backbone.PredefinedFilterCollection = Backbone.Collection.extend({
        /**
         * {{constructor}} Initialialize a new Instance of PredefinedFilterCollection with new Backbone.PredefinedFilterCollection(models, options)
         *
         * @property {Object} options.predefinedFilters An object list of user defined functions with unique filter names as keys {{default}} []
         * @property {Object} options.appliedPredefinedFilters An object list of user defined booleans with unique filter names as keys which set the state of the currently applied filters {{default}} []
         * @property {Number} options.pagingOptions.modelsPerPage The maximum number of models each page has {{default}} *The number of models in the collection (i.e. Show entire collection on 1 page)*
         * @property {Boolean} options.pagingOptions.enableLooping If set to true calling **nextPage** or **previousPage** will cycle through the pages continiously. If set to false the start and last page are the lower and upper limits. {{default}} true
         * @property {Number} options.pagingOptions.startPage The page number of models to render first {{default}} 1
         */
        initialize: function(models, options) {
            this.options = options;
            this._initializeCollectionEventListeners();
            this._initializeDefaults(models);

        },
        _initializeDefaults: function(models) {
            var self = this;
            var executeFiltersOnInitialize = false;
            this.originalModels = _.clone(models);
            this.predefinedFilters = {};
            this._predefinedFiltersApplied = false;
            this._usePaging = false;
            this._pages = [];
            this.pagingInfo = {};
            this._appliedPredefinedFilters = {};
            if (!_.isUndefined(this.options.predefinedFilters)) {
                this.predefinedFilters = this.options.predefinedFilters;
            }
            if (!_.isUndefined(this.options.appliedPredefinedFilters)) {
                var generatedAppliedPredefinedFilters = this.options.appliedPredefinedFilters;
                _.each(this.options.appliedPredefinedFilters, function(status, name) {
                    if (_.isUndefined(generatedAppliedPredefinedFilters['!' + name]) && name.charAt(0) !== '!') {
                        generatedAppliedPredefinedFilters['!' + name] = false;
                    }
                });
                this._appliedPredefinedFilters = generatedAppliedPredefinedFilters;
            }
            if (!_.isUndefined(this.options.pagingOptions)) {
                this._usePaging = true;
                this._pagingOptions = _.defaults(this.options.pagingOptions, {
                    modelsPerPage: models.length, //Show all models on one page
                    enableLooping: true,
                    startPage: 1
                });
                if (this._pagingOptions.modelsPerPage < 1) {
                    this._pagingOptions.modelsPerPage = 1;
                }
                this._currentPage = this._pagingOptions.startPage;
            }
            _.each(this.predefinedFilters, function(filter, eventName) {
                if (_.isUndefined(self._appliedPredefinedFilters['!' + eventName])) {
                    self._appliedPredefinedFilters['!' + eventName] = false;
                }
                if (_.isUndefined(self._appliedPredefinedFilters[eventName])) {
                    self._appliedPredefinedFilters[eventName] = false;
                } else if (self._appliedPredefinedFilters[eventName] === true) {
                    executeFiltersOnInitialize = true;
                }
            });
            if (this._usePaging || executeFiltersOnInitialize) {
                if (this._usePaging && !executeFiltersOnInitialize) {
                    this._setPages(models);
                } else {
                    this._executeAppliedPredefinedFilters();
                }

            }
        },
        _initializeCollectionEventListeners: function() {
            this.on('sync update', this._onSyncOrUpdateModel, this);
            this.on('add', this._onAddModel, this);
            this.on('remove', this._onRemoveModel, this);
            this.on('change', this._onChangeModel, this);
            this.on('predefined-filters:add', this.addPredefinedFilter, this);
            this.on('predefined-filters:remove', this.removePredefinedFilter, this);
            this.on('predefined-filters:apply', this.applyPredefinedFilter, this);
        },
        _onSyncOrUpdateModel: function() {
            this._executeAppliedPredefinedFilters();
        },
        _onAddModel: function(model) {
            this.originalModels.push(model);
            this._executeAppliedPredefinedFilters();
        },
        _onRemoveModel: function(model) {
            var index = _.indexOf(this.originalModels, model);
            this.originalModels.splice(index, 1);
            this._executeAppliedPredefinedFilters();
        },
        _onChangeModel: function(model) {
            var originalModel = _.where(this.originalModels, {
                cid: model.cid
            })[0];
            var index = _.indexOf(this.originalModels, originalModel);
            this.originalModels[index].set(model.attributes);
            this._executeAppliedPredefinedFilters();

        },
        _executeFilter: function(models, name, callback) {
            if (models.length === 0) {
                return callback(null, models);
            }
            var firstCharInName = name.charAt(0);
            if (firstCharInName === '!') {
                return callback(null, _.reject(models, this.predefinedFilters[name.split(firstCharInName)[1]]));
            }
            return callback(null, _.filter(models, this.predefinedFilters[name]));
        },
        _buildAsyncFilterFunctionList: function() {
            var self = this;
            var filtersToExecute = _.pairs(_.omit(this._appliedPredefinedFilters, function(executeFilter) {
                return !executeFilter;
            }));
            var asyncFiltersToExecute = [];
            _.each(filtersToExecute, function(filterPair, index) {
                if (index === 0) {
                    asyncFiltersToExecute.push(function(callback) {
                        self._executeFilter(self.models, filterPair[0], callback);
                    });
                } else {
                    asyncFiltersToExecute.push(function(models, callback) {
                        self._executeFilter(models, filterPair[0], callback);
                    });
                }
            });
            return asyncFiltersToExecute;
        },
        _executeAppliedPredefinedFilters: function() {
            this.models = _.clone(this.originalModels);
            var filtersToExecute = this._buildAsyncFilterFunctionList();
            var numberOfFiltersToExecute = filtersToExecute.length;
            if (numberOfFiltersToExecute > 0) {
                this._predefinedFiltersApplied = true;
                this.originalModels = this.models;
                var self = this;
                Async.waterfall(filtersToExecute, function(error, results) {
                    self.models = results;
                    self._setPages();
                    self.trigger('predefined-filters:updated');
                });

            } else {
                this._predefinedFiltersApplied = false;
                this._setPages();
            }
        },
        _setPages: function(onInitializeModels) {
            var self = this;
            this.reset(this.models, {
                silent: true
            });
            var models = this.models;
            if (!_.isUndefined(onInitializeModels)) {
                models = onInitializeModels;
            }
            if (this._usePaging) {
                var pages = _.range(Math.ceil(models.length / this._pagingOptions.modelsPerPage));
                this._pages = [];
                _.each(pages, function(page) {
                    self._pages.push(models.splice(0, self._pagingOptions.modelsPerPage));
                    if (page === _.last(pages)) {
                        return self.goToPage(self._currentPage, onInitializeModels);
                    }
                });
            }
        },
        _nextPageInfo: function() {
            var nextPage = null;
            if (this._usePaging) {
                if (this._pagingOptions.enableLooping && this._currentPage === this._pages.length) {
                    nextPage = 1;
                } else if (this._currentPage < this._pages.length) {
                    nextPage = this._currentPage + 1;
                }
            }
            return nextPage;
        },
        _previousPageInfo: function() {
            var previousPage = null;
            if (this._usePaging) {
                if (this._pagingOptions.enableLooping && this._currentPage === 1) {
                    previousPage = this._pages.length;
                } else if (this._currentPage > 1) {
                    previousPage = this._currentPage - 1;
                }
            }
            return previousPage;
        },
        _setPagingInfo: function() {
            if (this._usePaging) {
                var nextPage = this._nextPageInfo();
                var previousPage = this._previousPageInfo();
                var hasNextPage = true;
                var hasPreviousPage = true;
                if (!this._pagingOptions.enableLooping) {
                    if (previousPage === null) {
                        previousPage = this._currentPage;
                        hasPreviousPage = false;
                    }
                    if (nextPage === null) {
                        nextPage = this._currentPage;
                        hasNextPage = false;
                    }
                }
                this.pagingInfo = {
                    pages: this._pages.length,
                    currentPage: this._currentPage,
                    hasNextPage: hasNextPage,
                    hasPreviousPage: hasPreviousPage,
                    nextPage: nextPage,
                    previousPage: previousPage
                }
            }
        },
        /**
         * Sets Models to the next available Page. If options.pagingOptions.enableLooping is set to false then if the previous page number is < 1 the first page is returned.
         * @declaration {Function} nextPage 
         */
        nextPage: function() {
            if (this._usePaging && this.pagingInfo.hasNextPage) {
                this.goToPage(this.pagingInfo.nextPage);
            }
        },
        /**
         * Sets Models to the next available Page. If options.pagingOptions.enableLooping is set to false then if the next available page number is > the total number of pages the last page is returned. 
         * @declaration {Function} previousPage
         */
        previousPage: function() {
            if (this._usePaging && this.pagingInfo.hasPreviousPage) {
                this.goToPage(this.pagingInfo.previousPage);
            }
        },
        /**
         * Sets the current models to the specified page. If the input page number is > the total number of pages the last page is returned. If the input page number < 1 the first page is returned. 
         * @declaration {Function} goToPage
         * @property {Number} pageNumber Number of Page to navigate to.
         */
        goToPage: function(pageNumber, onInitializeModels) {
            if (this._usePaging) {
                if (pageNumber > this._pages.length) {
                    pageNumber = this._pages.length;
                } else if (pageNumber < 1) {
                    pageNumber = 1;
                }
                this._currentPage = pageNumber;
                this._setPagingInfo();
                if (!_.isUndefined(onInitializeModels)) {
                    onInitializeModels = this._pages[this._currentPage - 1];
                } else {
                    this.reset(this._pages[this._currentPage - 1], {
                        silent: true
                    });
                }
            }
        },
        /**
         * @declaration {Function} addPredefinedFilterFromTemplate
         *
         * @property {String} name unique key value for collection filter list
         * @property {String} templateName Type of Filter to add from filter template list. *See [Filter Templates](#filter-templates) for more information about individual filter template types*
         * @property {Object} options A configuation object passed to the filter template builder. *See [Filter Templates](#filter-templates) for more information about individual filter template options*
         * @property {Boolean} applyImmediately Immediatelly applies the filter to the collection. Defaults to false if not specified
         */
        addPredefinedFilterFromTemplate: function(name, templateName, options, applyImmediately) {
            this.addPredefinedFilter(name, FilterTemplates[templateName](options, this), applyImmediately);
        },
        /**
         * @declaration {Function} addPredefinedFilter
         *
         * @property {String} name unique key value for collection filter list
         * @property {Function} filterFunction A function that takes in a model as a parameter and returns a boolean
         * @property {Boolean/String} applyImmediately Immediatelly applies the filter to the collection. Defaults to false if not specified. Pass in a string value of '!' to immediately apply the NOT filter. *See [Using NOT filters](#not-filter-info) for more information* 
         */
        addPredefinedFilter: function(name, filterFunction, applyImmediately) {
            this._appliedPredefinedFilters[name] = applyImmediately || false;
            var notFilterName = '!' + name;
            this._appliedPredefinedFilters[notFilterName] = false;
            this.predefinedFilters[name] = filterFunction;
            var self = this;
            if (!_.isUndefined(applyImmediately) && applyImmediately === true) {
                self.applyPredefinedFilter(name, true);
            } else if (!_.isUndefined(applyImmediately) && applyImmediately === '!') {
                this._appliedPredefinedFilters[name] = false;
                this._appliedPredefinedFilters[notFilterName] = true;
                self.applyPredefinedFilter(notFilterName, true);
            }
        },
        /**
         * *Note* if **name** is passed in as an object **value** is ignored and is substituted by the value in each entry in **name**)
         * @declaration {Function} applyPredefinedFilter
         *
         * @property {String/Object} name unique key value or Object list of values with filter name/boolean as the key/value pair
         * @property {Boolean} value If *true* enables filter. If *false* disables the filters. Defaults to toggling the current state of the filter if undefined 
         */
        applyPredefinedFilter: function(name, value) {
            var self = this;
            var useObject = _.isObject(name) && !_.isArray(name) && !_.isFunction(name) && !_.isString(name);
            if (!_.isArray(name) && !useObject) {
                name = [name];
            }
            _.each(name, function(filter, filterName) {
                if (useObject) {
                    self._appliedPredefinedFilters[filterName] = value || filter;
                } else if (!_.isUndefined(value)) {
                    self._appliedPredefinedFilters[filter] = value;
                } else {
                    self._appliedPredefinedFilters[filter] = !self._appliedPredefinedFilters[filter];
                }
            });
            this._executeAppliedPredefinedFilters();
        },
        /**
         * @declaration {Function} addPredefinedFilter
         *
         * @property {String} name unique key value for collection filter list
         */
        removePredefinedFilter: function(name) {
            if (name.charAt(0) !== '!') {
                this.predefinedFilters = _.omit(this.predefinedFilters, name);
                this._appliedPredefinedFilters = _.omit(_.omit(this._appliedPredefinedFilters, name), '!' + name);
                this._executeAppliedPredefinedFilters();
            }
        }
    });
    return PredefinedFilterCollection;
}));