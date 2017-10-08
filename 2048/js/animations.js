function numberAnimation(boardX,boardY,number) {
    var numberCell=$("#number-cell-"+boardX+"-"+boardY);
    numberCell.css( "background",numberBackground(number));
    numberCell.css("color",numberColor(number));
    numberCell.css("font-size",numberSize(number));
    numberCell.text(number);
    numberCell.animate({
        width:cellWidth+"px",
        height:cellWidth+"px",
        top:positionTop(boardX,boardY)+"px",
        left:positionLeft(boardX,boardY)+"px"
    },50);
}

function numberMoveAnimation(startX,startY,endX,endY) {
    var numberCell=$("#number-cell-"+startX+"-"+startY);
    numberCell.animate({
        top:positionTop(endX,endY)+"px",
        left:positionLeft(endX,endY)+"px"
    },200);
}
