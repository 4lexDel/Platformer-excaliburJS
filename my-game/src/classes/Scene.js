import { Color, Scene } from "excalibur";

export default class BaseScene extends Scene {
  onInitialize(engine, player) {
    this.backgroundColor = Color.fromHex('#87CEEB');

    // this.camera.strategy.radiusAroundActor(player, 200);
    // this.camera.pos.y = player.pos.y - 100;
    // this.camera.strategy.lockToActor(player, 0.1); // Makes camera follow player smoothly
    // this.camera.strategy.elasticToActor(player, 0.1); // Makes camera follow player smoothly

    // this.camera.strategy.add(CameraStrategy.clampToBound(this.camera, {
    //   left: 0,
    //   top: 0,
    //   right: 2000,  // Adjust based on level width
    //   bottom: 1000  // Adjust based on level height
    // }));

    // this.camera.zoom = 1.3;
    // this.camera.strategy.elasticToActor();
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
