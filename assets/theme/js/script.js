	$(document).ready(function(){
      $('body').append('<div id="scrollToTop" class="');
    	$(window).scroll(function () {
			if ($(this).scrollTop() != 0) {
				$('#scrollToTop').fadeIn();
			} else {
				$('#scrollToTop').fadeOut();
			}
		}); 
    $('#scrollToTop').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });
});
