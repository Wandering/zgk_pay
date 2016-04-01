var UI ={
    $tabContent:$('.tab-content')
};

$('#header-title').text('登录&注册');
$('.tab-list').on('click','.tab', function(){
    $(this).addClass('active').siblings().removeClass('active');
    var index = $(this).index();
    UI.$tabContent.removeClass('active').eq(index).addClass('active');
});
$('.tab-list .tab').eq(0).click();
