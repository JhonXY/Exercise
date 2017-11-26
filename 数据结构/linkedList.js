function LinkedList(){
  function Node(ele){
    this.element = ele; // 元素本身
    this.next = null; // 元素后面的指针
  }
  let length = 0; // 链表自身长度
  let head = null; // 链表的表头

  // 添加到链表尾
  this.append = function(ele){
    let node = new Node(ele),
        current;

    if(head === null){
      head = node;
    } else {
      current = head;
      // 依照元素的next来做while循环，直到到达链表尾
      while(current.next){
        current = current.next;
      }
      current.next = node;
    }
    // 增长链表长度
    length++;
  }
  // 添加到链表指定位置
  // 这里只传一个参数会将undefined传入链表
  this.insert = function(position, ele){
    if(position > -1 && position < length){
      let node = new Node(ele),
          current = head,
          previous,
          index = 0
      if(position === 0){
        node.next = current;
        head = node;
      } else {
        while(index++ < position){
          previous = current;
          current = current.next;
        }
        node.next = current;
        previous.next = node;
      }
      length++;
      console.log(`添加成功`);
      return true;
    } else {
      console.log('====================================');
      console.log(`链表长${length},已经越界`);
      console.log('====================================');
      return false;
    }
  }
  // 从链表中移除一个元素
  this.remove = function(ele){
    let current = head,
        previous

    while (current) {
      if (current.next.element === ele) { // 捕获需移除的元素的前一个
        previous = current; // 设定为前一个
        current = current.next; // 当前需移除的
        previous.next = current.next // 重新连接链表
        console.log('====================================');
        console.log(`${current.element}已移除`);
        console.log('====================================');
        length--;
        return true;
      }
      current = current.next;
    }
    return '无此节点';
  }
  // 获取在链表中元素的位置
  this.indexOf = function(ele){
    let current = head,
        index = 0
    
    while(current){
      if(ele === current.element){
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  }
  // 移除链表指定位置元素
  this.removeAt = function(position){
    if(position > -1 && position < length){
      let current = head, // 从表头开始
          previous, 
          index = 0;

      if(position === 0){
        // 不能直接置空，因为链表后还有元素
        // 对链表做操作时应时刻注意不能让链表断开
        head = current.next; 
      } else {
        // 迭代链表直到达到需要访问处
        while(index++ < position){
          previous = current;
          current = current.next;
        }
        // 取到链表需要取出位置的前后来做拼接
        previous.next = current.next;
      }
      length--;
      return current.element;
    } else {
      console.log('====================================');
      console.log(`链表长${length},已经越界`);
      console.log('====================================');
      return null;
    }
  }
  this.isEmpty = function(){
    return length === 0;
  }
  this.size = function(){
    return length;
  }
  this.toString = function(){
    let current = head,
        string = ''
    
    while(current){
      string += ',' + current.element;
      current = current.next;
    }
    return string.slice(1);
  }
}