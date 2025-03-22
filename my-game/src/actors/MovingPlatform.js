import { CollisionType, Color } from "excalibur";
import { BasePlaform } from "../classes/Platform";
import { OneWayCollisionComponent } from "../components/physics/one-way-platform";
import StickyComponent from "../components/physics/sticky";

export class MovingPlatform extends BasePlaform {
  constructor(args, type, cb) {
    super({
      color: Color.fromHex("#f95f55"),
      collisionType: CollisionType.Fixed,
      ...args
    }, type);

    this.stickyComponent = new StickyComponent();
    this.addComponent(this.stickyComponent);
    this.addComponent(new OneWayCollisionComponent());

    cb(this.actions);
  }

  onPostUpdate(engine, delta) {
    this.stickyComponent.update(engine, delta);
  }
}
