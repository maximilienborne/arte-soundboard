define([
    
    'backbone'
    , 'text!templates/contact.html'
    
], function(Backbone, tmp) {
    
    var ContactView = Backbone.View.extend({
        
		tagName: 'section',
        id: 'sectionContact',
        template: _.template(tmp),
        
        initialize: function() {},
        
        render: function() {
            return this.$el.html(this.template);
        },
		
		onShow: function(deferred) {
			this.$el.addClass('active');
			setTimeout(_.bind(function() {
				deferred.resolve();
			}, this), 500);
		},
		
		onHide: function(deferred) {
			this.$el.removeClass('active');
			setTimeout(_.bind(function() {
				this.remove();
				deferred.resolve();
			}, this), 500);
		}
    });
    
    return ContactView;
});