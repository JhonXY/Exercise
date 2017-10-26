var wrap = document.getElementById('wrap')
var img = document.getElementById('avatorImg')
var bigger = document.getElementsByClassName('bigger')[0]
var smaller = document.getElementsByClassName('smaller')[0]
var reader = new FileReader()
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

function imgChanged() {
  natural= {
    width: img.naturalWidth,
    height: img.naturalHeight
  }
  if(natural.height >= natural.width){
    img.style.height = '100%'
    img.style.width = 'auto'
  } else {
    img.style.width = '100%'
    img.style.height = 'auto'
  }
  initial = {
    width: img.offsetWidth,
    height: img.offsetHeight
  }
}

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

function clearEvent (e) {
  e.preventDefault()
  wrap.removeEventListener('mousemove', dragging, false);
  wrap.removeEventListener('mouseup', clearEvent, false);
}
function dragging (e) {
  // if(!img.src) return;
  let moveX = img.offsetLeft + e.clientX - mouseStartX
  console.log('====================================');
  console.log(e.clientX);
  console.log(mouseStartX);
  console.log('====================================');
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
wrap.addEventListener('mousedown', (e) => {
  e.preventDefault()
  if(img.src) {
    mouseStartX = e.clientX
    mouseStartY = e.clientY
    wrap.addEventListener('mousemove', dragging, false)
    wrap.addEventListener('mouseup', clearEvent, false)
  }
})

wrap.addEventListener('drop', (e) => {
  e.preventDefault()
  var file = e.dataTransfer.files[0] // 获取传入文件中的第一个
  // var afile = e.target.files[0] // 获取传入文件中的第一个
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


