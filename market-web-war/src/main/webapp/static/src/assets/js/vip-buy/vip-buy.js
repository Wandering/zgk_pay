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

            }
        })
    }

    /**
     * 订单确定
     */
    function commitOrder() {
        util.ajaxFunJSON(interfaceUrl.commitOrder, 'POST', {
            userId: cookie.getCookieValue('userId') || 13
        }, function (res) {
            if (res.rtnCode == '0000000') {

            }
        })
    }

    /**
     * 支付
     */
    function payOrder() {

    }

    $(document).ready(function() {
        $('#header-title').text('在线购买');

        getOrderInfo();

        $('.vip-buy-btn').on('click', function() {
            commitOrder();
            //$.pgwModal({
            //    title: '订单确认',
            //    content: $('.modal').html()
            //});
        });
    });

})();