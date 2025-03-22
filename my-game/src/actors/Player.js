import {
  Actor,
  Animation,
  CollisionType,
  Color,
  Side,
  SpriteSheet,
  TileMap,
} from "excalibur";
import { AnimationComponent } from "../components/graphics/animation";
import { PlayerControlsComponent } from "../components/input/control";
import { Resources } from "../ressources";

const PLAYER_WIDTH = 16;
const PLAYER_HEIGHT = 20;

const SPRITE_WIDTH = 16;
const SPRITE_HEIGHT = 20;

const PLAYER_SPRITE_WIDTH = 16;
const PLAYER_SPRITE_HEIGHT = 20;

export class Player extends Actor {
  nbJumpMax = 2;
  nbJumpUsed = 0;

  currentActorsCollide = new Set();

  controls = new PlayerControlsComponent();

  facing = "right";

  constructor(args) {
    super({
      width: PLAYER_WIDTH,
      height: PLAYER_HEIGHT,
      color: Color.Blue,
      collisionType: CollisionType.Active,
      ...args,
    });
    this.body.useGravity = true;

    this.addComponent(this.controls);
  }

  onInitialize(engine) {
    const spritesheet = SpriteSheet.fromImageSource({
      image: Resources.playerSpriteSheet,
      grid: {
        columns: 8,
        rows: 8,
        spriteWidth: SPRITE_WIDTH,
        spriteHeight: SPRITE_HEIGHT,
      },
      spacing: {
        //margin 8 spacing 12
        originOffset: { x: 8, y: 8 },
        margin: { x: 16, y: 12 },
      },
    });

    this.animation = new AnimationComponent(
      {
        idle: Animation.fromSpriteSheet(spritesheet, [0, 1, 2, 3], 140),
        run: Animation.fromSpriteSheet(
          spritesheet,
          [16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
          140
        ),
        jump: Animation.fromSpriteSheet(spritesheet, [0, 1, 2, 3], 140),
        roll: Animation.fromSpriteSheet(
          spritesheet,
          [40, 41, 42, 43, 44, 45, 46, 47],
          140
        ),
        hit: Animation.fromSpriteSheet(spritesheet, [48, 49, 50, 51], 140),
        death: Animation.fromSpriteSheet(
          spritesheet,
          [56, 57, 58, 59, 60, 61, 62, 63],
          140
        ),
      },
      {
        width: (PLAYER_WIDTH * SPRITE_WIDTH) / PLAYER_SPRITE_WIDTH,
        height: (PLAYER_HEIGHT * SPRITE_HEIGHT) / PLAYER_SPRITE_HEIGHT,
      }
    );

    this.addComponent(this.animation);

    this.animation.set("idle");
  }

  onPostUpdate(engine) {
    if (this.controls.isMoving)
      this.facing = this.controls.getHeldXDirection().toLowerCase();
    this.graphics.flipHorizontal = this.facing === "left";

    let horizontalSpeedMax = 140;
    if (this.currentActorsCollide.size === 0) horizontalSpeedMax = 100;

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
    let descelerate = 0.65;
    if (this.currentActorsCollide.size === 0) descelerate = 0.86;
    this.vel.x *= descelerate;
    if (Math.abs(this.vel.x) < 1) this.vel.x = 0;

    const jump = () => {
      this.vel.y = -250;
      this.animation.set("jump");
    };

    if (this.controls.wasPressed("Jump") && this.nbJumpMax > this.nbJumpUsed) {
      this.setNbJumpUsed(this.nbJumpUsed + 1);
      jump();
    }
  }

  // onPreCollisionResolve(self, other, side, contact) {
  //   if (other.owner instanceof Flag) {
  //     other.owner.kill();
  //   }
  // }

  onPostCollisionResolve(self, other, side, contact) {
    if (
      (other.owner instanceof Actor || other.owner instanceof TileMap) &&
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
