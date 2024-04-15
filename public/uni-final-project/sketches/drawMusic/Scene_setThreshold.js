class Scene_setThreshold {
    constructor() {
        this.name = 'setThreshold'

        this.threshold = 0.5

        this.makeButtons()
    }

    makeButtons() {
        const txtSize = layout.subSecondarySquare_w / 15
        const typeface = 'monospace'
        textFont(typeface, txtSize)

        const x = layout.subSecondarySquare_x
        const y = layout.subSecondarySquare_y
        const h = layout.subSecondarySquare_h / 4
        const w = layout.subSecondarySquare_w

        const smallScalar = 0.7
        const smallW = w * smallScalar
        const smallH = h * smallScalar
        const smallTxtSize = txtSize * smallScalar

        // thresholding instruction text
        this.txtInstruction = new Button(
            x + (w - smallW) / 2,
            y + h * 0 + (h - smallH) / 2,
            smallW,
            smallH,
            function () {},
            'Drag your finger up and down the image to\nisolate the lines, avoiding blemishes',
            smallTxtSize,
            typeface,
            colTransparent,
            colTransparent,
            colButtonText
        )

        // convert to sequence
        const convertToSequenceButtonPressFunction = function () {
            buttonPressedThisFrame = true

            let thresholded = get(
                layout.subSubPrimarySquare_x,
                layout.subSubPrimarySquare_y,
                layout.subSubPrimarySquare_w,
                layout.subSubPrimarySquare_h
            )
            // thresholded.save('filtered', 'png');

            // get thresholded image, convert to sequence
            let converted = convertImageToSequence2(thresholded)
            sequences[currentSequenceIndex] = converted
            scene_sequence.setSequence(currentSequenceIndex)
            changeScene(scene_sequence)
        }
        this.btnConvertToSequence = new Button(
            x,
            y + h * 1,
            w,
            h,
            convertToSequenceButtonPressFunction,
            'use this photo',
            txtSize,
            typeface,
            colButtonFill,
            colButtonBorder,
            colButtonText
        )

        // retake photo
        const retakePhotoButtonPressFunction = function () {
            buttonPressedThisFrame = true
            changeScene(scene_takePhoto)
        }
        this.btnRetakePhoto = new Button(
            x + (w - smallW) / 2,
            y + h * 2 + (h - smallH) / 2,
            smallW,
            smallH,
            retakePhotoButtonPressFunction,
            'retake photo',
            txtSize,
            typeface,
            colButtonFill,
            colButtonBorder,
            colButtonText
        )

        // cancel and return to previous scene
        const cancelButtonPressFunction = function () {
            if (sequences[currentSequenceIndex].voices.length == 0) {
                changeScene(scene_main)
            } else changeScene(scene_sequence)
        }
        this.btnCancel = new Button(
            x + (w - smallW) / 2,
            y + h * 3 + (h - smallH) / 2,
            smallW,
            smallH,
            cancelButtonPressFunction,
            'cancel',
            txtSize,
            typeface,
            colButtonFill,
            colButtonBorder,
            colButtonText
        )

        this.buttons = [
            this.btnRetakePhoto,
            this.txtInstruction,
            this.btnConvertToSequence,
            this.btnCancel,
        ]
    }

    windowResized() {
        // essential
        this.makeButtons()
    }

    mainLoop() {
        // essential
        if (
            mouseIsPressed &&
            mouseIsInBounds(
                layout.subSubPrimarySquare_x,
                layout.subSubPrimarySquare_y,
                layout.subSubPrimarySquare_w,
                layout.subSubPrimarySquare_h
            ) &&
            !buttonPressedThisFrame
        ) {
            this.threshold = map(
                mouseY,
                layout.subSubPrimarySquare_y,
                layout.subSubPrimarySquare_y + layout.subSubPrimarySquare_h,
                0,
                1,
                true
            )
        }
    }

    render() {
        // essential
        let filtered = copyImage(photo)
        filtered.filter(THRESHOLD, this.threshold)
        drawImage(
            filtered,
            layout.subSubPrimarySquare_x,
            layout.subSubPrimarySquare_y,
            layout.subSubPrimarySquare_w,
            layout.subSubPrimarySquare_h
        )
        this.drawButtons()
        this.drawButtons()
        image(imgNoiseTextureCut, 0, 0)
    }

    drawButtons() {
        for (let button of this.buttons) {
            button.draw()
        }
    }

    mouseClicked() {
        // essential
        for (let button of this.buttons) {
            button.tryClick()
        }
    }
}
