define([

    'backbone'
    , 'text!templates/footer.html'

], function (Backbone, tmp) {

    var FooterView = Backbone.View.extend({

        tagName: 'footer',
        id: 'footer',
        template: _.template(tmp),

        initialize: function () {
        },

        render: function () {
            return this.$el.html(this.template);
        }
    });

    return FooterView;
});