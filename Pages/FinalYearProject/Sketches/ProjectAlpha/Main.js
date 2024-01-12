var photo
var thresholdVal

var FlipCamera
var buttonPressedThisFrame = false

var currentScene
var scene_takePhoto
var scene_setThreshold
var scene_sequence

// canvas and capture size
var w = 400
var h = 400

var capSquareX
var capSquareY
var capSquareL

function setup() {
    myStandardSetup()
    setupSound()
    setupScenes()
}

function setupScenes() {
    scene_takePhoto = new Scene_takePhoto()
    scene_setThreshold = new Scene_setThreshold()
    scene_sequence = new Scene_sequence()

    currentScene = scene_takePhoto
}

function changeScene(newScene) {
    newScene.windowResized()
    currentScene = newScene
}

function draw() {
    currentScene.mainLoop()
    render()
    buttonPressedThisFrame = false
    clickedThisFrame = false
}

function render() {
    background(colBackground)
    currentScene.render()
    //image(imgNoiseTexture, 0, 0);
    drawFrame()
}

function takePhoto() {
    photo = scene_takePhoto.camera
        .currentImage()
        .get(capSquareX, capSquareY, capSquareL, capSquareL)
    photo.filter(ERODE)
}

function mouseIsOnScreen() {
    return !(mouseX < 0 || width < mouseX || mouseY < 0 || height < mouseY)
}
