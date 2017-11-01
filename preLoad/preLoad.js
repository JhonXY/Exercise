(function (global, factory) {
  if (typeof define === 'function' && define.amd === 'object' && define.amd) {
    define([], factory);  // amd
  } else if (typeof module === 'object' && typeof module.exports === 'object' && module.exports) {
    module.exports = factory();  // cmd
  } else {
    global.preLoad = factory();  // 直接挂载
  }
})(typeof window !== 'undefined' ? window : this, 
function () {
  function preLoad(opts) {
    this.init(opts)
  }
  preLoad.prototype = {
    constructor: preLoad,
    init: function (opts) {
      this.source = opts.source || [];
      this.callback = opts.callback || null;
      this.debug = opts.debug || false;
      this.length = opts.source.length;
      this.errNum = 0;
      this.sucNum = 0;
      this.errNum = [];
      this.imgLoader();
    },
    imgLoader: function(){
      var img = [],
          _this = this,  // 用于回调函数中访问实例属性
          source = this.source,
          sucNum = this.sucNum
      this.asyncNum = 0;
      for(var i=0; i<this.length; i++){
        img[i] = new Image();
        img[i].src = source[i]
        var callback = (function(i, _this){
          return function(e){
            _this.sucNum++;
            _this.asyncNum++;
            if (_this.sucNum === _this.length) {
              if (typeof _this.callback === 'function') {
                _this.callback(e, i, _this);
              } else {
                console.log('Preloader Complete');
              }
            }
            _this.debug && _this.msglog();
          }
        })(i, _this)
        img[i].onload = callback
        img[i].onerror = function(){
          _this.errNum++;
          _this.asyncNum++;
          _this.errArr.push(this.src);
          //log打印
          _this.debug && _this.msglog();
        }
      }
      this.imgs = img
    },
    msglog: function(){
      if (this.asyncNum === this.length) {
        console.group('Preloader debug');
        console.time('加载时间');
        console.info('总数=' + this.length);
        console.info('成功数量=' + this.sucNum);
        console.warn('失败数量=' + this.errNum);
        if (this.errArr.length > 0) {
          console.warn('请求失败的图片数组');
          console.error(this.errArr);
        }
        console.timeEnd('加载时间');
        console.groupEnd();
      }
    }
  }
  return preLoad
})