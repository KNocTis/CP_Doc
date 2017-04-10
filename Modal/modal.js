jQuery(document).ready(function($) {
  // Close modal 
  $('.close-modal').click(function() {
      
//    $('.modal-test').toggleClass('show');
      
      if ($('.modal-test')[0].className.includes('show')) {
          $('.modal-test')[0].className = "modal-test";
          $('.close-modal')[0].style.display = "none";

          $("#modal-content").html("");
      }
      console.log($('.modal-test')[0].className);
  });
   


  // Detect windows width function
  var $window = $(window);

  function checkWidth() {
    var windowsize = $window.width();
    if (windowsize > 767) {
      // if the window is greater than 767px wide then do below. we don't want the modal to show on mobile devices and instead the link will be followed.

      $(".modal-link").click(function(e) {
        e.preventDefault(); // prevent link from being followed
        var post_link = $(this).attr("href"); // this can be used in WordPress and it will pull the content of the page in the href
        //var post_link = $('.show-in-modal').html(); // get content to show in modal
        $('.modal-test').addClass('show', 1000, "easeOutSine"); // show class to display the previously hidden modal
        $("#modal-content").html("loading..."); // display loading animation or in this case static content
        $('.close-modal')[0].style.display = "block";
          
        //get location data
        var postXHR = $.ajax(post_link)
            .done(function(data){
                console.log("location.json loaded")
            })
            .fail(function(){
                console.log("location.json failed to load")
            })
            .always(function(data){
                console.log("location.json loaded successfully")
            });
        postXHR.always(function(data){
            var htmlStr = $(data).find('.entry-content').html();
            var aPostDiv = document.createElement('div');
            $(aPostDiv).append(htmlStr);
            $(aPostDiv).css("overflow", "scroll")
            $(aPostDiv).css("height", "100%")
            
//            console.log(htmlStr);
            $("#modal-content").html("");
            
//            var aiframe = $("<iframe />");
//            aiframe.attr({srcdoc: htmlStr});
//            aiframe.addClass("anotherPostContent");
//            $("#modal-content").append(aPostDiv);
           
//            var aiframe = $("<div/>", {
//               class: "container anotherPostContent"
//            }).html(htmlStr);
//            aiframe.attr({srcdoc: htmlStr});
//            aiframe.addClass("anotherPostContent");
            $("#modal-content").append(aPostDiv);
           
          //Copy function
            $('.crayon-copy-button').click(function(){
               $('.crayon-plain-wrap').find('textarea').select();
               document.execCommand("copy");
            })
            
            //Remove number column and other icons
            jQuery('.crayon-nums').remove();
            jQuery('.crayon-plain-button').remove();
            jQuery('.crayon-wrap-button').remove();
            jQuery('.crayon-expand-button').remove();
            jQuery('.crayon-popup-button').remove();
        })          
          
//        var postContent = $("#modal-content").load(post_link,function(e){
////            console.log($(e).find('article').html());
////            aiframe.srcdoc = $(e).find('article').html();
//            var htmlStr = $(e).find('article').html();
//             $("#modal-content").appen($("<iframe />").attr({srcdoc: htmlStr}));
//        });
        
        // for dynamic content, change this to use the load() function instead of html()
//        $("html, body").animate({ // if you're below the fold this will animate and scroll to the modal
//          scrollTop: 0
//        }, "slow");
        return false;
      });
    }
  };

  checkWidth(); // excute function to check width on load
  $(window).resize(checkWidth); // execute function to check width on resize
});