define([

    'backbone'
    , 'collections/assets'
    , 'text!templates/loader.html'

], function (Backbone, Assets, tmp) {

    var LoaderView = Backbone.View.extend({

        id: 'loader',
        template: _.template(tmp),

        initialize: function () {

            this.collection.on('change', this.onAssetLoaded, this);
        },

        render: function () {
            return this.$el.html(this.template);
        },

        onAssetLoaded: function (asset) {

            var per = Math.round((this.collection.where({loaded: true}).length / this.collection.length) * 100);

            this.$('.bar').css('width', per + '%');
            this.$('.counter strong').text(per);
        }
    });

    return LoaderView;
});