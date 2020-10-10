var hypnoticBall;
var database;
var hypnoticBallPosition;
var pos;

function setup(){

    database = firebase.database();
    console.log(database);

    createCanvas(500,500);
    hypnoticBall = createSprite(250,250,10,10);
    hypnoticBall.shapeColor = "red";

    hypnoticBallPosition = database.ref('ball/position');
    console.log(hypnoticBallPosition);

    hypnoticBallPosition.on("value",readPosition,showError);
}

function draw(){
    background("white");
    if(pos!=undefined){
        if(keyDown(LEFT_ARROW)){
            writePosition(-1,0);
        }
        else if(keyDown(RIGHT_ARROW)){
            writePosition(1,0);
        }
        else if(keyDown(UP_ARROW)){
            writePosition(0,-1);
        }
        else if(keyDown(DOWN_ARROW)){
            writePosition(0,+1);
        }
}
    drawSprites();
}

function writePosition(x,y){
    database.ref('ball/position').set({
        'x' : pos.x + x,
        'y' : pos.y + y
    })
}


function readPosition(data){
    pos = data.val();
    console.log(pos);
    hypnoticBall.x = pos.x;
    hypnoticBall.y = pos.y;
}

function showError(){
    console.log("Error in writing database");
}