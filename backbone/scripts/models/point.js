/*global define*/
define([
  'baja!',
  'underscore',
  'backbone',
  'models/model'
], function (baja, _, Backbone, BaseModel) {
  'use strict';

  var Point = BaseModel.extend({

    defaults: function() {
      return _.extend({}, BaseModel.prototype.defaults, {
        value: 1.0, 
        type: ''
      });
    },

    invoke: function(options) {
      console.log("->invoke handle:" + this.get('id'));

      baja.Ord.make("station:|h:" + this.get('id')).get()
        .then(function(point){
          switch(point.getType().getTypeName()) {
            case 'NumericWritable':
              var val = parseFloat(options.value);
              point.set1(val);
              //point.invoke({slot:"set", value:val});
              break;
            case 'StringWritable':
              point.set1(options.value);
              break;
            case 'BooleanWritable':
              var bool = options.value==="true";
              point.set1(bool);

              break;
            default:
              console.log('not implemented');
          }
          
        });      
    }

  });

  return Point;
});
