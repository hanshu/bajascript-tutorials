/*global define*/
define([
  'underscore',
  'backbone'
], function (_, Backbone) {
  'use strict';

  var BaseModel = Backbone.Model.extend({
    // default attributes
    defaults: {
      name: ''
    }

  });

  return BaseModel;
});
