class Layout {
    constructor() {
        this.update()
    }

    update() {
        if (height > width) {
            // portrait
            // container 1 takes up the top half of the screen
            this.primaryContainer_x = 0
            this.primaryContainer_y = 0
            this.primaryContainer_w = width
            this.primaryContainer_h = height / 2

            // container 2 takes up the bottom half of the screen
            this.secondaryContainer_x = 0
            this.secondaryContainer_y = height / 2
            this.secondaryContainer_w = width
            this.secondaryContainer_h = height / 2
        } else {
            // landscape
            // container 1 takes up the left half of the screen
            this.primaryContainer_x = 0
            this.primaryContainer_y = 0
            this.primaryContainer_w = width / 2
            this.primaryContainer_h = height

            // container 2 takes up the right half of the screen
            this.secondaryContainer_x = width / 2
            this.secondaryContainer_y = 0
            this.secondaryContainer_w = width / 2
            this.secondaryContainer_h = height
        }

        // primarySquare takes up the largest available square in primaryContainer
        this.primarySquare_w = min(
            this.primaryContainer_w,
            this.primaryContainer_h
        )
        this.primarySquare_h = this.primarySquare_w
        this.primarySquare_x =
            this.primaryContainer_x +
            (this.primaryContainer_w - this.primarySquare_w) / 2
        this.primarySquare_y =
            this.primaryContainer_y +
            (this.primaryContainer_h - this.primarySquare_h) / 2

        // subPrimarySquare is a smaller square centred in the primarySquare
        this.subPrimarySquare_w = this.primarySquare_w * 0.9
        this.subPrimarySquare_h = this.subPrimarySquare_w
        this.subPrimarySquare_x =
            this.primarySquare_x +
            (this.primarySquare_w - this.subPrimarySquare_w) / 2
        this.subPrimarySquare_y =
            this.primarySquare_y +
            (this.primarySquare_h - this.subPrimarySquare_h) / 2

        // subSubPrimarySquare is a smaller square centred in the subPrimarySquare
        this.subSubPrimarySquare_w = this.subPrimarySquare_w * 0.8
        this.subSubPrimarySquare_h = this.subSubPrimarySquare_w
        this.subSubPrimarySquare_x =
            this.subPrimarySquare_x +
            (this.subPrimarySquare_w - this.subSubPrimarySquare_w) / 2
        this.subSubPrimarySquare_y =
            this.subPrimarySquare_y +
            (this.subPrimarySquare_h - this.subSubPrimarySquare_h) / 2

        // ============== PRIMARY sub sub QUADRANTS ==================
        let subSubPadding = this.subPrimarySquare_w * 0.02
        let subSubW = (this.subPrimarySquare_w - subSubPadding) / 2

        // subSubPrimarySquareTL is the top left quadrant of subPrimarySquare
        this.subSubPrimarySquareTL_w = subSubW
        this.subSubPrimarySquareTL_h = subSubW
        this.subSubPrimarySquareTL_x = this.subPrimarySquare_x
        this.subSubPrimarySquareTL_y = this.subPrimarySquare_y

        // subSubPrimarySquareTR is the top right quadrant of subPrimarySquare
        this.subSubPrimarySquareTR_w = subSubW
        this.subSubPrimarySquareTR_h = subSubW
        this.subSubPrimarySquareTR_x =
            this.subPrimarySquare_x + subSubPadding + subSubW
        this.subSubPrimarySquareTR_y = this.subPrimarySquare_y

        // subSubPrimarySquareBL is the bottom left quadrant of subPrimarySquare
        this.subSubPrimarySquareBL_w = subSubW
        this.subSubPrimarySquareBL_h = subSubW
        this.subSubPrimarySquareBL_x = this.subPrimarySquare_x
        this.subSubPrimarySquareBL_y =
            this.subPrimarySquare_y + subSubPadding + subSubW

        // subSubPrimarySquareBR is the bottom right quadrant of subPrimarySquare
        this.subSubPrimarySquareBR_w = subSubW
        this.subSubPrimarySquareBR_h = subSubW
        this.subSubPrimarySquareBR_x =
            this.subPrimarySquare_x + subSubPadding + subSubW
        this.subSubPrimarySquareBR_y =
            this.subPrimarySquare_y + subSubPadding + subSubW

        // secondarySquare takes up the largest available square in secondaryContainer
        this.secondarySquare_w = min(
            this.secondaryContainer_w,
            this.secondaryContainer_h
        )
        this.secondarySquare_h = this.secondarySquare_w
        this.secondarySquare_x =
            this.secondaryContainer_x +
            (this.secondaryContainer_w - this.secondarySquare_w) / 2
        this.secondarySquare_y =
            this.secondaryContainer_y +
            (this.secondaryContainer_h - this.secondarySquare_h) / 2

        // subSecondarySquare is a smaller square centred in the secondarySquare
        this.subSecondarySquare_w = this.secondarySquare_w * 0.8
        this.subSecondarySquare_h = this.subSecondarySquare_w
        this.subSecondarySquare_x =
            this.secondarySquare_x +
            (this.secondarySquare_w - this.subSecondarySquare_w) / 2
        this.subSecondarySquare_y =
            this.secondarySquare_y +
            (this.secondarySquare_h - this.subSecondarySquare_h) / 2
    }

    draw() {
        strokeWeight(3)
        stroke(0)

        // primaryContainer
        fill('#bb3e03')
        rect(
            layout.primaryContainer_x,
            layout.primaryContainer_y,
            layout.primaryContainer_w,
            layout.primaryContainer_h
        )

        // primarySquare
        fill('#ca6702')
        rect(
            layout.primarySquare_x,
            layout.primarySquare_y,
            layout.primarySquare_w,
            layout.primarySquare_h
        )

        // subPrimarySquare
        fill('#ee9b00')
        rect(
            layout.subPrimarySquare_x,
            layout.subPrimarySquare_y,
            layout.subPrimarySquare_w,
            layout.subPrimarySquare_h
        )

        // subSubPrimarySquare
        fill('#ffffff')
        rect(
            layout.subSubPrimarySquare_x,
            layout.subSubPrimarySquare_y,
            layout.subSubPrimarySquare_w,
            layout.subSubPrimarySquare_h
        )

        // subSubPrimarySquareTL
        fill('#e9d8a6')
        rect(
            layout.subSubPrimarySquareTL_x,
            layout.subSubPrimarySquareTL_y,
            layout.subSubPrimarySquareTL_w,
            layout.subSubPrimarySquareTL_h
        )

        // subSubPrimarySquareTR
        fill('#e9d8a6')
        rect(
            layout.subSubPrimarySquareTR_x,
            layout.subSubPrimarySquareTR_y,
            layout.subSubPrimarySquareTR_w,
            layout.subSubPrimarySquareTR_h
        )

        // subSubPrimarySquareBL
        fill('#e9d8a6')
        rect(
            layout.subSubPrimarySquareBL_x,
            layout.subSubPrimarySquareBL_y,
            layout.subSubPrimarySquareBL_w,
            layout.subSubPrimarySquareBL_h
        )

        // subSubPrimarySquareBR
        fill('#e9d8a6')
        rect(
            layout.subSubPrimarySquareBR_x,
            layout.subSubPrimarySquareBR_y,
            layout.subSubPrimarySquareBR_w,
            layout.subSubPrimarySquareBR_h
        )

        // secondaryContainer
        fill('#005f73')
        rect(
            layout.secondaryContainer_x,
            layout.secondaryContainer_y,
            layout.secondaryContainer_w,
            layout.secondaryContainer_h
        )

        // secondarySquare
        fill('#0a9396')
        rect(
            layout.secondarySquare_x,
            layout.secondarySquare_y,
            layout.secondarySquare_w,
            layout.secondarySquare_h
        )

        // subSecondarySquare
        fill('#94d2bd')
        rect(
            layout.subSecondarySquare_x,
            layout.subSecondarySquare_y,
            layout.subSecondarySquare_w,
            layout.subSecondarySquare_h
        )
    }
}
