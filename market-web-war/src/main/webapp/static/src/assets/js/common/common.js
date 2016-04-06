var domainStr = 'zgkser.zhigaokao.cn'; //正式
//var domainStr = 'test.zhigaokao.cn'; //测试
//var domainStr = 'm.zhigaokao.com:8084';

//获取域名前缀=============================
var urlDomain = window.location.hostname + '';
var urlArr = urlDomain.split('.');
var provinceKey = urlArr[0];

console.log(window.location.hostname);


var cookie = require('cookie');

var isLogin = function () {
    return cookie.getCookieValue('isLogin')
};
function ajaxFun(url, method, data, callback) {
    if (cookie.getCookieValue('token')) {
        data.token = cookie.getCookieValue('token');
    }
    data.userKey = cookie.getCookieValue('userKey');
    var strParameter = '';
    for (var i in data) {
        strParameter += "&" + i + "=" + data[i];
    }
    $.ajax({
        url: url,
        type: method,
        data: data || {},
        success: callback,
        error: callback
    });
};

function ajaxFunJSON(url, method, data, callback) {
    if (cookie.getCookieValue('token')) {
        data.token = cookie.getCookieValue('token');
    }
    data.userKey = provinceKey;
    console.log(JSON.stringify(data));
    $.ajax({
        url: url,
        type: method,
        contentType: 'application/json',
        dataType: 'json',
        data: JSON.stringify(data),
        success: callback,
        error: callback
    });
}


var getLinkey = function getLinkey(name) {
    var reg = new RegExp("(^|\\?|&)" + name + "=([^&]*)(\\s|&|$)", "i");
    if (reg.test(window.location.href)) return unescape(RegExp.$2.replace(/\+/g, " "));
    return "";
};


var tips = function tips(obj, txt) {
    $(obj).text(txt).fadeIn('1500');
    setTimeout(function () {
        $(obj).fadeOut('1500');
    }, 1000);
};



function drawToast(message) {
    var intervalCounter = null;
    var alert = document.getElementById("toast");
    if (!alert) {
        var toastHTML = '<div id="toast">' + message + '</div>';

        document.body.insertAdjacentHTML('beforeEnd', toastHTML);
    } else {
        alert.style.opacity = .9;
    }
    intervalCounter = setInterval(function () {
        var alert = $("#toast");
        alert.css('opacity', 0).remove();
        clearInterval(intervalCounter);
    }, 1000);
}


function layer(message, btns) {
    var alert = document.getElementById("toast");
    if (!alert) {
        var toastHTML = '<div id="toast">'
            + message;
        if (btns) {
            toastHTML += btns;
        }
        toastHTML += '</div>';
        document.body.insertAdjacentHTML('beforeEnd', toastHTML);
    } else {
        alert.style.opacity = .9;
    }
}


function confirmLayer(title,content) {
    var confirmLayer = [];
    confirmLayer.push('<div class="mask show">');
    confirmLayer.push('<div class="modal">');
    confirmLayer.push('<div class="modal-title">'+ title +'</div>');
    confirmLayer.push('<div class="modal-body">');
    confirmLayer.push(content);
    confirmLayer.push('</div>');
    confirmLayer.push('<div class="modal-footer">');
    confirmLayer.push('<button id="close-modal" type="button">取消</button>');
    confirmLayer.push('<button id="confirm-btn" type="button">确定</button>');
    confirmLayer.push('</div>');
    confirmLayer.push('</div>');
    confirmLayer.push('</div>');
    $('body').append(confirmLayer.join('')).on('click','#close-modal',function() {
        $('.mask').remove();
    });
}



exports.isLogin = isLogin;
exports.ajaxFun = ajaxFun;
exports.getLinkey = getLinkey;
exports.domain = domainStr;
exports.provinceKey = provinceKey;
exports.tips = tips;
exports.drawToast = drawToast;
exports.layer = layer;
exports.ajaxFunJSON = ajaxFunJSON;
exports.confirmLayer = confirmLayer;














