/*global define*/
define([
  'baja!',
  'jquery',
  'underscore',
  'backbone',
  'routers/router',
  'views/app'
], function (baja, $, _, Backbone, Router, AppView) {
  'use strict';

  var Application = function() {
    console.log('applicaiton instance');
    // TODO



  }

  _.extend(Application.prototype, {
      eventAggregator: _.extend({}, Backbone.Events),

      initialize: function(options) {        
        console.log('applicaiton initialize');
        var appView = new AppView();
        new Router({ view:appView, aggregator:this.eventAggregator });
        Backbone.history.start();
      }
  });

  return Application;
});
