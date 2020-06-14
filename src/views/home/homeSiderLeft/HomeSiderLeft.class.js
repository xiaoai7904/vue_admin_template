export default {
  name: 'homeSiderLeft',

  components: {},

  data() {
    return {
      menuList: [],
      checkMenu: ''
    };
  },

  watch: {
    '$store.state.menuList': {
      handler(newValue) {
        if (!this.menuList.length) {
          this.menuList = newValue.slice(0);
          if (newValue[0].children) {
            if (this.$router.currentRoute.path === '/') {
              this.checkMenu = newValue[0].children[0].path;
              this.$router.push(newValue[0].children[0].path);
            } else {
              this.checkMenu = this.$router.currentRoute.path;
            }
          }
          this.openMenus = newValue.map(item => item.name)
          this.openChange()
        }
      },
      immediate: true
    },
    $route() {
      this.checkMenu = this.$router.currentRoute.path;
    }
  },

  mounted() {},

  methods: {
    openChange() {
      setTimeout(() => {
        this.$refs.homeLeftScrollbar && this.$refs.homeLeftScrollbar.update();
      }, 500);
    }
  },

  render(h) {
    return (
      <div class="home-left">
        <pageScrollbar ref="homeLeftScrollbar" options={{ scrollX: false }} customClassName="home-left--scrollbar">
          <Row>
            <Col span="8">
              <Menu theme="dark" width="200px" onOn-open-change={this.openChange} active-name={this.checkMenu} open-names={this.openMenus}>
                {this.menuList.map(item => {
                  if (item.children && item.children.length === 1) {
                    return (
                      <MenuItem name={item.children[0].path} to={item.children[0].path}>
                        {item.children[0].name}
                      </MenuItem>
                    );
                  }
                  return (
                    <Submenu name={item.name}>
                      <template slot="title">
                        {/* <Icon type="ios-paper" /> */}
                        {item.name}
                      </template>
                      {item.children.map(childrenItem => {
                        return (
                          <MenuItem name={childrenItem.path} to={childrenItem.path}>
                            {childrenItem.name}
                          </MenuItem>
                        );
                      })}
                    </Submenu>
                  );
                })}
              </Menu>
            </Col>
          </Row>
        </pageScrollbar>
      </div>
    );
  }
};
