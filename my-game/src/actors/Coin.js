import {
  ActionSequence,
  Actor,
  Animation,
  CollisionType,
  Color,
  ParallelActions,
  SpriteSheet,
  vec,
} from "excalibur";
import { CollectableComponent } from "../components/behaviours/collectable";
import { AnimationComponent } from "../components/graphics/animation";
import { Resources } from "../ressources";
import { Player } from "./Player";

const COIN_WIDTH = 16;
const COIN_HEIGHT = 16;

const SPRITE_WIDTH = 16;
const SPRITE_HEIGHT = 16;

const COIN_SPRITE_WIDTH = 16;
const COIN_SPRITE_HEIGHT = 16;

export class Coin extends Actor {
  elapsedMs = 0
  collected = false

  constructor(args) {
    super({
      anchor: vec(0.5, 0.75),
      width: COIN_WIDTH,
      height: COIN_HEIGHT,
      color: Color.Blue,
      collisionType: CollisionType.Passive,
      ...args,
    });

    this.pos.x += this.width * this.anchor.x
    this.pos.y -= this.height * this.anchor.y
  }

  onInitialize() {
    const spritesheet = SpriteSheet.fromImageSource({
      image: Resources.coinSpriteSheet,
      grid: {
        columns: 12,
        rows: 1,
        spriteWidth: SPRITE_WIDTH,
        spriteHeight: SPRITE_HEIGHT,
      },
    });

    this.animation = new AnimationComponent(
      {
        rotate: Animation.fromSpriteSheet(
          spritesheet,
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
          140
        ),
      },
      {
        width: (SPRITE_WIDTH * SPRITE_WIDTH) / COIN_SPRITE_WIDTH,
        height: (SPRITE_HEIGHT * SPRITE_HEIGHT) / COIN_SPRITE_HEIGHT,
      }
    );

    this.addComponent(this.animation);
    this.addComponent(new CollectableComponent());

    this.animation.set("rotate");
  }

  get collectable() {
    return this.get(CollectableComponent)
  }

  onPreUpdate(engine, delta) {
    this.elapsedMs += delta;

    // bobble up and down
    this.pos.y -= Math.sin(this.elapsedMs / 200) / 10;
  }

  collect() {
    if (!this.collectable.isCollectable || this.collectable.isCollected) return;

    // AudioManager.playSfx(Resources.sfx.collectCoin, { force: true });
    // GameManager.coins += 1;

    this.collectable.isCollected = true;
    this.actions.clearActions();
    this.actions
      .runAction(
        new ParallelActions([
          new ActionSequence(this, (ctx) => ctx.moveBy(vec(0, -16), 150)),
          new ActionSequence(this, (ctx) => ctx.fade(0, 150)),
        ])
      )
      .callMethod(() => {
        this.kill();
      });
  }

  onPreCollisionResolve(
    self,
    other,
    side,
    contact
  ) {
    if (other.owner instanceof Player) {
      this.collect();
      contact.cancel();
    }
  }
}
