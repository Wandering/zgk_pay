<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
    <%@ include file="../common/meta.jsp" %>
    <title></title>
    <meta name="description" content="智高考，一款精准的高考志愿填报产品。一键分享他人，成功购买既得返利.">
    <link rel="stylesheet" href="<%=ctx%>/static/dist/css/code/style.css"/>
</head>
<body>
<%@ include file="../common/header.jsp" %>
<div class="container">
    <div class="user-info clearfix">
        <div class="avatar left">
            <img src="<%=ctx%>/static/dist/img/icons/avatar.png"/>
        </div>
        <div class="summary left">
            <div class="name"></div>
            <div class="account">账号：<span class="tel"></span></div>
        </div>
    </div>
    <div class="code">
        <img src="" class='captchImg' id="captchImg"/>
    </div>
    <p class="code-txt">分享二维码，获取盈利</p>
    <div class="share-btn">
        分享二维码
    </div>
    <button id="checkJsApi">checkJsApi</button>
    <button id="onMenuShareTimeline">onMenuShareTimeline</button>
    <button id="onMenuShareAppMessage">onMenuShareAppMessage</button>
</div>
<div class="mask">
    <img class="sharer-png" src="/static/dist/img/sharer.png"/>
    <p class="sharer-txt">点这里分享二维码</p>
</div>
<script src="<%=ctx%>/static/dist/js/commons.js"></script>
<script src="<%=ctx%>/static/dist/js/code.js"></script>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>

<script src="<%=ctx%>/static/src/lib/sha1/sha1.js"></script>
<script>
    var timestamp = parseInt(new Date().getTime() / 1000);
    function getNonceStr() {
        var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var maxPos = $chars.length;
        var noceStr = "";
        for (var i = 0; i < 32; i++) {
            noceStr += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return noceStr;
    }
    function getSign() {
        $.ajaxSettings.async = false;
        var signStr = '';
        $.getJSON('<%=ctx%>/pay/getAccessToken', function (res) {

            if (res.rtnCode == "0000000") {
                var ticket = res.bizData.ticket;
                var string1 = "jsapi_ticket=" + ticket + "&noncestr=" + getNonceStr() + "&timestamp=" + timestamp + "&url=http://zgkser.zhigaokao.cn/code?userId=2159";
                var sign = CryptoJS.SHA1(string1);
                signStr = sign.toString();
            }
    wx.config({
        debug: true,
        appId: 'wx552f3800df25e964',
        timestamp: 1420774989,
        nonceStr: '2nDgiWM7gCxhL8v0',
        signature: '1f8a6552c1c99991fc8bb4e2a818fe54b2ce7687',
        jsApiList: [
            'checkJsApi',
            'onMenuShareTimeline',
            'onMenuShareAppMessage'
        ]
    });


    <%--// app_id--%>
    <%--var app_id = "wx552f3800df25e964";--%>
    <%--//时间戳--%>
    <%--var timestamp = parseInt(new Date().getTime() / 1000);--%>
    <%--//随机串--%>
    <%--function getNonceStr() {--%>
    <%--var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';--%>
    <%--var maxPos = $chars.length;--%>
    <%--var noceStr = "";--%>
    <%--for (var i = 0; i < 32; i++) {--%>
    <%--noceStr += $chars.charAt(Math.floor(Math.random() * maxPos));--%>
    <%--}--%>
    <%--return noceStr;--%>
    <%--}--%>

    <%--// 签名--%>
    <%--function getSign() {--%>
    <%--$.ajaxSettings.async = false;--%>
    <%--var signStr = '';--%>
    <%--$.getJSON('<%=ctx%>/pay/getAccessToken', function (res) {--%>

    <%--if (res.rtnCode == "0000000") {--%>
    <%--var ticket = res.bizData.ticket;--%>
    <%--var string1 = "jsapi_ticket=" + ticket + "&noncestr=" + getNonceStr() + "&timestamp=" + timestamp + "&url=http://zgkser.zhigaokao.cn/code?userId=2159";--%>
    <%--var sign = CryptoJS.SHA1(string1);--%>
    <%--signStr = sign.toString();--%>
    <%--}--%>

    <%--});--%>
    <%--$.ajaxSettings.async = true;--%>
    <%--return signStr;--%>
    <%--}--%>
    <%--wx.config({--%>
    <%--debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。--%>
    <%--appId: app_id, // 必填，公众号的唯一标识--%>
    <%--timestamp: timestamp, // 必填，生成签名的时间戳--%>
    <%--nonceStr: getNonceStr(), // 必填，生成签名的随机串--%>
    <%--signature: getSign(),// 必填，签名，见附录1--%>
    <%--jsApiList: [--%>
    <%--'checkJsApi',--%>
    <%--'onMenuShareTimeline',--%>
    <%--'onMenuShareAppMessage'--%>
    <%--] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2--%>
    <%--});--%>
    wx.ready(function () {
        document.querySelector('#checkJsApi').onclick = function () {
            wx.checkJsApi({
                jsApiList: [
                    'getNetworkType',
                    'previewImage'
                ],
                success: function (res) {
                    alert(JSON.stringify(res));
                }
            });
        };
        document.querySelector('#onMenuShareAppMessage').onclick = function () {
            wx.onMenuShareAppMessage({
                title: '智高考购买邀请',
                desc: '智高考，一款精准的高考志愿填报产品。一键分享他人，成功购买既得返利.',
                link: 'http://zgkser.zhigaokao.cn/code?userId=2159',//分享链接
                imgUrl: "http://gk360b.ks3-cn-center-1.ksyun.com/20160413124323.CHSGN6TtgR.jpg", // 分享图标
                trigger: function (res) {
                    alert('用户点击发送给朋友');
                },
                success: function (res) {
                    alert('已分享');
                },
                cancel: function (res) {
                    alert('已取消');
                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            });
            alert('已注册获取“发送给朋友”状态事件');
        };


        // 2.2 监听“分享到朋友圈”按钮点击、自定义分享内容及分享结果接口
        document.querySelector('#onMenuShareTimeline').onclick = function () {
            wx.onMenuShareTimeline({
                title: '智高考购买邀请',
                desc: '智高考，一款精准的高考志愿填报产品。一键分享他人，成功购买既得返利.',
                link: 'http://zgkser.zhigaokao.cn/code?userId=2159',//分享链接
                imgUrl: "http://gk360b.ks3-cn-center-1.ksyun.com/20160413124323.CHSGN6TtgR.jpg", // 分享图标
                trigger: function (res) {
                    alert('用户点击分享到朋友圈');
                },
                success: function (res) {
                    alert('已分享');
                },
                cancel: function (res) {
                    alert('已取消');
                },
                fail: function (res) {
                    alert(JSON.stringify(res));
                }
            });
            alert('已注册获取“分享到朋友圈”状态事件');
        };


    });

    wx.error(function (res) {
        alert(res.errMsg);
    });


</script>


</body>
</html>