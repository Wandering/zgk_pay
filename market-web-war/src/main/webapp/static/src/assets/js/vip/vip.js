(function () {
    var cookie = require('cookie');
    var account = cookie.getCookieValue('tel');
    $('#account-number').val(account);
    $('.vip-btn').click(function () {
        var cardNum = $.trim($('#card-number').val());

    });


});