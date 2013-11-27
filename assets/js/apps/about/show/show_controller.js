/*global ContactManager:true, console:true*/
ContactManager.module("AboutApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _) {

  Show.Controller = {
    showAbout: function() {
      var aboutView = new Show.AboutView();
      ContactManager.mainRegion.show(aboutView);
    }
  };

});