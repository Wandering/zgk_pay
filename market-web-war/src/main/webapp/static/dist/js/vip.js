webpackJsonp([18],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	$(function () {
	    var cookie = __webpack_require__(2);
	    var util = __webpack_require__(1);
	    var urlConfig = __webpack_require__(3);
	    var account = cookie.getCookieValue('phone');
	    var getTime = __webpack_require__(4);

	    var isLogin = cookie.getCookieValue('isLogin');
	    var toUrl = util.getLinkey('state');
	    var userId = cookie.getCookieValue('userId');


	    $('#account-number').val(account);
	    $('#header-menu').show();
	    $('#header-title').text('关于智高考');






	    var sharerId = util.getLinkey('sharerId');
	    var sharerType = util.getLinkey('sharerType');

	    cookie.setCookie("sharerId", sharerId, 4, "/" );
	    cookie.setCookie("sharerType", sharerType, 4, "/" );





	    function initInfo() {
	        var vipStatus = cookie.getCookieValue('vipStatus');
	        if (vipStatus == '1') {
	            var vipActiveDateV = cookie.getCookieValue('vipActiveDate');
	            var vipEndDateV = cookie.getCookieValue('vipEndDate');
	            $('.vip-time').html('VIP时效:从' + vipActiveDateV + '到' + vipEndDateV);
	            $('.viped').show();
	            $('.no-vip').hide();
	        }
	    }

	    $(document).ready(function() {
	        initInfo();
	        $('.vip-btn').click(function () {
	            var cardNum = $.trim($('#card-number').val());
	            var cardPsd = $.trim($('#card-psd').val());
	            if (!cookie.getCookieValue('isLogin')) {
	                util.drawToast('请先登录后再操作!');
	                setTimeout(function() {
	                    window.location.href = "/login?state=vipBck";
	                }, 500)
	                return false;
	            }
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
	                    var vipActiveDateV = vipActiveDate.substr(0,10);
	                    var vipEndDateV = vipEndDate.substr(0,10);
	                    cookie.setCookie("vipStatus", vipStatus, 4, "/");
	                    cookie.setCookie("vipActiveDate", vipActiveDateV, 4, "/");
	                    cookie.setCookie("vipEndDate", vipEndDateV, 4, "/");
	                    $('.vip-time').html('VIP时效:从' + vipActiveDateV + '到' + vipEndDateV);
	                    $('.viped').show();
	                    $('.no-vip').hide();
	                } else {
	                    util.drawToast(res.msg);
	                }
	                if (res.rtnCode == '0900002' || res.rtnCode == '0900001') {
	                    util.drawToast(res.msg);
	                }
	            });
	        });
	    });

	});












/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	//时间戳转换
	    Date.prototype.Format = function (fmt) {
	        var o = {
	            "M+": this.getMonth() + 1, //月份
	            "d+": this.getDate(), //日
	            "h+": this.getHours(), //小时
	            "m+": this.getMinutes(), //分
	            "s+": this.getSeconds(), //秒
	            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
	            "S": this.getMilliseconds() //毫秒
	        };
	        if (/(y+)/.test(fmt))
	            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	        for (var k in o)
	            if (new RegExp("(" + k + ")").test(fmt))
	                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	        return fmt;
	    };
	    var getTime = function (timestamp,formatStr) {
	        var newDate = new Date();
	        newDate.setTime(timestamp);
	        return newDate.Format(formatStr || "yyyy-MM-dd hh:mm:ss");
	    };

	    return getTime;
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }
]);