define([

    'backbone'
    , 'text!templates/equipe.html'

], function (Backbone, tmp) {

    var EquipeView = Backbone.View.extend({

        tagName: 'section',
        id: 'sectionEquipe',
        template: _.template(tmp),

        initialize: function () {
        },

        render: function () {
            return this.$el.html(this.template);
        }
    });

    return EquipeView;
});