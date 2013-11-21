/*global ContactManager:true, console:true*/
ContactManager.module("ContactsApp", function(ContactsApp, ContactManager, Backbone, Marionette, $, _) {

	ContactsApp.Router = Marionette.AppRouter.extend({
		appRoutes: {
			"contacts": "listContacts"
		}
	});

	var API = {
		listContacts: function() {
			console.log("route to list contacts was triggered");
			ContactManager.ContactsApp.List.Controller.listContacts();
		}
	};

	ContactManager.on("contacts:list", function(){
		ContactManager.navigate("contacts");
		API.listContacts();
	});

	ContactManager.addInitializer(function() {
		new ContactsApp.Router({
			controller: API
		});
	});

});