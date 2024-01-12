class SequenceBox {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.w = width;
    this.h = height;
    this.showGrid = true;
    this.showIcon = true;
    this.col = color("#ffffff");
  }

  setSquare(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  draw() {
    this.boxBackground();
    if (this.showGrid) this.drawGrid();
    if (playing) this.drawPlayhead();
    if (this.sequence && this.sequence.voices.length > 0)
      this.sequence.draw(this.x, this.y, this.w, this.h);
    if (this.showIcon) this.drawIcon();
    this.drawBoxFrame();
  }

  boxBackground() {
    fill(this.col);
    noStroke();
    rect(this.x, this.y, this.w, this.h);
  }

  drawGrid() {
    stroke(colGrid);
    strokeWeight(1);

    // vertical lines;
    for (let i = 0; i < this.sequence.numBeats; i++) {
      let x = map(i, 0, this.sequence.numBeats, this.x, this.x + this.w);
      line(x, this.y, x, this.y + this.h);
    }

    // horizontal lines;
    if (this.sequence.type != 3) {
      // for melodic sequences
      let originNote = 0; // lines will appear each octave where this note appears
      for (let note = minNote; note <= maxNote; note++) {
        if (posMod(note - originNote, 12) == 0) {
          let y = map(
            frequencyToProp_exp(noteToFrequency(note)),
            0,
            1,
            this.y + this.h,
            this.y,
          );
          line(this.x, y, this.x + this.w, y);
        }
      }
    } else {
      // drum sequences
      let dist = this.h / drumSamples.length;
      for (let i = 1; i < drumSamples.length; i++) {
        let y = this.y + i * dist;
        line(this.x, y, this.x + this.w, y);
      }
    }
  }

  drawEmpty() {
    let iconScale = 0.5;

    let iconL = this.w * iconScale;

    // draw icon
    if (this.instrumentIcon) {
      image(
        this.instrumentIcon,
        this.x + (this.w - iconL) / 2,
        this.y + (this.h - iconL) / 2,
        iconL,
        iconL,
      );
    }
  }

  drawPlayhead() {
    let t =
      (((masterTime * this.sequence.speedMultiplier) / beatPeriod) %
        this.sequence.numBeats) /
      this.sequence.numBeats;
    let x = map(t, 0, 1, this.x, this.x + this.w);
    strokeWeight(2);
    stroke(colPlayhead);
    line(x, this.y, x, this.y + this.h);
  }

  drawBoxFrame() {
    noFill();
    stroke(0);
    strokeWeight(3);
    rect(this.x, this.y, this.w, this.h);
  }

  drawIcon() {
    let iconScale = 0.2;
    let iconL = this.w * iconScale;

    // draw icon background
    noStroke();
    fill(colIconBackground);
    rect(this.x, this.y, iconL, iconL);

    // draw icon
    if (this.instrumentIcon) {
      image(this.instrumentIcon, this.x, this.y, iconL, iconL);
    }
  }
}
