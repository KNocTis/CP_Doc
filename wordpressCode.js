var transparentImageUrl = "http://172.106.32.119/wp-content/uploads/2016/12/NFFFFFF-0.png"

function htmlCodeForWPwithBlocks(blocks, image)
{
    if(blocks == undefined || blocks.length == 0){return};
    
    let backgroundStr = 'url(\"' + image.src + '\")'
        
    var aDiv = document.createElement('div');
    aDiv.className = "size-full";
    aDiv.style.backgroundImage = backgroundStr;
    aDiv.style.width = image.width;
    aDiv.style.height = image.height;
    
    for (let i = 0; i < blocks.length; i++)
    {
        let aA = document.createElement('a');
        aA.href = blocks[i].url;
        aA.target = "_blank";
        
        let aImg = document.createElement('img');
        aImg.src = transparentImageUrl;
        
        aA.appendChild(aImg);
        
        aDiv.appendChild(aA);
    }
    
    $('#htmlCode').val(aDiv.outerHTML);
    console.log(aDiv.outerHTML);
    
}