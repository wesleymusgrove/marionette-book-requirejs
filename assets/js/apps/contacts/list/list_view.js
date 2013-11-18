ContactManager.module("ContactsApp.List", function(List, ContactsManager, Backbone, Marionette, $, _) {
	List.Contact = Marionette.ItemView.extend({
		tagName: "tr",
		template: "#contact-list-item"
	});

	List.Contacts = Marionette.CollectionView.extend({
		tagName: "table",
    className: "table table-hover",
		itemView: List.Contact
	});
});