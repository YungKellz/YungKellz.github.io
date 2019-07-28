$(document).ready(function(){
		  	$('.work-examples').slick({
		  		infinite: true,
				slidesToShow: 3,
				slidesToScroll: 3,
				responsive: [
				    {
				      breakpoint: 992,
				      settings: {
				        slidesToShow: 2,
				        slidesToScroll: 2,
				        infinite: true,
				      }
				    },
				    {
				      breakpoint: 721,
				      settings: {
				        slidesToShow: 1,
				        slidesToScroll: 1
				      }
				    }
				  ]
		  	});
		});