(function() {
    $('#header-title').text('我的订单');
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

    if(toUrl=='order'){
        if(!isLogin){
            window.location.href='/login?state=order';
        }else{
            var menuV = util.getLinkey('menu');
            if(menuV=="1"){
                cookie.setCookie("flag", "0", 4, "/");
            }
            var flag = cookie.getCookieValue('flag');
            if(flag=="0"){
                cookie.setCookie("flag", "1", 4, "/");
                window.location.assign('/order?state=order&token=' + token+"&code="+getQueryObject(window.location.href).code);
            }
            if(flag=="1"){
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
                if (isWeiXin()) {
                    if(!openId){
                        var obj = getQueryObject(window.location.href);
                        cookie.setCookie("code", obj.code, 4, "/");
                        getOpenId(obj.code);
                    }
                }
            }
        }
    }





    var IScroll = require('iscroll');
    var myScroll = null;
    var Order = (function() {
        Date.prototype.Format = function(fmt) { //author: meizz
            var o = {
                "M+" : this.getMonth()+1,                 //月份
                "d+" : this.getDate(),                    //日
                "h+" : this.getHours(),                   //小时
                "m+" : this.getMinutes(),                 //分
                "s+" : this.getSeconds(),                 //秒
                "q+" : Math.floor((this.getMonth()+3)/3), //季度
                "S"  : this.getMilliseconds()             //毫秒
            };
            if(/(y+)/.test(fmt))
                fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
            for(var k in o)
                if(new RegExp("("+ k +")").test(fmt))
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            return fmt;
        }
        var tmpl = function(obj) {
            var createDate = new Date(obj.create_date).Format('yyyy-MM-dd hh:mm:ss');
            var html = '';
            if (obj.status == 1) {
                html +=  '<div class="order-item">';
                html +=  '<img class="img-paid" src="/static/dist/img/icons/paid.png" alt=""/>';
            } else {
                html +=  '<div class="order-item unpaid">';
            }
            html +=  '<ul class="item-list">';
            html +=  '<li>';
            html +=  '<span>智能高考VIP服务卡</span>';
            html +=  '<span>' + obj.product_price + '</span>';
            if (obj.status == 1) {
                html +=  '<span class="pay-status" data-payStatus="' + obj.status + '">已支付</span>';
            } else {
                html +=  '<span class="pay-status" data-userId="' + obj.user_id + '" data-orderNo="' + obj.order_no + '" data-price="' + obj.product_price + '" data-payStatus="' + obj.status + '">去支付</span>';
            }
            html +=  '</li>';
            html +=  '<li>';
            html +=  '<span>成交时间：' + createDate.split(' ')[0] + '</span>';
            html +=  '<span>' + createDate.split(' ')[1] + '</span>';
            html +=  '</li>';
            html +=  '<li>';
            html +=  '<span>取货地址：' + obj.goods_address + '</span>';
            html +=  '</li>';
            html +=  '<li>';
            html +=  '<span>取货电话：' + obj.department_phone + '</span>';
            html +=  '</li>';
            html +=  '</ul>';
            html +=  '</div>';
            return html;
        }

        return {
            pageNo: 1,
            pageSize: 5,
            orderListRender: function(listData) {
                var html = [];
                for (var i = 0, len = listData.length; i < len; i++) {
                    html.push(tmpl(listData[i]));
                }
                return html.join('');
            },
            getOrderListData: function() {
                var that = this;
                util.ajaxFun(interfaceUrl.getUserOrderList, 'GET', {
                    userId: cookie.getCookieValue('userId') || '13',
                    pageNo: this.pageNo,
                    pageSize: this.pageSize
                }, function (res) {
                    if (res.rtnCode == '0000000') {
                        $('.pull-text').show();
                        $('#scroller-pullUp').hide();
                        if (res.bizData.length > 0) {
                            $('.order-list').append(that.orderListRender(res.bizData));
                            $('.pay-status').off('click');
                            $('.pay-status').on('click', function() {
                                var payStatus = $(this).attr('data-payStatus');
                                if (payStatus == '0') {
                                    var orderNo = $(this).attr('data-orderNo');
                                    var price = $(this).attr('data-price');
                                    var userId = $(this).attr('data-userId');
                                    payOrder(orderNo, price, userId);
                                }
                            });
                            if (myScroll) myScroll.refresh();
                        } else {
                            $('.pull-text').html('没有更多数据~~');
                            $('.pull-text').addClass('no-data');
                        }
                    }
                })
            }
        }
    })();

    function orderPayStatus(msg) {
        util.drawToast(msg);
        //setTimeout(function() {
        //    window.location.href = '/order?state=order';
        //}, 1000);
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
    function payOrder(orderNo, price, userId) {
        if (orderFlag) {
            return;
        }
        orderFlag = true;
        var amount = parseFloat(price || '200');
        var openId = cookie.getCookieValue('openId');
        var channel = 'wx_pub';
        if (!isWeiXin()) {
            channel = 'alipay_wap';
        }
        util.ajaxFun(interfaceUrl.payOrder, 'POST', {
            orderNo: orderNo,
            userId: userId || '13',
            amount: amount,
            channel: channel,
            openId: openId
        }, function (res) {
            orderFlag = false;
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
        $('#container').css('height', window.innerHeight - 39);
        Order.getOrderListData();

        var uy = 0;
        myScroll = new IScroll('#container', {
            probeType: 3,
            tap: true,
            click: true,
            mouseWheel: true,
            scrollbars: true,
            fadeScrollbars: true,
            interactiveScrollbars: false,
            keyBindings: false,
            deceleration: 0.0002
        });
        myScroll.on('scrollStart', function() {
            uy = this.y;
        });

        myScroll.on('scroll', function() {
            var y = this.y - uy;
        });

        myScroll.on('scrollEnd', function() {
            if (!$('.pull-text').hasClass('no-data')) {
                $('.pull-text').hide();
                $('#scroller-pullUp').show();
                myScroll.refresh();

                Order.pageNo++;
                Order.getOrderListData();
            } else {
                $('.pull-text').html('没有更多数据~~');
            }
        });
    });







})();
