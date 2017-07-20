"use strict";

(function() {
	
	var Carousel = {
		props:{
			current_slide:null,
			total_slides:null
		},
		init:function(){

			Carousel.bindEvents();
			Carousel.current_slide = 1;
			Carousel.total_slides = 3;

		},
		bindEvents:function(){
			$(".carousel-next").on("click",function(){
				Carousel.next();
			});
			$(".carousel-prev").on("click",function(){
				Carousel.previous();
			});

			$("body").keydown(function(event){
				if(event.which == 39){   // call next slide on right arrow
					Carousel.next();
				} else if (event.which == 37){  // call previous slide on left arrow
					Carousel.previous();
				}

			});
		},
		next:function(){

			if(Carousel.current_slide !== Carousel.total_slides){  // check if the current slide NOT last one

				var nextSlide = setInterval(changeMargin, 5);  // every 5 miliseconds change margin of slide until the next
																// slide change current slide
				var margin = 0;

				function changeMargin() {

					if(margin >= 2){
						clearInterval(nextSlide);
						Carousel.current_slide++;
					} else {
						margin += 0.01;
						document.getElementById(''+Carousel.current_slide+'').style.marginLeft = "-" + margin +"%";

					}

				}

			} else {  									// If this is the last slide

				var changeToFirstSlide = setInterval(firstSlide, 1);  // Change margin of previous 2 slides in order

				var currentSlideMargin = -2;
				Carousel.current_slide--;

				function firstSlide() {

					if(Carousel.current_slide != 0){
						currentSlideMargin += 0.01;
						document.getElementById(''+Carousel.current_slide+'').style.marginLeft = "" + currentSlideMargin +"%";
						if(currentSlideMargin >= 0){      // If second slide is fully viewable
							currentSlideMargin = -2;		// Then start changing margin of first slide
							Carousel.current_slide--;
						}
					} else {
						clearInterval(changeToFirstSlide);
						Carousel.current_slide = 1;       // When the first slide on the screen -> stop animation
					}

				}
			}

		},
		previous:function(){
			if(Carousel.current_slide !== 1){      // Check if the Current slide NOT the first one

				Carousel.current_slide--;
				var prevSlide = setInterval(prevSlideChange, 5);  // If this is not the first slide
																	// So previous slide already has some margin.
				var margin = -2;									// Changing the margin of previous slide back

				function prevSlideChange() {

					if(margin >= 0){
						clearInterval(prevSlide);

					} else {
						margin += 0.01;
						document.getElementById(''+Carousel.current_slide+'').style.marginLeft = "" + margin +"%";

					}

				}

			} else {      									// If the current slide is first one

				var changeToLastSlide = setInterval(lastSlide, 1);

				var currentSlideMargin = 0;


				function lastSlide() {

					if(Carousel.current_slide < Carousel.total_slides){
						currentSlideMargin += 0.01;
						document.getElementById(''+Carousel.current_slide+'').style.marginLeft = "-" + currentSlideMargin +"%";
						if(currentSlideMargin >= 2){
							currentSlideMargin = 0;
							Carousel.current_slide++;
						}
					} else {
						clearInterval(changeToLastSlide);
						Carousel.current_slide = Carousel.total_slides;
					}

				}
			}
		},
		update:function(){
			//ADD UPDATE CODE HERE
		}
	};
	$(function(){
		Carousel.init();
	})

})(window);