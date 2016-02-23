define([
    'backbone'

], function (Backbone) {

    var Global = Backbone.Model.extend({

        defaults: {
        	title:'P’tit Quinquin Soundboard',
        	subtitle:'Ecoutez les meilleures répliques de la série',
            profile: 0
        }
    });

    return Global;
});