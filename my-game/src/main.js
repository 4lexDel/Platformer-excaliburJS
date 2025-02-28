import { Engine, Actor, Color, CollisionType, vec, SolverStrategy } from 'excalibur';
import { Platform } from './actors/Platform';
import { Ground } from './actors/Ground';
import { Player } from './actors/Player';
import { PlayerPlatformPhysics } from './physics/collision-player-platform';

const game = new Engine(
  {
    width: 800,
    height: 600,
    physics: {
      // use rigid body realistic
      solver: SolverStrategy.Arcade,
      // set global acceleration simulating gravity pointing down
      gravity: vec(0, 1100)
    }
  });

game.backgroundColor = Color.fromHex('#87CEEB');

// Création du joueur
const player = new Player(100, 400);
player.initialiseController(game);

game.add(player);

// Création du sol
const ground = new Ground()

game.add(ground);

// Création d'une arrivée
const arrival = new Actor({
  x: 100,
  y: 350,
  width: 200,
  height: 20,
  color: Color.Red,
  collisionType: CollisionType.Fixed
});

game.add(arrival);

const platform1 = new Platform(300, 500, 300, 600);
const platform2 = new Platform(500, 400, 300, 600);
game.add(platform1);
game.add(platform2);


// Création d'un item ramassable
const item = new Actor({
  x: 100,
  y: 250,
  width: 30,
  height: 30,
  color: Color.Yellow,
  collisionType: CollisionType.Passive
});

game.add(item);


// Ramassage de l'item
const collisionHandler = (evt) => {
  if (evt.other.owner === item) {
    console.log("ITEM COLLISION!");
    item.kill();
    setTimeout(() => {
      alert('Vous avez gagné !');
      // game.stop();
    }, 200);
  }
};

player.setCollisionHandler(collisionHandler);


PlayerPlatformPhysics.enablePhysic(game, player, [platform1, platform2])


game.start();
