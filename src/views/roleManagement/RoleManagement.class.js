import { httpUrl } from '@/module/systemConfig/SystemConfig.module';
import Rule from '@/module/rule/Rule.module';
import PageViewMixins from '@/mixins/PageViewMixins';

export default {
  name: 'roleManagement',

  mixins: [PageViewMixins],

  data() {
    const _this = this;
    return {
      isEdit:false,
      currnetPage: 1,
      pageTitleOptions: {
        name: ''
      },
      pageTableOptions: {
        loading: false,
        requestList: this.requestList,
        header: [
          {
            title: '名称',
            key: 'name',
            align: 'center'
          },
          {
            title: '描述',
            key: 'description',
            align: 'center'
          },
          {
            title: '操作',
            key: 'operates',
            align: 'center',
            render(h, { row }) {
              return <PageTableTool options={[{ id: 'del', name: '删除', permission: false, click: _this.handleDel.bind(_this, row) }, { id: 'edit', name: '编辑', permission: false, click: _this.handleEdit.bind(_this, row) }]} />;
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
      pageFormOptions: {
        modalForm: true,
        labelWidth: 100,
        config: [
          {
            id: 'name',
            type: 'input',
            name: '登入账号',
            options: {
              value: '',
              clearable: true
            }
          },
          {
            id: 'description',
            type: 'input',
            name: '描述',
            options: {
              value: '',
              clearable: true
            }
          },
          {
            id: 'seq',
            type: 'input',
            name: '排序值',
            options: {
              value: '',
              clearable: true
            }
          },
          {
            id: 'customMenu',
            type: 'customRender',
            name: '菜单&操作',
            customRender(h) {
              return <Tree ref="menuTreeRefs" data={_this.menuTreeData} show-checkbox onOn-toggle-expand={_this.expandFn} />;
            }
          },
          {
            id: 'customButton',
            type: 'customRender',
            name: '',
            customRender(h) {
              return (
                <div class="role-management-bts">
                  <Button type="primary" onClick={_this.submit} loading={_this.submitLoading}>
                    提交
                  </Button>
                  {/* <Button onClick={_this.reset}>重置</Button> */}
                </div>
              );
            }
          }
        ],
        rules: {
          name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
          description: [{ required: true, message: '请输入描述', trigger: 'blur' }],
          seq: [{ required: true, message: '请输入排序值', trigger: 'blur' }]
        }
      },
      menuTreeData: [],
      submitLoading: false,
      currentRow: {}
    };
  },

  mounted() {
    this.requestList({}, httpUrl.getRoleList);
  },

  methods: {
    add() {
      this.isEdit = false
      this.currnetPage = 2
      setTimeout(() => {
          this.$refs.pageFormRefs.resetData()
          this.requestMenuList()
      }, 0)
    },
    handleDel(row) {
      this.$Modal.confirm({
        title: '提示',
        content: `您确定要删除${row.name}数据吗?`,
        onOk: () => {
          this.$http.post(httpUrl.deleteRoleById, { ids: [row.id] }).then(data => {
            this.tips()
            this.requestList();
          });
        }
      });
    },
    handleEdit(row) {
      this.isEdit = true
      this.currnetPage = 2;
      this.currentRow = Object.assign({}, row);

      let oldConfig = this.pageFormOptions.config;

      oldConfig.forEach(item => {
        item.options && (item.options.value = row[item.id] + '');
      });

      this.pageFormOptions = Object.assign({}, this.pageFormOptions, { config: oldConfig });

      this.requestMenuList({id: row.id})
    },
    requestMenuList(params = {}) {
      this.$http.post(httpUrl.getRoleInfoById, params).then(data => {
          this.createMenuList(data.data.role)
      })
  },
    createMenuList(data) {
      const add = (addData, treeData) => {
        addData.forEach(item => {
          if (item.list && item.list.length) {
            let children = []
            add(item.list, children);

            treeData.push({
              id: item.id,
              title: item.name,
              parentId: item.parentId,
              children: children
            });
          } else {
            treeData.push({
              id: item.id,
              title: item.name,
              checked: item.checkStatus === 1,
              parentId: item.parentId
            });
          }
        });
      };

      let menuTreeData = [];
      add(data, menuTreeData);

      this.menuTreeData = [...menuTreeData];
    },
    expandFn(data) {
      if (data.parentId !== '0') {
        this.$nextTick(() => {
          let $$treePl = document.querySelector('.tree-pl-' + data.id);
          let $$parent = $$treePl && $$treePl.closest('.ivu-tree-children');
          $$parent && ($$parent.style.display = 'none');
        });
      }
    },
    submit() {
      const pageFormRefs = this.$refs.pageFormRefs;

      pageFormRefs.$refs.form.validate(valid => {
        if (valid) {
          this.submitLoading = true;

          const checkIds = pageFormRefs.$refs.menuTreeRefs
            .getCheckedNodes()
            .map(item => item.id)

          const indeterCheckIds = pageFormRefs.$refs.menuTreeRefs
            .getCheckedAndIndeterminateNodes()
            .map(item => item.id)

          pageFormRefs.model.seq = +pageFormRefs.model.seq;

          let params = Object.assign(this.isEdit ? { id: this.currentRow.id } : {}, pageFormRefs.model, {
            resourceIdList: [...new Set(indeterCheckIds, checkIds)]
          });

          this.$http
            .post(httpUrl.updateRole, params)
            .then(data => {
              this.tips()
              this.back();
              this.requestList();
            })
            .finally(() => {
              this.submitLoading = false;
            });
        }
      });
    },
    reset() {},
    back() {
      this.currnetPage = 1;
      this.currentRow = {};
    }
  }
};
