class Flower {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.maxR = (random(1) + 2) * width * 0.02
        this.r = 0
        this.petalCount = 10
        this.age = 0
        this.ageSpeed = 0.002
        this.rot = 0
    }

    tick() {
        this.age += deltaTime
        this.r =
            this.maxR * sin(min(this.age * this.ageSpeed, PI * 0.65)) +
            this.maxR *
                -0.08 *
                sin(max(0, this.age * this.ageSpeed - PI * 0.65))
        this.rot = sin(this.age * this.ageSpeed * 0.3) * 0.1
    }

    draw() {
        this.drawPetals()
        noStroke()
        fill(colFlowerMiddle)
        circle(this.x, this.y, this.r)
    }

    drawPetals() {
        noStroke()
        fill(colFlowerPetals)
        for (let i = 0; i < this.petalCount; i++) {
            petal(
                this.x,
                this.y,
                (i * PI * 2) / this.petalCount + this.rot,
                this.r,
                this.r * 0.3
            )
        }
    }
}
