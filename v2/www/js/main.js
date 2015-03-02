require.config({
  urlArgs: 'bust=' + new Date().getTime(),
  paths: {
    underscore: 'libs/underscore'
    , jquery: 'libs/jquery'
    , backbone: 'libs/backbone'
    , text: 'libs/text'
    , templates: '../templates'
    , mobileDetect: 'libs/mobile-detect.min'
  },
  shim: {
  	backbone: {
  		deps: [ 'underscore', 'jquery' ]
  		, exports: 'Backbone'
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