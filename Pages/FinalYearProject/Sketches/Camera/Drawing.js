function render() {
    background(colBackground)

    drawCapture(0, 0, w, h)

    image(imgNoiseTexture, 0, 0)
    drawFrame()
}

function drawCapture(x, y, wi, he) {
    if (facingUser) {
        push()
        translate(x + wi, y)
        scale(-1, 1)

        image(capture, 0, 0, wi, he)

        pop()
    } else {
        image(capture, x, y, wi, he)
    }
}
