$(function () {
    $('#header-title').text('二维码');
    var util = require('commonjs');

    var interfaceUrl = require('urlConfig');
    var cookie = require('cookie');
    var isLogin = cookie.getCookieValue('isLogin');
    var token = cookie.getCookieValue('token');
    var userId = cookie.getCookieValue('userId');
    $('#header-back').show().on('click', function () {
        window.location.href = 'user-detail?state=user-detail&token='+token;
    });
    var toUrl = util.getLinkey('state');
    if(toUrl=='code'){
        if(!isLogin){
            window.location.href='/login?state=code';
        }else{
            var menuV = util.getLinkey('menu');
            if(menuV=="1"){
                cookie.setCookie("flag", "0", 4, "/");
            }
            var flag = cookie.getCookieValue('flag');
            if(flag=="0"){
                cookie.setCookie("flag", "1", 4, "/");
                window.location.assign('code?state=code&userId=' + userId);
            }
        }
    }

    function isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.indexOf('micromessenger') > -1) {
            return true;
        } else {
            return false;
        }
    }


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



    /***************************自定义二维码*************************************/
    //var jweixin = require('jweixin');
    //var sha1 = require('sha1');
    //// app_id
    //var app_id = "wx552f3800df25e964";
    ////时间戳
    //var timestamp = parseInt(new Date().getTime() / 1000);
    //var userId = '1977';
    ////随机串
    //function getNonceStr() {
    //    var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //    var maxPos = $chars.length;
    //    var noceStr = "";
    //    for (var i = 0; i < 32; i++) {
    //        noceStr += $chars.charAt(Math.floor(Math.random() * maxPos));
    //    }
    //    return noceStr;
    //}
    //
    //// 签名
    //function getSign() {
    //    $.ajaxSettings.async = false;
    //    var signStr = '';
    //    util.ajaxFun(interfaceUrl.getAccessToken, 'get', {}, function (res) {
    //        if (res.rtnCode = '0000000') {
    //            var ticket = res.bizData.ticket;
    //            var string1 = "jsapi_ticket=" + ticket + "&noncestr=" + getNonceStr() + "&timestamp=" + timestamp + "&url=" + 'http://www.baidu.com';
    //            var sign = CryptoJS.SHA1(string1);
    //            console.log(sign.toString());
    //            signStr = sign.toString();
    //        }
    //    });
    //    $.ajaxSettings.async = true;
    //    return signStr;
    //}
    //
    //console.log(getSign())
    //
    //wx.config({
    //    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //    appId: app_id, // 必填，公众号的唯一标识
    //    timestamp: timestamp, // 必填，生成签名的时间戳
    //    nonceStr: getNonceStr(), // 必填，生成签名的随机串
    //    signature: getSign(),// 必填，签名，见附录1
    //    jsApiList: [
    //        'checkJsApi',
    //        'onMenuShareTimeline',
    //        'onMenuShareAppMessage'
    //    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    //});
    //wx.ready(function () {
    //    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
    //    //wx.onMenuShareAppMessage({
    //    //    title: '1', // 分享标题
    //    //    desc: '2', // 分享描述
    //    //    link: 'http://www.baidu.com', // 分享链接
    //    //    imgUrl: '', // 分享图标
    //    //    type: '', // 分享类型,music、video或link，不填默认为link
    //    //    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    //    //    success: function () {
    //    //        alert("成功");
    //    //        // 用户确认分享后执行的回调函数
    //    //    },
    //    //    cancel: function () {
    //    //        // 用户取消分享后执行的回调函数
    //    //        alert("失败");
    //    //    }
    //    //});
    //    var shareObj = {
    //        title: '智高考购买邀请',
    //        desc: '智高考，一款精准的高考志愿填报产品。一键分享他人，成功购买既得返利.',
    //        link: '',
    //        imgUrl: '',
    //        type: '', // 分享类型,music、video或link，不填默认为link
    //        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    //        trigger: function (res) {
    //            alert('用户点击发送给朋友');
    //        },
    //        success: function (res) {
    //            alert('已分享');
    //        },
    //        cancel: function (res) {
    //            alert('已取消');
    //        },
    //        fail: function (res) {
    //            alert(JSON.stringify(res));
    //        }
    //    };
    //    //分享朋友
    //    wx.onMenuShareAppMessage(shareObj);
    //    //分享朋友圈
    //    wx.onMenuShareTimeline(shareObj);
    //});






});