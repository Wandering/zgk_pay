webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by pdeng on 16/3/31.
	 */
	var util = __webpack_require__(1);
	var interfaceUrl = __webpack_require__(3);
	var cookie = __webpack_require__(2);
	$(function () {
	    var account = util.getLinkey('account');
	    util.ajaxFun(interfaceUrl.getCaptchaImg, 'get', {
	        'account': account
	    }, function (res) {
	        //var res = {
	        //    bizData: {
	        //        'captchImg': 'http://pic.baike.soso.com/p/20131211/20131211091752-393669037.jpg',
	        //        'name': 'pdeng',
	        //        'account': '18710921676'
	        //    },
	        //    rtnCode: '0000000'
	        //};
	        if (res.rtnCode = '0000000') {
	            var dataJson = res.bizData;
	            $('.name').text(dataJson.name);
	            $('.tel').text(dataJson.account);
	            $('.captchImg').attr('src', dataJson.captchImg);
	        }
	    });
	    //分享
	    $('.share-btn').click(function () {
	        $('.mask').show();
	    });
	    $('.mask').click(function () {
	        $(this).hide();
	    })
	});

/***/ }
]);