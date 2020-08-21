<template>
  <div :class="prefix + '-color-alpha-set'">
    <input type="tel" v-model="modelColor" :class="prefix + '-value'" @input="change" />
    <div :class="prefix + '-color-alpha'" @mousedown.prevent.stop="selectAlpha">
      <canvas ref="canvasAlpha" :class="prefix + '-canvas2'" />
      <div :style="slideAlphaStyle" :class="prefix + '-slide'" />
    </div>
  </div>
</template>

<script>
import mixin from "./mixin";
export default {
  mixins: [mixin],
  inject: ['prefix'],
  props: {
    color: {
      type: String,
      default: "#000000",
    },
    rgba: {
      type: Object,
      default: null,
    },
    width: {
      type: Number,
      default: 15,
    },
    height: {
      type: Number,
      default: 30,
    },
  },
  data() {
    return {
      slideAlphaStyle: {},
      alphaSize: 5,
      modelColor: (this.rgba.a * 1).mul(100),
      prefix: this.prefix,
    };
  },
  watch: {
    color() {
      this.renderColor();
    },
    "rgba.a"() {
      this.modelColor = this.rgba.a.mul(100);
      this.renderSlide();
    },
  },
  mounted() {
    this.renderColor();
    this.renderSlide();
  },
  methods: {
    change(e) {
      let a = e.target.value;
      if (a > 100) a = 100;
      if (a < 0 || typeof (a * 1) !== "number" || isNaN(a)) a = 0;
      let val = (a * 1).div(100);
      this.modelColor = (a * 1).div(1);
      this.$emit("selectAlpha", val);
    },
    renderColor() {
      const canvas = this.$refs.canvasAlpha;
      const width = this.width;
      const height = this.height;
      const size = this.alphaSize;
      const canvasSquare = this.createAlphaSquare(size);

      const ctx = canvas.getContext("2d");
      canvas.width = width;
      canvas.height = height;

      ctx.fillStyle = ctx.createPattern(canvasSquare, "repeat");
      ctx.fillRect(0, 0, width, height);

      this.createLinearGradient(
        "l",
        ctx,
        width,
        height,
        "rgba(255,255,255,0)",
        this.color
      );
    },
    renderSlide() {
      this.slideAlphaStyle = {
        right: this.rgba.a * this.width - 9 + "px",
      };
    },
    selectAlpha(e) {
      const { left: hueLeft } = this.$el.getBoundingClientRect();

      const mousemove = (e) => {
        let x = e.clientX - hueLeft - 64;

        if (x < 0) {
          x = 0;
        }
        if (x > this.width) {
          x = this.width;
        }

        let a = parseFloat(((this.width - x) / this.width).toFixed(2));
        this.$emit("selectAlpha", a);
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
.#{$prefix}-color-alpha-set {
  display: flex;
  @include hex-box-background();
  .#{$prefix}-value {
    height: 18px;
    width: 48px;
    padding: 0 4px;
    border: 0;
    color: #fff;
    background: #2e333a;
    box-sizing: border-box;
    margin-right: 12px;
    border: 1px solid white;
  }
}
.#{$prefix}-canvas2 {
  @include base-prev-canvas-border();
}
.#{$prefix}-color-alpha {
  position: relative;
  height: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  flex: 1;
  .#{$prefix}-slide {
    position: absolute;
    right: 0;
    height: 18px;
    width: 18px;
    pointer-events: none;
    border: 2px solid #fff;
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.3);
    border-radius: 50%;
  }
}
</style>
