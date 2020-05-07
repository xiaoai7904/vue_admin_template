/**
 * 事件订阅，发布
 */
 class Observer {
  constructor (){
    this.eventsFiled = Symbol();
    this.event = {}
  }
  /**
   * 监听事件
   * @param {String | array} name 监听事件名称
   * @param {Function} fn 监听事件回调
   */
  on(name, fn, self = null) {
    if(typeof fn !== 'function'){
      return new Error('Parameter error,The second argument must be a function')
    }

    let eventObj = self || this.event;


    if (Array.isArray(name)) {
      let firstName = name.shift()
      eventObj[firstName] || (eventObj[firstName] = {})
      this.on(name.length == 0 ? firstName : name, fn, name.length == 0 ? eventObj : eventObj[firstName]);
    } else {
      if(eventObj[name] && eventObj[name][this.eventsFiled]){
        eventObj[name][this.eventsFiled].push(fn)
      }else{
        if (!eventObj[name]) {
          eventObj[name] = {}
        }

        eventObj[name][this.eventsFiled] = [];
        eventObj[name][this.eventsFiled].push(fn)
      }
    }
    return this
  }
  /**
   * 删除监听事件
   * @param {String} name 关闭监听事件名称
   */
  off(name, self = null) {
    let eventObj = self || this.event;

    if (Array.isArray(name)) {
      let firstName = name.shift()
      eventObj[firstName] || (eventObj[firstName] = {})
      this.off(name.length == 0 ? firstName : name,  name.length == 0 ? eventObj : eventObj[firstName]);
    } else {
      eventObj[name] = {};
    }

    return this
  }
  /**
   * 触发事件
   * @param {String | array} name 触发事件名称
   * @param {[]} arg 参数
   */
  trigger(name, arg, self = null) {
    let eventObj = self || this.event;

    if (Array.isArray(name)) {
      let firstName = name.shift()
      if (eventObj[firstName]) {
        this.trigger(name.length == 0 ? firstName : name, arg, name.length == 0 ? eventObj : eventObj[firstName]);
      }
    } else {
      if (eventObj[name]) {
        let eventKeys = Reflect.ownKeys(eventObj[name]);
        eventKeys.forEach(item => {
          if (item == this.eventsFiled) {
            let event = eventObj[name][item].slice()
            for(let i = 0, len = event.length; i < len; i++){
              if(typeof event[i] === 'function'){
                event[i].apply(null, [arg])
              }
            }
          } else {
            this.trigger(item, arg, eventObj[name]);
          }
        })
      }
    }
  }
}

Observer.of = function() {
  return new Observer();
};
export default Observer;
