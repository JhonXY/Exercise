define(['jquery'], function($){
    function ScrollTo(opts){
        // 生成一个空对象，传入默认值，还有用户输入的值
        // 用户没有输入值则使用默认的值
        // 返回的值通过属性保存
        this.opts = $.extend({}, ScrollTo.DEFAULTS, opts);
        // 优化性能，将选择器缓存到属性中，只存储一次
        this.$el = $('html, body');
    }
    // 将所有的方法都添加在构造元素的原型上，这样内存中就只会保存一份所有的方法
    ScrollTo.prototype.move = function(){
        // 将this.opts转化成局部变量，优化性能
        var opts = this.opts,
            dest = opts.dest;

        // 不在目的地却不在运动时才能执行
        if($(window).scrollTop() != dest){
            if(!this.$el.is(':animated')){
                this.$el.animate({
                    scrollTop: dest
                }, opts.speed);
            }
        }
    };

    ScrollTo.prototype.go = function(){
        var dest = this.opts.dest
        if($(window).scrollTop() != dest){
            this.$el.scrollTop(dest);
        }
    }

    ScrollTo.DEFAULTS = {
        dest: 0,
        speed: 800
    };

    return {
        ScrollTo: ScrollTo
    }
})
