import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import classnams from 'classnames';
import { historyRecord, del } from '@/module/routerStack/RouterStack.module';

export default {
  name: 'pageNavTag',

  components: {
    swiper,
    swiperSlide
  },

  computed: {
    swiperData() {
      return this.$store.state.openRouterStack;
    },
    currentRouterPath() {
      return this.$route.path;
    }
  },

  data() {
    return {
      swiperOptions: {
        slidesPerView: 'auto',
        spaceBetween: 5
      }
    };
  },

  methods: {
    close(item) {
      if (historyRecord.historyStack.length === 1) return;

      if (item.path === this.currentRouterPath) {
        let index = historyRecord.historyStack.map(item => item.path).indexOf(item.path);
        let pre = historyRecord.historyStack[index - 1];
        let next = historyRecord.historyStack[index + 1];

        this.$router.push(pre ? pre.path : next.path);
      }

      del(item);
    },
    link(item) {
      if (item.path === this.currentRouterPath) return false;
      this.$router.push(item.path);
    }
  },

  render(h) {
    const { swiperOptions, swiperData, currentRouterPath } = this;

    return (
      <swiper options={swiperOptions} class="page-nav-tag">
        {swiperData.map(item => {
          return (
            <swiper-slide key={item.path} class={classnams({ 'page-nav-tag--item': true, 'page-nav-tag-item--check': currentRouterPath === item.path })} nativeOnClick={e => this.link(item)}>
              <span title={item.name}>{item.name}</span>
              <Icon
                type="md-add"
                onClick={e => {
                  e.stopPropagation();
                  this.close(item);
                }}
              />
            </swiper-slide>
          );
        })}
      </swiper>
    );
  }
};
