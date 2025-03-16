import { Buttons, Component, Keys } from "excalibur";

export class ControlsComponent extends Component {
  constructor() {
    super();
    this.type = 'input';
    this.controls = {
      Left: [Keys.Left, Buttons.DpadLeft],
      Right: [Keys.Right, Buttons.DpadRight],
      Up: [Keys.Up, Buttons.DpadUp],
      Down: [Keys.Down, Buttons.DpadDown],
      Jump: [Keys.Space, Buttons.Face1],
      Run: [Keys.S, Buttons.Face3],
    };
  }

  isHeld(control) {
    const engine = this.owner.scene.engine;
    const [key, button] = this.controls[control];

    return Boolean(
      engine.input.keyboard.isHeld(key) ||
      this.getGamepad()?.isButtonHeld(button)
    );
  }

  wasPressed(control) {
    const engine = this.owner.scene.engine;
    const [key, button] = this.controls[control];

    return Boolean(
      engine.input.keyboard.wasPressed(key) ||
      this.getGamepad()?.wasButtonPressed(button)
    );
  }

  wasReleased(control) {
    const engine = this.owner.scene.engine;
    const [key, button] = this.controls[control];

    return Boolean(
      engine.input.keyboard.wasReleased(key) ||
      this.getGamepad()?.wasButtonReleased(button)
    );
  }

  getGamepad() {
    const engine = this.owner.scene.engine;
    return [
      engine.input.gamepads.at(0),
      engine.input.gamepads.at(1),
      engine.input.gamepads.at(2),
      engine.input.gamepads.at(3),
    ].find((g) => g?.connected);
  }

  getHeldXDirection() {
    const engine = this.owner.scene.engine;

    for (const key of engine.input.keyboard.getKeys().slice().reverse()) {
      if (this.controls.Left.includes(key)) return 'Left';
      if (this.controls.Right.includes(key)) return 'Right';
    }

    if (this.getGamepad()) {
      if (this.isHeld('Left')) return 'Left';
      if (this.isHeld('Right')) return 'Right';
    }
  }

  getHeldYDirection() {
    const engine = this.owner.scene.engine;

    for (const key of engine.input.keyboard.getKeys().slice().reverse()) {
      if (this.controls.Up.includes(key)) return 'Up';
      if (this.controls.Down.includes(key)) return 'Down';
    }

    if (this.getGamepad()) {
      if (this.isHeld('Up')) return 'Up';
      if (this.isHeld('Down')) return 'Down';
    }
  }
}

export class PlayerControlsComponent extends ControlsComponent {
  constructor() {
    super();
    this.sprintTimer = 0;
  }

  onAdd(owner) {
    super.onAdd?.(owner);
    this.owner = owner;

    // Increment the sprint timer to toggle sprinting if running for SPRINT_TRIGGER_TIME
    owner.on('postupdate', ({ delta }) => {
      const isOnGround = this.owner.isOnGround;
      const jumpedBeforeSprinting = !isOnGround && !this.isSprinting;
      const isTurningOnGround = this.isTurning && isOnGround;

      if (this.isRunning && isOnGround && !isTurningOnGround) {
        this.sprintTimer = Math.min(
          this.sprintTimer + delta,
          this.owner.SPRINT_TRIGGER_TIME
        );
      }
      // Reset the sprint timer if we're not running
      else if (!this.isRunning || isTurningOnGround || jumpedBeforeSprinting) {
        this.sprintTimer = 0;
      }
    });
  }

  get isMoving() {
    return this.getHeldXDirection() !== undefined;
  }

  get isRunning() {
    return this.isMoving && this.isHeld('Run');
  }

  get isSprinting() {
    return this.isRunning && this.sprintTimer >= this.owner.SPRINT_TRIGGER_TIME;
  }

  get isTurning() {
    const heldDirection = this.getHeldXDirection();
    
    return (
      (heldDirection === 'Left' && this.owner.vel.x > 0) ||
      (heldDirection === 'Right' && this.owner.vel.x < 0)
    );
  }
}