define([
    'backbone'
    , 'models/sound'
    
], function(Backbone, Sound) {
    
    var Sounds = Backbone.Collection.extend({
        model: Sound,
        parse: function(response){
	       return response;
	    },
        initialize: function(options) {
            this.options = options;
            this.url = 'json/sounds.json';
        }
    });
     
    return Sounds;
});