var capture // capture <video> dom element
let facingUser = false

function setupCapture() {
    removeCapture()

    // initialise capture
    capture = createCapture(
        {
            audio: false,
            video: {
                width: w,
                height: h,
                facingMode: facingUser ? 'user' : 'environment',
            },
        },
        function () {
            //console.log('capture ready.')
        }
    )
    capture.elt.setAttribute('playsinline', '')
    capture.size(w, h)
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
