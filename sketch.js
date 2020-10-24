//declaring the variables
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup;
var ground, time;
var score;
var groundImage;
var invisibleGround;
var gameState = "play";

function preload(){
  
  //loading the animations and images
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  groundImage = loadImage("jungle.jpg");
}



function setup() {
  //creating the canvas
  createCanvas(600,400);
  
  //creating the sprites for monkey,ground and invisibleGround
  monkey = createSprite(60,200,10,10);
  monkey.addAnimation("monkey running",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(0,0,300,200);
  ground.addImage("jungle",groundImage);
  ground.scale = 1.5;
  ground.velocityX = -3;
  ground.x = ground.width/2;
  
  monkey.depth = ground.depth;
  monkey.depth = monkey.depth + 1;
    
  invisibleGround = createSprite(300,400,600,10);
  invisibleGround.visible = false;
  
  //creating the groups
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
  //declaring value of time and score
  time = 0;
  score = 0;  
}


function draw() {
  //choosing the color of the background
  background("white");
    
  if(gameState === "play"){
  
    //giving velocity to the ground
    ground.velocityX = -3;

    //getting the survival time
    time = time + Math.round(getFrameRate()/60);


    //making the ground infinite
    if(ground.x < 0){
        ground.x = ground.width/2;     
       }

    //making the monkey jump when spacebar is pressed
    if(keyDown("space") && monkey.y > 100){
       monkey.velocityY = -12;
       }

    //adding gravity to the monkey
     monkey.velocityY = monkey.velocityY + 0.5;

    //apwning the bananas and the obstacles
    spawnBananas();
    spawnObstacles();


    //adding points to the score when monkey touches the banana
    if(FoodGroup.isTouching(monkey)){
      score = score+5;
      FoodGroup.destroyEach();
       }

    //stopping the game when obstacle touches the monkey
    if(obstacleGroup.isTouching(monkey)){
      ground.velocityX = 0;
      obstacleGroup.setVelocityXEach(0);
      FoodGroup.setVelocityXEach(0);

      obstacleGroup.setLifetimeEach(-1);
      FoodGroup.setLifetimeEach(-1);

      gameState = "end";
       }
      }
    
  //colliding the monkey with the invisibleGround
   monkey.collide(invisibleGround);
  
   drawSprites();
  
   if(gameState === "end"){
    monkey.velocityY = 0;
    
    reset();
    
    textSize = 36;
    fill ("red");
    text("GAME OVER",240,20);
    
    fill("green");
    text("Press R to restart",230,35);
     }

  
  //displaying the survival time and Score
  fill("white");
  text("Survival Time="+ time,150,50);
  
  text("Score:"+score,350,50);
}

//creating the function for spawnObstacles and spawn Bananas
function spawnObstacles() {
  if (frameCount % 300 === 0) {
    obstacle = createSprite(600,370,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -4;
    obstacle.lifetime = 150;
    obstacleGroup.add(obstacle);
    
    monkey.depth = obstacle.depth;
    monkey.depth = monkey.depth+1;
    }
  }

function spawnBananas() {
  if (frameCount % 120 === 0) {
    banana = createSprite(600,310,40,10);
    banana.addImage(bananaImage);
    banana.y = Math.round(random(120,200));
    banana.scale = 0.1;
    banana.velocityX = -6;
    banana.lifetime = 100;
    FoodGroup.add(banana);
    }
  }

function reset(){
  if(keyDown("r")){
    gameState = "play";
    obstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    score=0;
    time=0;
  } 
}