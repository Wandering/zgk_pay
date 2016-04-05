<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
    <%@ include file="../common/meta.jsp"%>
    <title>登录页</title>
    <link rel="stylesheet" href="<%=ctx%>/static/dist/css/order/style.css"/>
</head>
<body>
<%@ include file="../common/header.jsp"%>
<div class="container" id="container">
    <div>
        <div class="order-list">
        </div>
        <div class="pull">
            <div class="pull-text">上拉浏览更多</div>
            <div class="infinite-scroll-preloader" id="scroller-pullUp">
                <div class="preloader"></div>
            </div>
        </div>
    </div>
</div>
<div class="modal hidden">
    <div class="order-info">
        <div id="orderNo"></div>
        <div id="order_time"></div>
        <div>购买服务名称：智能高考VIP服务卡</div>
        <div id="service_price"></div>
        <div id="pay_price"></div>
    </div>
    <div class="confirm-btn">确认支付</div>
</div>
<script src="<%=ctx%>/static/dist/js/commons.js"></script>
<script type="text/javascript" src="<%=ctx%>static/dist/js/order.js"></script>
</body>
</html>