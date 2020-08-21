export default {
    methods: {
        setColorsHistory(color, type = 'history') {
            if (!color) {
                return;
            }
            const keyAndData = {
                history: {
                    key: this.colorsHistoryKey,
                    colors: this.colorsHistory,
                    limit: 9
                },
                historySelf: {
                    key: this.colorsSelfHistoryKey,
                    colors: this.colorsSelfHistory,
                    limit: 8
                }
            }
            const colors = keyAndData[type]['colors'];
            const limit = keyAndData[type]['limit'];
            const index = colors.indexOf(color);
            if (index >= 0) {
                colors.splice(index, 1);
            }
            if (colors.length >= limit) {
                colors.length = limit - 1;
            }
            colors.unshift(color);
            localStorage.setItem(keyAndData[type]['key'], JSON.stringify(colors));
        },
        setColorValue(color) {
            const reg = new RegExp('^[a-zA-Z]{1,}$');
            let rgba = { r: 0, g: 0, b: 0, a: 1 }
            if (/#/.test(color)) {
                rgba = this.hex2rgba(color)
            } else if (/rgb/.test(color)) {
                rgba = this.rgb2rgba(color)
            } else if (typeof color === 'string' && !(reg.test(color))) {
                rgba = this.rgb2rgba(`rgba(${color})`)
            } else if (Object.prototype.toString.call(color) === '[object Object]') {
                rgba = color
            } else if (typeof color === 'string' && (reg.test(color))) {
                console.warn('暂无字典')
                return;
            }
            const { r, g, b, a } = rgba
            const { h, s, v } = this.rgb2hsv(rgba)
            return { r, g, b, a: a === undefined ? 1 : a, h, s, v }
        },
        showBgColor(color) {
            if (typeof color === 'string' && !(/#/.test(color)) && !(/rgb/.test(color))) {
                return `rgba(${color})`
            } else {
                return color
            }
        },
        createAlphaSquare(size) {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            const doubleSize = size * 2
            canvas.width = doubleSize
            canvas.height = doubleSize

            ctx.fillStyle = '#ffffff'
            ctx.fillRect(0, 0, doubleSize, doubleSize)
            ctx.fillStyle = '#ccd5db'
            ctx.fillRect(0, 0, size, size)
            ctx.fillRect(size, size, size, size)

            return canvas
        },
        createLinearGradient(direction, ctx, width, height, color1, color2) {
            // l 横向 p 纵向
            const isL = direction === 'l'
            const gradient = ctx.createLinearGradient(0, 0, isL ? width : 0, isL ? 0 : height)
            gradient.addColorStop(0.01, color2)
            gradient.addColorStop(0.99, color1)
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, width, height)
        },
        rgb2hex({ r, g, b }, toUpper) {
            const change = val => ('0' + Number(val).toString(16)).slice(-2)
            const color = `#${change(r)}${change(g)}${change(b)}`
            return toUpper ? color.toUpperCase() : color
        },
        hex2rgba(hex) {
            hex = hex.slice(1)
            if (hex.length === 2) hex = hex + hex + hex;
            if (hex.length === 3) hex = hex + hex;
            const change = val => parseInt(val, 16) || 0 // 避免NaN的情况
            return {
                r: change(hex.slice(0, 2)),
                g: change(hex.slice(2, 4)),
                b: change(hex.slice(4, 6)),
                a: 1
            }
        },
        rgb2rgba(rgba) {
            if (typeof rgba === 'string') {
                // 传入pink, '0,0,f,1'报错
                rgba = (/rgba?\((.*?)\)/.exec(rgba) || ['', '0,0,0,1'])[1].split(',')
                return {
                    r: Number(rgba[0]) || 0,
                    g: Number(rgba[1]) || 0,
                    b: Number(rgba[2]) || 0,
                    a: Number(rgba[3] ? rgba[3] : 1) // 避免为0的情况
                }
            } else {
                return rgba
            }
        },
        rgb2hsv({ r, g, b }) {
            r = r / 255
            g = g / 255
            b = b / 255
            const max = Math.max(r, g, b)
            const min = Math.min(r, g, b)
            const delta = max - min
            let h = 0
            if (max === min) {
                h = 0
            } else if (max === r) {
                if (g >= b) {
                    h = (60 * (g - b)) / delta
                } else {
                    h = (60 * (g - b)) / delta + 360
                }
            } else if (max === g) {
                h = (60 * (b - r)) / delta + 120
            } else if (max === b) {
                h = (60 * (r - g)) / delta + 240
            }
            h = Math.floor(h)
            let s = parseFloat((max === 0 ? 0 : 1 - min / max).toFixed(2))
            let v = parseFloat(max.toFixed(2))
            return { h, s, v }
        }
    }
}
