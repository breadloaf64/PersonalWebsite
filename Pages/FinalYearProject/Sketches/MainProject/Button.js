class Button {
  constructor(
    x,
    y,
    w,
    h,
    f,
    text,
    textSize,
    typeface,
    colFill,
    colBorder,
    colText,
  ) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.text = text;
    this.textSize = textSize;
    this.typeface = typeface;
    this.f = f; // function to call on click
    this.colFill = colFill;
    this.colBorder = colBorder;
    this.colText = colText;

    this.state = true;
  }

  tryClick() {
    // check if mouse is over the button
    if (
      this.x < mouseX &&
      mouseX < this.x + this.w &&
      this.y < mouseY &&
      mouseY < this.y + this.h
    ) {
      this.click();
    }
  }

  click() {
    this.f();
  }

  draw() {
    // draw button
    strokeWeight(5);
    stroke(this.colBorder);
    fill(this.colFill);

    rect(this.x, this.y, this.w, this.h, 5);

    //draw text
    noStroke();
    textFont(this.typeface, this.textSize);
    fill(this.colText);
    textAlign(CENTER, CENTER);
    text(this.text, this.x + this.w / 2, this.y + this.h / 2);
  }
}
