var board=new Array();
var collisionDetection=new Array();
var score=0;
var htmlInitHeight=0;

$(document).ready(function(){
    newGame();
    $(window).resize(function (){
        boardWidth=$(window).width();  //screen.availWidth;
        if(boardWidth>=500){
            boardWidth=500;
        };
        cellWidth=0.2*boardWidth;
        cellSpace=0.04*boardWidth;
        init();
        mobile();
        upDateBoardView();
    } );
});

function newGame() {
    $("#gameOver").remove();
    board=new Array();
    //初始化游戏网格
    init();
    //初始化碰撞检测
    collisionDetectionInit();
    //初始化分数
    score=0;
    upDateScore(score);
    //随机生成数字
    createOneNumber();
    createOneNumber();
    htmlInitHeight=$("html").height();
    mobile();
}

function mobile() {
    if($("html").height()>$(window).height()) {
        $("h1").hide();
        $("a").css({"margin": "10px auto"});
    }else  if($(window).height()>htmlInitHeight) {
        $("h1").show();
        $("a").css({"margin": "40px auto"});
    }
}

function collisionDetectionInit() {
    for(var i=0;i<4;i++){
        collisionDetection[i]=new Array();
        for(var k=0;k<4;k++){
            collisionDetection[i][k]=true;
        }
    }
}

function init(){
    //初始化网格位置
    var gameContainer=$("#game-container");
    gameContainer.css("width",boardWidth-2*cellSpace);
    gameContainer.css("height",boardWidth-2*cellSpace);
    gameContainer.css("padding",cellSpace);
    gameContainer.css("border-radius",0.06*cellWidth);
    $(".game-cell").remove();
    for(var i=0;i<4;i++){
        for(var k=0;k<4;k++){
            $('#game-container').append("<div class='game-cell' id="+'game-cell-'+i+"-"+k+"></div>");
            var gameCell=$('#game-cell'+"-"+i+"-"+k);
            gameCell.css("top",positionTop(i,k));
            gameCell.css("left",positionLeft(i,k));
        }
    }
    $(".game-cell").css("width",cellWidth);
    $(".game-cell").css("height",cellWidth);
    $(".game-cell").css("border-radius",0.03*cellWidth);

    //初始化数字位置
    if(board.length==0){
        for(var i=0;i<4;i++){
            board[i]=new Array();
            for(var k=0;k<4;k++){
                board[i][k]=0;
            }
        }
    }


    //加载数字显示
    upDateBoardView();
}

function upDateBoardView(){
    $(".number-cell").remove();
    for(var i=0;i<4;i++){
        for(var k=0;k<4;k++){
            $('#game-container').append("<div class='number-cell' id="+'number-cell-'+i+"-"+k+"></div>");
            var numberCell=$('#number-cell'+"-"+i+"-"+k);
            if(board[i][k]===0) {
                numberCell.css("top", positionTop(i, k) + 0.5*cellWidth);
                numberCell.css("left", positionLeft(i, k) + 0.5*cellWidth);
            }else{
                numberCell.css("top", positionTop(i, k));
                numberCell.css("left", positionLeft(i, k));
                numberCell.css("width",cellWidth);
                numberCell.css("height",cellWidth);
                numberCell.css("background",numberBackground(board[i][k]));
                numberCell.css("color",numberColor(board[i][k]));
                numberCell.css("font-size",numberSize(board[i][k]));
                numberCell.text(board[i][k]);
            }
        }
    }
    $(".number-cell").css({"line-height":cellWidth+"px",
        "border-radius":0.03*cellWidth+"px"});
}

function upDateScore(number) {
    score+=number;
    $('#score').html(score);
}

function createOneNumber() {
    //随机生成数字
    if(!noSpace(board)){
        var boardX=Math.floor(Math.random()*4);
        var boardY=Math.floor(Math.random()*4);
        var index=0;
        while(index<50){
            if(board[boardX][boardY]==0){
                board[boardX][boardY]=Math.random()<0.5?2:4;
                break;
            }else {
                boardX=Math.floor(Math.random()*4);
                boardY=Math.floor(Math.random()*4);
            }
            index++;
        }
        if (index==50){
            for (var i=0;i<4;i++){
                for (var k=0;k<4;k++){
                    if(board[i][k]==0){
                        boardX=i;
                        boardY=k;
                        board[boardX][boardY]=Math.random()<0.5 ? 2 :4;
                    }
                }
            }
        }
        numberAnimation(boardX,boardY,board[boardX][boardY]);
    }

}

function noSpace(board) {
    for(var i=0;i<4;i++){
        for (var k=0;k<4;k++){
            if(board[i][k]==0){
                return false;
            }
        }
    }
    return true;
}

$(document).keydown(function (event) {
    switch (event.keyCode){
        case 37:
            //move to left
            if(moveToLeft()){
                event.preventDefault();
                setTimeout("createOneNumber()",210);
                setTimeout("isGameOver()",270);
            }
            break;
        case 38:
            //move to top
            if(moveToTop()){
                event.preventDefault();
                setTimeout("createOneNumber()",210);
                setTimeout("isGameOver()",270);
            }
            break;
        case 39:
            //move to right
            if(moveToRight()){
                event.preventDefault();
                setTimeout("createOneNumber()",210);
                setTimeout("isGameOver()",270);
            }
            break;
        case 40:
            //move to down
            if(moveToDown()){
                event.preventDefault();
                setTimeout("createOneNumber()",210);
                setTimeout("isGameOver()",270);
            }
            break;
    }
});

document.addEventListener("touchstart",function (event) {
    touchStartX=event.targetTouches[0].pageX;
    touchStartY=event.targetTouches[0].pageY;
},false);

$(document).on("touchmove",function (event) {
    event.preventDefault();
},false);

document.addEventListener("touchend",function (event) {
    touchEndX = event.changedTouches[0].pageX;
    touchEndY = event.changedTouches[0].pageY;
    switch(touchMoveDirection(touchStartX,touchStartY,touchEndX,touchEndY)){
        case -1:
            break;
        case 1:
            //move to left
            if(moveToLeft()){
                event.preventDefault();
                setTimeout("createOneNumber()",210);
                setTimeout("isGameOver()",270);
            }
            break;
        case 2:
            //move to right
            if(moveToRight()){
                event.preventDefault();
                setTimeout("createOneNumber()",210);
                setTimeout("isGameOver()",270);
            }
            break;
        case 3:
            //move to down
            if(moveToDown()){
                event.preventDefault();
                setTimeout("createOneNumber()",210);
                setTimeout("isGameOver()",270);
            }
            break;
        case 4:
            //move to up
            if(moveToTop()){
                event.preventDefault();
                setTimeout("createOneNumber()",210);
                setTimeout("isGameOver()",270);
            }
            break;
    }
},false)

function isGameOver() {
    if(!canMoveToLeft(board)){
        if (!canMoveToTop(board)){
            if (!canMoveToRight(board)){
                if (!canMoveToDown(board)){
                    gameOver();
                }
            }
        }

    }
}

function gameOver() {
    $("#game-container").append("<div id='gameOver'></div>");
    var gameOver=$("#gameOver");
    gameOver.css({"width":boardWidth+"px",
        "height":boardWidth+"px",
        "margin-top":-cellSpace+"px",
        "line-height":boardWidth+"px"})
    gameOver.append("<span id='gameOverText'>游戏结束</span>")
}

function moveToLeft(){
    if(canMoveToLeft(board)){
        collisionDetectionInit();
        for(var i=0;i<4;i++){
            for(var k=1;k<4;k++){
                if(board[i][k]!=0){
                    for(var j=0;j<k;j++){
                        if (board[i][j]==0 && noBarrierLeft(i,k,j,board)){
                            numberMoveAnimation(i,k,i,j);
                            board[i][j]=board[i][k];
                            board[i][k]=0;
                            continue;
                        }else if(board[i][j]==board[i][k] && noBarrierLeft(i,k,j,board) && collisionDetection[i][j]){
                            numberMoveAnimation(i,k,i,j);
                            board[i][j] +=board[i][k];
                            collisionDetection[i][j] = false;
                            board[i][k]=0;
                            upDateScore(board[i][j]);
                            continue;
                        }
                    }
                }
            }
        }
        setTimeout("upDateBoardView()",200);
        return true;
    }
    return false;
}

function canMoveToLeft(board) {
    //判断整个数组中有没有一个数的位置能向左移动
    for(var i=0;i<4;i++){
        for (var k=1;k<4;k++){
            if(board[i][k] !== 0 ){
                if(board[i][k-1]==0||board[i][k-1]==board[i][k]){
                    return true;
                }
            }
        }
    }

    return false;
}

function noBarrierLeft(i,k,j,board) {
    //判断要移动的数字和目标位置之间有没有障碍物
    for(var x=j+1;x<k;x++){
        if(board[i][x]!=0){
            return false;
        }
    }

    return true;
}

function moveToTop() {
    if (canMoveToTop(board)){
        collisionDetectionInit();
        for(var i=1;i<4;i++){
            for (var k=0;k<4;k++){
                if(board[i][k]!=0){
                    for (var j=0;j<i;j++){
                        if(board[j][k]==0 && noBarrierTop(i,k,j,board)){
                            numberMoveAnimation(i,k,j,k);
                            board[j][k] = board[i][k];
                            board[i][k] = 0;
                            continue;
                        }else if (board[j][k]==board[i][k] && noBarrierTop(i,k,j,board) &&collisionDetection[j][k]){
                            numberMoveAnimation(i,k,j,k);
                            board[j][k] += board[i][k];
                            collisionDetection[j][k] = false;
                            board[i][k] = 0;
                            upDateScore(board[j][k]);
                            continue;
                        }
                    }
                }
            }
        }
        setTimeout("upDateBoardView()",200);
        return true;
    }
    return false;
}

function canMoveToTop(board) {
    for(var i=1;i<4;i++){
        for(var k=0;k<4;k++){
            if (board[i][k]!=0){
                if (board[i-1][k]==0||board[i-1][k]==board[i][k]){
                    return true;
                }
            }
        }
    }
    return false;
}

function noBarrierTop(i,k,j,board) {
    for (var x=j+1;x<i;x++){
        if(board[x][k]!=0){
            return false;
        }
    }

    return true;
}

function moveToRight() {
    if(canMoveToRight(board)){
        collisionDetectionInit();
        for (var i=0;i<4;i++){
            for (var k=2;k>=0;k--){
                if (board[i][k] != 0){
                    for (var j=3;j>k;j--){
                        if (board[i][j]==0 && noBarrierRight(i,k,j,board)){
                            numberMoveAnimation(i,k,i,j);
                            board[i][j]=board[i][k];
                            board[i][k]=0;
                            continue;
                        }else if (board[i][j]==board[i][k] && noBarrierRight(i,k,j,board) && collisionDetection[i][j]){
                            numberMoveAnimation(i,k,i,j);
                            board[i][j] += board[i][k];
                            collisionDetection[i][j]=false;
                            board[i][k]=0;
                            upDateScore(board[i][j]);
                            continue;
                        }
                    }
                }
            }
        }
        setTimeout("upDateBoardView()",200);
        return true;
    }
    return false;
}

function canMoveToRight(board) {
    for (var i=0;i<4;i++){
        for (var k=2;k>=0;k--){
            if(board[i][k]!=0){
                if(board[i][k+1]==0||board[i][k+1]==board[i][k]){
                    return true;
                }
            }
        }
    }
    return false;
}
function noBarrierRight(i,k,j,board) {
    for (var x=j-1;x>k;x--){
        if(board[i][x]!=0){
            return false;
        }
    }
    return true;
}

function moveToDown() {
    if (canMoveToDown(board)){
        collisionDetectionInit();
        for (var i=2;i>=0;i--){
            for (var k=0;k<4;k++){
                if (board[i][k]!=0){
                    for (var j=3;j>i;j--){
                        if(board[j][k]==0 && noBarrierDown(i,k,j,board)){
                            numberMoveAnimation(i,k,j,k);
                            board[j][k]=board[i][k];
                            board[i][k]=0;
                            continue;
                        }else  if(board[j][k]==board[i][k] && noBarrierDown(i,k,j,board) &&collisionDetection[j][k]){
                            numberMoveAnimation(i,k,j,k);
                            board[j][k] += board[i][k];
                            collisionDetection[j][k]=false;
                            board[i][k]=0;
                            upDateScore(board[j][k]);
                            continue;
                        }
                    }
                }
            }
        }
        setTimeout("upDateBoardView()",200);
        return true;
    }
    return false;
}
function canMoveToDown(board) {
    for (var i=2;i>=0;i--){
        for (var k=0;k<4;k++){
            if (board[i][k]!=0){
                if(board[i+1][k]==0||board[i+1][k]==board[i][k]){
                    return true;
                }
            }
        }
    }
    return false;
}

function noBarrierDown(i,k,j,board) {
    for (var x=j-1;x>i;x--){
        if (board[x][k]!=0){
            return false;
        }
    }
    return true;
}
