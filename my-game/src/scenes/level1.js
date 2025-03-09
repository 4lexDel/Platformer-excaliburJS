import { Color, Scene } from "excalibur";

import { MovingPlatform } from '../actors/MovingPlatform';
import { Ground } from '../actors/Ground';
import { Player } from '../actors/Player';
import { Flag } from '../actors/Flag';
import { FixedPlatform } from '../actors/FixedPlatform';

export default class Level1 extends Scene {
    onInitialize(engine) {
        console.log(engine);
        this.backgroundColor = Color.fromHex('#87CEEB');

        // Player
        const player = new Player(100, 400);
        this.add(player);

        // Ground
        this.add(new Ground());

        // Arrival platform
        this.add(new FixedPlatform(100, 350, 200, 20));

        // Moving platforms
        this.add(new MovingPlatform(300, 500, 300, 600));
        this.add(new MovingPlatform(500, 400, 300, 600));

        // Flag
        const flag = new Flag(100, 250)
        this.add(flag);

        // SCENE COMPLETE
        flag.onPostKill = () => {
            setTimeout(() => {
                engine.goToScene("level2");
            }, 1000);
        }

        this.camera.strategy.radiusAroundActor(player)
    }
}

// this.on('postupdate', () => {
//   // Alternative: // this.camera.strategy.lockToActor(player);

//   const camera = this..camera;
//   const target = player.pos.clone(); // The player or any moving target
//   target.y -= 100;

//   // Lerp formula: newPos = currentPos + (targetPos - currentPos) * alpha
//   const lerpFactor = 0.2; // Adjust for smoothness (0 = no movement, 1 = instant)
//   camera.pos = camera.pos.add(target.sub(camera.pos).scale(lerpFactor));
// });