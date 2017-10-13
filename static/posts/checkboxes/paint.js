registerPaint('checkbox', class {
    static get inputProperties() {
        return [
            '--checkbox-tick-color'
        ];
    }
    paint(ctx, geom, properties) {
        let colorTick = properties.get('--checkbox-tick-color');
        this.size = Math.min(geom.width, geom.height);
        this.tick(ctx, colorTick);
    }

    tick(ctx, colorTick) {
        ctx.lineWidth = this.calcTickLineThickness();

        ctx.beginPath();
        ctx.moveTo(this.perc(18.5), this.perc(49.5));
        ctx.lineTo(this.perc(38.5), this.perc(69));
        ctx.lineTo(this.perc(81), this.perc(26.5));

        ctx.strokeStyle = colorTick;
        ctx.stroke();
    }

    perc(percentage) {
        let proportion = this.size / 100;
        return proportion * percentage;
    }

    calcTickLineThickness() {
        let maxThick = 10;
        let maxSize = 75;

        if (this.size >= maxSize) {
            let fixThickness = maxThick;
            return fixThickness;
        } else {
            let proportinateThickness = maxThick * this.size / maxSize;
            return proportinateThickness < 1 ? 1 : proportinateThickness;
        }
    }
});