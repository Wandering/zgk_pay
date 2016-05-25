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

        util.ajaxFun(interfaceUrl.getBuyInfo, 'POST', {
            userId: userId
        }, function (res) {
            if (res.rtnCode == '0000000') {
            }
        });


    });

})();