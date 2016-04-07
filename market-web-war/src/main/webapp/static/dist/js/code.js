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



	    var userId = util.getLinkey('userId');
	    util.ajaxFun(interfaceUrl.getCaptchaImg, 'get', {
	        'userId': userId
	    }, function (res) {
	        console.log(res);
	        if (res.rtnCode = '0000000') {
	            var dataJson = res.bizData;
	            $('.name').text(dataJson.name);
	            $('.tel').text(dataJson.account);
	            $('#captchImg').attr('src', dataJson.qrcodeUrl);
	        }
	    });

	    //function confirmLayer(content) {
	    //    var confirmLayer = [];
	    //    confirmLayer.push('<div class="mask show">');
	    //    confirmLayer.push(content);
	    //    confirmLayer.push('</div>');
	    //    $('body').append(confirmLayer.join(''))
	    //}

	    //分享
	    $('.share-btn').click(function () {
	        //var subHtml = '<img src="/static/dist/img/sharer.png" />';
	        //confirmLayer(subHtml);
	        $('.mask').addClass('show');
	    });
	    $('body').on('click','.mask',function () {
	        $(this).removeClass('show');
	    });

	    $('#header-title').text('二维码');
	    $('#header-back').show().on('click',function(){
	        window.location.href = '/user-detail';
	    });




	});

/***/ }
]);