const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;

var particles = [];
var plinkos = [];
var divisions = [];
var particle1 = null;

var divisionHeight = 300;
var score = 0;
var turn = 0;
var gameState = "play";
var bg;

function preload() {
  bg = loadImage("space.jpg")
}

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width / 2, height, width, 20);
  ground2 = new Ground(800, 400, 10, 800);
  ground3 = new Ground(0, 400, 10, 800);

  for (var k = 0; k <= width; k = k + 80) {
    divisions.push(new Divisions(k, height - divisionHeight / 2, 10, divisionHeight));
  }
  for (var j = 75; j <= width; j = j + 50) {
    plinkos.push(new Plinko(j, 75));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {
    plinkos.push(new Plinko(j, 175));
  }

  for (var j = 75; j <= width; j = j + 50) {
    plinkos.push(new Plinko(j, 275));
  }

  for (var j = 50; j <= width - 10; j = j + 50) {
    plinkos.push(new Plinko(j, 375));
  }

  // edges = createEdgeSprites();
}

function draw() {
  background(bg);
  Engine.update(engine);

  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();
  }

  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }

  ground.display();

  if (particle1 != null) {
    particle1.display();

    if (particle1.body.position.y > 760) {
      if (particle1.body.position.x < 240 && particle1.body.position.x > 0) {
        score = score + 500;
        particle1 = null;
        if (turn >= 5) {
          gameState = "end";
        }
      }


      else if (particle1.body.position.x < 480 && particle1.body.position.x > 240) {
        score = score + 100;
        particle1 = null;
        if (turn >= 5) {
          gameState = "end";
        }

      }
      else if (particle1.body.position.x < 720 && particle1.body.position.x > 480) {
        score = score + 200;
        particle1 = null;
        if (turn >= 5) {
          gameState = "end";
        }
      }

      else if (particle1.body.position.x < 800 && particle1.body.position.x > 720) {
        score = score + 1000;
        particle1 = null;
        if (turn >= 5) {
          gameState = "end";
        }

      }

    }

  }


  if (gameState == "end") {

    textSize(100);
    fill("red")
    text("GameOver", 150, 250);
    textSize(60)
    fill("chartreuse")
    text("Click space to play again", 75, 350);


  }

  textSize(30)
  text("Score : " + score, 20, 40);
  fill("white");
  textSize(30)
  text("500", 15, 550);
  text("500", 90, 550);
  text("500", 170, 550);
  text("100", 250, 550);
  text("100", 330, 550);
  text("100", 410, 550);
  text("200", 490, 550);
  text("200", 575, 550);
  text("200", 655, 550);
  text("1000", 725, 550);
}


function mousePressed() {
  if (gameState !== "end" && particle1 === null) {
    turn++;
    particle1 = new Particle(mouseX, 10, 15);
  }
}

function keyPressed() {
  if (keyCode === 32 && gameState === "end") {
    gameState = "play";
    score = 0;
    turn = 0;
  }
}
