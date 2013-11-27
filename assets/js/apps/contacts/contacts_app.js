/*global ContactManager:true, console:true*/
ContactManager.module("ContactsApp", function(ContactsApp, ContactManager, Backbone, Marionette, $, _) {

	ContactsApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			"contacts(/filter/criterion::criterion)": "listContacts",
			"contacts/:id": "showContact",
			"contacts/:id/edit": "editContact"
		}
	});

	var API = {
		listContacts: function(criterion) {
			console.log("route to list contacts was triggered");
			ContactManager.ContactsApp.List.Controller.listContacts(criterion);
			ContactManager.commands.execute("set:active:header", "contacts");
		},
		showContact: function(id) {
			ContactManager.ContactsApp.Show.Controller.showContact(id);
			ContactManager.commands.execute("set:active:header", "contacts");
		},
		editContact: function(id) {
			ContactManager.ContactsApp.Edit.Controller.editContact(id);
			ContactManager.commands.execute("set:active:header", "contacts");
		}
	};

	ContactManager.on("contacts:list", function(){
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

	ContactsApp.on("contacts:filter", function(criterion) {
		if(criterion) {
			ContactManager.navigate("contacts/filter/criterion:" + criterion);
		}
		else {
			ContactManager.navigate("contacts");
		}
	});

	ContactManager.addInitializer(function() {
		new ContactsApp.Router({
			controller: API
		});
	});

});