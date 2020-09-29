// 请求地址
export const httpUrl = {
    // 登录
    login: '/sys/login',
    // 登出
    logout: '/sys/logout',
    // 获取用户信息
    getUserInfo: '/sys/menu/nav',
    // 获取角色管理
    getRoleList: '/sys/role/list',
    // 查询用户
    getUserList: '/sys/user/list',
    // 修改密码
    commonResetPassword: '/sys/user/password',
    // 获取选中角色对应的权限列表·
    getRoleInfoById: '/sys/role/info',
    // 系统日志
    getLogList: '/sys/log/list',
    updateRole: '',
}

export const SysUserType = {
    1: '管理员',
}
