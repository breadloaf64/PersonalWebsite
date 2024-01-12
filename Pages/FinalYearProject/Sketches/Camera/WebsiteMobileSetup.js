var embeddedOnWebsite = true; // changing this to true will put it inside of the div called sketch-holder

function createMetaTag() {
  let meta = createElement("meta");
  meta.attribute("name", "viewport");
  meta.attribute(
    "content",
    "user-scalable=no,initial-scale=1,maximum-scale=1,minimum-scale=1,width=device-width,height=device-height",
  );

  let head = select("head");
  meta.parent(head);
}

function windowResized() {
  let parent = canvas.parentElement;
  let size = min(parent.clientWidth, parent.clientHeight);
  resizeCanvas(size, size, true);
  w = size;
  h = size;
  setupCapture();
}
