/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'hbs!templates/point'
], function ($, _, Backbone, pointTemplate) {
  'use strict';

  var PointView = Backbone.View.extend({
    tagName: 'div',
    // DOM events specific to an item
    events: {
      'click button#invoke':'pointInvoked'
    },

    initialize: function (options) {
      this.vent = options.vent;

      this.listenTo(this.model, 'change', this.render);
      // this.listenTo(this.vent, 'point:changed#'+this.model.get('id'), this.pointChanged);
    },

    render: function () {
      this.$el.html(pointTemplate(this.model.toJSON()));

      return this;
    },

    pointInvoked: function (e) {
      console.log('invoke point item: ' + this.model.get('id'));

      // var val = parseFloat(this.$('input').val());
      this.model.invoke({ value:this.$('input').val() });
    },

    pointChanged: function (v) {
      console.log('point changed: ' + v);

      this.$('div#value').text(v);
      this.$('input').val('');
    }

  });

  return PointView;
});
