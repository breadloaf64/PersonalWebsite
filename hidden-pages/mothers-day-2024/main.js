let squareWidth = 1000
let t = 0
var margin

var stitch

function setup() {
    squareWidth = min(windowWidth, windowHeight)
    createCanvas(squareWidth, squareWidth)
    s = (squareWidth / 455) * 100
    imgNoiseTexture = generateNoiseTexture()
    console.log(`width ${width}, height ${height}, squareWidth ${squareWidth}`)
    margin = createVector(0, 0)
    makeHeartPoints()
    stitch = new Stitch()
}

function draw() {
    t++
    stitch.tick()
    render()
}

function render() {
    background('#dde5b6')
    image(imgNoiseTexture, 0, 0)

    label()
    labelStitches()

    drawMessage(
        'happy mothers day',
        height * 0.85,
        min(squareWidth, height) * 0.07
    )

    stitch.draw()

    noiseLayer()
}

function noiseLayer() {
    const NUM_PIXELS = 1000
    strokeWeight(1)
    stroke(0, 100)
    for (let i = 0; i < NUM_PIXELS; i++) {
        const x = random(width)
        const y = random(height)
        point(x, y)
    }
}

function label() {
    fill('#adc178')
    noStroke()

    beginShape()
    vertex(width * 0.052, height * 0.753) // tl
    vertex(width * 0.059, height * 0.931) // bl
    vertex(width * 0.3, height * 0.92)
    vertex(width * 0.955, height * 0.932) // br
    vertex(width * 0.954, height * 0.751) // tr
    vertex(width * 0.7, height * 0.74)
    endShape(CLOSE)
}

function labelStitches() {
    drawingContext.setLineDash([10, 10])
    noFill()
    stroke('#6c584c')

    beginShape()
    vertex(width * 0.06, height * 0.763) // tl
    vertex(width * 0.069, height * 0.921) // bl
    vertex(width * 0.3, height * 0.91)
    vertex(width * 0.945, height * 0.922) // br
    vertex(width * 0.944, height * 0.761) // tr
    vertex(width * 0.69, height * 0.75)
    endShape(CLOSE)

    drawingContext.setLineDash([])
}

const heartPoints = []
const heartPointsAsRatio = []

function makeHeartPoints() {
    const asRatioArray = [
        [0.5043936731107206, 0.5782073813708261],
        [0.47627416520210897, 0.5377855887521968],
        [0.44639718804920914, 0.4956063268892794],
        [0.39718804920913886, 0.44991212653778556],
        [0.3532513181019332, 0.4024604569420035],
        [0.351493848857645, 0.30755711775043937],
        [0.4077328646748682, 0.2513181019332162],
        [0.4780316344463972, 0.24956063268892795],
        [0.5202108963093146, 0.28822495606326887],
        [0.5377855887521968, 0.3251318101933216],
        [0.5852372583479789, 0.27240773286467485],
        [0.6432337434094904, 0.2530755711775044],
        [0.7100175746924429, 0.27943760984182775],
        [0.7100175746924429, 0.335676625659051],
        [0.687170474516696, 0.37785588752196836],
        [0.616871704745167, 0.437609841827768],
        [0.5659050966608085, 0.47451669595782076],
        [0.539543057996485, 0.5184534270650264],
        [0.5026362038664324, 0.5746924428822495],
    ]

    asRatioArray.forEach((pointArr) =>
        heartPoints.push(
            createVector(pointArr[0] * width, pointArr[1] * height)
        )
    )
}

class Stitch {
    // appearance
    threadLength = 5
    stitchLength = (width / 569) * 15

    // movement
    position = heartPoints[0] ?? createVector(width / 2, height / 2)
    maxSpeed = 1.5
    target = createVector(width / 2, height / 2)

    //trail
    stitchPoints = []

    drawHeart = true
    nextHeartPoint = 0

    constructor() {
        this.stitchPoints.push(this.position.copy())
    }

    draw() {
        noFill()
        strokeWeight(2)
        stroke('#6c584c')

        fill(0)
        circle(this.position.x, this.position.y, 10)

        this.drawTrail()
    }

    drawTrail() {
        for (let i = 0; i < floor(this.stitchPoints.length / 2); i++) {
            const p1 = this.stitchPoints[2 * i]
            const p2 = this.stitchPoints[2 * i + 1]
            line(p1.x, p1.y, p2.x, p2.y)
        }
    }

    tick() {
        // movement
        if (this.drawHeart) {
            if (
                this.position
                    .copy()
                    .sub(heartPoints[this.nextHeartPoint])
                    .mag() < this.stitchLength
            )
                this.nextHeartPoint++
            if (this.nextHeartPoint >= heartPoints.length)
                this.drawHeart = false
            else this.target = heartPoints[this.nextHeartPoint]
        } else if (mouseIsPressed) this.target = createVector(mouseX, mouseY)

        const movementDirection = this.target.copy().sub(this.position)
        const movementAmount = min(this.maxSpeed, movementDirection.mag())

        const movement = movementDirection.copy().setMag(movementAmount)

        this.position.add(movement)

        // trail
        const distanceFromPrevStitchPoint = this.position
            .copy()
            .sub(this.stitchPoints[this.stitchPoints.length - 1])
            .mag()
        if (distanceFromPrevStitchPoint > this.stitchLength) {
            this.stitchPoints.push(this.position.copy())
        }
    }

    trimTrail() {
        while (this.trail.length > 100) {
            this.trail.splice(0, 1)
        } // this could be written better
    }
}
