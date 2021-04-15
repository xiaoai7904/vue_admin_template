import PageEditView from '@/components/pageEditorView/pageEditorView'
import E from 'wangeditor';

export default {
    name: 'richText',

    components: { PageEditView },

    data() {
        return {}
    },

    mounted() {
        const _this = this
        const editor = new E('#editor')
        // editor.config.uploadImgServer = '/upload-img'
        editor.config.onchange = function (newHtml) {
            console.log('change 之后最新的 html', newHtml)
        }
        editor.config.uploadImgShowBase64 = true
        editor.config.uploadImgFromMedia = function () {
            _this.createInput(editor);
        }
        editor.create()
    },
    methods: {
        createInput(editor) {
            const _this = this
            let inputObj = document.createElement('input');
            inputObj.setAttribute('id', '_ef');
            inputObj.setAttribute('type', 'file');
            inputObj.setAttribute("style", 'visibility:hidden');
            document.body.appendChild(inputObj);
            inputObj.click();
            inputObj.addEventListener('change', function (e) {
                editor.cmd.do(
                    'insertHTML',
                    `<img src="${ _this.getFileUrl('_ef')}" style="max-width:100%;"/>`
                )
            })
        },
        getFileUrl(id) {
            var url;
            var file = document.getElementById(id);
            var agent = navigator.userAgent;
            if (agent.indexOf("MSIE") >= 1) {
                url = file.value;
            } else if (agent.indexOf("Firefox") > 0) {
                url = window.URL.createObjectURL(file.files.item(0));
            } else if (agent.indexOf("Chrome") > 0) {
                url = window.URL.createObjectURL(file.files.item(0));
            }
            return url;
        }
    },
}