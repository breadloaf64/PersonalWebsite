var capture // capture <video> dom element
let facingUser = false

function setupCapture() {
    removeCapture()

    // initialise capture
    capture = createCapture({
        audio: false,
        video: {
            width: h,
            height: w,
            facingMode: facingUser ? 'user' : 'environment',
        },
    })
    capture.hide()
}

function removeCapture() {
    if (capture) {
        capture.remove()
    }
}

function flipCamera() {
    facingUser = !facingUser
    setupCapture()
    buttonPressedThisFrame = true
}
