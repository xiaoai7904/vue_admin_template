// 提供全局页面公共方法
export default {
  data() {
    return {
      requestUrl: ''
    };
  },

  methods: {
    /**
     * 页面表单筛选搜索按钮回调
     */
    pageFormSearchBtnCallback() {
      return new Promise((resolve, reject) => {
        this.changeTablePagination({page: 1})
        this.requestList().finally(() => resolve());
      });
    },
    /**
     * 页面表单筛选重置按钮回调
     */
    pageFormResetBtnCallback() {
      return new Promise((resolve, reject) => {
        this.$refs.pageFormRefs.resetData();
        this.changeTablePagination({page: 1})
        this.requestList().finally(() => resolve());
      });
    },
    /**
     * 页面表格数据处理
     */
    createTableData(data) {
      try {
        if (this.beforCreateTableCallback) {
          this.beforCreateTableCallback(data);
        } else {
          this.pageTableOptions.data = [...data.list];
          this.pageTableOptions.pagination && (this.pageTableOptions.pagination.total = data.totalCount);
        }
        this.pageLoading(false);
      } catch (error) {
        this.pageTableOptions && (this.pageTableOptions.data = []);
        this.pageLoading(false);
      }
    },
    /**
     * 表格loading
     */
    pageLoading(data) {
      this.pageTableOptions && (this.pageTableOptions.loading = data);
    },
    /**
     * 请求表格数据接口
     */
    requestList(params = {}, url) {
      url && (this.requestUrl = url);
      return new Promise(resolve => {
        let searchParams = this.$refs.pageFormRefs ? _.pickBy(this.$refs.pageFormRefs.getData(), item => item !== '') : {};
        let paginationParams = this.pageTableOptions && this.pageTableOptions.pagination ? { page: this.pageTableOptions.pagination.page, pageSize: this.pageTableOptions.pagination.pageSize } : {};
        let extraParams = this.handlerExtraParams ? this.handlerExtraParams() : {}
        params = Object.assign({}, searchParams, paginationParams, params, extraParams);

        this.pageLoading(true);
        this.beforRequestCallback && this.beforRequestCallback();
        this.pageTableOptions && (this.pageTableOptions.data = []);
        this.$http
          .post(this.requestUrl, params)
          .then(({ data }) => {
            if (this.handlerTableData) {
              this.handlerTableData(data);
            } else {
              this.createTableData(data.page);
            }
            resolve();
          })
          .finally(() => {
            resolve();
            this.pageLoading(false);
          });
      });
    },
    /**
     * 添加数据
     */
    add() {
      this.$refs.pageModalFormRefs.resetData();
      this.pageModalOptions.show = true;
    },
    /**
     * 弹窗确定操作
     */
    okPageModal() {
      const pageModalFormRefs = this.$refs.pageModalFormRefs;
      pageModalFormRefs.$refs.form.validate(valid => {
        if (valid) {
          let modalData = pageModalFormRefs.getData();
          this.pageModalOptions.btnLoading = true;
          let params = this.handlerModalData ? this.handlerModalData(modalData) : modalData;
          this.$http
            .post(this.modalRequestUrl, params)
            .then(data => {
              this.pageModalOptions.show = false;
              this.tips('操作成功');
              this.okPageModalSuccess ? this.okPageModalSuccess() : this.requestList();
            })
            .finally(() => {
              this.pageModalOptions.btnLoading = false;
            });
        }
      });
    },
    /**
     * 弹窗取消操作
     */
    cancelPageModal() {
      this.pageModalOptions.show = false;
    },
    changeTablePagination(page) {
      this.pageTableOptions && this.pageTableOptions.pagination && (this.pageTableOptions.pagination = Object.assign({}, this.pageTableOptions.pagination, page));
    },
    tips(desc, type = 'success', title = '成功') {
      this.$Notice[type]({
        title: title,
        desc: desc
      });
    },
    modalConfirm(url, params = {}, content = '您确定要删除该条数据吗？') {
      let _this = this;
      this.$Modal.confirm({
        title: '提示',
        content: content,
        onOk() {
          _this.pageLoading(true);
          this.$http
            .post(url, params)
            .then(data => {
              if (data.data.code === 0) {
                _this.tips('删除成功');
                _this.requestList();
              }
            })
            .finally(() => {
              _this.pageLoading(false);
            });
        },
        onCancel() {}
      });
    }
  }
};
