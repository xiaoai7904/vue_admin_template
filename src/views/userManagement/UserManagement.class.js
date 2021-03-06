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
            id: 'userName',
            type: 'input',
            name: '账号',
            options: {
              value: ''
            }
          },
          {
            id: 'roleId',
            type: 'select',
            name: '帐号类型',
            options: {
              value: '',
              list: [
                {
                  label: '全部',
                  value: ''
                }
              ]
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
            title: '用户名',
            key: 'userName',
            align: 'center'
          },
          {
            title: '账户类型',
            key: 'rolesList',
            align: 'center',
            render(h, { row }) {
              return row.rolesList && row.rolesList.split(',').map(item => SysUserType[item]);
            }
          },
          {
            title: '登入账号',
            key: 'name',
            align: 'center'
          },
          {
            title: '创建人',
            key: 'createUserName',
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
            id: 'userName',
            type: 'input',
            name: '用户名',
            options: {
              value: '',
              disabled: false,
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
          userName: [
            {
              required: true,
              message: '请输入用户名',
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
              message: '请输入登入帐号',
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
        this.$http.post(httpUrl.getRoleList, {groupDesk: 0}).then(({ data }) => {
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
      this.$refs.pageModalFormRefs && this.$refs.pageModalFormRefs.resetData();
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
          item.options.value = row.rolesList;
          item.options.list.forEach(listItem => (listItem.disabled = true));
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
          params.password = Utils.of().md5(params.password);
          params.roleIdList = [params.roles];
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
        if (['userName', 'name', 'password', 'roles'].includes(item.id)) {
          item.options.disabled = this.isEdit;
        }
        if (item.id == 'roles') {
          item.options.list = this.roleList;
        }
      })
      return oldconfig;
    }
  }
};
