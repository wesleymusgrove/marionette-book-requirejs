/*global ContactManager:true, console:true*/
ContactManager.module("ContactsApp", function(ContactsApp, ContactManager, Backbone, Marionette, $, _) {

	ContactsApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			"contacts": "listContacts",
			"contacts/:id": "showContact",
			"contacts/:id/edit": "editContact"
		}
	});

	var API = {
		listContacts: function() {
			console.log("route to list contacts was triggered");
			ContactManager.ContactsApp.List.Controller.listContacts();
		},
		showContact: function(id) {
			ContactManager.ContactsApp.Show.Controller.showContact(id);
		},
		editContact: function(id) {
			ContactManager.ContactsApp.Edit.Controller.editContact(id);
		}
	};

	ContactsApp.on("contacts:list", function(){
		ContactManager.navigate("contacts");
		API.listContacts();
	});

	ContactsApp.on("contact:show", function(id) {
		ContactManager.navigate("contacts/" + id);
		API.showContact(id);
	});

	ContactsApp.on("contact:edit", function(id) {
		ContactManager.navigate("contacts/" + id + "/edit");
		API.editContact(id);
	});

	ContactManager.addInitializer(function() {
		new ContactsApp.Router({
			controller: API
		});
	});

});