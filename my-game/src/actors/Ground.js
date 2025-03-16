// Ground.js : use the code defined in the main.js file to create the Ground class (inherit from Actor) and add it to the game.
import { CollisionType, Color } from "excalibur";
import { BasePlaform } from "../classes/Platform";
import { Resources } from "../ressources";

const sprite = Resources.img.grassPlatform.toSprite()

export class Ground extends BasePlaform {
    constructor() {
        super({
            x: 400,
            y: 550,
            width: 688,
            height: 20,
            color: Color.fromRGB(0, 175, 0),
            collisionType: CollisionType.Fixed
        }, sprite);
        this.body.useGravity = false;
    }
}