var groundY

var plants
var raindrops
var revealPanels
var numRevealed = 0

function setup() {
    myStandardSetup()

    groundY = height * 0.7

    plants = []
    plants.push(new LetterPlant(width * 0.3, groundY, 0))
    plants.push(new LetterPlant(width * 0.5, groundY, 1))
    plants.push(new LetterPlant(width * 0.7, groundY, 2))
    raindrops = []

    revealPanels = []
    revealPanels.push(
        new RevealPanel(
            width * 0.05,
            groundY + width * 0.01,
            width * 0.32,
            (height - groundY) * 0.95,
            colEarth
        )
    )
    revealPanels.push(
        new RevealPanel(
            width * 0.37,
            groundY + width * 0.01,
            width * 0.31,
            (height - groundY) * 0.95,
            colEarth
        )
    )
    revealPanels.push(
        new RevealPanel(
            width * 0.7,
            groundY + width * 0.01,
            width * 0.3,
            (height - groundY) * 0.95,
            colEarth
        )
    )
    revealPanels.push(
        new RevealPanel(0, height * 0.85, width, height * 0.95, colEarth)
    )
}

function draw() {
    counter++
    render()
    handleRain()
    updatePlants()
    updateRaindrops()
    updateRevealPanels()
    //leaf(width / 2, height / 2, map(mouseX, 0, width, 0, 100), asin(map(mouseY, 0, height, -1, 1)))
}

var rainPeriod = 2
var timeSinceLastDrop = 100

function handleRain() {
    timeSinceLastDrop++
    if (mouseIsPressed) {
        if (timeSinceLastDrop > rainPeriod) {
            timeSinceLastDrop = 0
            let r = random(width / 20)
            let theta = random(2 * PI)
            let x = mouseX + r * cos(theta)
            let y = mouseY + r * sin(theta)
            raindrops.push(new RainDrop(x, y))
        }
    }
}

function updatePlants() {
    for (let p of plants) {
        p.update()
    }
}

function updateRevealPanels() {
    for (let p of revealPanels) {
        p.update()
    }
}

function updateRaindrops() {
    for (let r of raindrops) {
        r.update()
    }
    removeSpentDrops()
}

function removeSpentDrops() {
    for (let i = raindrops.length - 1; i >= 0; i--) {
        if (raindrops[i].y > groundY) {
            tryWaterPlants(raindrops[i].x)
            raindrops.splice(i, 1)
        }
    }
}

function tryWaterPlants(x) {
    for (let p of plants) {
        p.water(x)
    }
}

function mousePressed() {
    cleared = true
}
