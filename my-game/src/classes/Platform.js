import {
  Actor,
  GraphicsGroup,
  Sprite,
  vec,
} from "excalibur";

export class BasePlaform extends Actor {
  constructor(args, sprite) {
    super(args);

    const middleWidth = this.width - 32;

    // our platform sprite is only 48x16, so we'll chpp it up into 3 piece - left, middle, right -
    // so that we can extend the platform to be as wide as we need
    const leftEnd = new Sprite({
      image: sprite.image,
      destSize: {
        height: this.height,
        width: 16,
      },
      sourceView: {
        x: 0,
        y: 0,
        width: 16,
        height: 16,
      },
    });
    const rightEnd = new Sprite({
      image: sprite.image,
      destSize: {
        height: this.height,
        width: 16,
      },
      sourceView: {
        x: 32,
        y: 0,
        width: 16,
        height: 16,
      },
    });

    const middle = new Sprite({
      image: sprite.image,
      destSize: {
        height: this.height,
        width: 16,
      },
      sourceView: {
        x: 16,
        y: 0,
        width: 16,
        height: 16,
      },
    });

    // compose the platform graphic from the 3 pieces
    this.graphics.use(
      new GraphicsGroup({
        members: [
          {
            graphic: leftEnd,
            offset: vec(0, 0),
          },
          ...Array.from({ length: middleWidth / 16 }, (_, i) => ({
            graphic: middle,
            offset: vec(16 + i * 16, 0),
          })),
          {
            graphic: rightEnd,
            offset: vec(this.width - 16, 0),
          },
        ],
      })
    );
  }
}
