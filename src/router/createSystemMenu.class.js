import { requestRouterConfig, defaultRouterConfig } from './router.config'
import store from '@/store/store'

/**
 * 创建系统菜单
 */
export default class CreateSystemMenu {
    constructor() {
        this.systemMenuList = []
        this.systemRouterList = []
        return this
    }
    create(menuList) {
        if (!menuList) return this
        let router = []
        let menu = []
        menuList.map((item) => {
            let menuItemInfo = {
                id: item.id,
                name: item.name,
                icon: item.icon,
            }
            let routerItemInfo = []

            if (item.list && item.list.length) {
                menuItemInfo.children = []

                item.list.map((childrenItem) => {
                    menuItemInfo.children.push({
                        id: childrenItem.id,
                        name: childrenItem.name,
                        icon: childrenItem.icon,
                        path: childrenItem.url,
                    })
                    requestRouterConfig[childrenItem.url] &&
                        routerItemInfo.push({
                            path: childrenItem.url,
                            name: childrenItem.name,
                            component: requestRouterConfig[childrenItem.url].component,
                        })
                })
            }
            menu.push(menuItemInfo)
            router = [...router, ...routerItemInfo]
        })

        this.systemMenuList = menu.slice(0)
        this.systemRouterList = router.slice(0)

        return this
    }
    getMenuList() {
        return this.systemMenuList
    }
    getRouterList() {
        let router = defaultRouterConfig

        router.map((item) => {
            if (item.path === '/' && item.children) {
                item.children = [...this.systemRouterList]
            }
        })
        return router
    }
}
