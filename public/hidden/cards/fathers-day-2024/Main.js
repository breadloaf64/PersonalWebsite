var varHorizonProportionFromTop;
var horizonY;

var boatImg

function preload() {
    boatImg = loadImage("boatvector.svg");
}

function setup() {
    myStandardSetup()

    varHorizonProportionFromTop = 0.7
    horizonY = height * varHorizonProportionFromTop
}

function draw() {
    counter++
    render()
}