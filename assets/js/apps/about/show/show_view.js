/*global ContactManager:true, console:true*/
ContactManager.module("AboutApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _) {

  Show.AboutView = Marionette.ItemView.extend({
    template: "#about-message"
  });

});