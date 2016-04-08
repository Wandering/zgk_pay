require('pgwmodal');
(function() {

    $('#header-menu').show();
    var util = require('commonjs');
    var interfaceUrl = require('urlConfig');
    var cookie = require('cookie');

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
    var isLogin = cookie.getCookieValue('isLogin');
    var token = cookie.getCookieValue('token');

    function orderPayStatus(msg) {
        util.drawToast(msg);
        setTimeout(function() {
            window.location.href = '/order?token='+token;
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
            channel = 'alipay_wap';
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