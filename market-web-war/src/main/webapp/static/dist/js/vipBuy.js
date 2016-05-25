webpackJsonp([27],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	(function () {
	    $('#header-menu').show();
	    var interfaceUrl = __webpack_require__(3);
	    var cookie = __webpack_require__(2);
	    var util = __webpack_require__(1);


	    $(document).ready(function () {
	        $('#header-title').text('在线购买');


	        var userId = cookie.getCookieValue('userId');
	        if (!cookie.getCookieValue('isLogin')) {
	            util.drawToast('请登录后再购买!');
	            setTimeout(function () {
	                window.location.href = "/login?state=vip-buy";
	            }, 2000);
	            return false;
	        }

	        util.ajaxFun(interfaceUrl.getBuyInfo, 'POST', {
	            userId: userId
	        }, function (res) {
	            if (res.rtnCode == '0000000') {
	            }
	        });


	    });

	})();

/***/ }
]);