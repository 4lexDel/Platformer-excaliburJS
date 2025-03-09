// Plateform.js

import { Actor, CollisionType, Color } from "excalibur";
import { OneWayCollisionComponent } from "../components/physics/one-way-platform";

export class FixedPlatform extends Actor {
  constructor(x, y, width, height, oneWay=false) {
    super({
      x,
      y,
      width: width,
      height: height,
      color: oneWay ? Color.fromRGB(200, 100, 50) : Color.Red,
      collisionType: CollisionType.Fixed,
    });

    if(oneWay) {
      this.addComponent(new OneWayCollisionComponent())
    }
  }
}
