define(["marionette"], function(Marionette) {
  var ContactManager = new Marionette.Application();

  ContactManager.on("initialize:after", function() {
    console.log("Contact Manager has started");
  });

  return ContactManager;
});