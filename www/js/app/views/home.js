define([
    
    'backbone'
    , 'text!templates/home.html'
    
], function(Backbone, tmp) {
    
    var HomeView = Backbone.View.extend({
        
		tagName: 'section',
        id: 'home',
        template: _.template(tmp),
        events: {
            'click .play': 'onPlay',
            'click .tw': 'onTwitter',
            'mouseover li .container': 'onRollOver',
            'mouseout li .container': 'onRollOut',
            'click .fb': 'onFacebook'
        },
        initialize: function(options) {
        	this.options = options;
            this.currentReferrer = document.referrer.split('?');
            this.currentReferrer = this.currentReferrer[0];
            console.log(this.currentReferrer);
        },
        
        render: function() {
        	this.template = _.template(tmp, { sounds : this.options.sounds.toJSON() });
            return this.$el.html(this.template, {});
        },
        onPlay: function (e) {
            e.preventDefault();
            $(e.currentTarget).removeClass('play');
        },
        onRollOver: function (e) {
            $(e.currentTarget).find('.hover').show();
        },
        onRollOut: function (e) {
            $('.hover').hide();
        },
		onFacebook: function (e) {
            e.preventDefault();
            var title = $(e.currentTarget).data('fbtitle'),
                description = $(e.currentTarget).data('fbdesc'),
                image = $(e.currentTarget).data('fbimage'),
                url = this.currentReferrer+'?sid='+$(e.currentTarget).parent().attr('id');

            console.log(description);
            FB.ui({
                method: 'share',
                href: url,
                name: title,
                title: title,
                picture: 'http://'+window.location.host + '/'+image,
                description: description
            }, _.bind(function (e) {

            }, this));

        },

        onTwitter: function (e) {
            e.preventDefault();
            var width = 600,
                height = 300,
                left = screen.width / 2 - width / 2,
                top = screen.height / 2 - height / 2,
                description = $(e.currentTarget).data('tw'),
                url = this.currentReferrer+'?sid='+$(e.currentTarget).parent().attr('id');
                dataTW = 'https://twitter.com/share?&text=' + description + '&url=' + encodeURIComponent(url) + '&hashtags=SoundBoard ';

            open(dataTW, 'popup_twitter', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left);

        },

		onShow: function(deferred) {
            var that = this;
			soundManager.setup({
				debugMode: false,
				debugFlash:false,
				wmode: 'transparent',
				url: 'swf/',
				onready: function() {
                    if(window.location.hash) {
                        var hash = String(window.location.hash).replace('#', '');
                        var paramsArr = hash.split('/');
                        var i = _.indexOf(paramsArr, 'p');
                        var popinId = paramsArr[i + 1];
                        if(!isNaN(parseFloat(popinId)) && isFinite(popinId)){
                             var introSound = soundManager.createSound({
                              id: 'introSound',
                              url: that.options.sounds.toJSON()[popinId].mp3
                            });
                            introSound.play();
                        }
                    } else {
                    }
				 
				},
				ontimeout: function() {
				}
			});

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