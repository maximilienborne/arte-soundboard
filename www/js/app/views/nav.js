define([

    'backbone'
    , 'text!templates/nav.html'

], function (Backbone, tmp) {

    var NavView = Backbone.View.extend({

        tagName: 'nav',
        id: 'nav',
        template: _.template(tmp),

        initialize: function () {
        },

        render: function () {
            return this.$el.html(this.template);
        }
    });

    return NavView;
});