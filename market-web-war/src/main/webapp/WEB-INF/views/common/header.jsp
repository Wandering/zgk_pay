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
        <div class="header-btn" id="header-close">
            <i class="close-icon"></i>
        </div>
    </header>
    <div class="container">
        <div class="backdrop"></div>
        <div class="menu">
            <%--<div class="title">--%>
                <%--<span>邓平</span>--%>
                <%--<span>理科</span>--%>
                <%--<span>580分</span>--%>
            <%--</div>--%>
            <div class="menu-list clearfix">
                <div class="item">
                    <img src="<%=ctx%>/static/dist/img/1-active.png" alt=""/>
                    <div>查院校</div>
                </div>
                <div class="item">
                    <img src="<%=ctx%>/static/dist/img/2-active.png" alt=""/>
                    <div>查专业</div>
                </div>
                <div class="item">
                    <img src="<%=ctx%>/static/dist/img/3-active.png" alt=""/>
                    <div>省控线</div>
                </div>
                <div class="item">
                    <img src="<%=ctx%>/static/dist/img/4-active.png" alt=""/>
                    <div>院校预测</div>
                </div>
                <div class="item">
                    <img src="<%=ctx%>/static/dist/img/5-active.png" alt=""/>
                    <div>录取预测</div>
                </div>
                <div class="item">
                    <img src="<%=ctx%>/static/dist/img/6-active.png" alt=""/>
                    <div>高考政策</div>
                </div>
                <div class="item">
                    <img src="<%=ctx%>/static/dist/img/7-active.png" alt=""/>
                    <div>高考日程</div>
                </div>
                <div class="item">
                    <img src="<%=ctx%>/static/dist/img/8-active.png" alt=""/>
                    <div>我的钱包</div>
                </div>
                <div class="item">
                    <img src="<%=ctx%>/static/dist/img/9-active.png" alt=""/>
                    <div>我的订单</div>
                </div>
            </div>
            <div class="btn">
                <span><a href="/login/logout">退出</a></span>
                <span>升级VIP</span>
            </div>
        </div>
    </div>
</div>

<div class="hide" id="un-login">
    <header>
        <div class="header-btn">
            <i class="close-icon"></i>
        </div>
    </header>
    <div class="container">
        <div class="backdrop"></div>
        <div class="menu">
            <div class="menu-list clearfix">
                <div class="item">
                    <img src="<%=ctx%>/static/dist/img/1.png" alt=""/>
                    <div>查院校</div>
                </div>
                <div class="item">
                    <img src="<%=ctx%>/static/dist/img/2.png" alt=""/>
                    <div>查专业</div>
                </div>
                <div class="item">
                    <img src="<%=ctx%>/static/dist/img/3.png" alt=""/>
                    <div>省控线</div>
                </div>
                <div class="item">
                    <img src="<%=ctx%>/static/dist/img/4.png" alt=""/>
                    <div>院校预测</div>
                </div>
                <div class="item">
                    <img src="<%=ctx%>/static/dist/img/5.png" alt=""/>
                    <div>录取预测</div>
                </div>
                <div class="item">
                    <img src="<%=ctx%>/static/dist/img/6.png" alt=""/>
                    <div>高考政策</div>
                </div>
                <div class="item">
                    <img src="<%=ctx%>/static/dist/img/7.png" alt=""/>
                    <div>高考日程</div>
                </div>
                <div class="item">
                    <img src="<%=ctx%>/static/dist/img/8.png" alt=""/>
                    <div>我的钱包</div>
                </div>
                <div class="item">
                    <img src="<%=ctx%>/static/dist/img/9.png" alt=""/>
                    <div>我的订单</div>
                </div>
            </div>
            <div class="btn">
                <span>登录/注册</span>
                <span>升级VIP</span>
            </div>
        </div>
    </div>
</div>

<script src="<%=ctx%>/static/dist/js/header.js"></script>