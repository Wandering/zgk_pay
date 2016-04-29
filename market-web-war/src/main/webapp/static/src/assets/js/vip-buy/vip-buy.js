require('pgwmodal');
(function () {
    $('#header-menu').show();
    var interfaceUrl = require('urlConfig');
    var cookie = require('cookie');
    var util = require('commonjs');
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
            window.location.href = '/login?state=vip-buy';
        } else {
            var menuV = util.getLinkey('menu');
            if (menuV == "1") {
                cookie.setCookie("flag", "0", 4, "/");
            }
            var flag = cookie.getCookieValue('flag');
            if (flag == "0") {
                cookie.setCookie("flag", "1", 4, "/");
                window.location.assign('vip-buy?state=vip-buy&token=' + token + "&code=" + getQueryObject(window.location.href).code);
            }
            if (flag == "1") {
                if (isWeiXin()) {
                    //alert('存在openId')
                    if (!openId) {
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
        //if (!cookie.getCookieValue('isLogin')) {
        //    util.drawToast('请登录后再购买!');
        //    setTimeout(function() {
        //        window.location.href = "/login?state=vip-buy";
        //    }, 2000)
        //    return false;
        //}
        //var userId = cookie.getCookieValue('userId');
        //util.ajaxFun(interfaceUrl.getBuyInfo, 'POST', {
        //    userId: userId
        //}, function (res) {
        //    if (res.rtnCode == '0000000') {
        //        $('#price').html(res.bizData.wechatPrice);
        //        $('#price').attr('data-price', res.bizData.wechatPrice);
        //
        //
        //
        //            util.ajaxFun(interfaceUrl.commitOrder, 'POST', {
        //                userId: cookie.getCookieValue('userId'),
        //                price: $('#price').attr('data-price'),
        //                goodsCount:$('#number').text()
        //            }, function (res) {
        //                console.log(res)
        //                if (res.rtnCode == '0000000') {
        //                    var department = res.bizData.department;
        //                    $('#orderNo').html('订单ID：' + res.bizData.orderNo);
        //                    $('#orderNo').attr('orderNo', res.bizData.orderNo);
        //                    $('#order_time').html('订单创建日期：' + department.createDateAsDate);
        //                    $('#service_price').html('服务价格：' + department.wechatPrice + '元/套');
        //                    var number = parseInt($('.number').text());
        //                    $('#pay_number').html('购买数量：' + number + '套');
        //                    var totalPrice = department.wechatPrice * number;
        //                    $('#pay_price').html('应付费用：' + totalPrice  + '元');
        //                    $('#pay_price').attr('data-price', totalPrice);
        //                    $.pgwModal({
        //                        title: '订单确认',
        //                        content: $('.modal').html()
        //                    });
        //                    $('.confirm-btn').off('click');
        //                    $('.confirm-btn').click(function(){
        //                        payOrder();
        //                    });
        //                }
        //            })
        //
        //
        //
        //
        //    }
        //})
    }

    /**
     * 订单确定
     */
    function commitOrder() {
        util.ajaxFun(interfaceUrl.commitOrder, 'POST', {
            userId: cookie.getCookieValue('userId'),
            price: $('#price').attr('data-price'),
            goodsCount: $('#number').text()
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
                $('#pay_price').html('应付费用：' + totalPrice + '元');
                $('#pay_price').attr('data-price', totalPrice);
                $.pgwModal({
                    title: '订单确认',
                    content: $('.modal').html()
                });
                $('.confirm-btn').off('click');
                $('.confirm-btn').click(function () {
                    payOrder();
                });
            }
        })
    }

    function orderPayStatus(msg) {
        util.drawToast(msg);
        setTimeout(function () {
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
                pingpp.createPayment(charge, function (result, error) {
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

    $(document).ready(function () {
        $('#header-title').text('在线购买');

        //getOrderInfo();

        //$('.vip-buy-btn').on('click', function() {
        //    commitOrder();
        //});


        var userId = cookie.getCookieValue('userId');
        if (!cookie.getCookieValue('isLogin')) {
            util.drawToast('请登录后再购买!');
            setTimeout(function () {
                window.location.href = "/login?state=vip-buy";
            }, 2000);
            return false;
        }

        util.ajaxFun(interfaceUrl.getBuyInfo, 'POST', {
            userId: userId
        }, function (res) {
            if (res.rtnCode == '0000000') {
                $('#price').html(res.bizData.wechatPrice);
                $('#price').attr('data-price', res.bizData.wechatPrice);

                $('.vip-buy-btn').on('click', function () {


                    util.ajaxFun(interfaceUrl.commitOrder, 'POST', {
                        userId: cookie.getCookieValue('userId'),
                        price: $('#price').attr('data-price'),
                        goodsCount: $('#number').text()
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
                            $('#pay_price').html('应付费用：' + totalPrice + '元');
                            $('#pay_price').attr('data-price', totalPrice);
                            $.pgwModal({
                                title: '订单确认',
                                content: $('.modal').html()
                            });
                            $('.confirm-btn').off('click');
                            $('.confirm-btn').click(function () {
                                payOrder();
                            });
                        }
                    })
                });
            }
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
        })

    });

})();