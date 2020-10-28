import { httpUrl, SysUserType} from '@/module/systemConfig/SystemConfig.module';
import _ from 'lodash';
import Rule from '@/module/rule/Rule.module';
import Utils from '@/module/utils/Utils.module';
import PageResetPassword from '@/components/pageResetPassword/PageResetPassword.view';
import PageViewMixins from '@/mixins/PageViewMixins';

export default {
  name: 'userManagement',
  components: {  PageResetPassword },
  mixins: [PageViewMixins],
  data() {
    const _this = this;
    return {
      isEdit: false,
      currentRow: {},
      roleList: [],
      pageTitleOptions: {
        name: ''
      },
      pageFormOptions: {
        inline: true,
        config: [
          {
            id: 'username',
            type: 'input',
            name: '账号',
            options: {
              value: ''
            }
          },

          {
            id: 'submit',
            type: 'button',
            name: '查询',
            options: {
              click: () => _this.pageFormSearchBtnCallback()
            }
          },
          {
            id: 'reset',
            type: 'button',
            name: '重置',
            options: {
              type: 'default',
              click: () => _this.pageFormResetBtnCallback()
            }
          }
        ]
      },
      pageTableOptions: {
        loading: false,
        requestList: this.requestList,
        header: [
          {
            title: '账号',
            key: 'username',
            align: 'center'
          },
          {
            title: '昵称',
            key: 'name',
            align: 'center'
          },
          {
            title: '操作',
            key: 'operates',
            align: 'center',
            render(h, { row }) {
              return (
                <PageTableTool
                  options={[
                    { name: '重置密码', permission: false, click: _this.handleResetPassword.bind(_this, row) },
                    { name: '编辑', permission: false, click: _this.handleEdit.bind(_this, row) }
                  ]}
                />
              );
            }
          }
        ],
        data: [],
        pagination: {
          pageSize: 20,
          total: 0,
          page: 1
        }
      },
      pageModalOptions: {
        show: false,
        btnLoading: false,
        title: '新增用户'
      },
      pageModalFormOptions: {
        modalForm: true,
        labelWidth: 80,
        config: [
          {
            id: 'username',
            type: 'input',
            name: '账号',
            options: {
              value: '',
              disabled: _this.isEdit,
            }
          },
          {
            id: 'name',
            type: 'input',
            name: '昵称',
            options: {
              value: '',
              disabled: false,
            }
          },
          {
            id: 'password',
            type: 'input',
            name: '密码',
            options: {
                type: 'password',
                value: '',
                disabled: false,
                hidden: () => _this.isEdit
            }
          },
          {
            id: 'roles',
            type: 'radio',
            name: '角色',
            options: {
              value: '',
              list: [],
              disabled: false,
            }
          },
          {
            id: 'remark',
            type: 'input',
            name: '备注',
            options: {
              value: ''
            }
          }
        ],
        rules: {
          username: [
            {
              required: true,
              message: '请输入账号',
              trigger: 'blur'
            },
            {
              validator: Rule.of().validate.userlength,
              trigger: 'blur'
            }
          ],
          name: [
            {
              required: true,
              message: '请输入昵称',
              trigger: 'blur'
            }
          ],
          password: [
            {
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              validator: Rule.of().validate.passwordlength,
              trigger: 'blur'
            }
          ],
          roles: [
            {
              required: true,
              message: '请选择角色类型',
              trigger: 'blur'
            }
          ]
        }
      }
    };
  },

  mounted() {
    this.requestList({}, httpUrl.getUserList);
    this.requestRoleList();
  },

  methods: {
    requestRoleList() {
      if (!this.roleList || this.roleList.length == 0) {
        this.$http.post(httpUrl.getRoleList, {}).then(({ data }) => {
          data.page.list.map(item => {
            var roleConfig = {
              id: item.id,
              name: item.name
            };
            this.roleList.push(roleConfig);
          });
        });
      }
    },
    addUser() {
      this.isEdit = false;
      this.pageModalFormOptions.config = this.getModelConfig();
      this.requestRoleList();
      this.pageModalOptions.show = true;
      setTimeout(() => {
          this.$refs.pageModalFormRefs && this.$refs.pageModalFormRefs.resetData();
      }, 100)

    },
    handleResetPassword(row) {
      this.currentRow = Object.assign({}, row);
      this.$refs.resetPasswordRef.open();
    },
    handleSelfCode(row) {
      this.currentRow = Object.assign({}, row);
    },
    handleDel(row) {
      this.$Modal.confirm({
        title: '提示',
        content: `您确定要删除${row.name}数据吗?`,
        onOk: () => {
          this.$http
            .post(httpUrl.deleteUser, { userIds: [row.id] })
            .then(data => {
              this.pageModalOptions.show = false;
              this.tips()
              this.requestList();
            })
            .finally(() => {
              this.pageModalOptions.btnLoading = false;
            });
        }
      });
    },
    handleEdit(row) {
      this.pageModalOptions.show = true;
      this.currentRow = Object.assign({}, row);
      this.isEdit = true;
      let oldConfig = this.getModelConfig();
      oldConfig.forEach(item => {
        if (item.id === 'roles') {
          item.options.value = row.rolesList+"";
        } else {
          item.options && (item.options.value = row[item.id]);
        }
      });

      this.pageModalFormOptions = Object.assign({}, this.pageModalFormOptions, { config: oldConfig });
    },
    okPageModal() {
      const pageModalFormRefs = this.$refs.pageModalFormRefs;
      pageModalFormRefs.$refs.form.validate(valid => {
        if (valid) {
          let params = pageModalFormRefs.getData();
          !this.isEdit && (params.password = Utils.of().md5(params.password));
          if(this.isEdit){
              params.id = this.currentRow.id;
          }
          params.rolesList = params.roles;
          delete params.roles;
          this.pageModalOptions.btnLoading = true;
          this.currentRow = {};

          this.$http
            .post(httpUrl.addUser, params)
            .then(data => {
              this.pageModalOptions.show = false;
              this.tips()
              this.requestList();
            })
            .finally(() => {
              this.pageModalOptions.btnLoading = false;
            });
        }
      });
    },
    cancelPageModal() {
      this.pageModalOptions.show = false;
      this.currentRow = {};
    },
    getModelConfig() {
      let oldconfig = this.pageModalFormOptions.config;
      oldconfig.forEach(item => {
        // if (['username', 'name', 'password', 'roles'].includes(item.id)) {
        //   item.options.disabled = this.isEdit;
        // }
        if (item.id == 'roles') {
          item.options.list = this.roleList;
        }
      })
      return oldconfig;
    }
  }
};
