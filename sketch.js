var PLAY = 1
var END  = 0
var player,runningPlayer,DuckingSteve;
var bg;
var ground,groundImg;
var obj1,obj2;
var score = 0;
//var obj1, obj2;
var obstacles;
gameOver = createSprite(300,100);
  gameOver.addImage("gameOver",gameOverImg);
  gameOver.scale = 0.5;
  gameOver.visible = false;
  
  var gameState;

function preload(){
 bg = loadImage("images/background.png");
 groundImg = loadImage("images/GROUND.png");
 runningPlayer = loadAnimation("images/MOVE1.png","images/MOVE2.png","images/MOVE3.png","images/MOVE4.png","images/MOVE5.png","images/MOVE4.png","images/MOVE3.png","images/MOVE2.png");
 obj1 = loadImage("images/enemy1.png");
 obj2 = loadImage("images/enemy2.png");
 DuckingSteve = loadAnimation("images/duck steve.png");
}

function setup(){
  createCanvas(1200,600);
 

  ground = createSprite(width/2,530,width,30);
 ground.addImage("ground",groundImg);
 ground.width = ground.width/2;


 player = createSprite(65,510,25,25);
player.addAnimation("player",runningPlayer);
camera.position.x = displayWidth/2 - 75;
camera.position.y = displayHeight/2 - 145;

obstacles = createGroup();
}

function draw(){
  background(bg);

  score = Math.round(frameCount/2);
  if(ground.x < 0){
   ground.x = ground.width/1  ;
 
  }
  if(gameState === PLAY){
    
    
    score = score + Math.round(frameCount/60);
    
    if(keyDown("space") && player.y >= 470) {
      jump.play();
      trex.velocityY = -12;
    }
    
    player.velocityY = player.velocityY + 0.8
    
   ground.velocityX = -(4 + 3*score/100);
      
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
      if(score % 100 === 0){
       
      }
      
      spawnObstacles();
      
      if(player.collide(obstacles)){
         gameState = END;
        }
      
    } else if (gameState === END){
      gameOver.visible = true;
      //restart.visible = true;
      
      //set velcity of each game object to 0
      ground.velocityX = 0;
      player.velocityY = 0;
      obstacles.setVelocityXEach(0);
      
      //change the trex animation
      player.changeAnimation("collided",player_collided);
      
      //set lifetime of the game objects so that they are never destroyed
      obstacles.setLifetimeEach(-1);      
      if(mousePressedOver(restart)){
          reset();
         }
      }

      ground.velocityX = -10;

      player.velocityY = player.velocityY + 1;
      player.collide(ground);
  /*if(obstacle1.x < 0){
    obstacle1.x = random(width,width + 125);
   }
  
   if(obstacle2.x < 0){
    obstacle2.x = random(width,width + 200);
   }*/
   

   textSize(30);
 textFont("california");
 text("Score: " + score, 525, 100);

 
 if(player.collide(obstacles)){
  obstacles.velocityX =0;
  
  }
 
 drawSprites();
}
function spawnObstacles(){
  if(frameCount % 60 === 0){
   var obstacle = createSprite(1200,510,50,50);
   obstacle.addImage("obj1",obj1);
   obstacle.collide(ground);

    obstacle.velocityX = -10;
   // var rand = random(1,2);
    /*switch(rand) {
      case 1: obstacle.addImage(obj1);
              break;
      case 2: obstacle.addImage(obj2);
              break;
      default: break;
    }*/
    
   // obstacles.add(obstacle);
  //  obstacle.display();
   }
}
 
function keyPressed(){
 if(keyCode === 32 && player.y >= 446){
    player.velocityY = -17;
 
   }
}
function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstacles.destroyEach();

  player.changeAnimation("running",runningPlayer);
  
  score = 0;
}
