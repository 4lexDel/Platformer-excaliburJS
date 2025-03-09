import { MovingPlatform } from '../actors/MovingPlatform';
import { Ground } from '../actors/Ground';
import { Player } from '../actors/Player';
import { Flag } from '../actors/Flag';
import { FixedPlatform } from '../actors/FixedPlatform';
import BaseScene from "./Base";
import { Color } from 'excalibur';

export default class Level1 extends BaseScene {
    onInitialize(engine) {
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
    }
}