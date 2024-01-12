function sakura(x, y) {
    push()
    translate(x, y)
    push()
    rotate(getWind(2) * 0.005)
    const trunkTop = trunk()
    pop()

    translate(trunkTop.x, trunkTop.y)
    treeTop()
    pop()
}

function trunk() {
    stroke('#d4a373')
    strokeWeight(s * 0.3)
    const tVect1 = getTrunkSegVector(1)
    const tVect2 = getTrunkSegVector(2)
    const tVect3 = getTrunkSegVector(3)

    const t1 = tVect1
    const t2 = tVect2.add(tVect1)
    const t3 = tVect3.add(tVect2).add(tVect1)

    line(0, 0, t1.x, t1.y)
    line(t1.x, t1.y, t2.x, t2.y)
    line(t2.x, t2.y, t3.x, t3.y)

    // add thickness
    line(s * 0.2, 0, t1.x + s * 0.1, t1.y)
    line(t1.x + s * 0.1, t1.y, t2.x, t2.y)
    line(t2.x, t2.y, t3.x, t3.y)

    line(s * 0.2, 0, 0, 0)

    return t3
}

function getTrunkSegVector(index) {
    return createVector(
        0 + ((noise(seed + index * 100) - 0.5) * s * index) / 2,
        -s * 0.5 - noise(seed + index * 200) * s * 0.1
    )
}

function treeTop() {
    noStroke()
    fill('#ffafcc')
    // bottom right
    circle(s * 0.8 + getWind(0), s * 0.2, s * 0.8)
    // top right
    circle(s * 0.5 + getWind(0), -s * 0.2, s * 0.5)
    // bottom middle
    circle(0 + getWind(1), 0, s * 1.3)
    // top middle
    circle(0 + getWind(1), -s / 2, s * 1)
    // bottom left
    circle(-s * 0.9 + getWind(2), -s * 0.1, s * 1)
    // top left
    circle(-s * 0.5 + getWind(2), -s * 0.6, s * 0.8)
}
