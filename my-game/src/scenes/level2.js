import { Color, vec } from "excalibur";

import { Ground } from "../actors/Ground";
import { Player } from "../actors/Player";
import { Flag } from "../actors/Flag";
import { FixedPlatform } from "../actors/FixedPlatform";
import BaseScene from "./Base";
import { MovingPlatform2 } from "../actors/MovingPlatform2";

export default class Level2 extends BaseScene {
  onInitialize() {
    this.backgroundColor = Color.fromHex("#87CEEB");

    // Player
    const player = new Player(100, 400);
    this.add(player);

    // Ground
    this.add(new Ground());

    // Arrival platform
    this.add(new FixedPlatform(700, 150, 200, 20));

    // Moving platforms
    const platform = new MovingPlatform2(
      300,
      300,
      vec(300, 300), 
      vec(600, 300),
      "alternating"
    );
    this.add(platform);

    const diagonalPlatform = new MovingPlatform2(
      300,
      400,
      vec(300, 400), 
      vec(600, 600),
      "diagonal"
    );
    this.add(diagonalPlatform);

    // Flag
    const flag = new Flag(100, 50);
    this.add(flag);

    // SCENE COMPLETE
    flag.onPostKill = () => {
      setTimeout(() => {
        alert("You have won !");
      }, 1000);
    };
  }
}
