(function (win, undefined) {

    "use strict";

    // ======================================
    // WINDOW ASSIGNMENT
    // ======================================

    win.now = typeof win.Date.now === 'function' ? win.Date.now : function () {
        return (new win.Date()).getTime();
    };

    var Env = Env || {};

    Env.config = {
        environments: {
            "dev": "marcelww.renault1508kadjar.local",
            "dev-extern": "10.224",
            //"dev-extern": "marcelww.renault1508kadjar.local",
            "preprod": "gitlab.marceldev",
            "prod": ""
        },
        debug: {
            "dev": true,
            "dev-extern": true,
            "preprod": true,
            "prod": false
        },
        cache: {
            "dev": false,
            "dev-extern": false,
            "preprod": false,
            "prod": true
        },
        minify: {
            "dev": false,
            "dev-extern": true,
            "preprod": true,
            "prod": true
        }
    };

    Env.set = function () {
        var index = '';
        for (index in Env.config.environments) {
            if (win.document.location.hostname.indexOf(Env.config.environments[index]) !== -1) {
                this.config.env = index;
                break;
            }
        }
        if (Env.customEnv()) {
            this.config.env = Env.customEnv();
        }
    };

    Env.customEnv = function () {

        var query = win.location.search.substring(1),
            vars = query.split("&"),
            i = 0,
            pair;

        for (i = 0; i < vars.length; i += 1) {

            pair = vars[i].split("=");

            if (pair[0] === "ENV") {
                return pair[1];
            }
        }
        return false;
    };

    Env.debug = function (isDebug) {
        var method,
            noop = function () {
            },
            methods = [
                'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
                'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
                'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
                'timeStamp', 'trace', 'warn'
            ],
            length = methods.length,
            console = win.console || {},
            script = win.document.createElement("script");

        win.console = console;

        isDebug = isDebug === undefined ? false : isDebug;

        win.log = function () {
        };


        while (length) {

            length -= 1;

            method = methods[length];

            // Only stub undefined methods.
            if (isDebug) {
                if (!console[method]) {
                    console[method] = noop;
                }
                script.setAttribute("src", "js/vendors/debug/debug-min.js");

                // win.document.body.appendChild(script);
                // if debug === false - remove all console methods
            } else {
                console[method] = noop;
            }
        }
    };

    Env.getCacheArgs = function () {
        if (this.config.cache[this.config.env]) {
            this.config.urlArgs = "?bust=" + win.now();
            return this.config.urlArgs;
        }
        return '';
    };

    Env.load = function () {
        Env.set();
        win.ENV_CONFIG = {
            cacheArgs: this.getCacheArgs(),
            minify: this.config.minify[this.config.env],
            debug: this.debug(this.config.debug[this.config.env]),
            urlArgs: this.config.urlArgs || false
        };
    };

    Env.load();

}(window));
