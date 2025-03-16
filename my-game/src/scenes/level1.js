import { Ground } from '../actors/Ground';
import { Player } from '../actors/Player';
import { Flag } from '../actors/Flag';
import { FixedPlatform } from '../actors/FixedPlatform';
import BaseScene from "../classes/Scene";
import { Color, vec } from 'excalibur';
import { MovingPlatform } from '../actors/MovingPlatform';

export default class Level1 extends BaseScene {
    onInitialize(engine) {
        // Player
        const player = new Player(100, 400);
        this.add(player);
        
        super.onInitialize(engine, player)

        // Ground
        this.add(new Ground());

        // Arrival platform
        this.add(new FixedPlatform(100, 350, 192, 20));

        // Moving platforms
        this.add(new MovingPlatform(vec(300, 500), vec(600, 500), MovingPlatform.ALTERNATING, 100));
        this.add(new MovingPlatform(vec(600, 400), vec(300, 400), MovingPlatform.DIAGONAL, 100));


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