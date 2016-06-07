$(function () {
    var cookie = require('cookie');
    var util = require('commonjs');
    var urlConfig = require('urlConfig');
    var account = cookie.getCookieValue('phone');
    var getTime = require('timeFormat');

    var isLogin = cookie.getCookieValue('isLogin');
    var toUrl = util.getLinkey('state');
    var userId = cookie.getCookieValue('userId');




    var sharerId = util.getLinkey('sharerId');
    var sharerType = util.getLinkey('sharerType');

    cookie.setCookie("sharerId", sharerId, 4, "/" );
    cookie.setCookie("sharerType", sharerType, 4, "/" );
});










