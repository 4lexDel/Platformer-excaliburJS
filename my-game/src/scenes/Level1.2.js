import BaseScene from "../classes/Scene";
import { Resources } from "../ressources";

export default class Level1_2 extends BaseScene {
  constructor() {
    super({
      tilemap: Resources.tiledMapLevel1_2
    });
  }
}
//   song: null,//Resources.music.stage1,
