var boardWidth=$(window).width();  //screen.availWidth;
if(boardWidth>=500){
    boardWidth=500;
}
var cellWidth=0.2*boardWidth;
var cellSpace=0.04*boardWidth;

function positionTop(X,Y){
    return cellSpace+(cellSpace+cellWidth)*X;
}

function positionLeft(X,Y){
    return cellSpace+(cellSpace+cellWidth)*Y;
}
function numberBackground(number){
    switch( number ){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
    }

    return "black";
}

function numberColor(number) {
    if( number <= 4 ) {
        return "#776e65";
    }
    return "white";
}
function numberSize(number) {
    if(number<1024){
        return 0.1*boardWidth;
    }

    return 0.06*boardWidth;
}

