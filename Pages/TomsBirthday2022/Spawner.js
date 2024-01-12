class Spawner {
    constructor() {
        this.age = 0
        this.phase = 0

        this.phaseAges = [] // in SECONDS
        this.spawnFreqSkeleton = []
        this.spawnFreqFastSkeleton = []
        this.spawnFreqSpider = []

        this.timeLastSkeleton = 0
        this.timeLastFastSkeleton = 0
        this.timeLastSpider = 0

        let age = 0
        let cumAge = 0
        this.phaseAges.push((cumAge += age))

        //phase 0 // nothing
        age = 5
        this.phaseAges.push((cumAge += age))
        this.spawnFreqSkeleton.push(+0)
        this.spawnFreqFastSkeleton.push(+0)
        this.spawnFreqSpider.push(+0)

        // PHASE skelet introduction
        age = 10
        this.phaseAges.push((cumAge += age))
        this.spawnFreqSkeleton.push(+0.3)
        this.spawnFreqFastSkeleton.push(+0)
        this.spawnFreqSpider.push(+0)

        // PHASE skelet rabble
        age = 10
        this.phaseAges.push((cumAge += age))
        this.spawnFreqSkeleton.push(1)
        this.spawnFreqFastSkeleton.push(+0)
        this.spawnFreqSpider.push(+0)

        // PHASE break
        age = 7
        this.phaseAges.push((cumAge += age))
        this.spawnFreqSkeleton.push(+0)
        this.spawnFreqFastSkeleton.push(+0)
        this.spawnFreqSpider.push(+0)

        // PHASE big skelet wave
        age = 2
        this.phaseAges.push((cumAge += age))
        this.spawnFreqSkeleton.push(5)
        this.spawnFreqFastSkeleton.push(+0)
        this.spawnFreqSpider.push(+0)

        //phase break
        age = 7
        this.phaseAges.push((cumAge += age))
        this.spawnFreqSkeleton.push(+0)
        this.spawnFreqFastSkeleton.push(+0)
        this.spawnFreqSpider.push(+0)

        // PHASE pokey spiders
        age = 10
        this.phaseAges.push((cumAge += age))
        this.spawnFreqSkeleton.push(+0)
        this.spawnFreqFastSkeleton.push(+0)
        this.spawnFreqSpider.push(+0.3)

        //phase break
        age = 6
        this.phaseAges.push((cumAge += age))
        this.spawnFreqSkeleton.push(+0)
        this.spawnFreqFastSkeleton.push(+0)
        this.spawnFreqSpider.push(+0)

        //phase big skelet wave with spiders
        age = 2
        this.phaseAges.push((cumAge += age))
        this.spawnFreqSkeleton.push(5)
        this.spawnFreqFastSkeleton.push(+0)
        this.spawnFreqSpider.push(0.3)

        //phase break
        age = 7
        this.phaseAges.push((cumAge += age))
        this.spawnFreqSkeleton.push(+0)
        this.spawnFreqFastSkeleton.push(+0)
        this.spawnFreqSpider.push(+0)

        //phase slow and fast skelets
        age = 15
        this.phaseAges.push((cumAge += age))
        this.spawnFreqSkeleton.push(1)
        this.spawnFreqFastSkeleton.push(0.3)
        this.spawnFreqSpider.push(+0)

        //phase add spiders
        age = 15
        this.phaseAges.push((cumAge += age))
        this.spawnFreqSkeleton.push(1)
        this.spawnFreqFastSkeleton.push(0.3)
        this.spawnFreqSpider.push(+0.2)

        //phase break
        age = 5
        this.phaseAges.push((cumAge += age))
        this.spawnFreqSkeleton.push(+0)
        this.spawnFreqFastSkeleton.push(+0)
        this.spawnFreqSpider.push(+0)

        //phase spiderfest
        age = 5
        this.phaseAges.push((cumAge += age))
        this.spawnFreqSkeleton.push(+0)
        this.spawnFreqFastSkeleton.push(+0)
        this.spawnFreqSpider.push(+1)

        //phase break
        age = 5
        this.phaseAges.push((cumAge += age))
        this.spawnFreqSkeleton.push(+0)
        this.spawnFreqFastSkeleton.push(+0)
        this.spawnFreqSpider.push(+0)

        //phase big wave
        age = 5
        this.phaseAges.push((cumAge += age))
        this.spawnFreqSkeleton.push(+1.3)
        this.spawnFreqFastSkeleton.push(+0.2)
        this.spawnFreqSpider.push(+0.3)

        //phase break
        age = 20
        this.phaseAges.push((cumAge += age))
        this.spawnFreqSkeleton.push(+0)
        this.spawnFreqFastSkeleton.push(+0)
        this.spawnFreqSpider.push(+0)

        //phase big wave
        age = 5
        this.phaseAges.push((cumAge += age))
        this.spawnFreqSkeleton.push(+1.0)
        this.spawnFreqFastSkeleton.push(+0.17)
        this.spawnFreqSpider.push(+0.2)

        print(this.phaseAges)
    }

    update() {
        this.age += deltaTime
        if (this.age > this.phaseAges[this.phase + 1] * 1000) {
            this.phase++
        }

        //print(this.phase);
        this.trySpawnSkeleton()
        this.trySpawnFastSkeleton()
        this.trySpawnSpider()
    }

    trySpawnFastSkeleton() {
        let period =
            1 /
            this.spawnFreqFastSkeleton[
                min(this.phase, this.spawnFreqFastSkeleton.length - 1)
            ]
        if (millis() - this.timeLastFastSkeleton > period * 1000) {
            enemies.push(
                new Skeleton(this.makeSpawnLocation(), u * 0.025, 0.65)
            )
            this.timeLastFastSkeleton = millis()
        }
    }

    trySpawnSkeleton() {
        let period =
            1 /
            this.spawnFreqSkeleton[
                min(this.phase, this.spawnFreqSkeleton.length - 1)
            ]
        if (millis() - this.timeLastSkeleton > period * 1000) {
            enemies.push(new Skeleton(this.makeSpawnLocation(), u * 0.008, 1))
            this.timeLastSkeleton = millis()
        }
    }

    trySpawnSpider() {
        let period =
            1 /
            this.spawnFreqSpider[
                min(this.phase, this.spawnFreqSpider.length - 1)
            ]
        if (millis() - this.timeLastSpider > period * 1000) {
            enemies.push(new Spider(this.makeSpawnLocation()))
            this.timeLastSpider = millis()
        }
    }

    makeSpawnLocation() {
        let border = 2 * u // distance of enemy outside edge of screen

        let side = random([0, 1, 2, 3])
        let p = random(-border, width + border)

        if (side == 0)
            return createVector(-border, p) // left
        else if (side == 1)
            return createVector(width + border, p) // right
        else if (side == 2)
            return createVector(p, -border) // top
        else return createVector(p, height + border) // bottom
    }
}
