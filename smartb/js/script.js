$(document).ready(function() {
$('.portfolio__carousel').owlCarousel({
	itemsCustom: [ [0, 1], [500, 1],[660,1], [767, 2],[992,2],[1180,3]],
  	autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:true,
	pagination: false,
	navigation:true,
	slideSpeed:500,
	stagePadding: 50,
	autoHeight:true
	}); 

$('.video__carousel').owlCarousel({
	itemsCustom: [ [0, 1], [500, 1],[660,1], [767, 1],[992,1],[1180,1]],
  	autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:true,
	pagination: false,
	navigation:true,
	slideSpeed:500,
	stagePadding: 50,
	autoHeight:true
	});

$('.logo-carousel').owlCarousel({
	itemsCustom: [ [0, 1], [500, 1],[660,1], [767, 2],[1024,4]],
  	autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:true,
	pagination: false,
	navigation:true,
	slideSpeed:500,
	stagePadding: 50,
	autoWidth: true
	});

$('.reviews-slider').owlCarousel({
	itemsCustom: [ [0, 1], [500, 1],[660,1], [767, 2],[1024,3]],
  	autoplay:true,
    autoplayTimeout:1000,
    autoplayHoverPause:true,
	pagination: false,
	navigation:true,
	slideSpeed:500,
	stagePadding: 50,
	autoWidth: true
	});

$(".diagram1").circliful({
                animationStep: 5,
                foregroundBorderWidth: 10,
                foregroundColor: "#ef2452",
                backgroundBorderWidth: 5,
                backgroundColor: "#fff",
                percent: 60
           });

$(".diagram2").circliful({
                animationStep: 5,
                foregroundBorderWidth: 10,
                foregroundColor: "#ca294f",
                backgroundBorderWidth: 5,
                backgroundColor: "#fff",
                percent: 65
           });

$(".diagram3").circliful({
                animationStep: 5,
                foregroundBorderWidth: 10,
                foregroundColor: "#94304c",
                backgroundBorderWidth: 5,
                backgroundColor: "#fff",
                percent: 70
           });

$(".diagram4").circliful({
                animationStep: 5,
                foregroundBorderWidth: 10,
                foregroundColor: "#643648",
                backgroundBorderWidth: 5,
                backgroundColor: "#fff",
                percent: 75
           });

$(".diagram5").circliful({
                animationStep: 5,
                foregroundBorderWidth: 10,
                foregroundColor: "#493a47",
                backgroundBorderWidth: 5,
                backgroundColor: "#fff",
                percent: 82
           });
if($(document).width() > 767) {
    $("#home-carousel").featureCarousel({
        autoPlay: 0,
        trackerIndividual: false,
        trackerSummation: false
    });
};

});	