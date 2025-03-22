import { Actor, GraphicsGroup, Sprite, vec } from "excalibur";
import { Resources } from "../ressources";

class PlatformType {
    static GRASS = "grass";
    static DIRT = "dirt";
    static GOLD = "gold";
    static ICE = "ice";
}

export class BasePlaform extends Actor {
  type = null;

  sprite = Resources.platformsSpriteSheet.toSprite();

  spriteOffsetY = {
    "grass": 0,
    "dirt": 16,
    "gold": 32,
    "ice": 48,
  };

  constructor(args, type=PlatformType.GRASS) {
    super(args);

    const middleWidth = this.width - 32;

    const leftEnd = new Sprite({
      image: this.sprite.image,
      destSize: {
        width: 16,
        height: this.height,
      },
      sourceView: {
        x: 16,
        y: this.spriteOffsetY[type],
        width: 16,
        height: 8,
      },
    });
    const rightEnd = new Sprite({
      image: this.sprite.image,
      destSize: {
        width: 16,
        height: this.height,
      },
      sourceView: {
        x: 32,
        y: this.spriteOffsetY[type],
        width: 16,
        height: 8,
      },
    });

    // const middle = new Sprite({
    //   image: this.sprite.image,
    //   destSize: {
    //     width: 8,
    //     height: this.height,
    //   },
    //   sourceView: {
    //     x: 16,
    //     y: this.spriteOffsetY[type],
    //     width: 16,
    //     height: 8,
    //   },
    // });

    // compose the platform graphic from the 3 pieces
    this.graphics.use(
      new GraphicsGroup({
        members: [
          {
            graphic: leftEnd,
            offset: vec(0, 0),
          },
        //   ...Array.from({ length: middleWidth / 16 }, (_, i) => ({
        //     graphic: middle,
        //     offset: vec(16 + i * 16, 0),
        //   })),
          {
            graphic: rightEnd,
            offset: vec(this.width - 16, 0),
          },
        ],
      })
    );
  }
}
