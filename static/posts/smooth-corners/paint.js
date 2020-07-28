registerPaint('smooth-corners', class {
    static get inputProperties() {
        return ['--smooth-corners']
    }

    superecllipse(a, b, n) {
        const n2 = 2 / n
        const steps = 64
        const step = (2 * Math.PI) / steps
        const points = t => {
            const cosT = Math.cos(t)
            const sinT = Math.sin(t)
            return {
                x: Math.abs(cosT) ** n2 * a * Math.sign(cosT),
                y: Math.abs(sinT) ** n2 * b * Math.sign(sinT)
            };
        };
        return Array.from({ length: steps }, (_, i) => points(i * step))
    }

    paint(ctx, geom, properties) {
        const m = properties.get("--smooth-corners").toString() || 4
        let n = m
        if (m > 100) n = 100
        if (m < 0.00000000001) n = 0.00000000001

        const width = geom.width / 2
        const height = geom.height / 2
        const smooth = this.superecllipse(width, height, n)

        ctx.fillStyle = "black"
        ctx.setTransform(1, 0, 0, 1, width, height)
        ctx.beginPath()

        for (let i = 0; i < smooth.length; i++) {
            const { x, y } = smooth[i]
            if (i === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
        }

        ctx.closePath()
        ctx.fill()
    }
})
