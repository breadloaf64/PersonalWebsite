let capture;
let facingUser = false;

function setupCamera() {
  if (capture) {
    capture.remove();
  }
  
  capture = createCapture({
    video: {
      facingMode: facingUser ? 'user' : 'environment'
    },
    audio: false
  });
  capture.size(width, height);
  capture.hide();
}