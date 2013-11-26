/*global ContactManager:true, console:true*/
ContactManager.module("Entities", function(Entities, ContactManager, Backbone, Marionette, $, _) {
  Entities.FilteredCollection = function(options) {
    var original = options.collection;
    var filtered = new original.constructor();
    filtered.add(original.models);
    filtered.filterFunction = options.filterFunction;

    var applyFilter = function(filterCriterion, filterStrategy) {
      var collection = original;
      var criterion;
      if(filterStrategy === "filter") {
        criterion = filterCriterion.trim();
      }
      else {
        criterion = filterCriterion;
      }

      var items = [];
      if(criterion) {
        if(filterStrategy === "filter") {
          if(!filtered.filterFunction) {
            throw("Attempted to use 'filter' function, but none was defined");
          }
          var filterFunction = filtered.filterFunction(criterion);
          items = collection.filter(filterFunction);
        }
        else {
          items = collection.where(criterion);
        }
      }
      else {
        items = collection.models;
      }

      //store current criterion
      filtered._currentCriterion = criterion;

      return items;
    };

    filtered.filter = function(filterCriterion) {
      filtered._currentFilter = "filter";
      var items = applyFilter(filterCriterion, "filter");

      //reset the filtered collection with the new items
      filtered.reset(items);
      return filtered;
    };

    filtered.where = function(filterCriterion) {
      filtered._currentFilter = "where";
      var items = applyFilter(filterCriterion, "where");

      //reset the filtered colleciton with the new items
      filtered.reset(items);
      return filtered;
    };

    return filtered;
  };
});