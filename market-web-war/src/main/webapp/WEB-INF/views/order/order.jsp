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
<div class="container">
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
<script type="text/javascript" src="<%=ctx%>/static/dist/js/commons.js"></script>
<script type="text/javascript" src="<%=ctx%>static/dist/js/order.js"></script>
</body>
</html>