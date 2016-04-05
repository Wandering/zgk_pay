
(function() {
    $('#header-menu').show();
    var util = require('commonjs');
    var interfaceUrl = require('urlConfig');
    var cookie = require('cookie');
    var TEST_DATA = [{
        payStatus: 1,
        name: 'zhigao',
        price: '780',
        date: '2016/09/12',
        time: '12:12',
        address: 'sdfasdfasfd',
        phone: '132842347'
    },{
        payStatus: 0,
        name: 'zhigao',
        price: '780',
        date: '2016/09/12',
        time: '12:12',
        address: 'sdfasdfasfd',
        phone: '132842347'
    },{
        payStatus: 0,
        name: 'zhigao',
        price: '480',
        date: '2016/09/12',
        time: '12:12',
        address: 'sdfasdfasfd',
        phone: '132842347'
    },{
        payStatus: 0,
        name: 'zhigao',
        price: '480',
        date: '2016/09/12',
        time: '12:12',
        address: 'sdfasdfasfd',
        phone: '132842347'
    }]

    var util = require('commonjs');
    var interfaceUrl = require('urlConfig');
    var IScroll = require('iscroll');
    var myScroll = null;


    var Order = (function() {
        var tmpl = function(obj) {
            var html = '';
            if (obj.payStatus == 1) {
                html +=  '<div class="order-item">';
                html +=  '<img class="img-paid" src="/static/dist/img/icons/paid.png" alt=""/>';
            } else {
                html +=  '<div class="order-item unpaid">';
            }
            html +=  '<ul class="item-list">';
            html +=  '<li>';
            html +=  '<span>' + obj.name + '</span>';
            html +=  '<span>' + obj.price + '</span>';
            if (obj.payStatus == 1) {
                html +=  '<span class="pay-status" data-payStatus="' + obj.payStatus + '">已支付</span>';
            } else {
                html +=  '<span class="pay-status" data-payStatus="' + obj.payStatus + '">未支付</span>';
            }

            html +=  '</li>';
            html +=  '<li>';
            html +=  '<span>成交时间：' + obj.date + '</span>';
            html +=  '<span>' + obj.time + '</span>';
            html +=  '</li>';
            html +=  '<li>';
            html +=  '<span>取货地址：' + obj.address + '</span>';
            html +=  '</li>';
            html +=  '<li>';
            html +=  '<span>取货电话：' + obj.phone + '</span>';
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
                        $('.order-list').append(that.orderListRender(TEST_DATA));
                        $('.pay-status').off('click');
                        $('.pay-status').on('click', function() {
                            var payStatus = $(this).attr('data-payStatus');
                            if (payStatus == '0') {
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
                        });
                        $('.pull-text').show();
                        $('#scroller-pullUp').hide();
                        if (myScroll) myScroll.refresh();
                    }
                })
            }
        }
    })();

    function orderPayStatus(msg) {
        util.drawToast(msg);
        setTimeout(function() {
            window.location.href = '/order';
        }, 1000);
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
        var amount = parseInt($('#pay_price').attr('data-price') || '200');
        util.ajaxFun(interfaceUrl.payOrder, 'POST', {
            orderNo: $('#orderNo').attr('orderNo'),
            userId: cookie.getCookieValue('userId') || '13',
            amount: amount,
            channel: 'wx_pub'
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
