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
            var that = this;
            soundManager.setup({
                debugMode: false,
                debugFlash:false,
                wmode: 'transparent',
                url: 'swf/',
                onready: function() {
                    if(window.parent.location.search) {
                        soundId = window.parent.location.search.split("=");
                        soundId = soundId[1];
                        if(!isNaN(parseFloat(soundId)) && isFinite(soundId)){
                             var introSound = soundManager.createSound({
                              id: 'introSound',
                              url: that.options.sounds[soundId].mp3
                            });
                            introSound.play();
                        }
                    }
                    else {
                    }
                 
                },
                ontimeout: function() {
                }
            });



            console.log(this.currentReferrer);
        },
        
        render: function() {
        	this.template = _.template(tmp, { sounds : this.options.sounds, global:this.options.global });
            return this.$el.html(this.template, {});
        },
        onPlay: function (e) {
            e.preventDefault();
            $(e.currentTarget).removeClass('play');
            return false;
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
                image = $(e.currentTarget).data('fbimage');
            if($(e.currentTarget).parents("#global-shares").length > 0) {
                var url = this.currentReferrer;
            } else {
                var url = this.currentReferrer+'?sid='+$(e.currentTarget).parent().attr('id');
            }
            FB.ui({
                method: 'share',
                href: url,
                name: title,
                title: title,
                picture: image,
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
                hashtag = $(e.currentTarget).data('hashtag');
            if($(e.currentTarget).parents("#global-shares").length > 0) {
                var url = this.currentReferrer;
            } else {
                var url = this.currentReferrer+'?sid='+$(e.currentTarget).parent().attr('id');
            }
            var dataTW = 'https://twitter.com/share?&text=' + description + '&url=' + encodeURIComponent(url) + '&hashtags='+hashtag;

            open(dataTW, 'popup_twitter', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left);

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