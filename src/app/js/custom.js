/*
	Project Name : Mountain Biking
	Author Company : Ewebcraft
	Project Date: 16 June, 2015
	Author Website : http://www.ewebcraft.com
	Author Email : ewebcraft@gmail.com
*/

$(window).load(function(){
            $('#loader').fadeOut("slow");
});

$.fn.smartBackgroundImage = function(url){
	var t = this;
	//create an img so the browser will download the image:
	$('<img />')
		.attr('src', url)
		.load(function(){ //attach onload to set background-image
            t.each(function(){
				$(this)
					.css('backgroundImage', "url('"+url+"')" )
					.addClass( "fadein" );
			});
		});
	return this;
};


jQuery(document).ready(function($){

	/* Main Slider */

	var slider = new MasterSlider();
    slider.setup('mainSlider' , {
		width:1170,
		height:675,
		autoplay:true,
		view:'basic',
		autofill:true,
		space:1,
		loop:true
	});
	slider.control('arrows');
	slider.control('timebar' , {color:"#00b0c3"});
	var wrapper = $('#slider-wrapper');
	wrapper.height(window.innerHeight);
	$(window).resize(function(event) {
		wrapper.height(window.innerHeight);
	});

	// pretty photo function call
	$("a[data-gal^='prettyPhoto']").prettyPhoto({hook: 'data-gal'});
	$(".nav a").click(function () {
		$(".in").removeClass("in");
	});

	 $('#fullpage').fullpage({
                 anchors:['home','about','trails','sponsers','blogs'],
                 menu:"#menu",
                 sectionsColor: ['#f2f2f2', '#fff', '#24272e', 'whitesmoke', '#000'],
                 //autoScrolling:false,
                 scrollBar:true,
                 afterLoad: function(anchorLink, index){
                   var loadedSection = $(this);
                   //FIRE SCRIPT
                   $(this).smartBackgroundImage($(this).data('src'));
                 },
                 afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){
                   var loadedSlide = $(this);
                   //FIRE SCRIPT
					 $(this).smartBackgroundImage($(this).data('src'));
                 },
                 afterRender: function(){
                   var pluginContainer = $(this);
                   // Lazy load background images
                   $(".section .slide:first-child").each(function() {
                     $(this).smartBackgroundImage($(this).data('src'));
                   });
                 }
               });
});


(function($) {
	new WOW().init();
})(jQuery);
