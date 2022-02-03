let permissionGranted = false;

var prevRotSum = 0;
var isMobile = false;

function requestAccess() {
  DeviceOrientationEvent.requestPermission()
    .then(response => {
      if (response == 'granted') {
        permissionGranted = true;
      } else {
        permissionGranted = false;
      }
    })
  .catch(console.error);

  this.remove();
}
