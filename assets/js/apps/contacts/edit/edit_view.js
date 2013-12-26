define(["app", "apps/contacts/common/views"], function(ContactManager) {
  ContactManager.module("ContactsApp.Edit.View", function(View, ContactManager, Backbone, Marionette, $, _) {
    View.Contact = ContactManager.ContactsApp.Common.Views.Form.extend({
      initialize: function() {
        this.title = "Edit " + this.model.get("firstName") + " ";
        this.title += this.model.get("lastName");
      },

      onRender: function() {
        if(this.options.generateTitle) {
          var $title = $("<h1>", { text: this.title });
          this.$el.prepend($title);
        }

        this.$(".js-submit").text("Update contact");
      }
    });
  });

  return ContactManager.ContactsApp.Edit.View;
});