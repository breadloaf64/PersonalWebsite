var gyroAlpha = 1, gyroBeta = 1, gyroGamma = 1;
var isMobile = false;

// accelerometer Data
window.addEventListener('deviceorientation', function(e) {

	// if value changed and not 0, then the device has a gryoscope, therefore is mobile
	if (gyroBeta != e.beta && gyroBeta != 0) {
		isMobile = true;
	}

  gyroAlpha = e.alpha;
  gyroBeta = e.beta;
  gyroGamma = e.gamma;
});
