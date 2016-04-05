
(function() {
    $('#header-menu').show();
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
            orderListRender: function(listData) {
                var html = [];
                for (var i = 0, len = listData.length; i < len; i++) {
                    html.push(tmpl(listData[i]));
                }
                return html.join('');
            },
            getOrderListData: function() {
                $('.order-list').append(this.orderListRender(TEST_DATA));
                $('.pay-status').off('click');
                $('.pay-status').on('click', function() {
                    var payStatus = $(this).attr('data-payStatus');
                    if (payStatus == '0') {
                        window.location.href = '';
                    }
                });
                $('.pull-text').show();
                $('#scroller-pullUp').hide();
                if (myScroll) myScroll.refresh();
                //util.ajaxFun(interfaceUrl.getUserInfo, 'GET', {
                //
                //}, function (res) {
                //
                //})
            }
        }
    })();

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

                setTimeout(function() {
                    Order.getOrderListData();
                }, 5000);
            } else {
                $('.pull-text').html('没有更多数据~~');
            }
        });
    });

})();
