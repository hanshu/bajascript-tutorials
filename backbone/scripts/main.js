/*global require*/
'use strict';

require.config({
  paths: {
    backbone: '../bower_components/backbone/backbone',
    bootstrap: '../bower_components/bootstrap/dist/js/bootstrap',

    nmodule: '/module',
    Promise: '/module/js/rc/bluebird/bluebird.min',
    bajaScript: '/module/bajaScript/rc',
    jquery: '/module/js/rc/jquery/jquery-2.1.1.min',
    dialogs: '/module/js/rc/dialogs/dialogs.built.min',
    ord: '/module/js/com/tridium/js/require/ord',
    lex: '/module/js/rc/lex/lexplugin',
    css: '/module/js/com/tridium/js/ext/require/css',
    baja: '/module/bajaScript/rc/plugin/baja',
    obix: '/module/obixjs/rc/obix.built.min',
    Handlebars: '/module/js/rc/handlebars/handlebars.min-v2.0.0',
    underscore: '/module/js/rc/underscore/underscore.min',    
    hbs: '/module/js/rc/require-handlebars-plugin/hbs.built.min',
    moment: '/module/js/rc/moment/moment.min',
    jqueryContextMenu: '/module/js/rc/jquery/contextMenu/jquery.contextMenu'     
  },

  shim: {
    bootstrap: { 
      deps: ['jquery'] 
    },
    jqueryContextMenu: {
      deps:['jquery'], exports:'jQuery'
    }
  }
});

require(['backbone','jquery','app','bootstrap'], 
  function (Backbone,$,Application) {

  // initialize the application
  var app = new Application();
  app.init();
  
});
