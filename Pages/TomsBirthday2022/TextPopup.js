class TextPopup {
    constructor(pos, text, size, maxAge) {
        this.pos = pos.copy()
        this.text = text
        this.size = size

        this.age = 0
        this.maxAge = maxAge
        this.expired = false

        this.riseSpeed = u * 0.5 // world units per millisecond
    }

    update() {
        this.age += deltaTime
        this.pos.add(createVector(0, -this.riseSpeed))
    }

    draw() {
        noStroke()
        fill(0, map(this.age, 0, this.maxAge, 255, 0))
        textFont(font_pixel, this.size)
        textAlign(CENTER, CENTER)
        text(this.text, this.pos.x, this.pos.y)
    }
}
