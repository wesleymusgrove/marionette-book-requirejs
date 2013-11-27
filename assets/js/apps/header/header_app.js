/*global ContactManager:true, console:true*/
ContactManager.module("HeaderApp", function(HeaderApp, ContactManager, Backbone, Marionette, $, _) {

  var API = {
    listHeader: function() {
      HeaderApp.List.Controller.listHeader();
    }
  };

  ContactManager.commands.setHandler("set:active:header", function(name) {
    ContactManager.HeaderApp.List.Controller.setActiveHeader(name);
  });

  HeaderApp.on("start", function() {
    API.listHeader();
  });

});