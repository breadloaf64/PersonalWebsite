function generateNoiseTexture() {
  let amount = 0.2;
  let img = createImage(int(width), int(height));
  img.loadPixels();
  for (let i = 0; i < img.width; i++) {
    for (let j = 0; j < img.height; j++) {
      if (random(1) < amount) {
        img.set(i, j, color(random(255), 15));
      } else {
        img.set(i, j, color(0, 0));
      }
    }
  }
  img.updatePixels();
  return img;
}
