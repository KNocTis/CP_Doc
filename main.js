$(document).ready(function(){
    
    //createCanvas();
    
    //User added a img into Canvas
    $('#loadimg').click(function(){
        var url = $('#imgUrl').val();
        
        loadImgIntoBackOfCanvas(url);
    });
    
    
    $('#square').click(function(){
        addARectOntoCanvas("link");
    });
    
    $('#circle').click(function(){
        addACircleOntoCanvas();
    });
    
    $('#bookmark').click(function(){
        addARectOntoCanvas("bookmark");
    })
    
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
    
    $('#setBookmark').click(function(){
        addBookmarkOfBlock(currentBlock);
    });
    
    $('#page-selector').change(function(){
        console.log(this.value);
        toggleCanvas(this.value -1);
    })
});

var canvas;
var canvasArray = [];

var currentBlock; //current selected bolck

function currentBlockIsChanged () {
    toggleControlModule();
    updateBlocks();
}
    
function toggleControlModule () {
    var divsOfControlModules = $('.controlModules');
    for (let i = 0; i < divsOfControlModules.length; i++) {
        $(divsOfControlModules[i]).addClass("hide");
    }
    
    if (currentBlock.type == "link") {
        $('#blockInfo').removeClass('hide');
    } else if (currentBlock.type == "bookmark") {
        $('#bookmarktools').removeClass('hide');
    }
}

function updateBlocks() {
    let shapesInCanvas = canvas.getObjects();
    
    for (let i = 0; i < shapesInCanvas.length; i++) {
        if (shapesInCanvas[i].type == "ofBookmark") {
            shapesInCanvas[i].visible = false;
        }
    }
    
    if (currentBlock.type == "bookmark") {
        if (currentBlock.bookmark !== undefined) {
            currentBlock.bookmark.visible = true;
        }
    }
}

var img = new Image();

function createCanvasWithId(id)
{
    if (id == undefined || id == undefined) {
        console.warn("Coundn't create new canvas, because id inserted is invalid")
    }
    let newCanvas = document.createElement('canvas');
    $(newCanvas).addClass("fabricCanvas");
    newCanvas.id = id;
    $('#canvasContanier').append(newCanvas);
    console.log(id);
    
    let newFabricCanvas = new fabric.Canvas(id);
    canvasArray.push(newFabricCanvas);
    canvas = newFabricCanvas;
    toggleCanvas(canvasArray.length);
    
    //Add page into Select element
    $('#page-selector').append("<option value='" + canvasArray.length + "'>" + canvasArray.length + "</option>");
}

function addARectOntoCanvas(type)
{
    let aSquare = new fabric.Rect(
        {
            width: 50, left: 50,
            height: 20, top: window.pageYOffset + 30,
            fill: '#f55',
            opacity: 0.6
        }
    );
    
    aSquare.set({
        cornerSize: 10,
        cornerColor: "#3480f9"
    });
    
    aSquare.showMode = "modal";
    aSquare.type = type;
    
    aSquare.on("selected", function(){
        $('#positionInfo').text(" X: " + aSquare.left + " Y: " + aSquare.top);
        currentBlock = aSquare;
        $("#urlofblock").val(currentBlock.url ? currentBlock.url : "");
        currentBlockIsChanged();
    });
    
    aSquare.on("moving", function(){
        $('#positionInfo').text(" X: " + aSquare.left + " Y: " + aSquare.top);
    });
    
    aSquare.on("deselected", function() {
        aBlockHasBeenDeselected(aSquare);
    });

    canvas.add(aSquare);
}

function addBookmarkOfBlock (block) {
    
    if (currentBlock.bookmark !== undefined) {canvas.remove(currentBlock.bookmark);}
    
    let aSquare = new fabric.Rect(
        {
            width: 15, left: 50,
            height: 15, top: window.pageYOffset + 30,
            fill: '#ffdd55',
            opacity: 0.6
        }
    );
    
    aSquare.set({
        cornerSize: 10,
        cornerColor: "#3480f9"
    });
    
    currentBlock.bookmark = aSquare;
    aSquare.type = "ofBookmark";
    
    canvas.add(aSquare);
}

function addACircleOntoCanvas()
{
    //add script here
}

function loadImgIntoBackOfCanvas(url)
{
    let canvasIndex  = canvasArray.length + 1;
    var canvasId = "canvas" + canvasIndex;
    createCanvasWithId(canvasId);
    
    img.src = url;
    
    img.onload = function(){

        canvas.setBackgroundImage(url, canvas.renderAll.bind(canvas));
        canvas.setWidth(img.width);
        canvas.setHeight(img.height);
        
    }
    
    img.onerror = function(){
        console.log("img can not be loaded");
    }

    toggleCanvas(canvasArray.length - 1);
}

function toggleCanvas (index) {
    for (let i = 0; i < canvasArray.length; i++) {
        let canvasIndex  = i + 1;
        $("#canvas" + canvasIndex).parent().addClass("hide");
        //console.log( $("#canvas" + canvasIndex)[0]);
    }
    let canvasIndex  = index + 1;
    $("#canvas" + canvasIndex).parent().removeClass("hide");
    
    canvas = canvasArray[index];
        
    tooglePageSelector(canvasIndex);
}

function tooglePageSelector (index) {
    $('#page-selector').val(index);
}

function aBlockHasBeenDeselected (block) {
}

//http://static2.fjcdn.com/comments/Excuse+me+_4952da80933dca43cec9d820b9583dd3.png
//http://static4.fjcdn.com/comments/Oh+no+my+souffle+_990ae6c79bbe141830cf8edc66233a8d.jpg
//
//img/20161202224405.png