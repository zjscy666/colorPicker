<template>
  <div :class="prefix + '-hue'" @mousedown.prevent.stop="selectHue">
    <canvas ref="canvasHue" :class="prefix + '-canvas2'"/>
    <div :style="slideHueStyle" :class="prefix + '-slide'"/>
  </div>
</template>

<script>
export default {
  props: {
    hsv: {
      type: Object,
      default: null,
    },
    width: {
      type: Number,
      default: 15,
    },
    height: {
      type: Number,
      default: 152,
    },
  },
  inject: ["prefix"],
  data() {
    return {
      slideHueStyle: {},
      prefix: this.prefix,
    };
  },
  // 不能监听，否则操作saturation时，这里的slide会抖动
  // watch: {
  //     'hsv.h'() {
  //         this.renderSlide()
  //     }
  // },
  mounted() {
    this.renderColor();
    this.renderSlide();
  },
  methods: {
    renderColor() {
      const canvas = this.$refs.canvasHue;
      const width = this.width;
      const height = this.height;
      const ctx = canvas.getContext("2d");
      canvas.width = width;
      canvas.height = height;

      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, "#FF0000"); // 红
      gradient.addColorStop(0.17 * 1, "#FF00FF"); // 紫
      gradient.addColorStop(0.17 * 2, "#0000FF"); // 蓝
      gradient.addColorStop(0.17 * 3, "#00FFFF"); // 青
      gradient.addColorStop(0.17 * 4, "#00FF00"); // 绿
      gradient.addColorStop(0.17 * 5, "#FFFF00"); // 黄
      gradient.addColorStop(1, "#FF0000"); // 红
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    },
    renderSlide() {
      this.slideHueStyle = {
        left: (1 - this.hsv.h / 360) * this.width - 9 + "px",
      };
    },
    selectHue(e) {
      const { left: hueLeft } = this.$el.getBoundingClientRect();
      const ctx = e.target.getContext("2d");

      const mousemove = (e) => {
        let x = e.clientX - hueLeft;

        if (x < 0) {
          x = 0;
        }
        if (x > this.width) {
          x = this.width;
        }

        this.slideHueStyle = {
          left: x - 9 + "px",
        };
        // 如果用最大值，选择的像素会是空的，空的默认是黑色
        const imgData = ctx.getImageData(Math.min(x, this.width - 1), 0, 1, 1);
        const [r, g, b] = imgData.data;
        this.$emit("selectHue", { r, g, b });
      };

      mousemove(e);

      const mouseup = () => {
        document.removeEventListener("mousemove", mousemove);
        document.removeEventListener("mouseup", mouseup);
      };

      document.addEventListener("mousemove", mousemove);
      document.addEventListener("mouseup", mouseup);
    },
  },
};
</script>

<style lang="scss" scoped>
@import './mixin.scss';
.#{$prefix}-hue {
  position: relative;
  margin-left: 12px;
  height: 18px;
  cursor: pointer;
  .#{$prefix}-canvas2 {
    @include base-prev-canvas-border()
  }
  .#{$prefix}-slide {
    position: absolute;
    left: 0;
    top: 0;
    width: 18px;
    height: 18px;
    pointer-events: none;
    border: 2px solid #fff;
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.3);
    border-radius: 50%;
  }
}
</style>