import { Engine, vec, SolverStrategy, FadeInOut } from "excalibur";
import Level1 from "./scenes/Level1";
import Level2 from "./scenes/Level2";
import Level3 from "./scenes/Level3";

const game = new Engine({
  width: 800,
  height: 600,
  physics: {
    solver: SolverStrategy.Arcade,
    gravity: vec(0, 1400),
  },
  scenes: {
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

game.start();

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
      game.stop();
  } else {
      game.start();
  }
});
