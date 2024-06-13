function render() {
    background(255)
    drawSky()
    drawSea()
    drawBoat(width * 0.7, height * 0.75, 0.35)
    // drawMessage("happy father's day", height * 0.8, width * 0.05)
    // drawMessage('love, peter', height * 0.9, width * 0.03)
    image(imgNoiseTexture, 0, 0)
    drawFrame()
}

function drawSky() {
    noStroke()

    const darkCutoffY = height * 0.3

    // dark top
    fill(skyColDark)
    rect(0, 0, width, darkCutoffY)   
    
    //gradient
    drawVerticalGradient(darkCutoffY, horizonY, skyColDark, skyColLight)
}

function drawSea() {
    rect(0, horizonY, width, height)
}

function drawBoat(x, y, scaleAmt) {
    const ROCK_AMOUNT = PI * 0.003
    const ROCK_SPEED = 0.0015
    const BOB_SPEED = ROCK_SPEED
    const BOB_AMOUNT = 2

    const angle = map(sin(t * ROCK_SPEED), -1, 1, -ROCK_AMOUNT, ROCK_AMOUNT)
    const bob = map(cos(t * BOB_SPEED), -1, 1, 0, BOB_AMOUNT)

    const MOORING_LINE_LENGTH = 50

    stroke(0)
    strokeWeight(4)

    push()
    translate(x, y + bob)
    line(-boatImg.width * scaleAmt * 0.5, 0, -boatImg.width * scaleAmt * 0.5-MOORING_LINE_LENGTH, MOORING_LINE_LENGTH)
    rotate(angle - 0.05)
    image(boatImg, -boatImg.width * 0.5 * scaleAmt, -boatImg.height * 0.7 * scaleAmt, boatImg.width * scaleAmt, boatImg.height * scaleAmt)
    pop()
   
}

function drawVerticalGradient(y1, y2, color1, color2) {
    const yLower = min(y1, y2)
    const yHigher = max(y1, y2)

    const difference = yHigher - yLower

    for (var y = yLower; y <= yHigher; y++) {
        const t = (y - yLower) / difference
        const color = lerpColor(color1, color2, t)
        stroke(color)
        line(0, y, width, y)
    }
}

var waveSpeed = 0.023
var counter = 0

function drawMessage(message, y, size) {
    noStroke()
    let letterSpace = size * 0.7
    textFont('serif', size)
    fill(0)
    let messageWidth = letterSpace * message.length

    for (var x = 0; x < message.length; x++) {
        var c = message.charAt(x)
        letter(
            c,
            width / 2 - messageWidth / 2 + x * letterSpace,
            y,
            x,
            (2 * size) / 20
        )
    }
}

function letter(c, x, y, i, randomAmount) {
    let letterSpeed = waveSpeed * 0.2
    let posX = x + noise(counter * letterSpeed, i * 5) * randomAmount
    let posY = y + noise(counter * letterSpeed, -i * 7) * randomAmount
    let angleVariance = randomAmount * 0.02
    let theta = map(
        noise(counter * letterSpeed, i * 13),
        0,
        1,
        -angleVariance,
        angleVariance
    )

    push()
    translate(posX, posY)
    rotate(theta)
    text(c, 0, 0)
    pop()
}

var cleared = false
var instructionAlpha = 255

function drawInstructions() {
    noStroke()
    if (cleared) instructionAlpha -= 5
    fill(0, instructionAlpha)
    textFont('serif', width / 20)
    textAlign(CENTER, TOP)
    text('click to rain', width / 2, height * 0.05)
}
