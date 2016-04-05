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
            <a href="">盈利规则</a>
        </div>
        <div class="clearfix"></div>
        <div class="count">
            总金额：￥802.02元
        </div>
    </div>
    <div class="container-content">
        <ul class="detail-list">
            <li>2016/03月共计收入￥234.05元，明细如下</li>
            <li>
                <span>收入 + 12.00元</span>
                <span class="right">03/16 09:21:23</span>
            </li>
            <li>
                <span>收入 + 12.00元</span>
                <span class="right">03/16 09:21:23</span>
            </li>
            <li>
                <span>收入 + 12.00元</span>
                <span class="right">03/16 09:21:23</span>
            </li>
            <li>
                <span>收入 + 12.00元</span>
                <span class="right">03/16 09:21:23</span>
            </li>
        </ul>
    </div>
</div>
<script type="text/javascript" src="<%=ctx%>/static/dist/js/commons.js"></script>
<script type="text/javascript" src="<%=ctx%>static/dist/js/consumerList.js"></script>
</body>
</html>