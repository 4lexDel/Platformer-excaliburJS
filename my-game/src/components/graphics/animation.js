import { Component } from "excalibur";

/**
 * Allows you to set the animations on the actor by key, adjust the speed of the animations,
 * and get the current animation.
 */
export class AnimationComponent extends Component {
  constructor(animations, spriteSize) {
    super();
    this.type = 'animation';
    this._animations = animations;
    this._speed = 1;
    this._frameDurations = new WeakMap();

    // Resize the frame
    Object.values(this._animations).forEach((anim) => {
        anim.frames.forEach((frame) => {
          frame.graphic.destSize.width = spriteSize.width;
          frame.graphic.destSize.height = spriteSize.height;
        });
      })
  }

  /**
   * Sets the current animation starting from the beginning. If the animation is already playing,
   * it will not be restarted. Optionally provide a duration left.
   */
  set(name, startFromFrame = 0, durationLeft) {
    const prevAnim = this.owner.graphics.current;
    const anim = this._animations[name];

    // return if the animation is already playing
    if (this.is(name)) return;

    if (startFromFrame) {
      anim.goToFrame(startFromFrame, durationLeft);
    } else {
      anim.reset();
    }

    // carry over scale from the previous graphic
    if (prevAnim) {
      anim.scale.setTo(prevAnim.scale.x, prevAnim.scale.y);
      anim.opacity = prevAnim.opacity;
    }

    this.owner.graphics.use(anim);
  }

  /**
   * Returns the animation by name.
   */
  get(name) {
    return this._animations[name];
  }

  /**
   * Sets the speed of the animation. 1 is normal speed, 2 is double speed, etc.
   */
  set speed(value) {
    this._speed = value;

    if (value === 0) return;

    this.current.frames.forEach((frame) => {
      // store the initial duration of the frame
      if (!this._frameDurations.has(frame)) {
        this._frameDurations.set(frame, frame.duration ?? 0);
      }

      const baseDuration = this._frameDurations.get(frame);
      frame.duration = baseDuration / value;
    });
  }

  /**
   * Returns the speed of the animation.
   */
  get speed() {
    return this._speed;
  }

  /**
   * Returns the current animation.
   */
  get current() {
    return this.owner.graphics.current;
  }

  is(animation) {
    return this.current === this.get(animation);
  }
}
