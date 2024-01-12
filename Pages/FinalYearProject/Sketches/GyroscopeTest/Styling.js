var imgNoiseTexture

var colFrame
var colBackground
var colPauseButtonBorder
var colPauseButton
var colReadouts
var colPauseButtonText

function setColours() {
    colFrame = color('#000000')
    colBackground = color('#ffffff')

    colPauseButtonBorder = color(0)
    colPauseButton = color('#ffffff')
    colPauseButton.setAlpha(255)
    colPauseButtonText = color(0)

    colReadouts = color(0)
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
        text,
        colPauseButton,
        colPauseButtonBorder,
        colPauseButtonText
    )
}
