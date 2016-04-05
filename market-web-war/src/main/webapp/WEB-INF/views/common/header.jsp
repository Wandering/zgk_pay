<%@ page language="java" pageEncoding="UTF-8" %>
<div id="menu-header">
    <header>
        <div class="header-btn hide" id="header-menu">
            <i class="menu-icon"></i>
        </div>
        <div class="header-btn header-back  hide" id="header-back">
            <i class="back-icon"></i>
        </div>
        <div class="header-title">
            <span id="header-title"></span>
            <span class="location location-icon">陕西</span>
        </div>
        <div class="header-btn header-search hide" id="header-search">
            <i class="search-icon"></i>
        </div>
    </header>
</div>

<div id="end-login" class="hide">
    <header>
        <div class="header-btn header-close" id="">
            <i class="close-icon"></i>
        </div>
    </header>
    <div class="content">
        <div class="backdrop"></div>
        <div class="menu">
            <%--<div class="title">--%>
            <%--<span>邓平</span>--%>
            <%--<span>理科</span>--%>
            <%--<span>580分</span>--%>
            <%--</div>--%>
            <div class="menu-list clearfix">
                <div class="item">
                    <a href="">
                        <img src="<%=ctx%>/static/dist/img/1-active.png" alt=""/>
                        <span>查院校</span>
                    </a>
                </div>
                <div class="item">
                    <a href="">
                        <img src="<%=ctx%>/static/dist/img/2-active.png" alt=""/>
                    </a>
                    <span>查专业</span>
                </div>
                <div class="item">
                    <a href="">
                        <img src="<%=ctx%>/static/dist/img/3-active.png" alt=""/>
                        <span>省控线</span>
                    </a>
                </div>
                <div class="item">
                    <a href="">
                        <img src="<%=ctx%>/static/dist/img/4-active.png" alt=""/>
                        <span>院校预测</span>
                    </a>
                </div>
                <div class="item">
                    <a href="">
                        <img src="<%=ctx%>/static/dist/img/5-active.png" alt=""/>
                        <span>录取预测</span>
                    </a>
                </div>
                <div class="item">
                    <a href="/policy">
                        <img src="<%=ctx%>/static/dist/img/6-active.png" alt=""/>
                        <span>高考政策</span>
                    </a>
                </div>
                <div class="item">
                    <a href="">
                        <img src="<%=ctx%>/static/dist/img/7-active.png" alt=""/>
                        <span>高考日程</span>
                    </a>
                </div>
                <div class="item">
                    <a href="">
                        <img src="<%=ctx%>/static/dist/img/8-active.png" alt=""/>
                        <span>我的钱包</span>
                    </a>
                </div>
                <div class="item">
                    <a href="">
                        <img src="<%=ctx%>/static/dist/img/9-active.png" alt=""/>
                        <span>我的订单</span>
                    </a>
                </div>
            </div>
            <div class="btn">
                <a href="/login/logout" id="logout-btn">退出</a>
                <a href="/vip">升级VIP</a>
            </div>
        </div>
    </div>
</div>

<div class="hide" id="un-login">
    <header>
        <div class="header-btn header-close" id="">
            <i class="close-icon"></i>
        </div>
    </header>
    <div class="content">
        <div class="backdrop"></div>
        <div class="menu">
            <div class="menu-list clearfix">
                <div class="item">
                    <a href="">
                        <img src="<%=ctx%>/static/dist/img/1.png" alt=""/>
                        <span>查院校</span>
                    </a>
                </div>
                <div class="item">
                    <a href="">
                        <img src="<%=ctx%>/static/dist/img/2.png" alt=""/>
                        <span>查专业</span>
                    </a>
                </div>
                <div class="item">
                    <a href="">
                        <img src="<%=ctx%>/static/dist/img/3.png" alt=""/>
                        <span>省控线</span>
                    </a>
                </div>
                <div class="item">
                    <a href="">
                        <img src="<%=ctx%>/static/dist/img/4.png" alt=""/>

                        <span>院校预测</span>
                    </a>
                </div>
                <div class="item">
                    <a href="">
                        <img src="<%=ctx%>/static/dist/img/5.png" alt=""/>
                        <span>录取预测</span>
                    </a>
                </div>
                <div class="item">
                    <a href="/policy">
                        <img src="<%=ctx%>/static/dist/img/6.png" alt=""/>
                        <span>高考政策</span>
                    </a>
                </div>
                <div class="item">
                    <a href="">
                        <img src="<%=ctx%>/static/dist/img/7.png" alt=""/>
                        <span>高考日程</span>
                    </a>
                </div>
                <div class="item">
                    <a href="">
                        <img src="<%=ctx%>/static/dist/img/8.png" alt=""/>
                        <span>我的钱包</span>
                    </a>
                </div>
                <div class="item">
                    <a href="">
                        <img src="<%=ctx%>/static/dist/img/9.png" alt=""/>
                        <span>我的订单</span>
                    </a>
                </div>
            </div>
            <div class="btn">
                <a href="/login" id="login-btn">登录/注册</a>
                <%--<a href="/vip">升级VIP</a>--%>
            </div>
        </div>
    </div>
</div>

<script src="<%=ctx%>/static/dist/js/header.js"></script>