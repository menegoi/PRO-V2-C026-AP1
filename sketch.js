//Carregar módulos da Biblioteca Matter.js
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

//Variáveis
var engine, world;
var imgBackground, imgTower;
var ground, tower, cannon, ball;

//Matriz
var balls = [];
var boats = [];

function preload() {

  //Carregar imagens
  imgBackground = loadImage("assets/background.gif");
  imgTower = loadImage("assets/tower.png");

}

function setup() {
  canvas = createCanvas(1200, 600);
  angleMode(DEGREES);

  //Motor de física
  engine = Engine.create();
  world = engine.world;
  
  //Criar Ground
  var ground_options = {
    isStatic: true
  }
  ground = Bodies.rectangle(width/2,height-1, width,1, ground_options);
  World.add(world,ground);

  //Criar tower
  var tower_options = {
    isStatic: true
  }
  tower = Bodies.rectangle(160,350,160,310,tower_options);
  World.add(world,tower);

  //Criar objetos a partir de classe
  cannon = new Cannon(180,110,130,100,15);
  ball = new CannonBall(cannon.x,cannon.y,20);
 
}

function draw() {
  background(189);
  image(imgBackground,width/2,height/2,1200,600);

  //Atualizar Motor de física
  Engine.update(engine);

  //Definir posição X e Y do objeto pelo centro
  rectMode(CENTER);
  imageMode(CENTER);

  //Exibir ground
  rect(ground.position.x,ground.position.y,width,1);

  //Exibir torre
  image(imgTower,tower.position.x, tower.position.y,160,310);

  //Exibir navios na tela
  showBoats();

  //Loop para percorrer a matriz ball e exibir qualquer bola criada na tela
  for(var i=0; i< balls.length;i++){
    showCannonBalls(balls[i],i);
  }

  //Exibir canhão
  cannon.display();

   
}
function keyReleased(){
  if (keyCode === DOWN_ARROW){
    balls[balls.length -1].shoot();
  }
}
//Verifica se uma tecla do teclado foi pressionada
function keyPressed(){
  if(keyCode === DOWN_ARROW){
    var ball = new CannonBall(cannon.x,cannon.y,20);
    balls.push(ball);
  }
}
//Função para exibir as bolas de canhão
function showCannonBalls(ball,i){
  if(ball){
    ball.display();
  }
}
//Função para exibir os navios
function showBoats(){
  if(boats.length > 0){

    if(boats[boats.length -1] === undefined ||
      boats[boats.length -1].body.position.x < width -300){

      var positions = [-40,-60,-70,-20];
      var position = random(positions);

      var boat = new Boat(width,height-100,170,170,position);
      boats.push(boat);
    }

    for(var i = 0; i < boats.length; i++){
      if(boats[i]){
        Matter.Body.setVelocity(boats[i].body,{x:-0.9, y: 0 });
        boats[i].display();
      }      
    }
  }else{
    //Criar navio
    var boat = new Boat(width-79,height-60,170,170,-80);
    boats.push(boat);
  }
}