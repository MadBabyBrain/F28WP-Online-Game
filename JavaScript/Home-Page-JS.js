function startGame()
{

    gameArea.start();

}


var gameArea = {
    
    canvas : document.createElement("canvas"),
    
    start : function() {

        this.canvas.width = 480;
        this.canvas.heigt = 207;
        this.context  =this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

    }
}
