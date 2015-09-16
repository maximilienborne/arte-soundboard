define([

    'backbone'
    , 'text!templates/popin.html'

], function (Backbone, tmp) {

    var PopinView = Backbone.View.extend({

        tagName: 'section',
        id: 'popin',
        template: _.template(tmp),

        events: {
            'click .close': 'onClose',
            'click .overlay': 'onClose'
        },

        initialize: function () {
        },

        render: function () {
            return this.$el.html(this.template);
        },

        onClose: function (e) {
            e.preventDefault();

            var hash = String(window.location.hash).replace('#', '');
            var paramsArr = hash.split('/');
            var i = _.indexOf(paramsArr, 'p');
            var popinId = paramsArr[i + 1];

            hash = hash.replace('/p/' + popinId, '');
            hash = hash.replace('p/' + popinId, '');

            window.location.hash = hash;
        }
    });

    return PopinView;
});