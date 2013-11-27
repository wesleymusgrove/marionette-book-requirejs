/*global ContactManager:true, console:true*/
ContactManager.module("HeaderApp.List", function(List, ContactManager, Backbone, Marionette, $, _) {

  List.Controller = {
    listHeader: function() {
      var links = ContactManager.reqres.request("header:entities");
      var headers = new List.Headers({ collection: links });

      headers.on("brand:clicked", function() {
        ContactManager.trigger("contacts:list");
      });

      headers.on("itemview:navigate", function(childView, model) {
        var trigger = model.get("navigationTrigger");
        ContactManager.trigger(trigger);

        //var url = model.get("url");
        //if(url === "contacts") {
        //  ContactManager.trigger("contacts:list");
        //}
        //else if (url === "about") {
        //  ContactManager.trigger("about:show");
        //}
        //else {
        //  throw "no such sub-application: " + url;
        //}
      });

      ContactManager.headerRegion.show(headers);
    },

    setActiveHeader: function(headerURL) {
      var links = ContactManager.reqres.request("header:entities");
      var headerToSelect = links.find(function(header) {
        return header.get("url") === headerURL;
      });
      headerToSelect.select();
      links.trigger("reset");
    }
  };

});