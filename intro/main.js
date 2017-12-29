require.config({
    ord: { 'useLocalWbRc': false },
    baja: {
      'webdev': false
    },
    lex: {
      'webev': false
    },
    
    paths: {
      "nmodule": '/module',
      'Promise': '/module/js/rc/bluebird/bluebird.min',
      'bajaScript': '/module/bajaScript/rc',
      'bajaux': '/module/bajaux/rc',
      'jquery': '/module/js/rc/jquery/jquery-2.1.1.min',
      'dialogs': '/module/js/rc/dialogs/dialogs.built.min',
      'ord': '/module/js/com/tridium/js/require/ord',
      'lex': '/module/js/rc/lex/lexplugin',
      'css': '/module/js/com/tridium/js/ext/require/css',
      'baja': '/module/bajaScript/rc/plugin/baja',
      'Handlebars': '/module/js/rc/handlebars/handlebars.min-v2.0.0',
      'underscore': '/module/js/rc/underscore/underscore.min',
      'hbs': '/module/js/rc/require-handlebars-plugin/hbs.built.min',
      'moment': '/module/js/rc/moment/moment.min',
      'd3': '/module/js/rc/d3/d3.min',
      'jqueryContextMenu': '/module/js/rc/jquery/contextMenu/jquery.contextMenu'
    },
    
    shim: {
        "d3": {
            exports: "d3"
        },
        'jqueryContextMenu': {
          deps:['jquery'],exports:'jQuery'
        }
    }
});

require(['baja!','dialogs','jquery','hbs!templates/space','hbs!templates/folders'], 
  function (baja, dialogs, $, ptemplate, ftemplate) {
    "use strict";

    $(document).ready(function(){

      $("#title").html('Hello, Welcome to BajaScript Version: ' + baja.version);

      var sub = new baja.Subscriber();
      // displays the folders under station:|h:28cc
      baja.Ord.make('station:|slot:/poc')
          .get()
          .then(function(folder){

            folder.getSlots().is('baja:Folder').eachValue(function(sf){
              var content = ftemplate({
                id: sf.getHandle(),
                name: sf.getName()          
              });

              console.log(content);
              $('#folders').append(content);
            });

            // attaches event handler
            $("ul#folders>li").on("click", function() {
              
              sub.unsubscribeAll();
              sub.detach();

              $('#container').empty();              

              var pid = $(this).attr('id');
              console.log("handle:" + pid);

              subscribe(pid, function() {
                var $hid = $(this).prev();
                var hid= $hid.attr('id');
                console.log("->handle:" + hid);

                baja.Ord.make("station:|h:" + hid).get()
                  .then(function(point){
                    
                    var val = parseFloat($hid.val());
                    console.log("value:" + val);
                    point.set1(val);
                    //point.invoke({slot:"set", value:val});
                  });
              });
            }); 
        });
    
      $("button.ux-btn").click(function(){
        console.log('testing on button element');
        dialogs.showOk("Hello, World!");
      });

      function subscribe(handle, callback)
      {
        console.log('begin to subscribe...')
           
        // The 'update' method is called whenever the text needs to be updated.
        var update = function (prop, cx) {
          console.log("prop: "+ prop);

          $("#"+this.getName()+"text").text(this.getName() + ":" + this.getOut().getValue());        
        };
        
        sub.attach({
          changed: update,
          subscribed: function(context) {
            var obj = this.getName();
            if($('#container').has("#"+obj+"text").length===0)
            {
              var html = ptemplate({
                id: this.getHandle(),
                name: obj,
                type: this.getType().getTypeName(),
                value: this.getOut().getValue()
              });
              console.log(html);

              $('#container').append(html);

              $("button#invoke").on("click", callback);
            }
            else
            {
              $("#"+obj+"text").text(obj + ":" + this.getOut().getValue());
            } 
          }
        });

        baja.Ord.make('station:|h:' + handle)
          .get()
          .then(function(folder){
            var batch= new baja.comm.Batch();

            folder.getSlots().is('control:ControlPoint').eachValue(function(point){

              console.log('type: ' + point.getType());
              console.log('ordInSession: ' + point.getOrdInSession());

              sub.subscribe({
                comps: point,
                batch: batch
              });
            });

            batch.commit();
        });
      }
  });
});