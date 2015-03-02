define(
    [
        'jquery',
        'underscore',
        'backbone',
        'app-config',
        'text!templates/example.tmpl' // pour appeler un template
    ], function($, _, Backbone, appConfig, tmpl) {

        'use strict';

        // deal with envConfig

        var envConfig = _.extend({}, window.ENV_CONFIG);
        window.ENV_CONFIG = undefined;

        // declare polyfills, _.mixin here
        _.mixin({
            constrain: function(value, min, max) {
                if (value > max) { value = max; }
                if (value < min) { value = min; }
                return value;
            }
        });

        $(document).ready(function() {
            var exampleView = _.template(tmpl, { name: 'Backbone / RequireJS boilerplate' });
            $('body').append(exampleView);
            // app.initialize(appConfig, envConfig)   // create router etc...
            // Backbone.history.start();
        });

    }
);