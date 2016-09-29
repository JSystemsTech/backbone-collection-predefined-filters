(function(factory) {
    'use strict';
    /* istanbul ignore next */
    // CommonJS
    if (typeof exports == "object" && typeof require == "function") {
        module.exports = factory(require("underscore"), require("backbone"));
    }
    // AMD
    else if (typeof define == "function" && define.amd) {
        define(["underscore", "backbone"], factory);
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
           @return {PageableCollection}
        */
        Backbone.PredefinedFilterCollection.noConflict = function() {
            Backbone.PredefinedFilterCollection = oldPredefinedFilterCollection;
            return PredefinedFilterCollection;
        };
    }
}(function(_, Backbone) {
    'use strict';
    var PredefinedFilterCollection = Backbone.PredefinedFilterCollection = Backbone.Collection.extend({
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
            if (!_.isUndefined(this.options)) {
                if (!_.isUndefined(this.options.predefinedFilters)) {
                    this.predefinedFilters = this.options.predefinedFilters;
                }
                if (!_.isUndefined(this.options.appliedPredefinedFilters)) {
                    this._appliedPredefinedFilters = this.options.appliedPredefinedFilters;
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
            }
            _.each(this.predefinedFilters, function(filter, eventName) {
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
            if (!_.isUndefined(this.originalModels)) {
                this.originalModels.push(model);
            }
            this._executeAppliedPredefinedFilters();
        },
        _onRemoveModel: function(model) {
            if (!_.isUndefined(this.originalModels)) {
                var index = _.indexOf(this.originalModels, model);
                this.originalModels.splice(index, 1);
            }
            this._executeAppliedPredefinedFilters();
        },
        _onChangeModel: function(model) {
            if (!_.isUndefined(this.originalModels)) {
                var originalModel = _.where(this.originalModels, {
                    cid: model.cid
                })[0];
                var index = _.indexOf(this.originalModels, originalModel);
                this.originalModels[index].set(model.attributes);
                this._executeAppliedPredefinedFilters();
            }
        },
        _executeFilter: function(name, callback) {
            this.models = this.filter(this.predefinedFilters[name]);
            callback();
        },
        _executeAppliedPredefinedFilters: function() {
            this.models = _.clone(this.originalModels);
            var filtersToExecute = _.omit(this._appliedPredefinedFilters, function(executeFilter) {
                return !executeFilter;
            });
            var numberOfFiltersToExecute = Object.keys(filtersToExecute).length;
            if (numberOfFiltersToExecute > 0) {
                this._predefinedFiltersApplied = true;
                this.originalModels = this.models;
                var numberOfFiltersToExecuted = 0;
                var self = this;
                _.each(filtersToExecute, function(value, filter) {
                    self._executeFilter(filter, function() {
                        numberOfFiltersToExecuted++;
                        if (numberOfFiltersToExecuted === numberOfFiltersToExecute) {
                            self._setPages();
                            self.trigger('predefined-filters:updated');
                        }
                    });
                });
            } else {
                this._predefinedFiltersApplied = false;
                this._setPages();
            }
        },
        _setPages: function(onInitializeModels) {
            var self = this;
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
        nextPage: function() {
            if (this._usePaging && this.pagingInfo.hasNextPage) {
                this.goToPage(this.pagingInfo.nextPage);
            }
        },
        previousPage: function() {
            if (this._usePaging && this.pagingInfo.hasPreviousPage) {
                this.goToPage(this.pagingInfo.previousPage);
            }
        },
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
                    this.models = this._pages[this._currentPage - 1];
                }
                this._testNum = this.models.length;
            }
        },
        addPredefinedFilter: function(name, filterFunction, applyImmediately) {
            this._appliedPredefinedFilters[name] = applyImmediately || false;
            this.predefinedFilters[name] = filterFunction;
            var self = this;
            if (!_.isUndefined(applyImmediately) && applyImmediately === true) {
                self.applyPredefinedFilter(name, true);
            }
        },
        applyPredefinedFilter: function(name, value) {
            var self = this;
            var useObject = _.isObject(name) && !_.isArray(name) && !_.isFunction(name) && !_.isString(name);
            if (!_.isArray(name) && !useObject) {
                name = [name];
            }
            _.each(name, function(filter, filterName) {
                if (useObject) {
                    self._appliedPredefinedFilters[filterName] = value || filter;
                } else {
                    self._appliedPredefinedFilters[filter] = value || !self._appliedPredefinedFilters[filter];
                }
            });
            this._executeAppliedPredefinedFilters();
        },
        removePredefinedFilter: function(name) {
            this.predefinedFilters = _.omit(this.predefinedFilters, name);
            this._appliedPredefinedFilters = _.omit(this._appliedPredefinedFilters, name);
            this._executeAppliedPredefinedFilters();
        }
    });
    return PredefinedFilterCollection;
}));