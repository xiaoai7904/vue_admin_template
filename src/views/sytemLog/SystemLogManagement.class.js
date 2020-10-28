import { httpUrl,SysUserType } from '@/module/systemConfig/SystemConfig.module';
import _ from 'lodash';
import Rule from '@/module/rule/Rule.module';
import Utils from '@/module/utils/Utils.module';
import PageViewMixins from '@/mixins/PageViewMixins';

export default {
  name: 'systemLogManagement',

  mixins: [PageViewMixins],

  data() {
    const _this = this;
    return {
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
              title: '请求类',
              key: 'className',
              align: 'center',
              tooltip: true,
              width: 200
          },
          {
              title: '请求方法',
              key: 'method',
              align: 'center',
              tooltip: true,
              width: 200
          },
          {
              title: '请求参数',
              key: 'params',
              align: 'center',
              tooltip: true,
              width: 200
          },
          {
              title: '执行时长',
              key: 'time',
              align: 'center'
          },
          {
              title: 'IP',
              key: 'clientIp',
              align: 'center'
          },
          {
              title: '创建时间',
              key: 'createTime',
              align: 'center',
              render(h, { row }) {
                  return <span>{Utils.of().formatDateStr(row.createTime)}</span>
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
    };
  },

  mounted() {
    this.requestList({}, httpUrl.getLogList);
  },

  methods: {

  }
};
