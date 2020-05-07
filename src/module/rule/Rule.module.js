import ruleConfig from './Rule.config';
let instance = null;
/**
 * 校验规则类
 */
class Rule {
  constructor() {
    if (!instance) {
      this.rules = {};
      this.validate = {};
      ruleConfig.forEach(item => {
        this.setRule(item.name, item.reg, item.desc);
        this.createValidate(item.name, item.flag);
      });
      instance = this;
    }
    return instance;
  }
  /**
   * 添加校验规则
   * @param {String} name 规则名称
   * @param {RegExp} reg 规则对应的正则表达式
   * @param {String} desc 规则描述
   */
  setRule(name, reg, desc) {
    if (!this.rules[name]) {
      this.rules[name] = {
        reg: reg,
        desc: desc
      };
    }
    return this;
  }
  /**
   * 获取校验规则
   * @param {String} name 规则名称
   */
  getRule(name) {
    if (this.rules[name]) {
      return this.rules[name];
    }
    return this.rules;
  }
  /**
   * 获取字符串字节长度
   */
  getStrLen(str) {
    var realLength = 0;
    let charCode;
    for (var i = 0; i < str.length; i++) {
      charCode = str.charCodeAt(i);
      if (charCode >= 0 && charCode <= 128) realLength += 1;
      else realLength += 2;
    }
    return realLength;
  }
  /**
   * 执行校验规则
   * @param {String} name 规则名称
   * @param {String} value 要校验的字符串
   * @param {Boolean} flag 是否取反（true => 取反）
   */
  test(name, value, flag) {
    let rules = null;
    if (!name) {
      return {
        check: false,
        desc: new Error('检验项为空')
      };
    }
    if (this.getRule(name)) {
      rules = this.getRule(name);
    }
    if (name == 'maxLength') {
      let val = value == undefined ? '' : value.toString();
      return {
        check: this.getStrLen(val) > rules.reg ? false : true,
        desc: new Error(rules.desc)
      };
    } else {
      if (rules.reg.test(value)) {
        if (flag) {
          return {
            check: false,
            desc: new Error(rules.desc)
          };
        }
        return {
          check: true
        };
      }
    }
    if (flag) {
      return {
        check: true
      };
    }
    return {
      check: false,
      desc: new Error(rules.desc)
    };
  }
  /**
   * 构造检验函数防止在每个页面都有写这段代码
   * @param {String} name 规则名称
   * @param {Boolean} flag 是否取反（true => 取反）
   */
  createValidate(name, flag) {
    let _this = this;
    !_this.validate[name] &&
      (_this.validate[name] = (rule, value, cb) => {
        let r = _this.test(name, value, flag);
        if (r.check) {
          cb();
        } else {
          cb(r.desc);
        }
      });
  }
}

Rule.of = function() {
  return new Rule();
};

export default Rule;
