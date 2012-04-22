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

  Contacts.ContactCollection = Backbone.Collection.extend({
    url: "/contacts",
    model: Contacts.Contact
  });

  // Public API
  // ----------
  
  // Show the contact list and the categories.
  Contacts.showContactList = function(){
    BBCloneMail.ContactsApp.ContactList.show(Contacts.contacts);
    BBCloneMail.ContactsApp.Categories.showCategoryList();
    BBCloneMail.vent.trigger("contacts:show");
  };

  // Initializer
  // -----------
  
  BBCloneMail.addInitializer(function(){
    Contacts.contacts = new Contacts.ContactCollection();
    Contacts.contacts.fetch();
  });
  
  return Contacts;
})(BBCloneMail, Backbone);

