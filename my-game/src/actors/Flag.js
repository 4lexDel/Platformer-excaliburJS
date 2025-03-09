// Player.js : use the code defined in the main.js file to create the Player class (inherit from Actor) and add it to the engine.
import { Actor, CollisionType, Color, Keys } from "excalibur";

export class Flag extends Actor {
    constructor(x, y) {
        super({
            x: x,
            y: y,
            width: 30,
            height: 30,
            color: Color.Yellow,
            collisionType: CollisionType.Passive
        });
    }
}