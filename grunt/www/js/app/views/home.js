define([

    'backbone'
    , 'text!templates/home.html'

], function(Backbone, tmp) {

    var HomeView = Backbone.View.extend({

		tagName: 'section',
        id: 'home',
        template: _.template(tmp),

        initialize: function() {},

        render: function() {
            return this.$el.html(this.template);
        }
    });

    return HomeView;
});