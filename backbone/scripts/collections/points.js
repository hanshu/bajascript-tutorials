/*global define*/
define([
  'baja!',
  'underscore',
  'backbone',
  'models/point'
], function (baja, _, Backbone, Point) {
  'use strict';

  var PointCollection = Backbone.Collection.extend({
    // reference to the collection's model
    model: Point,

    initialize: function (options) {
      this.vent = options.vent;
      this.subscriber = options.subscriber;

      var $self = this;
      this.subscriber.attach({
        changed: function(prop, cx) {
          if(prop.getName()==='out') {
            var model = $self.get(this.getHandle());

            model.set({ 
              id:this.getHandle(), 
              name:this.getName(), 
              value:this.getOut().getValueDisplay(), 
              type:this.getType().getTypeName()
            });
            //$self.vent.trigger('point:changed#' + this.getHandle(), this.getOut().getValue());
          }
        },
        renamed: function(prop, oname, cx) {
          var targetHandle = this.get(prop).getHandle();
          var model = $self.get(targetHandle);
          model.set({ name:prop.getName() });
        },
        subscribed: function(cx) {
          console.log("subscribed invoke");
          // TODO


        }
      });
    },

    sync: function(method, model, options) {
      options || (options = {});

      if(method==='read') {
        console.log('retrieve points from jace...');
      
        var result = [];   
        var $self = this;

        baja.Ord.make(options.ord).get()
        .then(function(folder){
          var batch= new baja.comm.Batch();

          $self.subscriber.subscribe({
            comps: folder,
            batch: batch
          });

          folder.getSlots().is('control:ControlPoint').eachValue(function(point){
            console.log('type: ' + point.getType());
            console.log('ordInSession: ' + point.getOrdInSession());            

            $self.subscriber.subscribe({
              comps: point,
              batch: batch
            });

            var model = new Point({ 
              id:point.getHandle(), 
              name:point.getName(), 
              value:point.getOut().getValueDisplay(), 
              type:point.getType().getTypeName()
            });
            result.push(model);
          });

          if(result) {
            options.success && options.success(result);
          }  
          else if(options.error) {
           options.error('could not fetch data from jace');
          }

          batch.commit();
        })
      }
      else
        return Backbone.sync.apply(this, arguments);
    }

  });

  return PointCollection;
});
