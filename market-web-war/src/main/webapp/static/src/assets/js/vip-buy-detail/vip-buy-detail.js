/**
 * Created by kepeng on 16/5/17.
 */
(function() {
    var util = require('commonjs');
    var interfaceUrl = require('urlConfig');
    var cookie = require('cookie');
    var price = util.getLinkey('price');
    var packageCode = util.getLinkey('packageCode');
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
        $.get(interfaceUrl.getOpenId, {code: code}, function (res) {
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
    if (toUrl == 'vip-buy') {
        if (!isLogin) {
            window.location.href = '/login?state=vip-buyDetial&price=' + price + '&packageCode=' + packageCode;
        } else {
            var menuV = util.getLinkey('menu');
            if (menuV == "1") {
                cookie.setCookie("flag", "0", 4, "/");
            }
            var flag = cookie.getCookieValue('flag');
            if (flag == "0") {
                cookie.setCookie("flag", "1", 4, "/");
                window.location.assign('vip-buyDetial?state=vip-buyDetial&token=' + token + "&code=" + getQueryObject(window.location.href).code);
            }
            if (flag == "1") {
                if (isWeiXin()) {
                    if (!openId) {
                        var obj = getQueryObject(window.location.href);
                        cookie.setCookie("code", obj.code, 4, "/");
                        getOpenId(obj.code);
                    }
                }
            }
        }
    }

    function orderPayStatus(msg) {
        $('#modal_overlay').removeClass('modal-overlay-visible');
        $('#modal').removeClass('modal-in');
        util.drawToast(msg);
        setTimeout(function () {
            window.location.href = '/order?state=order';
        }, 1000);
    }

    /**
     * 支付
     */
    function payOrder() {
        var amount = parseFloat(price);
        var openId = cookie.getCookieValue('openId');
        var goodsCount = parseInt($('.number').text());

        var channel = 'wx_pub';
        if (!isWeiXin()) {
            channel = 'alipay_wap';
        }


        util.ajaxFun(interfaceUrl.payOrder, 'POST', {
            orderNo: $('#orderNo').val(),
            userId: cookie.getCookieValue('userId'),
            amount: amount,
            channel: channel,
            goodsCount: goodsCount,
            openId: openId
        }, function (res) {
            if (res.rtnCode == '0000000') {
                var charge = res.bizData;
                charge.credential = JSON.parse(charge.credential);
                pingpp.createPayment(charge, function (result, error) {
                    if (result == "success") {
                        // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的 wap 支付结果都是在 extra 中对应的 URL 跳转。
                        //orderPayStatus('支付成功');
                        window.location.href = '/pay-success';
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

        $('#header-back').show();
        $('#header-title').text('在线购买');
        $('#header-back').on('click', function() {
            window.location.href = '/vip-buy';
        });

        $('.buy-price').text('单价：' + price + '元/套');
        var packageName = {
            'zyjd': '状元及第',
            'jbdk': '金榜登科'
        };
        $('.wrapper h6').text(packageName[packageCode]);
        if (packageCode === 'jbdk') {
            $('.jbdk').hide();
        }
        $('.total-price').text(parseInt($('.number').text()) * price);

        $('.buy-go').on('click', function() {
            var userId = cookie.getCookieValue('userId');
            if (!cookie.getCookieValue('isLogin')) {
                util.drawToast('请登录后再购买!');
                setTimeout(function () {
                    window.location.href = "/login?state=vip-buy";
                }, 2000);
                return false;
            }

            util.ajaxFun(interfaceUrl.commitOrder, 'POST', {
                userId: cookie.getCookieValue('userId'),
                price: price,
                goodsCount: $('#number').text()
            }, function (res) {
                if (res.rtnCode == '0000000') {
                    //var department = res.bizData.department;
                    $('#orderNo').val(res.bizData.orderNo);
                    //$('#orderNo').attr('orderNo', res.bizData.orderNo);
                    //$('#order_time').html('订单创建日期：' + department.createDateAsDate);
                    //$('#service_price').html('服务价格：' + department.wechatPrice + '元/套');
                    var number = parseInt($('.number').text());
                    //$('#pay_number').html('购买数量：' + number + '套');
                    //var totalPrice = department.wechatPrice * number;
                    //$('#pay_price').html('应付费用：' + totalPrice + '元');
                    //$('#pay_price').attr('data-price', totalPrice);
                    //$.pgwModal({
                    //    title: '订单确认',
                    //    content: $('.modal').html()
                    //});
                    $('.info').text('智高考“' + packageName[packageCode] + '”会员卡 ' + number + ' 套￥' + number * price + '元');
                    $('#modal_overlay').addClass('modal-overlay-visible');
                    $('#modal').addClass('modal-in');
                    $('.paying').off('click');
                    $('.paying').click(function () {
                        payOrder();
                    });
                }
            })
        });

        $('#modal_overlay').on('click', function() {
            $('#modal_overlay').removeClass('modal-overlay-visible');
            $('#modal').removeClass('modal-in');
        });

        $('.address').on('click', function() {
            window.location.href = '/address?action=vip-buyDetial';
        });

        $('.sub').on('click', function () {
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
            $('.total-price').text(num * price);
        });

        $('.plus').on('click', function () {
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
            $('.total-price').text(num * price);
        })
    });
})();
