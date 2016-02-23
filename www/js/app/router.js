define([
    
    'backbone'
    , 'services/loader'
    , 'services/window-profiler'
    , 'services/server-handler'
	, 'services/views-handler'
    , 'services/tracker'
	, 'views/header'
	, 'views/footer'
	, 'views/home'
	, 'views/contact'
	, 'views/popin'
	, 'views/nav'
	, 'views/equipe'
	, 'views/404'
	, 'collections/sounds'

], function(
        Backbone,
        Loader,
        windowProfiler,
        serverHandler,
		viewsHandler,
        tracker,
		HeaderView,
		FooterView,
		HomeView,
		ContactView,
		PopinView,
		NavView,
		EquipeView,
		P404View,
		Sounds
    ) {
    
    var Router = Backbone.Router.extend({
        routes: {
            '(p/:popin)': 'onHomepage',
			'*path': 'onHomepage'
        },
        
        initialize: function() {            
            // On instancie le loader (si nécessaire...)
            this.loader = new Loader();
            
			// Liste des popins (key = url, value = vue Backbone)
			var popins = {
				'popin': PopinView
			}
			
			// Initialisation de l'objet de gestion des transitions
			viewsHandler.initialize({$el: $('#main'), popins: popins});
            // Initialisation du windowProfiler (taille de l'écran, type de client, etc..)
			windowProfiler.initialize();
            // et du serverHandler (gestion du dialogue client/server)
			serverHandler.initialize();
            // Initialisation du tracker (pour la remontée des stats)
            tracker.initialize();
            

			this.sounds = new Sounds();
			this.sounds.fetch();
			// Si des assets ont besoin d'être chargés
			// avant de lancer le routeur
			this.loader.loadAssetsBeforeStart('json/assets.json', $('#main'));
			// Sinon
			//Backbone.history.start();
        },
        
        onHomepage: function() {
            
			// Exemple
			
			this.headerView = this.headerView || new HeaderView();
			this.homeView = this.homeView || new HomeView({ sounds: this.sounds });
			this.footerView = this.footerView || new FooterView();
			
			var viewsArr = [this.headerView, this.homeView, this.footerView];
			
			
			viewsHandler.getPopin(viewsArr);
            viewsHandler.getTransition(viewsArr, 'home', false, true);
			
        },

		onContact: function() {
			
			// Exemple
			
			this.headerView = this.headerView || new HeaderView();
			this.navView = this.navView || new NavView();
			this.contactView = this.contactView || new ContactView();
			this.footerView = this.footerView || new FooterView();
			
			var viewsArr = [this.headerView, this.navView, this.contactView, this.footerView];
			
			viewsHandler.getPopin(viewsArr);
            viewsHandler.getTransition(viewsArr, 'contact');
			
		},
		
		onEquipe: function() {
			
			// Exemple
			
			this.headerView = this.headerView || new HeaderView();
			this.navView = this.navView || new NavView();
			this.equipeView = this.equipeView || new EquipeView();
			this.footerView = this.footerView || new FooterView();
			
			var viewsArr = [this.headerView, this.navView, this.equipeView, this.footerView];
			
			viewsHandler.getPopin(viewsArr);
            viewsHandler.getTransition(viewsArr, 'equipe');
			
		},
		
		on404: function() {
			this.p404View = this.p404View || new P404View();
			this.contactView = this.contactView || new ContactView();
			
			var viewsArr = [this.p404View, this.contactView];
			viewsHandler.getTransition(viewsArr, 'p404');
		}
    });
    
    var initialize = function() {
        var router = new Router();
    }
    
    return {
        initialize: initialize
    }
});