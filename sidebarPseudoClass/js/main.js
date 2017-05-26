requirejs.config({
    paths: {
        jquery: 'jquery.min'
    }
});

// requirejs(['jquery'], function($){
// 模块都是在一个数组里的，多个数组的话会被忽略
requirejs(['jquery', 'scrollto'], function($, scrollto){
    // 实例化以使用该模块
    var scroll = new scrollto.ScrollTo({
        // 用户传参处
        dest: 100,
        // 使其变慢
        speed: 2000
    });
    // 事件处理函数，指向对象是#backTop而我们需要它指向实例对象
    // 所以这里使用了this的重定向
    // $('#backTop').on('click', scroll.move);
    $('#backTop').on('click', $.proxy(scroll.move, scroll));
})
/*
    $(window).on('scroll', function(){
        checkPosition($(window).height());
    });

    // 加载时即判断是否在需要显示的时候
    checkPosition($(window).height());

    // 有延迟动画的效果
    function move(){
        $('html, body').animate({
            scrollTop: 0
        },800);
    }

    // 没有延迟动画的效果
    function go(){
        $('html, body').scrollTop(0);
    }

    function checkPosition(pos){
        if($(window).scrollTop() > pos){
            $('#backTop').fadeIn();
        }else{
            $('#backTop').fadeOut();
        }
    }
});
*/
