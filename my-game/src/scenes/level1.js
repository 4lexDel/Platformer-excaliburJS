import BaseScene from "../classes/Scene";
import { Resources } from "../ressources";

export default class Level1 extends BaseScene {
  constructor() {
    super({
      tilemap: Resources.tiledMap
    });
  }
}
//   song: null,//Resources.music.stage1,
