webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	$(function () {
	    $('#header-title').text('二维码');
	    $('#header-back').show().on('click', function () {
	        window.location.href = '/user-detail';
	        if (isLogin) {
	            window.location.href = '/user-detail?token=' + token;
	        }
	    });

	    var util = __webpack_require__(1);
	    var interfaceUrl = __webpack_require__(3);
	    var cookie = __webpack_require__(2);
	    var isLogin = cookie.getCookieValue('isLogin');
	    var token = cookie.getCookieValue('token');

	    function isWeiXin() {
	        var ua = window.navigator.userAgent.toLowerCase();
	        if (ua.indexOf('micromessenger') > -1) {
	            return true;
	        } else {
	            return false;
	        }
	    }


	    var userId = util.getLinkey('userId');
	    util.ajaxFun(interfaceUrl.getCaptchaImg, 'get', {
	        'userId': userId
	    }, function (res) {
	        if (res.rtnCode = '0000000') {
	            var dataJson = res.bizData;
	            $('.name').text(dataJson.name);
	            $('.tel').text(dataJson.account);
	            $('#captchImg').attr('src', dataJson.qrcodeUrl);
	        }
	    });

	    //分享
	    if (isWeiXin()) {
	        $('.share-btn').click(function () {
	            $('.mask').addClass('show');
	        });
	    } else {
	        $('.share-btn').hide();
	    }

	    $('body').on('click', '.mask', function () {
	        $(this).removeClass('show');
	    });







	});

/***/ }
]);