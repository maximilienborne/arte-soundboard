require.config({
  urlArgs: 'bust=' + new Date().getTime(),
  paths: {
    underscore: 'libs/underscore/underscore'
    , jquery: 'libs/jquery/jquery'
    , backbone: 'libs/backbone/backbone'
    , text: 'libs/requirejs-text/text'
    , templates: '../../templates'
    , mobileDetect: 'libs/mobile-detect/mobile-detect'
    , inlineplayer: 'libs/inlineplayer/inlineplayer'
    , soundmanager2: 'libs/soundmanager2/soundmanager2'
  },
  shim: {
  	backbone: {
  		deps: [ 'underscore', 'jquery', 'inlineplayer']
  		, exports: 'Backbone'
  	},
    inlineplayer: {
      deps: [ 'soundmanager2' ]
      , exports: 'Inlineplayer'
    },
    mobileDetect: {
        exports: 'MobileDetect'
    }
  }
});

require([
    'app'

], function(App) {
    App.initialize();
});