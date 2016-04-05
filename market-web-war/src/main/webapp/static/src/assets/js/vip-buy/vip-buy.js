require('pgwmodal');
(function() {

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

    /**
     * 支付
     */
    function payOrder() {
        util.ajaxFun(interfaceUrl.payOrder, 'POST', {
            orderNo: $('#orderNo').attr('orderNo'),
            userId: cookie.getCookieValue('userId') || '13',
            amount: $('#pay_price').attr('data-price') || '200',
            channel: 'wx_pub'
        }, function (res) {
            if (res.rtnCode == '0000000') {
                pingpp.createPayment(charge, function(result, error){
                    if (result == "success") {
                        // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的 wap 支付结果都是在 extra 中对应的 URL 跳转。
                        window.location.href = '/order';
                    } else if (result == "fail") {
                        // charge 不正确或者微信公众账号支付失败时会在此处返回
                    } else if (result == "cancel") {
                        // 微信公众账号支付取消支付
                    }
                });
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