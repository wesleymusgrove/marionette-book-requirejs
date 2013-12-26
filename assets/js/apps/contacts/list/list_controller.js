define(["app", "apps/contacts/list/list_view"], function(ContactManager, View) {

  ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _) {

    List.Controller = {
      listContacts: function(criterion) {
        require(["entities/contact"], function() {

          var fetchingContacts = ContactManager.request("contact:entities");

          var contactsListLayout = new View.Layout();
          var contactsListPanelView = new View.Panel();

          $.when(fetchingContacts).done(function(contacts) {

            var contactsListView = new View.Contacts({
              collection: contacts
            });

            contactsListLayout.on("show", function() {
              contactsListLayout.panelRegion.show(contactsListPanelView);
              contactsListLayout.contactsRegion.show(contactsListView);
            });

            contactsListView.on("itemview:contact:edit", function(childView, model) {
              require(["apps/contacts/edit/edit_view"], function(EditView) {
                var view = new EditView.Contact({
                  model: model
                });

                view.on("form:submit", function(data) {
                  if(model.save(data)) {
                    childView.render();
                    view.trigger("dialog:close");
                    childView.flash("success");
                  }
                  else {
                    view.triggerMethod("form:data:invalid", model.validationError);
                  }
                });

                ContactManager.dialogRegion.show(view);
              });
            });

            contactsListView.on("itemview:contact:delete", function(childView, model) {
              model.destroy();
            });

            ContactManager.mainRegion.show(contactsListLayout);
          });

        });
      }
    };

  });

  return ContactManager.ContactsApp.List.Controller;

});