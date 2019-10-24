$(document).ready(function(){
		  	$('.work-examples').slick({
		  		centerMode: true,
				centerPadding: '60px',
				slidesToShow: 1,
				dots: true,
				variableWidth: true,
				autoplay: true,
  				autoplaySpeed: 3000,
  				pauseOnHover: false,
  				pauseOnDotsHover: false,
		  	});
		  	$('.kostina').slick({
		  		dots: true,
				infinite: true,
				speed: 500,
				fade: true,
				cssEase: 'linear',
				autoplay: true,
  				autoplaySpeed: 3000,
  				pauseOnFocus: false,
  				pauseOnDotsHover: false,
		  	});
		});
