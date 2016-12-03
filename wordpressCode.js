var testMode = false;
var transparentImageUrl = testMode? "http://172.106.32.119/wp-content/uploads/2016/12/EEFA85-0.5.png" : "http://172.106.32.119/wp-content/uploads/2016/12/NFFFFFF-0.png"

function htmlCodeForWPwithBlocks(blocks, image)
{
    if(blocks == undefined || blocks.length == 0){return};
    
    let backgroundStr = "url(\'" + image.src + "\')"
        
    var aDiv = document.createElement('div');
    aDiv.className = "size-full";
    aDiv.style.width = image.width + "px";
    aDiv.style.height = image.height + "px";
    aDiv.style.backgroundImage = backgroundStr;

    
    for (let i = 0; i < blocks.length; i++)
    {
        let aA = document.createElement('a');
        aA.href = blocks[i].url;
        aA.target = "_blank";
        aA.style.position = "absolute";
        aA.style.marginLeft = blocks[i].left + "px";
        aA.style.marginTop = blocks[i].top + "px";
        
        let aImg = document.createElement('img');
        aImg.src = transparentImageUrl;
        aImg.style.width = blocks[i].getWidth() + "px";
        aImg.style.height = blocks[i].getHeight() + "px";
        
        aA.appendChild(aImg);
        
        aDiv.appendChild(aA);
    }
    
    $('#htmlCode').val(aDiv.outerHTML.replace(/&quot;/g, "\'"));
    console.log(aDiv);
    
}
//img/20161201182600.png