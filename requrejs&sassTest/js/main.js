// congfig定义所需要包的别名，
// requirejs载入模块，数组引入需要的模块包，使用模块中的方法
requirejs.config({
    paths:{
        jquery: 'jquery.min'
    }
});

requirejs(['jquery','validate'], function($, validate){
    console.log(validate.isEqual(1, 1));
})
