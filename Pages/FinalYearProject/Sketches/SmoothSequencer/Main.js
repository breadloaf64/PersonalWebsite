var counter = 0

var btnPause
var paused = true

var currentMouseX = 0
var currentMouseY = 0
var prevMouseIsPressed = false // counts if finger is pressed too

function preload() {
    preloadSound()
}

function setup() {
    myStandardSetup()
    initialiseSequence()
}

function keyPressed() {
    if (key == ' ' || key == 'p') {
        //this means space bar, since it is a space inside of the single quotes
        pauseUnpause()
    }
}

function mousePressed() {
    if (
        embeddedOnWebsite &&
        (mouseX < 0 || width < mouseX || mouseY < 0 || height < mouseY)
    ) {
        // if on a website, don't register the click if it's off the sketch
        return
    }

    if (paused) pauseUnpause()
    btnPause.tryClick()
}

function pauseUnpause() {
    paused = !paused
    if (paused) {
        sine.stop()
    } else {
        sine.loop()
        handleCurrentMouse()
    }
}

function draw() {
    setPlaySpeed()
    handlePlayHead()
    handleEditSequence()
    handleCurrentMouse()
    handleSound()
    render()
    counter++
}

function handleCurrentMouse() {
    if (!paused) {
        currentMouseX = mouseX
        currentMouseY = mouseY
    }
}
