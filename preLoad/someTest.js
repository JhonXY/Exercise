(function (global, factory) {
  if (typeof define === 'function' && define.amd === 'object' && define.amd) {
    define([], factory);  // amd
  } else if (typeof module === 'object' && typeof module.exports === 'object' && module.exports) {
    module.exports = factory();  // cmd
  } else {
    global.preload = factory();  // 直接挂载
  }
})(typeof window !== 'undefined' ? window : this, function () {
  function preLoad(opts) {
    this.init(opts)
  }
  preLoad.prototype = {
    constructor: preLoad,
    init: (opts) => {
      var _this = this
      console.log('====================================');
      // 前面是直接调用preLoad.prototype.init()的结果，后面的是用prLoad new一个对象之后调用.init()的结果
      console.log(this);  // window | window
      console.log(_this);  // window | window
      console.log(preLoad);  //f preLoad() | f preLoad()
      console.log(preLoad.prototype);  // preLoad的原型对象 | preLoad的原型对象
      console.log('====================================');
    },
    init1: function (opts) {
      var _this = this
      console.log('====================================');
      console.log(this); // preLoad的原型对象 | preLoad{}函数对象
      console.log(_this); //  preLoad的原型对象 | preLoad{}函数对象
      console.log(preLoad); //f preLoad() | f preLoad()函数体
      console.log(preLoad.prototype); // preLoad的原型对象 | 依旧是原型对象
      console.log('====================================');
    }
  }
  return preLoad
})