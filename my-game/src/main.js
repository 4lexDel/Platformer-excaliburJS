import { ContactSolveBias, DisplayMode, Engine, FadeInOut, Resolution, SolverStrategy, vec } from "excalibur";
import { loader } from "./ressources";
import Level1_1 from "./scenes/Level1.1";
import Level1 from "./scenes/Level1.1";
import Level1_2 from "./scenes/Level1.2";

const game = new Engine({
  width: 800,
  height: 600,
  // displayMode: DisplayMode.Fixed,
  fixdUpdateFps: 60,
  fixedUpdateTimestep: 20,
  antialiasing: false,
  physics: {
    solver: SolverStrategy.Arcade,
    gravity: vec(0, 800),
  },
  pixelRatio: 4, // 4x upscale the resolution, logs an incorrect warning
  pixelArt: true, // turn on pixel art sampler
  scenes: {
    level1_1: {
      scene: Level1_1,
      transitions: {
        out: new FadeInOut({
          duration: 300,
          direction: "out",
        }),
        in: new FadeInOut({ duration: 300, direction: "in" }),
      },
    },
    level1_2: {
      scene: Level1_2,
      transitions: {
        out: new FadeInOut({
          duration: 300,
          direction: "out",
        }),
        in: new FadeInOut({ duration: 300, direction: "in" }),
      },
    },
  },
});

// game.screen.viewport = { width: 800, height: 600 }
// game.screen.resolution = { width: 400, height: 300};
// game.screen.applyResolutionAndViewport();
// game.graphicsContext.snapToPixel = true;
// game.physics.useRealisticPhysics = false;
// game.engine.physics.useArcadePhysics();
// game.showDebug(true);


game.start(loader).then(() => {
  game.goToScene("level1_1");
});

// document.addEventListener("visibilitychange", () => {
//   if (document.hidden) {
//       game.stop();
//   } else {
//       game.start();
//   }
// });

// TODO INTERRACT WITH THE WORLD !!!!!!!!!!