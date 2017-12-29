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
      this.aggregator = options.aggregator;
      this.subscriber = options.subscriber;      

      var $self = this;
      this.subscriber.attach({
        changed: function(prop, cx) {
          if(prop.getName()==='out') {
            var control = this.get(prop).getParent();
            if(!control.getType().is('control:ControlPoint')) return;

            console.log('changed');
            
            var model = $self.get(this.getHandle());
            if(model) {
              model.set({ 
                id:this.getHandle(), 
                name:this.getName(), 
                value:this.getOut().getValueDisplay(), 
                type:this.getType().getTypeName()
              });
            }
          }
        },
        renamed: function(prop, oname, cx) {
          var targetHandle = this.get(prop).getHandle();
          var model = $self.get(targetHandle);

          if(model)
            model.set({ name:prop.getName() });
        },
        added: function(prop, cx) {
          console.log('property added-> ' + prop);

          var control = this.get(prop);
          if(control.getType().is('control:ControlPoint')) {
            $self.subscriber.subscribe(control);

            $self.add({ 
              id:control.getHandle(), 
              name:prop.getName(), 
              value:control.getOut().getValueDisplay(),
              type:prop.getType().getTypeName()
            });
          }
        },
        removed: function(prop, val, cx) {
          console.log('property remove-> ' + prop);
          if(val.getType().is('control:ControlPoint')) {
            var model = $self.get(val.getHandle());
            if(model)
              $self.remove(model);
          }
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
            // console.log('type: ' + point.getType());
            // console.log('ordInSession: ' + point.getOrdInSession());
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
