function render() {
    background(255)
    drawSky()
    drawSea()
    drawBoat(w * 0.7 , h * 0.78 , 0.35 * baseUnit)
    drawLand(w * -0.1, h * 0.6, 0.7 * baseUnit)
    drawLightHouse()
    drawStars()
    image(imgNoiseTexture, 0, 0)
    drawMessage("Thanks for", width * 0.1, height * 0.1, width * 0.04)
    drawMessage('looking out for me', width * 0.18, height * 0.14, width * 0.04)
    drawMessage('love, Peter', width * 0.32, height * 0.2, width * 0.03)
    drawFrame()
}

function mouseClicked() {
    console.log(mouseX, mouseY)
}

const stars = [
    {
        x: 36,
        y: 92,
        twinkleSpeedModifier: 1.3,
        twinkleOffsetModifier: 1
    },
    {
        x: 123,
        y: 79,
        twinkleSpeedModifier: 1.4,
        twinkleOffsetModifier: 9
    },
    {
        x: 182,
        y: 131,
        twinkleSpeedModifier: 1,
        twinkleOffsetModifier: 3
    },
    {
        x: 264,
        y: 174,
        twinkleSpeedModifier: 1.5,
        twinkleOffsetModifier: 2
    },
    {
        x: 274,
        y: 246,
        twinkleSpeedModifier: 1.9,
        twinkleOffsetModifier: 7
    },
    {
        x: 372,
        y: 271,
        twinkleSpeedModifier: 0.8,
        twinkleOffsetModifier: 6
    },
    {
        x: 448,
        y: 212,
        twinkleSpeedModifier: 0.7,
        twinkleOffsetModifier: -1
    },
]

const baseTwinkleSpeed = 0.001;
const twinkleOffsetModifierMultiplier = 10;

function drawStars() {
    stars.forEach((star) => {
        const alpha = map(noise(t * baseTwinkleSpeed * star.twinkleSpeedModifier + twinkleOffsetModifierMultiplier * star.twinkleOffsetModifier), 0, 1, -50, 300)
        fill(255, alpha)
        circle(star.x * baseUnit, star.y * baseUnit, baseUnit * 5)
    })
}

function drawLightHouse() {
    noStroke()
    fill(0)
    rect(baseUnit * 240, baseUnit * 458, baseUnit * 8, baseUnit * 20, baseUnit * 2)

    const blinkSpeed = 0.001;
    const brightness = map(((sin(blinkSpeed * t) + 1) * 0.5) ** 2, 0, 1, 0, 255)

    // draw light haze
    skyColLight.setAlpha(brightness * 0.6)
    fill(skyColLight)
    skyColLight.setAlpha(255)
    circle(baseUnit * 244, baseUnit * 462, baseUnit * 60)

    // draw Light point
    fill(255, brightness)
    circle(baseUnit * 244, baseUnit * 462, baseUnit * 6)
}

function drawLand(x, y, scaleAmt) {
    push()
    translate(x, y)
    image(landImg, 0, 0, landImg.width * scaleAmt, landImg.height * scaleAmt);
    pop()
}

function drawSky() {
    noStroke()

    const darkCutoffY = h * 0.3
    // dark top
    fill(skyColDark)
    rect(0, 0, w, darkCutoffY)   
    
    const lightY = darkCutoffY + (horizonY - darkCutoffY) * 0.8
    //gradient dark to light
    drawVerticalGradient(darkCutoffY, lightY, skyColDark, skyColLight)

    // gradient light to red
    drawVerticalGradient(lightY, horizonY, skyColLight, skyColRed)

}

function drawSea() {
    const darkCutoffY = horizonY + (h - horizonY) * 0.3
    drawVerticalGradient(horizonY, darkCutoffY, colSeaLight, colSea)
    fill(colSea)
    rect(0, darkCutoffY, w, h)
}

function drawBoat(x, y, scaleAmt) {
    const ROCK_AMOUNT = PI * 0.006
    const ROCK_SPEED = 0.0018
    const BOB_SPEED = ROCK_SPEED
    const BOB_AMOUNT = 2 * baseUnit

    const angle = map(sin(t * ROCK_SPEED), -1, 1, -ROCK_AMOUNT, ROCK_AMOUNT)
    const bob = map(cos(t * BOB_SPEED), -1, 1, 0, BOB_AMOUNT)

    const MOORING_LINE_LENGTH = 50 * baseUnit

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
    strokeWeight(2)
    const yLower = min(y1, y2)
    const yHigher = max(y1, y2)

    for (var y = yLower; y <= yHigher; y++) {
        const x = map(y, yLower, yHigher, 0, 1)
        const color = lerpColor(color1, color2, x)
        stroke(color)
        line(0, y, width, y)
    }
}

var waveSpeed = 0.023
var counter = 0

function drawMessage(message, x,  y, size) {
    push()
    translate(x, 0)
    noStroke()
    let letterSpace = size * 0.7
    textFont('serif', size)
    fill(skyColLight)
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
    pop()
}

var waveSpeed = 0.001

function letter(c, x, y, i, randomAmount) {
    let letterSpeed = waveSpeed * 0.2
    let posX = x + noise(t * letterSpeed, i * 5) * randomAmount
    let posY = y + noise(t * letterSpeed, -i * 7) * randomAmount
    let angleVariance = randomAmount * 0.02
    let theta = map(
        noise(t * letterSpeed, i * 13),
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
