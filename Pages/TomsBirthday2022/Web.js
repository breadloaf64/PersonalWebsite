class Web {
  constructor(pos) {
    this.pos = pos.copy();

    this.speed = 0.3;
    this.damage = 1;
    this.destroyed = false;
    this.hitRadius = 5 * u;
    this.freezeTime = 500;

    this.hitHero = false;
    this.timeHit = 0;
  }

  update() {
    let toCake = cake.pos.copy().sub(this.pos);

    if (this.hitHero) {
      if (millis() - this.timeHit > this.freezeTime) {
        this.destroyed = true;
        hero.unfreeze();
      }
      return;
    }

    if (toCake.mag() > cake.eatRadius) {
      let dist = min(this.speed * deltaTime, toCake.mag());
      let movement = toCake.copy().normalize().mult(dist);
      this.pos.add(movement);

      // check proximity to hero
      let distToHero = hero.pos.copy().sub(this.pos).mag();
      if (distToHero < this.hitRadius) {
        if (!hero.frozen) hero.freeze(this.freezeTime);

        this.pos = hero.pos;
        this.hitHero = true;
        this.timeHit = millis();
      }
    } else {
      this.destroyed = true;
      cake.damage(this.damage);
    }
  }

  draw() {
    let scalar = (2 * u) / 5.376;
    noSmooth();
    image(
      img_spiderweb,
      this.pos.x,
      this.pos.y,
      img_spiderweb.width * scalar,
      img_spiderweb.height * scalar,
    );
  }
}
