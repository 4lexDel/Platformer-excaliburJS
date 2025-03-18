// Ground.js : use the code defined in the main.js file to create the Ground class (inherit from Actor) and add it to the game.
import { Actor, CollisionType, Color } from "excalibur";

export class Ground extends Actor {
    constructor() {
        super({
            x: 400,
            y: 550,
            width: 688,
            height: 20,
            color: Color.fromRGB(0, 175, 0),
            collisionType: CollisionType.Fixed
        });
        this.body.useGravity = false;
    }
}