function DoubleLinkedList(){
  function Node (ele){
    this.element = ele;
    this.next = null;
    this.prev = null
  }
  let length = 0,
      head = null,
      tail = null;
  
  this.insert = function(ele){
    if(position >= 0&& position <= length){
      let node = new Node(ele),
          current = head,
          previous,
          index = 0;
      
      if(position === 0){
        if(!head){
          head = node;
          tail = node;
        } else {
          node.next = current;
          current.prev = node;
          head = node;
        }
      } else if (position === length) {
        current = tail;
        current.next = node;
        node.prev = current;
        tail = node;
      } else {
        while(index++ < position){
          previous = current;
          current = current.next;
        }
        node.next = current;
        previous.next = node;

        current.prev = node;
        node.prev = previous;
      }
      length++;
      return true;
    } else {
      return false;
    }
  }

}