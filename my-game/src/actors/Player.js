// Player.js : use the code defined in the main.js file to create the Player class (inherit from Actor) and add it to the engine.
import { Actor, CollisionType, Color, Keys, Side } from "excalibur";
import { Flag } from "./Flag";

export class Player extends Actor {
  nbJumpMax = 2;
  nbJumpUsed = 0;

  currentActorsCollide = new Set();

  constructor(x, y) {
    super({
      x: x,
      y: y,
      width: 20,
      height: 50,
      color: Color.Blue,
      collisionType: CollisionType.Active,
    });
    this.body.useGravity = true;
  }

  onPreUpdate(engine) {
    if (engine.input.keyboard.isHeld(Keys.Left)) {
      this.vel.x = -250;
    } else if (engine.input.keyboard.isHeld(Keys.Right)) {
      this.vel.x = 250;
    } else {
      this.vel.x = 0;
    }

    const jump = () => (this.vel.y = -600);

    if (
      engine.input.keyboard.wasPressed(Keys.Space) &&
      this.nbJumpMax > this.nbJumpUsed
    ) {
      this.setNbJumpUsed(this.nbJumpUsed + 1);
      jump();
      console.log(this.nbJumpUsed);
    }

    // let colors = [Color.Red, Color.Green, Color.Blue];
    // let colorIndex = 0;

    // if (engine.clock.now() % 1000 < 16) {
    //   // Change every second
    //   this.graphics.color = colors[colorIndex % colors.length];
    //   colorIndex++;
    // }
  }

  onPreCollisionResolve(self, other, side, contact) {
    if (other.owner instanceof Flag) {
      other.owner.kill();
      setTimeout(() => {
        alert("Vous avez gagné !");
        // game.stop();
      }, 200);
    }
  }

  onPostCollisionResolve(self, other, side, contact) {
    if (
      other.owner instanceof Actor &&
      side === Side.Bottom &&
      Math.abs(this.vel.y) <= 5
    ) {
      this.setNbJumpUsed(0);
    }
  }

  onCollisionStart(self, other, side, lastContact) {
    if (other.owner instanceof Actor) {
      this.currentActorsCollide.add(other.owner);
    }
  }

  onCollisionEnd(self, other, side, lastContact) {
    if (this.currentActorsCollide.has(other.owner)) {
      this.currentActorsCollide.delete(other.owner);

      if (this.currentActorsCollide.size === 0 && this.nbJumpUsed == 0) {
        this.setNbJumpUsed(1);
      }
    }
  }

  setNbJumpUsed(value) {
    this.nbJumpUsed = value;

    switch (value) {
      case 0:
        this.color = Color.Red;
        break;
      case 1:
        this.color = Color.Purple;
        break;
    }
  }
}
