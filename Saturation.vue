<template>
  <div :class="prefix + '-saturation'" @mousedown.prevent.stop="selectSaturation">
    <canvas ref="canvasSaturation" :class="prefix + '-canvas2'" />
    <div :style="slideSaturationStyle" :class="prefix + '-slide'" />
  </div>
</template>

<script>
import mixin from "./mixin";
export default {
  mixins: [mixin],
  props: {
    color: {
      type: String,
      default: "#000000",
    },
    hsv: {
      type: Object,
      default: null,
    },
    size: {
      type: Number,
      default: 152,
    },
    width: {
      type: Number,
      default: 152,
    },
  },
  data() {
    return {
      slideSaturationStyle: {},
      prefix: this.prefix,
    };
  },
  inject: ["prefix"],
  // 不能监听，否则自己改变自己时，颜色也会发生变化
  // watch: {
  //     color() {
  //         this.renderColor()
  //     }
  // },
  mounted() {
    this.renderColor();
    this.renderSlide();
  },
  methods: {
    renderColor() {
      const canvas = this.$refs.canvasSaturation;
      const size = this.size;
      const width = this.width;
      const ctx = canvas.getContext("2d");
      canvas.width = width;
      canvas.height = size;

      ctx.fillStyle = this.color;
      ctx.fillRect(0, 0, width, size);

      this.createLinearGradient(
        "l",
        ctx,
        width,
        size,
        "rgba(255,255,255,0)",
        "#FFFFFF"
      );
      this.createLinearGradient(
        "p",
        ctx,
        width,
        size,
        "#000000",
        "rgba(0,0,0,0)"
      );
    },
    renderSlide() {
      this.slideSaturationStyle = {
        left: this.hsv.s * this.width - 5 + "px",
        top: (1 - this.hsv.v) * this.size - 5 + "px",
      };
    },
    selectSaturation(e) {
      const {
        top: saturationTop,
        left: saturationLeft,
      } = this.$el.getBoundingClientRect();
      const ctx = e.target.getContext("2d");

      const mousemove = (e) => {
        let x = e.clientX - saturationLeft;
        let y = e.clientY - saturationTop;

        if (x < 0) {
          x = 0;
        }
        if (y < 0) {
          y = 0;
        }
        if (x > this.width) {
          x = this.width;
        }
        if (y > this.size) {
          y = this.size;
        }

        // 不通过监听数据变化来修改dom，否则当颜色为#ffffff时，slide会跑到左下角
        this.slideSaturationStyle = {
          left: x - 5 + "px",
          top: y - 5 + "px",
        };
        // 如果用最大值，选择的像素会是空的，空的默认是黑色
        const imgData = ctx.getImageData(
          Math.min(x, this.width - 1),
          Math.min(y, this.size - 1),
          1,
          1
        );
        const [r, g, b] = imgData.data;
        this.$emit("selectSaturation", { r, g, b });
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
@import "./mixin.scss";
.#{$prefix}-saturation {
  .#{$prefix}-canvas2 {
    @include base-prev-canvas-border();
  }
  position: relative;
  cursor: pointer;
  width: 100%;
  .#{$prefix}-slide {
    position: absolute;
    left: 100px;
    top: 0;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid #fff;
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.3);
    pointer-events: none;
  }
}
</style>