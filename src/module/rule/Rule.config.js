const rulesConfig = [
    {
        name: "number",
        reg: /^$|^-?\d+(?:\.\d+)?$/,
        desc: "请输入数字"
    },
    {
        name: "integer",
        reg: /^[0-9]+$/,
        desc: "请输入整数"
    },
    {
        name: "lang-zh",
        reg: /^$|^[\u4E00-\u9FA5\uF900-\uFA2D]+$/,
        desc: "请输入中文"
    },
    {
        name: "email",
        reg: /^$|^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/,
        desc: "请输入正确的邮箱地址"
    },
    {
        name: "onedecimal",
        reg: /^\d+$|^\d+(\.\d{1})$/,
        desc: "请输入整数或者一位小数"
    },
    {
        name: "twodecimal",
        reg: /^\d+(\.\d{2})$/,
        desc: "请输入两位小数"
    },
    {
        name: "tel",
        reg: /^([0-9]|[-]){6,20}$/,
        desc: "请输入正确的电话号码"
    },
    {
        name: "specialchart",
        reg: /[`~!@#\$%\^\&\*\(\)_\+<>\?:"\{\},\\\/;'\[\]]/im,
        desc: "不能输入特殊字符",
        flag: true
    },
    {
        name: "ip",
        reg: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
        desc: "请输入正确的IP地址"
    },
    {
        name: "userlength",
        reg: /^[A-Za-z0-9_]{5,20}$/,
        desc: "5-20位数字、字母或下划线组合"
    },
    {
        name: "NonChinese",
        reg: /^$|^[\u4E00-\u9FA5\uF900-\uFA2D]+$/,
        desc: "不能输入中文汉字",
        flag: true
    },
    {
        name: "http",
        reg: /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/,
        desc: "请输入以http或https开头的正确网址"
    },
    {
        name: "maxLength",
        reg: 128,
        desc: "最多支持128位字符(中文不可超过64位)"
    },
    // 最大长度
    {
        name: "userNameMaxLength",
        reg: /^.{1,32}$/,
        desc: "用户名长度最大支持32位"
    },
    {
        name: "chinese",
        reg: /^$|^[\u4E00-\u9FA5\uF900-\uFA2D]+$/,
        desc: "请输入中文"
    },
    {
        name: "alipayName",
        reg: /^[a-zA-Z0-9_\u4E00-\u9FA5\uF900-\uFA2D]+$/,
        desc: "用户名只能是汉字,数字,字母,下划线组合"
    },
    {
        name: "cellphone",
        reg: /^([0-9]|[-]){6,20}$/,
        desc: "请输入正确的电话号码"
    },
    {
        name: "maxNumber",
        reg: /^100000000$|^[0-9]{0,8}$/,
        desc: "超出最大范围限制[0~100000000]"
    },
    {
        name: "number1",
        reg: /^100000000$|^[1-9][0-9]{0,7}$/,
        desc: "请输入[1~100000000]之间的整数"
    },
    // 密码验证     /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/
    {
        name: "passwordlength",
        reg: /^([A-Za-z0-9_`~!@#$%^&*()+<>?:"{},\\/;'[\]\s]){6,20}$/,
        desc: "请输入6-20位的密码"
    },
    {
        name: "newPassWord",
        reg: /^([A-Za-z0-9]){6,12}$/,
        desc: "请输入6-12位由数字和字母组成的密码"
    },
];
export default rulesConfig;
