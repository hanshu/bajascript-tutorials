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
    el:  '#points',

    initialize: function (options) {
      this.vent = options.vent;
      this.subscriber = options.subscriber;

      this.listenTo(this.vent, 'folder:selected', this.render);
    },

    render: function (params) {
      console.log('params: ' + params);
      
      this.$el.empty();
      
      var $self = this;
      var points = new Points({ vent:this.vent, subscriber:this.subscriber });
      points.fetch({
        reset: true,
        ord: 'station:|h:' + params,
        success: function(collection) {
          collection.each(function(model) {
            var pointView = new PointView({ model:model, vent:this.vent });
            this.$el.append(pointView.render().el);
          }, $self);          
        },
        error: function(collection, xhr, options) {
          console.log('fetch error');
        }
      });
      
      return this;
    }   
  });

  return PointListView;
});
