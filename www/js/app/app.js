/*globals define*/
define([
    'backbone'
    , 'router'

], function (Backbone, Router) {

    "use strict";

    return {
        initialize: function () {

            // rAF Polyfill
            (function (win) {
                var lastTime = 0,
                    vendors = ['webkit', 'moz'],
                    x = 0,
                    length = vendors.length;

                for (x = 0; x < length && !win.requestAnimationFrame; x += 1) {
                    win.requestAnimationFrame = win[vendors[x] + 'RequestAnimationFrame'];
                    win.cancelAnimationFrame = win[vendors[x] + 'CancelAnimationFrame'] || win[vendors[x] + 'CancelRequestAnimationFrame'];
                }

                if (!win.requestAnimationFrame) {

                    win.requestAnimationFrame = function (callback) {

                        return (function (currTime) {

                            var timeToCall = win.Math.max(0, 16 - (currTime - lastTime)),
                                timeoutCall = function () {
                                    callback(currTime + timeToCall);
                                };

                            lastTime = currTime + timeToCall;

                            return win.setTimeout(timeoutCall, timeToCall);

                        }(win.now()));
                    };
                }

                if (!win.cancelAnimationFrame) {
                    win.cancelAnimationFrame = function (id) {
                        win.clearTimeout(id);
                    };
                }
            }(window));

            Router.initialize();
        }
    };
});