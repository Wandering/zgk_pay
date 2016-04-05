webpackJsonp([10],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var cookie = __webpack_require__(2);
	var util = __webpack_require__(1);
	var urlConfig = __webpack_require__(3);
	var account = cookie.getCookieValue('phone');
	$('#account-number').val(account);
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
	        if (res.rtnCode == '0000000') {
	            var vipStatus = res.bizData.vipStatus;
	            var vipActiveDate = res.bizData.vipActiveDate;
	            var vipEndDate = res.bizData.vipEndDate;
	            util.cookie.setCookie("vipStatus", vipStatus, 4, "");
	            util.cookie.setCookie("vipActiveDate", vipActiveDate, 4, "");
	            util.cookie.setCookie("vipEndDate", vipEndDate, 4, "");
	            util.drawToast('申请成功');
	        } else {
	            util.drawToast('res.msg');
	        }
	        if (res.rtnCode == '0900002' || res.rtnCode == '0900001') {
	            util.drawToast('res.msg');
	        }
	    });
	});



/***/ }
]);