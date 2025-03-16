// Plateform.js

import { CollisionType, Color } from "excalibur";
import { BasePlaform } from "../classes/Platform";
import { OneWayCollisionComponent } from "../components/physics/one-way-platform";
import { Resources } from "../ressources";

const sprite = Resources.img.redPlatform.toSprite()

export class FixedPlatform extends BasePlaform {
  constructor(x, y, width, height, oneWay=false) {
    super({
      x,
      y,
      width: width,
      height: height,
      color: oneWay ? Color.fromRGB(200, 100, 50) : Color.Red,
      collisionType: CollisionType.Fixed,
    }, sprite);

    if(oneWay) {
      this.addComponent(new OneWayCollisionComponent())
    }
  }
}
