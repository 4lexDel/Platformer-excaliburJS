export class PlayerPlatformPhysics{
    static enablePhysic(engine, player, platforms){
        let lastPlatformX = 0;
        let currentPlatform = null;

        player.on('collisionstart', (event) => {
            const platformCollided = platforms.find((platform) => platform === event.other.owner);

            if (platformCollided && player.pos.y < platformCollided.pos.y) {
              console.log("Le joueur est sur la plateforme");
              currentPlatform = platformCollided;
              lastPlatformX = platformCollided.pos.x;
            }
          });
          
          // Gestion du suivi du joueur
          engine.on('postupdate', () => {
            if (currentPlatform) {
              let deltaX = currentPlatform.pos.x - lastPlatformX;
              player.pos.x += deltaX; // Déplace le joueur avec la plateforme
              lastPlatformX = currentPlatform.pos.x;
            }
          });
          
          // Quand le joueur quitte la plateforme
          player.on('collisionend', (event) => {
            if (event.other.owner === currentPlatform) {
              console.log("Le joueur quitte la plateforme");
              currentPlatform = null;
            }
          });
    }
}