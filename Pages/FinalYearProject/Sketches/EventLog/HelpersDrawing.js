function render() {
    background(255)
    fill(colBackground)
    rect(0, 0, width, height)
    drawLog()
    image(imgNoiseTexture, 0, 0)
    drawFrame()
}

function drawLog() {
    // font formatting
    fill(colLog)
    noStroke()
    txtSize = width / 30
    textFont('monospace', txtSize)

    let numToPrint = 20

    for (let i = 0; i < min(numToPrint, eventLog.length); i++) {
        text(
            eventLog[eventLog.length - 1 - i],
            width / 11,
            height - (width / 11 + i * txtSize * 1.3)
        )
    }
}
