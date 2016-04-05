<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head lang="en">
    <%@ include file="../common/meta.jsp" %>
    <title>登录页</title>
    <link rel="stylesheet" href="<%=ctx%>/static/dist/css/register/style.css"/>
</head>
<body>
<%@ include file="../common/header.jsp" %>
<div class="container">
    <div class="tab-list">
        <div class="tab tab-login">登录</div>
        <div class="tab tab-register type-res active" typeRes="1">注册</div>
    </div>
    <div class="tab-content" id="login">
        <div class="form-group">
            <div class="input-group">
                <i class="mobile-icon"></i>
                <input type="text" id="login-phone" placeholder="请输入手机号码"/>
            </div>
        </div>
        <div class="form-group">
            <div class="input-group">
                <i class="password-icon"></i>
                <input type="password" id="login-pwd" placeholder="请输入密码"/>
            </div>
        </div>
        <div class="reset-password">
            <a href="/find-password">忘记密码？</a>
        </div>
        <div class="form-group">
            <button class="submit-btn" id="submit-btn">登录</button>
        </div>
    </div>


    <div class="register-input tab-content login-reg-content" id="register">
        <div class="form-group">
            <div class="input-group">
                <i class="mobile-icon"></i>
                <input type="text" id="register-phone" placeholder="请输入手机号码"/>
            </div>
        </div>
        <div class="form-group">
            <input class="check-code" type="text" id="verification-code" placeholder="输入验证码"/>
            <button type="button" class="btn btn-code w50" id="verification-btn">获取验证码</button>
        </div>
        <div class="form-group areaSel">
            <div class="title">高考报名地区：</div>
            <div class="location-list">
                <span class="select"><select name="" id="province" class="form-control"></select></span>
                <span class="select"><select name="" id="city" class="form-control"></select></span>
                <span class="select"><select name="" id="county" class="form-control"></select></span>
            </div>
            <label class="areaSel-result" id="areaSel-result"></label>
        </div>
        <div class="form-group">
            <div class="input-group">
                <i class="password-icon"></i>
                <input type="password" id="register-pwd" placeholder="密码"/>
            </div>
        </div>
        <div class="form-group">
            <div class="input-group">
                <i class="password-icon"></i>
                <input type="password" id="register-pwd-repeat" placeholder="确认密码"/>
            </div>
        </div>
        <div class="form-group">
            <button class="submit-btn" id="register-btn">注册</button>
        </div>
    </div>
</div>


<div class="mask">
    <div class="modal">
        <div class="modal-title">修改密码</div>
        <div class="modal-body">
            <input id="current-psd" type="text" placeholder="当前密码">
            <input id="new-psd" type="text" placeholder="新密码">
            <input id="confirm-psd" type="text" placeholder="确认新密码">
            <input id="confirm_pwd_btn" type="button" value="确认修改">
        </div>
        <div class="close-modal">X</div>
    </div>
</div>


<script src="<%=ctx%>/static/dist/js/commons.js"></script>
<script src="<%=ctx%>/static/dist/js/regLogin.js"></script>
</body>
</html>