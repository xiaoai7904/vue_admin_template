export default {
  name: 'pageTitle',

  props: {
    options: Object | String
  },

  data() {
    return {
      defaultTitle: ''
    };
  },

  mounted() {
    this.getCurrentRouterName();
  },

  methods: {
    getCurrentRouterName() {
      let _routers = this.$store.state.menuList;
      let eachFn = data => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].children && data[i].children.length) {
            eachFn(data[i].children);
          } else {
            if (this.$route.path === data[i].path) {
              this.defaultTitle = data[i].name;
              break;
            }
          }
        }
      };
      eachFn(_routers);
    }
  },
  render(h) {
    return (
      <div class="page-title-view-wrap">
        <div class="page-title-view-item">
          <h4 class="page-title-view-wrap-name">
            {this.options.name || this.defaultTitle}
            {this.options.render && this.options.render(h, this)}
            {(this.options.info || !this.options.render) && (
              <div class="page-title-view-wrap-content">
                <i class="el-icons-information" />
              </div>
            )}
          </h4>
          <div class="page-title-view-wrap-setting">{this.$slots.setting}</div>
        </div>
        {this.options.desRender && this.options.desRender(h, this)}
        {this.$slots.historyRecord && <div class="page-title-view-wrap-hostory">{this.$slots.historyRecord}</div>}
      </div>
    );
  }
};
