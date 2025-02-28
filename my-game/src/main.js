import { Engine, Actor, Color, Keys, CollisionType, vec, SolverStrategy } from 'excalibur';

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

// Center the canvas
const canvas = document.getElementsByTagName('canvas')[0];
canvas.style.display = 'block';
canvas.style.margin = '0 auto';
canvas.style.position = 'absolute';
canvas.style.top = '50%';
canvas.style.left = '50%';
canvas.style.borderRadius = '8px';
canvas.style.transform = 'translate(-50%, -50%)';

// Création du joueur
const player = new Actor({
  x: 100,
  y: 400,
  width: 20,
  height: 50,
  color: Color.Blue,
  collisionType: CollisionType.Active
});
player.body.useGravity = true;

game.add(player);

// Création du sol
const ground = new Actor({
  x: 400,
  y: 550,
  width: 800,
  height: 40,
  color: Color.fromRGB(0, 175, 0),
  collisionType: CollisionType.Fixed
});

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

// Création d'une platforme
const createPlateform = (x, y) => {
  const platform = new Actor({
    x,
    y,
    width: 100,
    height: 15,
    color: Color.Black,
    collisionType: CollisionType.Fixed,
    vel: vec(100, 0),
  });

  platform.on('postupdate', () => {
    if (platform.pos.x > 600) {
      platform.vel.x = -100;
    } else if (platform.pos.x < 300) {
      platform.vel.x = 100;
    }
  });

  game.add(platform);
  return platform;
};

const platform1 = createPlateform(300, 500);
// createPlateform(400, 450);
createPlateform(500, 400);
// createPlateform(600, 350);


// Collision avec l'ennemi et ramassage de l'item
player.on('precollision', (evt) => {
  // console.log(evt.other);
  // console.log(item);
  
  if (evt.other.owner === platform1) {
    // player.kill();
    //ajoute un effet sticky pour que le joueur reste collé a la platform (c'est à dire quil le suive en x), uniquement si le joeur arrive du haut du bloc bien sur
    if (player.pos.y <= platform1.pos.y) {
      console.log("sticky");
      console.log(platform1.vel.x);
      
      player.vel.x = platform1.vel.x;

    }
    // console.log("PLATFORM COLLISION!");

  } else if (evt.other.owner === item) {
    console.log("ITEM COLLISION!");
    // hasItem = true;
    item.kill();
    setTimeout(() => {
      alert('Vous avez gagné !');
      // game.stop();
    }, 200);
  }
});

// Création d'un item ramassable
const item = new Actor({
  x: 100,
  y: 250,
  width: 30,
  height: 30,
  color: Color.Yellow,
  collisionType: CollisionType.Passive
});

// // Ajoute un score en haut à gauche de l'écrant qui s'incrémente à haque fois qu'on récupère un item
// const score = new Actor({
//   x: 20,
//   y: 20,
//   color: Color.Black,
//   text: `Score: `,
//   fontFamily: 'Arial',
//   fontSize: 30
// });
// score.on('preupdate', () => {
//   score.text = `Score: `;
// });
// game.add(score);

game.add(item);

// Ajout des contrôles

player.on('preupdate', () => {
  if (game.input.keyboard.isHeld(Keys.Left)) {
    player.vel.x = -250;
  } else if (game.input.keyboard.isHeld(Keys.Right)) {
    player.vel.x = 250;
  } else {
    player.vel.x = 0;
  }

  if (game.input.keyboard.wasPressed(Keys.Space) && player.vel.y === 0) {
    player.vel.y = -520;
  }
});

game.start();
