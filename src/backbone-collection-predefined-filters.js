(function(factory) {
    'use strict';
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
        initialize: function(models) {
            this._initializeDefaults(models);
            this._initializeCollectionEventListeners();
        },
        _initializeDefaults: function(models) {
            var self = this;
            this.originalModels = models;
            this.predefinedFilters = {};
            this._predefinedFiltersApplied = false;
            this._appliedPredefinedFilters = {};
            if (!_.isUndefined(this.options)) {
                if (!_.isUndefined(this.options.predefinedFilters)) {
                    this.predefinedFilters = this.options.predefinedFilters;
                }
                if (!_.isUndefined(this.options.appliedPredefinedFilters)) {
                    this._appliedPredefinedFilters = this.options.appliedPredefinedFilters;
                }
            }
            var defaultAppliedPredefinedFilters = {};
            _.each(this.predefinedFilters, function(filter, eventName) {
                self._appliedPredefinedFilters[eventName] = false;
            });
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
            if (_.isUndefined(this.originalModels)) {
                this.originalModels = this.models;
            } else {
                this.models = this.originalModels;
            }
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
                            self.trigger('predefined-filters:updated');
                        }
                    });

                });
            } else {
                this._predefinedFiltersApplied = false;
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