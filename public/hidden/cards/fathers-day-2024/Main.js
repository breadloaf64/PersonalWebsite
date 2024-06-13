var varHorizonProportionFromTop;
var horizonY;

var boatImg

var t

function preload() {
    boatImg = loadImage("boatvector.svg");
}

function setup() {
    myStandardSetup()
    t = 0

    varHorizonProportionFromTop = 0.7
    horizonY = height * varHorizonProportionFromTop
}

function draw() {
    t += deltaTime
    render()
}