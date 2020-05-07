import Observable from "@/module/observer/Observer.module";

/**
 * 导出excel类
 */
export default class Export2excel extends Observable {
    constructor() {
        super();
    }
    /**
     * 下载文件
     * @param {*} _blob
     */
    download(_blob) {
        // application/octet-stream
        // application/vnd.ms -excel
        //创建a标签模拟下载
        let _a = document.createElement("a");
        _a.download = this.fileName || "下载.xls";
        _a.href = URL.createObjectURL(_blob);
        document.body.append(_a);
        _a.click();
        document.body.removeChild(a);
        // 模拟点击下载文件
        setTimeout(function() {
            URL.revokeObjectURL(_blob);
        }, 100);
    }
    /**
     * 异步获取后台流文件进行导出下载
     * @param {*} buf
     * @param {*} options
     */
    asyncExport2excel(url, options) {
        let _this = this;
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader(
                "Content-Type",
                "application/json;charset=UTF-8"
            );
            xhr.responseType = "blob";
            xhr.onload = function() {
                if (this.status === 200) {
                    let blob = this.response;
                    _this.fileName = options.fileName;
                    _this.download(blob);
                    resolve();
                } else {
                    reject();
                }
            };
            xhr.send(JSON.stringify(options.params));
        });
    }
    /**
     * XML 下载
     * @param {*} url
     * @param {*} options
     */
    asyncExport2Xml(url, options) {
        let _this = this;
        return new Promise((resolve, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
            xhr.setRequestHeader(
                "Content-Type",
                "application/json;charset=UTF-8"
            );
            xhr.responseType = "blob";
            xhr.onload = function() {
                if (this.status === 200) {
                    let blob = this.response;
                    _this.fileName = options.fileName;
                    _this.downloadXml(blob);
                    resolve();
                } else {
                    reject();
                }
            };
            xhr.send(JSON.stringify(options));
        });
    }
    /**
     * xml 下载
     * @param {*} _blob
     */
    downloadXml(_blob) {
        let that = this;
        var reader = new FileReader();
        reader.readAsDataURL(_blob); // 转换为base64，可以直接放入a表情href
        reader.onload = function(e) {
            // 转换完成，创建一个a标签用于下载
            let a = document.createElement("a");
            a.download = that.fileName;
            a.href = e.target.result;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        };
    }
}
