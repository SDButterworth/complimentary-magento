/*
	Craghoppers UK site specific JS snippets
 */

// Check for touch device - not entirely reliable. Using in combination with screen size checks in css

function is_touch_device() {
 return (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
}

if (is_touch_device() == true) {
	document.getElementsByTagName( 'html' )[0].classList.add('isTouch');
}

var $j = jQuery.noConflict();

$j(document).ready(function($) {


	// Flexslider init
	if ($j('.flexslider').length) {
		setTimeout(function(){
          $j('.flexslider').flexslider();
        }, 500);
	}


	// Product Page Zoom and Scroller

  if ($j('body').hasClass('catalog-product-view')) {

    var magicCounter = 0;

    if (is_touch_device() == true) {
      var clickOrTouch = "touchstart";
    } else {
      var clickOrTouch = "click";
    }

    //Product Page Type Flag
    var productBreadcrumb = $j('.breadcrumbs .product strong').text();

    if(/trousers|Trousers|dress|Dress/.test(productBreadcrumb)) {
      $('.MagicToolboxSelectorsContainer').addClass('shift-left');
    }

    var magicReady = setInterval(function(){

      if ($j('.mcs-button-arrow-next').length) {

        var getZoomId = $('.mz-thumb-selected').attr('data-zoom-id');
        var getScrollId = $('.mz-thumb-selected').closest('.MagicScroll').attr('id');

        $j('.mcs-button-arrow-next').bind(clickOrTouch, function(){
          MagicZoom.next(getZoomId);
        });

        $j('.mcs-button-arrow-prev').bind(clickOrTouch, function(){
          MagicZoom.prev(getZoomId);
        });

        $j('.mz-thumb').bind(clickOrTouch, function(){
          MagicScroll.forward(getScrollId, 1)
        });

        clearInterval(magicReady);
      } else {
        $j('.MagicZoom').css('opacity', '1');
      }

      $j( window ).resize(function() {
        var zoomImgHeight = $j('.MagicZoom').height();
        $j('.MagicScroll').css('height', zoomImgHeight);
      }).resize();

      //failsafe to stop setInterval after 30 seconds
      magicCounter++;

      if (magicCounter >= 60) {
        clearInterval(magicReady);
        console.log('FAIL and interval cleared');
      }

    }, 500);

  }

	//Product Page Video Flag
	if ($j('.product-collateral .video').length < 1) {
		$j('.product-collateral .technologies-wrapper').addClass('technologies-wrapper--fullWidth');
	}

  //Product Page Social Share
  var pathname = document.URL;
  var summary = document.title;
  var facebook = "http://www.facebook.com/sharer/sharer.php?u=" + pathname;
  var google = "https://plus.google.com/share?url=" + pathname;
  var twitter = "https://twitter.com/intent/tweet?text=" + summary + "&url=" + pathname;
  $j("#twittershare").attr("href", twitter);
  $j("#fbshare").attr("href", facebook);
  $j("#googleshare").attr("href", google);

  

  //Micro Site  - rearrange blocks

  $j( window ).resize(function() {

    if ($(window).width() < 769) {
      $j('.micro-sideBar').prependTo($j('.pageSection--social'));
    } else {
       $j('.micro-sideBar').prependTo($j('.micro-sectionContainer'));
    }
  }).resize();


  //Micro Site - Scroll Arrow

  if ($('.micro-hero__arrow').length) {

    $('.micro-hero__arrow').delay(1200).animate({
      bottom: '56px'
    }, 300, function(){
      $('.micro-hero__arrow').animate({
        bottom: '48px'
      }, 120, function(){
        $('.micro-hero__arrow').stop(true, true);
      });
      
    });

    var scrollBottomStart = $(window).scrollTop() + $(window).height();

    $(window).on('scroll', function(){

        var scrollBottom = $(window).scrollTop() + $(window).height(), //get y value of bottom of window
            nextSectionPos = $j('.micro-nextSection').offset().top; // get y value of top of next page section

        if ((scrollBottom > nextSectionPos + 48) || (scrollBottom > scrollBottomStart + 300)) {
          $('.micro-hero__arrow').css('display', 'none');
          $(window).off('scroll'); // stops the scroll event from constantly firing
        }

    });
  }
  

  $j('.micro-video__playButton').click(function(){
    var videoContainer = $j('.micro-video');

    $j('.micro-hero--what').css('background', '#ccc');
    $j('.micro-hero--what .micro-hero__logo, .micro-hero--what .micro-hero__title, .micro-hero--what .micro-hero__subtext, .micro-hero--what .micro-hero__quoteContainer').css('display', 'none');
    $j('.micro-hero--what').append(videoContainer);
    videoContainer.css({
      'position': 'absolute',
      'top': '10%',
      'left': 0,
      'display': 'block',
      'width': '100%'}
      );

    if ($(window).width() < 769) {
      $j('.micro-hero--what').css('height', 'auto');
    }

  });


  //Close Mega Menu when search is opened
  $j('.skip-search').click(function () {
    if ($j('.ms-topmenu').css('opacity') == '0') {
        $j('.ms-topmenu').css({
            'opacity': '1',
            'height' : 'auto',
            'z-index' : '99'
        });
    } else {
        $j('.ms-topmenu').css({
            'opacity': '0',
            'height' : '0px',
            'z-index' : '-99'
        });
    }
  });

  /* Customer service page mobile drop down */
  $j(".customerservice__mobile").click(function(){
        $j(".customerservice__links").toggle();
        $j(".customerservice__mobile").toggleClass("active");
  });

  /* mobile filter fix */

  $j("#narrow-by-list dt").click(function(){

    $j(".odd.current ol").toggle();
    $j(".even.current ol").toggle();

  });

  /* mobile filter fix END */

  /* Turned subtotal green when discount code is accepted */
  if($j('.success-msg').is(':visible')){
    $j("#shopping-cart-totals-table tfoot").css({"background-color": "#eff5ea", "border-left": "2px solid #11b400"});
  }
  /* END */

  //Nasty hack to make AJAX cart work

  try {

    if ($j(AmAjaxObj).length) {

      $j('.btn-cart').on('click', function(){

        $j(this).removeAttr('onclick');
        
      });
    }
  }
  catch (err) {
    console.log('AJAX basket failed to load');
    ga('send', 'event', 'AJAX Cart Fail', 'load', err);
  }


  // Homepage Slider - Swap Text for CTA's - Uncomment when needed //

  // if ($j('.fullWidthSlider__slidesList--singleSlide').length && $j('html').hasClass('no-touch') && $j(window).width() > 1100) {
  //   console.log('single slider exists');

  //   $j('.fullWidthSlider__slidesList--singleSlide').hoverIntent(function(){

  //     $j('.fullWidthSlider__slidesList--singleSlide .bannerOverlay__title--slider, .fullWidthSlider__slidesList--singleSlide .bannerOverlay__subTitle--slider').fadeOut(300, function(){
  //       $j('.fullWidthSlider__slidesList--singleSlide .bannerOverlay__cta--slider').fadeIn(300).css('display', 'inline-block');
  //     });
      
  //   }, function(){
  //     $j('.fullWidthSlider__slidesList--singleSlide .bannerOverlay__cta--slider').fadeOut(300, function(){
  //       $j('.fullWidthSlider__slidesList--singleSlide .bannerOverlay__title--slider, .fullWidthSlider__slidesList--singleSlide .bannerOverlay__subTitle--slider').fadeIn(300);
  //     });
  //   });
  // }
  

  // Fit text tool-tip

  if ($j('body').hasClass('catalog-product-view')) {
    
    var fitTip = $j('<div class="fit-tip"><h2>Fit</h2><span id="fitTipClose">Close</span><p>All our garments are designed specifically for purpose. Our long standing <strong>"Classic Fit"</strong> is exactly what you would expect from everyday outdoor gear - slightly looser with a casual and relaxed feel.</p><p>For those who prefer to wander off track the <strong>"Adventure Fit"</strong> offers a slimmer fitting throughout for added comfort.</p><p>We then have <strong>"Active Fit"</strong>, this is essentially our Pro Stretch gear. Designed to contour the body with cutting in specific areas for a slim fitted feel.</p></div>');

    fitTip.appendTo('.product-clothing-fit');
    
    $j('.product-clothing-fit a').on('click', function(event){
      event.preventDefault();
      fitTip.css('display', 'block');
    });

    $j('#fitTipClose').on('click', function() {
      fitTip.css('display', 'none');
    });
  }


  // Lev Wood Sticky Nav
  
  if ($j('html').hasClass('no-touch') && $j('body').hasClass('cms-levisonwood')) {
      $j(window).on('scroll', function(){

        var fromTop = $j(window).scrollTop(),
          topOfNextBlock = $j('.lev-mainCopy').offset().top;


        if (fromTop > topOfNextBlock) { 
          $j('.lev-sideBar--horizontal').slideDown(300);
        } else {
          $j('.lev-sideBar--horizontal').slideUp(300);
        }
    });
  }

  if ($j('html').hasClass('touch') && $j('body').hasClass('cms-levisonwood')) {
    var lastHeaderBlockPos = $j('.top-container').offset().top,
      lastHeaderBlockHeight = $j('.top-container').height(),
      endOfHeader = lastHeaderBlockPos + lastHeaderBlockHeight;
      console.log(endOfHeader);
      $j('.lev-sideBar--horizontal').css({
        'position': 'relative',
        'float': 'left'
      });

      $j(window).on('scroll', function(){

        if ($j(window).scrollTop() > endOfHeader - 1) {
          $j('.lev-sideBar--horizontal').css({
            'position': 'fixed',
            'top': 0
          });
        } else {
          $j('.lev-sideBar--horizontal').css('position', 'relative');
        }
      });
  }

  $j('.lev-sideBar--horizontal__burger').on('click', function() {
    $j('.lev-sideBar__hiddenContainer').toggle('slow');
  });


  // Homepage Recs

  if ($j('body').hasClass('cms-index-index')) {
    var getLastTopCat = localStorage.getItem('lastTopCatVisit'),
        getLastSubCat = localStorage.getItem('lastSubCatVisit');

    if (getLastTopCat === 'Men' && getLastSubCat === 'Jackets') {
      $j('.pageSection__homepageRecs').addClass('pageSection__homepageRecs--Men-Jackets').removeClass('pageSection__homepageRecs');
    } else if (getLastTopCat === 'Women' && getLastSubCat === 'Jackets') {
      $j('.pageSection__homepageRecs').addClass('pageSection__homepageRecs--Women-Jackets').removeClass('pageSection__homepageRecs');
    }
  }


  //LeftHand Nav Hide/Show - uncomment if Montetate experiment wins and its needed permanently

  // if ($j('#narrow-by-list').length) {

  //   $j('#narrow-by-list ol').each(function(){
  //     var numberOfSolrItems = $j(this).children().length;

  //     if (numberOfSolrItems > 5) {
  //       $j(this).children('li:nth-child(n+6)').css('display', 'none');
  //       $j(this).append('<p class="lhn-show-more-less"><a class="lhn-show-more-link">Show more +</a><a class="lhn-show-less-link">Show less -</a></p>');

  //       $j('.lhn-show-more-link').on('click', function(){
  //         $j(this).closest('ol').children('li:nth-child(n+6)').fadeIn(400);
  //         $j(this).css('display', 'none');
  //         $j(this).next('.lhn-show-less-link').css('display', 'block');
  //       });

  //       $j('.lhn-show-less-link').on('click', function(){
  //         $j(this).closest('ol').children('li:nth-child(n+6)').fadeOut(400);
  //         $j(this).css('display', 'none');
  //         $j(this).prev('.lhn-show-more-link').css('display', 'block');
  //       });
  //     }
  //   });  
  // }

  $j('.productPageTechnologies, .amshopby-link script').remove();


  // fix to mobile solr filtering
  $j('.col-left .block-title').on('click', function(){
    $j('#narrow-by-list').toggleClass('display no-display');
  });

  $j('#narrow-by-list dt').on('click', function(){
    $j(this).next('dd').find('ol').css('display', 'block');
  });



  // Kit Guide
  

  //get started
  $j('.kitGuideButton--getStarted').on('click', function(){
    $j('.kitGuideForm').css('display', 'block');
    $j('.kitGuideForm__fieldset--focus').slideDown(500, function(){
      if ($j('#kitGuideWidgetSlideOut').length && $j(window).width() > 770) {
        $j('.kitGuideWidget').slideUp(500);
      }
    });
  });


  //focus selection actions
  $j('#focusActivity').on('click', function(){
    $j('.kitGuideForm__fieldset--travel, .kitGuideForm__fieldset--gender').slideUp(500);
    $j('.kitGuideForm__fieldset--activity').slideDown(500, function(){
      if ($j('#kitGuideWidgetSlideOut').length && $j(window).width() > 770) {
        $j('.kitGuideForm__fieldset--focus').slideUp(500);
      }
    });
    localStorage.setItem('kitGuideFocus', 'activity');
  });

  $j('#focusTravel').on('click', function(){
    $j('.kitGuideForm__fieldset--activity, .kitGuideForm__fieldset--gender').slideUp(500);
    $j('.kitGuideForm__fieldset--travel').slideDown(500, function(){
      if ($j('#kitGuideWidgetSlideOut').length && $j(window).width() > 770) {
        $j('.kitGuideForm__fieldset--focus').slideUp(500);
      }
    });
    localStorage.setItem('kitGuideFocus', 'travel');
  });


  //next step selections
  $j('.kitGuideButton--next').on('click', function(){

    var getAllActivityInputs = $j('input[name="activity"], input[name="travel"]');

    for (var i=0; i < getAllActivityInputs.length; i++) {

      if (getAllActivityInputs[i].checked) {
        
        $j('.kitGuideForm__fieldset--gender').slideDown(500, function(){
          if ($j('#kitGuideWidgetSlideOut').length && $j(window).width() > 770) {
            $j('.kitGuideForm__fieldset--travel, .kitGuideForm__fieldset--activity').slideUp(500);
          }
        });
        var nothingSelected = false;
        break;

      } else {
        var nothingSelected = true;
      }
    }
    
    if (nothingSelected === true) {
      $j($j('.kitGuideButton--next')).before('<p class="kitGuideErrorMessage">Please select an option from the list above.</p>')
      $j('.kitGuideErrorMessage').slideDown(400);
    }
    
  });

  $j('.kitGuideForm__fieldset--gender input').on('click', function(){
    $j('.kitGuideForm__helpText, .kitGuideButton--submit, .kitGuideForm__fieldset--gender .kitGuideButton--reset').fadeIn(500);
  });

  // reset travel or activity if both are used

  $j('.kitGuideForm__fieldset--travel input').on('click', function(){
    $j('input[name="activity"]').prop('checked', false);
    $j('.kitGuideErrorMessage').slideUp(400);
    $j('.kitGuideErrorMessage').remove();
  });
  
  $j('.kitGuideForm__fieldset--activity input').on('click', function(){
    $j('input[name="travel"]').prop('checked', false);
    $j('.kitGuideErrorMessage').slideUp(400);
    $j('.kitGuideErrorMessage').remove();
  });

  $j('.kitGuideButton--reset').on('click', function(){
    $j('.kitGuideForm__fieldset--gender, .kitGuideForm__fieldset--travel, .kitGuideForm__fieldset--activity').slideUp(500, function(){
      if ($j('#kitGuideWidgetSlideOut').length) {
        $j('.kitGuideWidget').slideDown(500);
      }
    });
    $j('.kitGuideForm__helpText, .kitGuideButton--submit, .kitGuideForm__fieldset--gender .kitGuideButton--reset').fadeOut(100);
    $j('.kitGuideErrorMessage').remove();
  });



  //hijack normal form functionality to create a URL from answers
  $j('#kitGuideForm').submit(function(event){

    //get form values and add to array
    var kitGuideAnswers = $j(this).serializeArray();

    //get individual objects
    var kitAnswerGender = $j.grep(kitGuideAnswers, function(element, index) {
      return element.name == 'gender';
    });

    var kitAnswerTravel = $j.grep(kitGuideAnswers, function(element, index) {
      return element.name == 'travel';
    });

    var kitAnswerActivity = $j.grep(kitGuideAnswers, function(element, index) {
      return element.name == 'activity';
    });

    //get values & build URL
    var kitUrlGender = kitAnswerGender[0].value;
    localStorage.setItem('kitGuideGender', kitUrlGender);

    if (kitAnswerTravel.length) {
      var kitUrlTravel = '-' + kitAnswerTravel[0].value;
      var kitUrlFinal = 'http://www.craghoppers.com/' + kitUrlGender + kitUrlTravel;
      localStorage.setItem('kitGuideClimate', kitAnswerTravel[0].value);
    } else if (kitAnswerActivity.length) {
      var kitUrlActivity = '-' + kitAnswerActivity[0].value;
      var kitUrlFinal = 'http://www.craghoppers.com/' + kitUrlGender + kitUrlActivity;
      localStorage.setItem('kitGuideActivity', kitAnswerActivity[0].value);
    } else {
      var kitUrlFinal = 'http://www.craghoppers.com/' + kitUrlGender;
    }

    $j('#kitGuideForm button').attr('formaction', kitUrlFinal);

  });

});