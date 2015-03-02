define([
    
    'backbone'
    
], function(Backbone) {
    
    var Loader = function() {
        this.assets = [];
    };
    
    _.extend(Loader.prototype, Backbone.Events, {
        
        count: 0,
        
        load: function(collection, deferred) {
			
            collection.each(function(model, index) {
				
                var img = new Image(),
                    url = model.get('path'),
                    that = this;
                
                img.onload = function() {
                    that.count++;
					
                    var src = $(this).attr('src'),
                        i = collection.where({'path': src})[0];
                        i.set({loaded: true});
                    
                    if(that.count === collection.length) {
                        deferred.resolve();
                    }
                }
                
                img.src = url;
                
            }, this);
        }
        
    });
    
    return Loader;
});