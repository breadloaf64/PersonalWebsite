var imgNoiseTexture

var colFrame
var colBackground
var colButton
var colButtonBorder
var colButtonText
var colReadout
var colGrid
var colPlayHead
var colVoice

function setColours() {
    colFrame = color('#8E7DBE')
    colBackground = color('#f1e3d3')

    colButtonBorder = color(0, 0)
    colButton = color('#99c1b9')
    colButton.setAlpha(100)
    colButtonText = color('#000000')

    colReadout = color('#000000')
    colGrid = color('#f2d0a9')
    colPlayHead = color('#D88C9A')
    colVoice = color('#99c1b9')
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

function makeButtons() {
    // pause button
    let btnHeight = height * 0.04
    let btnWidth = (btnHeight * 7) / 2
    btnPause = new Button(
        width - btnWidth - 20,
        height - btnHeight - 20,
        btnWidth,
        btnHeight,
        pauseUnpause,
        'pause'
    )

    // quantise button
    btnQuantise = new Button(
        20,
        height - btnHeight - 20,
        btnWidth * 1.3,
        btnHeight,
        changeQuantisation,
        'quantise'
    )

    // clear button
    btnClear = new Button(
        width - btnWidth - 20,
        height - btnHeight * 2.2 - 20,
        btnWidth,
        btnHeight,
        clearVoices,
        'clear'
    )
}
