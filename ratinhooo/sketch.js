var gato, gatoImg;
var rato, ratoImg;
var arvore, arvoreImg;
var chao, chaoImg, chaoinv;
var troncos, troncosImg;
var arvores,arvoresImg;
var paredeInv;

var pontuacao=0;

var JOGAR=1;
var ENCERRAR=0;
var estadoJogo=JOGAR;



function preload(){

  gatoImg=loadAnimation("projeto_tom_e_jerry.gif");
  ratoImg=loadAnimation("projeto_jerry_e_tom.gif");
  
  chaoImg=loadImage("vamos_la.png");

  troncosImg=loadImage("tronco.png");
  
  
  


}

function setup() {
 createCanvas(windowWidth,windowHeight);
  
  gato=createSprite(width/8,height-170,10,10);
  gato.addAnimation("running",gatoImg);
  gato.scale=0.4;
  
  
  rato=createSprite(width*0.5,height-120,10,10);
  rato.addAnimation("rat",ratoImg);
  rato.scale=0.2;
  
  chao=createSprite(width/2,height-10,width,30);
  chao.velocityX=-5;
  chao.addImage(chaoImg);
  chao.scale=3;
  
  chaoInv=createSprite(width/2,height-75,width,30);
  chaoInv.visible=false;
  
  grupoDeTroncos= new Group();
  grupoDeArvores= new Group();
  
  
  rato.setCollider("rectangle",0,0,700,300);
  
  
  paredeInv=createSprite(rato.x-100,height/2,50,height);
  paredeInv.visible=false;
  
}
  
function draw() {
  background("lightblue");
  
  textSize(20);
  text("Distancia :"+pontuacao,width/10,height/7);
  
  gato.velocityY=gato.velocityY+ 0.8;
  rato.velocityY=rato.velocityY+ 0.8;
  
  rato.collide(paredeInv);
  
  
  gato.collide(chaoInv);
  rato.collide(chaoInv);
 
  if(chao.x < width/6){
    chao.x = chao.width/2;
  }
  
  if(touches.length>0||keyDown("space")&&gato.isTouching(chao)){
    
    gato.velocityY=-20;
    touches=[];
    
    
  }
  if(grupoDeTroncos.isTouching(gato)&&estadoJogo===JOGAR){
    
    
    estadoJogo=ENCERRAR;
    
  }
  if(estadoJogo===JOGAR){
   
   rato.visible=true;
   gato.visible=true;
   chao.velocityX=-5;
    
    if(frameCount%5===0){
    
    pontuacao=pontuacao+1;
    
    }
  
   
   
 }
  else if(estadoJogo===ENCERRAR){
    
  
    gato.visible=false;
    rato.visible=false
    grupoDeTroncos.destroyEach();
    troncos.velocityX=0;
    chao.velocityX=0;
    fill("blue")
    textSize(20);
    text("Você perdeu!!",width/2,height/2);
    textSize(15);
    text("Pressione R para recomeçar",width/2,height/2+100);
    
  }
  if(keyDown("r")||touches.length>0&&estadoJogo===ENCERRAR){
    
    recomeco();
    
    
  } 
  
 
  gerarTroncos();
  
  
  
  if(grupoDeTroncos.isTouching(rato)){
    
    rato.velocityY=-20;
    rato.velocityX=6;
  
  }
  
  rato.velocityX=rato.velocityX-0.2;

  
 
  drawSprites();
}

function gerarTroncos(){
  
  if(frameCount%200===0){ 
   
  troncos=createSprite(width ,height*0.8,10,20);
  troncos.addImage(troncosImg);
  troncos.velocityX=-(6+pontuacao/100);
  troncos.scale=0.150;
  grupoDeTroncos.add(troncos);
  
  
  troncos.setCollider("rectangle",-100,0,700,100);
   
 }
}


function recomeco(){
  
  pontuacao=0;
  estadoJogo=JOGAR;
  
  
  
  
}