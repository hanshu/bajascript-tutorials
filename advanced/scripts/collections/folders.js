/*global define*/
define([
  'baja!',
  'underscore',
  'backbone',
  'models/model'
], function (baja, _, Backbone, Folder) {
  'use strict';

  var FolderCollection = Backbone.Collection.extend({
    // reference to the collection's model
    model: Folder,

    sync: function(method, model, options) {
      options || (options = {});

      if(method==='read') {
        console.log('retrieve folders from jace...');
      
        var result = [];        
        baja.Ord.make(options.ord)
        .get()
        .then(function(folder){
          folder.getSlots().is('baja:Folder').eachValue(function(sf){
            var model = new Folder()
            model.set({ id:sf.getHandle(), name:sf.getName() });
            result.push(model);
          });

          if(result) {
            options.success && options.success(result);
          }  
          else if(options.error) {
           options.error('could not fetch data from jace');
          }
        })
      }
      else
        return Backbone.sync.apply(this, arguments);
    }
  });

  return FolderCollection;
});
