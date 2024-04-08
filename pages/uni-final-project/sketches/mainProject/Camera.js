class Camera {
    constructor() {
        this.facingUser = false
        this.setupCapture()
        this.w = width
        this.h = height
        this.isSquare = true
    }

    setupCapture() {
        this.removeCapture()

        // initialise capture
        this.capture = createCapture(
            {
                audio: false,
                video: {
                    width: this.h,
                    height: this.w,
                    facingMode: this.facingUser ? 'user' : 'environment',
                },
            },
            function () {
                //callback function
            }
        )
        this.capture.elt.setAttribute('playsinline', '')
        this.capture.hide()
    }

    removeCapture() {
        if (this.capture) {
            this.capture.remove()
        }
    }

    flip() {
        this.facingUser = !this.facingUser
        this.setupCapture()
    }

    currentImage() {
        // returns the current image in the capture object
        let image

        if (this.isSquare) {
            //print("cw,h: (" + this.capture.width + ", " + this.capture.height + ") w,h: (" + this.w + ", " + this.h + ")");
            let w = this.capture.width
            let h = this.capture.height
            let l = min(w, h)
            image = this.capture.get(0, 0, l, l)
            image.resize(this.w, this.h)
        } else
            image = this.capture.get(
                0,
                0,
                this.capture.width,
                this.capture.height
            )

        if (this.facingUser) {
            // IMPLEMENT ME
            // flip image somehow
            //image = image.scale(-1, 1);
        }
        return image
    }
}
