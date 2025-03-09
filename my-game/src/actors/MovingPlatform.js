// Plateform.js

import { Actor, CollisionType, Color, vec } from "excalibur";
import { OneWayCollisionComponent } from "../components/physics/one-way-platform";
import StickyComponent from "../components/physics/sticky";

export class MovingPlatform extends Actor {
  constructor(x, y, minX=300, maxX=600) {
    super({
      x,
      y,
      width: 100,
      height: 15,
      color: Color.Black,
      collisionType: CollisionType.Fixed,
      vel: vec(100, 0),
    });

    this.stickyComponent = new StickyComponent();
    this.addComponent(this.stickyComponent);

    this.on('postupdate', () => {
      if (this.pos.x > maxX) {
        this.vel.x = -100;
      } else if (this.pos.x < minX) {
        this.vel.x = 100;
      }
    });

    // this.addComponent(new StickyComponent())
    this.addComponent(new OneWayCollisionComponent());
  }

  onPostUpdate(engine, delta) {
    this.stickyComponent.update(engine, delta);
  }
}
