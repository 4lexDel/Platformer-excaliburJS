import { Actor, CollisionType, Color, vec } from "excalibur";
import { OneWayCollisionComponent } from "../components/physics/one-way-platform";
import StickyComponent from "../components/physics/sticky";

export class MovingPlatform2 extends Actor {
  constructor(A, B, movementMode = "alternating") {
    super({
      x: A.x,
      y: A.y,
      width: 100,
      height: 15,
      color: Color.Black,
      collisionType: CollisionType.Fixed,
    });

    this.speed = 200;
    this.seuil = this.speed / 5;

    this.A = A;
    this.B = B;
    this.movementMode = movementMode; // "alternating" or "diagonal"
    this.stickyComponent = new StickyComponent();
    this.addComponent(this.stickyComponent);
    this.addComponent(new OneWayCollisionComponent());

    this.direction = true;
    this.currentTarget = B;
    this.currentPosition = this.pos.clone();
  }

  onPostUpdate(engine, delta) {
    this.stickyComponent.update(engine, delta);

    // Decide which direction to move based on the current target
    let target = this.currentTarget;
    let diff = target.clone().sub(this.pos);
    let distance = target.distance(this.pos);

    // console.log(`TARGET = ${target}`);
    // console.log(`POS = ${this.pos}`);
    // console.log(`DISTANCE = ${distance}`);

    // If we are very close to the target, switch to the other target
    if (distance < this.seuil) {
      this.currentTarget = this.currentTarget === this.A ? this.B : this.A;
      this.direction = !this.direction;
    }

    // Move the platform based on the chosen movement mode
    if (this.movementMode === "diagonal") {
      // Diagonal movement: directly move to the target
      this.vel = diff.normalize().scale(this.speed);
    } else if (this.movementMode === "alternating") {
      const isSeuilXReached = Math.abs(this.pos.x - target.x) > this.seuil;
      const isSeuilYReached = Math.abs(this.pos.y - target.y) > this.seuil;

      if (this.direction) {
        if (isSeuilXReached) {
          this.vel.y = 0;
          this.vel.x = target.x > this.pos.x ? this.speed : -this.speed;
        } else if (isSeuilYReached) {
          this.vel.x = 0;
          this.vel.y = target.y > this.pos.y ? this.speed : -this.speed;
        }
      } else {
        if (isSeuilYReached) {
          this.vel.x = 0;
          this.vel.y = target.y > this.pos.y ? this.speed : -this.speed;
        } else if (isSeuilXReached) {
          this.vel.x = target.x > this.pos.x ? this.speed : -this.speed;
          this.vel.y = 0;
        }
      }
    }
  }

  onPostDraw(ctx) {
    super.onPostDraw(ctx);
    // Debugging: draw the path (optional)
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.moveTo(this.A.x, this.A.y);
    ctx.lineTo(this.B.x, this.B.y);
    ctx.stroke();
  }
}
