var balloon, flyImg;
var bgImg, position;
var database, height;

function preload(){
bgImg = loadImage("bg.png")
flyImg = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png", "Hot Air Ballon-04.png")
}

function setup(){
    createCanvas(1300,700);
    balloon = createSprite(200,400,10,10);
    balloon.addAnimation("moving",flyImg);

    database = firebase.database(); console.log(database);
    
    var balloonHeight = database.ref('balloon/height');balloonHeight.on("value", readheight, showError);
}

function draw(){
    background(bgImg);
    if (height!== undefined){
        if(keyDown(LEFT_ARROW)){
            //changePosition(-1,0);
            balloon.x = balloon.x -5;
        }
        else if(keyDown(RIGHT_ARROW)){
            //changePosition(1,0);
            balloon.x = balloon.x +5;
        }
        else if(keyDown(UP_ARROW)){
            //changePosition(0,-1);
            balloon.y = balloon.y  -5;
            //updateHeigth(0, -10);
            balloon.addAnimation("moving",flyImg);
            balloon.scale = balloon.scale -0.02;
        }
        else if(keyDown(DOWN_ARROW)){
            //changePosition(0,+1);
            balloon.y = balloon.y + (0,5);
            balloon.addAnimation("moving",flyImg);
            balloon.scale = balloon.scale +0.003;
        }
      drawSprites();
}
balloon.display();
}

function updateHeigth(x,y){
    database.ref("balloon/height").set({ 
        'x': height.x + 1,
        'y': height.y + 1   
     })}

function readheight(data){ 
    height = data.val(); 
    console.log(height); 
    balloon.x = height.x;
    balloon.y = height.y;}

function showError(){
    console.log('There is an Error');
}