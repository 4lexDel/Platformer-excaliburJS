import { Actor, Color, Label, vec } from "excalibur";
import BaseScene from "./Base";

export default class MainMenu extends BaseScene {
  onInitialize(engine) {
    // Title
    const title = new Label({
      text: "My Awesome Game",
      pos: vec(engine.drawWidth / 2, 100),
      color: Color.White,
      fontSize: 40,
      textAlign: "center",
    });

    title.anchor.setTo(0.5, 0.5);
    this.add(title);

    // "Start Game" button
    const startButton = new Actor({
      pos: vec(engine.drawWidth / 2, 200),
      width: 200,
      height: 50,
      color: Color.Green,
    });

    this.add(startButton);

    // Button label
    const startLabel = new Label({
      text: "Start Game",
      pos: vec(engine.drawWidth / 2, 200),
      color: Color.White,
      fontSize: 20,
      textAlign: "center",
    });

    startLabel.anchor.setTo(0.5, 0.5);
    this.add(startLabel);

    startButton.on("pointerup", () => {
      engine.goToScene("level1");
    });

    engine.input.keyboard.on("press", (evt) => {
      if (evt.key === "Enter") {
        engine.goToScene("level1");
      }
    });
  }
}
