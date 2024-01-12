function render() {
    background(colBackground)
    drawPitchMarker()
    drawNotePositions()
    drawButtons()
    drawReadouts()
    drawPauseButton()
    drawPauseScreen()
    image(imgNoiseTexture, 0, 0)
    drawFrame()
}

function drawPauseButton() {
    if (!paused) {
        noStroke()
        txtSize = width / 30
        textFont('monospace', txtSize)
        btnPause.draw()
    }
}

function drawButtons() {
    // font formatting
    fill(colPauseButtonText)
    noStroke()
    txtSize = width / 30
    textFont('monospace', txtSize)
    //textStyle(BOLD);

    btnArrScaleDegrees.draw()
}

function drawNotePositions() {
    strokeWeight(6)

    for (let i = minNote; i <= maxNote; i++) {
        let yOffset = 0
        if (userScale.notes.includes(i)) stroke(colDegreeButtonBorder)
        else {
            stroke(colDegreeButtonFillOn)
            yOffset = 10
        }
        let x = width * frequencyToProp(noteToFrequency(i))
        point(x, height * 0.57 + yOffset)
    }
}

function drawPitchMarker() {
    stroke(colPitchMarker)
    strokeWeight(2)
    let x = frequencyToProp(frequency) * width
    line(x, 0, x, height)
}

function drawReadouts() {
    // font formatting
    fill(colReadouts)
    noStroke()
    txtSize = width / 30
    textFont('monospace', txtSize)
    //textStyle(BOLD);

    let txtNote = getNoteText()
    let txtFrequency = frequency.toFixed(2)
    let txtVolume = (volume * 100).toFixed(2)

    text('Note: ' + txtNote, 20, height - 20 - 2 * txtSize)
    text('Frequency: ' + txtFrequency + ' Hz', 20, height - 20 - txtSize)
    text('Volume: ' + txtVolume + ' %', 20, height - 20)
}

function getNoteText() {
    return noteIndexToText(frequencyToNote(frequency))
}

function drawPauseScreen() {
    if (paused) {
        // tint background darker
        noStroke()
        fill(0, 0, 0, 100)
        rect(0, 0, width, height)

        fill(255)

        // draw instruction
        txtSize = width / 12
        textFont('monospace', txtSize)
        let instruction = 'tap/click to play'
        txtWidth = textWidth(instruction)
        text('tap/click to play', (width - txtWidth) / 2, height * 0.5)
    }
}
