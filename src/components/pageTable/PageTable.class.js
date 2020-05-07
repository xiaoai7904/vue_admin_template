import Utils from '@/module/utils/Utils.module';
export default {
  name: 'PageTable',

  props: {
    options: {
      type: Object,
      default() {
        return {
          loading: false,
          border: false,
          requestList: null,
          pagination: {
            pageSize: 10,
            total: 0,
            page: 1
          },
          header: [],
          data: []
        };
      }
    }
  },

  watch: {
    'options.data': {
      handler(newValue) {
        this.handlerTableWidth(newValue);
      },
      deep: true
    }
  },

  data() {
    return {
      tableColumns: [],
      changePageSizeTemp: null, //改变每页数量时选择的数量
      tableHeigth: null, //设置表格高度
      tableID: Utils.of().uuid() //当前table id
    };
  },
  beforeMount() {
    this.$customEvent.off(['resize-table', this.tableID]).on(['resize-table', this.tableID], () => {
      this.tableHeigth = this.getTableHeight();
    });
  },
  mounted() {
    setTimeout(() => {
      this.$customEvent.trigger(['resize-table', this.tableID]);
    }, 400);
    this.filterHeader();
  },
  methods: {
    //计算表格高度
    getTableHeight() {
      let dom = document.querySelector('#table-id-' + this.tableID);
      if (dom) {
        let windowHeight = document.documentElement.clientHeight;
        let offsetTop = dom.getBoundingClientRect().top;
        let tableHeight = windowHeight - offsetTop - 45;
        return tableHeight >= 150 ? tableHeight : 150;
      } else {
      }
    },
    getPagination() {
      if (!this.options.pagination) {
        return {
          page: 1,
          pageSize: 20
        };
      }
      return {
        page: this.options.pagination.page,
        pageSize: this.options.pagination.pageSize
      };
    },
    filterHeader() {
      let newHeader = [];
      this.options.header.forEach(item => {
        if (item.hidden === undefined || (typeof item.hidden === 'boolean' && item.hidden !== true) || (typeof item.hidden === 'function' && !item.hidden())) {
          newHeader.push(item);
        }
      });
      this.tableColumns = newHeader.slice();
      return newHeader;
    },
    handlerTableWidth(data) {
      if (data.length) {
        let headerObj = {};
        let newHeader = this.tableColumns.slice();

        newHeader.forEach(headerItem => {
          data.map(item => {
            if(headerItem.key) {
              if (!headerObj[headerItem.key]) {
                headerObj[headerItem.key] = [];
              }
  
              let tableTitle = this.getStrLen(headerItem.title) * 2
              let tableData = item[headerItem.key] ? this.getStrLen(item[headerItem.key]) : 1
  
              let len = tableTitle > tableData ? tableTitle : tableData;
  
              headerObj[headerItem.key].push(len * 10);
            }
            
          });
          if (!headerItem.minWidth && !headerItem.wdith) {
            if (!headerObj[headerItem.key]) {
              headerItem.minWidth = 200;
            } else if(headerItem.render) {
              headerItem.minWidth = 150
            }else {
              headerItem.minWidth = Math.max(...headerObj[headerItem.key]);
            }
          }
        });
        this.tableColumns = newHeader.slice();
      }
    },
    getStrLen(str) {
      var realLength = 0;
      let charCode;
      for (var i = 0; i < str.toString().length; i++) {
        charCode = str.toString().charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) realLength += 1;
        else realLength += 2;
      }
      return realLength;
    }
  },

  render(h) {
    let { header = [], data = [], loading = false, pagination = null, requestList = null, border = false } = this.options;

    return (
      <div class="table-container" id={'table-id-' + this.tableID}>
        <Table
          stripe
          border={border}
          columns={this.tableColumns}
          data={data}
          loading={loading}
          height={this.tableHeigth}
          size="small"
          onOn-select={(selection, row) => this.$emit('select', selection, row)}
          onOn-select-cancel={(selection, row) => this.$emit('selectCancel', selection, row)}
          onOn-select-all={selection => this.$emit('selectAll', selection)}
          onOn-select-all-cancel={selection => this.$emit('selectAllCancel', selection)}
        >
          <div slot="footer" className="table-height">
            {pagination && (
              <Page
                class="table-footer-page"
                disabled={loading}
                total={pagination.total}
                size="small"
                show-elevator
                show-sizer
                show-total
                current={pagination.page}
                page-size={pagination.pageSize || 20}
                onOn-change={page => {
                  let $$tableOverflowY = document.querySelector('#table-id-' + this.tableID + ' .ivu-table-overflowY')
                  $$tableOverflowY && ($$tableOverflowY.scrollTop = 0)
                  if (requestList) {
                    let params = {
                      page: page,
                      pageSize: this.changePageSize || pagination.pageSize
                    };
                    requestList(params);
                    this.$emit('change-table-pagination', params);
                  }
                  this.changePageSize = null;
                }}
                onOn-page-size-change={pageSize => {
                  if (pagination.page === 1) {
                    if (requestList) {
                      let params = {
                        page: 1,
                        pageSize: pageSize
                      };
                      requestList(params);
                      this.$emit('change-table-pagination', params);
                    }
                  } else {
                    this.changePageSize = pageSize;
                  }
                }}
              />
            )}
          </div>
          <div slot="loading">
            <Spin fix>
              <Icon type="ios-loading" size="50" class="demo-spin-icon-load" />
              <div>
                <span>loading</span>
                <span class={'dot'}>...</span>
              </div>
            </Spin>
          </div>
        </Table>
      </div>
    );
  }
};
