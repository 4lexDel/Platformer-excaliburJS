import { Color, vec } from "excalibur";

import { Ground } from "../actors/Ground";
import { Player } from "../actors/Player";
import { Flag } from "../actors/Flag";
import { FixedPlatform } from "../actors/FixedPlatform";
import BaseScene from "./Base";
import { MovingPlatform2 } from "../actors/MovingPlatform2";

export default class Level3 extends BaseScene {
  onInitialize() {
    this.backgroundColor = Color.fromHex("#87CEEB");

    // Player
    const player = new Player(100, 400);
    this.add(player);

    // Ground
    this.add(new Ground());

    // Arrival platform
    this.add(new FixedPlatform(800, 150, 200, 20));

    // Moving platforms
    this.add(new MovingPlatform2(vec(350, 450), vec(100, 150), "diagonal"));
    this.add(new MovingPlatform2(vec(300, 150), vec(670, 150)));

    // Flag
    const flag = new Flag(750, 50);
    this.add(flag);

    // SCENE COMPLETE
    flag.onPostKill = () => {
      setTimeout(() => {
        alert("You have won !");
      }, 1000);
    };
  }
}
