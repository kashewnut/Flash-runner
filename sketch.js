var bg,bgimg;
var start,startimg;
var gameover,gameoverimg;
var logo,logoimg;
var flash,flashimg;
var V1,V1img;
var V2,V2img;
var V3,V3img;
var V4,V4img;
var V5,V5img;
var restart,restartimg;
var Vgroup;
var gameState=PLAY;
var PLAY=1;
var END=0;
var score=0;

function preload(){
    bgimg=loadImage("background.jpg");
    startimg=loadImage("Start.png");
    gameoverimg=loadImage("Gameover.png");
    logoimg=loadImage("Logo.png");
    flashimg=loadImage("flash2.png");
    V1img=loadImage("V1.png");
    V2img=loadImage("V2.png");
    V3img=loadImage("V3.png");
    V4img=loadImage("V4.png");
    V5img=loadImage("V5.png");
    restartimg=loadImage("restart.png");
}

function setup(){
createCanvas(windowWidth,windowHeight);
bg=createSprite(150,400,windowWidth,windowHeight);
bg.addImage(bgimg);
bg.x=bg.width/2;
bg.scale=1.5
bg.velocityX=-4;

ground=createSprite(680,680,windowWidth,10);
ground.x=ground.width/2;
ground.velocityX=-10

flash=createSprite(90,600,40,40);
flash.addImage("flash",flashimg);
flash.scale=0.5;
flash.setCollider("circle",0,0,200);
flash.debug=true;

logo=createSprite(750,400,60,60);
logo.addImage(logoimg)
logo.scale=0.5;

start=createSprite(745,550,50,50);
start.addImage(startimg);
start.scale=0.5;

gameover=createSprite(750,350);
gameover.addImage(gameoverimg);
gameover.scale=0.5;

restart=createSprite(750,600);
restart.addImage(restartimg);
restart.scale=0.5;
gameover.visible=false;
restart.visible=false;
Vgroup=new Group();
}
function draw(){
  drawSprites();
  if(mousePressedOver(start)){
      gameState=PLAY;
      start.visible=false;
      flash.velocityY=-11;
      logo.visible=false;  
  }
  if(gameState===PLAY){
    if(bg.x<0){
      bg.x=bg.width/2
  }
  bg.velocityX=-6;
  if(ground.x<0){
  ground.x=ground.width/2;
  }
  if(touches.length>0||keyDown("space")){
   flash.velocityY=-12;
 }
 flash.velocityY=flash.velocityY+1.75;
 flash.velocityX=0;
 flash.collide(ground); 
if(Vgroup.isTouching(flash)){
  gameState=END
}
obs();
}
else if(gameState===END){
  background.velocityX=0;
  ground.velocityX=0;
ground.velocityY=0;
flash.x=90;
flash.y=600;
  gameover.visible=true;
restart.visible=true;
logo.visible=false;
Vgroup.setVelocityXEach(0);
Vgroup.setVelocityYEach(0);
Vgroup.destroyEach();
}
if(touches.length>0||mousePressedOver(restart)&&gameState === END){
  reset();
touches=[];
  gameState = PLAY;
}


  textSize(30);
  fill("black");
  text("SCORE:"+score,width/2-100,20);
  flash.collide(ground);
}
function reset(){
  flash.x=90;
  flash.y=600;
  gameState=PLAY;
  score=0;
  gameover.visible=false;
  restart.visible=false;
}
function obs(){
  if(frameCount%60 === 0){  
var villain=createSprite(1500,600,50,70);
  villain.velocityX=-6;
  var rand=Math.round(random(1,5));
switch(rand){
  case 1:villain.addImage(V1img);
  villain.scale=0.3;
  break;
  case 2:villain.addImage(V2img);
  villain.scale=0.3;
  break;
  case 3:villain.addImage(V3img);
  villain.scale=0.3;
  break;
  case 4:villain.addImage(V4img);
  villain.scale=0.3;
  break;
  case 5:villain.addImage(V5img);
  villain.scale=0.7;
  break;
}
Vgroup.add(villain);
}

}
