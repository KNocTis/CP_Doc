$(document).ready(function(){
    
    createCanvas();
    
    
    $('#loadimg').click(function(){
        var url = $('#imgUrl').val();
        
        loadImgIntoBackOfCanvas(url);
    });
    
    
    $('#square').click(function(){
        addARectOntoCanvas();
    });
    
    $('#circle').click(function(){
        addACircleOntoCanvas();
    });
    
    $('#circle').click(function(){
        addABookmarkOntoCanvas();
    });
    
    $('#output').click(function(){
        let shapesInCanvas = canvas.getObjects();
        
        for (let i = 0; i < shapesInCanvas.length; i++)
        {
            console.log("No." + i + " X: " + shapesInCanvas[i].left + " Y: " + shapesInCanvas[i].top);
        }
        
        htmlCodeForWPwithBlocks(shapesInCanvas, img);
    })
    
    $('#urlofblock').change(function(){
        if (currentBlock &&  $('#urlofblock').val() !== "")
        {
            currentBlock.url = $('#urlofblock').val();
            console.log(currentBlock.url);
        }
    });
    
    $('#newTab').change(function(){
        if (currentBlock == undefined) {return;}
        
        if (this.checked) {
            currentBlock.showMode = "newtab";
        } else {
            currentBlock.showMode = "modal";
        }
    })
    
});

var canvas;

var currentBlock; //current selected bolck
    
var img = new Image();

function createCanvas()
{
    canvas = new fabric.Canvas('c');
}

function addARectOntoCanvas()
{
    let aSquare = new fabric.Rect(
        {
            width: 50, left: 50,
            height: 20, top: 30,
            fill: '#f55',
            opacity: 0.6
        }
    );
    
    aSquare.set({
        cornerSize: 10,
        cornerColor: "#3480f9"
    });
    
    aSquare.showMode = "modal";
    
    aSquare.on("selected", function(){
        $('#positionInfo').text(" X: " + aSquare.left + " Y: " + aSquare.top);
        currentBlock = aSquare;
        $("#urlofblock").val(currentBlock.url ? currentBlock.url : "");
    });
    
    aSquare.on("moving", function(){
        $('#positionInfo').text(" X: " + aSquare.left + " Y: " + aSquare.top);
    });

    canvas.add(aSquare);
}

function addACircleOntoCanvas()
{
    //add script here
}

function loadImgIntoBackOfCanvas(url)
{
    
    img.src = url;
    
    img.onload = function(){

        canvas.setBackgroundImage(url, canvas.renderAll.bind(canvas));
        canvas.setWidth(img.width);
        canvas.setHeight(img.height);
        
    }
    
    img.onerror = function(){
        console.log("img can not be loaded");
    }

}


//img/20161202224405.png