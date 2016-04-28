<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
    <%@ include file="../common/meta.jsp"%>
    <title>登录页</title>
    <link rel="stylesheet" href="<%=ctx%>/static/dist/css/vip-buy/style.css"/>
</head>
<body>
<%@ include file="../common/header.jsp"%>
<div class="container">
    <div class="description">
        <img src="<%=ctx%>static/dist/img/icons/bannner.png" alt=""/>
        <%--<div class="title" id="title">智能高考VIP服务卡</div>--%>
        <%--<div class="content" id="content">--%>
            <%--升级成为VIP后，可免费观看高考学堂全部视频；进行权威职业测评服务；在线浏览数据库资料，全国各大高等院校专业资料；提前熟悉志愿填报流程，享受智能推荐填报志愿服务。--%>
        <%--</div>--%>
    </div>
    <div class="vip-check-info">
        <%--<img src="<%=ctx%>/static/dist/img/icons/vip.png" alt=""/>--%>
        <div class="text">
            <div id="price"></div>
        </div>
        <div class="num">
            <span>购买数量：</span><span class="sub subtraction"></span><span class="number">1</span><span class="plus plus-able"></span>
        </div>
    </div>
    <div class="vip-buy-btn">
        立即购买
    </div>
    <div class="console_msg"></div>
    <div class="modal hidden">
        <div class="order-info">
            <div id="orderNo"></div>
            <div id="order_time"></div>
            <div>购买服务名称：智能高考VIP服务卡</div>
            <div id="service_price"></div>
            <div id="pay_number"></div>
            <div id="pay_price"></div>
        </div>
        <div class="confirm-btn">确认支付</div>
    </div>
</div>
<script src="<%=ctx%>/static/dist/js/commons.js"></script>
<script src="<%=ctx%>/static/dist/js/pingpp.js"></script>
<script src="<%=ctx%>/static/dist/js/vipBuy.js?v=11"></script>
</body>
</html>