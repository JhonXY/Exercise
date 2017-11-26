// 优先队列
function Queue (){
  let items = [];
  // 优先队列的元素构造
  function QueueElement(ele, priority){
    this.ele = ele; // 元素本身
    this.priority = priority; // 元素优先值
  }

  this.enqueue = function(ele, priority){
    let item = new QueueElement(ele, priority);

    if(this.isEmpty()){
      items.push(item);
    } else {
      let added = false; // 判断是否已经被添加
      for(let i = 0; i<items.length; i++){
        // 只要排入队中，循环就应该结束了，break跳出
        // 队列中谁优先级高谁就在前，能够先出
        if(item.priority > items[i].priority){
          items.splice(i, 0, item);
          added = true; 
          break;
        }
      }
      if (!added) {
        items.push(item);
      }
    }
  }

  this.dequeue = function(){
    let out = items.shift();
    return out ? out : '队列已空';
  }
  this.front = function(){
    return items[0];
  }
  this.isEmpty = function(){
    return items.length>0 ? false : true;
  }
  this.clear = function(){
    items = [];
  }
  this.size = function(){
    return items.length
  }
  this.print = function () {
    items.length > 0 
      ? console.log(items.toString()) 
      : console.log('空队列')
  }
}