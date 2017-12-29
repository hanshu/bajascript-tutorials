/*global define*/
define([
  'baja!',
  'jquery',
  'underscore',
  'backbone',
  'models/model',
  'collections/folders',
  'views/points',
  'hbs!templates/folders'
], function (baja, $, _, Backbone, Folder, Folders, PointListView, Template) {
  'use strict';

  // Our overall **AppView** is the top-level piece of UI.
  var AppView = Backbone.View.extend({

    // binded to the existing skeleton of the App already present in the HTML.
    el: 'div#content',
    
    events: {
      'click ul#folders>li':  'listPoints'
    },

    initialize: function () {
      this.$folderList = this.$('#folders');
      this.$pointList = this.$('#points');

      // this.listenTo(Todos, 'add', this.addOne);
      // this.listenTo(Todos, 'reset', this.addAll);
      // this.listenTo(Todos, 'change:completed', this.filterOne);
      // this.listenTo(Todos, 'filter', this.filterAll);
      // this.listenTo(Todos, 'all', _.debounce(this.render, 0));

      this.folders = new Folders();
      var that = this;
      // displays the folders under station:|slot:/poc
      baja.Ord.make('station:|h:28cc')
      .get()
      .then(function(folder){
        folder.getSlots().is('baja:Folder').eachValue(function(sf){
          var model = new Folder()
          model.set({ id:sf.getHandle(), name:sf.getName() });
          that.folders.add(model);
        });

        that.render();
      });


    },

    render: function () {
      var content = '';
      this.folders.each(function(folder) {
        content += Template(folder.toJSON());
      });

      console.log(content);
      this.$folderList.append(content);
    },

    listPoints: function (e) {
      console.log('click item: ' + $(e.target).attr('id'));

      this.trigger('folder:clicked');
    }
  });

  return AppView;
});
