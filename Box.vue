<template>
  <div :class="prefix + '-color-type-box'">
    <div v-if="type !== 'limit'" :class="prefix + '-color-type'">
      <span :class="prefix + '-name'">{{ name }}</span>
      <input v-model="modelColor" :class="prefix + '-value'" />
    </div>
    <div v-if="type === 'limit'" :class="prefix + '-color-type'">
      <span :class="prefix + '-name'">{{ name }}</span>
      <input v-model="modelColorLimit" :class="prefix + '-value'" @input="change" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      modelColorLimit: (this.color * 1).mul(this.times),
      prefix: this.prefix,
    };
  },
  inject: ['prefix'],
  props: {
    name: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
    times: {
      type: Number,
      default: 1,
    },
    maxLimit: {
      type: Number,
      default: 1,
    },
    type: {
      type: String,
      default: "",
    },
  },
  watch: {
    color(val) {
      this.modelColorLimit = (val * 1).mul(this.times);
    },
  },
  methods: {
    change(e) {
      let a = e.target.value;
      if (a > this.maxLimit) a = this.maxLimit;
      if (a < 0 || typeof (a * 1) !== "number" || isNaN(a)) a = 0;
      let val = (a * 1).div(this.times);
      this.modelColorLimit = (a * 1).div(1);
      this.$emit("inputColor", val, this.name);
    },
  },
  computed: {
    modelColor: {
      get() {
        return this.color;
      },
      set(val) {
        this.$emit("inputColor", val, this.name);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import './mixin.scss';
.#{$prefix}-color-type-box {
  display: flex;
}
.#{$prefix}-color-type {
  display: flex;
  font-size: 12px;
  align-items: center;
  @include hex-box-background();
  .#{$prefix}-name {
    margin-right: 4px;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 18px;
    opacity: 1;
  }
  .#{$prefix}-value {
    flex: 1;
    height: 20px;
    width: 66px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 20px;
    padding: 0 6px;
    opacity: 1;
  }
}
</style>
