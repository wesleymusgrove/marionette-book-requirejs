/*global ContactManager:true, console:true, Marionette:true, Backbone:true*/
var ContactManager = new Marionette.Application();

ContactManager.addRegions({
	mainRegion: "#main-region",
  dialogRegion: Marionette.Region.Dialog.extend({
    el: "#dialog-region"
  })
});

ContactManager.navigate = function(route, options) {
  //options || (options = {});
  if(!options) {options = {};}
  Backbone.history.navigate(route, options);
};

ContactManager.getCurrentRoute = function() {
  return Backbone.history.fragment;
};

ContactManager.on("initialize:after", function() {
  if(Backbone.history) {
    Backbone.history.start();

    if (Backbone.history.fragment === "") {
      ContactManager.ContactsApp.trigger("contacts:list");
    }
  }
});