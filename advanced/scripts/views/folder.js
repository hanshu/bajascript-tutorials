/*global define*/
define([
  'jquery',
  'underscore',
  'backbone',
  'hbs!templates/folder'
], function ($, _, Backbone, folderTemplate) {
  'use strict';

  var FolderView = Backbone.View.extend({
    tagName:  'li',

    // DOM events specific to an item
    events: {
      'click div': 'folderSelected'
    },

    initialize: function (options) {
      this.aggregator = options.aggregator;
      this.listenTo(this.model, 'change', this.render);
    },

    render: function () {
      this.$el.html(folderTemplate(this.model.toJSON()));

      return this;
    },

    folderSelected: function (e) {
      console.log('click folder item: ' + this.model.get('id'));

      this.aggregator.trigger('folder:selected', this.model.get('id'));
    }

  });

  return FolderView;
});
