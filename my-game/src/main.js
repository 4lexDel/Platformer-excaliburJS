import { Engine, vec, SolverStrategy, FadeInOut, Resolution, DisplayMode } from "excalibur";
import { loader } from "./ressources";
import Level1 from "./scenes/Level1";
import Level2 from "./scenes/Level2";
import Level3 from "./scenes/Level3";
// import MainMenu from "./scenes/MainMenu";

const game = new Engine({
  // resolution: {
  //   height: Resolution.SNES.height,
  //   // make 16:9
  //   width: (Resolution.SNES.height / 9) * 16,
  // },
  width: 800,
  height: 600,
  displayMode: DisplayMode.FitScreenAndFill,
  fixedUpdateFps: 60,
  physics: {
    solver: SolverStrategy.Arcade,
    gravity: vec(0, 1400),
  },
  // pixelRatio: 2, // 4x upscale the resolution, logs an incorrect warning
  // pixelArt: true, // turn on pixel art sampler
  scenes: {
    // root: {
    //   scene: MainMenu,
    //   transitions: {
    //     out: new FadeInOut({
    //       duration: 300,
    //       direction: "out",
    //     }),
    //     in: new FadeInOut({ duration: 300, direction: "in" }),
    //   },
    // },
    root: {
      scene: Level1,
      transitions: {
        out: new FadeInOut({
          duration: 300,
          direction: "out",
        }),
        in: new FadeInOut({ duration: 300, direction: "in" }),
      },
    },
    level2: {
      scene: Level2,
      transitions: {
        out: new FadeInOut({
          duration: 300,
          direction: "out",
        }),
        in: new FadeInOut({ duration: 300, direction: "in" }),
      },
    },
    level3: {
      scene: Level3,
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

// get or set the viewport
const viewport = game.screen.viewport;
game.screen.viewport = { width: 800, height: 600 }

// get or set the resolution
// const resolution = game.screen.resolution;
game.screen.resolution = { width: 800, height: 600};
// game.screen.pixelRatioOverride =  2;

// Apply changes to viewport and resolution to the canvas and graphics context
game.screen.applyResolutionAndViewport();

game.start(loader).then(() => {
  // game.screen.applyResolutionAndViewport();
});

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
      game.stop();
  } else {
      game.start();
  }
});
