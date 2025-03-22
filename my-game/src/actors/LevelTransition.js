// Player.js : use the code defined in the main.js file to create the Player class (inherit from Actor) and add it to the engine.
import { Actor, CollisionType, Color, Keys } from "excalibur";
import { Player } from "./Player";

export class LevelTransition extends Actor {
  constructor(args, targetLevel) {
    super({
      color: Color.Red,
      collisionType: CollisionType.Passive,
      ...args,
    });

    this.targetLevel = targetLevel;
    console.log("LevelTransition contructor");
  }

  //   onPostCollisionResolve(self, other, side, contact) {
  //       console.log("onPostCollisionResolve");
  //     if (other.owner instanceof Player) {
  //         this.engine.goToScene(this.targetLevel);
  //     }
  //   }

  onCollisionStart(self, other, side, contact) {
    if (other.owner instanceof Player) {
      console.log("Transition to ", this.targetLevel);
      this.scene.engine.goToScene(this.targetLevel);
    //   this.parent.goToScene(this.targetLevel);
    //   contact.cancel();
    }
  }
}
