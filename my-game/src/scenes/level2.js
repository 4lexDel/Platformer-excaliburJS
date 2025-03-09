import { Color } from "excalibur";

import { MovingPlatform } from '../actors/MovingPlatform';
import { Ground } from '../actors/Ground';
import { Player } from '../actors/Player';
import { Flag } from '../actors/Flag';
import { FixedPlatform } from '../actors/FixedPlatform';
import BaseScene from "./Base";

export default class Level2 extends BaseScene {
    onInitialize() {
        this.backgroundColor = Color.fromHex('#87CEEB');

        // Player
        const player = new Player(100, 400);
        this.add(player);

        // Ground
        this.add(new Ground());

        // Arrival platform
        this.add(new FixedPlatform(700, 150, 200, 20));

        // Moving platforms
        this.add(new MovingPlatform(300, 500, 300, 600));
        this.add(new MovingPlatform(500, 400, 300, 600));

        // Flag
        this.add(new Flag(100, 250));
    }
}