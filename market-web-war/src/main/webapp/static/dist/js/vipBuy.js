webpackJsonp([15],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(11);
	(function() {

	    $('#header-menu').show();
	    var util = __webpack_require__(1);
	    var interfaceUrl = __webpack_require__(3);
	    var cookie = __webpack_require__(2);

	    /**
	     * 在线购买初始化
	     */
	    function getOrderInfo() {
	        util.ajaxFun(interfaceUrl.getBuyInfo, 'POST', {
	            userId: cookie.getCookieValue('userId') || 13
	        }, function (res) {
	            if (res.rtnCode == '0000000') {
	                $('#price').html('价格：' + res.bizData.salePrice + '元');
	                $('#price').attr('data-price', res.bizData.salePrice);
	            }
	        })
	    }
	    /**
	     * 订单确定
	     */
	    function commitOrder() {
	        util.ajaxFun(interfaceUrl.commitOrder, 'POST', {
	            userId: cookie.getCookieValue('userId') || '13',
	            price: $('#price').attr('data-price') || '200'
	        }, function (res) {
	            if (res.rtnCode == '0000000') {
	                var department = res.bizData.department;
	                $('#orderNo').html('订单ID：' + res.bizData.orderNo);
	                $('#orderNo').attr('orderNo', res.bizData.orderNo);
	                $('#order_time').html('订单创建日期：' + department.createDateAsDate);
	                $('#service_price').html('服务价格：' + department.salePrice + '元');
	                $('#pay_price').html('应付费用：' + department.salePrice  + '元');
	                $('#pay_price').attr('data-price', department.salePrice);
	                $.pgwModal({
	                   title: '订单确认',
	                   content: $('.modal').html()
	                });
	                $('.confirm-btn').off('click');
	                $('.confirm-btn').on('click', function() {
	                    payOrder();
	                });
	            }
	        })
	    }

	    function orderPayStatus(msg) {
	        util.drawToast(msg);
	        setTimeout(function() {
	            window.location.href = '/order';
	        }, 1000);
	    }

	    function isWeiXin(){
	        var ua = window.navigator.userAgent.toLowerCase();
	        if(ua.indexOf('micromessenger') > -1){
	            return true;
	        }else{
	            return false;
	        }
	    }

	    /**
	     * 支付
	     */
	    var orderFlag = false;
	    function payOrder() {
	        if (orderFlag) {
	            return;
	        }
	        orderFlag = true;
	        $('#confirm-btn').html('正在支付...');
	        var amount = parseFloat($('#pay_price').attr('data-price') || '200');
	        var openId = cookie.getCookieValue('openId');

	        var channel = 'wx_pub';
	        if (!isWeiXin()) {
	            channel = 'alipay';
	        }

	        util.ajaxFun(interfaceUrl.payOrder, 'POST', {
	            orderNo: $('#orderNo').attr('orderNo'),
	            userId: cookie.getCookieValue('userId') || '13',
	            amount: amount,
	            channel: channel,
	            openId: openId
	        }, function (res) {
	            orderFlag = false;
	            $('#confirm-btn').html('确认支付');
	            $.pgwModal('close');
	            if (res.rtnCode == '0000000') {
	                var charge = res.bizData;
	                charge.credential = JSON.parse(charge.credential);
	                alert(JSON.stringify(charge));
	                pingpp.createPayment(charge, function(result, error){
	                    if (result == "success") {
	                        // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的 wap 支付结果都是在 extra 中对应的 URL 跳转。
	                        orderPayStatus('支付成功');
	                    } else if (result == "fail") {
	                        // charge 不正确或者微信公众账号支付失败时会在此处返回
	                        orderPayStatus('支付失败');
	                    } else if (result == "cancel") {
	                        // 微信公众账号支付取消支付
	                        orderPayStatus('支付失败');
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

	        $('.vip-buy-btn').on('click', function() {
	            commitOrder();
	        });

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