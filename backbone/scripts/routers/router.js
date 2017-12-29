/*global define*/
define([
  'jquery',
  'backbone',
  'collections/folders',
  'utils/common',
  'views/folders',
  'views/points',
  'views/page1'
], function ($, Backbone, Folders, Common, FolderListView, PointListView, PageOne) {
  'use strict';

  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'home',
      'home': 'home',
      'page1': 'page1',
      '*page': 'setPage'
    },

    initialize: function(options) {
      this.vent = options.vent;
      this.subscriber = options.subscriber;

      this.plv = new PointListView({ vent:this.vent, subscriber:this.subscriber });
    },

    home: function() {
      console.log('home page');
      this.subscriber.unsubscribeAll();
      this.subscriber.detach();

      var folders = new Folders();    
      var that = this;
      folders.fetch({ 
        reset: true,
        // just for POC purpose
        // displays the folders under station:|h:28cc
        ord: 'station:|slot:/poc',
        success: function(collection) {
          var folderListView = new FolderListView({ collection:collection, vent:that.vent });   
          folderListView.render();
        },
        error: function(model, xhr, options) {
          console.log('fetch error');
        }
      });      
    },

    page1: function() {
      console.log('page one');



      var page1 = new PageOne();
    },

    setPage: function (param) {
      console.log(param + ' page');

      Common.Page = param || '';

      // Folders.trigger('filter');
    }
  });

  return AppRouter;
});
