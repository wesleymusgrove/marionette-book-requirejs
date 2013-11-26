/*global ContactManager:true, console:true*/
ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _) {

  List.Controller = {
    listContacts: function() {
      var loadingView = new ContactManager.Common.Views.Loading();
      ContactManager.mainRegion.show(loadingView);

      var fetchingContacts = ContactManager.request("contact:entities");

      var contactsListLayout = new List.Layout();

      var contactsListPanelView = new List.Panel();

      $.when(fetchingContacts).done(function(contacts) {
        var contactsListView = new List.Contacts({
          collection: contacts
        });

        contactsListLayout.on("show", function() {
          contactsListLayout.panelRegion.show(contactsListPanelView);
          contactsListLayout.contactsRegion.show(contactsListView);
        });

        contactsListPanelView.on("contact:new", function() {
          var newContact = new ContactManager.Entities.Contact();

          var newView = new ContactManager.ContactsApp.New.Contact({
            model: newContact,
            asModal: true
          });

          newView.on("form:submit", function(data) {
            var highestId = contacts.max(function(c) { return c.id; });

            highestId = highestId.get("id");
            data.id = highestId + 1;

            if(newContact.save(data)) {
              contacts.add(newContact);
              ContactManager.dialogRegion.close();
              contactsListView.children.findByModel(newContact).flash("success");
            }
            else {
              newView.triggerMethod("form:data:invalid", newContact.validationError);
            }
          });

          ContactManager.dialogRegion.show(newView);
        });

        contactsListView.on("itemview:contact:show", function(childView, model) {
          console.log("Received itemview:contact:show event on model: ", model);
          ContactManager.ContactsApp.trigger("contact:show", model.get("id"));
        });

        contactsListView.on("itemview:contact:edit", function(childView, model) {
          console.log("Receieved itemview:contact:edit event on model: ", model);
          var modalView = new ContactManager.ContactsApp.Edit.Contact({
            model: model,
            asModal: true
          });

          modalView.on("form:submit", function(data) {
            if(model.save(data)) {
              childView.render();
              ContactManager.dialogRegion.close();
              childView.flash("success");
            }
            else {
              modalView.triggerMethod("form:data:invalid", model.validationError);
            }
          });

          ContactManager.dialogRegion.show(modalView);
        });

        contactsListView.on("itemview:contact:delete", function(childView, model) {
          model.destroy();
        });

        contactsListView.on("itemview:contact:highlight", function(childView, model) {
          console.log("highlighting toggled on model: " + model);
        });

        ContactManager.mainRegion.show(contactsListLayout);
      });
    }
  };

});