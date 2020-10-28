import { httpUrl } from '@/module/systemConfig/SystemConfig.module'
import Utils from '@/module/utils/Utils.module'
import Rule from '@/module/rule/Rule.module'
export default {
    name: 'PageResetPassword',
    props: ['userId', 'url'],
    data() {
        const _this = this
        return {
            pwdType: '',
            pageModalOptions: {
                show: false,
                btnLoading: false,
                title: '修改密码',
            },
            pageModalFormOptions: {
                modalForm: true,
                labelWidth: 80,
                config: [
                    {
                        id: 'oldpassword',
                        type: 'input',
                        name: '原密码',
                        options: {
                            type: 'password',
                            value: '',
                            placeholder: '请输入原密码',
                            hidden() {
                                return _this.pwdType !== 'self' ? true : false
                            },
                        },
                    },
                    {
                        id: 'password',
                        type: 'input',
                        name: '密码',
                        options: {
                            type: 'password',
                            value: '',
                        },
                    },
                    {
                        id: 'agentPassword',
                        type: 'input',
                        name: '确认密码',
                        options: {
                            type: 'password',
                            value: '',
                        },
                    },
                ],
                rules: {
                    oldpassword: [
                        {
                            required: true,
                            message: '请输入密码',
                            trigger: 'blur',
                        },
                    ],
                    password: [
                        {
                            required: true,
                            message: '请输入密码',
                            trigger: 'blur',
                        },
                        {
                            validator: Rule.of().validate.passwordlength,
                            trigger: 'blur',
                        },
                    ],
                    agentPassword: [
                        {
                            required: true,
                            message: '请输入确认密码',
                            trigger: 'blur',
                        },
                        {
                            validator: Rule.of().validate.passwordlength,
                            trigger: 'blur',
                        },
                        {
                            validator: function (rule, value, callback) {
                                if (_this.$refs.pageModalFormRefs.getData().password != value) {
                                    callback(new Error('两次密码输入不一致'))
                                } else {
                                    callback()
                                }
                            },
                            trigger: 'blur',
                        },
                    ],
                },
            },
        }
    },
    methods: {
        okPageModal() {
            let _this = this
            const pageModalFormRefs = this.$refs.pageModalFormRefs
            pageModalFormRefs.$refs.form.validate((valid) => {
                if (valid) {
                    let httpURL = this.url || httpUrl.commonResetPassword
                    let params = Object.assign({
                        id: _this.userId,
                        password: Utils.of().md5(pageModalFormRefs.getData().password),
                    })

                    if(_this.pwdType === 'self') {
                        params.oldpassword = Utils.of().md5(pageModalFormRefs.getData().oldpassword)
                    }
                    
                    _this.$http
                        .post(httpURL, params)
                        .then((data) => {
                            _this.pageModalOptions.show = false
                            _this.$Notice.success({
                                title: '成功',
                                desc: '操作成功',
                            })
                        })
                        .finally(() => {
                            _this.pageModalOptions.btnLoading = false
                        })
                }
            })
        },
        cancelPageModal() {
            this.pageModalOptions.show = false
        },
        open(type) {
            if (type) {
                this.pwdType = type
            }
            this.pageModalOptions.show = true
        },
    },
}
