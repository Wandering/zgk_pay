webpackJsonp([19],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(11);
	(function() {
	    $('#header-menu').show();
	    var interfaceUrl = __webpack_require__(3);
	    var cookie = __webpack_require__(2);
	    var util = __webpack_require__(1);
	    var token = cookie.getCookieValue('token');
	    var toUrl = util.getLinkey('state');
	    var isLogin = cookie.getCookieValue('isLogin');
	    function getQueryObject(url) {
	        url = url == null ? window.location.href : url;
	        var search = url.substring(url.lastIndexOf("?") + 1);
	        var obj = {};
	        var reg = /([^?&=]+)=([^?&=]*)/g;
	        search.replace(reg, function (rs, $1, $2) {
	            var name = decodeURIComponent($1);
	            var val = decodeURIComponent($2);
	            val = String(val);
	            obj[name] = val;
	            return rs;
	        });
	        return obj;
	    }
	    function getOpenId(code) {
	        $.get(interfaceUrl.getOpenId,{code: code},function(res){
	            if (res.rtnCode == '0000000') {
	                cookie.setCookie("openId", res.bizData.openId, 4, "/");
	            }
	        });
	    }
	    function isWeiXin() {
	        var ua = window.navigator.userAgent.toLowerCase();
	        if (ua.indexOf('micromessenger') > -1) {
	            return true;
	        } else {
	            return false;
	        }
	    }

	    var openId = cookie.getCookieValue('openId');
	    if(toUrl=='vip-buy'){
	        if(!isLogin){
	            window.location.href='/login?state=vip-buy';
	        }else{
	            var menuV = util.getLinkey('menu');
	            if(menuV=="1"){
	                cookie.setCookie("flag", "0", 4, "/");
	            }
	            var flag = cookie.getCookieValue('flag');
	            if(flag=="0"){
	                cookie.setCookie("flag", "1", 4, "/");
	                window.location.assign('vip-buy?state=vip-buy&token=' + token + "&code="+getQueryObject(window.location.href).code);
	            }
	            if(flag=="1"){
	                if (isWeiXin()) {
	                    //alert('存在openId')
	                    if(!openId){
	                        var obj = getQueryObject(window.location.href);
	                        cookie.setCookie("code", obj.code, 4, "/");
	                        //alert(obj.code)
	                        getOpenId(obj.code);
	                    }
	                }
	            }
	        }
	    }









	    /**
	     * 在线购买初始化
	     */
	    function getOrderInfo() {
	        if (!cookie.getCookieValue('isLogin')) {
	            util.drawToast('请登录后再购买!');
	            setTimeout(function() {
	                window.location.href = "/login?state=vip-buy";
	            }, 2000)
	            return false;
	        }
	        var userId = cookie.getCookieValue('userId');
	        util.ajaxFun(interfaceUrl.getBuyInfo, 'POST', {
	            userId: userId
	        }, function (res) {
	            if (res.rtnCode == '0000000') {
	                $('#price').html(res.bizData.wechatPrice);
	                $('#price').attr('data-price', res.bizData.wechatPrice);
	            }
	        })
	    }
	    /**
	     * 订单确定
	     */
	    function commitOrder() {
	        util.ajaxFun(interfaceUrl.commitOrder, 'POST', {
	            userId: cookie.getCookieValue('userId'),
	            price: $('#price').attr('data-price'),
	            goodsCount:$('#number').text()
	        }, function (res) {
	            console.log(res)
	            if (res.rtnCode == '0000000') {
	                var department = res.bizData.department;
	                $('#orderNo').html('订单ID：' + res.bizData.orderNo);
	                $('#orderNo').attr('orderNo', res.bizData.orderNo);
	                $('#order_time').html('订单创建日期：' + department.createDateAsDate);
	                $('#service_price').html('服务价格：' + department.wechatPrice + '元/套');
	                var number = parseInt($('.number').text());
	                $('#pay_number').html('购买数量：' + number + '套');
	                var totalPrice = department.wechatPrice * number;
	                $('#pay_price').html('应付费用：' + totalPrice  + '元');
	                $('#pay_price').attr('data-price', totalPrice);
	                $.pgwModal({
	                    title: '订单确认',
	                    content: $('.modal').html()
	                });
	                $('.confirm-btn').off('click');
	                $('.confirm-btn').click(function(){
	                    payOrder();
	                });
	            }
	        })
	    }

	    function orderPayStatus(msg) {
	        util.drawToast(msg);
	        setTimeout(function() {
	            window.location.href = '/order?state=order';
	        }, 1000);
	    }



	    /**
	     * 支付
	     */
	    //var orderFlag = false;
	    function payOrder() {
	        //if (orderFlag) {
	        //    return;
	        //}
	        //orderFlag = true;
	        $('#confirm-btn').html('正在支付...');
	        var amount = parseFloat($('#pay_price').attr('data-price'));
	        var openId = cookie.getCookieValue('openId');
	        var goodsCount = parseInt($('.number').text());

	        var channel = 'wx_pub';
	        if (!isWeiXin()) {
	            channel = 'alipay_wap';
	        }



	        //util.ajaxFun(interfaceUrl.payOrder+'?token='+token, 'POST', {
	        util.ajaxFun(interfaceUrl.payOrder, 'POST', {
	            orderNo: $('#orderNo').attr('orderNo'),
	            userId: cookie.getCookieValue('userId'),
	            amount: amount,
	            channel: channel,
	            goodsCount: goodsCount,
	            openId: openId
	        }, function (res) {
	            //orderFlag = false;
	            $('#confirm-btn').html('确认支付');
	            $.pgwModal('close');
	            if (res.rtnCode == '0000000') {
	                var charge = res.bizData;
	                charge.credential = JSON.parse(charge.credential);
	                pingpp.createPayment(charge, function(result, error){
	                    if (result == "success") {
	                        // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的 wap 支付结果都是在 extra 中对应的 URL 跳转。
	                        orderPayStatus('支付成功');
	                    } else if (result == "fail") {
	                        // charge 不正确或者微信公众账号支付失败时会在此处返回
	                        orderPayStatus('支付失败');
	                    } else if (result == "cancel") {
	                        // 微信公众账号支付取消支付
	                        orderPayStatus('订单取消支付，可在我的订单页面继续支付');
	                    }
	                });
	            } else {
	                orderPayStatus('支付失败');
	            }
	        })
	    }

	    $(document).ready(function() {
	        $('#header-title').text('在线购买');

	        getOrderInfo();

	        if($('#pay_price').attr('data-price')!=""){
	            $('.vip-buy-btn').on('click', function() {
	                commitOrder();
	            });
	        }



	        $('.sub').on('click', function() {
	            if ($(this).hasClass('subtraction')) {
	                return;
	            }
	            var num = parseInt($('.number').text());
	            num--;
	            if (num < 2) {
	                $('.sub').addClass('subtraction').removeClass('subtractionabled');
	            }
	            if (num < 10) {
	                $('.plus').addClass('plus-able').removeClass('plus-abled');
	            }
	            $('.number').text(num);
	        });

	        $('.plus').on('click', function() {
	            if ($(this).hasClass('plus-abled')) {
	                return;
	            }
	            var num = parseInt($('.number').text());
	            num++;
	            if (num > 1) {
	                $('.sub').addClass('subtractionabled').removeClass('subtraction');
	            }
	            if (num >= 10) {
	                $('.plus').addClass('plus-abled').removeClass('plus-able');
	            }
	            $('.number').text(num);
	        })

	    });

	})();

/***/ },

/***/ 11:
/***/ function(module, exports) {

	/**
	 * PgwModal - Version 2.0
	 *
	 * Copyright 2014, Jonathan M. Piat
	 * http://pgwjs.com - http://pagawa.com
	 * 
	 * Released under the GNU GPLv3 license - http://opensource.org/licenses/gpl-3.0
	 */
	(function(a){a.pgwModal=function(i){var c={};var g={mainClassName:"pgwModal",backdropClassName:"pgwModalBackdrop",maxWidth:500,titleBar:true,closable:true,closeOnEscape:true,closeOnBackgroundClick:true,closeContent:'<span class="pm-icon"></span>',loadingContent:"Loading in progress...",errorContent:"An error has occured. Please try again in a few moments."};if(typeof window.pgwModalObject!="undefined"){c=window.pgwModalObject}if((typeof i=="object")&&(!i.pushContent)){if(!i.url&&!i.target&&!i.content){throw new Error('PgwModal - There is no content to display, please provide a config parameter : "url", "target" or "content"')}c.config={};c.config=a.extend({},g,i);window.pgwModalObject=c}var k=function(){var o='<div id="pgwModalBackdrop"></div><div id="pgwModal"><div class="pm-container"><div class="pm-body"><span class="pm-close"></span><div class="pm-title"></div><div class="pm-content"></div></div></div></div>';a("body").append(o);a(document).trigger("PgwModal::Create");return true};var l=function(){a("#pgwModal .pm-title, #pgwModal .pm-content").html("");a("#pgwModal .pm-close").html("").unbind("click");return true};var f=function(){angular.element('body').injector().invoke(function($compile){var scope=angular.element($('#pgwModal .pm-content')).scope();$compile($('#pgwModal .pm-content'))(scope);scope.$digest()});return true};var d=function(o){a("#pgwModal .pm-content").html(o);if(c.config.angular){f()}m();a(document).trigger("PgwModal::PushContent");return true};var m=function(){a("#pgwModal, #pgwModalBackdrop").show();var q=a(window).height();var o=a("#pgwModal .pm-body").height();var p=Math.round((q-o)/3);if(p<=0){p=0}a("#pgwModal .pm-body").css("margin-top",p);return true};var h=function(){return c.config.modalData};var e=function(){var o=a('<div style="width:50px;height:50px;overflow:auto"><div></div></div>').appendTo("body");var q=o.children();if(typeof q.innerWidth!="function"){return 0}var p=q.innerWidth()-q.height(90).innerWidth();o.remove();return p};var b=function(){return a("body").hasClass("pgwModalOpen")};var n=function(){a("#pgwModal, #pgwModalBackdrop").removeClass().hide();a("body").css("padding-right","").removeClass("pgwModalOpen");l();a(window).unbind("resize.PgwModal");a(document).unbind("keyup.PgwModal");a("#pgwModal").unbind("click.PgwModalBackdrop");try{delete window.pgwModalObject}catch(o){window.pgwModalObject=undefined}a(document).trigger("PgwModal::Close");return true};var j=function(){if(a("#pgwModal").length==0){k()}else{l()}a("#pgwModal").removeClass().addClass(c.config.mainClassName);a("#pgwModalBackdrop").removeClass().addClass(c.config.backdropClassName);if(!c.config.closable){a("#pgwModal .pm-close").html("").unbind("click").hide()}else{a("#pgwModal .pm-close").html(c.config.closeContent).click(function(){n()}).show()}if(!c.config.titleBar){a("#pgwModal .pm-title").hide()}else{a("#pgwModal .pm-title").show()}if(c.config.title){a("#pgwModal .pm-title").text(c.config.title)}if(c.config.maxWidth){a("#pgwModal .pm-body").css("max-width",c.config.maxWidth)}if(c.config.url){if(c.config.loadingContent){a("#pgwModal .pm-content").html(c.config.loadingContent)}var o={url:i.url,success:function(q){d(q)},error:function(){a("#pgwModal .pm-content").html(c.config.errorContent)}};if(c.config.ajaxOptions){o=a.extend({},o,c.config.ajaxOptions)}a.ajax(o)}else{if(c.config.target){d(a(c.config.target).html())}else{if(c.config.content){d(c.config.content)}}}if(c.config.closeOnEscape&&c.config.closable){a(document).bind("keyup.PgwModal",function(q){if(q.keyCode==27){n()}})}if(c.config.closeOnBackgroundClick&&c.config.closable){a("#pgwModal").bind("click.PgwModalBackdrop",function(s){var r=a(s.target).hasClass("pm-container");var q=a(s.target).attr("id");if(r||q=="pgwModal"){n()}})}a("body").addClass("pgwModalOpen");var p=e();if(p>0){a("body").css("padding-right",p)}a(window).bind("resize.PgwModal",function(){m()});a(document).trigger("PgwModal::Open");return true};if((typeof i=="string")&&(i=="close")){return n()}else{if((typeof i=="string")&&(i=="reposition")){return m()}else{if((typeof i=="string")&&(i=="getData")){return h()}else{if((typeof i=="string")&&(i=="isOpen")){return b()}else{if((typeof i=="object")&&(i.pushContent)){return d(i.pushContent)}else{if(typeof i=="object"){return j()}}}}}}}})(window.Zepto||window.jQuery);


/***/ }

});