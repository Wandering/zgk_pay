<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
    <%@ include file="../common/meta.jsp"%>
    <link rel="stylesheet" href="<%=ctx%>/static/dist/css/modify-user-detail/style.css"/>
</head>
<body>
<%@ include file="../common/header.jsp"%>
<input type="hidden" id="user-birthday" value="">
<input type="hidden" id="user-qq" value="">
<input type="hidden" id="province" value="">
<input type="hidden" id="city" value="">
<input type="hidden" id="county" value="">
<div class="container">
        <div class="avatar">
            <div>
                <img id="avatar-img" src="<%=ctx%>static/dist/img/icons/avatar.png" alt=""/>
            </div>
            <%--<div class="upload-btn">上传头像</div>--%>
        </div>
        <div class="form-group">
            <div class="label">姓名</div>
            <input id="name" type="text"/>
            <div class="clear">
                <img src="<%=ctx%>static/dist/img/icons/clear.png" alt=""/>
            </div>
        </div>
        <div class="form-group">
            <div class="label">性别选择：</div>
            <div class="options right">
                <span data-value="0" class="sex">女</span>
                <span data-value="1" class="sex">男</span>
            </div>
        </div>
        <div class="form-group">
            <div class="label">所在学校：</div>
            <input id="school_name" type="text"/>
            <div class="clear">
                <img src="<%=ctx%>static/dist/img/icons/clear.png" alt=""/>
            </div>
        </div>
        <div class="form-group">
            <div class="label">科目选择：</div>
            <div class="options right">
                <span data-value="0" class="subject">文科</span>
                <span data-value="1" class="subject">理科</span>
            </div>
        </div>
        <div class="form-group">
            <div class="label">Email</div>
            <input id="email" type="text"/>
            <div class="clear">
                <img src="<%=ctx%>static/dist/img/icons/clear.png" alt=""/>
            </div>
        </div>
        <div class="submit-btn">
            提交
        </div>
</div>
<script src="<%=ctx%>/static/dist/js/commons.js"></script>
<script type="text/javascript" src="<%=ctx%>static/dist/js/modifyUserDetail.js"></script>
</body>
</html>