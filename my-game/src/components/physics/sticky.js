import { Component } from "excalibur";

class StickyComponent extends Component {
  constructor() {
    super();
    this.lastPlatformX = 0;
    this.lastPlatformY = 0;
    this.currentActors = new Set();
  }

  onAdd(owner) {
    this.owner = owner;

    this.owner.on("collisionstart", (event) => {
      const other = event.other.owner;
      if (!this.currentActors.has(other) && other.pos.y < this.owner.pos.y) {
        this.currentActors.add(other);
      }
    });

    this.owner.on("collisionend", (event) => {
      if (this.currentActors.has(event.other.owner)) {
        this.currentActors.delete(event.other.owner);
      }
    });
  }

  update(engine, delta) {
    let deltaX = this.owner.pos.x - this.lastPlatformX;
    let deltaY = this.owner.pos.y - this.lastPlatformY;

    this.currentActors.forEach((actor) => {
      actor.pos.x += deltaX;
      actor.pos.y += deltaY;
    });
    this.lastPlatformX = this.owner.pos.x;
    this.lastPlatformY = this.owner.pos.y;
  }
}

export default StickyComponent;
