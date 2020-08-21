<template>
    <canvas :class="prefix + '-canvas'" @click="setSelfColor" title="调色后点击选择需要的颜色"></canvas>
</template>

<script>
import mixin from './mixin'
export default {
    mixins: [mixin],
    props: {
        color: {
            type: String,
            default: '#000000'
        },
        width: {
            type: Number,
            default: 20
        },
        height: {
            type: Number,
            default: 20
        }
    },
    inject: ["prefix"],
    data() {
        return {
            alphaSize: 5,
            prefix: this.prefix,
        }
    },
    watch: {
        color() {
            this.renderColor()
        }
    },
    mounted() {
        this.renderColor()
    },
    methods: {
        setSelfColor() {
            this.$emit("setSelfColor", this.color)
        },
        renderColor() {
            const canvas = this.$el
            const width = this.width
            const height = this.height
            const size = this.alphaSize
            const canvasSquare = this.createAlphaSquare(size)

            const ctx = canvas.getContext('2d')
            canvas.width = width
            canvas.height = height
            ctx.fillStyle = ctx.createPattern(canvasSquare, 'repeat')
            ctx.fillRect(0, 0, width, height)

            ctx.fillStyle = this.color
            ctx.fillRect(0, 0, width, height)
        }
    }
}
</script>

<style lang="scss" scoped>
@import './mixin.scss';
    .#{$prefix}-canvas {
        height: 20px;
        margin-top: 1px;
        margin-left: 8px;
        cursor: pointer;
        @include base-prev-canvas-border()
    }
</style>