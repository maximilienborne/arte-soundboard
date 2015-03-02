require.config({
    urlArgs: 'bust=' + new Date().getTime(), // prevent caching in development
    // baseUrl: 'js',
    paths: {
        underscore: 'vendors/underscore/underscore',
        jquery: 'vendors/jquery/dist/jquery',
        backbone: 'vendors/backbone/backbone',
        text: 'vendors/requirejs-text/text',
        templates: '../templates'
    },
    shim: {
        backbone: {
            deps: ['underscore', 'jquery']
        }
    }
});

require(['main']);