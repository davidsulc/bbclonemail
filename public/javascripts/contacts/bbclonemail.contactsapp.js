// Backbone.BBCloneMail
// A reference application for Backbone.Marionette
//
// Copyright (C)2012 Derick Bailey, Muted Solutions, LLC
// Distributed Under MIT License
//
// Documentation and Full License Available at:
// http://github.com/derickbailey/backbone.bbclonemail
// http://github.com/derickbailey/backbone.marionette

// Contacts
// --------

// Manage the list of contacts and the categories for
// the contacts. Limited functionality at this point,
// but slowly adding more.
BBCloneMail.ContactsApp = (function(BBCloneMail, Backbone){
  var Contacts = {};

  // Contact Model And Collection
  // -----------------------------

  Contacts.Contact = Backbone.Model.extend({});

  Contacts.ContactCollection = BBCloneMail.Collection.extend({
    url: "/contacts",
    model: Contacts.Contact,

    // Get contacts for the specified category. Returns a
    // new `ContactCollection` with the filtered contents.
    // If no category is specified, returns `this`.
    forCategory: function(category){
      if (!category){ return this; }

      var filteredContacts = this.filter(function(contact){
        var categories = contact.get("categories") || [];
        var found = categories.indexOf(category) >= 0;
        return found;
      });

      var x = new Contacts.ContactCollection(filteredContacts);
      return x;
    }
  });

  // Contact App Helper Methods
  // -----------------------

  // Filter the contacts by the category, if one was specified
  var showFilteredContactsList = function(category){
    Contacts.contacts.onReset(function(list){
      var filteredContacts = list.forCategory(category);
      BBCloneMail.ContactsApp.ContactList.show(filteredContacts);
    });
  }

  // Public API
  // ----------
  
  // Show the contact list and the categories.
  Contacts.showContactList = function(){
    BBCloneMail.ContactsApp.ContactList.show(Contacts.contacts);
    BBCloneMail.ContactsApp.Categories.showCategoryList();
    BBCloneMail.vent.trigger("contacts:show");
  };

  // Show a list of contacts for the given category.
  Contacts.showCategory = function(category){
    showFilteredContactsList(category);
    BBCloneMail.ContactsApp.Categories.showCategoryList();
  };

  // Contacts App Event Handlers
  // -----------------------

  // When a category is selected, filter the contacts list
  // based on it.
  BBCloneMail.vent.bind("contacts:category:show", function(category){
    showFilteredContactsList(category);
  });

  // When the contacts app is shown or the `Everyone` category is clicked,
  // show all the contacts.
  BBCloneMail.vent.bind("contacts:show", function(){
    showFilteredContactsList();
  });

  // Initializer
  // -----------
  
  BBCloneMail.addInitializer(function(){
    Contacts.contacts = new Contacts.ContactCollection();
    Contacts.contacts.fetch();
  });
  
  return Contacts;
})(BBCloneMail, Backbone);

