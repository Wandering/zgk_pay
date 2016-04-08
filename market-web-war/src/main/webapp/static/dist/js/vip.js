webpackJsonp([14],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	$(function () {
	    var cookie = __webpack_require__(2);
	    var util = __webpack_require__(1);
	    var urlConfig = __webpack_require__(3);
	    var account = cookie.getCookieValue('phone');

	    var isLogin = cookie.getCookieValue('isLogin');
	    var token = cookie.getCookieValue('token');

	    if(isLogin){
	        $('#vip-buy').attr('href','/vip-buy?token='+token);
	    }




	    $('#account-number').val(account);

	    $('#header-menu').show();
	    $('#header-title').text('VIP');

	    $('.vip-btn').click(function () {
	        var cardNum = $.trim($('#card-number').val());
	        var cardPsd = $.trim($('#card-psd').val());
	        if (cardNum == "") {
	            util.drawToast('卡号不能为空');
	            return;
	        }
	        if (cardNum.length != 10 && cardNum.length != 8) {
	            util.drawToast('请输入正确的卡号');
	            return;
	        }
	        if (cardPsd == "") {
	            util.drawToast('卡密码不能为空');
	            return;
	        }
	        if (cardPsd.length != 10) {
	            util.drawToast('请输入正确的卡密码');
	            return;
	        }
	        util.ajaxFun(urlConfig.upgradeVipByCard, 'POST', {
	            "cardNumber": cardNum,
	            "password": cardPsd
	        }, function (res) {
	            console.log(res)
	            if (res.rtnCode == '0000000') {
	                var vipStatus = res.bizData.vipStatus;
	                var vipActiveDate = res.bizData.vipActiveDate;
	                var vipEndDate = res.bizData.vipEndDate;
	                console.log(vipActiveDate)
	                console.log(vipEndDate)
	                cookie.setCookie("vipStatus", vipStatus, 4, "/");
	                cookie.setCookie("vipActiveDate", vipActiveDate.substr(0, 10), 4, "/");
	                cookie.setCookie("vipEndDate", vipEndDate.substr(0, 10), 4, "/");
	                util.drawToast('申请成功');
	                window.location.assign('/vip-check?token='+token)
	            } else {
	                util.drawToast(res.msg);
	            }
	            if (res.rtnCode == '0900002' || res.rtnCode == '0900001') {
	                util.drawToast(res.msg);
	            }
	        });
	    });
	});






/***/ }
]);