// Backbone.BBCloneMail
// A reference application for Backbone.Marionette
//
// Copyright (C)2012 Derick Bailey, Muted Solutions, LLC
// Distributed Under MIT License
//
// Documentation and Full License Available at:
// http://github.com/derickbailey/backbone.bbclonemail
// http://github.com/derickbailey/backbone.marionette

// Contact Categories
// --------

// Manage the list of categories, and the interactions with them,
// for the contacts app.
BBCloneMail.ContactsApp.Categories = (function(BBCloneMail, Backbone){
  var Categories = {};

  // The category model and collection
  var Category = Backbone.Model.extend({});
  var CategoryCollection = Backbone.Collection.extend({
    url: "/contact_categories",
    model: Category
  });

  // Categories Views
  // ----------------

  // The view to show the list of categories. The view
  // template includes a hard coded 'Everyone' category
  // and then it renders the individual categories, too.
  Categories.ContactCategoriesView = BBCloneMail.ItemView.extend({
    template: "#contact-categories-view-template",

    events: {
      "click a": "categoryClicked"
    },

    categoryClicked: function(e){
      e.preventDefault();
    }
  });

  // Public API
  // ----------
  
  // Show the list of contact categories in the 
  // left hand navigation.
  Categories.show = function(){
    var categoryView = new Categories.ContactCategoriesView({
      collection: Categories.categoryCollection
    });
    BBCloneMail.layout.navigation.show(categoryView);
  }

  // Contact Categories Initializer
  // ---------------------------

  // Get the list of categories on startup and hold
  // then in memory, so we can render them on to the
  // screen when we need to.
  BBCloneMail.addInitializer(function(){
    Categories.categoryCollection = new CategoryCollection();
    Categories.categoryCollection.fetch();
  });

  return Categories;
})(BBCloneMail, Backbone);
