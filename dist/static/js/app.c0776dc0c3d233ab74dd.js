webpackJsonp([2,0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _vue = __webpack_require__(15);

	var _vue2 = _interopRequireDefault(_vue);

	var _app = __webpack_require__(22);

	var _app2 = _interopRequireDefault(_app);

	var _App = __webpack_require__(302);

	var _App2 = _interopRequireDefault(_App);

	var _router = __webpack_require__(95);

	var _router2 = _interopRequireDefault(_router);

	var _store = __webpack_require__(97);

	var _store2 = _interopRequireDefault(_store);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.App = _app2.default;

	new _vue2.default({
	    router: _router2.default,
	    store: _store2.default,
	    render: function render(h) {
	        return h(_App2.default);
	    }
	}).$mount('#app');

	var visibilityChange = void 0;
	if (typeof document.hidden !== 'undefined') {
	    visibilityChange = 'visibilitychange';
	} else if (typeof document.mozHidden !== 'undefined') {
	    visibilityChange = 'mozvisibilitychange';
	} else if (typeof document.msHidden !== 'undefined') {
	    visibilityChange = 'msvisibilitychange';
	} else if (typeof document.webkitHidden !== 'undefined') {
	    visibilityChange = 'webkitvisibilitychange';
	}

	document.addEventListener(visibilityChange, function () {
	    if (document.hidden) {
	        document.title = '哇塞！这里有新奇的玩意儿';
	    } else {
	        document.title = 'kevin大叔的个人网站';
	    }
	}, false);

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _store = __webpack_require__(94);

	var _store2 = _interopRequireDefault(_store);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    startTime: Date.now(),
	    isLocalIp: /192|10|127/.test(location.host),
	    isLocal: /localhost|192|10|127/.test(location.host),
	    isProd: /mobile.wx.yiheshanghai.com/.test(location.hostname),
	    isIos: /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
	    userInfo: {},

	    ls: new _store2.default(localStorage),
	    ss: new _store2.default(sessionStorage),
	    log: function log(msg) {
	        if (this.isProd) return;
	        var time = Date.now() - this.startTime;
	        time = time < 1000 ? '[' + time + 'ms]' : '[' + (time / 1000).toFixed(2) + 's]';
	        console.log(time, msg);
	    },
	    hideLoading: function hideLoading() {
	        document.querySelector('#loading').style.display = 'none';
	    },
	    showLoading: function showLoading() {
	        document.querySelector('#loading').style.display = 'block';
	    },
	    pop: function pop() {
	        var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '网络不给力，请稍后再试试吧';
	        var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;
	        var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	        var el = document.querySelector('#App-pop');

	        if (el) {
	            el.innerHTML = msg;
	            el.style.display = 'block';
	            el.classList.remove('hide');
	        } else {
	            el = document.createElement('div');
	            el.id = 'App-pop';
	            el.innerHTML = msg;
	            document.body.appendChild(el);
	        }

	        setTimeout(function () {
	            el.classList.add('hide');
	            el.style.display = 'none';
	            cb && cb();
	        }, delay);
	    },
	    pop2: function pop2() {
	        var msg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '网络不给力，请稍后再试试吧';
	        var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 3000;
	        var cb = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

	        var el = document.querySelector('#App-pop');

	        document.body.style.pointerEvents = 'none';
	        if (el) {
	            el.innerHTML = msg;
	            el.classList.remove('hide');
	        } else {
	            el = document.createElement('div');
	            el.id = 'App-pop';
	            el.innerHTML = msg;
	            document.body.appendChild(el);
	        }

	        el.style.display = 'block';

	        setTimeout(function () {
	            document.body.style.pointerEvents = 'auto';
	            el.style.display = 'none';
	            cb && cb();
	        }, delay);
	    },
	    hidePop: function hidePop() {
	        var el = document.querySelector('#App-pop');
	        if (!el) return;

	        document.body.style.pointerEvents = 'auto';
	        el.style.display = 'none';
	    },
	    go: function go(hash) {
	        var refresh = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	        var href = location.href.split('#')[0].split('?');
	        var searchParamString = '';

	        if (href[1]) {
	            (function () {
	                var paramArr = href[1].split('&');
	                var paramObj = {};

	                paramArr.forEach(function (v, k) {
	                    var arr = v.split('=');
	                    paramObj[arr[0]] = arr[1];
	                });

	                if (refresh) paramObj['_t'] = new Date().getTime();

	                searchParamString += '?';

	                for (var key in paramObj) {
	                    searchParamString += key + '=' + paramObj[key] + '&';
	                }

	                searchParamString = searchParamString.slice(0, searchParamString.length - 1);
	            })();
	        } else if (refresh) {
	            searchParamString = '?_t=' + new Date().getTime();
	        }

	        location.href = '' + href[0] + searchParamString + '#' + hash;
	    },
	    share: function share(_ref) {
	        var title = _ref.title;
	        var desc = _ref.desc;
	        var link = _ref.link;
	        var imgUrl = _ref.imgUrl;
	        var success = _ref.success;
	        var cancel = _ref.cancel;

	        var successCb = function successCb() {
	            success && success();
	        };
	        var cancelCb = function cancelCb() {
	            cancel && cancel();
	        };

	        wx.ready(function () {
	            wx.onMenuShareTimeline({ title: title, link: link, imgUrl: imgUrl, successCb: successCb, cancelCb: cancelCb });
	            wx.onMenuShareAppMessage({ title: title, desc: desc, link: link, imgUrl: imgUrl, successCb: successCb, cancelCb: cancelCb });
	        });
	    },
	    random: function random(start, end) {
	        return Math.floor(start + Math.random() * (end - start + 1));
	    },
	    queryHref: function queryHref(key) {
	        if (!location.href.split('?')[1]) return '';

	        var params = location.href.split('?')[1].split('#')[0].split('&');
	        var res = params.find(function (v) {
	            return v.split('=')[0] === key;
	        });

	        return res ? res.split('=')[1] : '';
	    }
	};

/***/ },
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _getPrototypeOf = __webpack_require__(201);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(68);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(69);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(206);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(205);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _db = __webpack_require__(55);

	var _db2 = _interopRequireDefault(_db);

	var _app = __webpack_require__(22);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Blog = function (_AV$Object) {
	    (0, _inherits3.default)(Blog, _AV$Object);

	    function Blog() {
	        (0, _classCallCheck3.default)(this, Blog);

	        var _this = (0, _possibleConstructorReturn3.default)(this, (Blog.__proto__ || (0, _getPrototypeOf2.default)(Blog)).call(this));

	        _this.name = 'Blog';
	        return _this;
	    }

	    (0, _createClass3.default)(Blog, [{
	        key: 'addOneBlog',
	        value: function addOneBlog(obj, cb) {
	            var blog = new Blog();
	            blog.set('title', obj.title);
	            blog.set('category', obj.category);
	            blog.set('desc', obj.desc);
	            blog.set('poster', obj.poster);
	            blog.set('views', obj.views || 1);
	            blog.set('type', obj.type);
	            blog.set('content', obj.content);
	            blog.set('date', Math.floor(Date.now() / 1000));

	            blog.save().then(function (blog2) {
	                console.log('New object created with objectId: ' + blog2.id);
	                cb && cb(blog2);
	            }, function (error) {
	                console.log('Failed to create new object, with error message: ' + error.message);
	            });
	        }
	    }, {
	        key: 'updateBlog',
	        value: function updateBlog(id, content, cb) {
	            var blog = _db2.default.Object.createWithoutData('Blog', id);

	            blog.set('content', content);
	            blog.save().then(function (b) {
	                cb && cb(b);
	            });
	        }
	    }, {
	        key: 'fetchList',
	        value: function fetchList(params, cb, err) {
	            var query = Blog.getQuery();

	            if (params.sort) {
	                query.addDescending('views');
	            }
	            if (params.query) {
	                query.equalTo('category', params.query);
	            }
	            query.addDescending('createdAt');
	            query.find().then(function (data) {
	                var blogs = [];
	                if (data && data.length > 0) {
	                    data.forEach(function (b) {
	                        var obj = b.attributes || {};
	                        obj.id = b.id;
	                        blogs.push(obj);
	                    });
	                    console.log('blogs::', blogs);
	                }
	                cb && cb(blogs);
	            }, function (error) {
	                console.error(error);
	            }).catch(function () {
	                cb && cb([]);
	                err && err();
	            });
	        }
	    }, {
	        key: 'fetchItem',
	        value: function fetchItem(id, cb) {
	            var _this2 = this;

	            var query = Blog.getQuery();
	            query.get(id).then(function (data) {
	                _this2.updateView(id, function (v) {
	                    data.attributes.views = v;
	                    data.attributes.id = id;
	                    cb && cb(data.attributes);
	                });
	            }, function (error) {
	                console.log('获取Blog对象detail时报错了');
	            });
	        }
	    }, {
	        key: 'updateView',
	        value: function updateView(id, cb) {
	            var blog = _db2.default.Object.createWithoutData('Blog', id);
	            blog.save().then(function (bo) {
	                bo.increment('views', 1);
	                bo.fetchWhenSave(true);
	                return bo.save();
	            }).then(function (bo2) {
	                console.log('最新次数', bo2.get('views'));
	                cb && cb(bo2.get('views'));
	            }, function (error) {});
	        }
	    }], [{
	        key: 'getQuery',
	        value: function getQuery() {
	            return new _db2.default.Query('Blog');
	        }
	    }, {
	        key: 'uploadFile',
	        value: function uploadFile(input, cb, err) {
	            var localFile = input.files[0];
	            var name = 'poster.jpg';

	            var file = new _db2.default.File(name, localFile);
	            file.save().then(function (filed) {
	                console.log('上传后结果：', filed.url());
	                cb && cb(filed.url());
	            }, function (error) {
	                console.error(error);
	                err && err();
	            });
	        }
	    }]);
	    return Blog;
	}(_db2.default.Object);

	exports.default = Blog;


	_db2.default.Object.register(Blog);

/***/ },
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _leancloudStorage = __webpack_require__(260);

	var _leancloudStorage2 = _interopRequireDefault(_leancloudStorage);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var APP_ID = 'y6aD4P6kQrnW6WoIks0YCJbo-gzGzoHsz';
	var APP_KEY = 'SKpyeXEz5nFrshIQGElFjMvH';
	_leancloudStorage2.default.init({
	    appId: APP_ID,
	    appKey: APP_KEY
	});
	window.AV = _leancloudStorage2.default;
	window.APP_ID = APP_ID;
	window.APP_KEY = APP_KEY;
	exports.default = _leancloudStorage2.default;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _stringify = __webpack_require__(38);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _vue = __webpack_require__(15);

	var _vue2 = _interopRequireDefault(_vue);

	var _resources = __webpack_require__(92);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    signIn: function signIn() {
	        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	        params = {
	            username: 'liangkevin',
	            password: '353030799@qq.com',
	            phone: '18612340000'
	        };
	        _resources.baseResource.post({ url: 'user' }, (0, _stringify2.default)(params));
	    },
	    loginAuthorize: function loginAuthorize() {
	        var redirect = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'index';

	        redirectUri = redirect;
	        var code = '';
	        var state = '';
	        if (location.search.indexOf('code') > 0) {
	            code = App.queryHref('code');
	            state = App.queryHref('state');
	            this.getToken(code, state);
	        } else {
	            location.href = getUrl('login/oauth/authorize');
	        }
	    },
	    getToken: function getToken(code, state) {
	        console.log('access_token:::');
	        var url = getUrl('login/oauth/access_token') + '&client_secret=' + CLIENT_SECRET + '&code=' + code + '&state=' + state + '&callback=nihao';

	        _vue2.default.http.get(url, {
	            client_id: CLIENT_ID,
	            client_secret: CLIENT_SECRET,
	            redirect_uri: host + redirectUri,
	            code: code,
	            state: state
	        }, {
	            headers: { withCredentials: true }
	        }).then(function (res) {
	            alert(1);
	            console.log(res);
	        }, function (err) {
	            alert(2);
	            console.error(err);
	        });
	    }
	};

/***/ },
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */
/***/ function(module, exports) {

	module.exports = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCACEAIQDASIAAhEBAxEB/8QAGgAAAgMBAQAAAAAAAAAAAAAAAAIBAwQFBv/EADkQAAIBAwEEBQoFBAMAAAAAAAABAgMEEQUSITFREyJBYXEGFDJSYoGRobHBIzM0QuEkU4LwcqLx/8QAFwEBAQEBAAAAAAAAAAAAAAAAAAECA//EAB4RAQEAAgMBAQEBAAAAAAAAAAABAhESITETUUFh/9oADAMBAAIRAxEAPwDpVl+N7giutHxGrr8f3ExXXj4mmXaoLFGHgWCUfyo+A5loAAAAAAAAAAAAABBIAQAAAAAAcOuv6j3ExXXh4hW/Ue4aK68fE0y69L8qPgOJS/Kj4DmWgAAAAAAAAAAAAAARlBlASQGQAAAAOLW/Ue4eC68fEquG1drk9xdD04eJpl06Ml0cVyRYcybkmnGTW5GuhUnKKy8k0srQAmWTtEUwC5FcmE2sIyI28CqRdJtY5C5yK95KBssngXaHnwK1vLGKFVXMZXEe0RwQrgi6ibsX9PT5gVQgknuAmo1yrn1lm78IlkfTh4iVf1L/AOK+42XHDXHIt03ImcvxMdyL6FRxwjO1tS2nxHi3HgY5w4ZOinuyQmmzIrioljEfgCrSXYhzi3GtmRZMirLo6e1jJn859n5l3InG1q/YVvJX52sY2H8SHdR9RjnEuFXxluGyZY3dNb9iRbG7otZbafLA5ReNTNixjLsCVzQfCfyYyuqCXpr4MvKJwquTqLsEcqmeBa7yj2STE85g+DNS7ZuOkKVRftAvjJSWUA2acyp+p/xX1Yz7Ban6j/FfVjPsMZeOmPpLm6o2dHpbiexBPGcN/QqttWsbqqqVCupzfBbLX2I1VQlpdztxUkqUmsrg8bjieSVGEncVpRTnHZUW1w45OUnTdvb1SDtIQ0d8orvIq+5b6HD5mQ1Xm6EV3mOUlGLk+CWS5+ph4JzhTWZyjFc28EZUo7UWmuaPM6ZFa3qVareZnCCzGGdyy9yC0rPT9dq2lJvoJSa2W843ZRLF5PSw9FDYQsPRXgeUvtR1bT7l0atym8ZTUU018BJst09Y4oqqbkvFCWquVZQ85nGddptyXDuOFZX2pXGo+b1HCUaU8VGkt2GTS7d/CZPDgCByRUSq1WKwptIBHJAN06WVX/VY9hfVjS7DLeVnTvYqKy3F7lvfwLoycktrd7jrnenPH1n1mWzo90/Yx8TneSMcWlaXOpj5fya/KGWzo1fv2V/2RR5KxxprfOq38kc/43fXfGp76sPFGShfULi4rUKc81KTxNY4GqjvrQ8Sf1V18/QXiYa0dulKGfSTRrv314LuMsmMvTHx5vycnCyubqjdTjSnhLE3jhnJVbQd7r1a5p76UJOW12ckehr2NrdNSr0ITku1reDpU6FLo6MIwjyisC5GmiPBHnPK6jvt667U4P6r7no0cvykodNpVSWN9NqX2+4nqXw9pfJaDTupPOxS397W77GPydouNpKvP060289y/nJxad25aT5jDLnOssLu/wDT1lvRVvRp0o8IRSGXS49r0CSTA4ut6pUtqsLW1wq08Nyf7c8B6eOvPiBw69pqlOaUL9zTWW2sbwLpl1K8lHVtuXBU8fU0xmpb1wObdOvO/c6dFyp7KWfia6EpbHXjsy5Gs70mHqjV9PrajCEKdwqdNelFr0n2GOhpWrWtHoba+pRhxxj+DsqY6mc+TenO0PTK+n1LidxOE3UxhxbfPOc+J27d/jxM6mW280qqbeFgs7p5D3ks1ljsRQxrie1WbTyivJL6s8TlorqdmeY+0VTl14rvMtL0V3NNV7erSfCcXH4oZMnJpl4zQLZ1tVjtLdRzJ+K4fM9dnrFVG0t7WpUqUaahOo8yeXvHUusTK7pjNRZk8jr6xrGZ52JKL9x6zO4wajptPUKaU3szj6Ml2GpdM2bZ3odk8NOrh+2BRDSr+lBQp6i1FcFh7gLv/TX+O3mLecMdbBQo97HSfrM7uS9bH+oZKHNFCT5/IlKXNE1F20qNPuLqMYxlmOMmLr8l8Scz9X5jr8N1qq0FKbll7+RU7d9jZWpS9Vk9JLlIlxxq8qZ0JcyqVvPbUs5wO6zXbIjzj2icMV51LhPkK4z5Dece0ienfNE+eJzqian6rK47SlvTSNXTPkiHVT4xTJ8p+r9KpyDY7qQ/toVzpv8AYPnf05xXtAPtUvVYE+dPpCIdAB2cjIZAAVKGAABAAAAABRHuQuF6q+AAQK4x9VEbEf8AWABCukub+Iko47WAEqqm3zAAMj//2Q=="

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* styles */
	__webpack_require__(295)

	/* script */
	__vue_exports__ = __webpack_require__(99)

	/* template */
	var __vue_template__ = __webpack_require__(324)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-7762eefe"

	module.exports = __vue_exports__


/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.messageResource = exports.devicesResource = exports.contactResource = exports.remindResource = exports.remindersResource = exports.dataResource = exports.deviceUserResource = exports.baseResource = undefined;

	var _vue = __webpack_require__(15);

	var _vue2 = _interopRequireDefault(_vue);

	var _vueResource = __webpack_require__(281);

	var _vueResource2 = _interopRequireDefault(_vueResource);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var host = 'https://api.leancloud.cn/1.1/';
	var yhwxUrl = 'http://mp.weixin.qq.com/s?__biz=MzIyMTIwNDg3MQ==&mid=402529106&idx=1&sn=4b1b434eee5a23dec415ac10f792a893#rd';
	_vue2.default.use(_vueResource2.default);

	_vue2.default.http.options.crossOrigin = true;
	_vue2.default.http.options.emulateJSON = true;
	_vue2.default.http.options.emulateHTTP = true;
	_vue2.default.http.options.timeout = 15000;
	_vue2.default.http.options.cache = false;

	_vue2.default.http.interceptors.push(function (request, next) {

	    next(function (response) {});
	});

	var baseResource = exports.baseResource = _vue2.default.resource(host + '{/uri}');
	var deviceUserResource = exports.deviceUserResource = _vue2.default.resource(host + '/users{/userId}');
	var dataResource = exports.dataResource = _vue2.default.resource(host + '/users{/userId}{/uri}{/uriId}');
	var remindersResource = exports.remindersResource = _vue2.default.resource(host + '/devices{/deviceId}/reminders');
	var remindResource = exports.remindResource = _vue2.default.resource(host + '/devices{/deviceId}/reminders{/reminderId}');

	var contactResource = exports.contactResource = _vue2.default.resource(host + '/devices{/deviceId}/contacts{/contactId}', {}, {
	    patchContact: { method: 'PATCH', url: host + '/devices{/deviceId}/contacts{/contactId}' }
	});

	var devicesResource = exports.devicesResource = _vue2.default.resource(host + '/devices{/deviceId}{/uri}', {}, {
	    post: { method: 'POST', url: host + '/devices{/deviceId}{/uri}' },
	    patchDevice: { method: 'PATCH', url: host + '/devices{/deviceId}' },
	    ratifyBindRequests: { method: 'PATCH', url: host + '/devices{/deviceId}/bindrequests/{/reqId}' },
	    deleteBindRequests: { method: 'DELETE', url: host + '/devices{/deviceId}/bindrequests/{/reqId}' },
	    findDevice: { method: 'POST', url: host + '/devices{/deviceId}/find' },
	    poweroffDevice: { method: 'POST', url: host + '/devices{/deviceId}/poweroff' },
	    monitorDevice: { method: 'POST', url: host + '/devices{/deviceId}/monitor' }
	});

	var messageResource = exports.messageResource = _vue2.default.resource(host + '/messages{/messagesId}{/uri}', {}, {
	    post: { method: 'POST', url: host + '/messages{/messagesId}{/uri}' }
	});

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _stringify = __webpack_require__(38);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _db = __webpack_require__(55);

	var _db2 = _interopRequireDefault(_db);

	var _app = __webpack_require__(22);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    signUp: function signUp(params, cb) {
	        var user = new _db2.default.User();
	        user.setUsername(params.userName);
	        user.setPassword(params.password);
	        user.setEmail(params.email);
	        user.signUp().then(function (loginedUser) {
	            cb && cb(loginedUser);
	        }, function (error) {
	            _app2.default.pop((0, _stringify2.default)(error));
	        });
	    },
	    signIn: function signIn(params, cb) {
	        _db2.default.User.logIn(params.userName, params.password).then(function (loginedUser) {
	            cb && cb(loginedUser);
	        }, function (error) {
	            _app2.default.pop((0, _stringify2.default)(error));
	        });
	    }
	};

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _stringify = __webpack_require__(38);

	var _stringify2 = _interopRequireDefault(_stringify);

	var _classCallCheck2 = __webpack_require__(68);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(69);

	var _createClass3 = _interopRequireDefault(_createClass2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var _class = function () {
	    function _class(storage) {
	        (0, _classCallCheck3.default)(this, _class);

	        this.storage = storage;
	    }

	    (0, _createClass3.default)(_class, [{
	        key: 'pre',
	        value: function pre(key) {
	            var now = new Date();
	            var year = now.getFullYear().toString();
	            var month = (now.getMonth() + 1).toString();
	            var day = now.getDate().toString();
	            var date = year + month + day;

	            return 'kevinBlog__' + key + '__' + date;
	        }
	    }, {
	        key: 'get',
	        value: function get() {
	            var key = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

	            var value = JSON.parse(this.storage.getItem(this.pre(key)));

	            if (value) return value.data;
	            return null;
	        }
	    }, {
	        key: 'set',
	        value: function set(key, value) {
	            this.storage.setItem(this.pre(key), (0, _stringify2.default)({ data: value }));
	        }
	    }, {
	        key: 'remove',
	        value: function remove(key) {
	            this.storage.removeItem(this.pre(key));
	        }
	    }]);
	    return _class;
	}();

	exports.default = _class;

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _vue = __webpack_require__(15);

	var _vue2 = _interopRequireDefault(_vue);

	var _vueRouter = __webpack_require__(282);

	var _vueRouter2 = _interopRequireDefault(_vueRouter);

	var _index = __webpack_require__(311);

	var _index2 = _interopRequireDefault(_index);

	var _about = __webpack_require__(307);

	var _about2 = _interopRequireDefault(_about);

	var _blogs = __webpack_require__(309);

	var _blogs2 = _interopRequireDefault(_blogs);

	var _signUp = __webpack_require__(313);

	var _signUp2 = _interopRequireDefault(_signUp);

	var _login = __webpack_require__(312);

	var _login2 = _interopRequireDefault(_login);

	var _admin = __webpack_require__(308);

	var _admin2 = _interopRequireDefault(_admin);

	var _detail = __webpack_require__(310);

	var _detail2 = _interopRequireDefault(_detail);

	var _game = __webpack_require__(304);

	var _game2 = _interopRequireDefault(_game);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_vue2.default.use(_vueRouter2.default);
	exports.default = new _vueRouter2.default({
	    mode: 'hash',
	    scrollBehavior: function scrollBehavior() {
	        return { y: 0 };
	    },
	    routes: [{ path: '/index', component: _index2.default }, { path: '/about', component: _about2.default }, { path: '/blogs', component: _blogs2.default }, { path: '/signUp', component: _signUp2.default }, { path: '/login', component: _login2.default }, { path: '/admin', component: _admin2.default }, { path: '/game', component: _game2.default }, { path: '/detail/:id', name: 'detail', component: _detail2.default }, { path: '*', redirect: '/index' }]
	});

/***/ },
/* 96 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.cutstr = cutstr;
	exports.asc2char = asc2char;
	exports.convertDate = convertDate;
	exports.dateToCN = dateToCN;
	exports.blurPhone = blurPhone;
	exports.advanceTime = advanceTime;
	function cutstr(value, len) {
	    var str_length = 0;
	    var str_len = 0;
	    var str_cut = '';
	    if (typeof value === 'undefined') {
	        console.log(value);
	        value = '';
	    }
	    str_len = value.length;
	    for (var i = 0; i < str_len; i++) {
	        var a = value.charAt(i);
	        str_length++;
	        if (escape(a).length > 4) {
	            str_length++;
	        }

	        str_cut = str_cut.concat(a);
	        if (str_length >= len) {
	            str_cut = str_cut.concat('...');
	            return str_cut;
	        }
	    }

	    if (str_length < len) {
	        return value;
	    }
	}
	function asc2char(value) {
	    return String.fromCharCode(+value);
	}

	function convertDate(value) {
	    var o = new Date(value * 1000);
	    var month = o.getMonth() + 1 < 10 ? '0' + (o.getMonth() + 1) : o.getMonth() + 1;
	    var day = o.getDate() < 10 ? '0' + o.getDate() : o.getDate();
	    var hour = o.getHours() < 10 ? '0' + o.getHours() : o.getHours();
	    var minute = o.getMinutes() < 10 ? '0' + o.getMinutes() : o.getMinutes();
	    return month + '.' + day + ' ' + hour + ':' + minute;
	}

	function dateToCN(value) {
	    var d = new Date(value * 1000);
	    var year = d.getFullYear();
	    var month = d.getMonth() + 1;
	    var day = d.getDate();
	    return year + '.' + month + '.' + day;
	}

	function blurPhone(phone) {
	    return phone ? phone.substr(0, 3) + '****' + phone.substr(-4) : '';
	}

	var MONTH = 60 * 60 * 24 * 30;
	var DAY = 60 * 60 * 24;
	var HOUR = 60 * 60;
	var MIN = 60;

	function advanceTime(value) {
	    var delta = Date.now() / 1000 - +value;
	    if (delta > MONTH * 12) {
	        return parseInt(delta / MONTH * 12) + '\u5E74\u4EE5\u524D';
	    }
	    if (delta > MONTH) {
	        return parseInt(delta / MONTH) + '\u4E2A\u6708\u4EE5\u524D';
	    }
	    if (delta > DAY) {
	        return parseInt(delta / DAY) + '\u5929\u4EE5\u524D';
	    }
	    if (delta > HOUR) {
	        return parseInt(delta / HOUR) + '\u5C0F\u65F6\u4EE5\u524D';
	    }
	    if (delta >= MIN) {
	        return parseInt(delta / MIN) + '\u5206\u949F\u4EE5\u524D';
	    }
	    return '刚刚';
	}

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _vue = __webpack_require__(15);

	var _vue2 = _interopRequireDefault(_vue);

	var _vuex = __webpack_require__(283);

	var _vuex2 = _interopRequireDefault(_vuex);

	var _user = __webpack_require__(93);

	var _user2 = _interopRequireDefault(_user);

	var _blog = __webpack_require__(33);

	var _blog2 = _interopRequireDefault(_blog);

	var _app = __webpack_require__(22);

	var _app2 = _interopRequireDefault(_app);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var blogApi = new _blog2.default();

	_vue2.default.use(_vuex2.default);

	var store = new _vuex2.default.Store({
	    state: {
	        user: _app2.default.ss.get('user') || '',
	        blogs: [],
	        loading: 0
	    },
	    actions: {
	        register: function register(_ref, _ref2) {
	            var dispatch = _ref.dispatch;
	            var state = _ref.state;
	            var params = _ref2.params;
	            var cb = _ref2.cb;

	            _user2.default.signUp(params, function (user) {
	                _app2.default.ss.set('user', user);
	                dispatch('updateUser', { user: user });
	                cb && cb();
	            });
	        },
	        loginIn: function loginIn(_ref3, _ref4) {
	            var dispatch = _ref3.dispatch;
	            var state = _ref3.state;
	            var params = _ref4.params;
	            var cb = _ref4.cb;

	            _user2.default.signIn(params, function (user) {
	                _app2.default.ss.set('user', user);
	                dispatch('updateUser', { user: user });
	                cb && cb();
	            });
	        },
	        fetchBlogs: function fetchBlogs(_ref5, params) {
	            var commit = _ref5.commit;
	            var state = _ref5.state;

	            commit('changeLoading', 1);
	            blogApi.fetchList(params, function (s) {
	                console.log('获取回来的数据：：', s);
	                commit('initBlogs', { items: s });
	                commit('changeLoading', 0);
	            }, function () {
	                alert('网络不给力， 请稍后再试');
	                commit('changeLoading', 0);
	            });
	        },
	        updateUser: function updateUser(_ref6, _ref7) {
	            var commit = _ref6.commit;
	            var state = _ref6.state;
	            var user = _ref7.user;

	            commit('setUser', { user: user });
	        },
	        saveBlog: function saveBlog(_ref8, _ref9) {
	            var commit = _ref8.commit;
	            var state = _ref8.state;
	            var params = _ref9.params;
	            var cb = _ref9.cb;

	            commit('changeLoading', 1);
	            blogApi.addOneBlog(params, function (s) {
	                console.log('成功的数据：：', s);
	                commit('changeLoading', 0);
	                cb && cb();
	            });
	        },
	        updateBlog: function updateBlog(_ref10, _ref11) {
	            var commit = _ref10.commit;
	            var state = _ref10.state;
	            var id = _ref11.id;
	            var content = _ref11.content;
	            var cb = _ref11.cb;

	            commit('changeLoading', 1);
	            blogApi.updateBlog(id, content, function () {
	                cb && cb();
	                commit('changeLoading', 0);
	            });
	        },
	        getBlogItem: function getBlogItem(_ref12, _ref13) {
	            var commit = _ref12.commit;
	            var state = _ref12.state;
	            var params = _ref13.params;
	            var cb = _ref13.cb;

	            commit('changeLoading', 1);
	            blogApi.fetchItem(params, function (b) {
	                cb && cb(b);
	                commit('changeLoading', 0);
	            });
	        }
	    },
	    mutations: {
	        setUser: function setUser(state, _ref14) {
	            var user = _ref14.user;

	            console.log('设置user：：', user);
	            state.user = user;
	            _vue2.default.set(state, 'user', user);
	            console.log('state.user:::', state.user);
	        },
	        initBlogs: function initBlogs(state, _ref15) {
	            var items = _ref15.items;

	            state.blogs = items;
	        },
	        changeLoading: function changeLoading(state, st) {
	            state.loading = st;
	        }
	    },
	    getters: {
	        getUser: function getUser(state) {
	            return state.user;
	        }
	    },
	    middlewares: {}
	});

	exports.default = store;

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _vue = __webpack_require__(15);

	var _vue2 = _interopRequireDefault(_vue);

	var _vueMarkdown = __webpack_require__(197);

	var _vueMarkdown2 = _interopRequireDefault(_vueMarkdown);

	var _commhead = __webpack_require__(303);

	var _commhead2 = _interopRequireDefault(_commhead);

	var _sideSwitch = __webpack_require__(306);

	var _sideSwitch2 = _interopRequireDefault(_sideSwitch);

	var _sideNav = __webpack_require__(305);

	var _sideNav2 = _interopRequireDefault(_sideNav);

	var _elementUi = __webpack_require__(249);

	var _elementUi2 = _interopRequireDefault(_elementUi);

	__webpack_require__(285);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_vue2.default.use(_elementUi2.default);
	_vue2.default.component('vue-markdown', _vueMarkdown2.default);

	exports.default = {
	    name: 'App',
	    components: {
	        CommHead: _commhead2.default,
	        SideSwitch: _sideSwitch2.default,
	        sideNav: _sideNav2.default
	    },
	    data: function data() {
	        return {
	            isShow: true
	        };
	    },

	    methods: {
	        changeStatus: function changeStatus() {
	            console.log('改变状态');
	            this.isShow = !this.isShow;
	        },
	        loginIn: function loginIn() {
	            this.user = App.ss.get('user');
	            this.$store.dispatch('updateUser', App.ss.get('user'));
	        },
	        loginOut: function loginOut() {
	            this.$store.dispatch('updateUser', { user: null });
	            App.ss.set('user', null);
	        }
	    },
	    computed: {
	        user: function user() {
	            return this.$store.state.user || App.ss.get('user');
	        },
	        loading: function loading() {
	            return !!this.$store.state.loading;
	        }
	    },
	    mounted: function mounted() {
	        var _this = this;

	        this.$router.beforeEach(function (route, redirect, next) {
	            _this.isShow = false;
	            next();
	        });
	        console.log('session中的user：：', App.ss.get('user'));
	        if (App.ss.get('user')) {
	            this.$store.dispatch('updateUser', { user: App.ss.get('user') });
	        }
	        App.showLoading = function () {
	            _this.$store.commit('changeLoading', 1);
	        };
	        App.hideLoading = function () {
	            _this.$store.commit('changeLoading', 0);
	        };
	    }
	};

/***/ },
/* 99 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    props: {
	        targetId: {
	            type: String,
	            default: '.view'
	        },
	        minheight: {
	            type: Number,
	            default: 100
	        }
	    },
	    data: function data() {
	        return {
	            isTop: true
	        };
	    },

	    methods: {
	        goTop: function goTop() {
	            document.querySelector(this.targetId).scrollTop = 0;
	            this.isTop = true;
	        },
	        checkshow: function checkshow() {
	            if (document.querySelector(this.targetId).scrollTop > this.minheight) {
	                this.isTop = false;
	            } else {
	                this.isTop = true;
	            }
	        }
	    },
	    mounted: function mounted() {}
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});


	var yueban = __webpack_require__(298);

	exports.default = {
	    name: 'nav',
	    data: function data() {
	        return {
	            msg: 'Welcome to kevin’ personal zone',
	            url: yueban,
	            isPlaying: true
	        };
	    },

	    methods: {
	        changePlay: function changePlay() {
	            if (this.$refs.myaudio.paused) {
	                this.$refs.myaudio.play();
	                this.isPlaying = true;
	            } else {
	                this.$refs.myaudio.pause();
	                this.isPlaying = false;
	            }
	        },
	        loginOut: function loginOut() {
	            this.$emit('onloginOut');
	            window.location.reload();
	        },
	        goLoginIn: function goLoginIn() {
	            this.$router.push('login');
	        },
	        handleSelect: function handleSelect(key, keyPath) {
	            console.log(key, keyPath);
	        }
	    },
	    computed: {
	        user: function user() {
	            return this.$store.state.user;
	        },
	        currentRoute: function currentRoute() {
	            if (this.$route.path.split('/')[1] === 'detail') return '';
	            return this.$route.path.split('/')[1];
	        }
	    }
	};

/***/ },
/* 101 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    data: function data() {
	        return {
	            started: false,
	            time: 0,
	            timer: '',
	            puzzles: []
	        };
	    },

	    methods: {
	        render: function render() {
	            var puzzleArr = [];
	            var i = 1;

	            for (i; i < 16; i++) {
	                puzzleArr.push(i);
	            }

	            puzzleArr = puzzleArr.sort(function () {
	                return Math.random() - 0.5;
	            });

	            this.puzzles = puzzleArr;
	            this.puzzles.push('');
	        },
	        moveFn: function moveFn(index) {
	            var curNum = this.puzzles[index];
	            var leftNum = this.puzzles[index - 1];
	            var rightNum = this.puzzles[index + 1];
	            var topNum = this.puzzles[index - 4];
	            var bottomNum = this.puzzles[index + 4];


	            if (leftNum === '' && index % 4) {
	                this.puzzles[index - 1] = curNum;
	                this.puzzles.splice(index - 1, 1, curNum);
	                this.puzzles.splice(index, 1, '');
	            } else if (rightNum === '' && index % 4 !== 3) {
	                this.puzzles.splice(index + 1, 1, curNum);
	                this.puzzles.splice(index, 1, '');
	            } else if (topNum === '') {
	                this.puzzles.splice(index - 4, 1, curNum);
	                this.puzzles.splice(index, 1, '');
	            } else if (bottomNum === '') {
	                this.puzzles.splice(index + 4, 1, curNum);
	                this.puzzles.splice(index, 1, '');
	            }
	            this.passFn();
	        },
	        passFn: function passFn() {
	            if (this.puzzles[15] === '') {
	                var newPuzzles = this.puzzles.slice(0, 15);
	                var isPass = newPuzzles.every(function (e, i) {
	                    return e === i + 1;
	                });
	                if (isPass) {
	                    App.log('恭喜，闯关成功！');
	                    this.started = false;
	                    this.time = 0;
	                    this.$message({
	                        showClose: true,
	                        type: 'success',
	                        $message: '恭喜，闯关成功！'
	                    });
	                }
	            }
	        },
	        startGame: function startGame() {
	            var _this = this;

	            this.resetGame();
	            this.started = true;
	            this.timer = setInterval(function () {
	                if (!_this.started) {
	                    return;
	                }
	                _this.time++;
	            }, 1000);
	        },
	        resetGame: function resetGame() {
	            this.time = 0;
	            this.render();
	        },
	        clearTimer: function clearTimer() {
	            clearInterval(this.timer);
	            this.timer = null;
	        }
	    },
	    mounted: function mounted() {
	        this.render();
	    }
	};

/***/ },
/* 102 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    name: 'nav',
	    props: {
	        isShow: {
	            type: Boolean,
	            default: false
	        },
	        changeStatus: {
	            type: Function
	        },
	        user: {
	            type: Object
	        }
	    },
	    components: {},
	    data: function data() {
	        return {
	            logined: this.user
	        };
	    },

	    computed: {
	        currentRoute: function currentRoute() {
	            if (this.$route.path.split('/')[1] === 'detail') return '';
	            return this.$route.path.split('/')[1];
	        }
	    },
	    mounted: function mounted() {}
	};

/***/ },
/* 103 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    props: {
	        isShow: {
	            type: Boolean,
	            default: false
	        },
	        changeStatus: {
	            type: Function
	        }
	    },
	    data: function data() {
	        return {
	            msg: 'Welcome to kevin’ personal zone'
	        };
	    },

	    methods: {
	        changeShow: function changeShow() {
	            this.changeStatus();
	        }
	    }
	};

/***/ },
/* 104 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    name: 'about',
	    data: function data() {
	        return {};
	    },
	    mounted: function mounted() {}
	};

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _blog = __webpack_require__(33);

	var _blog2 = _interopRequireDefault(_blog);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    name: 'admin',
	    data: function data() {
	        return {
	            lock: false,
	            source: new Date().toLocaleTimeString(),
	            labels: [{ name: '前端', value: 'frontend' }, { name: '后端', value: 'backend' }, { name: '工具', value: 'utils' }, { name: '生活', value: 'live' }, { name: '其他', value: 'other' }],
	            types: {
	                frontend: ['HTML5', 'CSS3', 'JS', 'VUEJS', 'ANGULARJS', 'REACTJS'],
	                backend: ['JAVA', 'PHP', 'PYTHON', 'NODEJS'],
	                utils: ['sublime', 'myeclipse', 'git', 'svn'],
	                live: ['篮球', '旅游', '电影'],
	                other: ['八卦', '新闻']
	            },
	            markdown: '1',
	            form: {
	                title: '',
	                category: '',
	                poster: '',
	                type: [],
	                content: '',
	                desc: ''
	            }
	        };
	    },

	    methods: {
	        uploadFile: function uploadFile(e) {
	            var _this = this;

	            var input = e.target;
	            if (input.files.length > 0) {
	                _blog2.default.uploadFile(input, function (url) {
	                    _this.form.poster = url;
	                }, function () {
	                    _this.$message({
	                        showClose: true,
	                        type: 'error',
	                        message: '上传出错，请换一个小图片试试!'
	                    });
	                });
	            }
	        },
	        showError: function showError(msg) {
	            this.$message({
	                showClose: true,
	                type: 'error',
	                message: msg
	            });
	        },
	        onSubmit: function onSubmit() {
	            var _this2 = this;

	            if (this.form.title.trim() === '') {
	                this.showError('标题不能为空');
	                return;
	            }
	            if (this.form.content.trim() === '') {
	                this.showError('内容不能为空');
	                return;
	            }
	            if (this.form.category.trim() === '') {
	                this.showError('分类不能为空');
	                return;
	            }
	            if (this.lock) return;
	            this.lock = true;
	            this.$store.dispatch('saveBlog', {
	                params: this.form,
	                cb: function cb() {
	                    _this2.$message({
	                        showClose: true,
	                        type: 'success',
	                        message: '发布成功!'
	                    });
	                    _this2.lock = false;
	                    setTimeout(function () {
	                        _this2.$router.replace('/blogs');
	                    }, 500);
	                }
	            });
	        },
	        handleRemove: function handleRemove(file, fileList) {
	            console.log(file, fileList);
	        },
	        handlePreview: function handlePreview(file) {
	            console.log(file);
	        }
	    },
	    beforeDistory: function beforeDistory() {},
	    mounted: function mounted() {
	        var _this3 = this;

	        setInterval(function () {
	            _this3.source = new Date().toLocaleTimeString();
	        }, 1000);
	    }
	};

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _BackTop = __webpack_require__(91);

	var _BackTop2 = _interopRequireDefault(_BackTop);

	var _filters = __webpack_require__(96);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var LABELS = { frontend: '前 端', backend: '后 端', utils: '工 具', live: '生 活', other: '其 他' };

	exports.default = {
	    name: 'blogs',
	    components: {
	        BackTop: _BackTop2.default
	    },
	    data: function data() {
	        return {
	            defualtimg: 'https://dn-yaotv.qbox.me/appintv_9de0d279d11d24a9308cf9af7bde1154.jpeg',
	            size: 6,
	            currPage: 1,
	            isTop: true,
	            hot: true,
	            query: '',
	            labels: LABELS
	        };
	    },

	    methods: {
	        goDetail: function goDetail(bid) {
	            this.$router.push({ name: 'detail', params: { id: bid } });
	        },
	        changePage: function changePage(curr) {
	            this.currPage = curr;
	            console.log(curr);
	        },
	        checkScrollTop: function checkScrollTop() {
	            var child = this.$refs.childbtn;
	            child.checkshow();
	        },
	        resort: function resort() {
	            this.$store.dispatch('fetchBlogs', { sort: this.hot, query: this.query });
	        }
	    },
	    computed: {
	        blogs: function blogs() {
	            return this.$store.state.blogs.slice((this.currPage - 1) * this.size, this.size * this.currPage);
	        },
	        totalBlogs: function totalBlogs() {
	            return this.$store.state.blogs;
	        },
	        listLength: function listLength() {
	            return this.totalBlogs.length;
	        }
	    },
	    filters: {
	        dateToCN: _filters.dateToCN,
	        en2cn: function en2cn(en) {
	            return LABELS[en] || '未 知';
	        }
	    },
	    created: function created() {
	        this.$store.dispatch('fetchBlogs', { sort: this.hot });
	    },
	    mounted: function mounted() {}
	};

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _BackTop = __webpack_require__(91);

	var _BackTop2 = _interopRequireDefault(_BackTop);

	var _blog = __webpack_require__(33);

	var _blog2 = _interopRequireDefault(_blog);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    name: 'detail',
	    data: function data() {
	        return {
	            defualtimg: 'https://dn-yaotv.qbox.me/appintv_9de0d279d11d24a9308cf9af7bde1154.jpeg',
	            currBlog: '',
	            isEditor: false
	        };
	    },

	    components: {
	        BackTop: _BackTop2.default
	    },
	    methods: {
	        checkScrollTop: function checkScrollTop() {
	            var child = this.$refs.childbtn;
	            child.checkshow();
	        },
	        backTop: function backTop() {
	            document.getElementById('pg-detail').scrollTop = 0;
	            this.isTop = true;
	        },
	        save: function save() {
	            var self = this;
	            this.$store.dispatch('updateBlog', {
	                id: this.currBlog.id,
	                content: this.currBlog.content,
	                cb: function cb() {
	                    self.isEditor = false;
	                }
	            });
	        }
	    },
	    computed: {
	        user: function user() {
	            return this.$store.state.user;
	        }
	    },
	    filters: {
	        en2cn: function en2cn(en) {
	            var labels = { frontend: '前 端', backend: '后 端', utils: '工 具', live: '生 活', other: '其 他' };
	            return labels[en] || '未 知';
	        }
	    },
	    mounted: function mounted() {
	        var _this = this;

	        var blogId = this.$route.params.id;
	        console.log(blogId);
	        this.$store.dispatch('getBlogItem', {
	            params: blogId,
	            cb: function cb(blog) {
	                _this.currBlog = blog;
	            }
	        });
	    }
	};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _api = __webpack_require__(56);

	var _api2 = _interopRequireDefault(_api);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    name: 'index',
	    components: {},
	    data: function data() {
	        return {
	            radio: 0
	        };
	    },

	    methods: {},
	    beforeDistory: function beforeDistory() {},
	    mounted: function mounted() {}
	};

/***/ },
/* 109 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    name: 'login',
	    data: function data() {
	        var checkUserName = function checkUserName(rule, value, callback) {
	            if (value === '') {
	                callback(new Error('请输入用户名'));
	            } else if (!/^[0-9a-zA-Z_]{5,32}$/.test(value)) {
	                callback(new Error('用户名在5~32为字符之间'));
	            } else {
	                callback();
	            }
	        };
	        var checkPassWord = function checkPassWord(rule, value, callback) {
	            if (value === '') {
	                callback(new Error('请输入密码'));
	            } else if (!/^[0-9a-zA-Z_]{6,32}$/.test(value)) {
	                callback(new Error('密码在6~32为字符之间'));
	            } else {
	                callback();
	            }
	        };
	        return {
	            success: false,
	            form: {
	                userName: '',
	                password: ''
	            },
	            dynamicRule: {
	                userName: [{ required: true, message: '请输用户名', trigger: 'blur' }, { validator: checkUserName, trigger: 'blur,change' }],
	                password: [{ required: true, message: '请输密码', trigger: 'blur' }]
	            }
	        };
	    },

	    methods: {
	        handleLogin: function handleLogin(ev) {
	            var _this = this;

	            this.$refs.ruleForm.validate(function (valid) {
	                if (valid) {
	                    console.log(_this.form);
	                    _this.$store.dispatch('loginIn', {
	                        params: _this.form,
	                        cb: function cb() {
	                            console.log('这里是登录成功的回调');
	                            _this.success = true;
	                            _this.$emit('onloginIn');
	                            _this.$message({
	                                showClose: true,
	                                type: 'success',
	                                message: '恭喜你，登录成功!'
	                            });
	                            _this.$nextTick(function () {
	                                setTimeout(function () {
	                                    _this.$router.replace('index');
	                                }, 1000);
	                            });
	                        }
	                    });
	                } else {
	                    _this.$message.error('您的信息格式不正确哦，请检查!');
	                    return false;
	                }
	            });
	        }
	    },
	    mounted: function mounted() {
	        console.log('mounted login');
	    }
	};

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _index = __webpack_require__(56);

	var _index2 = _interopRequireDefault(_index);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    name: 'signUp',
	    data: function data() {
	        var _this = this;

	        var checkUserName = function checkUserName(rule, value, callback) {
	            if (value === '') {
	                callback(new Error('请输入用户名'));
	            } else if (!/^[0-9a-zA-Z_]{5,32}$/.test(value)) {
	                callback(new Error('用户名在5~32为字符之间'));
	            } else {
	                _this.$refs.ruleForm.validateField('checkPass');
	                callback();
	            }
	        };
	        var checkPassWord = function checkPassWord(rule, value, callback) {
	            if (value === '') {
	                callback(new Error('请输入密码'));
	            } else if (!/^[0-9a-zA-Z_]{6,32}$/.test(value)) {
	                callback(new Error('密码在6~32为字符之间'));
	            } else {
	                callback();
	            }
	        };
	        var checkRePass = function checkRePass(rule, value, callback) {
	            if (value === '') {
	                callback(new Error('请再次输入密码'));
	            } else if (value !== _this.form.checkPass) {
	                callback(new Error('两次输入密码不一致!'));
	            } else {
	                callback();
	            }
	        };
	        return {
	            success: false,
	            form: {
	                userName: '',
	                email: '',
	                checkPass: '',
	                password: '',
	                sex: ''
	            },
	            dynamicRule: {
	                userName: [{ required: true, message: '请输用户名', trigger: 'blur' }, { validator: checkUserName, trigger: 'blur,change' }],
	                checkPass: [{ required: true, message: '请输密码', trigger: 'blur' }, { validator: checkPassWord, trigger: 'blur,change' }],
	                password: [{ required: true, message: '请输密码', trigger: 'blur' }, { validator: checkRePass, trigger: 'blur,change' }],
	                email: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' }, { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }],
	                sex: [{ required: true, message: '请选择性别', trigger: 'change' }]
	            }
	        };
	    },

	    methods: {
	        handleSubmit: function handleSubmit(ev) {
	            var _this2 = this;

	            this.$refs.ruleForm.validate(function (valid) {
	                if (valid) {
	                    console.log(_this2.form);
	                    _this2.$store.dispatch('register', _this2.form);
	                } else {
	                    _this2.$message.error('您的信息格式不正确哦，请检查!');
	                    return false;
	                }
	            });
	        }
	    },
	    mounted: function mounted() {
	        console.log('mounted');
	    }
	};

/***/ },
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */,
/* 167 */,
/* 168 */,
/* 169 */,
/* 170 */,
/* 171 */,
/* 172 */,
/* 173 */,
/* 174 */,
/* 175 */,
/* 176 */,
/* 177 */,
/* 178 */,
/* 179 */,
/* 180 */,
/* 181 */,
/* 182 */,
/* 183 */,
/* 184 */,
/* 185 */,
/* 186 */,
/* 187 */,
/* 188 */,
/* 189 */,
/* 190 */,
/* 191 */,
/* 192 */,
/* 193 */,
/* 194 */,
/* 195 */,
/* 196 */,
/* 197 */,
/* 198 */,
/* 199 */,
/* 200 */,
/* 201 */,
/* 202 */,
/* 203 */,
/* 204 */,
/* 205 */,
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */,
/* 242 */,
/* 243 */,
/* 244 */,
/* 245 */,
/* 246 */,
/* 247 */,
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 286 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 287 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 288 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 289 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 290 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 291 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 292 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 293 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 294 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 295 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 296 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 297 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 298 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/mp3/yueban.16a7142.mp3";

/***/ },
/* 299 */
/***/ function(module, exports) {

	module.exports = {
		"Aacute": "Á",
		"aacute": "á",
		"Abreve": "Ă",
		"abreve": "ă",
		"ac": "∾",
		"acd": "∿",
		"acE": "∾̳",
		"Acirc": "Â",
		"acirc": "â",
		"acute": "´",
		"Acy": "А",
		"acy": "а",
		"AElig": "Æ",
		"aelig": "æ",
		"af": "⁡",
		"Afr": "𝔄",
		"afr": "𝔞",
		"Agrave": "À",
		"agrave": "à",
		"alefsym": "ℵ",
		"aleph": "ℵ",
		"Alpha": "Α",
		"alpha": "α",
		"Amacr": "Ā",
		"amacr": "ā",
		"amalg": "⨿",
		"amp": "&",
		"AMP": "&",
		"andand": "⩕",
		"And": "⩓",
		"and": "∧",
		"andd": "⩜",
		"andslope": "⩘",
		"andv": "⩚",
		"ang": "∠",
		"ange": "⦤",
		"angle": "∠",
		"angmsdaa": "⦨",
		"angmsdab": "⦩",
		"angmsdac": "⦪",
		"angmsdad": "⦫",
		"angmsdae": "⦬",
		"angmsdaf": "⦭",
		"angmsdag": "⦮",
		"angmsdah": "⦯",
		"angmsd": "∡",
		"angrt": "∟",
		"angrtvb": "⊾",
		"angrtvbd": "⦝",
		"angsph": "∢",
		"angst": "Å",
		"angzarr": "⍼",
		"Aogon": "Ą",
		"aogon": "ą",
		"Aopf": "𝔸",
		"aopf": "𝕒",
		"apacir": "⩯",
		"ap": "≈",
		"apE": "⩰",
		"ape": "≊",
		"apid": "≋",
		"apos": "'",
		"ApplyFunction": "⁡",
		"approx": "≈",
		"approxeq": "≊",
		"Aring": "Å",
		"aring": "å",
		"Ascr": "𝒜",
		"ascr": "𝒶",
		"Assign": "≔",
		"ast": "*",
		"asymp": "≈",
		"asympeq": "≍",
		"Atilde": "Ã",
		"atilde": "ã",
		"Auml": "Ä",
		"auml": "ä",
		"awconint": "∳",
		"awint": "⨑",
		"backcong": "≌",
		"backepsilon": "϶",
		"backprime": "‵",
		"backsim": "∽",
		"backsimeq": "⋍",
		"Backslash": "∖",
		"Barv": "⫧",
		"barvee": "⊽",
		"barwed": "⌅",
		"Barwed": "⌆",
		"barwedge": "⌅",
		"bbrk": "⎵",
		"bbrktbrk": "⎶",
		"bcong": "≌",
		"Bcy": "Б",
		"bcy": "б",
		"bdquo": "„",
		"becaus": "∵",
		"because": "∵",
		"Because": "∵",
		"bemptyv": "⦰",
		"bepsi": "϶",
		"bernou": "ℬ",
		"Bernoullis": "ℬ",
		"Beta": "Β",
		"beta": "β",
		"beth": "ℶ",
		"between": "≬",
		"Bfr": "𝔅",
		"bfr": "𝔟",
		"bigcap": "⋂",
		"bigcirc": "◯",
		"bigcup": "⋃",
		"bigodot": "⨀",
		"bigoplus": "⨁",
		"bigotimes": "⨂",
		"bigsqcup": "⨆",
		"bigstar": "★",
		"bigtriangledown": "▽",
		"bigtriangleup": "△",
		"biguplus": "⨄",
		"bigvee": "⋁",
		"bigwedge": "⋀",
		"bkarow": "⤍",
		"blacklozenge": "⧫",
		"blacksquare": "▪",
		"blacktriangle": "▴",
		"blacktriangledown": "▾",
		"blacktriangleleft": "◂",
		"blacktriangleright": "▸",
		"blank": "␣",
		"blk12": "▒",
		"blk14": "░",
		"blk34": "▓",
		"block": "█",
		"bne": "=⃥",
		"bnequiv": "≡⃥",
		"bNot": "⫭",
		"bnot": "⌐",
		"Bopf": "𝔹",
		"bopf": "𝕓",
		"bot": "⊥",
		"bottom": "⊥",
		"bowtie": "⋈",
		"boxbox": "⧉",
		"boxdl": "┐",
		"boxdL": "╕",
		"boxDl": "╖",
		"boxDL": "╗",
		"boxdr": "┌",
		"boxdR": "╒",
		"boxDr": "╓",
		"boxDR": "╔",
		"boxh": "─",
		"boxH": "═",
		"boxhd": "┬",
		"boxHd": "╤",
		"boxhD": "╥",
		"boxHD": "╦",
		"boxhu": "┴",
		"boxHu": "╧",
		"boxhU": "╨",
		"boxHU": "╩",
		"boxminus": "⊟",
		"boxplus": "⊞",
		"boxtimes": "⊠",
		"boxul": "┘",
		"boxuL": "╛",
		"boxUl": "╜",
		"boxUL": "╝",
		"boxur": "└",
		"boxuR": "╘",
		"boxUr": "╙",
		"boxUR": "╚",
		"boxv": "│",
		"boxV": "║",
		"boxvh": "┼",
		"boxvH": "╪",
		"boxVh": "╫",
		"boxVH": "╬",
		"boxvl": "┤",
		"boxvL": "╡",
		"boxVl": "╢",
		"boxVL": "╣",
		"boxvr": "├",
		"boxvR": "╞",
		"boxVr": "╟",
		"boxVR": "╠",
		"bprime": "‵",
		"breve": "˘",
		"Breve": "˘",
		"brvbar": "¦",
		"bscr": "𝒷",
		"Bscr": "ℬ",
		"bsemi": "⁏",
		"bsim": "∽",
		"bsime": "⋍",
		"bsolb": "⧅",
		"bsol": "\\",
		"bsolhsub": "⟈",
		"bull": "•",
		"bullet": "•",
		"bump": "≎",
		"bumpE": "⪮",
		"bumpe": "≏",
		"Bumpeq": "≎",
		"bumpeq": "≏",
		"Cacute": "Ć",
		"cacute": "ć",
		"capand": "⩄",
		"capbrcup": "⩉",
		"capcap": "⩋",
		"cap": "∩",
		"Cap": "⋒",
		"capcup": "⩇",
		"capdot": "⩀",
		"CapitalDifferentialD": "ⅅ",
		"caps": "∩︀",
		"caret": "⁁",
		"caron": "ˇ",
		"Cayleys": "ℭ",
		"ccaps": "⩍",
		"Ccaron": "Č",
		"ccaron": "č",
		"Ccedil": "Ç",
		"ccedil": "ç",
		"Ccirc": "Ĉ",
		"ccirc": "ĉ",
		"Cconint": "∰",
		"ccups": "⩌",
		"ccupssm": "⩐",
		"Cdot": "Ċ",
		"cdot": "ċ",
		"cedil": "¸",
		"Cedilla": "¸",
		"cemptyv": "⦲",
		"cent": "¢",
		"centerdot": "·",
		"CenterDot": "·",
		"cfr": "𝔠",
		"Cfr": "ℭ",
		"CHcy": "Ч",
		"chcy": "ч",
		"check": "✓",
		"checkmark": "✓",
		"Chi": "Χ",
		"chi": "χ",
		"circ": "ˆ",
		"circeq": "≗",
		"circlearrowleft": "↺",
		"circlearrowright": "↻",
		"circledast": "⊛",
		"circledcirc": "⊚",
		"circleddash": "⊝",
		"CircleDot": "⊙",
		"circledR": "®",
		"circledS": "Ⓢ",
		"CircleMinus": "⊖",
		"CirclePlus": "⊕",
		"CircleTimes": "⊗",
		"cir": "○",
		"cirE": "⧃",
		"cire": "≗",
		"cirfnint": "⨐",
		"cirmid": "⫯",
		"cirscir": "⧂",
		"ClockwiseContourIntegral": "∲",
		"CloseCurlyDoubleQuote": "”",
		"CloseCurlyQuote": "’",
		"clubs": "♣",
		"clubsuit": "♣",
		"colon": ":",
		"Colon": "∷",
		"Colone": "⩴",
		"colone": "≔",
		"coloneq": "≔",
		"comma": ",",
		"commat": "@",
		"comp": "∁",
		"compfn": "∘",
		"complement": "∁",
		"complexes": "ℂ",
		"cong": "≅",
		"congdot": "⩭",
		"Congruent": "≡",
		"conint": "∮",
		"Conint": "∯",
		"ContourIntegral": "∮",
		"copf": "𝕔",
		"Copf": "ℂ",
		"coprod": "∐",
		"Coproduct": "∐",
		"copy": "©",
		"COPY": "©",
		"copysr": "℗",
		"CounterClockwiseContourIntegral": "∳",
		"crarr": "↵",
		"cross": "✗",
		"Cross": "⨯",
		"Cscr": "𝒞",
		"cscr": "𝒸",
		"csub": "⫏",
		"csube": "⫑",
		"csup": "⫐",
		"csupe": "⫒",
		"ctdot": "⋯",
		"cudarrl": "⤸",
		"cudarrr": "⤵",
		"cuepr": "⋞",
		"cuesc": "⋟",
		"cularr": "↶",
		"cularrp": "⤽",
		"cupbrcap": "⩈",
		"cupcap": "⩆",
		"CupCap": "≍",
		"cup": "∪",
		"Cup": "⋓",
		"cupcup": "⩊",
		"cupdot": "⊍",
		"cupor": "⩅",
		"cups": "∪︀",
		"curarr": "↷",
		"curarrm": "⤼",
		"curlyeqprec": "⋞",
		"curlyeqsucc": "⋟",
		"curlyvee": "⋎",
		"curlywedge": "⋏",
		"curren": "¤",
		"curvearrowleft": "↶",
		"curvearrowright": "↷",
		"cuvee": "⋎",
		"cuwed": "⋏",
		"cwconint": "∲",
		"cwint": "∱",
		"cylcty": "⌭",
		"dagger": "†",
		"Dagger": "‡",
		"daleth": "ℸ",
		"darr": "↓",
		"Darr": "↡",
		"dArr": "⇓",
		"dash": "‐",
		"Dashv": "⫤",
		"dashv": "⊣",
		"dbkarow": "⤏",
		"dblac": "˝",
		"Dcaron": "Ď",
		"dcaron": "ď",
		"Dcy": "Д",
		"dcy": "д",
		"ddagger": "‡",
		"ddarr": "⇊",
		"DD": "ⅅ",
		"dd": "ⅆ",
		"DDotrahd": "⤑",
		"ddotseq": "⩷",
		"deg": "°",
		"Del": "∇",
		"Delta": "Δ",
		"delta": "δ",
		"demptyv": "⦱",
		"dfisht": "⥿",
		"Dfr": "𝔇",
		"dfr": "𝔡",
		"dHar": "⥥",
		"dharl": "⇃",
		"dharr": "⇂",
		"DiacriticalAcute": "´",
		"DiacriticalDot": "˙",
		"DiacriticalDoubleAcute": "˝",
		"DiacriticalGrave": "`",
		"DiacriticalTilde": "˜",
		"diam": "⋄",
		"diamond": "⋄",
		"Diamond": "⋄",
		"diamondsuit": "♦",
		"diams": "♦",
		"die": "¨",
		"DifferentialD": "ⅆ",
		"digamma": "ϝ",
		"disin": "⋲",
		"div": "÷",
		"divide": "÷",
		"divideontimes": "⋇",
		"divonx": "⋇",
		"DJcy": "Ђ",
		"djcy": "ђ",
		"dlcorn": "⌞",
		"dlcrop": "⌍",
		"dollar": "$",
		"Dopf": "𝔻",
		"dopf": "𝕕",
		"Dot": "¨",
		"dot": "˙",
		"DotDot": "⃜",
		"doteq": "≐",
		"doteqdot": "≑",
		"DotEqual": "≐",
		"dotminus": "∸",
		"dotplus": "∔",
		"dotsquare": "⊡",
		"doublebarwedge": "⌆",
		"DoubleContourIntegral": "∯",
		"DoubleDot": "¨",
		"DoubleDownArrow": "⇓",
		"DoubleLeftArrow": "⇐",
		"DoubleLeftRightArrow": "⇔",
		"DoubleLeftTee": "⫤",
		"DoubleLongLeftArrow": "⟸",
		"DoubleLongLeftRightArrow": "⟺",
		"DoubleLongRightArrow": "⟹",
		"DoubleRightArrow": "⇒",
		"DoubleRightTee": "⊨",
		"DoubleUpArrow": "⇑",
		"DoubleUpDownArrow": "⇕",
		"DoubleVerticalBar": "∥",
		"DownArrowBar": "⤓",
		"downarrow": "↓",
		"DownArrow": "↓",
		"Downarrow": "⇓",
		"DownArrowUpArrow": "⇵",
		"DownBreve": "̑",
		"downdownarrows": "⇊",
		"downharpoonleft": "⇃",
		"downharpoonright": "⇂",
		"DownLeftRightVector": "⥐",
		"DownLeftTeeVector": "⥞",
		"DownLeftVectorBar": "⥖",
		"DownLeftVector": "↽",
		"DownRightTeeVector": "⥟",
		"DownRightVectorBar": "⥗",
		"DownRightVector": "⇁",
		"DownTeeArrow": "↧",
		"DownTee": "⊤",
		"drbkarow": "⤐",
		"drcorn": "⌟",
		"drcrop": "⌌",
		"Dscr": "𝒟",
		"dscr": "𝒹",
		"DScy": "Ѕ",
		"dscy": "ѕ",
		"dsol": "⧶",
		"Dstrok": "Đ",
		"dstrok": "đ",
		"dtdot": "⋱",
		"dtri": "▿",
		"dtrif": "▾",
		"duarr": "⇵",
		"duhar": "⥯",
		"dwangle": "⦦",
		"DZcy": "Џ",
		"dzcy": "џ",
		"dzigrarr": "⟿",
		"Eacute": "É",
		"eacute": "é",
		"easter": "⩮",
		"Ecaron": "Ě",
		"ecaron": "ě",
		"Ecirc": "Ê",
		"ecirc": "ê",
		"ecir": "≖",
		"ecolon": "≕",
		"Ecy": "Э",
		"ecy": "э",
		"eDDot": "⩷",
		"Edot": "Ė",
		"edot": "ė",
		"eDot": "≑",
		"ee": "ⅇ",
		"efDot": "≒",
		"Efr": "𝔈",
		"efr": "𝔢",
		"eg": "⪚",
		"Egrave": "È",
		"egrave": "è",
		"egs": "⪖",
		"egsdot": "⪘",
		"el": "⪙",
		"Element": "∈",
		"elinters": "⏧",
		"ell": "ℓ",
		"els": "⪕",
		"elsdot": "⪗",
		"Emacr": "Ē",
		"emacr": "ē",
		"empty": "∅",
		"emptyset": "∅",
		"EmptySmallSquare": "◻",
		"emptyv": "∅",
		"EmptyVerySmallSquare": "▫",
		"emsp13": " ",
		"emsp14": " ",
		"emsp": " ",
		"ENG": "Ŋ",
		"eng": "ŋ",
		"ensp": " ",
		"Eogon": "Ę",
		"eogon": "ę",
		"Eopf": "𝔼",
		"eopf": "𝕖",
		"epar": "⋕",
		"eparsl": "⧣",
		"eplus": "⩱",
		"epsi": "ε",
		"Epsilon": "Ε",
		"epsilon": "ε",
		"epsiv": "ϵ",
		"eqcirc": "≖",
		"eqcolon": "≕",
		"eqsim": "≂",
		"eqslantgtr": "⪖",
		"eqslantless": "⪕",
		"Equal": "⩵",
		"equals": "=",
		"EqualTilde": "≂",
		"equest": "≟",
		"Equilibrium": "⇌",
		"equiv": "≡",
		"equivDD": "⩸",
		"eqvparsl": "⧥",
		"erarr": "⥱",
		"erDot": "≓",
		"escr": "ℯ",
		"Escr": "ℰ",
		"esdot": "≐",
		"Esim": "⩳",
		"esim": "≂",
		"Eta": "Η",
		"eta": "η",
		"ETH": "Ð",
		"eth": "ð",
		"Euml": "Ë",
		"euml": "ë",
		"euro": "€",
		"excl": "!",
		"exist": "∃",
		"Exists": "∃",
		"expectation": "ℰ",
		"exponentiale": "ⅇ",
		"ExponentialE": "ⅇ",
		"fallingdotseq": "≒",
		"Fcy": "Ф",
		"fcy": "ф",
		"female": "♀",
		"ffilig": "ﬃ",
		"fflig": "ﬀ",
		"ffllig": "ﬄ",
		"Ffr": "𝔉",
		"ffr": "𝔣",
		"filig": "ﬁ",
		"FilledSmallSquare": "◼",
		"FilledVerySmallSquare": "▪",
		"fjlig": "fj",
		"flat": "♭",
		"fllig": "ﬂ",
		"fltns": "▱",
		"fnof": "ƒ",
		"Fopf": "𝔽",
		"fopf": "𝕗",
		"forall": "∀",
		"ForAll": "∀",
		"fork": "⋔",
		"forkv": "⫙",
		"Fouriertrf": "ℱ",
		"fpartint": "⨍",
		"frac12": "½",
		"frac13": "⅓",
		"frac14": "¼",
		"frac15": "⅕",
		"frac16": "⅙",
		"frac18": "⅛",
		"frac23": "⅔",
		"frac25": "⅖",
		"frac34": "¾",
		"frac35": "⅗",
		"frac38": "⅜",
		"frac45": "⅘",
		"frac56": "⅚",
		"frac58": "⅝",
		"frac78": "⅞",
		"frasl": "⁄",
		"frown": "⌢",
		"fscr": "𝒻",
		"Fscr": "ℱ",
		"gacute": "ǵ",
		"Gamma": "Γ",
		"gamma": "γ",
		"Gammad": "Ϝ",
		"gammad": "ϝ",
		"gap": "⪆",
		"Gbreve": "Ğ",
		"gbreve": "ğ",
		"Gcedil": "Ģ",
		"Gcirc": "Ĝ",
		"gcirc": "ĝ",
		"Gcy": "Г",
		"gcy": "г",
		"Gdot": "Ġ",
		"gdot": "ġ",
		"ge": "≥",
		"gE": "≧",
		"gEl": "⪌",
		"gel": "⋛",
		"geq": "≥",
		"geqq": "≧",
		"geqslant": "⩾",
		"gescc": "⪩",
		"ges": "⩾",
		"gesdot": "⪀",
		"gesdoto": "⪂",
		"gesdotol": "⪄",
		"gesl": "⋛︀",
		"gesles": "⪔",
		"Gfr": "𝔊",
		"gfr": "𝔤",
		"gg": "≫",
		"Gg": "⋙",
		"ggg": "⋙",
		"gimel": "ℷ",
		"GJcy": "Ѓ",
		"gjcy": "ѓ",
		"gla": "⪥",
		"gl": "≷",
		"glE": "⪒",
		"glj": "⪤",
		"gnap": "⪊",
		"gnapprox": "⪊",
		"gne": "⪈",
		"gnE": "≩",
		"gneq": "⪈",
		"gneqq": "≩",
		"gnsim": "⋧",
		"Gopf": "𝔾",
		"gopf": "𝕘",
		"grave": "`",
		"GreaterEqual": "≥",
		"GreaterEqualLess": "⋛",
		"GreaterFullEqual": "≧",
		"GreaterGreater": "⪢",
		"GreaterLess": "≷",
		"GreaterSlantEqual": "⩾",
		"GreaterTilde": "≳",
		"Gscr": "𝒢",
		"gscr": "ℊ",
		"gsim": "≳",
		"gsime": "⪎",
		"gsiml": "⪐",
		"gtcc": "⪧",
		"gtcir": "⩺",
		"gt": ">",
		"GT": ">",
		"Gt": "≫",
		"gtdot": "⋗",
		"gtlPar": "⦕",
		"gtquest": "⩼",
		"gtrapprox": "⪆",
		"gtrarr": "⥸",
		"gtrdot": "⋗",
		"gtreqless": "⋛",
		"gtreqqless": "⪌",
		"gtrless": "≷",
		"gtrsim": "≳",
		"gvertneqq": "≩︀",
		"gvnE": "≩︀",
		"Hacek": "ˇ",
		"hairsp": " ",
		"half": "½",
		"hamilt": "ℋ",
		"HARDcy": "Ъ",
		"hardcy": "ъ",
		"harrcir": "⥈",
		"harr": "↔",
		"hArr": "⇔",
		"harrw": "↭",
		"Hat": "^",
		"hbar": "ℏ",
		"Hcirc": "Ĥ",
		"hcirc": "ĥ",
		"hearts": "♥",
		"heartsuit": "♥",
		"hellip": "…",
		"hercon": "⊹",
		"hfr": "𝔥",
		"Hfr": "ℌ",
		"HilbertSpace": "ℋ",
		"hksearow": "⤥",
		"hkswarow": "⤦",
		"hoarr": "⇿",
		"homtht": "∻",
		"hookleftarrow": "↩",
		"hookrightarrow": "↪",
		"hopf": "𝕙",
		"Hopf": "ℍ",
		"horbar": "―",
		"HorizontalLine": "─",
		"hscr": "𝒽",
		"Hscr": "ℋ",
		"hslash": "ℏ",
		"Hstrok": "Ħ",
		"hstrok": "ħ",
		"HumpDownHump": "≎",
		"HumpEqual": "≏",
		"hybull": "⁃",
		"hyphen": "‐",
		"Iacute": "Í",
		"iacute": "í",
		"ic": "⁣",
		"Icirc": "Î",
		"icirc": "î",
		"Icy": "И",
		"icy": "и",
		"Idot": "İ",
		"IEcy": "Е",
		"iecy": "е",
		"iexcl": "¡",
		"iff": "⇔",
		"ifr": "𝔦",
		"Ifr": "ℑ",
		"Igrave": "Ì",
		"igrave": "ì",
		"ii": "ⅈ",
		"iiiint": "⨌",
		"iiint": "∭",
		"iinfin": "⧜",
		"iiota": "℩",
		"IJlig": "Ĳ",
		"ijlig": "ĳ",
		"Imacr": "Ī",
		"imacr": "ī",
		"image": "ℑ",
		"ImaginaryI": "ⅈ",
		"imagline": "ℐ",
		"imagpart": "ℑ",
		"imath": "ı",
		"Im": "ℑ",
		"imof": "⊷",
		"imped": "Ƶ",
		"Implies": "⇒",
		"incare": "℅",
		"in": "∈",
		"infin": "∞",
		"infintie": "⧝",
		"inodot": "ı",
		"intcal": "⊺",
		"int": "∫",
		"Int": "∬",
		"integers": "ℤ",
		"Integral": "∫",
		"intercal": "⊺",
		"Intersection": "⋂",
		"intlarhk": "⨗",
		"intprod": "⨼",
		"InvisibleComma": "⁣",
		"InvisibleTimes": "⁢",
		"IOcy": "Ё",
		"iocy": "ё",
		"Iogon": "Į",
		"iogon": "į",
		"Iopf": "𝕀",
		"iopf": "𝕚",
		"Iota": "Ι",
		"iota": "ι",
		"iprod": "⨼",
		"iquest": "¿",
		"iscr": "𝒾",
		"Iscr": "ℐ",
		"isin": "∈",
		"isindot": "⋵",
		"isinE": "⋹",
		"isins": "⋴",
		"isinsv": "⋳",
		"isinv": "∈",
		"it": "⁢",
		"Itilde": "Ĩ",
		"itilde": "ĩ",
		"Iukcy": "І",
		"iukcy": "і",
		"Iuml": "Ï",
		"iuml": "ï",
		"Jcirc": "Ĵ",
		"jcirc": "ĵ",
		"Jcy": "Й",
		"jcy": "й",
		"Jfr": "𝔍",
		"jfr": "𝔧",
		"jmath": "ȷ",
		"Jopf": "𝕁",
		"jopf": "𝕛",
		"Jscr": "𝒥",
		"jscr": "𝒿",
		"Jsercy": "Ј",
		"jsercy": "ј",
		"Jukcy": "Є",
		"jukcy": "є",
		"Kappa": "Κ",
		"kappa": "κ",
		"kappav": "ϰ",
		"Kcedil": "Ķ",
		"kcedil": "ķ",
		"Kcy": "К",
		"kcy": "к",
		"Kfr": "𝔎",
		"kfr": "𝔨",
		"kgreen": "ĸ",
		"KHcy": "Х",
		"khcy": "х",
		"KJcy": "Ќ",
		"kjcy": "ќ",
		"Kopf": "𝕂",
		"kopf": "𝕜",
		"Kscr": "𝒦",
		"kscr": "𝓀",
		"lAarr": "⇚",
		"Lacute": "Ĺ",
		"lacute": "ĺ",
		"laemptyv": "⦴",
		"lagran": "ℒ",
		"Lambda": "Λ",
		"lambda": "λ",
		"lang": "⟨",
		"Lang": "⟪",
		"langd": "⦑",
		"langle": "⟨",
		"lap": "⪅",
		"Laplacetrf": "ℒ",
		"laquo": "«",
		"larrb": "⇤",
		"larrbfs": "⤟",
		"larr": "←",
		"Larr": "↞",
		"lArr": "⇐",
		"larrfs": "⤝",
		"larrhk": "↩",
		"larrlp": "↫",
		"larrpl": "⤹",
		"larrsim": "⥳",
		"larrtl": "↢",
		"latail": "⤙",
		"lAtail": "⤛",
		"lat": "⪫",
		"late": "⪭",
		"lates": "⪭︀",
		"lbarr": "⤌",
		"lBarr": "⤎",
		"lbbrk": "❲",
		"lbrace": "{",
		"lbrack": "[",
		"lbrke": "⦋",
		"lbrksld": "⦏",
		"lbrkslu": "⦍",
		"Lcaron": "Ľ",
		"lcaron": "ľ",
		"Lcedil": "Ļ",
		"lcedil": "ļ",
		"lceil": "⌈",
		"lcub": "{",
		"Lcy": "Л",
		"lcy": "л",
		"ldca": "⤶",
		"ldquo": "“",
		"ldquor": "„",
		"ldrdhar": "⥧",
		"ldrushar": "⥋",
		"ldsh": "↲",
		"le": "≤",
		"lE": "≦",
		"LeftAngleBracket": "⟨",
		"LeftArrowBar": "⇤",
		"leftarrow": "←",
		"LeftArrow": "←",
		"Leftarrow": "⇐",
		"LeftArrowRightArrow": "⇆",
		"leftarrowtail": "↢",
		"LeftCeiling": "⌈",
		"LeftDoubleBracket": "⟦",
		"LeftDownTeeVector": "⥡",
		"LeftDownVectorBar": "⥙",
		"LeftDownVector": "⇃",
		"LeftFloor": "⌊",
		"leftharpoondown": "↽",
		"leftharpoonup": "↼",
		"leftleftarrows": "⇇",
		"leftrightarrow": "↔",
		"LeftRightArrow": "↔",
		"Leftrightarrow": "⇔",
		"leftrightarrows": "⇆",
		"leftrightharpoons": "⇋",
		"leftrightsquigarrow": "↭",
		"LeftRightVector": "⥎",
		"LeftTeeArrow": "↤",
		"LeftTee": "⊣",
		"LeftTeeVector": "⥚",
		"leftthreetimes": "⋋",
		"LeftTriangleBar": "⧏",
		"LeftTriangle": "⊲",
		"LeftTriangleEqual": "⊴",
		"LeftUpDownVector": "⥑",
		"LeftUpTeeVector": "⥠",
		"LeftUpVectorBar": "⥘",
		"LeftUpVector": "↿",
		"LeftVectorBar": "⥒",
		"LeftVector": "↼",
		"lEg": "⪋",
		"leg": "⋚",
		"leq": "≤",
		"leqq": "≦",
		"leqslant": "⩽",
		"lescc": "⪨",
		"les": "⩽",
		"lesdot": "⩿",
		"lesdoto": "⪁",
		"lesdotor": "⪃",
		"lesg": "⋚︀",
		"lesges": "⪓",
		"lessapprox": "⪅",
		"lessdot": "⋖",
		"lesseqgtr": "⋚",
		"lesseqqgtr": "⪋",
		"LessEqualGreater": "⋚",
		"LessFullEqual": "≦",
		"LessGreater": "≶",
		"lessgtr": "≶",
		"LessLess": "⪡",
		"lesssim": "≲",
		"LessSlantEqual": "⩽",
		"LessTilde": "≲",
		"lfisht": "⥼",
		"lfloor": "⌊",
		"Lfr": "𝔏",
		"lfr": "𝔩",
		"lg": "≶",
		"lgE": "⪑",
		"lHar": "⥢",
		"lhard": "↽",
		"lharu": "↼",
		"lharul": "⥪",
		"lhblk": "▄",
		"LJcy": "Љ",
		"ljcy": "љ",
		"llarr": "⇇",
		"ll": "≪",
		"Ll": "⋘",
		"llcorner": "⌞",
		"Lleftarrow": "⇚",
		"llhard": "⥫",
		"lltri": "◺",
		"Lmidot": "Ŀ",
		"lmidot": "ŀ",
		"lmoustache": "⎰",
		"lmoust": "⎰",
		"lnap": "⪉",
		"lnapprox": "⪉",
		"lne": "⪇",
		"lnE": "≨",
		"lneq": "⪇",
		"lneqq": "≨",
		"lnsim": "⋦",
		"loang": "⟬",
		"loarr": "⇽",
		"lobrk": "⟦",
		"longleftarrow": "⟵",
		"LongLeftArrow": "⟵",
		"Longleftarrow": "⟸",
		"longleftrightarrow": "⟷",
		"LongLeftRightArrow": "⟷",
		"Longleftrightarrow": "⟺",
		"longmapsto": "⟼",
		"longrightarrow": "⟶",
		"LongRightArrow": "⟶",
		"Longrightarrow": "⟹",
		"looparrowleft": "↫",
		"looparrowright": "↬",
		"lopar": "⦅",
		"Lopf": "𝕃",
		"lopf": "𝕝",
		"loplus": "⨭",
		"lotimes": "⨴",
		"lowast": "∗",
		"lowbar": "_",
		"LowerLeftArrow": "↙",
		"LowerRightArrow": "↘",
		"loz": "◊",
		"lozenge": "◊",
		"lozf": "⧫",
		"lpar": "(",
		"lparlt": "⦓",
		"lrarr": "⇆",
		"lrcorner": "⌟",
		"lrhar": "⇋",
		"lrhard": "⥭",
		"lrm": "‎",
		"lrtri": "⊿",
		"lsaquo": "‹",
		"lscr": "𝓁",
		"Lscr": "ℒ",
		"lsh": "↰",
		"Lsh": "↰",
		"lsim": "≲",
		"lsime": "⪍",
		"lsimg": "⪏",
		"lsqb": "[",
		"lsquo": "‘",
		"lsquor": "‚",
		"Lstrok": "Ł",
		"lstrok": "ł",
		"ltcc": "⪦",
		"ltcir": "⩹",
		"lt": "<",
		"LT": "<",
		"Lt": "≪",
		"ltdot": "⋖",
		"lthree": "⋋",
		"ltimes": "⋉",
		"ltlarr": "⥶",
		"ltquest": "⩻",
		"ltri": "◃",
		"ltrie": "⊴",
		"ltrif": "◂",
		"ltrPar": "⦖",
		"lurdshar": "⥊",
		"luruhar": "⥦",
		"lvertneqq": "≨︀",
		"lvnE": "≨︀",
		"macr": "¯",
		"male": "♂",
		"malt": "✠",
		"maltese": "✠",
		"Map": "⤅",
		"map": "↦",
		"mapsto": "↦",
		"mapstodown": "↧",
		"mapstoleft": "↤",
		"mapstoup": "↥",
		"marker": "▮",
		"mcomma": "⨩",
		"Mcy": "М",
		"mcy": "м",
		"mdash": "—",
		"mDDot": "∺",
		"measuredangle": "∡",
		"MediumSpace": " ",
		"Mellintrf": "ℳ",
		"Mfr": "𝔐",
		"mfr": "𝔪",
		"mho": "℧",
		"micro": "µ",
		"midast": "*",
		"midcir": "⫰",
		"mid": "∣",
		"middot": "·",
		"minusb": "⊟",
		"minus": "−",
		"minusd": "∸",
		"minusdu": "⨪",
		"MinusPlus": "∓",
		"mlcp": "⫛",
		"mldr": "…",
		"mnplus": "∓",
		"models": "⊧",
		"Mopf": "𝕄",
		"mopf": "𝕞",
		"mp": "∓",
		"mscr": "𝓂",
		"Mscr": "ℳ",
		"mstpos": "∾",
		"Mu": "Μ",
		"mu": "μ",
		"multimap": "⊸",
		"mumap": "⊸",
		"nabla": "∇",
		"Nacute": "Ń",
		"nacute": "ń",
		"nang": "∠⃒",
		"nap": "≉",
		"napE": "⩰̸",
		"napid": "≋̸",
		"napos": "ŉ",
		"napprox": "≉",
		"natural": "♮",
		"naturals": "ℕ",
		"natur": "♮",
		"nbsp": " ",
		"nbump": "≎̸",
		"nbumpe": "≏̸",
		"ncap": "⩃",
		"Ncaron": "Ň",
		"ncaron": "ň",
		"Ncedil": "Ņ",
		"ncedil": "ņ",
		"ncong": "≇",
		"ncongdot": "⩭̸",
		"ncup": "⩂",
		"Ncy": "Н",
		"ncy": "н",
		"ndash": "–",
		"nearhk": "⤤",
		"nearr": "↗",
		"neArr": "⇗",
		"nearrow": "↗",
		"ne": "≠",
		"nedot": "≐̸",
		"NegativeMediumSpace": "​",
		"NegativeThickSpace": "​",
		"NegativeThinSpace": "​",
		"NegativeVeryThinSpace": "​",
		"nequiv": "≢",
		"nesear": "⤨",
		"nesim": "≂̸",
		"NestedGreaterGreater": "≫",
		"NestedLessLess": "≪",
		"NewLine": "\n",
		"nexist": "∄",
		"nexists": "∄",
		"Nfr": "𝔑",
		"nfr": "𝔫",
		"ngE": "≧̸",
		"nge": "≱",
		"ngeq": "≱",
		"ngeqq": "≧̸",
		"ngeqslant": "⩾̸",
		"nges": "⩾̸",
		"nGg": "⋙̸",
		"ngsim": "≵",
		"nGt": "≫⃒",
		"ngt": "≯",
		"ngtr": "≯",
		"nGtv": "≫̸",
		"nharr": "↮",
		"nhArr": "⇎",
		"nhpar": "⫲",
		"ni": "∋",
		"nis": "⋼",
		"nisd": "⋺",
		"niv": "∋",
		"NJcy": "Њ",
		"njcy": "њ",
		"nlarr": "↚",
		"nlArr": "⇍",
		"nldr": "‥",
		"nlE": "≦̸",
		"nle": "≰",
		"nleftarrow": "↚",
		"nLeftarrow": "⇍",
		"nleftrightarrow": "↮",
		"nLeftrightarrow": "⇎",
		"nleq": "≰",
		"nleqq": "≦̸",
		"nleqslant": "⩽̸",
		"nles": "⩽̸",
		"nless": "≮",
		"nLl": "⋘̸",
		"nlsim": "≴",
		"nLt": "≪⃒",
		"nlt": "≮",
		"nltri": "⋪",
		"nltrie": "⋬",
		"nLtv": "≪̸",
		"nmid": "∤",
		"NoBreak": "⁠",
		"NonBreakingSpace": " ",
		"nopf": "𝕟",
		"Nopf": "ℕ",
		"Not": "⫬",
		"not": "¬",
		"NotCongruent": "≢",
		"NotCupCap": "≭",
		"NotDoubleVerticalBar": "∦",
		"NotElement": "∉",
		"NotEqual": "≠",
		"NotEqualTilde": "≂̸",
		"NotExists": "∄",
		"NotGreater": "≯",
		"NotGreaterEqual": "≱",
		"NotGreaterFullEqual": "≧̸",
		"NotGreaterGreater": "≫̸",
		"NotGreaterLess": "≹",
		"NotGreaterSlantEqual": "⩾̸",
		"NotGreaterTilde": "≵",
		"NotHumpDownHump": "≎̸",
		"NotHumpEqual": "≏̸",
		"notin": "∉",
		"notindot": "⋵̸",
		"notinE": "⋹̸",
		"notinva": "∉",
		"notinvb": "⋷",
		"notinvc": "⋶",
		"NotLeftTriangleBar": "⧏̸",
		"NotLeftTriangle": "⋪",
		"NotLeftTriangleEqual": "⋬",
		"NotLess": "≮",
		"NotLessEqual": "≰",
		"NotLessGreater": "≸",
		"NotLessLess": "≪̸",
		"NotLessSlantEqual": "⩽̸",
		"NotLessTilde": "≴",
		"NotNestedGreaterGreater": "⪢̸",
		"NotNestedLessLess": "⪡̸",
		"notni": "∌",
		"notniva": "∌",
		"notnivb": "⋾",
		"notnivc": "⋽",
		"NotPrecedes": "⊀",
		"NotPrecedesEqual": "⪯̸",
		"NotPrecedesSlantEqual": "⋠",
		"NotReverseElement": "∌",
		"NotRightTriangleBar": "⧐̸",
		"NotRightTriangle": "⋫",
		"NotRightTriangleEqual": "⋭",
		"NotSquareSubset": "⊏̸",
		"NotSquareSubsetEqual": "⋢",
		"NotSquareSuperset": "⊐̸",
		"NotSquareSupersetEqual": "⋣",
		"NotSubset": "⊂⃒",
		"NotSubsetEqual": "⊈",
		"NotSucceeds": "⊁",
		"NotSucceedsEqual": "⪰̸",
		"NotSucceedsSlantEqual": "⋡",
		"NotSucceedsTilde": "≿̸",
		"NotSuperset": "⊃⃒",
		"NotSupersetEqual": "⊉",
		"NotTilde": "≁",
		"NotTildeEqual": "≄",
		"NotTildeFullEqual": "≇",
		"NotTildeTilde": "≉",
		"NotVerticalBar": "∤",
		"nparallel": "∦",
		"npar": "∦",
		"nparsl": "⫽⃥",
		"npart": "∂̸",
		"npolint": "⨔",
		"npr": "⊀",
		"nprcue": "⋠",
		"nprec": "⊀",
		"npreceq": "⪯̸",
		"npre": "⪯̸",
		"nrarrc": "⤳̸",
		"nrarr": "↛",
		"nrArr": "⇏",
		"nrarrw": "↝̸",
		"nrightarrow": "↛",
		"nRightarrow": "⇏",
		"nrtri": "⋫",
		"nrtrie": "⋭",
		"nsc": "⊁",
		"nsccue": "⋡",
		"nsce": "⪰̸",
		"Nscr": "𝒩",
		"nscr": "𝓃",
		"nshortmid": "∤",
		"nshortparallel": "∦",
		"nsim": "≁",
		"nsime": "≄",
		"nsimeq": "≄",
		"nsmid": "∤",
		"nspar": "∦",
		"nsqsube": "⋢",
		"nsqsupe": "⋣",
		"nsub": "⊄",
		"nsubE": "⫅̸",
		"nsube": "⊈",
		"nsubset": "⊂⃒",
		"nsubseteq": "⊈",
		"nsubseteqq": "⫅̸",
		"nsucc": "⊁",
		"nsucceq": "⪰̸",
		"nsup": "⊅",
		"nsupE": "⫆̸",
		"nsupe": "⊉",
		"nsupset": "⊃⃒",
		"nsupseteq": "⊉",
		"nsupseteqq": "⫆̸",
		"ntgl": "≹",
		"Ntilde": "Ñ",
		"ntilde": "ñ",
		"ntlg": "≸",
		"ntriangleleft": "⋪",
		"ntrianglelefteq": "⋬",
		"ntriangleright": "⋫",
		"ntrianglerighteq": "⋭",
		"Nu": "Ν",
		"nu": "ν",
		"num": "#",
		"numero": "№",
		"numsp": " ",
		"nvap": "≍⃒",
		"nvdash": "⊬",
		"nvDash": "⊭",
		"nVdash": "⊮",
		"nVDash": "⊯",
		"nvge": "≥⃒",
		"nvgt": ">⃒",
		"nvHarr": "⤄",
		"nvinfin": "⧞",
		"nvlArr": "⤂",
		"nvle": "≤⃒",
		"nvlt": "<⃒",
		"nvltrie": "⊴⃒",
		"nvrArr": "⤃",
		"nvrtrie": "⊵⃒",
		"nvsim": "∼⃒",
		"nwarhk": "⤣",
		"nwarr": "↖",
		"nwArr": "⇖",
		"nwarrow": "↖",
		"nwnear": "⤧",
		"Oacute": "Ó",
		"oacute": "ó",
		"oast": "⊛",
		"Ocirc": "Ô",
		"ocirc": "ô",
		"ocir": "⊚",
		"Ocy": "О",
		"ocy": "о",
		"odash": "⊝",
		"Odblac": "Ő",
		"odblac": "ő",
		"odiv": "⨸",
		"odot": "⊙",
		"odsold": "⦼",
		"OElig": "Œ",
		"oelig": "œ",
		"ofcir": "⦿",
		"Ofr": "𝔒",
		"ofr": "𝔬",
		"ogon": "˛",
		"Ograve": "Ò",
		"ograve": "ò",
		"ogt": "⧁",
		"ohbar": "⦵",
		"ohm": "Ω",
		"oint": "∮",
		"olarr": "↺",
		"olcir": "⦾",
		"olcross": "⦻",
		"oline": "‾",
		"olt": "⧀",
		"Omacr": "Ō",
		"omacr": "ō",
		"Omega": "Ω",
		"omega": "ω",
		"Omicron": "Ο",
		"omicron": "ο",
		"omid": "⦶",
		"ominus": "⊖",
		"Oopf": "𝕆",
		"oopf": "𝕠",
		"opar": "⦷",
		"OpenCurlyDoubleQuote": "“",
		"OpenCurlyQuote": "‘",
		"operp": "⦹",
		"oplus": "⊕",
		"orarr": "↻",
		"Or": "⩔",
		"or": "∨",
		"ord": "⩝",
		"order": "ℴ",
		"orderof": "ℴ",
		"ordf": "ª",
		"ordm": "º",
		"origof": "⊶",
		"oror": "⩖",
		"orslope": "⩗",
		"orv": "⩛",
		"oS": "Ⓢ",
		"Oscr": "𝒪",
		"oscr": "ℴ",
		"Oslash": "Ø",
		"oslash": "ø",
		"osol": "⊘",
		"Otilde": "Õ",
		"otilde": "õ",
		"otimesas": "⨶",
		"Otimes": "⨷",
		"otimes": "⊗",
		"Ouml": "Ö",
		"ouml": "ö",
		"ovbar": "⌽",
		"OverBar": "‾",
		"OverBrace": "⏞",
		"OverBracket": "⎴",
		"OverParenthesis": "⏜",
		"para": "¶",
		"parallel": "∥",
		"par": "∥",
		"parsim": "⫳",
		"parsl": "⫽",
		"part": "∂",
		"PartialD": "∂",
		"Pcy": "П",
		"pcy": "п",
		"percnt": "%",
		"period": ".",
		"permil": "‰",
		"perp": "⊥",
		"pertenk": "‱",
		"Pfr": "𝔓",
		"pfr": "𝔭",
		"Phi": "Φ",
		"phi": "φ",
		"phiv": "ϕ",
		"phmmat": "ℳ",
		"phone": "☎",
		"Pi": "Π",
		"pi": "π",
		"pitchfork": "⋔",
		"piv": "ϖ",
		"planck": "ℏ",
		"planckh": "ℎ",
		"plankv": "ℏ",
		"plusacir": "⨣",
		"plusb": "⊞",
		"pluscir": "⨢",
		"plus": "+",
		"plusdo": "∔",
		"plusdu": "⨥",
		"pluse": "⩲",
		"PlusMinus": "±",
		"plusmn": "±",
		"plussim": "⨦",
		"plustwo": "⨧",
		"pm": "±",
		"Poincareplane": "ℌ",
		"pointint": "⨕",
		"popf": "𝕡",
		"Popf": "ℙ",
		"pound": "£",
		"prap": "⪷",
		"Pr": "⪻",
		"pr": "≺",
		"prcue": "≼",
		"precapprox": "⪷",
		"prec": "≺",
		"preccurlyeq": "≼",
		"Precedes": "≺",
		"PrecedesEqual": "⪯",
		"PrecedesSlantEqual": "≼",
		"PrecedesTilde": "≾",
		"preceq": "⪯",
		"precnapprox": "⪹",
		"precneqq": "⪵",
		"precnsim": "⋨",
		"pre": "⪯",
		"prE": "⪳",
		"precsim": "≾",
		"prime": "′",
		"Prime": "″",
		"primes": "ℙ",
		"prnap": "⪹",
		"prnE": "⪵",
		"prnsim": "⋨",
		"prod": "∏",
		"Product": "∏",
		"profalar": "⌮",
		"profline": "⌒",
		"profsurf": "⌓",
		"prop": "∝",
		"Proportional": "∝",
		"Proportion": "∷",
		"propto": "∝",
		"prsim": "≾",
		"prurel": "⊰",
		"Pscr": "𝒫",
		"pscr": "𝓅",
		"Psi": "Ψ",
		"psi": "ψ",
		"puncsp": " ",
		"Qfr": "𝔔",
		"qfr": "𝔮",
		"qint": "⨌",
		"qopf": "𝕢",
		"Qopf": "ℚ",
		"qprime": "⁗",
		"Qscr": "𝒬",
		"qscr": "𝓆",
		"quaternions": "ℍ",
		"quatint": "⨖",
		"quest": "?",
		"questeq": "≟",
		"quot": "\"",
		"QUOT": "\"",
		"rAarr": "⇛",
		"race": "∽̱",
		"Racute": "Ŕ",
		"racute": "ŕ",
		"radic": "√",
		"raemptyv": "⦳",
		"rang": "⟩",
		"Rang": "⟫",
		"rangd": "⦒",
		"range": "⦥",
		"rangle": "⟩",
		"raquo": "»",
		"rarrap": "⥵",
		"rarrb": "⇥",
		"rarrbfs": "⤠",
		"rarrc": "⤳",
		"rarr": "→",
		"Rarr": "↠",
		"rArr": "⇒",
		"rarrfs": "⤞",
		"rarrhk": "↪",
		"rarrlp": "↬",
		"rarrpl": "⥅",
		"rarrsim": "⥴",
		"Rarrtl": "⤖",
		"rarrtl": "↣",
		"rarrw": "↝",
		"ratail": "⤚",
		"rAtail": "⤜",
		"ratio": "∶",
		"rationals": "ℚ",
		"rbarr": "⤍",
		"rBarr": "⤏",
		"RBarr": "⤐",
		"rbbrk": "❳",
		"rbrace": "}",
		"rbrack": "]",
		"rbrke": "⦌",
		"rbrksld": "⦎",
		"rbrkslu": "⦐",
		"Rcaron": "Ř",
		"rcaron": "ř",
		"Rcedil": "Ŗ",
		"rcedil": "ŗ",
		"rceil": "⌉",
		"rcub": "}",
		"Rcy": "Р",
		"rcy": "р",
		"rdca": "⤷",
		"rdldhar": "⥩",
		"rdquo": "”",
		"rdquor": "”",
		"rdsh": "↳",
		"real": "ℜ",
		"realine": "ℛ",
		"realpart": "ℜ",
		"reals": "ℝ",
		"Re": "ℜ",
		"rect": "▭",
		"reg": "®",
		"REG": "®",
		"ReverseElement": "∋",
		"ReverseEquilibrium": "⇋",
		"ReverseUpEquilibrium": "⥯",
		"rfisht": "⥽",
		"rfloor": "⌋",
		"rfr": "𝔯",
		"Rfr": "ℜ",
		"rHar": "⥤",
		"rhard": "⇁",
		"rharu": "⇀",
		"rharul": "⥬",
		"Rho": "Ρ",
		"rho": "ρ",
		"rhov": "ϱ",
		"RightAngleBracket": "⟩",
		"RightArrowBar": "⇥",
		"rightarrow": "→",
		"RightArrow": "→",
		"Rightarrow": "⇒",
		"RightArrowLeftArrow": "⇄",
		"rightarrowtail": "↣",
		"RightCeiling": "⌉",
		"RightDoubleBracket": "⟧",
		"RightDownTeeVector": "⥝",
		"RightDownVectorBar": "⥕",
		"RightDownVector": "⇂",
		"RightFloor": "⌋",
		"rightharpoondown": "⇁",
		"rightharpoonup": "⇀",
		"rightleftarrows": "⇄",
		"rightleftharpoons": "⇌",
		"rightrightarrows": "⇉",
		"rightsquigarrow": "↝",
		"RightTeeArrow": "↦",
		"RightTee": "⊢",
		"RightTeeVector": "⥛",
		"rightthreetimes": "⋌",
		"RightTriangleBar": "⧐",
		"RightTriangle": "⊳",
		"RightTriangleEqual": "⊵",
		"RightUpDownVector": "⥏",
		"RightUpTeeVector": "⥜",
		"RightUpVectorBar": "⥔",
		"RightUpVector": "↾",
		"RightVectorBar": "⥓",
		"RightVector": "⇀",
		"ring": "˚",
		"risingdotseq": "≓",
		"rlarr": "⇄",
		"rlhar": "⇌",
		"rlm": "‏",
		"rmoustache": "⎱",
		"rmoust": "⎱",
		"rnmid": "⫮",
		"roang": "⟭",
		"roarr": "⇾",
		"robrk": "⟧",
		"ropar": "⦆",
		"ropf": "𝕣",
		"Ropf": "ℝ",
		"roplus": "⨮",
		"rotimes": "⨵",
		"RoundImplies": "⥰",
		"rpar": ")",
		"rpargt": "⦔",
		"rppolint": "⨒",
		"rrarr": "⇉",
		"Rrightarrow": "⇛",
		"rsaquo": "›",
		"rscr": "𝓇",
		"Rscr": "ℛ",
		"rsh": "↱",
		"Rsh": "↱",
		"rsqb": "]",
		"rsquo": "’",
		"rsquor": "’",
		"rthree": "⋌",
		"rtimes": "⋊",
		"rtri": "▹",
		"rtrie": "⊵",
		"rtrif": "▸",
		"rtriltri": "⧎",
		"RuleDelayed": "⧴",
		"ruluhar": "⥨",
		"rx": "℞",
		"Sacute": "Ś",
		"sacute": "ś",
		"sbquo": "‚",
		"scap": "⪸",
		"Scaron": "Š",
		"scaron": "š",
		"Sc": "⪼",
		"sc": "≻",
		"sccue": "≽",
		"sce": "⪰",
		"scE": "⪴",
		"Scedil": "Ş",
		"scedil": "ş",
		"Scirc": "Ŝ",
		"scirc": "ŝ",
		"scnap": "⪺",
		"scnE": "⪶",
		"scnsim": "⋩",
		"scpolint": "⨓",
		"scsim": "≿",
		"Scy": "С",
		"scy": "с",
		"sdotb": "⊡",
		"sdot": "⋅",
		"sdote": "⩦",
		"searhk": "⤥",
		"searr": "↘",
		"seArr": "⇘",
		"searrow": "↘",
		"sect": "§",
		"semi": ";",
		"seswar": "⤩",
		"setminus": "∖",
		"setmn": "∖",
		"sext": "✶",
		"Sfr": "𝔖",
		"sfr": "𝔰",
		"sfrown": "⌢",
		"sharp": "♯",
		"SHCHcy": "Щ",
		"shchcy": "щ",
		"SHcy": "Ш",
		"shcy": "ш",
		"ShortDownArrow": "↓",
		"ShortLeftArrow": "←",
		"shortmid": "∣",
		"shortparallel": "∥",
		"ShortRightArrow": "→",
		"ShortUpArrow": "↑",
		"shy": "­",
		"Sigma": "Σ",
		"sigma": "σ",
		"sigmaf": "ς",
		"sigmav": "ς",
		"sim": "∼",
		"simdot": "⩪",
		"sime": "≃",
		"simeq": "≃",
		"simg": "⪞",
		"simgE": "⪠",
		"siml": "⪝",
		"simlE": "⪟",
		"simne": "≆",
		"simplus": "⨤",
		"simrarr": "⥲",
		"slarr": "←",
		"SmallCircle": "∘",
		"smallsetminus": "∖",
		"smashp": "⨳",
		"smeparsl": "⧤",
		"smid": "∣",
		"smile": "⌣",
		"smt": "⪪",
		"smte": "⪬",
		"smtes": "⪬︀",
		"SOFTcy": "Ь",
		"softcy": "ь",
		"solbar": "⌿",
		"solb": "⧄",
		"sol": "/",
		"Sopf": "𝕊",
		"sopf": "𝕤",
		"spades": "♠",
		"spadesuit": "♠",
		"spar": "∥",
		"sqcap": "⊓",
		"sqcaps": "⊓︀",
		"sqcup": "⊔",
		"sqcups": "⊔︀",
		"Sqrt": "√",
		"sqsub": "⊏",
		"sqsube": "⊑",
		"sqsubset": "⊏",
		"sqsubseteq": "⊑",
		"sqsup": "⊐",
		"sqsupe": "⊒",
		"sqsupset": "⊐",
		"sqsupseteq": "⊒",
		"square": "□",
		"Square": "□",
		"SquareIntersection": "⊓",
		"SquareSubset": "⊏",
		"SquareSubsetEqual": "⊑",
		"SquareSuperset": "⊐",
		"SquareSupersetEqual": "⊒",
		"SquareUnion": "⊔",
		"squarf": "▪",
		"squ": "□",
		"squf": "▪",
		"srarr": "→",
		"Sscr": "𝒮",
		"sscr": "𝓈",
		"ssetmn": "∖",
		"ssmile": "⌣",
		"sstarf": "⋆",
		"Star": "⋆",
		"star": "☆",
		"starf": "★",
		"straightepsilon": "ϵ",
		"straightphi": "ϕ",
		"strns": "¯",
		"sub": "⊂",
		"Sub": "⋐",
		"subdot": "⪽",
		"subE": "⫅",
		"sube": "⊆",
		"subedot": "⫃",
		"submult": "⫁",
		"subnE": "⫋",
		"subne": "⊊",
		"subplus": "⪿",
		"subrarr": "⥹",
		"subset": "⊂",
		"Subset": "⋐",
		"subseteq": "⊆",
		"subseteqq": "⫅",
		"SubsetEqual": "⊆",
		"subsetneq": "⊊",
		"subsetneqq": "⫋",
		"subsim": "⫇",
		"subsub": "⫕",
		"subsup": "⫓",
		"succapprox": "⪸",
		"succ": "≻",
		"succcurlyeq": "≽",
		"Succeeds": "≻",
		"SucceedsEqual": "⪰",
		"SucceedsSlantEqual": "≽",
		"SucceedsTilde": "≿",
		"succeq": "⪰",
		"succnapprox": "⪺",
		"succneqq": "⪶",
		"succnsim": "⋩",
		"succsim": "≿",
		"SuchThat": "∋",
		"sum": "∑",
		"Sum": "∑",
		"sung": "♪",
		"sup1": "¹",
		"sup2": "²",
		"sup3": "³",
		"sup": "⊃",
		"Sup": "⋑",
		"supdot": "⪾",
		"supdsub": "⫘",
		"supE": "⫆",
		"supe": "⊇",
		"supedot": "⫄",
		"Superset": "⊃",
		"SupersetEqual": "⊇",
		"suphsol": "⟉",
		"suphsub": "⫗",
		"suplarr": "⥻",
		"supmult": "⫂",
		"supnE": "⫌",
		"supne": "⊋",
		"supplus": "⫀",
		"supset": "⊃",
		"Supset": "⋑",
		"supseteq": "⊇",
		"supseteqq": "⫆",
		"supsetneq": "⊋",
		"supsetneqq": "⫌",
		"supsim": "⫈",
		"supsub": "⫔",
		"supsup": "⫖",
		"swarhk": "⤦",
		"swarr": "↙",
		"swArr": "⇙",
		"swarrow": "↙",
		"swnwar": "⤪",
		"szlig": "ß",
		"Tab": "\t",
		"target": "⌖",
		"Tau": "Τ",
		"tau": "τ",
		"tbrk": "⎴",
		"Tcaron": "Ť",
		"tcaron": "ť",
		"Tcedil": "Ţ",
		"tcedil": "ţ",
		"Tcy": "Т",
		"tcy": "т",
		"tdot": "⃛",
		"telrec": "⌕",
		"Tfr": "𝔗",
		"tfr": "𝔱",
		"there4": "∴",
		"therefore": "∴",
		"Therefore": "∴",
		"Theta": "Θ",
		"theta": "θ",
		"thetasym": "ϑ",
		"thetav": "ϑ",
		"thickapprox": "≈",
		"thicksim": "∼",
		"ThickSpace": "  ",
		"ThinSpace": " ",
		"thinsp": " ",
		"thkap": "≈",
		"thksim": "∼",
		"THORN": "Þ",
		"thorn": "þ",
		"tilde": "˜",
		"Tilde": "∼",
		"TildeEqual": "≃",
		"TildeFullEqual": "≅",
		"TildeTilde": "≈",
		"timesbar": "⨱",
		"timesb": "⊠",
		"times": "×",
		"timesd": "⨰",
		"tint": "∭",
		"toea": "⤨",
		"topbot": "⌶",
		"topcir": "⫱",
		"top": "⊤",
		"Topf": "𝕋",
		"topf": "𝕥",
		"topfork": "⫚",
		"tosa": "⤩",
		"tprime": "‴",
		"trade": "™",
		"TRADE": "™",
		"triangle": "▵",
		"triangledown": "▿",
		"triangleleft": "◃",
		"trianglelefteq": "⊴",
		"triangleq": "≜",
		"triangleright": "▹",
		"trianglerighteq": "⊵",
		"tridot": "◬",
		"trie": "≜",
		"triminus": "⨺",
		"TripleDot": "⃛",
		"triplus": "⨹",
		"trisb": "⧍",
		"tritime": "⨻",
		"trpezium": "⏢",
		"Tscr": "𝒯",
		"tscr": "𝓉",
		"TScy": "Ц",
		"tscy": "ц",
		"TSHcy": "Ћ",
		"tshcy": "ћ",
		"Tstrok": "Ŧ",
		"tstrok": "ŧ",
		"twixt": "≬",
		"twoheadleftarrow": "↞",
		"twoheadrightarrow": "↠",
		"Uacute": "Ú",
		"uacute": "ú",
		"uarr": "↑",
		"Uarr": "↟",
		"uArr": "⇑",
		"Uarrocir": "⥉",
		"Ubrcy": "Ў",
		"ubrcy": "ў",
		"Ubreve": "Ŭ",
		"ubreve": "ŭ",
		"Ucirc": "Û",
		"ucirc": "û",
		"Ucy": "У",
		"ucy": "у",
		"udarr": "⇅",
		"Udblac": "Ű",
		"udblac": "ű",
		"udhar": "⥮",
		"ufisht": "⥾",
		"Ufr": "𝔘",
		"ufr": "𝔲",
		"Ugrave": "Ù",
		"ugrave": "ù",
		"uHar": "⥣",
		"uharl": "↿",
		"uharr": "↾",
		"uhblk": "▀",
		"ulcorn": "⌜",
		"ulcorner": "⌜",
		"ulcrop": "⌏",
		"ultri": "◸",
		"Umacr": "Ū",
		"umacr": "ū",
		"uml": "¨",
		"UnderBar": "_",
		"UnderBrace": "⏟",
		"UnderBracket": "⎵",
		"UnderParenthesis": "⏝",
		"Union": "⋃",
		"UnionPlus": "⊎",
		"Uogon": "Ų",
		"uogon": "ų",
		"Uopf": "𝕌",
		"uopf": "𝕦",
		"UpArrowBar": "⤒",
		"uparrow": "↑",
		"UpArrow": "↑",
		"Uparrow": "⇑",
		"UpArrowDownArrow": "⇅",
		"updownarrow": "↕",
		"UpDownArrow": "↕",
		"Updownarrow": "⇕",
		"UpEquilibrium": "⥮",
		"upharpoonleft": "↿",
		"upharpoonright": "↾",
		"uplus": "⊎",
		"UpperLeftArrow": "↖",
		"UpperRightArrow": "↗",
		"upsi": "υ",
		"Upsi": "ϒ",
		"upsih": "ϒ",
		"Upsilon": "Υ",
		"upsilon": "υ",
		"UpTeeArrow": "↥",
		"UpTee": "⊥",
		"upuparrows": "⇈",
		"urcorn": "⌝",
		"urcorner": "⌝",
		"urcrop": "⌎",
		"Uring": "Ů",
		"uring": "ů",
		"urtri": "◹",
		"Uscr": "𝒰",
		"uscr": "𝓊",
		"utdot": "⋰",
		"Utilde": "Ũ",
		"utilde": "ũ",
		"utri": "▵",
		"utrif": "▴",
		"uuarr": "⇈",
		"Uuml": "Ü",
		"uuml": "ü",
		"uwangle": "⦧",
		"vangrt": "⦜",
		"varepsilon": "ϵ",
		"varkappa": "ϰ",
		"varnothing": "∅",
		"varphi": "ϕ",
		"varpi": "ϖ",
		"varpropto": "∝",
		"varr": "↕",
		"vArr": "⇕",
		"varrho": "ϱ",
		"varsigma": "ς",
		"varsubsetneq": "⊊︀",
		"varsubsetneqq": "⫋︀",
		"varsupsetneq": "⊋︀",
		"varsupsetneqq": "⫌︀",
		"vartheta": "ϑ",
		"vartriangleleft": "⊲",
		"vartriangleright": "⊳",
		"vBar": "⫨",
		"Vbar": "⫫",
		"vBarv": "⫩",
		"Vcy": "В",
		"vcy": "в",
		"vdash": "⊢",
		"vDash": "⊨",
		"Vdash": "⊩",
		"VDash": "⊫",
		"Vdashl": "⫦",
		"veebar": "⊻",
		"vee": "∨",
		"Vee": "⋁",
		"veeeq": "≚",
		"vellip": "⋮",
		"verbar": "|",
		"Verbar": "‖",
		"vert": "|",
		"Vert": "‖",
		"VerticalBar": "∣",
		"VerticalLine": "|",
		"VerticalSeparator": "❘",
		"VerticalTilde": "≀",
		"VeryThinSpace": " ",
		"Vfr": "𝔙",
		"vfr": "𝔳",
		"vltri": "⊲",
		"vnsub": "⊂⃒",
		"vnsup": "⊃⃒",
		"Vopf": "𝕍",
		"vopf": "𝕧",
		"vprop": "∝",
		"vrtri": "⊳",
		"Vscr": "𝒱",
		"vscr": "𝓋",
		"vsubnE": "⫋︀",
		"vsubne": "⊊︀",
		"vsupnE": "⫌︀",
		"vsupne": "⊋︀",
		"Vvdash": "⊪",
		"vzigzag": "⦚",
		"Wcirc": "Ŵ",
		"wcirc": "ŵ",
		"wedbar": "⩟",
		"wedge": "∧",
		"Wedge": "⋀",
		"wedgeq": "≙",
		"weierp": "℘",
		"Wfr": "𝔚",
		"wfr": "𝔴",
		"Wopf": "𝕎",
		"wopf": "𝕨",
		"wp": "℘",
		"wr": "≀",
		"wreath": "≀",
		"Wscr": "𝒲",
		"wscr": "𝓌",
		"xcap": "⋂",
		"xcirc": "◯",
		"xcup": "⋃",
		"xdtri": "▽",
		"Xfr": "𝔛",
		"xfr": "𝔵",
		"xharr": "⟷",
		"xhArr": "⟺",
		"Xi": "Ξ",
		"xi": "ξ",
		"xlarr": "⟵",
		"xlArr": "⟸",
		"xmap": "⟼",
		"xnis": "⋻",
		"xodot": "⨀",
		"Xopf": "𝕏",
		"xopf": "𝕩",
		"xoplus": "⨁",
		"xotime": "⨂",
		"xrarr": "⟶",
		"xrArr": "⟹",
		"Xscr": "𝒳",
		"xscr": "𝓍",
		"xsqcup": "⨆",
		"xuplus": "⨄",
		"xutri": "△",
		"xvee": "⋁",
		"xwedge": "⋀",
		"Yacute": "Ý",
		"yacute": "ý",
		"YAcy": "Я",
		"yacy": "я",
		"Ycirc": "Ŷ",
		"ycirc": "ŷ",
		"Ycy": "Ы",
		"ycy": "ы",
		"yen": "¥",
		"Yfr": "𝔜",
		"yfr": "𝔶",
		"YIcy": "Ї",
		"yicy": "ї",
		"Yopf": "𝕐",
		"yopf": "𝕪",
		"Yscr": "𝒴",
		"yscr": "𝓎",
		"YUcy": "Ю",
		"yucy": "ю",
		"yuml": "ÿ",
		"Yuml": "Ÿ",
		"Zacute": "Ź",
		"zacute": "ź",
		"Zcaron": "Ž",
		"zcaron": "ž",
		"Zcy": "З",
		"zcy": "з",
		"Zdot": "Ż",
		"zdot": "ż",
		"zeetrf": "ℨ",
		"ZeroWidthSpace": "​",
		"Zeta": "Ζ",
		"zeta": "ζ",
		"zfr": "𝔷",
		"Zfr": "ℨ",
		"ZHcy": "Ж",
		"zhcy": "ж",
		"zigrarr": "⇝",
		"zopf": "𝕫",
		"Zopf": "ℤ",
		"Zscr": "𝒵",
		"zscr": "𝓏",
		"zwj": "‍",
		"zwnj": "‌"
	};

/***/ },
/* 300 */
/***/ function(module, exports) {

	module.exports = {
		"100": "💯",
		"1234": "🔢",
		"grinning": "😀",
		"grimacing": "😬",
		"grin": "😁",
		"joy": "😂",
		"smiley": "😃",
		"smile": "😄",
		"sweat_smile": "😅",
		"laughing": "😆",
		"satisfied": "😆",
		"innocent": "😇",
		"wink": "😉",
		"blush": "😊",
		"slightly_smiling_face": "🙂",
		"upside_down_face": "🙃",
		"relaxed": "☺️",
		"yum": "😋",
		"relieved": "😌",
		"heart_eyes": "😍",
		"kissing_heart": "😘",
		"kissing": "😗",
		"kissing_smiling_eyes": "😙",
		"kissing_closed_eyes": "😚",
		"stuck_out_tongue_winking_eye": "😜",
		"stuck_out_tongue_closed_eyes": "😝",
		"stuck_out_tongue": "😛",
		"money_mouth_face": "🤑",
		"nerd_face": "🤓",
		"sunglasses": "😎",
		"hugs": "🤗",
		"smirk": "😏",
		"no_mouth": "😶",
		"neutral_face": "😐",
		"expressionless": "😑",
		"unamused": "😒",
		"roll_eyes": "🙄",
		"thinking": "🤔",
		"flushed": "😳",
		"disappointed": "😞",
		"worried": "😟",
		"angry": "😠",
		"rage": "😡",
		"pout": "😡",
		"pensive": "😔",
		"confused": "😕",
		"slightly_frowning_face": "🙁",
		"frowning_face": "☹️",
		"persevere": "😣",
		"confounded": "😖",
		"tired_face": "😫",
		"weary": "😩",
		"triumph": "😤",
		"open_mouth": "😮",
		"scream": "😱",
		"fearful": "😨",
		"cold_sweat": "😰",
		"hushed": "😯",
		"frowning": "😦",
		"anguished": "😧",
		"cry": "😢",
		"disappointed_relieved": "😥",
		"sleepy": "😪",
		"sweat": "😓",
		"sob": "😭",
		"dizzy_face": "😵",
		"astonished": "😲",
		"zipper_mouth_face": "🤐",
		"mask": "😷",
		"face_with_thermometer": "🤒",
		"face_with_head_bandage": "🤕",
		"sleeping": "😴",
		"zzz": "💤",
		"hankey": "💩",
		"poop": "💩",
		"shit": "💩",
		"smiling_imp": "😈",
		"imp": "👿",
		"japanese_ogre": "👹",
		"japanese_goblin": "👺",
		"ghost": "👻",
		"skull": "💀",
		"skull_and_crossbones": "☠️",
		"alien": "👽",
		"space_invader": "👾",
		"robot": "🤖",
		"smiley_cat": "😺",
		"smile_cat": "😸",
		"joy_cat": "😹",
		"heart_eyes_cat": "😻",
		"smirk_cat": "😼",
		"kissing_cat": "😽",
		"scream_cat": "🙀",
		"crying_cat_face": "😿",
		"pouting_cat": "😾",
		"raised_hands": "🙌",
		"clap": "👏",
		"+1": "👍",
		"thumbsup": "👍",
		"-1": "👎",
		"thumbsdown": "👎",
		"facepunch": "👊",
		"punch": "👊",
		"fist": "✊",
		"wave": "👋",
		"point_left": "👈",
		"point_right": "👉",
		"point_up_2": "👆",
		"point_down": "👇",
		"ok_hand": "👌",
		"point_up": "☝️",
		"v": "✌️",
		"hand": "✋",
		"raised_hand": "✋",
		"raised_hand_with_fingers_splayed": "🖐",
		"open_hands": "👐",
		"muscle": "💪",
		"pray": "🙏",
		"vulcan_salute": "🖖",
		"metal": "🤘",
		"middle_finger": "🖕",
		"fu": "🖕",
		"writing_hand": "✍️",
		"nail_care": "💅",
		"lips": "👄",
		"tongue": "👅",
		"ear": "👂",
		"nose": "👃",
		"eye": "👁",
		"eyes": "👀",
		"speaking_head": "🗣",
		"bust_in_silhouette": "👤",
		"busts_in_silhouette": "👥",
		"baby": "👶",
		"boy": "👦",
		"girl": "👧",
		"man": "👨",
		"woman": "👩",
		"blonde_woman": "👱‍♀️",
		"blonde_man": "👱",
		"person_with_blond_hair": "👱",
		"older_man": "👴",
		"older_woman": "👵",
		"man_with_gua_pi_mao": "👲",
		"woman_with_turban": "👳‍♀️",
		"man_with_turban": "👳",
		"policewoman": "👮‍♀️",
		"policeman": "👮",
		"cop": "👮",
		"construction_worker_woman": "👷‍♀️",
		"construction_worker_man": "👷",
		"construction_worker": "👷",
		"guardswoman": "💂‍♀️",
		"guardsman": "💂",
		"female_detective": "🕵️‍♀️",
		"male_detective": "🕵️",
		"detective": "🕵️",
		"santa": "🎅",
		"princess": "👸",
		"bride_with_veil": "👰",
		"angel": "👼",
		"bowing_woman": "🙇‍♀️",
		"bowing_man": "🙇",
		"bow": "🙇",
		"tipping_hand_woman": "💁",
		"information_desk_person": "💁",
		"tipping_hand_man": "💁‍♂️",
		"no_good_woman": "🙅",
		"no_good": "🙅",
		"ng_woman": "🙅",
		"no_good_man": "🙅‍♂️",
		"ng_man": "🙅‍♂️",
		"ok_woman": "🙆",
		"ok_man": "🙆‍♂️",
		"raising_hand_woman": "🙋",
		"raising_hand": "🙋",
		"raising_hand_man": "🙋‍♂️",
		"pouting_woman": "🙎",
		"person_with_pouting_face": "🙎",
		"pouting_man": "🙎‍♂️",
		"frowning_woman": "🙍",
		"person_frowning": "🙍",
		"frowning_man": "🙍‍♂️",
		"haircut_woman": "💇",
		"haircut": "💇",
		"haircut_man": "💇‍♂️",
		"massage_woman": "💆",
		"massage": "💆",
		"massage_man": "💆‍♂️",
		"dancer": "💃",
		"dancing_women": "👯",
		"dancers": "👯",
		"dancing_men": "👯‍♂️",
		"walking_woman": "🚶‍♀️",
		"walking_man": "🚶",
		"walking": "🚶",
		"running_woman": "🏃‍♀️",
		"running_man": "🏃",
		"runner": "🏃",
		"running": "🏃",
		"couple": "👫",
		"two_women_holding_hands": "👭",
		"two_men_holding_hands": "👬",
		"couple_with_heart_woman_man": "💑",
		"couple_with_heart": "💑",
		"couple_with_heart_woman_woman": "👩‍❤️‍👩",
		"couple_with_heart_man_man": "👨‍❤️‍👨",
		"couplekiss_man_woman": "💏",
		"couplekiss_woman_woman": "👩‍❤️‍💋‍👩",
		"couplekiss_man_man": "👨‍❤️‍💋‍👨",
		"family_man_woman_boy": "👪",
		"family": "👪",
		"family_man_woman_girl": "👨‍👩‍👧",
		"family_man_woman_girl_boy": "👨‍👩‍👧‍👦",
		"family_man_woman_boy_boy": "👨‍👩‍👦‍👦",
		"family_man_woman_girl_girl": "👨‍👩‍👧‍👧",
		"family_woman_woman_boy": "👩‍👩‍👦",
		"family_woman_woman_girl": "👩‍👩‍👧",
		"family_woman_woman_girl_boy": "👩‍👩‍👧‍👦",
		"family_woman_woman_boy_boy": "👩‍👩‍👦‍👦",
		"family_woman_woman_girl_girl": "👩‍👩‍👧‍👧",
		"family_man_man_boy": "👨‍👨‍👦",
		"family_man_man_girl": "👨‍👨‍👧",
		"family_man_man_girl_boy": "👨‍👨‍👧‍👦",
		"family_man_man_boy_boy": "👨‍👨‍👦‍👦",
		"family_man_man_girl_girl": "👨‍👨‍👧‍👧",
		"family_woman_boy": "👩‍👦",
		"family_woman_girl": "👩‍👧",
		"family_woman_girl_boy": "👩‍👧‍👦",
		"family_woman_boy_boy": "👩‍👦‍👦",
		"family_woman_girl_girl": "👩‍👧‍👧",
		"family_man_boy": "👨‍👦",
		"family_man_girl": "👨‍👧",
		"family_man_girl_boy": "👨‍👧‍👦",
		"family_man_boy_boy": "👨‍👦‍👦",
		"family_man_girl_girl": "👨‍👧‍👧",
		"womans_clothes": "👚",
		"shirt": "👕",
		"tshirt": "👕",
		"jeans": "👖",
		"necktie": "👔",
		"dress": "👗",
		"bikini": "👙",
		"kimono": "👘",
		"lipstick": "💄",
		"kiss": "💋",
		"footprints": "👣",
		"high_heel": "👠",
		"sandal": "👡",
		"boot": "👢",
		"mans_shoe": "👞",
		"shoe": "👞",
		"athletic_shoe": "👟",
		"womans_hat": "👒",
		"tophat": "🎩",
		"mortar_board": "🎓",
		"crown": "👑",
		"rescue_worker_helmet": "⛑",
		"school_satchel": "🎒",
		"pouch": "👝",
		"purse": "👛",
		"handbag": "👜",
		"briefcase": "💼",
		"eyeglasses": "👓",
		"dark_sunglasses": "🕶",
		"ring": "💍",
		"closed_umbrella": "🌂",
		"dog": "🐶",
		"cat": "🐱",
		"mouse": "🐭",
		"hamster": "🐹",
		"rabbit": "🐰",
		"bear": "🐻",
		"panda_face": "🐼",
		"koala": "🐨",
		"tiger": "🐯",
		"lion": "🦁",
		"cow": "🐮",
		"pig": "🐷",
		"pig_nose": "🐽",
		"frog": "🐸",
		"octopus": "🐙",
		"monkey_face": "🐵",
		"see_no_evil": "🙈",
		"hear_no_evil": "🙉",
		"speak_no_evil": "🙊",
		"monkey": "🐒",
		"chicken": "🐔",
		"penguin": "🐧",
		"bird": "🐦",
		"baby_chick": "🐤",
		"hatching_chick": "🐣",
		"hatched_chick": "🐥",
		"wolf": "🐺",
		"boar": "🐗",
		"horse": "🐴",
		"unicorn": "🦄",
		"bee": "🐝",
		"honeybee": "🐝",
		"bug": "🐛",
		"snail": "🐌",
		"beetle": "🐞",
		"ant": "🐜",
		"spider": "🕷",
		"scorpion": "🦂",
		"crab": "🦀",
		"snake": "🐍",
		"turtle": "🐢",
		"tropical_fish": "🐠",
		"fish": "🐟",
		"blowfish": "🐡",
		"dolphin": "🐬",
		"flipper": "🐬",
		"whale": "🐳",
		"whale2": "🐋",
		"crocodile": "🐊",
		"leopard": "🐆",
		"tiger2": "🐅",
		"water_buffalo": "🐃",
		"ox": "🐂",
		"cow2": "🐄",
		"dromedary_camel": "🐪",
		"camel": "🐫",
		"elephant": "🐘",
		"goat": "🐐",
		"ram": "🐏",
		"sheep": "🐑",
		"racehorse": "🐎",
		"pig2": "🐖",
		"rat": "🐀",
		"mouse2": "🐁",
		"rooster": "🐓",
		"turkey": "🦃",
		"dove": "🕊",
		"dog2": "🐕",
		"poodle": "🐩",
		"cat2": "🐈",
		"rabbit2": "🐇",
		"chipmunk": "🐿",
		"feet": "🐾",
		"paw_prints": "🐾",
		"dragon": "🐉",
		"dragon_face": "🐲",
		"cactus": "🌵",
		"christmas_tree": "🎄",
		"evergreen_tree": "🌲",
		"deciduous_tree": "🌳",
		"palm_tree": "🌴",
		"seedling": "🌱",
		"herb": "🌿",
		"shamrock": "☘",
		"four_leaf_clover": "🍀",
		"bamboo": "🎍",
		"tanabata_tree": "🎋",
		"leaves": "🍃",
		"fallen_leaf": "🍂",
		"maple_leaf": "🍁",
		"ear_of_rice": "🌾",
		"hibiscus": "🌺",
		"sunflower": "🌻",
		"rose": "🌹",
		"tulip": "🌷",
		"blossom": "🌼",
		"cherry_blossom": "🌸",
		"bouquet": "💐",
		"mushroom": "🍄",
		"chestnut": "🌰",
		"jack_o_lantern": "🎃",
		"shell": "🐚",
		"spider_web": "🕸",
		"earth_americas": "🌎",
		"earth_africa": "🌍",
		"earth_asia": "🌏",
		"full_moon": "🌕",
		"waning_gibbous_moon": "🌖",
		"last_quarter_moon": "🌗",
		"waning_crescent_moon": "🌘",
		"new_moon": "🌑",
		"waxing_crescent_moon": "🌒",
		"first_quarter_moon": "🌓",
		"moon": "🌔",
		"waxing_gibbous_moon": "🌔",
		"new_moon_with_face": "🌚",
		"full_moon_with_face": "🌝",
		"first_quarter_moon_with_face": "🌛",
		"last_quarter_moon_with_face": "🌜",
		"sun_with_face": "🌞",
		"crescent_moon": "🌙",
		"star": "⭐️",
		"star2": "🌟",
		"dizzy": "💫",
		"sparkles": "✨",
		"comet": "☄️",
		"sunny": "☀️",
		"sun_behind_small_cloud": "🌤",
		"partly_sunny": "⛅️",
		"sun_behind_large_cloud": "🌥",
		"sun_behind_rain_cloud": "🌦",
		"cloud": "☁️",
		"cloud_with_rain": "🌧",
		"cloud_with_lightning_and_rain": "⛈",
		"cloud_with_lightning": "🌩",
		"zap": "⚡️",
		"fire": "🔥",
		"boom": "💥",
		"collision": "💥",
		"snowflake": "❄️",
		"cloud_with_snow": "🌨",
		"snowman_with_snow": "☃️",
		"snowman": "⛄️",
		"wind_face": "🌬",
		"dash": "💨",
		"tornado": "🌪",
		"fog": "🌫",
		"open_umbrella": "☂️",
		"umbrella": "☔️",
		"droplet": "💧",
		"sweat_drops": "💦",
		"ocean": "🌊",
		"green_apple": "🍏",
		"apple": "🍎",
		"pear": "🍐",
		"tangerine": "🍊",
		"orange": "🍊",
		"mandarin": "🍊",
		"lemon": "🍋",
		"banana": "🍌",
		"watermelon": "🍉",
		"grapes": "🍇",
		"strawberry": "🍓",
		"melon": "🍈",
		"cherries": "🍒",
		"peach": "🍑",
		"pineapple": "🍍",
		"tomato": "🍅",
		"eggplant": "🍆",
		"hot_pepper": "🌶",
		"corn": "🌽",
		"sweet_potato": "🍠",
		"honey_pot": "🍯",
		"bread": "🍞",
		"cheese": "🧀",
		"poultry_leg": "🍗",
		"meat_on_bone": "🍖",
		"fried_shrimp": "🍤",
		"egg": "🍳",
		"hamburger": "🍔",
		"fries": "🍟",
		"hotdog": "🌭",
		"pizza": "🍕",
		"spaghetti": "🍝",
		"taco": "🌮",
		"burrito": "🌯",
		"ramen": "🍜",
		"stew": "🍲",
		"fish_cake": "🍥",
		"sushi": "🍣",
		"bento": "🍱",
		"curry": "🍛",
		"rice_ball": "🍙",
		"rice": "🍚",
		"rice_cracker": "🍘",
		"oden": "🍢",
		"dango": "🍡",
		"shaved_ice": "🍧",
		"ice_cream": "🍨",
		"icecream": "🍦",
		"cake": "🍰",
		"birthday": "🎂",
		"custard": "🍮",
		"candy": "🍬",
		"lollipop": "🍭",
		"chocolate_bar": "🍫",
		"popcorn": "🍿",
		"doughnut": "🍩",
		"cookie": "🍪",
		"beer": "🍺",
		"beers": "🍻",
		"wine_glass": "🍷",
		"cocktail": "🍸",
		"tropical_drink": "🍹",
		"champagne": "🍾",
		"sake": "🍶",
		"tea": "🍵",
		"coffee": "☕️",
		"baby_bottle": "🍼",
		"fork_and_knife": "🍴",
		"plate_with_cutlery": "🍽",
		"soccer": "⚽️",
		"basketball": "🏀",
		"football": "🏈",
		"baseball": "⚾️",
		"tennis": "🎾",
		"volleyball": "🏐",
		"rugby_football": "🏉",
		"8ball": "🎱",
		"ping_pong": "🏓",
		"badminton": "🏸",
		"ice_hockey": "🏒",
		"field_hockey": "🏑",
		"cricket": "🏏",
		"bow_and_arrow": "🏹",
		"golf": "⛳️",
		"fishing_pole_and_fish": "🎣",
		"ice_skate": "⛸",
		"ski": "🎿",
		"skier": "⛷",
		"snowboarder": "🏂",
		"weight_lifting_woman": "🏋️‍♀️",
		"weight_lifting_man": "🏋️",
		"basketball_woman": "⛹️‍♀️",
		"basketball_man": "⛹️",
		"golfing_woman": "🏌️‍♀️",
		"golfing_man": "🏌️",
		"surfing_woman": "🏄‍♀️",
		"surfing_man": "🏄",
		"surfer": "🏄",
		"swimming_woman": "🏊‍♀️",
		"swimming_man": "🏊",
		"swimmer": "🏊",
		"rowing_woman": "🚣‍♀️",
		"rowing_man": "🚣",
		"rowboat": "🚣",
		"horse_racing": "🏇",
		"biking_woman": "🚴‍♀️",
		"biking_man": "🚴",
		"bicyclist": "🚴",
		"mountain_biking_woman": "🚵‍♀️",
		"mountain_biking_man": "🚵",
		"mountain_bicyclist": "🚵",
		"bath": "🛀",
		"business_suit_levitating": "🕴",
		"reminder_ribbon": "🎗",
		"running_shirt_with_sash": "🎽",
		"medal_sports": "🏅",
		"medal_military": "🎖",
		"trophy": "🏆",
		"rosette": "🏵",
		"dart": "🎯",
		"ticket": "🎫",
		"tickets": "🎟",
		"performing_arts": "🎭",
		"art": "🎨",
		"circus_tent": "🎪",
		"clapper": "🎬",
		"microphone": "🎤",
		"headphones": "🎧",
		"musical_score": "🎼",
		"musical_keyboard": "🎹",
		"saxophone": "🎷",
		"trumpet": "🎺",
		"guitar": "🎸",
		"violin": "🎻",
		"video_game": "🎮",
		"slot_machine": "🎰",
		"game_die": "🎲",
		"bowling": "🎳",
		"car": "🚗",
		"red_car": "🚗",
		"taxi": "🚕",
		"blue_car": "🚙",
		"bus": "🚌",
		"trolleybus": "🚎",
		"racing_car": "🏎",
		"police_car": "🚓",
		"ambulance": "🚑",
		"fire_engine": "🚒",
		"minibus": "🚐",
		"truck": "🚚",
		"articulated_lorry": "🚛",
		"tractor": "🚜",
		"motorcycle": "🏍",
		"bike": "🚲",
		"rotating_light": "🚨",
		"oncoming_police_car": "🚔",
		"oncoming_bus": "🚍",
		"oncoming_automobile": "🚘",
		"oncoming_taxi": "🚖",
		"aerial_tramway": "🚡",
		"mountain_cableway": "🚠",
		"suspension_railway": "🚟",
		"railway_car": "🚃",
		"train": "🚋",
		"monorail": "🚝",
		"bullettrain_side": "🚄",
		"bullettrain_front": "🚅",
		"light_rail": "🚈",
		"mountain_railway": "🚞",
		"steam_locomotive": "🚂",
		"train2": "🚆",
		"metro": "🚇",
		"tram": "🚊",
		"station": "🚉",
		"helicopter": "🚁",
		"small_airplane": "🛩",
		"airplane": "✈️",
		"flight_departure": "🛫",
		"flight_arrival": "🛬",
		"boat": "⛵️",
		"sailboat": "⛵️",
		"motor_boat": "🛥",
		"speedboat": "🚤",
		"ferry": "⛴",
		"passenger_ship": "🛳",
		"rocket": "🚀",
		"artificial_satellite": "🛰",
		"seat": "💺",
		"anchor": "⚓️",
		"construction": "🚧",
		"fuelpump": "⛽️",
		"busstop": "🚏",
		"vertical_traffic_light": "🚦",
		"traffic_light": "🚥",
		"world_map": "🗺",
		"ship": "🚢",
		"ferris_wheel": "🎡",
		"roller_coaster": "🎢",
		"carousel_horse": "🎠",
		"building_construction": "🏗",
		"foggy": "🌁",
		"tokyo_tower": "🗼",
		"factory": "🏭",
		"fountain": "⛲️",
		"rice_scene": "🎑",
		"mountain": "⛰",
		"mountain_snow": "🏔",
		"mount_fuji": "🗻",
		"volcano": "🌋",
		"japan": "🗾",
		"camping": "🏕",
		"tent": "⛺️",
		"national_park": "🏞",
		"motorway": "🛣",
		"railway_track": "🛤",
		"sunrise": "🌅",
		"sunrise_over_mountains": "🌄",
		"desert": "🏜",
		"beach_umbrella": "🏖",
		"desert_island": "🏝",
		"city_sunrise": "🌇",
		"city_sunset": "🌆",
		"cityscape": "🏙",
		"night_with_stars": "🌃",
		"bridge_at_night": "🌉",
		"milky_way": "🌌",
		"stars": "🌠",
		"sparkler": "🎇",
		"fireworks": "🎆",
		"rainbow": "🌈",
		"houses": "🏘",
		"european_castle": "🏰",
		"japanese_castle": "🏯",
		"stadium": "🏟",
		"statue_of_liberty": "🗽",
		"house": "🏠",
		"house_with_garden": "🏡",
		"derelict_house": "🏚",
		"office": "🏢",
		"department_store": "🏬",
		"post_office": "🏣",
		"european_post_office": "🏤",
		"hospital": "🏥",
		"bank": "🏦",
		"hotel": "🏨",
		"convenience_store": "🏪",
		"school": "🏫",
		"love_hotel": "🏩",
		"wedding": "💒",
		"classical_building": "🏛",
		"church": "⛪️",
		"mosque": "🕌",
		"synagogue": "🕍",
		"kaaba": "🕋",
		"shinto_shrine": "⛩",
		"watch": "⌚️",
		"iphone": "📱",
		"calling": "📲",
		"computer": "💻",
		"keyboard": "⌨️",
		"desktop_computer": "🖥",
		"printer": "🖨",
		"computer_mouse": "🖱",
		"trackball": "🖲",
		"joystick": "🕹",
		"clamp": "🗜",
		"minidisc": "💽",
		"floppy_disk": "💾",
		"cd": "💿",
		"dvd": "📀",
		"vhs": "📼",
		"camera": "📷",
		"camera_flash": "📸",
		"video_camera": "📹",
		"movie_camera": "🎥",
		"film_projector": "📽",
		"film_strip": "🎞",
		"telephone_receiver": "📞",
		"phone": "☎️",
		"telephone": "☎️",
		"pager": "📟",
		"fax": "📠",
		"tv": "📺",
		"radio": "📻",
		"studio_microphone": "🎙",
		"level_slider": "🎚",
		"control_knobs": "🎛",
		"stopwatch": "⏱",
		"timer_clock": "⏲",
		"alarm_clock": "⏰",
		"mantelpiece_clock": "🕰",
		"hourglass_flowing_sand": "⏳",
		"hourglass": "⌛️",
		"satellite": "📡",
		"battery": "🔋",
		"electric_plug": "🔌",
		"bulb": "💡",
		"flashlight": "🔦",
		"candle": "🕯",
		"wastebasket": "🗑",
		"oil_drum": "🛢",
		"money_with_wings": "💸",
		"dollar": "💵",
		"yen": "💴",
		"euro": "💶",
		"pound": "💷",
		"moneybag": "💰",
		"credit_card": "💳",
		"gem": "💎",
		"balance_scale": "⚖",
		"wrench": "🔧",
		"hammer": "🔨",
		"hammer_and_pick": "⚒",
		"hammer_and_wrench": "🛠",
		"pick": "⛏",
		"nut_and_bolt": "🔩",
		"gear": "⚙",
		"chains": "⛓",
		"gun": "🔫",
		"bomb": "💣",
		"hocho": "🔪",
		"knife": "🔪",
		"dagger": "🗡",
		"crossed_swords": "⚔",
		"shield": "🛡",
		"smoking": "🚬",
		"coffin": "⚰",
		"funeral_urn": "⚱",
		"amphora": "🏺",
		"crystal_ball": "🔮",
		"prayer_beads": "📿",
		"barber": "💈",
		"alembic": "⚗",
		"telescope": "🔭",
		"microscope": "🔬",
		"hole": "🕳",
		"pill": "💊",
		"syringe": "💉",
		"thermometer": "🌡",
		"toilet": "🚽",
		"shower": "🚿",
		"bathtub": "🛁",
		"bellhop_bell": "🛎",
		"key": "🔑",
		"old_key": "🗝",
		"door": "🚪",
		"couch_and_lamp": "🛋",
		"sleeping_bed": "🛌",
		"bed": "🛏",
		"framed_picture": "🖼",
		"parasol_on_ground": "⛱",
		"moyai": "🗿",
		"shopping": "🛍",
		"gift": "🎁",
		"balloon": "🎈",
		"flags": "🎏",
		"ribbon": "🎀",
		"confetti_ball": "🎊",
		"tada": "🎉",
		"wind_chime": "🎐",
		"izakaya_lantern": "🏮",
		"lantern": "🏮",
		"dolls": "🎎",
		"email": "✉️",
		"envelope": "✉️",
		"envelope_with_arrow": "📩",
		"incoming_envelope": "📨",
		"e-mail": "📧",
		"love_letter": "💌",
		"inbox_tray": "📥",
		"outbox_tray": "📤",
		"package": "📦",
		"label": "🏷",
		"bookmark": "🔖",
		"mailbox_closed": "📪",
		"mailbox": "📫",
		"mailbox_with_mail": "📬",
		"mailbox_with_no_mail": "📭",
		"postbox": "📮",
		"postal_horn": "📯",
		"scroll": "📜",
		"page_with_curl": "📃",
		"page_facing_up": "📄",
		"bookmark_tabs": "📑",
		"bar_chart": "📊",
		"chart_with_upwards_trend": "📈",
		"chart_with_downwards_trend": "📉",
		"spiral_notepad": "🗒",
		"spiral_calendar": "🗓",
		"calendar": "📆",
		"date": "📅",
		"card_index": "📇",
		"card_file_box": "🗃",
		"ballot_box": "🗳",
		"file_cabinet": "🗄",
		"clipboard": "📋",
		"file_folder": "📁",
		"open_file_folder": "📂",
		"card_index_dividers": "🗂",
		"newspaper_roll": "🗞",
		"newspaper": "📰",
		"notebook": "📓",
		"notebook_with_decorative_cover": "📔",
		"ledger": "📒",
		"closed_book": "📕",
		"green_book": "📗",
		"blue_book": "📘",
		"orange_book": "📙",
		"books": "📚",
		"book": "📖",
		"open_book": "📖",
		"link": "🔗",
		"paperclip": "📎",
		"paperclips": "🖇",
		"triangular_ruler": "📐",
		"straight_ruler": "📏",
		"scissors": "✂️",
		"pushpin": "📌",
		"round_pushpin": "📍",
		"triangular_flag_on_post": "🚩",
		"crossed_flags": "🎌",
		"white_flag": "🏳️",
		"black_flag": "🏴",
		"checkered_flag": "🏁",
		"rainbow_flag": "🏳️‍🌈",
		"paintbrush": "🖌",
		"crayon": "🖍",
		"pen": "🖊",
		"fountain_pen": "🖋",
		"black_nib": "✒️",
		"memo": "📝",
		"pencil": "📝",
		"pencil2": "✏️",
		"lock_with_ink_pen": "🔏",
		"closed_lock_with_key": "🔐",
		"lock": "🔒",
		"unlock": "🔓",
		"mag": "🔍",
		"mag_right": "🔎",
		"heart": "❤️",
		"yellow_heart": "💛",
		"green_heart": "💚",
		"blue_heart": "💙",
		"purple_heart": "💜",
		"broken_heart": "💔",
		"heavy_heart_exclamation": "❣️",
		"two_hearts": "💕",
		"revolving_hearts": "💞",
		"heartbeat": "💓",
		"heartpulse": "💗",
		"sparkling_heart": "💖",
		"cupid": "💘",
		"gift_heart": "💝",
		"heart_decoration": "💟",
		"peace_symbol": "☮️",
		"latin_cross": "✝️",
		"star_and_crescent": "☪️",
		"om": "🕉",
		"wheel_of_dharma": "☸️",
		"star_of_david": "✡️",
		"six_pointed_star": "🔯",
		"menorah": "🕎",
		"yin_yang": "☯️",
		"orthodox_cross": "☦️",
		"place_of_worship": "🛐",
		"ophiuchus": "⛎",
		"aries": "♈️",
		"taurus": "♉️",
		"gemini": "♊️",
		"cancer": "♋️",
		"leo": "♌️",
		"virgo": "♍️",
		"libra": "♎️",
		"scorpius": "♏️",
		"sagittarius": "♐️",
		"capricorn": "♑️",
		"aquarius": "♒️",
		"pisces": "♓️",
		"id": "🆔",
		"atom_symbol": "⚛",
		"radioactive": "☢️",
		"biohazard": "☣️",
		"mobile_phone_off": "📴",
		"vibration_mode": "📳",
		"eight_pointed_black_star": "✴️",
		"vs": "🆚",
		"accept": "🉑",
		"white_flower": "💮",
		"ideograph_advantage": "🉐",
		"secret": "㊙️",
		"congratulations": "㊗️",
		"u6e80": "🈵",
		"a": "🅰️",
		"b": "🅱️",
		"ab": "🆎",
		"cl": "🆑",
		"o2": "🅾️",
		"sos": "🆘",
		"no_entry": "⛔️",
		"name_badge": "📛",
		"no_entry_sign": "🚫",
		"x": "❌",
		"o": "⭕️",
		"anger": "💢",
		"hotsprings": "♨️",
		"no_pedestrians": "🚷",
		"do_not_litter": "🚯",
		"no_bicycles": "🚳",
		"non-potable_water": "🚱",
		"underage": "🔞",
		"no_mobile_phones": "📵",
		"exclamation": "❗️",
		"heavy_exclamation_mark": "❗️",
		"grey_exclamation": "❕",
		"question": "❓",
		"grey_question": "❔",
		"bangbang": "‼️",
		"interrobang": "⁉️",
		"low_brightness": "🔅",
		"high_brightness": "🔆",
		"trident": "🔱",
		"fleur_de_lis": "⚜",
		"part_alternation_mark": "〽️",
		"warning": "⚠️",
		"children_crossing": "🚸",
		"beginner": "🔰",
		"recycle": "♻️",
		"chart": "💹",
		"sparkle": "❇️",
		"eight_spoked_asterisk": "✳️",
		"negative_squared_cross_mark": "❎",
		"white_check_mark": "✅",
		"globe_with_meridians": "🌐",
		"m": "Ⓜ️",
		"diamond_shape_with_a_dot_inside": "💠",
		"cyclone": "🌀",
		"loop": "➿",
		"atm": "🏧",
		"sa": "🈂️",
		"passport_control": "🛂",
		"customs": "🛃",
		"baggage_claim": "🛄",
		"left_luggage": "🛅",
		"wheelchair": "♿️",
		"no_smoking": "🚭",
		"wc": "🚾",
		"parking": "🅿️",
		"potable_water": "🚰",
		"mens": "🚹",
		"womens": "🚺",
		"baby_symbol": "🚼",
		"restroom": "🚻",
		"put_litter_in_its_place": "🚮",
		"cinema": "🎦",
		"signal_strength": "📶",
		"koko": "🈁",
		"abc": "🔤",
		"abcd": "🔡",
		"capital_abcd": "🔠",
		"symbols": "🔣",
		"information_source": "ℹ️",
		"ng": "🆖",
		"ok": "🆗",
		"up": "🆙",
		"cool": "🆒",
		"new": "🆕",
		"free": "🆓",
		"zero": "0️⃣",
		"one": "1️⃣",
		"two": "2️⃣",
		"three": "3️⃣",
		"four": "4️⃣",
		"five": "5️⃣",
		"six": "6️⃣",
		"seven": "7️⃣",
		"eight": "8️⃣",
		"nine": "9️⃣",
		"keycap_ten": "🔟",
		"hash": "#️⃣",
		"asterisk": "*️⃣",
		"arrow_forward": "▶️",
		"pause_button": "⏸",
		"play_or_pause_button": "⏯",
		"stop_button": "⏹",
		"record_button": "⏺",
		"next_track_button": "⏭",
		"previous_track_button": "⏮",
		"fast_forward": "⏩",
		"rewind": "⏪",
		"arrow_double_up": "⏫",
		"arrow_double_down": "⏬",
		"arrow_backward": "◀️",
		"arrow_up_small": "🔼",
		"arrow_down_small": "🔽",
		"arrow_right": "➡️",
		"arrow_left": "⬅️",
		"arrow_up": "⬆️",
		"arrow_down": "⬇️",
		"arrow_upper_right": "↗️",
		"arrow_lower_right": "↘️",
		"arrow_lower_left": "↙️",
		"arrow_upper_left": "↖️",
		"arrow_up_down": "↕️",
		"left_right_arrow": "↔️",
		"arrow_right_hook": "↪️",
		"leftwards_arrow_with_hook": "↩️",
		"arrow_heading_up": "⤴️",
		"arrow_heading_down": "⤵️",
		"twisted_rightwards_arrows": "🔀",
		"repeat": "🔁",
		"repeat_one": "🔂",
		"arrows_counterclockwise": "🔄",
		"arrows_clockwise": "🔃",
		"musical_note": "🎵",
		"notes": "🎶",
		"wavy_dash": "〰️",
		"curly_loop": "➰",
		"heavy_check_mark": "✔️",
		"heavy_plus_sign": "➕",
		"heavy_minus_sign": "➖",
		"heavy_division_sign": "➗",
		"heavy_multiplication_x": "✖️",
		"heavy_dollar_sign": "💲",
		"currency_exchange": "💱",
		"tm": "™️",
		"copyright": "©️",
		"registered": "®️",
		"end": "🔚",
		"back": "🔙",
		"on": "🔛",
		"top": "🔝",
		"soon": "🔜",
		"ballot_box_with_check": "☑️",
		"radio_button": "🔘",
		"white_circle": "⚪️",
		"black_circle": "⚫️",
		"red_circle": "🔴",
		"large_blue_circle": "🔵",
		"small_red_triangle": "🔺",
		"small_red_triangle_down": "🔻",
		"small_orange_diamond": "🔸",
		"small_blue_diamond": "🔹",
		"large_orange_diamond": "🔶",
		"large_blue_diamond": "🔷",
		"white_square_button": "🔳",
		"black_square_button": "🔲",
		"black_small_square": "▪️",
		"white_small_square": "▫️",
		"black_medium_small_square": "◾️",
		"white_medium_small_square": "◽️",
		"black_medium_square": "◼️",
		"white_medium_square": "◻️",
		"black_large_square": "⬛️",
		"white_large_square": "⬜️",
		"mute": "🔇",
		"speaker": "🔈",
		"sound": "🔉",
		"loud_sound": "🔊",
		"no_bell": "🔕",
		"bell": "🔔",
		"mega": "📣",
		"loudspeaker": "📢",
		"eye_speech_bubble": "👁‍🗨",
		"speech_balloon": "💬",
		"thought_balloon": "💭",
		"right_anger_bubble": "🗯",
		"black_joker": "🃏",
		"mahjong": "🀄️",
		"flower_playing_cards": "🎴",
		"spades": "♠️",
		"clubs": "♣️",
		"hearts": "♥️",
		"diamonds": "♦️",
		"clock1": "🕐",
		"clock2": "🕑",
		"clock3": "🕒",
		"clock4": "🕓",
		"clock5": "🕔",
		"clock6": "🕕",
		"clock7": "🕖",
		"clock8": "🕗",
		"clock9": "🕘",
		"clock10": "🕙",
		"clock11": "🕚",
		"clock12": "🕛",
		"clock130": "🕜",
		"clock230": "🕝",
		"clock330": "🕞",
		"clock430": "🕟",
		"clock530": "🕠",
		"clock630": "🕡",
		"clock730": "🕢",
		"clock830": "🕣",
		"clock930": "🕤",
		"clock1030": "🕥",
		"clock1130": "🕦",
		"clock1230": "🕧",
		"afghanistan": "🇦🇫",
		"aland_islands": "🇦🇽",
		"albania": "🇦🇱",
		"algeria": "🇩🇿",
		"american_samoa": "🇦🇸",
		"andorra": "🇦🇩",
		"angola": "🇦🇴",
		"anguilla": "🇦🇮",
		"antarctica": "🇦🇶",
		"antigua_barbuda": "🇦🇬",
		"argentina": "🇦🇷",
		"armenia": "🇦🇲",
		"aruba": "🇦🇼",
		"australia": "🇦🇺",
		"austria": "🇦🇹",
		"azerbaijan": "🇦🇿",
		"bahamas": "🇧🇸",
		"bahrain": "🇧🇭",
		"bangladesh": "🇧🇩",
		"barbados": "🇧🇧",
		"belarus": "🇧🇾",
		"belgium": "🇧🇪",
		"belize": "🇧🇿",
		"benin": "🇧🇯",
		"bermuda": "🇧🇲",
		"bhutan": "🇧🇹",
		"bolivia": "🇧🇴",
		"caribbean_netherlands": "🇧🇶",
		"bosnia_herzegovina": "🇧🇦",
		"botswana": "🇧🇼",
		"brazil": "🇧🇷",
		"british_indian_ocean_territory": "🇮🇴",
		"british_virgin_islands": "🇻🇬",
		"brunei": "🇧🇳",
		"bulgaria": "🇧🇬",
		"burkina_faso": "🇧🇫",
		"burundi": "🇧🇮",
		"cape_verde": "🇨🇻",
		"cambodia": "🇰🇭",
		"cameroon": "🇨🇲",
		"canada": "🇨🇦",
		"canary_islands": "🇮🇨",
		"cayman_islands": "🇰🇾",
		"central_african_republic": "🇨🇫",
		"chad": "🇹🇩",
		"chile": "🇨🇱",
		"cn": "🇨🇳",
		"christmas_island": "🇨🇽",
		"cocos_islands": "🇨🇨",
		"colombia": "🇨🇴",
		"comoros": "🇰🇲",
		"congo_brazzaville": "🇨🇬",
		"congo_kinshasa": "🇨🇩",
		"cook_islands": "🇨🇰",
		"costa_rica": "🇨🇷",
		"croatia": "🇭🇷",
		"cuba": "🇨🇺",
		"curacao": "🇨🇼",
		"cyprus": "🇨🇾",
		"czech_republic": "🇨🇿",
		"denmark": "🇩🇰",
		"djibouti": "🇩🇯",
		"dominica": "🇩🇲",
		"dominican_republic": "🇩🇴",
		"ecuador": "🇪🇨",
		"egypt": "🇪🇬",
		"el_salvador": "🇸🇻",
		"equatorial_guinea": "🇬🇶",
		"eritrea": "🇪🇷",
		"estonia": "🇪🇪",
		"ethiopia": "🇪🇹",
		"eu": "🇪🇺",
		"european_union": "🇪🇺",
		"falkland_islands": "🇫🇰",
		"faroe_islands": "🇫🇴",
		"fiji": "🇫🇯",
		"finland": "🇫🇮",
		"fr": "🇫🇷",
		"french_guiana": "🇬🇫",
		"french_polynesia": "🇵🇫",
		"french_southern_territories": "🇹🇫",
		"gabon": "🇬🇦",
		"gambia": "🇬🇲",
		"georgia": "🇬🇪",
		"de": "🇩🇪",
		"ghana": "🇬🇭",
		"gibraltar": "🇬🇮",
		"greece": "🇬🇷",
		"greenland": "🇬🇱",
		"grenada": "🇬🇩",
		"guadeloupe": "🇬🇵",
		"guam": "🇬🇺",
		"guatemala": "🇬🇹",
		"guernsey": "🇬🇬",
		"guinea": "🇬🇳",
		"guinea_bissau": "🇬🇼",
		"guyana": "🇬🇾",
		"haiti": "🇭🇹",
		"honduras": "🇭🇳",
		"hong_kong": "🇭🇰",
		"hungary": "🇭🇺",
		"iceland": "🇮🇸",
		"india": "🇮🇳",
		"indonesia": "🇮🇩",
		"iran": "🇮🇷",
		"iraq": "🇮🇶",
		"ireland": "🇮🇪",
		"isle_of_man": "🇮🇲",
		"israel": "🇮🇱",
		"it": "🇮🇹",
		"cote_divoire": "🇨🇮",
		"jamaica": "🇯🇲",
		"jp": "🇯🇵",
		"jersey": "🇯🇪",
		"jordan": "🇯🇴",
		"kazakhstan": "🇰🇿",
		"kenya": "🇰🇪",
		"kiribati": "🇰🇮",
		"kosovo": "🇽🇰",
		"kuwait": "🇰🇼",
		"kyrgyzstan": "🇰🇬",
		"laos": "🇱🇦",
		"latvia": "🇱🇻",
		"lebanon": "🇱🇧",
		"lesotho": "🇱🇸",
		"liberia": "🇱🇷",
		"libya": "🇱🇾",
		"liechtenstein": "🇱🇮",
		"lithuania": "🇱🇹",
		"luxembourg": "🇱🇺",
		"macau": "🇲🇴",
		"macedonia": "🇲🇰",
		"madagascar": "🇲🇬",
		"malawi": "🇲🇼",
		"malaysia": "🇲🇾",
		"maldives": "🇲🇻",
		"mali": "🇲🇱",
		"malta": "🇲🇹",
		"marshall_islands": "🇲🇭",
		"martinique": "🇲🇶",
		"mauritania": "🇲🇷",
		"mauritius": "🇲🇺",
		"mayotte": "🇾🇹",
		"mexico": "🇲🇽",
		"micronesia": "🇫🇲",
		"moldova": "🇲🇩",
		"monaco": "🇲🇨",
		"mongolia": "🇲🇳",
		"montenegro": "🇲🇪",
		"montserrat": "🇲🇸",
		"morocco": "🇲🇦",
		"mozambique": "🇲🇿",
		"myanmar": "🇲🇲",
		"namibia": "🇳🇦",
		"nauru": "🇳🇷",
		"nepal": "🇳🇵",
		"netherlands": "🇳🇱",
		"new_caledonia": "🇳🇨",
		"new_zealand": "🇳🇿",
		"nicaragua": "🇳🇮",
		"niger": "🇳🇪",
		"nigeria": "🇳🇬",
		"niue": "🇳🇺",
		"norfolk_island": "🇳🇫",
		"northern_mariana_islands": "🇲🇵",
		"north_korea": "🇰🇵",
		"norway": "🇳🇴",
		"oman": "🇴🇲",
		"pakistan": "🇵🇰",
		"palau": "🇵🇼",
		"palestinian_territories": "🇵🇸",
		"panama": "🇵🇦",
		"papua_new_guinea": "🇵🇬",
		"paraguay": "🇵🇾",
		"peru": "🇵🇪",
		"philippines": "🇵🇭",
		"pitcairn_islands": "🇵🇳",
		"poland": "🇵🇱",
		"portugal": "🇵🇹",
		"puerto_rico": "🇵🇷",
		"qatar": "🇶🇦",
		"reunion": "🇷🇪",
		"romania": "🇷🇴",
		"ru": "🇷🇺",
		"rwanda": "🇷🇼",
		"st_barthelemy": "🇧🇱",
		"st_helena": "🇸🇭",
		"st_kitts_nevis": "🇰🇳",
		"st_lucia": "🇱🇨",
		"st_pierre_miquelon": "🇵🇲",
		"st_vincent_grenadines": "🇻🇨",
		"samoa": "🇼🇸",
		"san_marino": "🇸🇲",
		"sao_tome_principe": "🇸🇹",
		"saudi_arabia": "🇸🇦",
		"senegal": "🇸🇳",
		"serbia": "🇷🇸",
		"seychelles": "🇸🇨",
		"sierra_leone": "🇸🇱",
		"singapore": "🇸🇬",
		"sint_maarten": "🇸🇽",
		"slovakia": "🇸🇰",
		"slovenia": "🇸🇮",
		"solomon_islands": "🇸🇧",
		"somalia": "🇸🇴",
		"south_africa": "🇿🇦",
		"south_georgia_south_sandwich_islands": "🇬🇸",
		"kr": "🇰🇷",
		"south_sudan": "🇸🇸",
		"es": "🇪🇸",
		"sri_lanka": "🇱🇰",
		"sudan": "🇸🇩",
		"suriname": "🇸🇷",
		"swaziland": "🇸🇿",
		"sweden": "🇸🇪",
		"switzerland": "🇨🇭",
		"syria": "🇸🇾",
		"taiwan": "🇹🇼",
		"tajikistan": "🇹🇯",
		"tanzania": "🇹🇿",
		"thailand": "🇹🇭",
		"timor_leste": "🇹🇱",
		"togo": "🇹🇬",
		"tokelau": "🇹🇰",
		"tonga": "🇹🇴",
		"trinidad_tobago": "🇹🇹",
		"tunisia": "🇹🇳",
		"tr": "🇹🇷",
		"turkmenistan": "🇹🇲",
		"turks_caicos_islands": "🇹🇨",
		"tuvalu": "🇹🇻",
		"uganda": "🇺🇬",
		"ukraine": "🇺🇦",
		"united_arab_emirates": "🇦🇪",
		"gb": "🇬🇧",
		"uk": "🇬🇧",
		"us": "🇺🇸",
		"us_virgin_islands": "🇻🇮",
		"uruguay": "🇺🇾",
		"uzbekistan": "🇺🇿",
		"vanuatu": "🇻🇺",
		"vatican_city": "🇻🇦",
		"venezuela": "🇻🇪",
		"vietnam": "🇻🇳",
		"wallis_futuna": "🇼🇫",
		"western_sahara": "🇪🇭",
		"yemen": "🇾🇪",
		"zambia": "🇿🇲",
		"zimbabwe": "🇿🇼"
	};

/***/ },
/* 301 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "static/img/logo.273c66b.png";

/***/ },
/* 302 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* script */
	__vue_exports__ = __webpack_require__(98)

	/* template */
	var __vue_template__ = __webpack_require__(323)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ },
/* 303 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* styles */
	__webpack_require__(291)

	/* script */
	__vue_exports__ = __webpack_require__(100)

	/* template */
	var __vue_template__ = __webpack_require__(319)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-40a311ec"

	module.exports = __vue_exports__


/***/ },
/* 304 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* styles */
	__webpack_require__(289)

	/* script */
	__vue_exports__ = __webpack_require__(101)

	/* template */
	var __vue_template__ = __webpack_require__(317)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ },
/* 305 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* styles */
	__webpack_require__(294)

	/* script */
	__vue_exports__ = __webpack_require__(102)

	/* template */
	var __vue_template__ = __webpack_require__(322)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ },
/* 306 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* styles */
	__webpack_require__(296)

	/* script */
	__vue_exports__ = __webpack_require__(103)

	/* template */
	var __vue_template__ = __webpack_require__(325)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	__vue_options__._scopeId = "data-v-ef62e62a"

	module.exports = __vue_exports__


/***/ },
/* 307 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* styles */
	__webpack_require__(286)

	/* script */
	__vue_exports__ = __webpack_require__(104)

	/* template */
	var __vue_template__ = __webpack_require__(314)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ },
/* 308 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* styles */
	__webpack_require__(293)

	/* script */
	__vue_exports__ = __webpack_require__(105)

	/* template */
	var __vue_template__ = __webpack_require__(321)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ },
/* 309 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* styles */
	__webpack_require__(297)

	/* script */
	__vue_exports__ = __webpack_require__(106)

	/* template */
	var __vue_template__ = __webpack_require__(326)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ },
/* 310 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* styles */
	__webpack_require__(290)

	/* script */
	__vue_exports__ = __webpack_require__(107)

	/* template */
	var __vue_template__ = __webpack_require__(318)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ },
/* 311 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* styles */
	__webpack_require__(287)

	/* script */
	__vue_exports__ = __webpack_require__(108)

	/* template */
	var __vue_template__ = __webpack_require__(315)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ },
/* 312 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* styles */
	__webpack_require__(292)

	/* script */
	__vue_exports__ = __webpack_require__(109)

	/* template */
	var __vue_template__ = __webpack_require__(320)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ },
/* 313 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__

	/* styles */
	__webpack_require__(288)

	/* script */
	__vue_exports__ = __webpack_require__(110)

	/* template */
	var __vue_template__ = __webpack_require__(316)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}

	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns

	module.exports = __vue_exports__


/***/ },
/* 314 */
/***/ function(module, exports) {

	module.exports={render:function (){with(this) {
	  return _m(0)
	}},staticRenderFns: [function (){with(this) {
	  return _h('div', {
	    attrs: {
	      "id": "pg-about"
	    }
	  }, [_h('div', {
	    staticClass: "container"
	  }, [_h('h1', ["关于我"]), _h('hr'), _h('h3', ["常常认为：不会打篮球的前端男生不是一个好丈夫"]), _h('ul', {
	    staticClass: "info-list"
	  }, [_h('li', [_h('label', ["昵称："]), _h('span', ["kevin、kevinliang、kevin大叔"])]), _h('li', [_h('label', ["派别："]), _h('span', ["前端开发"])]), _h('li', [_h('label', ["嗜好："]), _h('span', ["电影、篮球、排球、羽毛球等等球类运动"])]), _h('li', [_h('label', ["扣扣："]), _h('span', ["353030799"])]), _h('li', [_h('label', ["伊妹儿："]), _h('span', ["353030799@qq.com"])]), _h('li', [_h('label', ["混迹于："]), _h('span', ["目前在魔都"])]), _h('li', [_h('label', ["摸爬滚打："]), _h('span', ["4年多"])]), _h('li', [_h('label', ["吃饭家伙："]), _h('span', ["HTML5/CSS3/JavaScript、Vue、React、webpack..."])]), _h('li', [_h('label', ["攻占领地："]), _h('span', [_h('a', {
	    attrs: {
	      "target": "_blank",
	      "href": "https://github.com/kevinlvhsl"
	    }
	  }, ["https://github.com/kevinlvhsl"])])])])])])
	}}]}

/***/ },
/* 315 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('div', {
	    attrs: {
	      "id": "pg-index"
	    }
	  }, [_m(0), _h('div', {
	    staticClass: "footer"
	  }, [_h('el-row', {
	    staticClass: "introduce"
	  }, [_h('el-col', {
	    attrs: {
	      "span": 24
	    }
	  }, [_m(1), _m(2)])]), _h('el-row', {
	    staticClass: "friend-link"
	  }, [_h('el-col', {
	    attrs: {
	      "span": 24
	    }
	  }, [_m(3)])]), _h('el-row', {
	    staticClass: "copyright"
	  }, [_h('el-col', {
	    attrs: {
	      "span": 24
	    }
	  }, ["design & code by @kevinlvhsl,nodeJS + vuejs 感谢leancloud.cn提供存储空间"])])])])
	}},staticRenderFns: [function (){with(this) {
	  return _h('div', {
	    staticClass: "container"
	  }, [_h('img', {
	    staticClass: "headimg",
	    attrs: {
	      "src": __webpack_require__(90)
	    }
	  }), _h('h3', ["KEVIN大叔"]), _h('h2', ["前端开发菜鸟、VUEJS、微信小程序"]), _h('ul', {
	    staticClass: "links"
	  }, [_h('li', [_h('a', {
	    staticClass: "github",
	    attrs: {
	      "target": "_blank",
	      "href": "https://github.com/kevinlvhsl",
	      "title": "github"
	    }
	  }), _h('a', {
	    staticClass: "zhihu",
	    attrs: {
	      "target": "_blank",
	      "href": "http://weibo.com/u/3037846237?source=blog",
	      "title": "知乎"
	    }
	  }), _h('a', {
	    staticClass: "weibo",
	    attrs: {
	      "target": "_blank",
	      "href": "http://weibo.com/u/3037846237?source=blog"
	    }
	  }), _h('a', {
	    staticClass: "blogs",
	    attrs: {
	      "target": "_blank",
	      "href": "http://www.cnblogs.com/kevinlvhsl"
	    }
	  })])])])
	}},function (){with(this) {
	  return _h('h2', ["篮球之-星翼空间"])
	}},function (){with(this) {
	  return _h('div', {
	    staticClass: "description"
	  }, ["篮球之-星翼空间 是一个爱好篮球者和前端码农聚集的地方。\n这里会有我的一些前端技术知识点记录 和 分享一些篮球有关的文章和资源链接"])
	}},function (){with(this) {
	  return _h('ul', {
	    staticClass: "links"
	  }, [_h('li', [_h('a', {
	    staticClass: "blogs",
	    attrs: {
	      "target": "_blank",
	      "href": "http://www.cnblogs.com/kevinlvhsl"
	    }
	  }), _h('a', {
	    staticClass: "github",
	    attrs: {
	      "target": "_blank",
	      "href": "https://github.com/kevinlvhsl",
	      "title": "github"
	    }
	  }), _h('a', {
	    staticClass: "zhihu",
	    attrs: {
	      "target": "_blank",
	      "href": "http://weibo.com/u/3037846237?source=blog",
	      "title": "知乎"
	    }
	  }), _h('a', {
	    staticClass: "weibo",
	    attrs: {
	      "target": "_blank",
	      "href": "http://weibo.com/u/3037846237?source=blog"
	    }
	  })])])
	}}]}

/***/ },
/* 316 */
/***/ function(module, exports) {

	module.exports={render:function (){with(this) {
	  return _h('div', {
	    attrs: {
	      "id": "pg-signUp"
	    }
	  }, [_h('div', {
	    staticClass: "form-panel"
	  }, [_m(0), _h('el-form', {
	    ref: "ruleForm",
	    attrs: {
	      "rules": dynamicRule,
	      "model": form,
	      "label-width": "80px",
	      "label-position": "left"
	    },
	    on: {
	      "submit": function($event) {
	        $event.preventDefault();
	        handleSubmit($event)
	      }
	    }
	  }, [_h('el-form-item', {
	    attrs: {
	      "prop": "userName",
	      "label": "用户名"
	    }
	  }, [_h('el-input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (form.userName),
	      expression: "form.userName"
	    }],
	    attrs: {
	      "placeholder": "5~32个字符",
	      "minLength": "5",
	      "maxLength": "32"
	    },
	    domProps: {
	      "value": (form.userName)
	    },
	    on: {
	      "input": function($event) {
	        form.userName = $event
	      }
	    }
	  })]), _h('el-form-item', {
	    attrs: {
	      "prop": "email",
	      "label": "邮箱"
	    }
	  }, [_h('el-input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (form.email),
	      expression: "form.email"
	    }],
	    attrs: {
	      "placeholder": "邮箱地址(不会被公开/必须)"
	    },
	    domProps: {
	      "value": (form.email)
	    },
	    on: {
	      "input": function($event) {
	        form.email = $event
	      }
	    }
	  })]), _h('el-form-item', {
	    attrs: {
	      "prop": "checkPass",
	      "label": "密码"
	    }
	  }, [_h('el-input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (form.checkPass),
	      expression: "form.checkPass"
	    }],
	    attrs: {
	      "type": "password",
	      "placeholder": "6~32(字母、数字、下划线)",
	      "minLength": "6",
	      "maxLength": "32"
	    },
	    domProps: {
	      "value": (form.checkPass)
	    },
	    on: {
	      "input": function($event) {
	        form.checkPass = $event
	      }
	    }
	  })]), _h('el-form-item', {
	    attrs: {
	      "prop": "password",
	      "label": "确认密码"
	    }
	  }, [_h('el-input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (form.password),
	      expression: "form.password"
	    }],
	    attrs: {
	      "type": "password",
	      "placeholder": "两次密码必须一致"
	    },
	    domProps: {
	      "value": (form.password)
	    },
	    on: {
	      "input": function($event) {
	        form.password = $event
	      }
	    }
	  })]), _h('el-form-item', {
	    attrs: {
	      "prop": "sex",
	      "label": "性别"
	    }
	  }, [_h('el-radio-group', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (form.sex),
	      expression: "form.sex"
	    }],
	    domProps: {
	      "value": (form.sex)
	    },
	    on: {
	      "input": function($event) {
	        form.sex = $event
	      }
	    }
	  }, [_h('el-radio', {
	    attrs: {
	      "label": "1"
	    }
	  }, ["帅哥"]), _h('el-radio', {
	    attrs: {
	      "label": "0"
	    }
	  }, ["美女"])])]), _h('el-form-item', [_h('el-button', {
	    nativeOn: {
	      "click": function($event) {
	        $event.preventDefault();
	      }
	    }
	  }, ["取 消"]), (!success) ? _h('el-button', {
	    staticClass: "btn-submit",
	    attrs: {
	      "type": "primary"
	    },
	    nativeOn: {
	      "click": function($event) {
	        $event.preventDefault();
	        handleSubmit($event)
	      }
	    }
	  }, ["提 交"]) : _e()])])])])
	}},staticRenderFns: [function (){with(this) {
	  return _h('h2', ["注 册"])
	}}]}

/***/ },
/* 317 */
/***/ function(module, exports) {

	module.exports={render:function (){with(this) {
	  return _h('div', {
	    staticClass: "game-box"
	  }, [_h('ul', {
	    staticClass: "puzzle-wrap"
	  }, [_l((puzzles), function(puzzle, index) {
	    return _h('li', {
	      class: {
	        'puzzle': true, 'puzzle-empty': !puzzle
	      },
	      domProps: {
	        "textContent": _s(puzzle)
	      },
	      on: {
	        "click": function($event) {
	          moveFn(index)
	        }
	      }
	    })
	  })]), (!started) ? _h('el-button', {
	    staticClass: "btn-reset",
	    nativeOn: {
	      "click": function($event) {
	        startGame($event)
	      }
	    }
	  }, ["开始游戏"]) : _e(), (started) ? _h('div', [_s(time) + "秒"]) : _e()])
	}},staticRenderFns: []}

/***/ },
/* 318 */
/***/ function(module, exports) {

	module.exports={render:function (){with(this) {
	  return _h('div', {
	    attrs: {
	      "id": "pg-detail"
	    },
	    on: {
	      "scroll": checkScrollTop
	    }
	  }, [_h('div', {
	    staticClass: "header",
	    style: ({
	      'background-image': 'url(' + (currBlog.poster || defualtimg) + ')'
	    })
	  }, [_h('div', {
	    staticClass: "category"
	  }, ["分类：" + _s(_f("en2cn")(currBlog.category))]), _h('h1', {
	    staticClass: "title"
	  }, [_s(currBlog.title)]), _h('div', {
	    staticClass: "desc"
	  }, ["---- " + _s(currBlog.desc)]), _h('div', {
	    staticClass: "blog-marks"
	  }, [_l((currBlog.type), function(mark) {
	    return _h('div', {
	      staticClass: "mark"
	    }, [_s(mark)])
	  }), _h('div', {
	    staticClass: "read-count"
	  }, ["阅读次数：" + _s(currBlog.views) + "次", (user) ? _h('div', {
	    staticClass: "admin-editor",
	    attrs: {
	      "style": "display:inline-block;margin-left: 30px"
	    }
	  }, [(!isEditor) ? _h('el-button', {
	    attrs: {
	      "size": "small"
	    },
	    nativeOn: {
	      "click": function($event) {
	        isEditor = true
	      }
	    }
	  }, ["编辑"]) : _e(), (isEditor) ? _h('el-button', {
	    attrs: {
	      "size": "small"
	    },
	    nativeOn: {
	      "click": function($event) {
	        save($event)
	      }
	    }
	  }, ["保存"]) : _e()]) : _e()])])]), _h('div', {
	    staticClass: "container"
	  }, [(!isEditor) ? _h('vue-markdown', {
	    attrs: {
	      "emoji": "emoji",
	      "source": currBlog.content
	    }
	  }) : _e(), (isEditor) ? _h('textarea', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (currBlog.content),
	      expression: "currBlog.content"
	    }],
	    attrs: {
	      "rows": "30",
	      "style": "max-width:100%;width:100%",
	      "placeholder": "在这里输入内容(markdown格式)"
	    },
	    domProps: {
	      "value": _s(currBlog.content)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) return;
	        currBlog.content = $event.target.value
	      }
	    }
	  }) : _e()]), _h('back-top', {
	    ref: "childbtn",
	    attrs: {
	      "target-id": "#pg-detail"
	    }
	  })])
	}},staticRenderFns: []}

/***/ },
/* 319 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){with(this) {
	  return _h('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (currentRoute),
	      expression: "currentRoute"
	    }],
	    staticClass: "comm-head"
	  }, [_h('img', {
	    staticClass: "headimg",
	    class: {
	      round: isPlaying
	    },
	    attrs: {
	      "src": __webpack_require__(90)
	    },
	    on: {
	      "click": changePlay
	    }
	  }), _h('router-link', {
	    staticClass: "logo-box",
	    attrs: {
	      "to": "/index"
	    }
	  }, [_m(0), _m(1)]), (user) ? _h('div', {
	    staticClass: "welcome"
	  }, [_h('strong', [_s(user.username) + "  "]), (user) ? _h('a', {
	    on: {
	      "click": loginOut
	    }
	  }, ["注销"]) : _e()]) : _e(), _h('el-menu', {
	    staticClass: "app-nav",
	    attrs: {
	      "default-active": "index",
	      "mode": "horizontal"
	    }
	  }, [_h('router-link', {
	    attrs: {
	      "to": "index"
	    }
	  }, [_h('el-menu-item', {
	    attrs: {
	      "index": "index"
	    }
	  }, ["HOME"])]), _h('router-link', {
	    attrs: {
	      "to": "blogs"
	    }
	  }, [_h('el-menu-item', {
	    attrs: {
	      "index": "blogs"
	    }
	  }, ["BLOG"])]), _h('router-link', {
	    attrs: {
	      "to": "about"
	    }
	  }, [_h('el-menu-item', {
	    attrs: {
	      "index": "about"
	    }
	  }, ["ABOUT ME"])]), _h('router-link', {
	    attrs: {
	      "to": "game"
	    }
	  }, [_h('el-menu-item', {
	    attrs: {
	      "index": "game"
	    }
	  }, ["GAME"])]), (user) ? _h('router-link', {
	    attrs: {
	      "to": "admin"
	    }
	  }, [_h('el-menu-item', {
	    attrs: {
	      "index": "admin"
	    }
	  }, ["ADMIN"])]) : _e(), _h('router-link', {
	    attrs: {
	      "to": "detail",
	      "index": "detail"
	    }
	  })]), _h('audio', {
	    ref: "myaudio",
	    attrs: {
	      "src": url,
	      "autoplay": "autoplay",
	      "loop": "loop"
	    },
	    on: {
	      "playing": function($event) {
	        isPlaying = true
	      },
	      "pause": function($event) {
	        isPlaying = false
	      }
	    }
	  })])
	}},staticRenderFns: [function (){with(this) {
	  return _h('img', {
	    staticClass: "logo",
	    attrs: {
	      "src": __webpack_require__(301)
	    }
	  })
	}},function (){with(this) {
	  return _h('p', ["篮球-星翼空间"])
	}}]}

/***/ },
/* 320 */
/***/ function(module, exports) {

	module.exports={render:function (){with(this) {
	  return _h('div', {
	    attrs: {
	      "id": "pg-login"
	    }
	  }, [_h('div', {
	    staticClass: "form-panel"
	  }, [_m(0), _h('el-form', {
	    ref: "ruleForm",
	    attrs: {
	      "rules": dynamicRule,
	      "model": form,
	      "label-width": "80px",
	      "label-position": "left"
	    },
	    on: {
	      "submit": function($event) {
	        $event.preventDefault();
	        handleSubmit($event)
	      }
	    }
	  }, [_h('el-form-item', {
	    attrs: {
	      "prop": "userName",
	      "label": "用户名"
	    }
	  }, [_h('el-input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (form.userName),
	      expression: "form.userName"
	    }],
	    attrs: {
	      "placeholder": "5~32个字符",
	      "minLength": "5",
	      "maxLength": "32"
	    },
	    domProps: {
	      "value": (form.userName)
	    },
	    on: {
	      "input": function($event) {
	        form.userName = $event
	      }
	    }
	  })]), _h('el-form-item', {
	    attrs: {
	      "prop": "password",
	      "label": "密码"
	    }
	  }, [_h('el-input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (form.password),
	      expression: "form.password"
	    }],
	    attrs: {
	      "type": "password",
	      "placeholder": "6~32(字母、数字、下划线)",
	      "required": "required",
	      "minLength": "6",
	      "maxLength": "32"
	    },
	    domProps: {
	      "value": (form.password)
	    },
	    on: {
	      "input": function($event) {
	        form.password = $event
	      }
	    }
	  })]), _h('el-form-item', [_h('el-button', {
	    nativeOn: {
	      "click": function($event) {
	        $event.preventDefault();
	      }
	    }
	  }, ["取 消"]), (!success) ? _h('el-button', {
	    staticClass: "btn-submit",
	    attrs: {
	      "type": "success"
	    },
	    nativeOn: {
	      "click": function($event) {
	        $event.preventDefault();
	        handleLogin($event)
	      }
	    }
	  }, ["登 录"]) : _e()])])])])
	}},staticRenderFns: [function (){with(this) {
	  return _h('h2', ["登 录"])
	}}]}

/***/ },
/* 321 */
/***/ function(module, exports) {

	module.exports={render:function (){with(this) {
	  return _h('div', {
	    staticClass: "view",
	    attrs: {
	      "id": "pg-admin"
	    }
	  }, [_h('div', {
	    staticClass: "container"
	  }, [_m(0), _h('el-form', {
	    ref: "form",
	    attrs: {
	      "model": form,
	      "label-width": "80px"
	    }
	  }, [_h('el-form-item', {
	    attrs: {
	      "label": "标题："
	    }
	  }, [_h('el-input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (form.title),
	      expression: "form.title"
	    }],
	    domProps: {
	      "value": (form.title)
	    },
	    on: {
	      "input": function($event) {
	        form.title = $event
	      }
	    }
	  })]), _h('el-form-item', {
	    attrs: {
	      "label": "分类："
	    }
	  }, [_h('el-select', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (form.category),
	      expression: "form.category"
	    }],
	    attrs: {
	      "placeholder": "请选择技术分类"
	    },
	    domProps: {
	      "value": (form.category)
	    },
	    on: {
	      "input": function($event) {
	        form.category = $event
	      }
	    }
	  }, [_l((labels), function(item) {
	    return _h('el-option', {
	      attrs: {
	        "label": item.name
	      },
	      domProps: {
	        "value": item.value
	      }
	    })
	  })])]), _h('el-form-item', {
	    attrs: {
	      "label": "标签："
	    }
	  }, [_h('el-checkbox-group', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (form.type),
	      expression: "form.type"
	    }],
	    domProps: {
	      "value": (form.type)
	    },
	    on: {
	      "input": function($event) {
	        form.type = $event
	      }
	    }
	  }, [_l((types[form.category]), function(lb) {
	    return _h('el-checkbox', {
	      attrs: {
	        "label": lb,
	        "name": "type"
	      }
	    })
	  })])]), _h('el-form-item', {
	    attrs: {
	      "label": "图片：",
	      "style": "text-align:left"
	    }
	  }, [_h('input', {
	    attrs: {
	      "id": "photoFileUpload",
	      "type": "file"
	    },
	    on: {
	      "change": uploadFile
	    }
	  }), (form.poster) ? _h('img', {
	    staticClass: "preview-poster",
	    attrs: {
	      "src": form.poster
	    }
	  }) : _e(), (form.poster) ? _h('el-button', {
	    attrs: {
	      "plain": true,
	      "type": "danger",
	      "size": "small"
	    },
	    nativeOn: {
	      "click": function($event) {
	        $event.preventDefault();
	        form.poster = ''
	      }
	    }
	  }, ["删除"]) : _e()]), _h('el-form-item', {
	    attrs: {
	      "label": "摘要："
	    }
	  }, [_h('el-input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (form.desc),
	      expression: "form.desc"
	    }],
	    attrs: {
	      "type": "textarea",
	      "rows": 2,
	      "minlength": 1,
	      "maxlength": 30,
	      "placeholder": "简单描述(1~30字)"
	    },
	    domProps: {
	      "value": (form.desc)
	    },
	    on: {
	      "input": function($event) {
	        form.desc = $event
	      }
	    }
	  })]), _h('el-form-item', {
	    attrs: {
	      "label": "内容："
	    }
	  }), _h('div', {
	    staticClass: "content-editor"
	  }, [_h('div', {
	    staticClass: "left-editor"
	  }, [_h('textarea', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (form.content),
	      expression: "form.content"
	    }],
	    attrs: {
	      "rows": "20",
	      "placeholder": "在这里输入内容(markdown格式)"
	    },
	    domProps: {
	      "value": _s(form.content)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) return;
	        form.content = $event.target.value
	      }
	    }
	  })]), _h('div', {
	    staticClass: "right-preview"
	  }, [_h('vue-markdown', {
	    attrs: {
	      "emoji": "emoji",
	      "source": form.content
	    }
	  })])]), _h('el-form-item', [_h('el-button', {
	    attrs: {
	      "type": "primary submit"
	    },
	    nativeOn: {
	      "click": function($event) {
	        $event.preventDefault();
	        onSubmit($event)
	      }
	    }
	  }, ["立即发布"]), _h('el-button', ["取消"])])])])])
	}},staticRenderFns: [function (){with(this) {
	  return _h('h1', ["发布文章"])
	}}]}

/***/ },
/* 322 */
/***/ function(module, exports) {

	module.exports={render:function (){with(this) {
	  return _h('div', {
	    staticClass: "side-nav",
	    class: {
	      show: isShow
	    }
	  }, [_h('el-menu', {
	    staticClass: "el-menu-vertical-demo",
	    attrs: {
	      "default-active": currentRoute
	    }
	  }, [_h('router-link', {
	    attrs: {
	      "to": "/index"
	    }
	  }, [_h('el-menu-item', {
	    attrs: {
	      "index": "index"
	    }
	  }, [_m(0)])]), _h('router-link', {
	    attrs: {
	      "to": "about"
	    }
	  }, [_h('el-menu-item', {
	    attrs: {
	      "index": "/about"
	    }
	  }, [_m(1)])]), _h('router-link', {
	    attrs: {
	      "to": "blogs"
	    }
	  }, [_h('el-menu-item', {
	    attrs: {
	      "index": "/blogs"
	    }
	  }, [_m(2)])]), (!logined) ? _h('router-link', {
	    attrs: {
	      "to": "login"
	    }
	  }, [_h('el-menu-item', {
	    attrs: {
	      "index": "/login"
	    }
	  }, [_m(3)])]) : _e(), (!logined) ? _h('router-link', {
	    attrs: {
	      "to": "signUp"
	    }
	  }, [_h('el-menu-item', {
	    attrs: {
	      "index": "/signUp"
	    }
	  }, [_m(4)])]) : _e(), _h('router-link', {
	    attrs: {
	      "to": "detail",
	      "index": "detail"
	    }
	  })])])
	}},staticRenderFns: [function (){with(this) {
	  return _h('i', {
	    staticClass: "el-icon-menu"
	  }, [" HOME"])
	}},function (){with(this) {
	  return _h('i', {
	    staticClass: "el-icon-menu"
	  }, [" ABOUT ME"])
	}},function (){with(this) {
	  return _h('i', {
	    staticClass: "el-icon-menu"
	  }, [" BLOG"])
	}},function (){with(this) {
	  return _h('i', {
	    staticClass: "el-icon-menu"
	  }, [" LOGIN"])
	}},function (){with(this) {
	  return _h('i', {
	    staticClass: "el-icon-menu"
	  }, [" SIGNUP"])
	}}]}

/***/ },
/* 323 */
/***/ function(module, exports) {

	module.exports={render:function (){with(this) {
	  return _h('div', {
	    attrs: {
	      "id": "app"
	    }
	  }, [_h('transition', {
	    attrs: {
	      "name": "fade",
	      "mode": "out-in"
	    }
	  }, [_h('router-view', {
	    directives: [{
	      name: "loading",
	      rawName: "v-loading.fullscreen.lock",
	      value: (loading),
	      expression: "loading",
	      modifiers: {
	        "fullscreen": true,
	        "lock": true
	      }
	    }],
	    staticClass: "view",
	    attrs: {
	      "element-loading-text": "加载中"
	    },
	    on: {
	      "onloginIn": loginIn,
	      "onloginOut": loginOut
	    }
	  })]), _h('comm-head', {
	    attrs: {
	      "user": user
	    },
	    on: {
	      "onloginOut": loginOut
	    }
	  }), _h('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (loading),
	      expression: "loading"
	    }],
	    staticClass: "loading-ball"
	  }, [_m(0)])])
	}},staticRenderFns: [function (){with(this) {
	  return _h('em')
	}}]}

/***/ },
/* 324 */
/***/ function(module, exports) {

	module.exports={render:function (){with(this) {
	  return _h('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (!isTop),
	      expression: "!isTop"
	    }],
	    staticClass: "backtop"
	  }, [_h('a', {
	    class: {
	      hide: isTop
	    },
	    on: {
	      "click": goTop
	    }
	  })])
	}},staticRenderFns: []}

/***/ },
/* 325 */
/***/ function(module, exports) {

	module.exports={render:function (){with(this) {
	  return _h('div', {
	    staticClass: "oprite-btn",
	    class: {
	      hide: !isShow
	    },
	    on: {
	      "click": changeShow
	    }
	  }, [_m(0), _m(1)])
	}},staticRenderFns: [function (){with(this) {
	  return _h('div', {
	    staticClass: "defa"
	  }, [_h('i'), _h('i'), _h('i')])
	}},function (){with(this) {
	  return _h('div', {
	    staticClass: "strong"
	  }, [_h('em'), _h('em')])
	}}]}

/***/ },
/* 326 */
/***/ function(module, exports) {

	module.exports={render:function (){with(this) {
	  return _h('div', {
	    attrs: {
	      "id": "pg-blogs"
	    },
	    on: {
	      "scroll": checkScrollTop
	    }
	  }, [_m(0), _h('div', {
	    staticClass: "container"
	  }, [_h('div', {
	    staticClass: "opration-bar"
	  }, [_h('el-checkbox', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (hot),
	      expression: "hot"
	    }],
	    staticClass: "sort-btn",
	    domProps: {
	      "value": (hot)
	    },
	    on: {
	      "change": resort,
	      "input": function($event) {
	        hot = $event
	      }
	    }
	  }, ["热度"]), _h('el-radio-group', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (query),
	      expression: "query"
	    }],
	    domProps: {
	      "value": (query)
	    },
	    on: {
	      "change": resort,
	      "input": function($event) {
	        query = $event
	      }
	    }
	  }, [_h('el-radio-button', {
	    attrs: {
	      "label": "",
	      "checked": "checked"
	    }
	  }, ["全 部"]), _l((labels), function(v, k) {
	    return _h('el-radio-button', {
	      attrs: {
	        "label": k
	      }
	    }, [_s(v)])
	  })])]), (!blogs.length) ? _h('div', {
	    staticClass: "no-list"
	  }, [_m(1)]) : _h('div', {
	    staticClass: "wraper"
	  }, [_h('div', {
	    staticClass: "blog-list"
	  }, [_l((blogs), function(bo) {
	    return _h('el-card', {
	      staticClass: "item",
	      attrs: {
	        "body-style": {
	          padding: '0px'
	        }
	      }
	    }, [_h('div', {
	      staticClass: "top-image"
	    }, [_h('img', {
	      attrs: {
	        "src": bo.poster || defualtimg
	      }
	    })]), _h('div', {
	      staticClass: "category"
	    }, [_h('div', {
	      staticClass: "tpye"
	    }, [_s(_f("en2cn")(bo.category))])]), _h('div', {
	      staticClass: "bottom-desc"
	    }, [_h('h3', [_s(bo.title)]), _h('div', {
	      staticClass: "desc"
	    }, [_s(bo.desc)]), _h('div', {
	      staticClass: "views"
	    }, [_s(bo.views) + "次"]), _h('div', {
	      staticClass: "bottom clearfix",
	      on: {
	        "click": function($event) {
	          goDetail(bo.id)
	        }
	      }
	    }, [_h('time', {
	      staticClass: "time"
	    }, [_s(_f("dateToCN")(bo.date))]), _h('el-button', {
	      staticClass: "button",
	      attrs: {
	        "type": " primary"
	      }
	    }, ["去看看"])])])])
	  })])]), _h('div', {
	    staticClass: "page-box"
	  }, [_h('el-pagination', {
	    attrs: {
	      "layout": "prev, pager, next",
	      "page-size": size,
	      "total": listLength
	    },
	    on: {
	      "currentchange": changePage
	    }
	  })])]), _h('back-top', {
	    ref: "childbtn",
	    attrs: {
	      "target-id": "#pg-blogs"
	    }
	  })])
	}},staticRenderFns: [function (){with(this) {
	  return _h('h1', {
	    staticClass: "title"
	  }, ["博文列表"])
	}},function (){with(this) {
	  return _h('div', {
	    staticClass: "no-desc"
	  }, ["没有你喜欢的？换个类目看看吧！"])
	}}]}

/***/ },
/* 327 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ }
]);