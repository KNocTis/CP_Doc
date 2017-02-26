var canvas; //The canvas which displays on the page currently
var canvasArray = []; //of all canvas user added
var imgArray = []; //of all images user added

var currentBlock; //Currently selected bolck

//options
let maxCanvasWidth = 1024;

$(document).ready(function(){
    
    //Set options
   maxCanvasWidth = $(window).width() * 0.9;
    
    //User added a img into Canvas
    $('#loadimg').click(function(){
        var url = $('#imgUrl').val();
        
        Displayer.loadImgIntoBackOfCanvas(url);
    });
    
    //User added a rect link/modal onto current canvas
    $('#square').click(function(){
        Displayer.addARectOntoCanvas("link-modal", canvas);
    });
    
    //User added a circle link/modal onto current canvas
    $('#circle').click(function(){
        Displayer.addACircleOntoCanvas();
    });
    
    //User added a rect bookmark onto current canvas
    $('#bookmark').click(function(){
        Displayer.addARectOntoCanvas("bookmark", canvas);
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
            currentBlock.type = "link-newtab";
        } else {
            currentBlock.type = "link-modal";
        }
    })
    
    //User set/reset the bookmark desination position
    //Add new / move the existed block of desination position onto the current canvas
    $('#setBookmark').click(function(){
       currentBlock.bookmark = Displayer.addBookmarkOnToCanvas(canvas);
    });
    
    //User changed page number
    $('#page-selector').change(function(){
        Displayer.toggleCanvas(this.value -1);
    })
	 
	 
	 $('#import-htmltxt-btn').click(function(){
//		 console.log($('#htmlCode').text());
       Importor.objectOfFlowFromText($('#htmlCode').val(), function(savaData) {
          Displayer.resetEntireCanvasWithDomObject(savaData);
       })
//		 Displayer.resetEntireCanvasWithDomObject(Importor.objectOfFlowFromText($('#htmlCode').val()));
		 
		 //For testing detectTypeOfBlock()
//		 console.log(Importor.detectTypeOfBlock($.parseHTML($('#htmlCode').val())[0]));
	 })
	 
});




/////////////////////////////////////////
//The functions below are event handler//
/////////////////////////////////////////

function currentBlockIsChanged () {
    //Changes tools display on toolbar
    //Depens on the type of the current block
    Displayer.toggleControlModule();
   
   //
   
    
    //Update which blocks should be displayed on canvas
    //All blocks be of desination positon of bookmark should be hidden
    //Only one of them can be shown on page, which is the child of selected block
    Displayer.updateBlocks();
}

function aBlockHasBeenDeselected (block) {
}





//Generate random ID
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