/*global ContactManager:true, console:true*/
ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _) {

  List.Controller = {
    listContacts: function(criterion) {
      var loadingView = new ContactManager.Common.Views.Loading();
      ContactManager.mainRegion.show(loadingView);

      var fetchingContacts = ContactManager.request("contact:entities");

      var contactsListLayout = new List.Layout();
      var contactsListPanelView = new List.Panel();

      $.when(fetchingContacts).done(function(contacts) {
        var filteredContacts = ContactManager.Entities.FilteredCollection({
          collection: contacts,
          filterFunction: function(filterCriterion) {
            var criterion = filterCriterion.toLowerCase();
            return function(contact) {
              if(contact.get("firstName").toLowerCase().indexOf(criterion) !== -1 ||
                 contact.get("lastName").toLowerCase().indexOf(criterion) !== -1 ||
                 contact.get("phoneNumber").toLowerCase().indexOf(criterion) !== -1) {
                return contact;
              }
            };
          }
        });

        if(criterion) {
          filteredContacts.filter(criterion);
          contactsListPanelView.once("show", function() {
            contactsListPanelView.triggerMethod("set:filter:criterion", criterion);
          });
        }

        var contactsListView = new List.Contacts({
          collection: filteredContacts
        });

        contactsListLayout.on("show", function() {
          contactsListLayout.panelRegion.show(contactsListPanelView);
          contactsListLayout.contactsRegion.show(contactsListView);
        });

        contactsListPanelView.on("contacts:filter", function(filterCriterion) {
          console.log("filter list with criterion ", filterCriterion);
          filteredContacts.filter(filterCriterion);
          ContactManager.ContactsApp.trigger("contacts:filter", filterCriterion);
        });

        contactsListPanelView.on("contact:new", function() {
          var newContact = new ContactManager.Entities.Contact();

          var newView = new ContactManager.ContactsApp.New.Contact({
            model: newContact
          });

          newView.on("form:submit", function(data) {
            var highestId = contacts.max(function(c) { return c.id; }).get("id");
            data.id = highestId + 1;

            if(newContact.save(data)) {
              contacts.add(newContact);
              newView.trigger("dialog:close");
              var newContactView = contactsListView.children.findByModel(newContact);
              //contactsListView.children.findByModel(newContact).flash("success");
              if(newContactView) {
                newContactView.flash("success");
              }
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
            model: model
          });

          modalView.on("form:submit", function(data) {
            if(model.save(data)) {
              childView.render();
              modalView.trigger("dialog:close");
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