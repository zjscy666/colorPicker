<template>
  <div :class="prefix + '-rgba-box'">
    <Box name="R" :color="r" :maxLimit="255" type="limit" @inputColor="inputHex" />
    <Box name="G" :color="g" :maxLimit="255" type="limit" @inputColor="inputHex" />
    <Box name="B" :color="b" :maxLimit="255" type="limit" @inputColor="inputHex" />
    <Box name="A" :color="a" :maxLimit="100" type="limit" :times="100" @inputColor="inputHex" />
  </div>
</template>

<script>
import Box from "./Box.vue";
export default {
  components: {
    Box,
  },
  props: {
    color: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      prefix: this.prefix,
    };
  },
  inject: ["prefix"],
  methods: {
    inputHex(color, name) {
      const obj = {
        R: this.r,
        G: this.g,
        B: this.b,
        A: this.a,
      };
      const newObj = {
        ...obj,
        ...{
          [name]: color,
        },
      };
      const val = Object.keys(newObj)
        .map((key) => newObj[key])
        .join(",");
      this.$emit("inputColor", val);
    },
  },
  computed: {
    r: function () {
      return this.color.split(",")[0];
    },
    g: function () {
      return this.color.split(",")[1];
    },
    b: function () {
      return this.color.split(",")[2];
    },
    a: function () {
      return this.color.split(",")[3];
    },
  },
};
</script>

<style lang="scss" scoped>
@import './mixin.scss';
.#{$prefix}-rgba-box {
  display: flex;
  flex-wrap: wrap;
  margin-top: 14px;
  ::v-deep {
    .#{$prefix}-color-type-box {
      margin-bottom: 8px;
      &:nth-child(3n) {
        margin-right: 0;
      }
      width: 27%;
      margin-right: 9.5%;
      .#{$prefix}-name {
        margin-right: 4%;
      }
      .#{$prefix}-value {
        width: 100%;
        // flex: 1;
        margin-right: 0;
      }
    }
  }
}
</style>
