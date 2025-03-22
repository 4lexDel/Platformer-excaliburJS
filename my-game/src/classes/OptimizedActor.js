import { Actor } from "excalibur";

export default class OptimizedActor extends Actor {
    constructor(config) {
        super(config);
    }

    onPostUpdate(engine, delta) {
        const camera = engine.currentScene.camera;
        const viewport = camera.viewport; // Get viewport bounds
        
        // Get actor's bounding box
        const bounds = this.bounds;

        if(!bounds) return;
        
        // console.log(bounds);
        // Check if actor is outside th(e viewport
        const isOffScreen = (
            bounds.right < viewport.left || // Left side
            bounds.left > viewport.right || // Right side
            bounds.bottom < viewport.top || // Top side
            bounds.top > viewport.bottom // Bottom side
        );
            
        // console.log(2);

        if (isOffScreen) {
            this.visible = false;
            // this.body.active = false;
            this.actions.clear();
        } else {
            this.visible = true;
            // this.body.active = true;
        }
    }
}
