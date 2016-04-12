<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
    <%@ include file="../common/meta.jsp" %>
    <title>登录页</title>
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
</div>
<div class="mask">
    <img class="sharer-png" src="/static/dist/img/sharer.png"/>
    <p class="sharer-txt">分享二维码</p>
</div>
<script src="<%=ctx%>/static/dist/js/commons.js"></script>
<script src="<%=ctx%>/static/dist/js/code.js"></script>
<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script>

    $(function () {

        $.getJSON('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx552f3800df25e964&secret=8188e75b097aa62dc56272a0797d48ae')


        // app_id
        var app_id = "wx552f3800df25e964";
        //时间戳
        var timestamp = parseInt(new Date().getTime() / 1000);
        var userId = '1977';
        //随机串
        function getNonceStr() {
            var $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var maxPos = $chars.length;
            var noceStr = "";
            for (var i = 0; i < 32; i++) {
                noceStr += $chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return noceStr;
        }

        // 签名
        function getSign() {
            var string1 = "jsapi_ticket="+ "&noncestr="+ getNonceStr() + "&timestamp="+timestamp + "&url="+'http://zgkser.zhigaokao.cn/code?userId='+ userId;

            var sign;

            return sign;
        }

        console.log(getSign());

        wx.config({
            debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: 'wx552f3800df25e964', // 必填，公众号的唯一标识
            timestamp: timestamp, // 必填，生成签名的时间戳
            nonceStr: getNonceStr(), // 必填，生成签名的随机串
            signature: getSign(),// 必填，签名，见附录1
            jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        });
        wx.ready(function () {
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
            wx.onMenuShareAppMessage({
                title: '1', // 分享标题
                desc: '2', // 分享描述
                link: 'http://www.baidu.com', // 分享链接
                imgUrl: '', // 分享图标
                type: '', // 分享类型,music、video或link，不填默认为link
                dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
                success: function () {
                    // 用户确认分享后执行的回调函数
                },
                cancel: function () {
                    // 用户取消分享后执行的回调函数
                }
            });
        });
    });

</script>
</body>
</html>