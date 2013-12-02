define(["app"], function(ContactManager) {

  ContactManager.module("ContactsApp.Edit", function(Edit, ContactManager, Backbone, Marionette, $, _) {

    Edit.Controller = {
      editContact: function(id) {
        var loadingView = new ContactManager.Common.Views.Loading({
          title: "Artificial Loading delay",
          message: "Data loading is delayed to demonstrate using a loading view."
        });

        ContactManager.mainRegion.show(loadingView);

        require(["entities/contact"], function() {

          var fetchingContact = ContactManager.reqres.request("contact:entity", id);

          $.when(fetchingContact).done(function(contact) {
            var editView;
            if(contact !== undefined) {
              editView = new Edit.Contact({
                model: contact,
                generateTitle: true
              });

              editView.on("form:submit", function(data) {
                if(contact.save(data)) {
                  ContactManager.ContactsApp.trigger("contact:show", contact.get("id"));
                }
                else {
                  editView.triggerMethod("form:data:invalid", contact.validationError);
                }
              });
            }
            else {
              editView = new ContactManager.ContactsApp.Show.MissingContact();
            }

            ContactManager.mainRegion.show(editView);
          });

        });

      }
    };

  });

  return ContactManager.ContactsApp.Edit.Controller;

});