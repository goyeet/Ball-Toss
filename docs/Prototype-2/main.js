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
  theme: "shapeDark",

  isCapturing: true,
};

let player, v;
let isJumping;
let angle;
let width;
let space;
let scr;
let playerCollision;

const groundX = 0;
const groundY = 90; 
const groundWidth = 300; 
const groundHeight = 10; 

function spawn() {
  player = vec(10, 85);
}

function angleAdjust(angle) {
  
  angle -= 0.015;

  return angle;
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
  
  color("yellow");
  playerCollision = char("a", player);;
  //playerCollision = box(player, 9, 9);

  if (player.x < 0 || player.y > yBounds || player.x > xBounds) {
    setTimeout(spawn, 1000); // respawns after 1 second
    play("lucky");
    //end(); // ends
  }

  if (isJumping) {
    player.add(v);
    v.y += 0.1;
    if (playerCollision.isColliding.rect.blue) {
      isJumping = angle = 0;
      player.y = 85;
    }
  } else {
    if (input.isPressed) {
      bar(player, 20, 1.25, (angle -= 0.05), 0); // this for aiming
      //bar(player, 20, 3, angleAdjust(), 0); // this for aiming
    }

    if (input.isJustReleased) {
      play("jump");
      isJumping = 1;
      v = vec(4).rotate(angle);
    }
  }

  scr = clamp(player.x - 50, 0, 99) * 0.1 + difficulty;
  //score += scr; controls score, for later
}

