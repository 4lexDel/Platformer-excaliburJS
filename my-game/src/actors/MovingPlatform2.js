import { Actor, CollisionType, Color, vec } from "excalibur";
import { OneWayCollisionComponent } from "../components/physics/one-way-platform";
import StickyComponent from "../components/physics/sticky";

export class MovingPlatform2 extends Actor {
  constructor(x, y, A, B, movementMode = "alternating") {
    super({
      x,
      y,
      width: 100,
      height: 15,
      color: Color.Black,
      collisionType: CollisionType.Fixed,
      vel: vec(100, 0),
    });

    this.A = A;
    this.B = B;
    this.movementMode = movementMode; // "alternating" or "diagonal"
    this.stickyComponent = new StickyComponent();
    this.addComponent(this.stickyComponent);
    
    this.addComponent(new OneWayCollisionComponent());
    
    this.direction = 1; // 1: moving towards B, -1: moving towards A
    this.currentTarget = A; // Initially start at A
    this.currentPosition = this.pos.clone();
  }

  onPostUpdate(engine, delta) {
    this.stickyComponent.update(engine, delta);

    // Decide which direction to move based on the current target
    let target = this.currentTarget;
    let diff = target.clone().sub(this.pos);
    let distance = diff.length;

    // If we are very close to the target, switch to the other target
    if (distance < 5) {
      this.currentTarget = this.currentTarget === this.A ? this.B : this.A;
    }

    // Move the platform based on the chosen movement mode
    if (this.movementMode === "diagonal") {
      // Diagonal movement: directly move to the target
      this.vel = diff.normalize().scale(100);
    } else if (this.movementMode === "alternating") {
      // Alternating movement: move horizontally first, then vertically
      if (this.currentTarget === this.A || this.currentTarget === this.B) {
        // Move horizontally first
        if (this.pos.x !== target.x) {
          this.vel.x = target.x > this.pos.x ? 100 : -100;
        } else {
          // Once at the correct x position, move vertically
          this.vel.y = target.y > this.pos.y ? 100 : -100;
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
