var eventLog = [];

function preload() {}

function setup() {
	myStandardSetup();
}

function addEvent(eventText) {
	eventLog.push(strTime() + " " + eventText);
}

function changeLastEvent(eventText) {
	eventLog[eventLog.length - 1] = strTime() + " " + eventText;
}

function strTime() {
	//return Date();
	return forceDigits(hour()) + ":" + forceDigits(second());
}

function forceDigits(n) {
	return n.toLocaleString('en-US', {
    minimumIntegerDigits: 2,
    useGrouping: false
  })
}

function draw() {
	render();
}