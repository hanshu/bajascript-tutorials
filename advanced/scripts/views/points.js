/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'collections/points',
  'views/point'
], function ($, _, Backbone, Points, PointView) {
  'use strict';

  var PointListView = Backbone.View.extend({
    
    initialize: function (options) {
      this.aggregator = options.aggregator;
      this.subscriber = options.subscriber;

      this.collection = new Points({ aggregator:this.aggregator, subscriber:this.subscriber });

      this.listenTo(this.aggregator, 'folder:selected', this.folderSelected);

      this.listenTo(this.collection, 'add', this.addOne);
      this.listenTo(this.collection, 'remove', this.render);
      this.listenTo(this.collection, 'reset', this.render);
    },

    addOne: function (model, collection, options) {
      console.log('add point-> ' + model.get('id'));

      var pointView = new PointView({ model: model, aggregator: this.aggregator });
      this.$el.append(pointView.render().el);
    },

    folderSelected: function (params) {
      console.log('selected folder-> ' + params);
      
      this.$el.empty();

      var self = this;
      this.collection.fetch({
        reset: true,
        ord: 'station:|h:' + params        
      });
    },

    render: function () {
      console.log('render points');
      
      this.$el.empty();      
      this.collection.each(this.addOne, this); 
      
      return this;
    }   
  });

  return PointListView;
});
