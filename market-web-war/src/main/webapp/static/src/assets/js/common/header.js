var cookie = require('cookie');



    var isLogin = cookie.getCookieValue('isLogin');



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
    });
    if(!cookie.getCookieValue('userKey')){
        alert(2)
        cookie.setCookie("userKey", 'zj', 4, "/");
        $('#province-text').text('浙江');
        alert(3)
    }




    var userKey = cookie.getCookieValue('userKey');

    var provinceTxt = $('#province-option-list a[domain="'+ userKey +'"]').text();
    $('#province-text').text(provinceTxt);

    var paths = window.location.pathname.split('/');
    var pagePath = paths[paths.length - 1];

    $('#province-option-list').on('click','a',function(){
        var dataHref = $(this).attr('data-href');
        var domainProvince = $(this).attr('domain');
        window.location.assign(dataHref +pagePath);
        console.log(domainProvince);
        if (!isLogin) {
            cookie.setCookie("userKey", domainProvince, 4, "/");
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
    });


