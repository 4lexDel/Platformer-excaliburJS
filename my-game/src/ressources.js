import { ImageSource, Loader } from "excalibur";
import { TiledResource } from '@excaliburjs/plugin-tiled';

const BASE_URL = import.meta.env.MODE === 'production' ? '/platformer-excalibur-js' : '';

export const Resources = {
  platformsSpriteSheet: new ImageSource(BASE_URL + '/res/src/sprites/platforms.png'),
  playerSpriteSheet: new ImageSource(BASE_URL + '/res/src/sprites/knight.png'),
  coinSpriteSheet: new ImageSource(BASE_URL + '/res/src/sprites/coin.png'),
  tiledMapLevel1_1: new TiledResource(BASE_URL + '/res/level1.1.tmx'),
  tiledMapLevel1_2: new TiledResource(BASE_URL + '/res/level1.2.tmx')
}

// Resources.tiledMap.load().then(() => {
//   console.log("tiledMap.load()");

//   console.log(Resources.tiledMap.map);
  
//   Resources.tiledMap.tilesets.forEach(tileset => {
//     console.log(tileset);
//     // tileset.
//     // const map = tiledMap.getTileMap();
//   });
//   // const map = Resources.tiledMap.getTileMap(); // Récupère l'objet TileMap après le chargement
  
//   // if (map) {
//   //   map.useCull = true; // Active le culling pour améliorer les performances
//   //   game.add(map); // Ajoute la tilemap à la scène
//   // }
// });

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