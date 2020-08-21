<template>
  <div :class="prefix + '-rgba-box'">
    <Box name="#" :color="hex" @inputColor="inputHex" />
  </div>
</template>

<script>
import Box from "./Box.vue";
export default {
  components: {
    Box,
  },
  inject: ["prefix"],
  data() {
    return {
      prefix: this.prefix,
    };
  },
  props: {
    color: {
      type: String,
      default: "",
    },
  },
  methods: {
    inputHex(color, name) {
      const val = name + color;
      this.$emit("inputColor", val);
    },
  },
  computed: {
    hex: function () {
      return this.color.split("#")[1];
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./mixin.scss";
.#{$prefix}-rgba-box {
  display: flex;
  flex-wrap: wrap;
}
</style>
