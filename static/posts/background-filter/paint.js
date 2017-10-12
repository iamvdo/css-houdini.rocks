registerPaint('background-filter', class {
    static get inputProperties() {
        return [
            'list-style-image',
            '--background-filter'
        ]
    }
    paint(ctx, geom, properties) {
        let image = properties.get('list-style-image')
        let filters = properties.get('--background-filter').toString()

        ctx.filter = filters

        // draw image
        ctx.drawImage(image, 0, 0, geom.width, geom.height)
    }
})