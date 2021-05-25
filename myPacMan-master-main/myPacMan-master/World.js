var canvas;
var ctx;
var mrP;
var mrG;
var mrE;
var mrPr;
var mrD;

var MAX = 196;//196
var FPS = 60;
var cellSize = 35;
var score = 0;
var moving = false;



const wall = new Image();
const packman = new Image();
const ghost = new Image();
const point = new Image();
const menu = new Image();

menu.src = "menu.png";
wall.src = "wals.png";
packman.src = "packman.png";
ghost.src = "ghost.png";
point.src = "point.png";

canvas = document.getElementById("Canvas");
ctx = canvas.getContext("2d");




var map = [ 
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,1,2,1,1,1,2,1,2,1,1,1,2,1,1,1,2,1],
    [1,2,1,0,1,2,1,2,2,2,2,2,2,2,1,2,1,1,1,2,1],
    [1,2,1,1,1,2,1,2,1,1,1,1,1,2,1,2,1,1,1,2,1],
    [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,2,1,1,1,1,2,1,2,1,1,1,1,2,1,1,2,1],
    [1,2,2,2,2,2,1,2,2,2,2,2,2,2,1,2,2,2,2,2,1],
    [1,1,1,2,2,2,1,2,1,1,0,1,1,2,1,2,2,2,1,1,1],
    [1,1,1,1,2,2,1,2,1,0,0,0,1,2,1,2,2,1,1,1,1],
    [1,2,2,2,2,2,2,2,1,0,0,0,1,2,2,2,2,2,2,2,1],
    [1,1,1,1,2,2,1,2,1,1,1,1,1,2,1,2,2,1,1,1,1],
    [1,1,1,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,1,1,1],
    [1,2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
    [1,2,1,1,2,1,1,1,1,2,2,2,1,1,1,1,2,1,1,2,1],
    [1,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,1],
    [1,2,2,1,1,2,2,2,1,1,1,1,1,2,2,2,1,1,2,2,1],
    [1,2,2,2,2,2,1,2,2,2,1,2,2,2,1,2,2,2,2,2,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];
    
function init(){
    ctx.drawImage(menu, 15*cellSize,10*cellSize,800,600);

    mrP = new Pack; 
    mrG = new Enemy;mrG.x = 1; mrG.y = 1;
    mrE = new Enemy;mrE.x = 1; mrE.y = 19;
    mrPr = new Enemy;mrPr.x = 17; mrPr.y = 19;
    mrD = new Enemy;mrD.x = 17; mrD.y = 1;

    for( var i = 0; i < map.length; i++ ){
        for(var j = 0; j < map[i].length; j++){
            if (map[i][j] == 1)  {
                ctx.drawImage(wall,i*cellSize,j*cellSize,cellSize,cellSize);            
            }
            else if (map[i][j] == 2){
                // point
                ctx.drawImage(point,i*cellSize,j*cellSize,cellSize,cellSize);            
            }               
        }
    }
    mrG.draw();
    mrP.draw();   
    mrE.draw();
    mrPr.draw();
    mrD.draw();
}

function updateScreen(x,y){
    ctx.clearRect(x*cellSize,y*cellSize,cellSize,cellSize);
}

function Pack(){
    this.x = 10;
    this.y = 10;

}
Pack.prototype ={
    draw: function() {
        map[this.x][this.y] = 4;
        ctx.drawImage(packman,this.x*cellSize,this.y*cellSize,cellSize,cellSize);
    },
    move: function(x,y){
        if(map[x][y] == 2){
            score++;
        }
        updateScreen(this.x,this.y);
        map[this.x][this.y] = 0;
        this.x = x;
        this.y = y;
        this.draw();
    },
    isMove: function(x,y){
        if(map[x][y] != 1){
            return true;
        }
        else{
            return false;
        }
    },
    end: function(event){
        if (score == MAX){
            console.log("max");
            
            document.onkeydown = function (event){
            }
        
            /*document.removeEventListener('keydown', event);
            document.removeEventListener('click', event);*/
        }
        if ((this.x == mrG.x && this.y == mrG.y) || (this.x == mrE.x && this.y == mrE.y) ||  (this.x == mrPr.x && this.y == mrPr.y) ||  (this.x == mrD.x && this.y == mrD.y))
        {
            console.log("crash");
            document.onkeydown = function (event){
            }
        }

    }
};
function Enemy(){
    this.x = 8;
    this.y = 10;
}
Enemy.prototype ={
    draw: function(){
        //map[this.x][this.y] = 3;
        ctx.drawImage(ghost,this.x*cellSize,this.y*cellSize,cellSize,cellSize);
    },
    isMove: function(x,y){
        if(map[x][y] != 1){
            moving = true;
            return true;
        }
        else{
            moving = false;
            return false;
        }
    },
    move: function(x,y){
        moving = false;
        var previously = map[this.x][this.y];

        if(previously == 2){
            updateScreen(this.x,this.y);
            ctx.drawImage(point,this.x*cellSize,this.y*cellSize,cellSize,cellSize);            
        }
        if(previously == 0){
            updateScreen(this.x,this.y);
        }


        this.x = x;
        this.y = y;
        this.draw();
    },
    randGo: function(){
        while(true){    
            var where = Math.floor(Math.random() * (5 - 1)) + 1;
            if (where == 1){//up
                if(this.isMove(this.x,this.y-1)){
                    this.move(this.x,this.y-1);
                    //console.log("up");
                    break;
                }
            }
            if (where == 2){//left
                if(this.isMove(this.x-1,this.y)){
                    this.move(this.x-1,this.y);
                    //console.log("left");    
                    break;
                }
            }
            if (where == 3){//down
                if(this.isMove(this.x,this.y+1)){
                    this.move(this.x,this.y+1);
                    //console.log("down");
                    break;
                }
            }
            if (where == 4){//rigth
                if(this.isMove(this.x+1,this.y)){
                    this.move(this.x+1,this.y);
                    //console.log("rigth");
                    break;
                }
            }
        }
    }

};

window.onload = function(){
    init();
};

document.onkeydown = function(event){
    var wCode = 87; 
	var aCode = 65;
	var sCode = 83;
	var dCode = 68;    
    var keyCode = event.keyCode;

    switch(keyCode){
        case wCode:
            if (mrP.isMove(mrP.x, mrP.y-1)){             
                   mrP.move(mrP.x,mrP.y-1);
            }
            break;
        case aCode:
            if(mrP.isMove(mrP.x-1,mrP.y)){
                mrP.move(mrP.x-1,mrP.y);
            }
            break;    
        case sCode:            
            if(mrP.isMove(mrP.x,mrP.y+1)){
                mrP.move(mrP.x,mrP.y+1);
            }
            break;
        case dCode:
            if(mrP.isMove(mrP.x+1,mrP.y)){
                mrP.move(mrP.x+1,mrP.y);
            }
            break;
    }

    mrP.end(document.onkeydown);
    mrG.randGo();
    mrE.randGo();
    mrPr.randGo();
    mrD.randGo();
    mrP.end(document.onkeydown);

    console.log(score);
}
