(function () {
    $('#header-menu').show();
    var interfaceUrl = require('urlConfig');
    var cookie = require('cookie');
    var util = require('commonjs');


    $(document).ready(function () {
        $('#header-title').text('在线购买');


        var userId = cookie.getCookieValue('userId');
        if (!cookie.getCookieValue('isLogin')) {
            util.drawToast('请登录后再购买!');
            setTimeout(function () {
                window.location.href = "/login?state=vip-buy";
            }, 2000);
            return false;
        }

        util.ajaxFun(interfaceUrl.getBuyInfo, 'post', {
            userId: userId
        }, function (res) {
            if (res.rtnCode == '0000000') {
                var productArray = ['', 'jbdk', 'zyjd'];
                var data = res.bizData;
                for (var i = 0, len = data.length; i < len; i++) {
                    $('.' + productArray[data[i].productId]).attr('data-productId', data[i].productId);
                    $('.' + productArray[data[i].productId]).attr('data-price', data[i].salePrice);
                    $('.' + productArray[data[i].productId]).attr('data-departmentCode', data[i].departmentCode);
                    $('.' + productArray[data[i].productId] + ' .package-name').text(data[i].productName);
                    var price = data[i].salePrice.toString().split('.');
                    $('.' + productArray[data[i].productId] + ' .main-price').text('￥' + price[0]);
                    $('.' + productArray[data[i].productId] + ' .sub-price').text('.' + (price[1] || '00') + '元');
                    $('.' + productArray[data[i].productId]).show();
                }
                $('.package').on('click', function() {
                    var productId = $(this).attr('data-productId');
                    var price = $(this).attr('data-price');
                    var departmentCode = $(this).attr('data-departmentCode');
                    window.location.href = '/vip-buyDetial?productId=' + productId + '&price=' + price + '&departmentCode=' + departmentCode;
                });
            }
        });


    });

})();