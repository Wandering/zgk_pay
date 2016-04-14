$(function () {
    var util = require('commonjs');
    var cookie = require('cookie');
    var toUrl = util.getLinkey('state');
    var isLogin = cookie.getCookieValue('isLogin');
    var token = cookie.getCookieValue('token');
    var userName = cookie.getCookieValue('userName');
    var interfaceUrl = require('urlConfig');

    if (isLogin) {
        $('#userName').text(userName);
        //$('#consumerLinks').attr('href', '/consumer-list?toUrl=consumer-list&token=' + token);
        //$('#orderLinks').attr('href', '/order?toUrl=order&token=' + token);
        //$('#userLinks').attr('href', '/user-detail?toUrl=user-detail&token=' + token);
        //$('#vipStatus').attr('href', '/vip?toUrl=vip&token=' + token);
    }



    $('#login-btn').attr('href','/login?state='+toUrl);



    //var vipStatus = cookie.getCookieValue('vipStatus');
    //if (vipStatus == "1") {
    //    $('#vipStatus').attr('href', '/vip-check?token=' + token);
    //} else {
    //    $('#vipStatus').attr('href', '/vip?token=' + token);
    //}
    // 打开主菜单
    $('#header-menu').on('click', function () {
        if (isLogin) {
            $('#menu-header').hide();
            $('#end-login').show();
            $('.header-close').on('click', function () {
                $('#menu-header').show();
                $('#end-login').hide();
            });
        } else {
            $('#menu-header').hide();
            $('#un-login').show();
            $('.header-close').on('click', function () {
                $('#menu-header').show();
                $('#un-login').hide();
            });
        }
    });


    // 切换省份
    $('#province-text').on('click', function () {
        $('#province-option').toggleClass('hide');
        if (isLogin) {
            $('#province-option').hide();
        }
    });
    if (!cookie.getCookieValue('userKey')) {
        cookie.setCookie("userKey", 'zj', 4, "/");
        $('#province-text').text('浙江');
    }
    var userKey = cookie.getCookieValue('userKey');
    var provinceTxt = $('#province-option-list a[domain="' + userKey + '"]').text();
    $('#province-text').text(provinceTxt);
    var paths = window.location.pathname.split('/');
    var pagePath = paths[paths.length - 1];
    $('#province-option-list').on('click', 'a', function () {
        var domainProvince = $(this).attr('domain');
        window.location.href = '/' + pagePath;
        console.log(domainProvince);
        if (!userKey) {
            cookie.setCookie("userKey", 'zj', 4, "/");
        } else {
            cookie.setCookie("userKey", domainProvince, 4, "/");
        }
    });

    var userId = cookie.getCookieValue('userId');
    $('.invite-friend').click(function () {
        var loginFlag = cookie.getCookieValue('isLogin');
        if (loginFlag != 'true') {
            window.location.href = '/login?state=code';
            return false;
        }
        window.location.href = '/code?userId=' + userId;
    });

    var loginUrl = 'login?state=' + toUrl;

    // 退出
    $('#logout-btn').attr('href',loginUrl).on('click', function () {
        cookie.deleteCookie('city', '');
        cookie.deleteCookie('county', '');
        cookie.deleteCookie('icon', '');
        cookie.deleteCookie('isLogin', '');
        cookie.deleteCookie('isReported', '');
        cookie.deleteCookie('isSurvey', '');
        cookie.deleteCookie('phone', '');
        cookie.deleteCookie('province', '');
        cookie.deleteCookie('qrcodeUrl', '');
        cookie.deleteCookie('subjectType', '');
        cookie.deleteCookie('token', '');
        cookie.deleteCookie('userKey', '');
        cookie.deleteCookie('userName', '');
        cookie.deleteCookie('vipStatus', '');
        cookie.deleteCookie('userId', '');
        cookie.deleteCookie('proName', '');
        cookie.deleteCookie('cityName', '');
        cookie.deleteCookie('countyName', '');
        cookie.deleteCookie('vipActiveDate', '');
        cookie.deleteCookie('vipEndDate', '');
        cookie.deleteCookie("flag", '');
    });


    function getOpenId(code) {
        util.ajaxFun(interfaceUrl.getOpenId, 'get', {
            code: code
        }, function (res) {
            alert(JSON.stringify(res));
            if (res.rtnCode == '0000000') {
                cookie.setCookie("openId", res.bizData.openId, 4, "/");
            }
        });
    }

    function isWeiXin(){
        var ua = window.navigator.userAgent.toLowerCase();
        if(ua.indexOf('micromessenger') > -1){
            return true;
        }else{
            return false;
        }
    }
    if (isWeiXin()) {
        var obj = getQueryObject(window.location.href);
        cookie.setCookie("code", obj.code, 4, "/");
        alert(obj.code)
        getOpenId(obj.code);
    }

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




});