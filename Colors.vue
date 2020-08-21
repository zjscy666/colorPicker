<template>
  <div :class="prefix + '-colors-box'">
    <div :class="prefix + '-text'" v-if="text">{{text}}</div>
    <ul :class="prefix + '-colors'" v-if="colorsDefaultShow">
      <li
        v-for="item in colorsDefault.filter(v => !(typeof v === 'string' && (new RegExp('^[a-zA-Z]{1,}$').test(v)))).map(showBgColor)"
        :key="item"
        :class="prefix + '-item'"
        @click="selectColor(item)"
      >
        <div :style="{ background: item }" :class="prefix + '-color'" />
      </li>
    </ul>
    <ul v-if="colorsHistoryKeyShow" :class="prefix + '-colors ' + prefix + '-history'">
      <li v-for="item in colorsHistory" :key="item" :class="prefix + '-item'" @click="selectColor(item)">
        <div :style="{ background: item }" :class="prefix + '-color'" />
      </li>
    </ul>
    <ul v-if="colorsSelfShow" :class="prefix + '-colors ' + prefix + '-history'">
      <li v-for="item in colorsSelf" :key="item" :class="prefix + '-item'" @click="selectColor(item)">
        <div :style="{ background: item }" :class="prefix + '-color'" />
      </li>
      <li :class="prefix + '-item'" @click="selectColorSelf(true)">
        <div :style="{ background: '#999' }" :class="prefix + '-color ' + prefix + '-add'">
          <span>+</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import mixin from "./mixin";
export default {
  mixins: [mixin],
  props: {
    colorsDefault: {
      type: Array,
      default: () => [],
    },
    colorsDefaultShow: {
      type: Boolean,
      default: false,
    },
    colorsHistoryKeyShow: {
      type: Boolean,
      default: false,
    },
    colorsSelfShow: {
      type: Boolean,
      default: false,
    },
    colorsSelf: {
      type: Array,
      default: () => [],
    },
    text: {
      type: String,
      default: "",
    },
    colorsHistory: {
      type: Array,
      default: () => [],
    }
  },
  inject: ['prefix'],
  data() {
    return {
      prefix: this.prefix,
    };
  },
  methods: {
    selectColorSelf(flag) {
      this.$emit("selectColorSelf", flag);
    },
    selectColor(color) {
      this.$emit("selectColor", color);
    },
  },
};
</script>

<style lang="scss" scoped>
@import './mixin.scss';
.#{$prefix}-colors-box {
  margin-top: 16px;
}
.#{$prefix}-text {
  text-align: left;
  height: 20px;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  line-height: 20px;
  @include alpha-color();
  opacity: 0.6;
}
.#{$prefix}-colors {
  padding: 0;
  margin: 0;
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  @include color-choose-bg();
  &.#{$prefix}-history {
    margin-top: 8px;
  }
  .#{$prefix}-item {
    position: relative;
    width: 9.1%;
    padding: 4.55% 0;
    margin: 1%;
    border-radius: 3px;
    box-sizing: border-box;
    vertical-align: top;
    display: inline-block;
    transition: all 0.1s;
    cursor: pointer;
    &:hover {
      transform: scale(1.4);
    }
    .#{$prefix}-color {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    .#{$prefix}-add {
      text-align: center;
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        line-height: 1;
      }
    }
  }
}
</style>