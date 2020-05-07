import Rule from '@/module/rule/Rule.module'
import Utils from '@/module/utils/Utils.module'
import { httpUrl } from '@/module/systemConfig/SystemConfig.module.js'
import '@/lib/bubbly-bg'

export default {
    name: 'login',

    data() {
        const isRemeber = localStorage.getItem('username') || 'admin'
        return {
            loginFormModel: {
                username: isRemeber,
                password: 'admin123123',
                safeCode: ''
            },
            loginFormRule: {
                username: [
                    { required: true, message: '请输入账号', trigger: 'blur' },
                    { validator: Rule.of().validate.userlength, trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { validator: Rule.of().validate.passwordlength, trigger: 'blur' }
                ]
            },
            remember: !!isRemeber,
            pageLoaidng: false,
            userType: '1',
            showLoginSelect: true
        }
    },

    watch: {
        remember(newValue) {
            if (newValue) {
                localStorage.setItem('username', this.loginFormModel.username)
            } else {
                localStorage.removeItem('username')
            }
        }
    },

    mounted() {
        bubbly({
            bubbleFunc: () => `hsla(${200 + Math.random() * 50}, 100%, 60%, .1)`
        })
        localStorage.setItem('isLogin', false)
        this.$Notice.success({
          title: '登录账号密码提示',
          desc: '账号:admin 密码:admin123123'
      });
    },

    destroyed() {
        document.querySelector('body canvas').remove()
    },

    methods: {
        enterEvent() {
            this.login()
        },
        login() {
            this.$refs.loginFormRef.validate(valid => {
                if (valid) {
                    if (this.remember) {
                        localStorage.setItem('username', this.loginFormModel.username)
                    }
                    this.requestLogin()
                }
            })
        },
        requestLogin() {
            this.pageLoaidng = true
            this.$http.post(httpUrl.login, { loginSource: 'PC', userType: parseInt(this.userType), rememberMe: 1, safeCode: this.loginFormModel.safeCode, username: this.loginFormModel.username, password: Utils.of().md5(this.loginFormModel.password) }).then(
                data => {
                    if (data.data.code === 0) {
                        localStorage.setItem('isLogin', true)
                        this.$router.push('/')
                    }
                    this.pageLoaidng = false
                },
                err => {
                    this.pageLoaidng = false
                }
            )
        }
    }
}
