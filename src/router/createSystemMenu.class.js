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
        const addRequestRouterConfigFn = (routerItemInfo, item) => {
            requestRouterConfig[item.url] &&
            routerItemInfo.push({
                path: item.url,
                name: item.name,
                component: requestRouterConfig[item.url].component
            })
        }

        menuList.map(item => {
            let menuItemInfo = {
                id: item.id,
                name: item.name,
                icon: item.icon
            }
            let routerItemInfo = []

            if (item.resourceType === 0) {
                if (item.list && item.list.length) {
                    menuItemInfo.children = []

                    item.list.map(childrenItem => {
                        if (childrenItem.resourceType === 1) {
                            menuItemInfo.children.push({
                                id: childrenItem.id,
                                name: childrenItem.name,
                                icon: childrenItem.icon,
                                path: childrenItem.url
                            })
                            addRequestRouterConfigFn(routerItemInfo, childrenItem)
                        }
                    })
                }
            }else if(item.resourceType === 1) {
                menuItemInfo.children = [{
                    id:  item.id,
                    name: item.name,
                    icon: item.icon,
                    path: item.url
                }]
                addRequestRouterConfigFn(routerItemInfo, item)
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
