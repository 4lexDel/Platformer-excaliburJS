import BaseScene from "../classes/Scene";
import { Resources } from "../ressources";

export default class Level1_1 extends BaseScene {
  constructor() {
    super({
      tilemap: Resources.tiledMapLevel1_1
    });
  }
}
//   song: null,//Resources.music.stage1,
