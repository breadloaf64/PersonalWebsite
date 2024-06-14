var imgNoiseTexture

var skyColDark
var skyColLight
var skyColRed

function setColours() {
    skyColDark = color("#202e53")
    skyColLight = color("#d5b79f")
    skyColRed = color("#ce6a6c")
    colSeaLight = color("#4e4091")
    colSea = skyColDark
}

function setNoiseTexture() {
    let amount = 0.2 * baseUnit
    let img = createImage(int(width), int(height))
    img.loadPixels()
    for (let i = 0; i < img.width; i++) {
        for (let j = 0; j < img.height; j++) {
            if (random(1) < amount) {
                img.set(i, j, color(random(255), 50))
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
    stroke(0)
    noFill()
    rect(0, 0, width, height)
}

function myStandardSetup() {
    setCanvas()
    createMetaTag()
    setNoiseTexture()
    pixelDensity(1)
    setColours()
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
        w = size
        h = size
    }
}
