// Player.js : use the code defined in the main.js file to create the Player class (inherit from Actor) and add it to the engine.
import {
  Actor,
  Animation,
  AnimationStrategy,
  CollisionType,
  Color,
  Keys,
  Side,
  SpriteSheet,
  vec,
} from "excalibur";
import { AnimationComponent } from "../components/graphics/animation";
import { PlayerControlsComponent } from "../components/input/control";
import { Resources } from "../ressources";
import { Flag } from "./Flag";

const SPRITE_WIDTH = 96;
const SPRITE_HEIGHT = 96;
const spritesheet = SpriteSheet.fromImageSource({
  image: Resources.img.player,
  grid: {
    columns: 4,
    rows: 7,
    spriteWidth: SPRITE_WIDTH,
    spriteHeight: SPRITE_HEIGHT,
  },
});

export class Player extends Actor {
  nbJumpMax = 2;
  nbJumpUsed = 0;

  currentActorsCollide = new Set();

  animation = new AnimationComponent({
    idle: Animation.fromSpriteSheet(spritesheet, [0, 1, 2, 3], 140),
    run: Animation.fromSpriteSheet(spritesheet, [4, 5, 6, 7], 140),
    sprint: Animation.fromSpriteSheet(spritesheet, [8, 9, 10, 11], 140),
    jump: Animation.fromSpriteSheet(spritesheet, [12], 140),
    fall: Animation.fromSpriteSheet(spritesheet, [13], 140),
    turn: Animation.fromSpriteSheet(spritesheet, [16], 140),
    ladder_climb: Animation.fromSpriteSheet(spritesheet, [20, 21], 140),
    wall_slide: Animation.fromSpriteSheet(
      spritesheet,
      [16],
      100,
      AnimationStrategy.Loop
    ),
  });

  controls = new PlayerControlsComponent();

  facing = "right";

  constructor(x, y) {
    super({
      x: x,
      y: y,
      width: 32,
      height: 32,
      color: Color.Blue,
      collisionType: CollisionType.Active,
    });
    this.body.useGravity = true;

    this.addComponent(this.animation);
    this.addComponent(this.controls);
  }

  onInitialize(engine) {
    this.animation.set("idle");
  }

  onPreUpdate(engine) {
    if(this.controls.isMoving) this.facing = this.controls.getHeldXDirection().toLowerCase();
    this.graphics.flipHorizontal = this.facing === 'left';

    let horizontalSpeedMax = 250;
    if(this.currentActorsCollide.size === 0) horizontalSpeedMax = 200;

    if (this.controls.isHeld("Left")) {
      this.animation.set("run");
      this.vel.x = Math.min(this.vel.x, -horizontalSpeedMax);
    } else if (this.controls.isHeld("Right")) {
      this.animation.set("run");
      this.vel.x = Math.max(this.vel.x, horizontalSpeedMax);
    } else {
      this.animation.set("idle");
    }

    // DESCELERATE
    let descelerate = .85;
    if(this.currentActorsCollide.size === 0) descelerate = .96;
    this.vel.x *= descelerate;
    if(Math.abs(this.vel.x) < 1) this.vel.x = 0;

    const jump = () => {
      this.vel.y = -600;
      this.animation.set("jump");
    };

    if (this.controls.wasPressed("Jump") && this.nbJumpMax > this.nbJumpUsed) {
      this.setNbJumpUsed(this.nbJumpUsed + 1);
      jump();
    }
  }

  onPreCollisionResolve(self, other, side, contact) {
    if (other.owner instanceof Flag) {
      other.owner.kill();
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
