function throttleTest(fn, delay, atleast) {
  var timer = null,
    startTime = new Date();
  return function () {
    var curTime = new Date();
    clearTimeout(timer);
    if (curTime - startTime >= atleast) {
      fn();
      startTime = curTime;
    } else {
      timer = setTimeout(fn, delay)
    }
  }
}

function throttle(fn, mustRun = 500) {
  const timer = null;
  let previous = null;
  return function () {
    const now = new Date();
    const context = this;
    const args = arguments;
    if (!previous) {
      previous = now;
    }
    const remaining = now - previous;
    if (mustRun && remaining >= mustRun) {
      fn.apply(context, args);
      previous = now;
    }
  }
}

function isInSightTest(el) {
  var bound = el.getBoundingClietRect() // 兼容性存在问题(实时的元素相对视口的一些数据)
  return bound.top <= window.innerHeight +100
}

function isInSight(el) {
  var imgTop = el.offsetTop
  var viewHeight = document.documentElement.clientHeight || window.innerHeight; // 可视区域高度
  var scrollTop = document.documentElement.scrollTop; // 滚动条滚动距离
  return imgTop <= viewHeight + scrollTop + 100; // 设置一些余量以便提前加载  
}

function lazyLoad() {
  var imgs = document.getElementsByTagName('img'),
    index = 0;
  return function () {
    for (var i = index; i < imgs.length; i++) {
      // if (imgs[i].getAttribute('src') != 'load.gif') return
      if (isInSight(imgs[i])) {
        imgs[i].src = imgs[i].getAttribute('data-src') 
        // imgs[i].src = imgs[i].dataset.src // 这样也可以，但是会迷之慢很多
        index =i
      }
    }
  }
}
window.onload = lazyLoad()
// window.onscroll = throttle(lazyLoad())
window.addEventListener('scroll', throttle(lazyLoad()), false)

