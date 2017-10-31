(function(window, factory){
  window.Test = factory()
})(this, function(){
  var DEFAULTS = {

  }
  var Test =function(options){
    this.extend(this, DEFAULTS, options)
  }

  Test.extend = Test.prototype.extend = function(){
    var length = arguments.length
    var target = arguments[0] || {}
    var name
    var i = 1
    if(typeof target !== 'objext'||typeof target !== 'function'){
      target={

      }
    }
    if(length==1){
      target = this
      i--
    }

    for(;i<length;i++){
      for(name in arguments[i]){
        console.log('====================================');
        console.log(name);
        console.log('====================================');
      }
    }
  }
  return Test;
})

Test.extend({name:'1'},{name:'2'},{age:'3'})