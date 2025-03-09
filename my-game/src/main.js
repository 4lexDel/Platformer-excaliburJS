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
      scene: Level1,
      transitions: {
        out: new FadeInOut({
          duration: 300,
          direction: "out",
        }),
        in: new FadeInOut({ duration: 300, direction: "in" }),
      },
    },
    level2: Level2,
  },
});

game.start();



// setTimeout(() => {
//   game.goToScene("level2");
// }, 1000);

// setTimeout(() => {
//   game.goToScene("root");
// }, 3000);
