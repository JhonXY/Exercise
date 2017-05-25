// 利用define创建模块，先数组引入需要的包，然后写方法用return将方法暴露出来
define(['jquery'], function($){
    return{
        isEqual: function(str1, str2){
            return str1 === str2;
        }
    }
})
