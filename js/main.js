// js/main.js
(function ($) {
  'use strict';

  /* ===== Device helpers ===== */
  var isMobile = {
    Android: function () { return navigator.userAgent.match(/Android/i); },
    BlackBerry: function () { return navigator.userAgent.match(/BlackBerry/i); },
    iOS: function () { return navigator.userAgent.match(/iPhone|iPad|iPod/i); },
    Opera: function () { return navigator.userAgent.match(/Opera Mini/i); },
    Windows: function () { return navigator.userAgent.match(/IEMobile/i); },
    any: function () {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };

  /* ===== Full height sections ===== */
  function fullHeight () {
    if (!isMobile.any()) {
      $('.js-fullheight').css('height', $(window).height());
      $(window).on('resize', function () {
        $('.js-fullheight').css('height', $(window).height());
      });
    }
  }

  /* ===== Counters ===== */
  function counter () {
    $('.js-counter').countTo({
      formatter: function (value, options) {
        return value.toFixed(options.decimals);
      }
    });
  }

  function counterWayPoint () {
    if (!$('#colorlib-counter').length) return;
    $('#colorlib-counter').waypoint(function (direction) {
      if (direction === 'down' && !$(this.element).hasClass('animated')) {
        setTimeout(counter, 400);
        $(this.element).addClass('animated');
      }
    }, { offset: '90%' });
  }

  /* ===== Animations on scroll ===== */
  function contentWayPoint () {
    $('.animate-box').waypoint(function (direction) {
      if (direction === 'down' && !$(this.element).hasClass('animated')) {
        $(this.element).addClass('item-animate');
        setTimeout(function () {
          $('body .animate-box.item-animate').each(function (k) {
            var el = $(this);
            setTimeout(function () {
              var effect = el.data('animate-effect');
              if (effect === 'fadeIn') el.addClass('fadeIn animated');
              else if (effect === 'fadeInLeft') el.addClass('fadeInLeft animated');
              else if (effect === 'fadeInRight') el.addClass('fadeInRight animated');
              else el.addClass('fadeInUp animated');
              el.removeClass('item-animate');
            }, k * 200, 'easeInOutExpo');
          });
        }, 100);
      }
    }, { offset: '85%' });
  }

  /* ===== Burger / offcanvas ===== */
  function burgerMenu () {
    $('.js-colorlib-nav-toggle').on('click', function (e) {
      e.preventDefault();
      var $b = $(this);
      if ($('body').hasClass('offcanvas')) {
        $b.removeClass('active');
        $('body').removeClass('offcanvas');
      } else {
        $b.addClass('active');
        $('body').addClass('offcanvas');
      }
    });
  }

  function mobileMenuOutsideClick () {
    $(document).on('click', function (e) {
      var container = $('#colorlib-aside, .js-colorlib-nav-toggle');
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('offcanvas')) {
          $('body').removeClass('offcanvas');
          $('.js-colorlib-nav-toggle').removeClass('active');
        }
      }
    });
    $(window).on('scroll', function () {
      if ($('body').hasClass('offcanvas')) {
        $('body').removeClass('offcanvas');
        $('.js-colorlib-nav-toggle').removeClass('active');
      }
    });
  }

  /* ===== Smooth nav ===== */
  function clickMenu () {
    $('#navbar a:not([class="external"])').on('click', function (e) {
      e.preventDefault();
      var section = $(this).data('nav-section');
      var navbar = $('#navbar');

      if ($('[data-section="' + section + '"]').length) {
        $('html, body').animate({
          scrollTop: $('[data-section="' + section + '"]').offset().top - 55
        }, 500);
      }

      if (navbar.is(':visible')) {
        navbar.removeClass('in').attr('aria-expanded', 'false');
        $('.js-colorlib-nav-toggle').removeClass('active');
      }

      return false;
    });
  }

  function navActive (section) {
    var $el = $('#navbar > ul');
    $el.find('li').removeClass('active');
    $el.each(function () {
      $(this).find('a[data-nav-section="' + section + '"]').closest('li').addClass('active');
    });
  }

  function navigationSection () {
    var $section = $('section[data-section]');
    $section.waypoint(function (direction) {
      if (direction === 'down') navActive($(this.element).data('section'));
    }, { offset: '150px' });

    $section.waypoint(function (direction) {
      if (direction === 'up') navActive($(this.element).data('section'));
    }, {
      offset: function () { return -$(this.element).height() + 155; }
    });
  }

  /* ===== Hero slider ===== */
  function sliderMain () {
    $('#colorlib-hero .flexslider').flexslider({
      animation: 'fade',
      slideshowSpeed: 5000,
      directionNav: true,
      start: function () {
        setTimeout(function () {
          $('.slider-text').removeClass('animated fadeInUp');
          $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
        }, 500);
      },
      before: function () {
        setTimeout(function () {
          $('.slider-text').removeClass('animated fadeInUp');
          $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
        }, 500);
      }
    });
  }

  /* ===== Sticky ===== */
  function stickyFunction () {
    var h = $('.image-content').outerHeight();
    if ($(window).width() <= 992) {
      $('#sticky_item').trigger('sticky_kit:detach');
    } else {
      $('.sticky-parent').removeClass('stick-detach');
      $('#sticky_item').trigger('sticky_kit:detach');
      $('#sticky_item').trigger('sticky_kit:unstick');
    }

    $(window).on('resize', function () {
      var hh = $('.image-content').outerHeight();
      $('.sticky-parent').css('height', hh);

      if ($(window).width() <= 992) {
        $('#sticky_item').trigger('sticky_kit:detach');
      } else {
        $('.sticky-parent').removeClass('stick-detach');
        $('#sticky_item').trigger('sticky_kit:detach');
        $('#sticky_item').trigger('sticky_kit:unstick');
        $('#sticky_item').stick_in_parent();
      }
    });

    $('.sticky-parent').css('height', h);
    $('#sticky_item').stick_in_parent();
  }

  /* ===== Owl ===== */
  function owlCrouselFeatureSlide () {
    $('.owl-carousel').owlCarousel({
      animateOut: 'fadeOut',
      animateIn: 'fadeIn',
      autoplay: true,
      loop: true,
      margin: 0,
      nav: true,
      dots: false,
      autoHeight: true,
      items: 1,
      navText: [
        "<i class='icon-arrow-left3 owl-direction'></i>",
        "<i class='icon-arrow-right3 owl-direction'></i>"
      ]
    });
  }

  /* ===== i18n helpers (expects global `i18n` object) ===== */
  function getTextByKey (key, locale) {
    var parts = key.split('.');
    var dict = (window.i18n && window.i18n[locale]) || (window.i18n && window.i18n.en) || {};
    for (var i = 0; i < parts.length; i++) dict = (dict || {})[parts[i]];
    return (typeof dict === 'string') ? dict : null;
  }

  function applyTranslations (locale) {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var txt = getTextByKey(key, locale);
      if (!txt) return;
      var tag = el.tagName.toLowerCase();
      if ((tag === 'input' || tag === 'textarea') && el.hasAttribute('placeholder')) {
        el.placeholder = txt;
      } else {
        el.textContent = txt;
      }
    });
    document.documentElement.setAttribute('lang', locale);
  }

  /* ===== Theme (dark / light) ===== */

  
(function initTheme() {
	var KEY = 'theme';
	var toggle = document.getElementById('theme-toggle');

  // Decide initial theme: saved → OS preference → light
	var saved = localStorage.getItem(KEY);
	var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
	var initial = saved || (prefersDark ? 'dark' : 'light');

	document.documentElement.setAttribute('data-theme', initial);
	if (toggle) toggle.checked = (initial === 'dark');

	// User toggles
	if (toggle) {
		toggle.addEventListener('change', function () {
		var next = toggle.checked ? 'dark' : 'light';
		document.documentElement.setAttribute('data-theme', next);
		localStorage.setItem(KEY, next);
		});
	}

	// Follow OS only if user hasn't saved a choice yet
	if (!saved && window.matchMedia) {
		var mq = window.matchMedia('(prefers-color-scheme: dark)');
		// modern browsers
		if (mq.addEventListener) {
		mq.addEventListener('change', function (e) {
			var next = e.matches ? 'dark' : 'light';
			document.documentElement.setAttribute('data-theme', next);
			if (toggle) toggle.checked = (next === 'dark');
		});
		} else if (mq.addListener) {
		// older Safari
		mq.addListener(function (e) {
			var next = e.matches ? 'dark' : 'light';
			document.documentElement.setAttribute('data-theme', next);
			if (toggle) toggle.checked = (next === 'dark');
		});
		}
	}
})();


  /* ===== Boot ===== */
  $(function () {
    // UI behaviours
    fullHeight();
    counter();
    counterWayPoint();
    contentWayPoint();
    burgerMenu();
    clickMenu();
    navigationSection();
    mobileMenuOutsideClick();
    sliderMain();
    stickyFunction();
    owlCrouselFeatureSlide();

    // i18n boot
    var langSelect = document.getElementById('lang-switch');
    var savedLang = localStorage.getItem('lang') || 'en';
    applyTranslations(savedLang);
    if (langSelect) {
      langSelect.value = savedLang;
      langSelect.addEventListener('change', function (e) {
        var locale = e.target.value || 'en';
        localStorage.setItem('lang', locale);
        applyTranslations(locale);
      });
    }

    // theme boot
    initTheme();
  });

})(jQuery);
