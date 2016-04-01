$('#header-title').text('注册');
$('.tab-list .tab').on('click', function(){
    $('.tab-list .tab').removeClass('active');
    $(this).addClass('active');
    $('form').addClass('hidden');
    $('form').eq($(this).index()).removeClass('hidden');
})
