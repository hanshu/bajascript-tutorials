/*global define*/
define([
  'baja!',
  'jquery',
  'underscore',
  'backbone',
  'hbs!templates/home',
  'views/folders',
  'views/points'
], function (baja, $, _, Backbone, HomeTempl, FolderListView, PointListView) {
  'use strict';

  var HomeView = Backbone.View.extend({
    // holds the subviews   
    views:[],
    // subscribers used to listen to Component events in Niagara
    subscribers:{},

    initialize: function (options) {
      this.$el.html(HomeTempl());
      this.aggregator = options.aggregator;      
      this.collection = options.collection;

      this.$folderList = this.$('#folders');
      this.$pointList = this.$('#points');

      // displays the folders under station:|slot:/poc
      this.collection.fetch({ 
        reset: true,
        ord: 'station:|slot:/poc'
      });

      var bajaSubscriber = new baja.Subscriber();
      this.subscribers['points'] = bajaSubscriber;

      var flv = new FolderListView({ el:this.$folderList, collection:this.collection, aggregator:this.aggregator });  
      this.views.push(flv);

      var plv = new PointListView({ el:this.$pointList, aggregator:this.aggregator, subscriber:bajaSubscriber });
      this.views.push(plv);
    
      this.listenTo(this.aggregator, 'folder:selected', this.resetSubscriber);
    },

    render: function () {

      return this;
    },

    resetSubscriber: function (params) {
      console.log('refresh baja subscriber');
      // TODO
      this.subscribers['points'].unsubscribeAll();



    },
    
    unsubscribeAll: function(){
      _.each(_.values(this.subscribers), function(subscriber){
        // unsubscribe the components
        subscriber.unsubscribeAll();
        // detach all subscription handlers
        subscriber.detach();
      }, this);
    },

    remove: function() {
      // baja unsubscribe and detach
      this.unsubscribeAll();

      // remove the subviews 
      _.each(this.views, function(view){
        view.remove();
      }, this);
      // remove the View itself
      Backbone.View.prototype.remove.call(this,null);
    }
  });

  return HomeView;
});
