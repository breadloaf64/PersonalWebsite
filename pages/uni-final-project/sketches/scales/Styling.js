var imgNoiseTexture

var colFrame
var colBackground
var colReadouts
var colDegreeButtonBorder
var colDegreeButtonFillOn
var colDegreeButtonFillOff
var colPitchMarker
var colPauseButtonBorder
var colPauseButton
var colPauseButtonText

function setColours() {
    colFrame = color('#6b705c')
    colBackground = color('#ffe8d6')
    colReadouts = color('#cb997e')
    colDegreeButtonBorder = color('#cb997e')
    colDegreeButtonFillOn = color('#ddbea9')
    colDegreeButtonFillOff = color('#ffe8d6')
    colPitchMarker = color('#cb997e')

    colPauseButtonBorder = color(0, 0)
    colPauseButton = color('#cb997e')
    colPauseButton.setAlpha(100)
    colPauseButtonText = color('#6b705c')
}

function setNoiseTexture() {
    let amount = 0.2
    let img = createImage(int(width), int(height))
    img.loadPixels()
    for (let i = 0; i < img.width; i++) {
        for (let j = 0; j < img.height; j++) {
            if (random(1) < amount) {
                img.set(i, j, color(random(255), 15))
            } else {
                img.set(i, j, color(0, 0))
            }
        }
    }
    img.updatePixels()
    imgNoiseTexture = img
}

function drawFrame() {
    strokeWeight(30)
    stroke(colFrame)
    noFill()
    rect(0, 0, width, height)
}

function myStandardSetup() {
    setCanvas()
    createMetaTag()
    setColours()
    setNoiseTexture()
}

function setCanvas() {
    if (embeddedOnWebsite) {
        // Move the canvas so it’s inside our <div id="sketch-holder">.
        let canvas = createCanvas(100, 100)

        try {
            canvas.parent('sketch-holder')
        } catch {}
        windowResized()
    } else {
        let size = min(windowWidth, windowHeight) * 0.8
        createCanvas(size, size)
    }
}

function makePauseButton() {
    let btnHeight = height * 0.04
    let btnWidth = (btnHeight * 7) / 2
    let text = 'pause'
    btnPause = new Button(
        width - btnWidth - 20,
        height - btnHeight - 20,
        btnWidth,
        btnHeight,
        pauseUnpause,
        text
    )
}
