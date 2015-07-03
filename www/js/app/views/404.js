define([
    
    'backbone'
    , 'text!templates/404.html'
    
], function(Backbone, tmp) {
    
    var p404View = Backbone.View.extend({
        
		tagName: 'section',
        id: 'p404',
        template: _.template(tmp),
        
        initialize: function() {},
        
        render: function() {
            return this.$el.html(this.template);
        }
    });
    
    return p404View;
});