/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	$(function () {
	    var util = __webpack_require__(1);
	    var cookie = __webpack_require__(2);
	    var toUrl = util.getLinkey('toUrl');
	    var isLogin = cookie.getCookieValue('isLogin');
	    var token = cookie.getCookieValue('token');
	    var userName = cookie.getCookieValue('userName');

	    if (isLogin) {
	        $('#userName').text(userName);
	        //$('#consumerLinks').attr('href', '/consumer-list?toUrl=consumer-list&token=' + token);
	        //$('#orderLinks').attr('href', '/order?toUrl=order&token=' + token);
	        //$('#userLinks').attr('href', '/user-detail?toUrl=user-detail&token=' + token);
	        //$('#vipStatus').attr('href', '/vip?toUrl=vip&token=' + token);
	    }



	    //var vipStatus = cookie.getCookieValue('vipStatus');
	    //if (vipStatus == "1") {
	    //    $('#vipStatus').attr('href', '/vip-check?token=' + token);
	    //} else {
	    //    $('#vipStatus').attr('href', '/vip?token=' + token);
	    //}
	    // 打开主菜单
	    $('#header-menu').on('click', function () {
	        if (isLogin) {
	            $('#menu-header').hide();
	            $('#end-login').show();
	            $('.header-close').on('click', function () {
	                $('#menu-header').show();
	                $('#end-login').hide();
	            });
	        } else {
	            $('#menu-header').hide();
	            $('#un-login').show();
	            $('.header-close').on('click', function () {
	                $('#menu-header').show();
	                $('#un-login').hide();
	            });
	        }
	    });


	    // 切换省份
	    $('#province-text').on('click', function () {
	        $('#province-option').toggleClass('hide');
	        if (isLogin) {
	            $('#province-option').hide();
	        }
	    });
	    if (!cookie.getCookieValue('userKey')) {
	        cookie.setCookie("userKey", 'zj', 4, "/");
	        $('#province-text').text('浙江');
	    }
	    var userKey = cookie.getCookieValue('userKey');
	    var provinceTxt = $('#province-option-list a[domain="' + userKey + '"]').text();
	    $('#province-text').text(provinceTxt);
	    var paths = window.location.pathname.split('/');
	    var pagePath = paths[paths.length - 1];
	    $('#province-option-list').on('click', 'a', function () {
	        var domainProvince = $(this).attr('domain');
	        window.location.href = '/' + pagePath;
	        console.log(domainProvince);
	        if (!userKey) {
	            cookie.setCookie("userKey", 'zj', 4, "/");
	        } else {
	            cookie.setCookie("userKey", domainProvince, 4, "/");
	        }
	    });

	    var userId = cookie.getCookieValue('userId');
	    $('.invite-friend').click(function () {
	        var loginFlag = cookie.getCookieValue('isLogin');
	        if (loginFlag != 'true') {
	            window.location.href = '/login?toUrl=code';
	            return false;
	        }
	        window.location.href = '/code?userId=' + userId;
	    });
	    // 退出
	    $('#logout-btn').on('click', function () {
	        cookie.deleteCookie('city', '');
	        cookie.deleteCookie('county', '');
	        cookie.deleteCookie('icon', '');
	        cookie.deleteCookie('isLogin', '');
	        cookie.deleteCookie('isReported', '');
	        cookie.deleteCookie('isSurvey', '');
	        cookie.deleteCookie('phone', '');
	        cookie.deleteCookie('province', '');
	        cookie.deleteCookie('qrcodeUrl', '');
	        cookie.deleteCookie('subjectType', '');
	        cookie.deleteCookie('token', '');
	        cookie.deleteCookie('userKey', '');
	        cookie.deleteCookie('userName', '');
	        cookie.deleteCookie('vipStatus', '');
	        cookie.deleteCookie('userId', '');
	        cookie.deleteCookie('proName', '');
	        cookie.deleteCookie('cityName', '');
	        cookie.deleteCookie('countyName', '');
	        cookie.deleteCookie('vipActiveDate', '');
	        cookie.deleteCookie('vipEndDate', '');
	        cookie.deleteCookie("flag", '');
	        window.location.href='/login?toUrl=' + toUrl;
	    });
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	//var domainStr = 'zgkser.zhigaokao.cn'; //正式
	//var domainStr = 'test.zhigaokao.cn'; //测试
	//var domainStr = 'm.zhigaokao.com:8080';

	//获取域名前缀=============================
	//var urlDomain = window.location.hostname + '';
	//var urlArr = urlDomain.split('.');
	//var provinceKey = urlArr[0];

	//console.log(window.location.hostname);


	var cookie = __webpack_require__(2);

	var isLogin = function () {
	    return cookie.getCookieValue('isLogin')
	};
	function ajaxFun(url, method, data, callback) {
	    if (cookie.getCookieValue('token')) {
	        data.token = cookie.getCookieValue('token');
	    }
	    data.userKey = cookie.getCookieValue('userKey');
	    var strParameter = '';
	    for (var i in data) {
	        strParameter += "&" + i + "=" + data[i];
	    }
	    $.ajax({
	        url: url,
	        type: method,
	        data: data || {},
	        success: callback,
	        error: callback
	    });
	};

	function ajaxFunJSON(url, method, data, callback) {
	    if (cookie.getCookieValue('token')) {
	        data.token = cookie.getCookieValue('token');
	    }
	    data.userKey = cookie.getCookieValue('userKey');
	    console.log(JSON.stringify(data));
	    $.ajax({
	        url: url,
	        type: method,
	        contentType: 'application/json',
	        dataType: 'json',
	        data: JSON.stringify(data),
	        success: callback,
	        error: callback
	    });
	}


	var getLinkey = function getLinkey(name) {
	    var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
	    if (reg.test(window.location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
	    return "";
	};


	var tips = function tips(obj, txt) {
	    $(obj).text(txt).fadeIn('1500');
	    setTimeout(function () {
	        $(obj).fadeOut('1500');
	    }, 1000);
	};



	function drawToast(message) {
	    var intervalCounter = null;
	    var alert = document.getElementById("toast");
	    if (!alert) {
	        var toastHTML = '<div id="toast">' + message + '</div>';

	        document.body.insertAdjacentHTML('beforeEnd', toastHTML);
	    } else {
	        alert.style.opacity = .9;
	    }
	    intervalCounter = setInterval(function () {
	        var alert = $("#toast");
	        alert.css('opacity', 0).remove();
	        clearInterval(intervalCounter);
	    }, 1000);
	}


	function layer(message, btns) {
	    var alert = document.getElementById("toast");
	    if (!alert) {
	        var toastHTML = '<div id="toast">'
	            + message;
	        if (btns) {
	            toastHTML += btns;
	        }
	        toastHTML += '</div>';
	        document.body.insertAdjacentHTML('beforeEnd', toastHTML);
	    } else {
	        alert.style.opacity = .9;
	    }
	}


	function confirmLayer(title,content) {
	    var confirmLayer = [];
	    confirmLayer.push('<div class="mask show">');
	    confirmLayer.push('<div class="modal">');
	    confirmLayer.push('<div class="modal-title">'+ title +'</div>');
	    confirmLayer.push('<div class="modal-body">');
	    confirmLayer.push(content);
	    confirmLayer.push('</div>');
	    confirmLayer.push('<div class="modal-footer">');
	    confirmLayer.push('<button id="close-modal" type="button">取消</button>');
	    confirmLayer.push('<button id="confirm-btn" type="button">确定</button>');
	    confirmLayer.push('</div>');
	    confirmLayer.push('</div>');
	    confirmLayer.push('</div>');
	    $('body').append(confirmLayer.join('')).on('click','#close-modal',function() {
	        $('.mask').remove();
	    });
	}



	exports.isLogin = isLogin;
	exports.ajaxFun = ajaxFun;
	exports.getLinkey = getLinkey;
	//exports.domain = domainStr;
	//exports.provinceKey = provinceKey;
	exports.tips = tips;
	exports.drawToast = drawToast;
	exports.layer = layer;
	exports.ajaxFunJSON = ajaxFunJSON;
	exports.confirmLayer = confirmLayer;
















/***/ },
/* 2 */
/***/ function(module, exports) {

	
	exports.setCookie = setCookie;
	exports.getCookieValue = getCookieValue;
	exports.deleteCookie = deleteCookie;



	//var domainStr = 'zhigaokao.cn'; // 正式
	//var domainStr = 'test.zhigaokao.cn'; // 测试
	//var domainStr = 'zhigaokao.com'; // 前端开发

	// hours为空字符串时,cookie的生存期至浏览器会话结束。
	// hours为数字0时,建立的是一个失效的cookie,这个cookie会覆盖已经建立过的同名、同path的cookie（如果这个cookie存在）。
	// 设置cookie
	function setCookie(name,value,hours,path){
	    var name = escape(name);
	    var value = escape(value);
	    var expires = new Date();
	    //expires.setTime(expires.getTime() + days*24*60*60*1000);
	    expires.setTime(expires.getTime() + hours*60*60*1000);
	    path = path == "" ? "": ";path=" + path;
	    //var domain = ";domain="+domainStr;
	    expires = (typeof hours) == "string" ? "" : ";expires=" + expires.toUTCString();
	    document.cookie = name + "=" + value + expires + path;
	}
	// 获取cookie
	function getCookieValue(name){
	    var name = escape(name);
	    //读cookie属性，这将返回文档的所有cookie
	    var allcookies = document.cookie;
	    //查找名为name的cookie的开始位置
	    name += "=";
	    var pos = allcookies.indexOf(name);
	    //如果找到了具有该名字的cookie，那么提取并使用它的值
	    if (pos != -1){                                             //如果pos值为-1则说明搜索"version="失败
	        var start = pos + name.length;                  //cookie值开始的位置
	        var end = allcookies.indexOf(";",start);        //从cookie值开始的位置起搜索第一个";"的位置,即cookie值结尾的位置
	        if (end == -1) end = allcookies.length;        //如果end值为-1说明cookie列表里只有一个cookie
	        var value = allcookies.substring(start,end);  //提取cookie的值
	        return unescape(value);                           //对它解码
	    }
	    else return "";                                             //搜索失败，返回空字符串
	}

	// 删除cookie
	function deleteCookie(name,path){
	    var name = escape(name);
	    var expires = new Date(0);
	    path = path == "" ? "" : ";path=" + path;
	    //var domain = ";domain="+domainStr;
	    document.cookie = name + "="+ ";expires=" + expires.toUTCString() + path ;
	}


/***/ }
/******/ ]);