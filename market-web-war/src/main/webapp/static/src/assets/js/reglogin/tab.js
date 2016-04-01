$('#header-title').text('注册');
$('.tab-list').on('click','.tab', function(){
    $(this).addClass('active').siblings().removeClass('active');
    var index = $(this).index();
    $('.tab-content').eq(index).removeClass('hidden');
})
