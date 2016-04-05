(function() {
    // 打开主菜单
    $('#header-menu').on('click',function(){
        $('#menu-header').hide();
        $('#end-login').show();
    });
    // 关闭主菜单
    $('#header-close').on('click',function(){
        $('#menu-header').show();
        $('#end-login').hide();
    });
    // 退出
    $().on('click',function(){

    });



})();
