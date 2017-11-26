// 以对象的方式来构造set
// 集合是元素不重复，不注重排序的一种数据结构
function Set(){
  let items= {};

  // 对象和数组可以通过in来直接查找值
  this.has =(value) => {
    return value in items;
    // return items.hasOwnPrototype(value); // 对象的特有写法
  }

  this.add = (value) => {
    if(!this.has(value)){ // 不重复就加入
      items[value] = value;
      return true;
    }
    return false;
  }

  this.remove = (value) => {
    if(this.has(value)){ // 有就删
      delete items[value];
      return true;
    }
    return false;
  }

  this.clear = () => {
    this.items = {};
  }

  this.size = () => {
    return Object.keys(items).length;
  }

  this.values = () => {
    return Object.keys(items)
    // 兼容写法
    // var keys = [];
    // for(var key in items){
    //   if(items.hasOwnProperty(key)){
    //     keys.push(key);
    //   }
    // }
    // return keys
  }

  // 并集
  // 利用Set已经拥有的不重复的
  this.union = (otherSet) => {
    let unionSet = new Set();
    let values = this.values();
    for(let i=0; i<values.length; i++){
      unionSet.add(values[i]);
    }
    values = otherSet.values();
    for(let i=0; i<values.length; i++){
      unionSet.add(values[i]);
    }
    return unionSet;
  }

  // 交集
  this.intersection = () => {
    
  } 
}