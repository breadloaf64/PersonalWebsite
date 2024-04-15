class Hero {
    constructor(pos) {
        this.pos = pos.copy()
        this.speed = u * 0.1 // world units per millisecond
        this.dashDist = u * 30
        this.dashing = false
        this.trail = []
        this.trailSize = 10
        this.enemiesHitDuringDash = 0
        this.frozen = false
    }

    move(target) {
        if (this.frozen) return
        let toTarget = target.copy().sub(this.pos)

        if (toTarget.mag() > u * 0.1) {
            if (!this.dashing) {
                // start dash
                random(sfxs_dash).play()
                this.enemiesHitDuringDash = 0
            }
            this.dashing = true
            let moveDist = min(this.speed * deltaTime, toTarget.mag())
            let delta = toTarget.normalize().mult(moveDist)
            this.pos.add(delta)
        } else {
            if (this.dashing) {
                this.finishDash()
            }
        }

        this.trail.push(this.pos.copy())
        if (this.trail.length > 10) this.trail.splice(0, 1)
    }

    finishDash() {
        this.dashing = false
        this.dashFinishTime = millis()
        if (this.enemiesHitDuringDash == 0) combo = 0
        target = nextTarget
    }

    draw() {
        //noStroke();
        // fill(255, 0, 0);
        // ellipse(this.pos.x, this.pos.y, u * 2);

        let scalar = (2 * u) / 5.376
        noSmooth()
        if (this.dashing && !this.frozen) {
            this.drawTrail()
            image(
                img_hero_dash,
                this.pos.x,
                this.pos.y,
                img_hero_dash.width * scalar,
                img_hero_dash.height * scalar
            )
        } else {
            let idleFrame = floor(millis() / 200) % 2
            image(
                imgs_hero_idles[idleFrame],
                this.pos.x,
                this.pos.y,
                img_hero_idle_1.width * scalar,
                img_hero_idle_1.height * scalar
            )
        }
    }

    drawTrail() {
        for (let i = 0; i < this.trail.length - 1; i++) {
            strokeWeight(map(i, 0, this.trail.length, u, 3 * u))
            stroke(255, map(i, 0, this.trail.length, 0, 255))
            line(
                this.trail[i].x,
                this.trail[i].y,
                this.trail[i + 1].x,
                this.trail[i + 1].y
            )
        }
    }

    freeze() {
        this.frozen = true
    }

    unfreeze() {
        this.frozen = false
    }
}
