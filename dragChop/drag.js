var wrap = document.getElementById('wrap') // 裁剪区域
var inner = document.getElementById('inner')  // 裁剪块
inner.width = parseInt(getComputedStyle(inner, null).width.slice(0, -2)) // 获取外联样式
inner.height = parseInt(getComputedStyle(inner, null).height.slice(0, -2))
var img = document.getElementById('avatorImg')  // 生成的图片
var bigger = document.getElementsByClassName('bigger')[0]  // 放大按钮
var smaller = document.getElementsByClassName('smaller')[0]  // 缩小按钮
var chop = document.getElementsByClassName('chop')[0]  // 裁剪按钮
var reader = new FileReader()  // 读取文件
var initial = {
  width: 0,
  height: 0
}
var natural = {
  width: 0,
  height: 0
}
var mouseStartX = 0;
var mouseStartY = 0;
var resizeValue = 0;

// 选择图片触发函数
function imgInput(e) {
  // 普通的触发事件，对象是Event，从target中读取文件
  var file = e.target.files[0]; 
  console.log('====================================');
  console.log(e);
  console.log('====================================');
  if (!file.type.match('image.*')) {
    alert('不是图片');
    return
  }
  reader.onload = function (e) {
    img.src = e.target.result;
  }
  reader.readAsDataURL(file);
}

// 图片上传改变触发函数
function imgChanged() {
  natural= {
    width: img.naturalWidth,
    height: img.naturalHeight
  }
  img.style.left = '175px'
  img.style.top = '75px'
  if(natural.height >= natural.width){
    if (natural.width < inner.width) {
      img.style.width = inner.width + 'px'
      img.style.height = 'auto'
    } else {
      img.style.height = '100%'
      img.style.width = 'auto'
    }
  } else { 
    if (natural.height < inner.height) {
      img.style.height = inner.height + 'px'
      img.style.width = 'auto'
    } else {
      img.style.width = '100%'
      img.style.height = 'auto'
    }
  }
  initial = {
    width: img.offsetWidth,
    height: img.offsetHeight
  }
}

// 缩放回调
function resize() {
  img.style.width = (resizeValue + 100) / 100 * initial.width + 'px'
  img.style.height = (resizeValue + 100) / 100 * initial.height + 'px'
}

bigger.addEventListener('click', (e) => {
  // if (resizeValue <= 0) return;
  resizeValue += 10
  resize()
}, false)

smaller.addEventListener('click', (e) => {
  resizeValue -= 10
  resize()
}, false)

// 清除事件
function clearEvent (e) {
  e.preventDefault()
  wrap.removeEventListener('mousemove', dragging, false);
  wrap.removeEventListener('mouseup', clearEvent, false);
}

// 拖动图片回调
function dragging (e) {
  // if(!img.src) return;
  let moveX = img.offsetLeft + e.clientX - mouseStartX
  // border - bottom: 75 px;
  // border - left: 175 px;
  // width: 150 px;
  // height: 150 px;
  if (moveX >= 175) {
    img.style.left = '175px'
    mouseStartX = e.clientX
    return
  } else if (moveX <= 325 - img.offsetWidth) {
    moveX = 325 - img.offsetWidth
  }
  img.style.left = moveX + 'px'
  mouseStartX = e.clientX

  let moveY = img.offsetTop + e.clientY - mouseStartY
  if(moveY >= 75) {
    img.style.top = '75px'
    mouseStartY = e.clientY
    return
  } else if (moveY <= 225 - img.offsetHeight) {
    moveY = 225 - img.offsetHeight
  }
  img.style.top = moveY + 'px'
  mouseStartY = e.clientY
}
// mousedown触发图片拖动开始
wrap.addEventListener('mousedown', (e) => {
  e.preventDefault()
  if(img.src) {
    mouseStartX = e.clientX
    mouseStartY = e.clientY
    wrap.addEventListener('mousemove', dragging, false)
    wrap.addEventListener('mouseup', clearEvent, false)
  }
})

// 拖拽实现文件上传
wrap.addEventListener('drop', (e) => {
  e.preventDefault()
  // 这里的事件对象是叫DragEvent，从其中的dataTransfer读取文件
  var file = e.dataTransfer.files[0] // 获取传入文件中的第一个
  console.log('====================================');
  console.log(e);
  console.log('====================================');
  if (!file.type.match('image.*')) {
    alert('不是图片');
    return
  }
  reader.onload = function (e) {
    img.src = this.result
  }
  reader.readAsDataURL(file) // 读取文件
}, false)

wrap.addEventListener('dragover', (e) => {
  e.preventDefault()
}, false)

// 裁剪回调
function chopAction () {
  if(!img.src) alert('无图片')
  let _canvas = document.createElement('canvas')
  let _side = (inner.width / img.offsetWidth) * natural.width
  _canvas.width = inner.width
  _canvas.height = inner.height
  let _sy = (75 - img.offsetTop) / img.offsetHeight * natural.height;
  let _sx = (175 - img.offsetLeft) / img.offsetWidth * natural.width;
  _canvas.getContext('2d').drawImage(img, _sx, _sy, _side, _side, 0, 0, inner.width, inner.height)
  let _lastData = _canvas.toDataURL('image/png')
  var imageShow = document.getElementById('showImg')
  imageShow.src = _lastData;
  imageShow.style.width = inner.width + 'px';
  imageShow.style.height = inner.height + 'px';
}

chop.addEventListener('click', chopAction, false)

