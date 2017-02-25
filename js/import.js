var Importor = {
	
	// imgurl: string
	//	blocks: [{type: string, xx: xx}]
	objectOfFlowFromText: function(text) {
		
		let docSavaData = [];
      let ofBookmarkBlocks = [];
		let detectTypeOfBlock = this.detectTypeOfBlock; // Bind this function to be accessibale
//		console.log($.parseHTML(text));
		//Enumerate Pages/Canvas===========================================================
		$.parseHTML(text).map(convertHTML2ObjectForCanvas);
		
		function convertHTML2ObjectForCanvas (item, indexOfCanvas) { //item ==> HTML Dom
			console.log(item);
         
			let page = {imageUrl: item.style.backgroundImage, blocks: []};
			
			//Enumerate Blocks===============================================================        
         $.parseHTML(item.innerHTML).map(convertHTML2ObjectForBloack);
			
			function convertHTML2ObjectForBloack(item, index){ //item ==> HTML Dom
								
				let theBlock = {
					height: strToNumber(item.children[0].style.height),
					width: strToNumber(item.children[0].style.width),
					left: strToNumber(item.style.marginLeft),
					top: strToNumber(item.style.marginTop),
					type: item.getAttribute("data-block-type") ? item.getAttribute("data-block-type") : detectTypeOfBlock(item),
					id: item.getAttribute("id"),
               url: item.getAttribute("href"),
               id: item.getAttribute("id"),
               indexOfCanvas: indexOfCanvas
				};
            
            function strToNumber(str){
               return Number(str.substr(0, str.length - 2));
            }
				
//				console.log(theBlock);
            if (theBlock.type == "ofBookmark") {
               ofBookmarkBlocks.push(theBlock);
            }
				
            page.blocks.push(theBlock);
				return true;
			}
			
//			console.log(page);
			docSavaData.push(page);
		}
      
      //Enumerate ofBookmark Blocks===============================================================
      //To match bookmarks
      ofBookmarkBlocks.map(function(childItem) {  // ======= 1st loop
         docSavaData.map(function(page) {    //=============   2nd loop
            page.blocks.map(function(parentItem){ //=========  3rd loop
               if(parentItem.url){
//                  console.log(childItem.id, "   ", parentItem.url.substr(1,parentItem.url.length));
                  if(childItem.id == parentItem.url.substr(1, parentItem.url.length)){
                     parentItem.bookmark = childItem;
                  }
               }
            })
         })
      })
         
//		console.log(docSavaData);
		return docSavaData;
	},
	
	//For build before 20170225, 
	//This method is ****NOT reliable*****
	detectTypeOfBlock: function (item) {
		if (item.className == "modal-link") {
			return "link-modal";
		}

		if (item.getAttribute("href")){
			if (item.getAttribute("href").substr(0,1) == "#")
				return "bookmark";
		}

		if (item.id)
			return "ofBookmark";

		return "link-newtab";
	},
   
   addImageByUrl: function(url, done) {
		let img = new Image();
		img.src = url;
		img.onload = function(){
//         console.log(done);
         if(done){done(this);};
		}
		img.onerror = function(){
		  console.log("img can not be loaded");
		}
      imgArray.push(img);
   }
}

///////////////////////////////////////////
//The functions below are related to View//
///////////////////////////////////////////

var Displayer = {
	
	resetEntireCanvasWithDomObject: function(savaData){
		if(savaData.length < 1) {
			console.warn("Reset Canvasses failed, sava sata passed in is not valid!\n", savaData);
			return false;
		}
      
      //Clean canvas area
		this.removeCanvas();
      
      let loadedPagesCount = 0;

      //Enumerate Blocks
      //Add blocks onto canvanses
      let addBookmarkOnToCanvas = this.addBookmarkOnToCanvas;
      let addARectOntoCanvas = this.addARectOntoCanvas;
      let loadBlocksOntoCanvas = function() {
         for (let i = 0; i < savaData.length; i++){
            
            let page = savaData[i].blocks;
            let theCanvas = canvasArray[i];
//            console.log(page);
            for (let j = 0; j < page.length; j++){
               let theBlock = page[j];
               
               if (theBlock.type !== "ofBookmark"){
                  let aBlock = addARectOntoCanvas(theBlock.type, theCanvas, theBlock);
                  if(theBlock.type == "bookmark") {
                     aBlock.bookmark = addBookmarkOnToCanvas(canvasArray[theBlock.bookmark.indexOfCanvas], theBlock.bookmark);
                  }
               } else {
//                  console.log("the following block will be added:", theBlock);
               }
            }
         }
      }
      
      let imageHasBeenLoadedOntoCanvas = function(){
         
         loadedPagesCount += 1;
//         console.log("loaded count: ", loadedPagesCount, "  total: ", savaData.length);
         if (loadedPagesCount == savaData.length){
//            console.log("start loading blocks");
            loadBlocksOntoCanvas();
         }
      }
      


		//Enumerate Pages/Canvas
		//Load pages/images into canvas
		for (let i = 0; i < savaData.length; i++) {
			let item = savaData[i];
//         console.log(item.imageUrl.substr(5, item.imageUrl.length - 7));
			this.loadImgIntoBackOfCanvas(item.imageUrl.substr(5, item.imageUrl.length - 7), imageHasBeenLoadedOntoCanvas);
		}
      
		
	},
	
	loadImgIntoBackOfCanvas: function(url, done) {
		
		//Create Canvas for the image
		let canvasIndex  = canvasArray.length + 1;
		var canvasId = "canvas" + canvasIndex;
		this.createCanvasWithId(canvasId);

		//Load image into canvas
      let img;
      
      imgArray.map(function(imgItem){
         if (imgItem.url == url) {
            img = imgItem;
         }
      })
      
      if (img == undefined) {
         Importor.addImageByUrl(url, function(imgItem){
            canvasArray[canvasIndex - 1].setBackgroundImage(url, canvas.renderAll.bind(canvas));
            canvasArray[canvasIndex - 1].setWidth(imgItem.width);
            canvasArray[canvasIndex - 1].setHeight(imgItem.height);
         })
      }
      
//		let img = new Image();
//		img.src = url;
//		img.onload = function(){
////         console.log(done);
//
//         if(done){done();};
//		}
//		img.onerror = function(){
//		  console.log("img can not be loaded");
//		}
//      imgArray.push(img);

		//Swtich page to this image
		this.toggleCanvas(canvasArray.length - 1);
	},
	
	createCanvasWithId: function(id){
		
		if (id == undefined || id == undefined) {
		  console.warn("Coundn't create new canvas, because id inserted is invalid")
		}
		
		let newCanvas = document.createElement('canvas');
		$(newCanvas).addClass("fabricCanvas");
		newCanvas.id = id;
		$('#canvasContanier').append(newCanvas);
//		console.log(id);

		let newFabricCanvas = new fabric.Canvas(id);
		canvasArray.push(newFabricCanvas);
		canvas = newFabricCanvas;
		this.toggleCanvas(canvasArray.length);

		//Add page into Select element
		$('#page-selector').append("<option value='" + canvasArray.length + "'>" + canvasArray.length + "</option>");	
	},
	
	toggleCanvas: function(index){
		for (let i = 0; i < canvasArray.length; i++) {
		  let canvasIndex  = i + 1;
		  $("#canvas" + canvasIndex).parent().addClass("hide");
		  //console.log( $("#canvas" + canvasIndex)[0]);
		}
		let canvasIndex  = index + 1;
		$("#canvas" + canvasIndex).parent().removeClass("hide");

		canvas = canvasArray[index];

		//Swtich page selector value
		$('#page-selector').val(canvasIndex);
	},
	
	//Changes tools display on toolbar
	//Depens on the type of the current block
	toggleControlModule: function() {
		//Get all divisons of control module
		var divsOfControlModules = $('.controlModules');

		//Enumerate all control modules
		//Hide them by adding class "hide"
		for (let i = 0; i < divsOfControlModules.length; i++) {
		  $(divsOfControlModules[i]).addClass("hide");
		}

		//Decide which control module should be shown
		//Show one of them by removing class "hide"
		if (currentBlock.type.includes("link")) {
		  $('#blockInfo').removeClass('hide');
         $('#positionInfo').text(" X: " + currentBlock.left + " Y: " + currentBlock.top);
         $("#urlofblock").val(currentBlock.url ? currentBlock.url : "");
         $('#newTab').attr('checked', currentBlock.type == "link-modal" ? false : true);
      } else if (currentBlock.type == "bookmark") {
		  $('#bookmarktools').removeClass('hide');
		}
	},
   
   updateControlPannelUI: function() {
      
   },
	
	// ***** This method should be CALLED everytime page is changed *******
	//Update dispaly of blocks on current canvas
	//All "ofBookmark" should be hidden except the current one
	updateBlocks: function() {
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
	},
	
	addARectOntoCanvas: function(type, canvasi, props) {
 
		let aSquare = new fabric.Rect(
		  {
				width: props ? props.width : 50,
				left: props ? props.left : 50,
				height: props ? props.height : 20,
				top: props ? props.top : window.pageYOffset + 30,
				fill: '#f55',
				opacity: 0.6,
           url: props ? props.url : ""
		  }
		);
//      console.log(props.url);

		aSquare.set({
		  cornerSize: 10,
		  cornerColor: "#3480f9"
		});

		aSquare.type = type;
//      console.log(type)

		aSquare.on("selected", function(){
		  currentBlock = aSquare;
		  currentBlockIsChanged();
		});

		aSquare.on("moving", function(){
		  $('#positionInfo').text(" X: " + aSquare.left + " Y: " + aSquare.top);
		});

		aSquare.on("deselected", function() {
		  aBlockHasBeenDeselected(aSquare);
		});

      
		canvasi.add(aSquare);
      return aSquare;
      //Add bookmark
//      let addBookmarkOnToCanvas = this.addBookmarkOnToCanvas;
//      if(type == "bookmark" && props){
////         console.log(props);
//         if(props.bookmark){
//            console.log(this)
//            aSquare.bookmark = addBookmarkOnToCanvas(canvasArray[props.indexOfCanvas], props);
//         }
//      }
      
//      console.log("Block added to canvas", aSquare);
	},
	
	addBookmarkOnToCanvas: function(canvas, props) {
      if(!props){
         if (currentBlock.bookmark !== undefined) 
         {
           //remove it from parent canvas
           for (let i = 0; i < canvasArray.length; i++)
           {
               canvasArray[i].remove(currentBlock.bookmark);
           }
         }
      }


		let aSquare = new fabric.Rect(
		  {
				width: props ? props.width : 15,
				left: props ? props.left : 50,
				height: props ? props.height : 15,
				top: props ? props.top : window.pageYOffset + 30,
				fill: '#ffdd55',
				opacity: 0.6
		  }
		);

		aSquare.set({
		  cornerSize: 10,
		  cornerColor: "#3480f9"
		});

		aSquare.type = "ofBookmark";
		aSquare.uid = props ? props.id : makeid();

		canvas.add(aSquare);
      return aSquare;
	},
	
	addACircleOntoCanvas: function() {
		
	},
	
	removeCanvas: function(index){
		if (index == undefined) {
			$('#canvasContanier').children().remove();
			return true;
		}
		
		$($('#canvasContanier').children()[index]).remove();
	}
}

//==========Old version========
//<div class="size-full" style="width: 800px; height: 450px; background-image: url('https://i.ytimg.com/vi/xwZCsfZsA4Y/maxresdefault.jpg'); background-size: 800px 450px;"><a href="url-modal" target="_blank" class="modal-link" style="position: absolute; margin-left: 322.083px; margin-top: 147.917px;"><img src="/cpdoc/wp-content/uploads/2016/12/NFFFFFF-0.png" style="width: 63.4549px; height: 26.1285px;"></a><a href="url-newtab" target="_blank" class="modal-link" style="position: absolute; margin-left: 437.083px; margin-top: 142.5px;"><img src="/cpdoc/wp-content/uploads/2016/12/NFFFFFF-0.png" style="width: 76.441px; height: 31.4757px;"></a><a href="#eUABCp" style="position: absolute; margin-left: 319.583px; margin-top: 211.667px;"><img src="/cpdoc/wp-content/uploads/2016/12/NFFFFFF-0.png" style="width: 72.6042px; height: 29.8958px;"></a></div><div class="size-full" style="width: 800px; height: 420px; background-image: url('http://www.studiocity-macau.com/uploads/images/SC/Entertainment/Batman/batman_share.jpg'); background-size: 800px 420px;"><a id="eUABCp" style="position: absolute; margin-left: 346px; margin-top: 278.667px;"><img src="/cpdoc/wp-content/uploads/2016/12/NFFFFFF-0.png" style="width: 10.6667px; height: 10.6667px;"></a></div>


//==============New version====
//<div class="size-full" style="width: 800px; height: 450px; background-image: url('https://i.ytimg.com/vi/xwZCsfZsA4Y/maxresdefault.jpg'); background-size: 800px 450px;"><a data-block-type="link-modal" href="123" target="_blank" class="modal-link" style="position: absolute; margin-left: 216.667px; margin-top: 107.083px;"><img src="/cpdoc/wp-content/uploads/2016/12/NFFFFFF-0.png" style="width: 74.375px; height: 30.625px;"></a><a data-block-type="bookmark" href="#b8xmXS" style="position: absolute; margin-left: 194.167px; margin-top: 232.5px;"><img src="/cpdoc/wp-content/uploads/2016/12/NFFFFFF-0.png" style="width: 21.25px; height: 8.75px;"></a><a data-block-type="ofBookmark" id="b8xmXS" style="position: absolute; margin-left: 20.8333px; margin-top: 78.3333px;"><img src="/cpdoc/wp-content/uploads/2016/12/NFFFFFF-0.png" style="width: 6.66667px; height: 6.66667px;"></a></div>


//https://i.ytimg.com/vi/xwZCsfZsA4Y/maxresdefault.jpg