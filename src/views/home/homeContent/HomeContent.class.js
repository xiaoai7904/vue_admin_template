import Utils from "@/module/utils/Utils.module";
import PageNavTag from "@/components/pageNavTag/PageNavTag.view.vue";

export default {
    name: "homeContent",

    components: { PageNavTag },

    data() {
        return {};
    },
    mounted() {
        this.bindEvent();
    },
    methods: {
        bindEvent() {}
    },

    render(h) {
        return (
            <div class="home-content">
                <div class="home-content--nav">
                    <PageNavTag />
                </div>
                <div class="home-content--container">
                    <router-view />
                </div>
            </div>
        );
    }
};
