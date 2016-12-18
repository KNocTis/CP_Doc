var testMode = false;
var transparentImageUrl = testMode? "http://172.106.32.119/wp-content/uploads/2016/12/EEFA85-0.5.png" : "http://172.16.21.109/cpdoc/wp-content/uploads/2016/12/NFFFFFF-0.png"

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
        createElmentWithBlock(blocks[i], aDiv, scaleFactor);
    }
    
    $('#htmlCode').val(aDiv.outerHTML.replace(/&quot;/g, "\'"));
    console.log(aDiv);
    
}
//img/20161201182600.png

function createElmentWithBlock(block, aDiv, scaleFactor) {
    let aA = document.createElement('a');
    aA.href = block.url;
    aA.target = "_blank";
    aA.style.position = "absolute";
    aA.style.marginLeft = block.left * scaleFactor + "px";
    aA.style.marginTop = block.top * scaleFactor + "px";
    if (block.showMode == "modal") {
        $(aA).addClass("modal-link");
    }
    

    let aImg = document.createElement('img');
    aImg.src = transparentImageUrl;
    aImg.style.width = block.getWidth() * scaleFactor + "px";
    aImg.style.height = block.getHeight() * scaleFactor + "px";

    aA.appendChild(aImg);

    aDiv.appendChild(aA);
}

function createElmentInModalModeWithBlock (block, aDiv, scaleFactor) {

}

















