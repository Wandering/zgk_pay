<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
    <%@ include file="../common/meta.jsp"%>
    <title>登录页</title>
    <link rel="stylesheet" href="<%=ctx%>/static/dist/css/consumer-list/consumer-list.css"/>
</head>
<body>
<%@ include file="../common/header.jsp"%>
<div class="container">
    <div class="container-header">
        <div class="right">
            <img src="<%=ctx%>static/dist/img/icons/info.png" alt=""/>
            <a href="/intro">盈利规则</a>
        </div>
        <div class="clearfix"></div>
        <div class="count">
            总金额：￥<span id="total-sum"></span>元
        </div>
    </div>
    <div class="container-content" id="detail-list">

    </div>
</div>
<script type="text/javascript" src="<%=ctx%>/static/dist/js/commons.js"></script>
<script type="text/javascript" src="<%=ctx%>static/dist/js/consumerList.js"></script>
</body>
</html>