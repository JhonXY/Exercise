var wrap = document.getElementById('wrap')
var items = document.getElementsByClassName('banner');
var dots = document.getElementsByTagName('span');
var prevBtn = document.getElementsByClassName('prev')[0];
var nextBtn = document.getElementsByClassName('next')[0];
var on = document.getElementsByClassName('on')[0];

var num = 0;

[].forEach.call(dots, (item, index) => {
  item.onclick = function () {
    item.className = 'on'
    items[index].style.opacity = '1'
  }
  item.className = ''
  items[index].style.opacity = '0'
})

items[0].style.opacity = '1';
dots[0].className = 'on';

prevBtn.onclick = function () {
  for (var j = 0; j < dots.length; j++) {
    if (dots[j].className == "on") {
      dots[j].className = "";
      items[j].style.opacity = "0";
      j--;
      num--;
      if (j < 0) {
        j = 4;
      }
      dots[j].className = "on";
      items[j].style.opacity = "1";
    }
  }
} 

nextBtn.onclick = function () {
  for (var j = 0; j < dots.length; j++) {
    if (dots[j].className == "on") {
      dots[j].className = "";
      items[j].style.opacity = "0";
      j++;
      num++;
      if (j > 4) {
        j = 0;
      }
      dots[j].className = "on";
      items[j].style.opacity = "1";
    }
  }
}

var time = function () {
  num ++
  if (num < 5) {
    [].forEach.call(dots, (item, index) => {
      item.className = ''
      items[index].style.opacity = '0'
    })
    dots[num].className = 'on'
    items[num].style.opacity = '1'
  } else {
    num =- 1
  }
}

console.log('====================================');
console.log(timer);
console.log('====================================');

clearInterval(timer)

var timer = setInterval('time()', 2000)

wrap.onmouseover = function () {/*鼠标引入，清除定时器，轮播图停止*/
  clearInterval(timer);
};

wrap.onmouseout = function () {/*鼠标移出，重新调用定时器，轮播图开始*/
  clearInterval(timer);
  timer = setInterval("time()", 2000);
};






