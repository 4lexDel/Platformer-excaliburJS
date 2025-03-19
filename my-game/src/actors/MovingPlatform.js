import { Actor, CollisionType, Color } from "excalibur";
import { OneWayCollisionComponent } from "../components/physics/one-way-platform";
import StickyComponent from "../components/physics/sticky";

export class MovingPlatform extends Actor {
  constructor(args, cb) {
    super({
      color: Color.fromHex("#f95f55"),
      collisionType: CollisionType.Fixed,
      
      ...args
    });

    this.stickyComponent = new StickyComponent();
    this.addComponent(this.stickyComponent);
    this.addComponent(new OneWayCollisionComponent());

    cb(this.actions);
  }

  onPostUpdate(engine, delta) {
    this.stickyComponent.update(engine, delta);
  }
}
