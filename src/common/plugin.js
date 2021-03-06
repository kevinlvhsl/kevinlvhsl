/**
 * Vue-href - a simple way to write href for every dom in vue.js
 * @version 0.1 (2016/1/12)
 * @author kokdemo (https://github.com/kokdemo)
 * @requires Vue 0.11.x
 * @license MIT (http://opensource.org/licenses/MIT)
 *
 */
;(function () {
    /*global Vue, define */
    "use strict";

    let install = function (Vue, options) {
        let isArray = function (o) {
            return Object.prototype.toString.call(o) === '[object Array]';
        };
        let _ = Vue.util;
        Vue.directive('href', {
            bind: function () {
            },
            update: function (href) {
                let arg = this.arg;
                let mod = this.modifiers;
                if(mod.a){
                    this.el.style.textDecoration = "underline";
                    this.el.style.cursor = "pointer";
                    this.el.style.color = "rgb(0,0,238)"
                }

                this.el.addEventListener("click", function () {
                    let url = '';
                    if (isArray(href)) {
                        url = href[0];
                    } else {
                        url = href
                    }
                    if (href[1] && typeof href[1] === "function") {
                        href[1]();
                    }
                    let cbs;
                    if (!arg || arg === 'o' || arg === 'origin') {
                        cbs = function () {
                            location.href = url;
                        }
                    } else if (arg === 'blank' || arg === 'b' || arg === 'new') {
                        cbs = function () {
                            window.open(url);
                        }
                    }
                    cbs();
                    if (href[2] && typeof href[2] === "function") {
                        href[2]();
                    }
                });
            }
        })
    };
    if (typeof exports === "object") module.exports = install;
    else if (typeof define === "function" && define.amd) define([], function () {
        return install;
    });
    else if (window.Vue) Vue.use(install);
})();