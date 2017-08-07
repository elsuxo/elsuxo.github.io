(function($) {
	"use strict";
/*
|----------------------------------------------------------------------------
| PRELOADER
|----------------------------------------------------------------------------
*/
// makes sure the whole site is loaded
$(window).on('load', function() {
   // will first fade out the loading animation
   $(".spinner").fadeOut();
   //then background color will fade out slowly
   $(".pre-loader").delay(200).fadeOut("slow");
});
/*
|----------------------------------------------------------------------------
| Skill Progress Bar
|----------------------------------------------------------------------------
*/
	$( '.progress-bar' ).each(function() {  
		var  barWidth = $(this).data('progress-value'); 
		$(this).append('<span class="progress-percent">'+ barWidth + '</span>'); 
	});
	$(window).on("load resize",function(e){
		$( '.progress-bar' ).each(function() {  
			var windowWidht = $(window).width(); 
			var  barWidth = $(this).data('progress-value'); 
			if (windowWidht>600) { 
				$(this).css({ 'height': barWidth, 'width':'100%'}); 
			} else { 
				$(this).css({ 'height': '100%','width':barWidth}); 
			}
		});
	});

/*
|----------------------------------------------------------------------------
| Main Menu
|----------------------------------------------------------------------------
*/
	$(window).on("load resize",function(e){
		var windowWidht = $(window).width();
		if (windowWidht>960) {
			$( '.has-sub-menu' ).each(function() {  
				$(this).hover( 
					function(){ $(this).children("ul.sub-menu").slideDown(); },
					function(){ $(this).children("ul.sub-menu").slideUp(); }
					);
			});
		} 
	});
	 
/*
|----------------------------------------------------------------------------
| Home Page top Seciotn
|----------------------------------------------------------------------------
*/
	$(window).on("load resize",function(e){
		var windowWidht = $(window).width();
		var windowHeight = $(window).height();
		if (windowWidht>960) { 
			$( '.top-section .image-container, .top-section .overlay' ).each(function() {  
				$(this).css({'height' : windowHeight-100}) ;
				$('.top-slider-container.v2 .overlay').css({'height' : windowHeight}) ;
			});
			var topPadding = (windowHeight-420)/2;
			if(topPadding>100) {
				$('.top-section .image-container, .top-section .overlay').css({'padding-top':topPadding});
				$('.top-slider-container.v2 .overlay').css({'padding-top':topPadding + 80});
			} 
		} else {
			$( '.top-section .image-container, .top-section .overlay' ).each(function() {  
				$(this).css({'height' : 'auto'})
			});
		}  
	});

/* 
|----------------------------------------------------------------------------
| Boxer
|----------------------------------------------------------------------------
*/
	$(".boxer").boxer(); 

/*
|----------------------------------------------------------------------------
| fitvids Video fit
|----------------------------------------------------------------------------
*/
  	$(".video-container").fitVids(); 

/*
|----------------------------------------------------------------------------
| Count Down Timer
|----------------------------------------------------------------------------
*/
  	$('.time-count-down' ).each(function() {  
  		var  tcountDay = $(this).data('tcount-day');
  		var  tcountMonth = $(this).data('tcount-month');
  		var  tcountYear = $(this).data('tcount-year');
  		var  tcountHour = $(this).data('tcount-hour');
  		var  tcountMin = $(this).data('tcount-min');
  		var  tcountSec = $(this).data('tcount-sec');  

  		$(this).countDown({
  			targetDate: {
  				'day': tcountDay,
  				'month': tcountMonth,
  				'year': tcountYear,
  				'hour': tcountHour,
  				'min': tcountMin,
  				'sec': tcountSec
  			},
  			omitWeeks: true 
  		}); 
  	});



/*
|----------------------------------------------------------------------------
| Scroll to Top
|----------------------------------------------------------------------------
*/

  	$('#go-top-top').click(function(){
  		$("html,body").animate({ scrollTop: 0 }, 1000);
  		return false;
  	});
  	$(window).on('scroll', function (){  
    	if ($(this).scrollTop() > 700){ $('#go-top-top').fadeIn('slow'); } 
    	else { $('#go-top-top').fadeOut('slow'); }
  	});

/*
|----------------------------------------------------------------------------
| Isotop  Gallery
|----------------------------------------------------------------------------
*/
	jQuery(window).on("load resize",function(e){
		var $container = $('.isotope'),
		colWidth = function () {
			var w = $container.width(), 
			columnNum = 1,
			columnWidth = 0;
			//Select what will be your porjects columns according to container widht
			if (w > 1040)     { columnNum  = 4; }  
			else if (w > 850) { columnNum  = 3; }   
			else if (w > 480) { columnNum  = 2; }
			else if (w > 300) { columnNum  = 1; }
			columnWidth = Math.floor(w/columnNum);

			//Default item width and height
			$container.find('.item').each(function() {
				var $item = $(this), 
				width = columnWidth,
				height = columnWidth*.8+6;
				$item.css({ width: width, height: height });

				// Squire item width and height
				$container.find('.squire').each(function() {
					var $item = $(this), 
					width = columnWidth,
					height = columnWidth*1;
					$item.css({ width: width, height: height });
				}); 

				// 1.5x height item width and height
				$container.find('.height14x').each(function() {
					var $item = $(this), 
					width = columnWidth,
					height = columnWidth*1.4035-3;
					$item.css({ width: width, height: height });
				}); 
			});  
			return columnWidth;
		},
		isotope = function () {
			$container.isotope({
				resizable: true,
				itemSelector: '.item',
				masonry: {
					columnWidth: colWidth(),
					gutterWidth: 10
				}
			});
		};
		isotope(); 


		// bind filter button click
		$('.isotope-filters').on( 'click', 'button', function() {
			var filterValue = $( this ).attr('data-filter');
			$container.isotope({ filter: filterValue });
		});

		// change active class on buttons
		$('.isotope-filters').each( function( i, buttonGroup ) {
			var $buttonGroup = $( buttonGroup );
			$buttonGroup.on( 'click', 'button', function() {
				$buttonGroup.find('.active').removeClass('active');
				$( this ).addClass('active');
			});
		}); 

		//Item title top margin
		$('.galerry-item a>.item-title').each( function(){
			var marginTop = $(this).height();
			$(this).css({'margin-top':-(marginTop/2)});
		});

	});

/*
|----------------------------------------------------------------------------
| Owl Carousel
|----------------------------------------------------------------------------
*/ 
	//Team Member and Partners Logo Carousel
	$('.team-owl-carousel, .partners-logo').owlCarousel({
		loop:true,
		margin:15,
		nav:false,
		dots: false,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:2
			},
			900:{
				items:3
			},
			1100:{
				items:4
			}
		},
        autoplay:true,
        autoplayTimeout:1000,
        autoplayHoverPause:true
	});

	//Event Post Carousel
	$('.event-post-carosel').owlCarousel({
		loop:true,
		margin:30,
		nav:false,
		dots: true, 
		responsive:{
			0:{
				items:1
			},
			600:{
				items:2
			} ,
			1100:{
				items:2
			}
		}
	});


	/*
	 |----------------------------------------------------------------------------
	 | Anmeldeformular
	 |----------------------------------------------------------------------------
	 */

    $('.tshirt-size-btn').change(function() {

		if (!$('#tshirt-wanted').is(':checked')) {
			if (confirm("Möchten Sie das T-Shirt für 15 Euro kaufen?")) {
                $('#tshirt-wanted').attr('checked', true);
            }
		}
    });


})(jQuery);
