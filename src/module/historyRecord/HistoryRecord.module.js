let historyRecordIns = null;
/**
 * 操作记录存储器
 */
export default class HistoryRecord {
  constructor(options = { isUpdateLastData: true, sing: false }) {
    if (options.sing) {
      if (historyRecordIns) return this;
      historyRecordIns = this;
    }
    this.isUpdateLastData = options.isUpdateLastData;
    this.historyStack = [];
    return this;
  }
  /**
   * @description: 进栈
   * @param {Object} 当前进栈需要保存的数据信息
   * @return: HistoryRecord
   */
  pushStack(data, key) {
    if (!this.historyStack.length) {
      this.historyStack.push(data);
    } else {
      !this.updateStack(data, key) && this.historyStack.push(data);
    }
    return this;
  }
  /**
   * @description: 出栈
   * @param {String | Number} 下标
   * @return: HistoryRecord
   */
  popStack(index) {
    let [i, temp] = [-1, []];

    while (i < index) {
      i++;
      temp.push(this.historyStack[i]);
    }
    this.historyStack = temp.slice(0);
    return this;
  }
  /**
   * @description: 获取历史记录
   * @return: Array
   */
  getStack(key) {
    if (key) {
      return this.historyStack.map(item => item[key]);
    }
    return this.historyStack.slice(0);
  }
  /**
   * @description: 清除数据
   * @return: HistoryRecord
   */
  clearStack(data, key) {
    if (data && key) {
      this.historyStack = this.historyStack.filter(item => item[key] !== data);
      return this;
    }
    this.historyStack = [];
    return this;
  }
  updateStack(data, key) {
    if (this.isUpdateLastData) {
      // 更新上一次最后一个记录数据
      let lastData = this.historyStack[this.historyStack.length - 1];
      if (lastData[key] === data[key]) return true;
      for (let i in data) {
        if (i !== key) {
          lastData[i] = isObject(data[i]) ? Object.assign({}, data[i]) : data[i];
        }
      }
    }

    return this.historyStack.map(item => item[key]).indexOf(data[key]) > -1;
  }
}

function isObject(obj) {
  var type = typeof obj;
  return type === 'function' || (type === 'object' && !!obj);
}
