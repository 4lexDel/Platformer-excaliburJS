// Plateform.js

import { Actor, CollisionType, Color } from "excalibur";
import { OneWayCollisionComponent } from "../components/physics/one-way-platform";
import StickyComponent from "../components/physics/sticky";

export class FixedPlatform extends Actor {
  constructor(x, y, width, height) {
    super({
      x,
      y,
      width: width,
      height: height,
      color: Color.Red,
      collisionType: CollisionType.Fixed,
    });
  }
}
