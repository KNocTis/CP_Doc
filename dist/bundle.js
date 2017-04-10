/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

var testMode = false;
//var transparentImageUrl = testMode? "http://172.106.32.119/wp-content/uploads/2016/12/EEFA85-0.5.png" : "http://172.16.21.109/cpdoc/wp-content/uploads/2016/12/NFFFFFF-0.png"
var transparentImageUrl = "/cpdoc/wp-content/uploads/2016/12/NFFFFFF-0.png";

var maxWidth = 800; //depends on the max width of Wordpress post page

function htmlCodeForWPwithBlocks(blocks, image)
{
    //Protection
    if(blocks == undefined || blocks.length == 0){return};
    
    //
    var scaleFactor = 1;
    if (maxWidth < image.width){
        scaleFactor = maxWidth / image.width ;
    }
        
    let backgroundStr = "url(\'" + image.src + "\')"
        
    var aDiv = document.createElement('div');
    aDiv.className = "size-full";
    aDiv.style.width = image.width * scaleFactor + "px";
    aDiv.style.height = image.height * scaleFactor + "px";
    aDiv.style.backgroundImage = backgroundStr;
    aDiv.style.backgroundSize = image.width * scaleFactor + "px" + " " + image.height * scaleFactor + "px";

    for (let i = 0; i < blocks.length; i++)
    {
        createElmentWithBlock(blocks[i], aDiv, scaleFactor, i);
    }
    
    console.log(aDiv);
    $('#htmlCode').val($('#htmlCode').val() + aDiv.outerHTML.replace(/&quot;/g, "\'"));
    //console.log(aDiv);
    
}
//img/20161201182600.png

function createElmentWithBlock(block, aDiv, scaleFactor, index) {
    //position of bookmark will be handled with bookmark blocks
    //if (block.type == "ofBookmark") {return;}
    
    //
    let aA = document.createElement('a');
    //View part
    aA.style.position = "absolute";
    aA.style.marginLeft = block.left * scaleFactor + "px";
    aA.style.marginTop = block.top * scaleFactor + "px";
    
    //Data part
    if (block.type == "link") {
        aA.href = block.url;
        aA.target = "_blank";
        if (block.showMode == "modal") {
            $(aA).addClass("modal-link");
        }
    } else if (block.type == "bookmark") {
        let idOfBookmark = "bookmark" + index;
        aA.href = "#" + block.bookmark.uid;
        //addBookmarkPositionWithBlock(block.bookmark, aDiv, scaleFactor, idOfBookmark);
    } else if (block.type == "ofBookmark"){
        aA.id = block.uid;
    }

    

    let aImg = document.createElement('img');
    aImg.src = transparentImageUrl;
    aImg.style.width = block.getWidth() * scaleFactor + "px";
    aImg.style.height = block.getHeight() * scaleFactor + "px";

    aA.appendChild(aImg);

    aDiv.appendChild(aA);
}

function addBookmarkPositionWithBlock(block, aDiv, scaleFactor, id) {
    let aA = document.createElement('a');
    
    aA.style.position = "absolute";
    aA.style.marginLeft = block.left * scaleFactor + "px";
    aA.style.marginTop = block.top * scaleFactor + "px";
    
    aA.id = id;
    
    aDiv.appendChild(aA);

}

function createElmentInModalModeWithBlock (block, aDiv, scaleFactor) {

}



















/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_wordpressCode_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_wordpressCode_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__js_wordpressCode_js__);
//import jQuery from 'jquery';
//import bootstrap from 'bootstrap';



$(document).ready(function(){
    
    //createCanvas();
    
    //User added a img into Canvas
    $('#loadimg').click(function(){
        var url = $('#imgUrl').val();
        
        loadImgIntoBackOfCanvas(url);
    });
    
    //User added a rect link/modal onto current canvas
    $('#square').click(function(){
        addARectOntoCanvas("link");
    });
    
    //User added a circle link/modal onto current canvas
    $('#circle').click(function(){
        addACircleOntoCanvas();
    });
    
    //User added a rect bookmark onto current canvas
    $('#bookmark').click(function(){
        addARectOntoCanvas("bookmark");
    })
    
    //Output html code
    $('#output').click(function(){
        $('#htmlCode').val('');
        for (let i = 0; i < canvasArray.length; i++)
        {
            let shapesInCanvas = canvasArray[i].getObjects();
            
            htmlCodeForWPwithBlocks(shapesInCanvas, imgArray[i]);
        }
//        for (let i = 0; i < shapesInCanvas.length; i++)
//        {
//            console.log("No." + i + " X: " + shapesInCanvas[i].left + " Y: " + shapesInCanvas[i].top);
//        }
        
    })
    
    //the url input text has been changed
    //And change url property of the current block
    $('#urlofblock').change(function(){
        //Protection
        //If the value of text input is empty or there is no selected block, do nothing
        if (currentBlock &&  $('#urlofblock').val() !== "")
        {
            currentBlock.url = $('#urlofblock').val();
            //console.log(currentBlock.url);
        }
    });
    
    
    //User toogled the current rectagle block as "new tab" or not
    //Change the property of the block corespondingly
    $('#newTab').change(function(){
        //Protection
        //If there is no block selected, just return
        if (currentBlock == undefined) {return;}
        
        //Toogle
        if (this.checked) {
            currentBlock.showMode = "newtab";
        } else {
            currentBlock.showMode = "modal";
        }
    })
    
    //User set/reset the bookmark desination position
    //Add new / move the existed block of desination position onto the current canvas
    $('#setBookmark').click(function(){
        addBookmarkOfBlock(currentBlock);
    });
    
    //User changed page number
    $('#page-selector').change(function(){
        toggleCanvas(this.value -1);
    })
});

var canvas; //The canvas which displays on the page currently
var canvasArray = []; //of all canvas user added
var imgArray = []; //of all images user added

var currentBlock; //Currently selected bolck


/////////////////////////////////////////
//The functions below are event handler//
/////////////////////////////////////////

function currentBlockIsChanged () {
    //Changes tools display on toolbar
    //Depens on the type of the current block
    toggleControlModule();
    
    //Update which blocks should be displayed on canvas
    //All blocks be of desination positon of bookmark should be hidden
    //Only one of them can be shown on page, which is the child of selected block
    updateBlocks();
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

///////////////////////////////////////////
//The functions below are related to View//
///////////////////////////////////////////

//Changes tools display on toolbar
//Depens on the type of the current block
function toggleControlModule () {
    //Get all divisons of control module
    var divsOfControlModules = $('.controlModules');
    
    //Enumerate all control modules
    //Hide them by adding class "hide"
    for (let i = 0; i < divsOfControlModules.length; i++) {
        $(divsOfControlModules[i]).addClass("hide");
    }
    
    //Decide which control module should be shown
    //Show one of them by removing class "hide"
    if (currentBlock.type == "link") {
        $('#blockInfo').removeClass('hide');
    } else if (currentBlock.type == "bookmark") {
        $('#bookmarktools').removeClass('hide');
    }
}

// ***** This method should be CALLED everytime page is changed *******
//Update dispaly of blocks on current canvas
//All "ofBookmark" should be hidden except the current one
function updateBlocks() {
    
    //Hide all "ofBookmark" blocks first
    let shapesInCanvas = canvas.getObjects();
    for (let i = 0; i < shapesInCanvas.length; i++) {
        if (shapesInCanvas[i].type == "ofBookmark") {
            shapesInCanvas[i].visible = false;
        }
    }
    
    //Show the only one of "ofBookmark" if the selected block is bookmark
    if (currentBlock.type == "bookmark") {
        if (currentBlock.bookmark !== undefined) {
            currentBlock.bookmark.visible = true;
        }
    }
}


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
    
    if (currentBlock.bookmark !== undefined) 
    {
        //remove it from parent canvas
        for (let i = 0; i < canvasArray.length; i++)
        {
            canvasArray[i].remove(currentBlock.bookmark);
        }
    }
    
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
    aSquare.uid = makeid();
    
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
    
    let img = new Image();
    
    img.src = url;
    
    img.onload = function(){

        canvas.setBackgroundImage(url, canvas.renderAll.bind(canvas));
        canvas.setWidth(img.width);
        canvas.setHeight(img.height);
        imgArray.push(img);
    }
    
    img.onerror = function(){
        console.log("img can not be loaded");
    }

    
    toggleCanvas(canvasArray.length - 1);
}



function aBlockHasBeenDeselected (block) {
}

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 6; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}
//http://static2.fjcdn.com/comments/Excuse+me+_4952da80933dca43cec9d820b9583dd3.png
//http://static4.fjcdn.com/comments/Oh+no+my+souffle+_990ae6c79bbe141830cf8edc66233a8d.jpg
//http://vignette4.wikia.nocookie.net/finalfantasy/images/3/33/Final-Fantasy-XV_Cover_(2016).jpg/revision/latest?cb=20160713205720
//http://assets1.ignimgs.com/thumbs/userUploaded/2016/3/30/final-fantasy-15-director-gets-advice-from-seriescwfd1920-1459390490607_large.jpg
//img/20161202224405.png

/***/ })
/******/ ]);