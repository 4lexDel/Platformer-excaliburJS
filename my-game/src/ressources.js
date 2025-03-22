import { ImageSource, Loader } from "excalibur";
import { TiledResource } from '@excaliburjs/plugin-tiled';

const BASE_URL = import.meta.env.MODE === 'production' ? '/platformer' : '';

export const Resources = {
  platformsSpriteSheet: new ImageSource(BASE_URL + '/res/src/sprites/platforms.png'),
  playerSpriteSheet: new ImageSource(BASE_URL + '/res/src/sprites/knight.png'),
  coinSpriteSheet: new ImageSource(BASE_URL + '/res/src/sprites/coin.png'),
  tiledMap: new TiledResource(BASE_URL + '/res/map.tmx')
}

class DevLoader extends Loader {
  showPlayButton() {
    return Promise.resolve()
  }

  draw() {}
  dispose() {}
}

export const loader = new DevLoader();
// import.meta.env.MODE === 'development' ? new DevLoader() : new Loader()
// export const loader = new Loader();

for (let resource of Object.values(Resources)) {
    loader.addResource(resource);
}