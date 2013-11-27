/*global ContactManager:true, console:true*/
ContactManager.module("AboutApp", function(AboutApp, ContactManager, Backbone, Marionette, $, _) {

  AboutApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "about": "showAbout"
    }
  });

  var API = {
    showAbout: function() {
      console.log("show about sub app");
      ContactManager.AboutApp.Show.Controller.showAbout();
    }
  };

  AboutApp.on("about:show", function() {
    ContactManager.navigate("about");
    API.showAbout();
  });

  ContactManager.addInitializer(function() {
    new AboutApp.Router({
      controller: API
    });
  });

});