/*global define*/
define([
  'jquery',
  'backbone',
  'collections/folders',
  'utils/common',
  'views/home',
  'views/page1',
  'views/page2'
], function ($, Backbone, Folders, Common, HomeView, PageOneView, PageTwoView) {
  'use strict';

  var AppRouter = Backbone.Router.extend({
    routes: {
      '': 'home',
      'home': 'home',
      'page1': 'page1',
      'page2': 'page2',
      '*page': 'setPage'
    },

    initialize: function(options) {
      this.appView = options.view;
      this.aggregator = options.aggregator;

      this.$menuItems = $('ul.nav li');
     },

    home: function() {
      console.log('home page');
      this.selectMenuItem('home');

      var folders = new Folders();
      var homeView = new HomeView({ collection:folders,aggregator:this.aggregator });

      this.appView.setViews(homeView);
    },

    page1: function() {
      console.log('page one');
      this.selectMenuItem('page1');

      var pageView = new PageOneView();
      this.appView.setViews(pageView);
    },

    page2: function () {
      console.log('page two');
      this.selectMenuItem('page2');

      var pageView = new PageTwoView();
      this.appView.setViews(pageView);
    },

    setPage: function (param) {
      console.log(param + ' page');

      Common.Page = param || '';



    },

    selectMenuItem: function (menuItem) {
      this.$menuItems.removeClass('active').filter(function() {
        return $("a", this).attr('href')===('#'+menuItem);
      }).addClass('active');
    }

  });

  return AppRouter;
});
