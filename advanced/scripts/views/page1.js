/*global define*/
define([
  'jquery',
  'underscore',
  'backbone'
], function ($, _, Backbone) {
  'use strict';

  var PageView = Backbone.View.extend({

    initialize: function(){


      
      this.render();
    },

    render: function () {
      this.$el.html("Page One");
      
      return this;
    }   
  });

  return PageView;
});
