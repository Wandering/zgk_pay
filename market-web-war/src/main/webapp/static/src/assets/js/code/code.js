$(function () {
    $('#header-title').text('二维码');
    var util = require('commonjs');
    var interfaceUrl = require('urlConfig');
    var cookie = require('cookie');
    var isLogin = cookie.getCookieValue('isLogin');
    var token = cookie.getCookieValue('token');
    $('#header-back').show().on('click', function () {
        window.location.href = 'user-detail?toUrl=user-detail&token='+token;
    });

    function isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.indexOf('micromessenger') > -1) {
            return true;
        } else {
            return false;
        }
    }


    var userId = util.getLinkey('userId');
    util.ajaxFun(interfaceUrl.getCaptchaImg, 'get', {
        'userId': userId
    }, function (res) {
        if (res.rtnCode = '0000000') {
            var dataJson = res.bizData;
            $('.name').text(dataJson.name);
            $('.tel').text(dataJson.account);
            $('#captchImg').attr('src', dataJson.qrcodeUrl);
        }
    });

    //分享
    if (isWeiXin()) {
        $('.share-btn').click(function () {
            $('.mask').addClass('show');
        });
    } else {
        $('.share-btn').hide();
    }

    $('body').on('click', '.mask', function () {
        $(this).removeClass('show');
    });







});