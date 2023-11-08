title = "prototype-2";

description = `
[Hold]    Change angle
[Release] Jumps
`;

characters = [
  `yylyy
 lyylyyl
yylylylyy
yylylylyy
yylllllyy
yylylylyy
yylylylyy
 lyylyyl
  yylyy`
]; 

const xBounds = 200;
const yBounds = 100;

options = {
  viewSize: { x: xBounds, y: yBounds },
  isPlayingBgm: true,
  isReplayEnabled: true,
  seed: 2,

  //isCapturing: true // uncomment to capture & press 'c'
};

let player, v;
let isJumping;
let angle;
let width;
let space;
let scr;
let playerCollision;
let thrown = false; 

const groundX = 0;
const groundY = 90; 
const groundWidth = 300; 
const groundHeight = 10; 

function spawn() {
  player = vec(10, 85);
  thrown = false;
}

function update() {
  if (!ticks) {
    spawn();
    isJumping = angle = width = space = 0;
  }

  if (width + space < 0) {
    width = 200;
    space = rnd(50, 150);
  }

  color("blue");
  rect(groundX, groundY, groundWidth, groundHeight);
  color("black");
  playerCollision = char("a", player);
  //console.log(player.x);
  if (player.x < 0 || player.y > yBounds || player.x > xBounds) {
    setTimeout(spawn, 1000); // respawns after 1 second
    play("lucky");
    //end(); // ends game
  }

  if (isJumping) {
    thrown = true;
    player.add(v);
    v.y += 0.09; // gravity

    if (playerCollision.isColliding.rect.blue && thrown) {
      isJumping = angle = 0;
      player.y = 85;
      setTimeout(spawn, 500);
    }
  } else {
    if (input.isPressed) {
      angle -= 0.03; // how fast the angle changes 

      if (angle < -PI / 2) {
       angle = 0;
      }

      bar(player, 20, 1.25, angle, 0); // this for aiming
    }

    if (input.isJustReleased) {
      play("jump");
      isJumping = 1;
      v = vec(4.5).rotate(angle); // controls how far ball goes
    }
  }

  scr = clamp(player.x - 50, 0, 99) * 0.1 + difficulty;
  //score += scr; controls score, for later
}

