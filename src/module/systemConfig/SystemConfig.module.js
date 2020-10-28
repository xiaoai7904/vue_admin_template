// 请求地址
export const httpUrl = {
    // 登录
    login: '/sys/login',
    // 登出
    logout: '/sys/logout',
    // 获取用户信息
    getUserInfo: '/sys/menu/nav',
    // 查询用户
    getUserList: '/sys/user/list',
    // 修改下级密码
    commonResetPassword: '/sys/user/password',
    // 修改自己密码
    userResetpwd: '/sys/user/resetpwd',
    // 获取角色管理
    getRoleList: '/sys/role/list',
    // 获取选中角色对应的权限列表·
    getRoleInfoById: '/sys/role/info',
    // 更新角色
    updateRole: '/sys/role/update',
    // 删除角色byid
    deleteRoleById: '/sys/role/deleterolebyid',
    // 系统日志
    getLogList: '/sys/log/list',
    // 添加用户
    addUser: '/sys/user/save'

}

export const SysUserType = {
    1: '管理员',
}
