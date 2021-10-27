var PLAY=1;
var END=0;
var gameState=PLAY;

var girl, girlImg;
var ground, invisibleGround, groundImg;

var covid19, covid19Img, covid19Group;

var gameOver, restart;

var score;
var gameOverImg, restartImg;

function preload(){
    girlImg = loadImage("girl with mask.jpg");
    groundImg = loadImage("park.jpg");
    covid19Img = loadImage("covid 19.jpg");
    gameOverImg = loadImage("game over.jpg");
    restartImg = loadImage("restart.jpg");
}

function setup() {
    createCanvas(600,200);

    girl = createSprite(50,160,20,50);
    girl.addImage("running", girlImg);
    girl.scale=0.080;

    ground = createSprite(200,180,400,20);
    ground.addImage("ground", groundImg);
    ground.x = ground.width/2;

    gameOver = createSprite(300,100);
    gameOver.addImage(gameOverImg);
    gameOver.scale=0.5;

    restart = createSprite(300,140);
    restart.addImage(restartImg);
    restart.scale=0.5;

    invisibleGround = createSprite(200,190,400,10);
    invisibleGround.visible = false;

   girl.setCollider("rectangle",0,0,girl.width,girl.height);
  //girl.debug = true;
  
  score = 0;

  covid19Group = new Group();
}

function draw() {
    background(180);
    //displaying score
    text("Score: "+ score, 500,50);
    
    if(gameState === PLAY){
  
      gameOver.visible = false;
      restart.visible = false;
      
      ground.velocityX = -(4 + 3* score/100)
      //scoring
      score = score + Math.round(getFrameRate()/60);

      if (ground.x < 0){
        ground.x = ground.width/2;
      }

      if(keyDown("up")){
        girl.y = girl.y-5;
      }

      if(keyDown("right")){
        girl.x = girl.x+5;
      }   
      
      if(keyDown("left")){
        girl.x = girl.x-5;
      }   

      if(keyDown("down")){
        girl.y = girl.y+5;
      }   
      
      ground.depth = girl.depth;
      girl.depth = girl.depth + 1;

      spawnCovid19();
    
    if(covid19Group.isTouching(girl)){
        //girl.velocityY = -12;
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;

    ground.velocityX = 0;
    girl.velocityY = 0;

     covid19.setLifetime(-1);
          }
      
    girl.collide(invisibleGround);
  
  if(mousePressedOver(restart)) {
      reset();
    }

    drawSprites();
}

function reset(){
  gameState=PLAY;

 gameOver.visible=false;
 restart.visible=false;

 covid19Group.destroyEach();
 
  score=0;
}

function spawnCovid19() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var covid19 = createSprite(600,120,40,10);
    covid19.y = Math.round(random(80,120));
    covid19.addImage(covid19Img);
    covid19.scale = 0.1;
    covid19.velocityX = -3;
    
     //assign lifetime to the variable
    covid19.lifetime = 200;
    
    //adjust the depth
    covid19.depth = ground.depth;
    ground.depth = ground.depth + 1;
    
      }
}