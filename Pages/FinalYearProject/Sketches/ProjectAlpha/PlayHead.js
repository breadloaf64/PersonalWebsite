class PlayHead {
    constructor() {
        this.playSpeed = 0.0003
        this.position = 0 // 0 to 1

        this.boxX = capSquareX
        this.boxY = capSquareY
        this.boxL = capSquareL
    }

    setBox(x, y, l) {
        this.boxX = x
        this.boxY = y
        this.boxL = l
    }

    advance() {
        this.position += this.playSpeed * deltaTime
        this.contrainPosition()
    }

    contrainPosition() {
        while (this.position < 0) {
            this.position++
        }
        while (this.position >= 1) {
            this.position--
        }
    }

    draw() {
        stroke(colPlayHead)
        strokeWeight(3)

        let x = map(this.position, 0, 1, this.boxX, this.boxX + this.boxL)
        line(x, this.boxY, x, this.boxY + this.boxL)
    }
}
