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
    
    return HomeView;
});