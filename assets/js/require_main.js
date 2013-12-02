requirejs.config({
  baseUrl: "assets/js",
  paths: {
    jquery: "vendor/jquery",
    "jquery-ui": "vendor/jquery-ui",
    underscore: "vendor/underscore",
    json2: "vendor/json2",
    backbone: "vendor/backbone",
    marionette: "vendor/backbone.marionette",
    localstorage: "vendor/backbone.localstorage"
  },

  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      deps: ["jquery", "underscore", "json2"],
      exports: "Backbone"
    },
    marionette: {
      deps: ["backbone"],
      exports: "Marionette"
    },
    "jquery-ui": {
      deps: ["jquery"]
    },
    localstorage: {
      deps: ["backbone"]
    }
  }

});

require(["app"], function(ContactManager) {
  console.log("jQuery version: ", $.fn.jquery);
  console.log("underscore identity: ", _.identity(5));
  console.log("Backbone.history: ", Backbone.history);
  console.log("Marionette", Marionette);
  ContactManager.start();
});