define([
    
    'backbone'
    , 'text!templates/contact.html'
    
], function(Backbone, tmp) {
    
    var ContactView = Backbone.View.extend({
        
		tagName: 'section',
        id: 'contact',
        template: _.template(tmp),
        
        initialize: function() {},
        
        render: function() {
            return this.$el.html(this.template);
        }
    });
    
    return ContactView;
});