<template>
  <div :data-theme="isLightTheme">
    <div :class="prefix + '-color-picker'" :style="{ width: width + 'px' }">
      <div v-show="!colorsSelfShow" :class="prefix + '-color-picker-innder-box'">
        <div :class="prefix + '-color-box'">
          <HexBox name="#" :color="modelHex" @inputColor="inputHex" />
          <Preview :color="rgbaString" @setSelfColor="setSelfColor" />
        </div>
        <Colors
          :colors-default="colorsDefault"
          :colors-history-key="colorsHistoryKey"
          :colors-default-show="true"
          :colors-history="colorsHistory"
          @selectColor="selectColor"
        />
        <div :class="prefix + '-color-alpha-box'">
          <div :class="prefix + '-color-alpha-text'">透明度</div>
          <Alpha
            ref="alpha"
            :color="rgbString"
            :rgba="rgba"
            :width="hueWidth"
            :height="hueHeight"
            @selectAlpha="selectAlpha"
          />
        </div>
        <Colors
          :text="'最近使用'"
          :colors-history-key-show="true"
          :colors-history-key="colorsHistoryKey"
          :colors-history="colorsHistory"
          @selectColor="selectColor"
        />
        <Colors
          :text="'自定义颜色'"
          :colors-self="colorsSelfHistory"
          :colors-self-show="true"
          :colors-history-key="colorsHistoryKey"
          :colors-history="colorsHistory"
          @selectColor="selectColor"
          @selectColorSelf="selectColorSelf"
        />
      </div>
      <div v-show="colorsSelfShow" :class="prefix + '-color-picker-innder-box'">
        <div :class="prefix + '-title'">
          <span :class="prefix + '-sub'">自定义颜色</span>
          <span :class="prefix + '-back'" @click="colorsSelfShow = false"></span>
        </div>
        <div :class="prefix + '-color-box'">
          <HexBox name="#" :color="modelHex" @inputColor="inputHex" />
          <Preview
            :color="rgbaString"
            :width="previewWidth"
            :height="previewHeight"
            @setSelfColor="setSelfColor"
          />
        </div>
        <div :class="prefix + '-color-set'">
          <Saturation
            ref="saturation"
            :color="rgbString"
            :hsv="hsv"
            :size="hueHeight2"
            :width="hueWidth2"
            @selectSaturation="selectSaturation"
          />
          <div :class="prefix + '-color-alpha-box'">
            <div :class="prefix + '-color-alpha-text'">色相透明度</div>
            <div :class="prefix + '-color-hue-box ' + prefix + '-preview-diff'">
              <Preview
                :color="rgbaString"
                :width="previewWidth2"
                :height="previewHeight2"
                @setSelfColor="setSelfColor"
              />
              <Hue
                ref="hue"
                :hsv="hsv"
                :width="hueWidth"
                :height="hueHeight"
                @selectHue="selectHue"
              />
            </div>
            <Alpha
              ref="alpha"
              :color="rgbString"
              :rgba="rgba"
              :width="hueWidth"
              :height="hueHeight"
              @selectAlpha="selectAlpha"
            />
          </div>
        </div>
        <RgbaBox :color="modelRgba" @inputColor="inputRgba" />
      </div>
    </div>
  </div>
</template>

<script>
import mixin from "./mixin";
import Saturation from "./Saturation.vue";
import Hue from "./Hue.vue";
import Alpha from "./Alpha.vue";
import Preview from "./Preview.vue";
import HexBox from "./HexBox.vue";
import RgbaBox from "./RgbaBox.vue";
import Colors from "./Colors.vue";
export default {
  components: {
    Saturation,
    Hue,
    Alpha,
    Preview,
    HexBox,
    Colors,
    RgbaBox,
  },
  mixins: [mixin],
  props: {
    color: {
      type: String,
      default: "#000000",
    },
    width: {
      type: Number,
      default: 310,
    },
    theme: {
      type: String,
      default: "dark",
    },
    colorsDefault: {
      type: Array,
      default: () => [
        // "pink",
        // "173, 54, 125, 1",
        //  "rgba(0,0,0,0)",
        "#B71C1C",
        "#E65100",
        "#F57F17",
        "#1B5E20",
        "#006064",
        "#0D47A1",
        "#1A237E",
        "#4A148C",
        "#880E4F",
        "#D32F2F",
        "#F57C00",
        "#FBC02D",
        "#388E3C",
        "#0097A7",
        "#1976D2",
        "#303F9F",
        "#7B1FA2",
        "#C2185B",
        "#F44336",
        "#FF9800",
        "#FFEB3B",
        "#4CAF50",
        "#00BCD4",
        "#2196F3",
        "#3F51B5",
        "#9C27B0",
        "#E91E63",
        "#EF9A9A",
        "#FFCC80",
        "#FFF59D",
        "#A5D6A7",
        "#80DEEA",
        "#90CAF9",
        "#9FA8DA",
        "#CE93D8",
        "#F48FB1",
        "#FFEBEE",
        "#FFF3E0",
        "#FFFDE7",
        "#E8F5E9",
        "#E0F7FA",
        "#E3F2FD",
        "#C5CAE9",
        "#F3E5F5",
        "#FCE4EC",
        "#000000",
        "#212121",
        "#424242",
        "#757575",
        "#9E9E9E",
        "#BDBDBD",
        "#E0E0E0",
        "#F5F5F5",
        "#FFFFFF",
      ],
    },
    colorsHistoryKey: {
      type: String,
      default: "vue-colorpicker-history",
    },
    colorsSelfHistoryKey: {
      type: String,
      default: "vue-colorpicker-history-self",
    },
    prefix: {
      type: String,
      default: "Myself",
    },
  },
  provide() {
    return {
      prefix: this.prefix,
    };
  },
  data() {
    return {
      hueWidth: this.width - 142,
      hueHeight: 18,
      hueHeight2: 150,
      hueWidth2: this.width - 82,
      previewHeight: 28,
      previewWidth: 28,
      previewHeight2: 18,
      previewWidth2: 54,
      modelRgba: "",
      modelHex: "",
      colorsSelfShow: false,
      colorsHistory:
        JSON.parse(localStorage.getItem(this.colorsHistoryKey)) || [],
      colorsSelfHistory:
        JSON.parse(localStorage.getItem(this.colorsSelfHistoryKey)) || [],
      r: 0,
      g: 0,
      b: 0,
      a: 1,
      h: 0,
      s: 0,
      v: 0,
    };
  },
  computed: {
    isLightTheme() {
      return this.theme + "-theme";
    },
    rgba() {
      return {
        r: this.r,
        g: this.g,
        b: this.b,
        a: this.a,
      };
    },
    hsv() {
      return {
        h: this.h,
        s: this.s,
        v: this.v,
      };
    },
    rgbString() {
      return `rgb(${this.r}, ${this.g}, ${this.b})`;
    },
    rgbaStringShort() {
      return `${this.r}, ${this.g}, ${this.b}, ${this.a}`;
    },
    rgbaString() {
      return `rgba(${this.rgbaStringShort})`;
    },
    hexString() {
      return this.rgb2hex(this.rgba, true);
    },
  },
  created() {
    Object.assign(this, this.setColorValue(this.color));
    this.setText();
    this.$watch("rgba", () => {
      this.$emit("changeColor", {
        rgba: this.rgba,
        hsv: this.hsv,
        hex: this.modelHex,
      });
    });
  },
  methods: {
    selectSaturation(color) {
      const { r, g, b, h, s, v } = this.setColorValue(color);
      Object.assign(this, { r, g, b, h, s, v });
      this.setText();
    },
    selectHue(color) {
      const { r, g, b, h, s, v } = this.setColorValue(color);
      Object.assign(this, { r, g, b, h, s, v });
      this.setText();
      this.$nextTick(() => {
        this.$refs.saturation.renderColor();
        this.$refs.saturation.renderSlide();
      });
    },
    selectAlpha(a) {
      this.a = a;
      this.setText();
    },
    inputHex(color) {
      const { r, g, b, a, h, s, v } = this.setColorValue(color);
      Object.assign(this, { r, g, b, a, h, s, v });
      this.modelHex = color;
      this.modelRgba = this.rgbaStringShort;
      this.$nextTick(() => {
        this.$refs.saturation.renderColor();
        this.$refs.saturation.renderSlide();
        this.$refs.hue.renderSlide();
      });
    },
    inputRgba(color) {
      const { r, g, b, a, h, s, v } = this.setColorValue(color);
      Object.assign(this, { r, g, b, a, h, s, v });
      this.modelHex = this.hexString;
      this.modelRgba = color;
      this.$nextTick(() => {
        this.$refs.saturation.renderColor();
        this.$refs.saturation.renderSlide();
        this.$refs.hue.renderSlide();
      });
    },
    setText() {
      this.modelHex = this.hexString;
      this.modelRgba = this.rgbaStringShort;
    },
    setSelfColor(color) {
      this.setColorsHistory(color, "history");
      this.setColorsHistory(color, "historySelf");
    },
    selectColor(color) {
      this.setColorsHistory(color, "history");
      const { r, g, b, a, h, s, v } = this.setColorValue(color);
      Object.assign(this, { r, g, b, a, h, s, v });
      this.setText();
      this.colorsHistory =
        JSON.parse(localStorage.getItem(this.colorsHistoryKey)) || [];
      this.$nextTick(() => {
        this.$refs.saturation.renderColor();
        this.$refs.saturation.renderSlide();
        this.$refs.hue.renderSlide();
      });
    },
    selectColorSelf(flag) {
      this.colorsSelfShow = flag;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./mixin.scss";
.#{$prefix}-preview-diff {
  ::v-deep .#{$prefix}-canvas {
    height: 18px;
    width: 48px;
    margin-top: 0;
    margin-left: 0;
  }
}
.#{$prefix}-color-picker {
  padding: 24px;
  @include base-background();
  border-radius: 4px;
  z-index: 1;
  box-sizing: border-box;
  .#{$prefix}-color-picker-innder-box {
    @include base-inner-background();
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
    opacity: 1;
    border-radius: 1px;
    padding: 12px 16px;
  }
  .#{$prefix}-title {
    display: flex;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 20px;
    color: rgba(255, 255, 255, 1);
    opacity: 0.6;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    @include color-choose-self-title();
    .#{$prefix}-back {
      cursor: pointer;
      opacity: 0.8;
      width: 18px;
      height: 16px;
      background-size: 18px 16px;
    }
  }
  .#{$prefix}-color-hue-box {
    display: flex;
    margin-bottom: 8px;
  }
  .#{$prefix}-color-box {
    display: flex;
    margin-bottom: 8px;
  }
  canvas {
    vertical-align: top;
  }
  .#{$prefix}-color-alpha-box {
    margin-top: 16px;
    .#{$prefix}-color-alpha-text {
      text-align: left;
      height: 20px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      line-height: 20px;
      @include alpha-color();
      opacity: 0.6;
      margin-bottom: 8px;
    }
  }
}
</style>
