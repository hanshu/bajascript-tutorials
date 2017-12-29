/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'views/folder'
], function ($, _, Backbone, FolderView) {
  'use strict';

  var FolderListView = Backbone.View.extend({

    initialize: function (options) {
      this.aggregator = options.aggregator;
      this.collection = options.collection;
      
      this.listenTo(this.collection, 'add', this.addOne);
      this.listenTo(this.collection, 'reset', this.render);
    },

    render: function () {      
      this.collection.each(this.addOne, this);
      
      return this;
    },

    addOne: function (folder, collection, options) {
      console.log('add folder-> ' + folder.get('id'));

      var folderView = new FolderView({ model: folder, aggregator: this.aggregator });
      this.$el.append(folderView.render().el);
    }  
   
  });

  return FolderListView;
});
