
var grid = 50;
var width = 1366;
var carGroup1, logGroup1;
var grassHeight = 100;
var gameState = "play";
var carAnimation1, carAnimation2, logAnimation1, logAnimation2, playerAnimation, playerWinner;
var city,cityAnimation, city2, cityAnimation2, school;
var hit, win;
function preload() {
  carAnimation1 = loadAnimation("images/car1.png");
  carAnimation2 = loadAnimation("images/car2.png");
  playerAnimation = loadAnimation("images/Player-03.png");
  logAnimation1 = loadAnimation("images/log1.png");
  logAnimation2 = loadAnimation("images/log2.png");
  cityAnimation = loadAnimation("images/city1.png");
  cityAnimation2 = loadAnimation("images/city2.png");
  hit = loadSound("images/Hit.mp3");
  win = loadSound("images/Win.mp3");
  playerWinner = loadAnimation("images/Winner.png");
}


function setup() {
  createCanvas(1366,700);
  carGroup1 = new Group();
  logGroup1 = new Group();

  
  // making for loop for muliple tasking
    for(var i = 0; i<6;i++)
    {
      var bottomGrass1 = createSprite(683, height-50-(i*400), width, grassHeight);
      bottomGrass1.shapeColor = "green";
      // Creating roads
      if(i%2===0)
      {
        var road = createSprite(683, height-150-(i*400)-grassHeight, width,300,);
          road.shapeColor = "black";
        }
        
        
        
        
      }
      
      player = new Player(width/2, height-25);
      
      // Creating Logs
      for(var a = 0; a<40;a++)
      {
        logs = new Log(-2);
        logGroup1.add(logs.spt);
      }
      
      //  creating city
      city = createSprite(width/2, -1500);
      city.velocityX = -2;
      city.addAnimation("CITY", cityAnimation);
      
      
      //  creating city
      city2 = createSprite(city.x+100, -1500);
  // city2.velocity
  city2.addAnimation("CITY", cityAnimation2);
  city2.scale = 1.6;
  city2.depth = city.depth-1;
  
  for(var i = 0; i<40;i++)
  {
    cars = new Car(3);
    carGroup1.add(cars.spt);
  }
}

function draw() {
  background("skyblue");


  for(i=1;i<carGroup1.length;i++)
  { 
    if(carGroup1[i].x<0) 
    {
      carGroup1[i].x=width; 
    } 
  }
  
  
  for(i=1;i<logGroup1.length;i++)
  { 
    if(logGroup1[i].x<0) 
    {
      logGroup1[i].x=width; 
    } 
  }
  
  
  // Respawing Player
  if(carGroup1.isTouching(player.spt))
  {
    player.spt.x = width / 2;
    player.spt.y = height - 75;
    hit.play();
  }
  
  if(logGroup1.isTouching(player.spt))
  {
    player.spt.x = player.spt.x-2;
  }
  
  else if((player.spt.y > height-1550 && player.spt.y< height-1300) ||
    (player.spt.y < height-500 && player.spt.y > height-850) ||
    (player.spt.y>height) ||
    (player.spt.x<0) ||
    (player.spt.x>width))
    {
        player.spt.x = width / 2;
        player.spt.y = height - 75;
    }
    
    
    translate(0, -player.spt.y+height-150);
    // defining win
    if(gameState==="WIN")
    { 
      
      stroke("green");
      fill("Black");
      textSize(40);
      text("Winner Winner Chicken Dinner", width/2-250, -1700);
      carGroup1.destroyEach();
      logGroup1.destroyEach();
      // depth = +1;
      
      gameState = "WIN";
    }

    // Plaing ViCTORY SOUND_______________________________________________This is also not working
    
    // Making game win
    if(city.isTouching(player.spt))
    {
      gameState = "WIN";
    }

    if(gameState=="play"){
      playerMovement();
    }
    
    // Making infinite background
    if (city.x < 0){
    city.x = city.width/2;
  }
  
  // Mam plz check this also____________________________
  if(gameState=="WIN")
  {
    win.play();
  }
  
  
  drawSprites();
}

// Making function for player movement

function playerMovement()
{
  if(keyDown("up"))
  {
    player.move(0, -1.8);
    
    
    // player.velocityY = 2;
  }

  else if(keyDown("down"))
  {
    player.move(0, 1.8);
  }

  else if(keyDown("right"))
  {
    player.move(1, 0);
  }

  else if(keyDown("left"))
  {
    player.move(-1, 0);
  }
}



  
