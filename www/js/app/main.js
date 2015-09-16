require.config({
    //urlArgs: 'bust=' + window.Date.now(),
    paths: {
        backbone: 'libs/backbone/backbone'
        , bxSlider: 'libs/bxslider-4/dist/jquery.bxslider'
        , jquery: 'libs/jquery/dist/jquery'
        , maskedinput: 'libs/jquery.maskedinput/dist/jquery.maskedinput'
        , formValidator: 'libs/jQuery-Form-Validator/form-validator/jquery.form-validator'
        , media: 'libs/jquery-media/source/jquery.media'
        , jqueryUi: 'libs/jquery-ui/jquery-ui'
        //, jqueryUi: 'libs/jquery-ui/ui/core'
        //, jqueryUiDatepicker: 'libs/jquery-ui/ui/datepicker'
        //, jqueryUiDatepickerFr: 'libs/jquery-ui/ui/i18n/datepicker-fr'
        , magnificPopup: 'libs/magnific-popup/dist/jquery.magnific-popup'
        , mobileDetect: 'libs/mobile-detect/mobile-detect'
        , text: 'libs/requirejs-text/text'
        , slidebars: 'libs/Slidebars/dist/slidebars'
        , templates: '../../templates'
        , underscore: 'libs/underscore/underscore'
        //, videoExtend: 'libs/video-extend/jquery.video-extend'
    },
    shim: {
        backbone: {
            deps: [
                'underscore'
                , 'jquery'
            ]
            , exports: 'Backbone'
        },
        bxSlider: ['jquery'],
        maskedinput: ['jquery'],
        formValidator: ['jquery'],
        media: ['jquery'],
        jqueryUi: ['jquery'],
        //jqueryUiDatepicker: ['jquery'],
        //jqueryUiDatepickerFr: ['jquery', 'jqueryUi'],
        magnificPopup: ['jquery'],
        mobileDetect: {
            exports: 'MobileDetect'
        },
        slidebars: ['jquery']

    }
});

require([
    'app'
], function (App) {
    "use strict";
    App.initialize();
});