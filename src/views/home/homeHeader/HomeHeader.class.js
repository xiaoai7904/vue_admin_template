import Utils from '@/module/utils/Utils.module';
import { httpUrl } from '@/module/systemConfig/SystemConfig.module.js';
import PageResetPassword from '@/components/pageResetPassword/PageResetPassword.view.vue';

export default {
  name: 'HomeHeader', // 头部快捷菜单
  components: {PageResetPassword},
  data() {
    return {
      userInfo: {
        username: '',
        id: '',
        safeCode: '',
      },
      resetPasswordUrl: httpUrl.userResetpwd
    };
  },

  watch: {
    '$store.state.userInfo': {
      handler(newValue) {
        if (Object.keys(newValue).length) {
          this.userInfo = Object.assign({}, { username: newValue.userinfo.username, id: newValue.userinfo.id});
        }
      },
      deep: true,
      immediate: true
    }
  },

  mounted() {},

  beforeDestroy() {},

  destroyed() {},

  methods: {
    editPwd() {
      this.$refs.resetPasswordRef.open('self')
    },
    logout() {
      this.$Modal.confirm({
        title: '提示',
        content: '您确定要退出吗？',
        onOk: () => {
          this.$http.post(httpUrl.logout, {}).then(data => {
            this.$Notice.success({
              title: '提示',
              desc: '退出成功'
            });
            localStorage.removeItem('isLogin');
            this.$router.push('/login');
          });
        },
        onCancel: () => {}
      });
    }
  }
};
