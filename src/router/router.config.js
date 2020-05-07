import Login from '@/views/login/Login.view.vue'

export const defaultRouterConfig = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/Home.view.vue'),
        children: [
            {
                path: '/test',
                name: 'test',
                component: () => import('@/views/test/test.view.vue'),
            },
        ],
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
    },
]

export const requestRouterConfig = {
    // 首页
    '/home/home': {
        component: () => import('@/views/dashboard/Home.view'),
    },
    // 用户管理
    '/user/list': {
        component: () => import('@/views/userManagement/UserManagement.view'),
    },
    // 角色管理
    '/role/list': {
        component: () => import('@/views/roleManagement/RoleManagement.view'),
    },
    //日志管理
    '/log/list': {
        component: () => import('@/views/sytemLog/SystemLogManagement.view.vue'),
    },
}

export default {
    defaultRouterConfig,
    requestRouterConfig,
}
