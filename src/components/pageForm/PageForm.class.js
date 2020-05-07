import classnames from 'classnames';
import Utils from '@/module/utils/Utils.module.js';
import { buildFormItem } from '@/components/pageForm/PageFormItem.build.js';
import collapseTransition from '@/components/collapseTransition/CollapseTransition.view.vue';
import PageEditorView from '@/components/pageEditorView/pageEditorView';

export default {
  name: 'PageForm',

  components: { collapseTransition, PageEditorView },

  props: {
    options: {
      type: Object,
      default() {
        return {
          loading: false,
          config: []
        };
      }
    }
  },

  data() {
    return {
      model: {},
      btnLoading: {},
      defaultShow: [],
      defaultHidden: [],
      isFold: false
    };
  },

  watch: {
    'options.config': {
      handler(newValue) {
        newValue.map(item => {
          if(item.options && item.type !== 'customRender') {
            if(item.options.hidden) {
              typeof item.options.hidden === 'function' && !item.options.hidden(this) && this.$set(this.model, item.id, item.options.value)
            }else {
              this.$set(this.model, item.id, item.options.value)
            }
          }
          item.type === 'button' && this.$set(this.btnLoading, item.id, false);
        });
      },
      immediate: true
    }
  },

  methods: {
    getData() {
      if (this.model && this.model.date) {
        if (this.options.handlerDate) {
          this.model = Object.assign({}, this.model, this.options.handlerDate(this.model.date));
        } else {
          this.model = Object.assign({}, this.model, { startDate: this.model.date[0], endDate: this.model.date[1] });
        }
      }
      let copyModel = Object.assign({}, this.model)

      for(let i in copyModel) {
        // 处理下拉框默认选中全部(value为all)的情况
        if(copyModel[i] === 'all') {
          copyModel[i] = ''
        }
      }
      return copyModel
    },
    resetData(keys = []) {
      for (let i in this.model) {
        if (keys.indexOf(i) < 0) {
          this.$set(this.model, i, Utils.of().types(this.model[i]) === '[object Array]' ? [] : '');
        }
      }
      return this;
    },
    setData(Data = {}) {
      for (let i in Data) {
          this.$set(this.model, i, Data[i]);
      }
      return this;
    },
    delData(key) {
      if (this.model[key]) {
        delete this.model[key];
      }
    },
    search() {
      let submit = this.options.config.find(item => item.id === 'submit');
      if (submit && submit.options.click && typeof submit.options.click === 'function') {
        submit.options.click();
      }
    },
    expand() {
      this.isFold = !this.isFold;
    },
    createData() {
      let count = 0;
      let tempData = [];
      this.defaultShow = [];
      this.defaultHidden = [];

      let isHiddenFn = item => {
        return item.options && item.options.hidden && typeof item.options.hidden === 'function' && item.options.hidden(this);
      };

      this.options.config.map(item => {
        if (item.id !== 'submit' && item.id !== 'reset') {
          if (!isHiddenFn(item)) {
            count < 5 ? this.defaultShow.push(item) : this.defaultHidden.push(item);
            count++;
          }
        } else if (item.id === 'submit' || item.id === 'reset') {
          tempData.push(item);
        }
      });

      this.defaultShow = [].concat(this.defaultShow, tempData);
    },
    createFormItem(h) {
      const _this = this;

      if (this.options.modalForm) {
        return this.options.config.map(item => {
          const isButton = item.type === 'button';
          const formItemClassname = classnames({ 'page-form-btn': isButton });

          if (item.options && item.options.hidden && item.options.hidden()) {
            return null;
          }

          return (
            <FormItem prop={item.id} label={isButton ? '' : item.name} class={formItemClassname} rules={this.options.formItemRules ? this.options.formItemRules : null}>
              {buildFormItem(h, item, _this)}
              {item.tips && (typeof item.tips === 'function' ? item.tips(h) : item.tips)}
            </FormItem>
          );
        });
      }
      return (
        <div class="page-form-show--wrap">
          <pageScrollbar customClassName="page-form--scrollbar" options={{ scrollY: false }}>
            <div class="page-form-show--container">
              {this.defaultShow.map((item, index) => {
                const isButton = item.type === 'button';
                const formItemClassname = classnames({
                  'page-form-btn': isButton
                });

                return (
                  <FormItem prop={item.id} label={isButton ? '' : item.name} class={formItemClassname}>
                    {buildFormItem(h, item, _this)}
                  </FormItem>
                );
              })}
              {this.defaultHidden.length > 0 && (
                <div class="page-form-expand" onClick={this.expand}>
                  <Icon
                    type="ios-arrow-down"
                    class={classnames({
                      'page-form-expand--icon1': true,
                      'page-form-expand--icon2': this.isFold
                    })}
                  />
                  <span>展开更多筛选</span>
                </div>
              )}
            </div>
          </pageScrollbar>
          <div class="page-form-expand--child">
            <collapseTransition>
              {this.isFold && (
                <div class="ivu-poptip-popper" x-placement="bottom">
                  <div class="ivu-poptip-content">
                    <div class="ivu-poptip-arrow" />
                    <div class="ivu-poptip-inner">
                      <div class="ivu-poptip-body-content-inner">
                        {this.defaultHidden.map(item => {
                          const isButton = item.type === 'button';
                          const formItemClassname = classnames({
                            'page-form-btn': isButton
                          });

                          return (
                            <FormItem prop={item.id} label={isButton ? '' : item.name} class={formItemClassname}>
                              {buildFormItem(h, item, _this)}
                            </FormItem>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </collapseTransition>
          </div>
        </div>
      );
    }
  },

  mounted() {
    this.createData();
  },

  render(h) {
    return (
      <div
        class={classnames({
          'page-form': true,
          'page-form-inline': this.options.inline
        })}
      >
        <Form ref="form" props={{ model: this.model }} rules={this.options.rules} inline={this.options.inline} label-width={this.options.labelWidth || 60}>
          {this.createFormItem(h)}
          <FormItem>
            <Input v-show={false} />
          </FormItem>
        </Form>
      </div>
    );
  }
};
