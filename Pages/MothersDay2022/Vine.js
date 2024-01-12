class Vine {
    constructor(x, y, direction) {
        this.headpos = createVector(x, y)
        this.mainDirection = direction
        this.points = []
        this.age = 0
    }

    tick() {
        if (
            this.headpos
                .copy()
                .sub(createVector(width / 2, height / 2))
                .mag() >
            max(width, height) * 2
        ) {
            return
        }
        this.age += deltaTime
        let direction =
            this.mainDirection +
            sin(this.age * 0.3) * 0.7 +
            cos(this.age * 0.61 + 1) * 0.2
        let travel = createVector(cos(direction), sin(direction)).mult(
            deltaTime * 0.07
        )
        this.headpos.add(travel)
        this.points.push(this.headpos.copy())
    }

    draw() {
        noFill()
        strokeWeight(5)
        stroke(colVines)
        for (let i = 0; i < this.points.length - 1; i++) {
            line(
                this.points[i].x,
                this.points[i].y,
                this.points[i + 1].x,
                this.points[i + 1].y
            )
        }
    }
}
