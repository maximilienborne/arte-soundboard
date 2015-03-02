define([
    
    'backbone'
    , 'text!templates/header.html'
    
], function(Backbone, tmp) {
    
    var FooterView = Backbone.View.extend({
        
		tagName: 'header',
        id: 'header',
        template: _.template(tmp),
        
        initialize: function() {},
        
        render: function() {
            return this.$el.html(this.template);
        }
    });
    
    return FooterView;
});