var varHorizonProportionFromTop;
var horizonY;

var boatImg
var landImg

var baseUnit

var t

function preload() {
    boatImg = loadImage("boatvector.svg");
    landImg = loadImage("landvector.svg")
}

function setup() {
    myStandardSetup()
    t = 0
    baseUnit = h / 692

    varHorizonProportionFromTop = 0.725
    horizonY = h * varHorizonProportionFromTop
}

function draw() {
    t += deltaTime
    render()
}