//=require jquery.min.js

//=require bootstrap.min.js
//=require slick.min.js 
//=require isotope.pkgd.min.js

;(function($){

	$(document).ready(function(){
		
	});

})(jQuery);

$(document).ready(function(){
		  $('.header-slider-item').slick({
  	infinite: true,
  	slidesToShow: 1,
	slidesToScroll: 1,
	speed: 300,
	arrows: true,
	dots: true
		
  });
	


});
	

$(window).on('load', function(){
  var $isotope = $('.work-portfolio__img').isotope({
  // set itemSelector so .grid-sizer is not used in layout
  itemSelector: '.work-portfolio__img__item',
  percentPosition: true,
  masonry: {
    // use element for option
    columnWidth: '.masonry-sizer'
  }
});

$('.work-portfolio__selectors-btn a').on('click', function(event){
	event.preventDefault();

	$('.work-portfolio__selectors-btn').removeClass('selector-btn--active');
	$(this).parent().addClass('selector-btn--active');

	var filterValue = $(this).data('filter');
	$isotope.isotope({ filter: filterValue });
});

});

$(window).on('load', function(){
 var map = new google.maps.Map(document.getElementById('map'), {
 	center: {lat: 26.0112014, lng: -80.14949009999998},
 	zoom: 13

 });
 var marker = new google.maps.Marker({
 	map: map,
 	position: {lat: 26.0112014, lng: -80.14949009999998}
 });
 
});