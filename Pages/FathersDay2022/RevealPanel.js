class RevealPanel {
  constructor(x, y, w, h, colour) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.revealed = false;
    this.counter = 0;
    this.revealTime = 130;
    this.colour = colour;
    this.alpha = 255;
  }

  update() {
    if (this.revealed) {
      this.counter++;
      if (this.counter > this.revealTime) {
        this.counter = this.revealTime;
      }
      this.alpha = map(this.counter, 0, this.revealTime, 255, 0);
    }
  }

  draw() {
    this.colour.setAlpha(this.alpha);
    fill(this.colour);
    noStroke();
    rect(this.x, this.y, this.w, this.h);
  }

  reveal() {
    numRevealed++;
    this.revealed = true;
    if (numRevealed == 3) {
      revealPanels[3].reveal();
    }
  }
}
