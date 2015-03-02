define([
    
    'backbone'
    , 'services/loader'
    , 'collections/assets'
    , 'services/window-profiler'
    , 'services/server-handler'
    , 'services/tracker'
	, 'views/loader'
	, 'views/header'
	, 'views/footer'
	, 'views/home'
	, 'views/contact'
	, 'views/popin'
    
], function(
        Backbone,
        Loader,
        Assets,
        windowProfiler,
        serverHandler,
        tracker,
		LoaderView,
		HeaderView,
		FooterView,
		HomeView,
		ContactView,
		PopinView
    ) {
    
    var Router = Backbone.Router.extend({
        routes: {
            '(p/:popin)': 'onHomepage',
			'contact(/p/:popin)': 'onContact'
        },
        
        initialize: function() {
            
            // On instancie le loader (si nécessaire...)
            this.loader = new Loader();
            
            // Arrays contenant les vues (à afficher/supprimer)
            this.toDisplay = [];
            this.toRemove = [];
            
            // Initialisation du windowProfiler (taille de l'écran, type de client, etc..)
			windowProfiler.initialize();
            // et du serverHandler (gestion du dialogue client/server)
			serverHandler.initialize();
            // Initialisation du tracker (pour la remontée des stats)
            tracker.initialize();
            
            var d1 = new $.Deferred();
            
            // On récupère la liste des assets à charger
            $.getJSON('json/assets.json', _.bind(function(data) {
               
               // On en fait une collection
               this.assetsCollection = new Assets(data.assets);
               
               // On instancie la vue du loader en lui passant la collection d'assets
               this.loaderView = new LoaderView({collection: this.assetsCollection});
               $('#main').append(this.loaderView.render());
               
               // On demande au loader de charger notre collection d'assets
               this.loader.load(this.assetsCollection, d1);
               
               // La collection d'assets sera mise à jour par le loader
               // passant la clé "loaded" de chaque asset à "true" au fur et à mesure
               // la vue du loader écoute ces changements et se met à jour en conséquence
               
            }, this));
            
            $.when(d1).done(_.bind(function() {
				
                // On supprime le loader ainsi que sa vue
                this.loaderView.$el.fadeOut(_.bind(function() {
                    
                    this.loaderView.remove();
                    delete this.loader;
                    
                    Backbone.history.start();
                    
                }, this));
            }, this));
        },
        
        onHomepage: function() {
            
			// Exemple
			
			this.headerView = this.headerView || new HeaderView();
			this.homeView = this.homeView || new HomeView();
			this.footerView = this.footerView || new FooterView();
			
			var viewsArr = [this.headerView, this.homeView, this.footerView];
			
			
			this.getPopin(viewsArr);
            this.transition(viewsArr, 'home');
			
        },
		
		onContact: function() {
			
			// Exemple
			
			this.headerView = this.headerView || new HeaderView();
			this.contactView = this.contactView || new ContactView();
			this.footerView = this.footerView || new FooterView();
			
			var viewsArr = [this.headerView, this.contactView, this.footerView];
			
			
			this.getPopin(viewsArr);
            this.transition(viewsArr, 'contact');
			
		},
		
		getPopin: function(viewsArr) {
			if(Backbone.history.fragment.indexOf('p/') === -1) return;
			
			var urlParams = String(Backbone.history.fragment).split('/'),
				i = _.indexOf(urlParams, 'p'),
				popinId = urlParams[i + 1];
			
			this.popinView = '';
			
			switch(popinId) {
				
                case 'popin':
                this.popinView = this.popinView || new PopinView();
                break;
				
            }
			
			if(this.popinView !== '') {
				viewsArr.push(this.popinView);
			}
		},
        
        transition: function(viewsArray, mainClass) {
            
			// On copie les vues en cours d'affichage dans l'array contenant les vues à supprimer
            this.toRemove = this.toDisplay.slice(0);
            // On vide l'array des vues en cours d'affichage et le remplit avec celles instanciées ci-dessus
            this.toDisplay = [];
            this.toDisplay = viewsArray;
			
			//
            //      BEHAVIOR :
            //      ----------
            //
            //      'this.toDisplay' array contains a list of views that we have to display.
            //      'this.toRemove' array contains a list of views that we have to remove.
            //
            // 1 -  Check if there is shared elements between toDisplay and toRemove arrays.
            //      If yes, we remove them from both arrays.
            //      (We don't have to display it or to remove it, we just let it like it is)
            //
            // 2 -  Loop over toRemove views, hide and remove them
            // 3 -  Loop over toDisplay views, render and show them, that's all !
            //
            
            // -> 1
            var common = _.intersection(this.toDisplay, this.toRemove),
                toDsply = _.difference(this.toDisplay, common),
                toRmv = _.difference(this.toRemove, common);
            
            // -> 3 -> 2
            var fadeIn = function(v) {
                v.$el.fadeIn(function() {
                    if(v.onShow) v.onShow();
                });
            }
            
            // -> 3 -> 1
            var display = _.bind(function() {
                
                window.scrollTo(0, 0);
                $('#main').removeClass().addClass(mainClass);
                
                for(var i=0; i<toDsply.length; i++) {
                    var v = toDsply[i],
                        $v = v.render();
                        $v.css('display', 'none');
                        v.delegateEvents();
                    
                    if(v.onRender) v.onRender();
                    $('#main').append($v);
                    fadeIn(v);
                }
                
            }, this);
            
            // -> 2 -> 2
            var fadeOut = function(v, i) {
                v.$el.fadeOut(function() {
                    v.remove();
                    
                    if(i===toRmv.length-1) display();
                });
            }
            
            // -> 2 -> 1
            if(!toRmv.length) display();
            
            for(var t=0; t<toRmv.length; t++) {
                var v = toRmv[t];
                fadeOut(v, t);
            }
        }
    });
    
    var initialize = function() {
        
        var router = new Router();
    }
    
    return {
        initialize: initialize
    }
});