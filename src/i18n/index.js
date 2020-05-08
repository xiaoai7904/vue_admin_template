import zh from './zh'
import en from './en'

import viewEn from 'view-design/dist/locale/en-US'
import viewZh from 'view-design/dist/locale/zh-CN'

export const messages = {
    en: Object.assign({}, en, viewEn),
    zh: Object.assign({}, zh, viewZh)
}

export default messages
