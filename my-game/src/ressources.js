import { ImageSource, Loader } from "excalibur";

const BASE_URL = import.meta.env.MODE === 'production' ? '/platformer' : '';

export const Resources = {
  img: {
    player: new ImageSource(BASE_URL + '/res/images/Player2.png'),
  }
}

// instantly starts game once loading has completed
class DevLoader extends Loader {
  showPlayButton() {
    return Promise.resolve()
  }

  draw() {}
  dispose() {}
}

export const loader = new DevLoader();
// import.meta.env.MODE === 'development' ? new DevLoader() : new Loader()

for (const group of Object.values(Resources)) {
  for (const resource of Object.values(group)) {
    loader.addResource(resource)
  }
}