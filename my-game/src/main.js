import { Engine, FadeInOut } from "excalibur";
import { loader, Resources } from "./ressources";
import Level1 from "./scenes/Level1";

const game = new Engine({
  width: 800,
  height: 400,
  // physics: {
  //   solver: SolverStrategy.Arcade,
  //   gravity: vec(0, 1400),
  // },
  pixelRatio: 2, // 4x upscale the resolution, logs an incorrect warning
  pixelArt: true, // turn on pixel art sampler
  // scenes: {
  //   root: {
  //     scene: Level1,
  //     transitions: {
  //       out: new FadeInOut({
  //         duration: 300,
  //         direction: "out",
  //       }),
  //       in: new FadeInOut({ duration: 300, direction: "in" }),
  //     },
  //   },
  // },
});

// game.screen.viewport = { width: 800, height: 400 }
// game.screen.resolution = { width: 800, height: 400};
// game.screen.applyResolutionAndViewport();

game.start(loader).then(() => {
  Resources.tiledMap.addToScene(game.currentScene);
  // game.currentScene.camera.zoom = 2;
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
      game.stop();
  } else {
      game.start();
  }
});
