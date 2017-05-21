// 图片预加载
// 闭包模拟局部作用域
// 这里是jquery的闭包
(function($){
    // 构造函数
    function PreLoad(imgs, options){
        // imgs如果是一个字符串，将其包成一个数组，否则直接返回这个数组
        this.imgs = (typeof img === 'string') ? [imgs] : imgs;
        // 传递了变量就使用传递的，否则使用默认的
        this.opts = $.extend({}, PreLoad.DEFAULTS, options);

        this._unoredered();
    }

    // 默认参数
    PreLoad.DEFAULTS = {
        each: null, //每张图片加载后执行
        all: null  //所有图片加载后执行
    };

    // 原型化面向对象实例化
    PreLoad.prototype._unoredered = function(){ // 无序加载
        var imgs = this.imgs,
            opts = this.opts,
            count = 0,
            len = imgs.length;


        $.each(imgs,function(i, src) {
            if(typeof src != 'string') return;

            var imgObj = new Image();

            $(imgObj).on('load error', function(){
                // 如果存在each则去执行它
                opts.each && opts.each(count);

                if(count >= len - 1){
                    // 如果存在all则去执行它
                    opts.all && opts.all();
                }

                count++;
            })
            imgObj.src = src;
        });
    };

    // 附在一个元素上的方法$.fn,extend -> $('#img').preload();

    // 这种是直接附在jQurey对象上的，一个工具函数
    $.extend({
        preload: function(imgs, opts){
            // 实例化刚才构造的对象
            new PreLoad(imgs, opts);
        }
    })

})(jQuery);
