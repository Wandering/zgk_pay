(function () {

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
    var urlDomain = window.location.hostname + '';
    var urlArr = urlDomain.split('.');
    var provinceKey = urlArr[0];
    var provinceTxt = $('#province-option-list a[data-href="http://' + provinceKey + '.m.zhigaokao.com:8084/"]').text();
    console.log(provinceTxt);
    $('#province-text').text(provinceTxt);

    var paths = window.location.pathname.split('/');
    var pagePath = paths[paths.length - 1];

    $('#province-option-list').on('click','a',function(){
        var dataHref = $(this).attr('data-href');
        window.location.assign(dataHref +pagePath);
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
    })


})();
