var trex, trex_running, edges;
var groundImage;
var invisible_ground
var obstacleGroup, cloudGroup;
//constants
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var trexStop
var restartImage, gameOverImage
var restart, gameOver
var score = 0;
var jumpSound, trexCrash, trexMilestone;
var highScore=0

function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImage = loadImage("ground2.png")
  cloudImage = loadImage('cloud2.png');
  obstacle1 = loadImage('obstacle1.png');
  obstacle2 = loadImage('obstacle2.png');
  obstacle3 = loadImage('obstacle3.png');
  obstacle4 = loadImage('obstacle4.png');
  obstacle5 = loadImage('obstacle5.png');
  obstacle6 = loadImage('obstacle6.png');
  trexStop = loadAnimation("trex1.png");
  gameOverImage = loadImage('game over.png');
  restartImage = loadImage('restart 1.png');
  jumpSound = loadSound("Jump.mp3")
  trexCrash = loadSound("trexCrash.mp3")
  trexMilestone = loadSound("trex100.mp3")


}

function setup() {
  createCanvas(600, 400);

  // creating trex
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("Stop", trexStop);
  edges = createEdgeSprites();

  //adding scale and position to trex
  trex.scale = 0.5;
  trex.x = 50

  invisible_ground = createSprite(300, 351, 600, 1)
  //invisible_ground.shapeColor="white"  
  invisible_ground.visible = false;

  ground = createSprite(300, 350, 600, 5);
  ground.velocityX = -2
  ground.addImage(groundImage);

  cloudGroup = new Group();
  obstacleGroup = new Group();

  //trex.debug=true;
  //trex.setCollider('circle',0,0,40);

  restart = createSprite(300, 200, 20, 20);
  restart.addImage(restartImage);
  restart.scale = 0.3;

  gameOver = createSprite(300, 135, 20, 20)
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.5;

  restart.visible = false;
  gameOver.visible = false;

}


function draw() {
  //set background color 
  background("white");

  if (gameState == PLAY) {
    if (keyDown("space") && (trex.y > 320)) {
      trex.velocityY = -10;
      jumpSound.play();
    }
    if (ground.x < 0) {
      ground.x = 300;
    }
    spawnCloud();
    spawnObstacle();

    ///score = Math.round(frameCount / 1);
///console.log(getFrameRate());    
    score=score+Math.round(getFrameRate()/20);
    
    if (score % 100 == 0 && score > 0) {
      trexMilestone.play();
    }

    if (frameCount % 50 == 0) {
      ground.velocityX = ground.velocityX - 1

    }

    if (trex.isTouching(obstacleGroup)) {
      gameState = END;

      trexCrash.play();



    }






  } else if (gameState == END) {

    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    cloudGroup.setVelocityXEach(0);
    trex.changeAnimation("Stop", trexStop)
    cloudGroup.setLifetimeEach(-1);
if(score>highScore){
  highScore=score
}
   
    
    restart.visible = true;
    gameOver.visible = true;

if(mousePressedOver(restart)){
  reset();
  
}

  }






  //logging the y position of the trex
  //console.log(trex.y)

  //jump when space key is pressed

  //for gravity
  trex.velocityY = trex.velocityY + 0.5;

  //stop trex from falling down
  trex.collide(invisible_ground);

fill("blue");
  textSize(20)
text("Vishv's GAME",200,300);
  drawSprites();
  textSize(20);
  text("Score:" + score, 400, 50);
text("High Score : "+highScore,380,20)


}
function reset(){
  gameState=PLAY;
  obstacleGroup.destroyEach();
  cloudGroup.destroyEach();
  gameOver.visible=false;
  restart.visible=false;
  trex.changeAnimation("running",trex_running);
  score=0;
  
}








function spawnCloud() {
  if (frameCount % 100 == 0) {

    var cloudHeight = Math.round(random(150, 250))
    console.log(cloudHeight);
    var cloud = createSprite(500, cloudHeight, 20, 20);
    cloud.velocityX = -2;
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    trex.depth = cloud.depth + 1;
    console.log(trex.depth, cloud.depth)
    cloud.lifetime = 300;
    cloudGroup.add(cloud);
    restart.depth = cloud.depth + 1;
    gameOver.depth = cloud.depth + 1;


  }

}

function spawnObstacle() {
  if (frameCount % 200 == 0) {
    var select = Math.round(random(1, 6));

    var obstacle = createSprite(600, 320, 10, 10);
    obstacle.velocityX = -(4 + score / 100);
    /*if(select==1){
  obstacle.addImage(obstacle1); 
    
}
  else if(select==2){
  obstacle.addImage(obstacle2);  
  }

  else if(select==3){
  obstacle.addImage(obstacle3);  
  }

  else if(select==4){
  obstacle.addImage(obstacle4);  
  }

  else if(select==5){
  obstacle.addImage(obstacle5);  
  }

  else if(select==6){
  obstacle.addImage(obstacle6);  
  }*/
    switch (select) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break;
      case 4:
        obstacle.addImage(obstacle4);
        break;
      case 5:
        obstacle.addImage(obstacle5);
        break;
      case 6:
        obstacle.addImage(obstacle6);
        break;
      default:
        break;
    }



    obstacleGroup.add(obstacle);


    obstacle.scale = 0.7;
  }
}