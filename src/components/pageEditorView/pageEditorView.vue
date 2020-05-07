<script>
import Vue from 'vue';
import xss from 'xss'
import Utils from '@/module/utils/Utils.module.js'
import Editor from './lib/wangEditor.js'
// const Editor = require('./lib/wangEditor.js')
const DEFAULT_MENUS = ['foreColor', 'undo', 'redo']

String.prototype.colorHex = function () {
  var that = this;
  //十六进制颜色值的正则表达式
  var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
  // 如果是rgb颜色表示
  if (/^(rgb|RGB)/.test(that)) {
    var aColor = that.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
    var strHex = "#";
    for (var i = 0; i < aColor.length; i++) {
      var hex = Number(aColor[i]).toString(16);
      if (hex.length < 2) {
        hex = '0' + hex;
      }
      strHex += hex;
    }
    if (strHex.length !== 7) {
      strHex = that;
    }
    return strHex;
  } else if (reg.test(that)) {
    var aNum = that.replace(/#/, "").split("");
    if (aNum.length === 6) {
      return that;
    } else if (aNum.length === 3) {
      var numHex = "#";
      for (var i = 0; i < aNum.length; i += 1) {
        numHex += (aNum[i] + aNum[i]);
      }
      return numHex;
    }
  }
  return that;
};

let pageEditorIns = null

export default  {
    name: 'pageEditorView',

    props: {
        options: {
            type: Object,
            default() {
                return {}
            }
        },
        value: String
    },

    data() {
        return {

        }
    },
    mounted() {
        // console.log(Editor())
        pageEditorIns = new Editor(this.$el.children[0])
        pageEditorIns && this.initEditor()
    },

    methods: {
        replaceStringHtml(html) {
            html = html.replace(/size/g, 'fontSize')

            if (html.indexOf('</span>') > -1) {
                return html.replace(/<span[^]*<\/span>/g, (str) => { return this.replaceSpan(str) })
            }
            return html
        },
        replaceSpan(str) {
            let styles = str.match(/(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g)
            str = str.replace(/span/g, 'font')
            styles.map(item => {
                let color = item.match(/rgb[^]*\)/g)
                str = color && color.length ? str.replace(item, `color="${color[0].colorHex()}"`) : str
            })
            return str
        },
        setCustomConfig() {
            pageEditorIns.customConfig.noUseStyleWithCSS = true
        },
        setMenus() {
            pageEditorIns.customConfig.menus = Utils.of().$extend(true, [], DEFAULT_MENUS, this.options.menus || [])
        },
        bindEvent() {
            const _this = this

            pageEditorIns.customConfig.onchange = function (html) {
                html = _this.replaceStringHtml(document.querySelector('.page-editor-view__container div[contenteditable="true"]').innerHTML)

                _this.$emit('input', xss(html))
                _this.$emit('change', { html: xss(html), text: pageEditorIns.txt.text() })
            }
        },
        initEditor() {
            this.setCustomConfig()
            this.setMenus()
            this.bindEvent()
            pageEditorIns.create()
            pageEditorIns.txt.html(xss(this.value))
        }
    },

    render(h) {
        return <div class="page-editor-view">
            <div class="page-editor-view__container"></div>
            </div>
    }
}
</script>