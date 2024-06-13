function render() {
    background(255)
    drawSky()
    drawSea()
    drawBoat(width * 0.6, height * 0.55, 0.35)
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
    push()
    translate(x, y)
    scale(scaleAmt)
    image(boatImg, 0, 0)
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
