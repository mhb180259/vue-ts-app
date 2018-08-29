<template>
  <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true" ref="preview">
    <div class="pswp__bg"></div>

    <!-- Slides wrapper with overflow:hidden. -->
    <div class="pswp__scroll-wrap">

      <!-- Container that holds slides. PhotoSwipe keeps only 3 slides in DOM to save memory. -->
      <div class="pswp__container">
        <!-- don't modify these 3 pswp__item elements, data is added later on -->
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
        <div class="pswp__item"></div>
      </div>

      <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
      <div class="pswp__ui pswp__ui--hidden">

        <div class="pswp__top-bar">

          <!--  Controls are self-explanatory. Order can be changed. -->

          <div class="pswp__counter"></div>

          <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

          <button class="pswp__button pswp__button--share" title="Share"></button>

          <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>

          <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

          <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->
          <!-- element will get class pswp__preloader--active when preloader is running -->
          <div class="pswp__preloader">
            <div class="pswp__preloader__icn">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut"></div>
              </div>
            </div>
          </div>
        </div>

        <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
          <div class="pswp__share-tooltip"></div>
        </div>

        <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
        </button>

        <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
        </button>

        <div class="pswp__caption">
          <div class="pswp__caption__center"></div>
        </div>

      </div>

    </div>

  </div>
</template>
<script>
import PhotoSwipe from 'photoswipe/dist/photoswipe'
import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default'
export default {
  name: 'VuePreview',
  props: {
    items: Array,
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  },
  methods: {
    init() {
      console.log(this.items)
      let gallery = new PhotoSwipe(this.$refs.preview, PhotoSwipeUIDefault, this.items, { index: this.index, shareEl: false })
      gallery.init()
    }
  }
}
</script>
<style lang="css" scoped>
@import 'photoswipe/dist/photoswipe.css';
@import 'photoswipe/dist/default-skin/default-skin.css';
.pswp__top-bar {
  height: 88px;
}
.pswp__counter {
  line-height: 88px;
  font-size: 26px;
}
.pswp__button {
  background-size: 528px 176px;
  width: 88px;
  height: 88px;
}
.pswp__button--close {
  background-position: 0 -88px;
}
</style>
