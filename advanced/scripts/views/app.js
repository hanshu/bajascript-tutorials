/*global define*/
define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  'use strict';

  // Our overall **AppView** is the top-level piece of UI.
  var AppView = Backbone.View.extend({

    // binded to the existing skeleton of the App already present in the HTML.
    el: 'div.main-container',

    setViews : function(view) {
      var closingView = this.view;

      this.view = view;
      this.view.render();
      this.view.$el.hide();
      this.$el.append(this.view.el);

      this.openView(this.view);
      this.closeView(closingView);
    },

    openView: function(view){
      view.$el.slideToggle(500);
    },

    closeView: function(view){
      if (view){
        view.unbind();
        view.$el.slideToggle(500, function(){
          view.remove();
        });
      }
    }

  });

  return AppView;
});
