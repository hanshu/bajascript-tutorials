/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'views/folder'
], function ($, _, Backbone, FolderView) {
  'use strict';

  var FolderListView = Backbone.View.extend({
    el: '#folders',

    initialize: function (options) {
      this.vent = options.vent;
      this.collection = options.collection;
      
      // this.listenTo(this.collection, 'add', this.addOne);
      // this.listenTo(this.collection, 'change', this.render);
    },

    render: function () {
      this.$el.empty();
      
      this.collection.each(function(folder) {
        var folderView = new FolderView({ model: folder, vent: this.vent });
        this.$el.append(folderView.render().el);
      }, this);
      
      return this;
    },

    addOne: function (folder, error, options) {
      console.log('addOne...');

      var folderView = new FolderView({ model: folder, vent: this.vent });
      this.$el.html(folderView.render().el);
    }  
   
  });

  return FolderListView;
});
