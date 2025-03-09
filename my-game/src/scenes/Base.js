import { Color, FadeInOut, Scene } from "excalibur";

export default class BaseScene extends Scene {
  onInitialize() {
    this.camera.strategy.radiusAroundActor(player);
  }
}

// this.on('postupdate', () => {
//   // Alternative: // this.camera.strategy.lockToActor(player);

//   const camera = this.camera;
//   const target = player.pos.clone(); // The player or any moving target
//   target.y -= 100;

//   // Lerp formula: newPos = currentPos + (targetPos - currentPos) * alpha
//   const lerpFactor = 0.2; // Adjust for smoothness (0 = no movement, 1 = instant)
//   camera.pos = camera.pos.add(target.sub(camera.pos).scale(lerpFactor));
// });
