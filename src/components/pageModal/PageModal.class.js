export default {
  name: 'pageModal',

  props: {
    options: Object
  },

  data() {
    return {};
  },

  methods: {
    ok() {
      this.$emit('ok');
    },
    cancel() {
      this.$emit('cancel');
    },
    visibleChange() {
      this.$emit('visibleChange');
    }
  },

  render(h) {
    return (
      <div class="page-modal">
        <Modal
          ref="modal"
          value={this.options.show}
          width={this.options.width}
          styles={this.options.styles}
          class-name={this.options.className}
          title={this.options.title || '提示'}
          mask-closable={false}
          draggable={this.options.draggable}
          onOn-ok={this.ok}
          onOn-cancel={this.cancel}
          onOn-visible-change={this.visibleChange}
        >
          <div class="page-modal-body">
            {this.options.show && this.$slots.default}
            {this.$slots.custom}
          </div>
          <div slot="footer">
            {
              this.options.hasOwnProperty('footer') ?
                this.options.footer :
                <div><Button onClick={this.cancel}>
                  取消
                </Button>
                <Button type="primary" loading={this.options.btnLoading} onClick={this.ok}>
                  确定
                </Button></div>
            }
          </div>
        </Modal>
      </div>
    );
  }
};
