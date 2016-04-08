var cookie = require('cookie');



    var isLogin = cookie.getCookieValue('isLogin');

    if(isLogin){
        var userName = cookie.getCookieValue('userName');
        $('#userName').text(userName);
    }
    var vipStatus = cookie.getCookieValue('vipStatus');
    if(vipStatus=="1"){
        $('#vipStatus').attr('href','/vip-check');
    }

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
    $('#province-text').on('click',function(){
        $('#province-option').toggleClass('hide');
        if(isLogin){
            $('#province-option').hide();
        }
    });
    if(!cookie.getCookieValue('userKey')){
        cookie.setCookie("userKey", 'zj', 4, "/");
        $('#province-text').text('浙江');
    }




    var userKey = cookie.getCookieValue('userKey');

    var provinceTxt = $('#province-option-list a[domain="'+ userKey +'"]').text();
    $('#province-text').text(provinceTxt);

    var paths = window.location.pathname.split('/');
    var pagePath = paths[paths.length - 1];

    $('#province-option-list').on('click','a',function(){
        var dataHref = $(this).attr('data-href');
        //var domainProvince = $(this).attr('domain');
        window.location.href= dataHref +pagePath;
        //console.log(domainProvince);
        if (!isLogin) {
            cookie.setCookie("userKey", 'zj', 4, "/");
        }
    });



    // 退出
    $('#logout-btn').on('click', function () {
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
    });


