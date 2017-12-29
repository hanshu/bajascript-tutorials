/*global define*/
define([
  'baja!',
  'jquery',
  'underscore',
  'backbone',
  'routers/router',
  'models/model',
  'collections/folders',
  'views/folders'
], function (baja, $, _, Backbone, Router, Folder, Folders, FolderListView) {
  'use strict';

  var Application = function() {

  }

  _.extend(Application.prototype, {
      eventAggregator: _.extend({}, Backbone.Events),
      bajaSubscriber: new baja.Subscriber(),

      init: function() {        

        new Router({ vent:this.eventAggregator, subscriber:this.bajaSubscriber });
        Backbone.history.start();
      }
  });

  return Application;
});
