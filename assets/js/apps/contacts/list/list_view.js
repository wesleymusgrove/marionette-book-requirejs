ContactManager.module("ContactsApp.List", function(List, ContactsManager, Backbone, Marionette, $, _) {
	List.Contact = Marionette.ItemView.extend({
		tagName: "tr",
		template: "#contact-list-item",

		events: {
			"click": "highlightName",
			"click button.js-delete": "deleteClicked"
		},

		remove: function() {
			var self = this;
			this.$el.fadeOut(function(){
				Marionette.ItemView.prototype.remove.call(self);
			});
		},

		highlightName: function(e) {
			e.preventDefault();
			this.$el.toggleClass('warning');
			this.trigger("contact:highlight", this.model);
		},

		deleteClicked: function(e) {
			e.stopPropagation();
			this.trigger("contact:delete", this.model);
		}

	});

	List.Contacts = Marionette.CompositeView.extend({
		tagName: "table",
    className: "table table-hover",
    template: "#contact-list",
		itemView: List.Contact,
		itemViewContainer: "tbody"
	});
});