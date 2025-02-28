// Player.js : use the code defined in the main.js file to create the Player class (inherit from Actor) and add it to the engine.
import { Actor, Collider, CollisionType, Color, Keys, PreCollisionEvent } from "excalibur";

export class Player extends Actor {
    constructor(x, y) {
        super({
            x: x,
            y: y,
            width: 20,
            height: 50,
            color: Color.Blue,
            collisionType: CollisionType.Active
        });
        this.body.useGravity = true;
    }

    initialiseController(engine) {
        this.on('preupdate', () => {
            if (engine.input.keyboard.isHeld(Keys.Left)) {
                this.vel.x = -250;
            } else if (engine.input.keyboard.isHeld(Keys.Right)) {
                this.vel.x = 250;
            } else {
                this.vel.x = 0;
            }

            if (engine.input.keyboard.wasPressed(Keys.Space) && this.vel.y === 0) {
                this.vel.y = -520;
            }
        });
    }

    setCollisionHandler(handler) {
        this.on('precollision', (evt) => {
                handler(evt);
            }
        );
    }
}