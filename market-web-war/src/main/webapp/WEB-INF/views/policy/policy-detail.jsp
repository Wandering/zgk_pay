<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
    <%@ include file="../common/meta.jsp" %>
    <title>高考政策</title>
    <link rel="stylesheet" href="<%=ctx%>/static/dist/css/policy/policy-detail.css"/>
</head>
<body>
<header>
    <div class="header-btn">
        <i class="back-icon"></i>
    </div>
    <div class="header-title">
        <span>高考政策</span>
    </div>
    <div class="header-btn">
        <i class="search-icon"></i>
    </div>
</header>
<div class="container" id="policy-detail">
    <script id="policy-detail-tpl" type="text/x-handlebars-template">
        <div class="title">{{title}}</div>
        <div class="date">{{hotDate}}</div>
        <div class="banner">
            <img src="{{image}}" alt="{{title}}"/>
        </div>
        <div class="content">{{{content}}}</div>
    </script>
</div>
<script src="<%=ctx%>/static/dist/js/policyDetail.js"></script>
</body>
</html>