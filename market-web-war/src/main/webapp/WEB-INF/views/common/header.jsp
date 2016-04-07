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
            <span class="location location-icon" id="province-text">陕西</span>
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
                <%--<div class="item">--%>
                <%--<a href="">--%>
                <%--<img src="<%=ctx%>/static/dist/img/1-active.png" alt=""/>--%>
                <%--<span>查院校</span>--%>
                <%--</a>--%>
                <%--</div>--%>
                <%--<div class="item">--%>
                <%--<a href="">--%>
                <%--<img src="<%=ctx%>/static/dist/img/2-active.png" alt=""/>--%>
                <%--</a>--%>
                <%--<span>查专业</span>--%>
                <%--</div>--%>
                <%--<div class="item">--%>
                <%--<a href="">--%>
                <%--<img src="<%=ctx%>/static/dist/img/3-active.png" alt=""/>--%>
                <%--<span>省控线</span>--%>
                <%--</a>--%>
                <%--</div>--%>
                <%--<div class="item">--%>
                <%--<a href="">--%>
                <%--<img src="<%=ctx%>/static/dist/img/4-active.png" alt=""/>--%>
                <%--<span>院校预测</span>--%>
                <%--</a>--%>
                <%--</div>--%>
                <%--<div class="item">--%>
                <%--<a href="">--%>
                <%--<img src="<%=ctx%>/static/dist/img/5-active.png" alt=""/>--%>
                <%--<span>录取预测</span>--%>
                <%--</a>--%>
                <%--</div>--%>
                <div class="item">
                    <a href="/policy">
                        <img src="<%=ctx%>/static/dist/img/6-active.png" alt=""/>
                        <span>高考政策</span>
                    </a>
                </div>
                <div class="item">
                    <a href="/schedule">
                        <img src="<%=ctx%>/static/dist/img/7-active.png" alt=""/>
                        <span>高考日程</span>
                    </a>
                </div>
                <div class="item">
                    <a href="/consumer-list">
                        <img src="<%=ctx%>/static/dist/img/8-active.png" alt=""/>
                        <span>我的钱包</span>
                    </a>
                </div>
                <div class="item">
                    <a href="/order">
                        <img src="<%=ctx%>/static/dist/img/9-active.png" alt=""/>
                        <span>我的订单</span>
                    </a>
                </div>
                <div class="item">
                    <a href="/user-detail">
                        <img src="<%=ctx%>/static/dist/img/10-active.png" alt=""/>
                        <span>个人信息</span>
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
                <%--<div class="item">--%>
                <%--<a href="">--%>
                <%--<img src="<%=ctx%>/static/dist/img/1.png" alt=""/>--%>
                <%--<span>查院校</span>--%>
                <%--</a>--%>
                <%--</div>--%>
                <%--<div class="item">--%>
                <%--<a href="">--%>
                <%--<img src="<%=ctx%>/static/dist/img/2.png" alt=""/>--%>
                <%--<span>查专业</span>--%>
                <%--</a>--%>
                <%--</div>--%>
                <%--<div class="item">--%>
                <%--<a href="">--%>
                <%--<img src="<%=ctx%>/static/dist/img/3.png" alt=""/>--%>
                <%--<span>省控线</span>--%>
                <%--</a>--%>
                <%--</div>--%>
                <%--<div class="item">--%>
                <%--<a href="">--%>
                <%--<img src="<%=ctx%>/static/dist/img/4.png" alt=""/>--%>

                <%--<span>院校预测</span>--%>
                <%--</a>--%>
                <%--</div>--%>
                <%--<div class="item">--%>
                <%--<a href="">--%>
                <%--<img src="<%=ctx%>/static/dist/img/5.png" alt=""/>--%>
                <%--<span>录取预测</span>--%>
                <%--</a>--%>
                <%--</div>--%>
                <div class="item">
                    <a href="/policy">
                        <img src="<%=ctx%>/static/dist/img/6.png" alt=""/>
                        <span>高考政策</span>
                    </a>
                </div>
                <div class="item">
                    <a href="/schedule">
                        <img src="<%=ctx%>/static/dist/img/7.png" alt=""/>
                        <span>高考日程</span>
                    </a>
                </div>
                <div class="item">
                    <a href="/consumer-list">
                        <img src="<%=ctx%>/static/dist/img/8.png" alt=""/>
                        <span>我的钱包</span>
                    </a>
                </div>
                <div class="item">
                    <a href="/order">
                        <img src="<%=ctx%>/static/dist/img/9.png" alt=""/>
                        <span>我的订单</span>
                    </a>
                </div>
                <div class="item">
                    <a href="/user-detail">
                        <img src="<%=ctx%>/static/dist/img/10.png" alt=""/>
                        <span>个人信息</span>
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


<div class="hide" id="province-option">
    <div class="content">
        <div class="backdrop"></div>
        <div class="menu">
            <div class="province-option-list" id="province-option-list">
                <a class="province-item" data-href="http://zgkser.zhigaokao.cn/" domain="zj">浙江</a>
                <a class="province-item" data-href="http://zgkser.zhigaokao.cn/" domain="sn">陕西</a>
                <a class="province-item" data-href="http://zgkser.zhigaokao.cn/" domain="fj">福建</a>
                <a class="province-item" data-href="http://zgkser.zhigaokao.cn/" domain="gd">广东</a>
                <a class="province-item" data-href="http://zgkser.zhigaokao.cn/" domain="hb">湖北</a>
                <a class="province-item" data-href="http://zgkser.zhigaokao.cn/" domain="hn">湖南</a>
                <a class="province-item" data-href="http://zgkser.zhigaokao.cn/" domain="gx">广西</a>
                <a class="province-item" data-href="http://zgkser.zhigaokao.cn/" domain="ha">河南</a>
                <a class="province-item" data-href="http://zgkser.zhigaokao.cn/" domain="sd">山东</a>
                <a class="province-item" data-href="http://zgkser.zhigaokao.cn/" domain="he">河北</a>
                <a class="province-item" data-href="http://zgkser.zhigaokao.cn/" domain="sc">四川</a>
                <a class="province-item" data-href="http://zgkser.zhigaokao.cn/" domain="sh">上海</a>
                <a class="province-item" data-href="http://zgkser.zhigaokao.cn/" domain="cq">重庆</a>
                <a class="province-item" data-href="http://zgkser.zhigaokao.cn/" domain="jx">江西</a>
                <a class="province-item" data-href="http://zgkser.zhigaokao.cn/" domain="yn">云南</a>
                <a class="province-item" data-href="http://zgkser.zhigaokao.cn/" domain="bj">北京</a>
                <a class="province-item" data-href="http://zgkser.zhigaokao.cn/" domain="tj">天津</a>
                <a class="province-item" data-href="http://zgkser.zhigaokao.cn/" domain="hi">海南</a>
                <a class="province-item" data-href="http://zgkser.zhigaokao.cn/" domain="ah">安徽</a>
                <a class="province-item" data-href="http://zgkser.zhigaokao.cn/" domain="js">江苏</a>
                <a class="province-item" data-href="http://zgkser.zhigaokao.cn/" domain="jl">吉林</a>
                <a class="province-item" data-href="http://zgkser.zhigaokao.cn/" domain="ln">辽宁</a>
                <a class="province-item" data-href="http://zgkser.zhigaokao.cn/" domain="gs">甘肃</a>
                <a class="province-item" data-href="http://zgkser.zhigaokao.cn/" domain="sx">山西</a>
                <a class="province-item" data-href="http://zgkser.zhigaokao.cn/" domain="gz">贵州</a>
                <a class="province-item" data-href="http://zgkser.zhigaokao.cn/" domain="nx">宁夏</a>
                <a class="province-item" data-href="http://zgkser.zhigaokao.cn/" domain="xj">新疆</a>
                <a class="province-item" data-href="http://zgkser.zhigaokao.cn/" domain="hl">黑龙江</a>
            </div>
        </div>
    </div>
</div>


<script src="<%=ctx%>/static/dist/js/header.js"></script>