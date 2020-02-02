registerPaint('smooth-corners', class {
    static get inputProperties() {
        return [
            '--smooth-corners'
        ]
    }
    paint(ctx, geom, properties) {
        const c = properties.get('--smooth-corners').toString()

        ctx.fillStyle = 'black'

        const n = c
        let m = n
        if (n > 100) m = 100
        if (n < 0.00000000001) m = 0.00000000001
        
        const a = geom.width / 2 // horizontal axis parameter
        const b = geom.height / 2 // vertical axis parameter

        ctx.beginPath();

        // i < 1 for subpixel rendering
        for (let i = -a; i < (a+0.125); i+=0.125) {
            const x = i+a
            const y = (Math.pow(Math.abs(Math.pow(b,m)-Math.pow(Math.abs(i*b/a),m)),1/m)) + b

            if (i == -a)
                ctx.moveTo(x, y)
            else
                ctx.lineTo(x, y)
        }

        for (let i = (a); i > (-a); i-=0.125) {
            const x = i+a
            // const y = (-Math.pow(Math.abs(Math.pow(ax,m)-Math.pow(Math.abs(3*ax-i),m)),1/m)) + ay
            const y = (-Math.pow(Math.abs(Math.pow(b,m)-Math.pow(Math.abs(i*b/a),m)),1/m)) + b
            ctx.lineTo(x, y)
        }

        ctx.closePath()
        ctx.fill()
    }
})
