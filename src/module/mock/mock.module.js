import { httpUrl } from '@/module/systemConfig/SystemConfig.module'
import mockJson from './mock.json'

export let urlMap = new Map()

export const initUrlMap = (() => {
    for (let i in httpUrl) {
        urlMap.set(httpUrl[i], i)
    }
})()

export const mock = function (url) {
    return new Promise((resolve, reject) => {
        let urlKey = urlMap.get(url)
        let response = mockJson[urlKey] || mockJson.success

        if (!urlKey) {
            reject({
                data: {
                    code: 404,
                    msg: `请求地址${url}不存在`,
                }
            })
            return false
        }

        resolve({data: response})
    })
}

export default mock