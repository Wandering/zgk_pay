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

	var cookie = __webpack_require__(2);



	    var isLogin = cookie.getCookieValue('isLogin');



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
	    $('#province-text').on('click',function(){
	        $('#province-option').toggleClass('hide');
	    });
	    if(!cookie.getCookieValue('userKey')){
	        cookie.setCookie("userKey", 'zj', 4, "/");
	        $('#province-text').text('浙江');
	    }




	    var userKey = cookie.getCookieValue('userKey');

	    var provinceTxt = $('#province-option-list a[domain="'+ userKey +'"]').text();
	    $('#province-text').text(provinceTxt);

	    var paths = window.location.pathname.split('/');
	    var pagePath = paths[paths.length - 1];

	    $('#province-option-list').on('click','a',function(){
	        var dataHref = $(this).attr('data-href');
	        var domainProvince = $(this).attr('domain');
	        window.location.href= dataHref +pagePath;
	        console.log(domainProvince);
	        if (!isLogin) {
	            cookie.setCookie("userKey", domainProvince, 4, "/");
	        }
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
	    });




/***/ },
/* 1 */,
/* 2 */
/***/ function(module, exports) {

	
	exports.setCookie = setCookie;
	exports.getCookieValue = getCookieValue;
	exports.deleteCookie = deleteCookie;



	var domainStr = 'zhigaokao.cn'; // 正式
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
	    var domain = ";domain="+domainStr;
	    expires = (typeof hours) == "string" ? "" : ";expires=" + expires.toUTCString();
	    document.cookie = name + "=" + value + expires + path + domain;
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
	    var domain = ";domain="+domainStr;
	    document.cookie = name + "="+ ";expires=" + expires.toUTCString() + path + domain;
	}


/***/ }
/******/ ]);