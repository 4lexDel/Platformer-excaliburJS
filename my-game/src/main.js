import { Engine, vec, SolverStrategy, FadeInOut } from "excalibur";
import Level1 from "./scenes/Level1";
import Level2 from "./scenes/Level2";

const game = new Engine({
  width: 800,
  height: 600,
  physics: {
    solver: SolverStrategy.Arcade,
    gravity: vec(0, 1400),
  },
  scenes: {
    root: {
      scene: Level2,
      transitions: {
        out: new FadeInOut({
          duration: 300,
          direction: "out",
        }),
        in: new FadeInOut({ duration: 300, direction: "in" }),
      },
    },
    level2: Level1,
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
