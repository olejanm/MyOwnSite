//-------- -------- -------- --------
//-------- included js libs start
//-------- -------- -------- --------

//= vendors/slick.min.js
//= vendors/viewportchecker.js
//= vendors/lucid.js
//-------- -------- -------- --------
//-------- included js libs end
//-------- -------- -------- --------


//-------- -------- -------- --------
//-------- js custom start
//-------- -------- -------- --------

// page init
$(window).on('load', function() {
  $(this).impulse();
});

jQuery(function () {
  initMobileNav();
  initAnchors();
});


// function jsActive(arg) {
//   console.log(arg);
// };

//slick
jQuery(document).ready(function ($) {
  $('.slider').slick({
    dots: true,
    dotsClass: "custom-dots",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 2000,
    arrows: false,
    fade: true,
    cssEase: 'linear'
  });
});


//Parallax
jQuery(function () {
  jQuery('.bg-stretch').parallaxBlock({
    parallaxOffset: -50,
    fallbackClass: 'fallback-class'
  });
});

;
(function ($) {
  'use strict';
  
  var isTouchDevice = /MSIE 10.*Touch/.test(navigator.userAgent) || ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch;
  
  var ParallaxController = (function () {
    var $win = $(window);
    var items = [];
    var winProps = {
      width: 0,
      height: 0,
      scrollTop: 0
    };
    
    return {
      init: function () {
        $win.on('load resize orientationchange', this.resizeHandler.bind(this));
        $win.on('scroll', this.scrollHandler.bind(this));
        
        this.resizeHandler();
      },
      
      resizeHandler: function () {
        winProps.width = $win.width();
        winProps.height = $win.height();
        
        $.each(items, this.calculateSize.bind(this));
      },
      
      scrollHandler: function () {
        winProps.scrollTop = $win.scrollTop();
        
        $.each(items, this.calculateScroll.bind(this));
      },
      
      calculateSize: function (i) {
        var item = items[i];
        var bgWidth;
        var bgHeight;
        
        item.height = item.$el.outerHeight();
        item.width = item.$el.outerWidth();
        item.topOffset = item.$el.offset().top;
        item.bgHeight = winProps.height + item.options.parallaxOffset;
        item.itemRatio = winProps.width / (winProps.height + item.options.parallaxOffset);
        
        if (item.imageRatio <= item.itemRatio) {
          bgWidth = winProps.width;
          bgHeight = bgWidth / item.imageRatio;
          
          bgWidth += 'px ';
          bgHeight += 'px ';
        } else {
          bgWidth = 'auto ';
          bgHeight = winProps.height + item.options.parallaxOffset;
          
          bgHeight += 'px ';
        }
        
        item.$el.css({
          backgroundSize: bgWidth + bgHeight
        });
        
        this.calculateScroll(i);
      },
      
      calculateScroll: function (i) {
        var item = items[i];
        var curPos;
        var offsetPercentage = Math.max(0, Math.min((winProps.scrollTop + winProps.height - item.topOffset) / (winProps.height + item.height), 1)).toFixed(4);
        
        if (item.imageRatio <= item.itemRatio) {
          curPos = '50% ' + ((-parseFloat(offsetPercentage) * item.options.parallaxOffset) - (item.bgHeight - winProps.height) / 2) + 'px';
        } else {
          curPos = '50% ' + (-parseFloat(offsetPercentage) * item.options.parallaxOffset) + 'px';
        }
        
        item.$el.css({
          backgroundPosition: curPos
        });
      },
      
      add: function (el, options) {
        var $el = $(el);
        var $image = $('#img-parallax');
        var imageRatio = $image.attr('width') / $image.attr('height') || $image.width() / $image.height();
        
        $el.css({
          backgroundImage: 'url(' + $image.attr('src') + ')'
        });
        
        if (isTouchDevice) {
          $el.addClass(options.fallbackClass);
          return;
        }
        
        $image.remove();
        
        options.parallaxOffset = Math.abs(options.parallaxOffset);
        
        var newIndex = items.push({
          $el: $(el),
          options: options,
          imageRatio: imageRatio
        });
        
        this.calculateSize(newIndex - 1);
      }
    };
  }());
  
  ParallaxController.init();
  
  $.fn.parallaxBlock = function (options) {
    options = $.extend({
      parallaxOffset: 100,
      fallbackClass: 'fallback-class',
      image: 'img'
    }, options);
    
    return this.each(function () {
      if (this.added) {
        return;
      }
      
      this.added = true;
      ParallaxController.add(this, options);
    });
  };
}(jQuery));




//animate

jQuery(document).ready(function () {
  jQuery('.post').addClass("hidden-animate").viewportChecker({
    classToAdd: 'visible animated fadeInDown', // Class to add to the elements when they are visible
    offset: 100
  });
});

//menu



// mobile menu init
function initMobileNav() {
  jQuery('.wrap').mobileNav({
    menuActiveClass: 'active',
    menuOpener: '.opener'
  });
  
  jQuery('.wrap2').mobileNav({
    hideOnClick: true,
    menuActiveClass: 'active',
    menuOpener: '.opener',
    menuDrop: '.drop'
  });
  jQuery('.menu li').touchHover({ hoverClass: 'custom-hover' });
}

/*
* Simple Mobile Navigation
*/
;
(function ($) {
  function MobileNav(options) {
    this.options = $.extend({
      container: null,
      hideOnClickOutside: true,
      menuActiveClass: 'active',
      menuOpener: '.opener',
      menuDrop: '.drop',
      toggleEvent: 'click',
      outsideClickEvent: 'click touchstart pointerdown MSPointerDown'
    }, options);
    this.initStructure();
    this.attachEvents();
  }
  MobileNav.prototype = {
    initStructure: function () {
      this.page = $('html');
      this.container = $(this.options.container);
      this.opener = this.container.find(this.options.menuOpener);
      this.drop = this.container.find(this.options.menuDrop);
    },
    attachEvents: function () {
      var self = this;
      
      if (activateResizeHandler) {
        activateResizeHandler();
        activateResizeHandler = null;
      }
      
      this.outsideClickHandler = function (e) {
        if (self.isOpened()) {
          var target = $(e.target);
          if (!target.closest(self.opener).length && !target.closest(self.drop).length) {
            self.hide();
          }
        }
      };
      
      this.openerClickHandler = function (e) {
        e.preventDefault();
        self.toggle();
      };
      
      this.opener.on(this.options.toggleEvent, this.openerClickHandler);
    },
    isOpened: function () {
      return this.container.hasClass(this.options.menuActiveClass);
    },
    show: function () {
      this.container.addClass(this.options.menuActiveClass);
      if (this.options.hideOnClickOutside) {
        this.page.on(this.options.outsideClickEvent, this.outsideClickHandler);
      }
    },
    hide: function () {
      this.container.removeClass(this.options.menuActiveClass);
      if (this.options.hideOnClickOutside) {
        this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
      }
    },
    toggle: function () {
      if (this.isOpened()) {
        this.hide();
      } else {
        this.show();
      }
    },
    destroy: function () {
      this.container.removeClass(this.options.menuActiveClass);
      this.opener.off(this.options.toggleEvent, this.clickHandler);
      this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
    }
  };
  
  var activateResizeHandler = function () {
    var win = $(window),
    doc = $('html'),
    resizeClass = 'resize-active',
    flag, timer;
    var removeClassHandler = function () {
      flag = false;
      doc.removeClass(resizeClass);
    };
    var resizeHandler = function () {
      if (!flag) {
        flag = true;
        doc.addClass(resizeClass);
      }
      clearTimeout(timer);
      timer = setTimeout(removeClassHandler, 500);
    };
    win.on('resize orientationchange', resizeHandler);
  };
  
  $.fn.mobileNav = function (options) {
    return this.each(function () {
      var params = $.extend({}, options, {
        container: this
      }),
      instance = new MobileNav(params);
      $.data(this, 'MobileNav', instance);
    });
  };
}(jQuery));

/*
* Mobile hover plugin
*/
; (function ($) {
  
  // detect device type
  var isTouchDevice = ('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch,
  isWinPhoneDevice = /Windows Phone/.test(navigator.userAgent);
  
  // define events
  var eventOn = (isTouchDevice && 'touchstart') || (isWinPhoneDevice && navigator.pointerEnabled && 'pointerdown') || (isWinPhoneDevice && navigator.msPointerEnabled && 'MSPointerDown') || 'mouseenter',
  eventOff = (isTouchDevice && 'touchend') || (isWinPhoneDevice && navigator.pointerEnabled && 'pointerup') || (isWinPhoneDevice && navigator.msPointerEnabled && 'MSPointerUp') || 'mouseleave';
  
  // event handlers
  var toggleOn, toggleOff, preventHandler;
  if (isTouchDevice || isWinPhoneDevice) {
    // prevent click handler
    preventHandler = function (e) {
      e.preventDefault();
    };
    
    // touch device handlers
    toggleOn = function (e) {
      var options = e.data, element = $(this);
      
      var toggleOff = function (e) {
        var target = $(e.target);
        if (!target.is(element) && !target.closest(element).length) {
          element.removeClass(options.hoverClass);
          element.off('click', preventHandler);
          if (options.onLeave) options.onLeave(element);
          $(document).off(eventOn, toggleOff);
        }
      };
      
      if (!element.hasClass(options.hoverClass)) {
        element.addClass(options.hoverClass);
        element.one('click', preventHandler);
        $(document).on(eventOn, toggleOff);
        if (options.onHover) options.onHover(element);
      }
    };
  } else {
    // desktop browser handlers
    toggleOn = function (e) {
      var options = e.data, element = $(this);
      element.addClass(options.hoverClass);
      $(options.context).on(eventOff, options.selector, options, toggleOff);
      if (options.onHover) options.onHover(element);
    };
    toggleOff = function (e) {
      var options = e.data, element = $(this);
      element.removeClass(options.hoverClass);
      $(options.context).off(eventOff, options.selector, toggleOff);
      if (options.onLeave) options.onLeave(element);
    };
  }
  
  // jQuery plugin
  $.fn.touchHover = function (opt) {
    var options = $.extend({
      context: this.context,
      selector: this.selector,
      hoverClass: 'hover'
    }, opt);
    
    $(this.context).on(eventOn, this.selector, options, toggleOn);
    return this;
  };
}(jQuery));


$(window).resize(function () {
  if ($(window).width() < 960) {
    
    
    
    $(document).ready(function () {
      $(".menu-item").click(function () {
        $(".drop").hide();
        $('.wrap').removeClass('active')
        
      });
    });
    
    $(document).ready(function () {
      $(".opener").click(function () {
        $(".drop").show();
        
      });
    });
    
  }
});



jQuery(window).on("load", function() {
  var hash;
});

// initialize smooth anchor links
function initAnchors() {
  // simple case:
  new SmoothScroll({
    anchorLinks: "a.back-to-top"
  });
  // custom case:
  new SmoothScroll({
    anchorLinks: ".inner-links a",
    container: ".inner-container",
    activeClasses: "parent"
  });
  // hash case:
  var hashOption = new SmoothScroll({
    anchorLinks: ".anchor-nav a",
    // extraOffset: jQuery(".anchor-nav").outerHeight() || 0,
    activeClasses: "link"
  });
  
  var hash;
  
  //scrollto when click to link
  jQuery(hashOption.options.anchorLinks).on("click", function() {
    var url = jQuery(this).attr("href");
    hash = url.substring(url.indexOf("#"));
    jQuery("body").removeClass("nav-active");
  });
  
  //scrollto when click to other link with hash
  hash = window.location.hash.replace("#", "");
  
  if (hash != "") {
    hash = "#" + hash;
    // scrollToWithHash(hash);
    return scrollToWithHash(hash);
  }
  
  function scrollToWithHash(hash) {
    if (jQuery(hash).length) {
      jQuery("html, body").animate(
        {
          scrollTop: jQuery(hash).offset().top - hashOption.options.extraOffset
        },
        600
        );
        return false;
      }
    }
  }
  
  /*!
  * SmoothScroll module
  */
  (function($, exports) {
    // private variables
    var page,
    win = $(window),
    activeBlock,
    activeWheelHandler,
    wheelEvents =
    "onwheel" in document || document.documentMode >= 9
    ? "wheel"
    : "mousewheel DOMMouseScroll";
    
    // animation handlers
    function scrollTo(offset, options, callback) {
      // initialize variables
      var scrollBlock;
      if (document.body) {
        if (typeof options === "number") {
          options = {
            duration: options
          };
        } else {
          options = options || {};
        }
        page = page || $("html, body");
        scrollBlock = options.container || page;
      } else {
        return;
      }
      
      // treat single number as scrollTop
      if (typeof offset === "number") {
        offset = {
          top: offset
        };
      }
      
      // handle mousewheel/trackpad while animation is active
      if (activeBlock && activeWheelHandler) {
        activeBlock.off(wheelEvents, activeWheelHandler);
      }
      if (options.wheelBehavior && options.wheelBehavior !== "none") {
        activeWheelHandler = function(e) {
          if (options.wheelBehavior === "stop") {
            scrollBlock.off(wheelEvents, activeWheelHandler);
            scrollBlock.stop();
          } else if (options.wheelBehavior === "ignore") {
            e.preventDefault();
          }
        };
        activeBlock = scrollBlock.on(wheelEvents, activeWheelHandler);
      }
      
      // start scrolling animation
      scrollBlock.stop().animate(
        {
          scrollLeft: offset.left,
          scrollTop: offset.top
        },
        options.duration,
        function() {
          if (activeWheelHandler) {
            scrollBlock.off(wheelEvents, activeWheelHandler);
          }
          if ($.isFunction(callback)) {
            callback();
          }
        }
        );
      }
      
      // smooth scroll contstructor
      function SmoothScroll(options) {
        this.options = $.extend(
          {
            anchorLinks: 'a[href^="#"]', // selector or jQuery object
            container: null, // specify container for scrolling (default - whole page)
            extraOffset: null, // function or fixed number
            activeClasses: null, // null, "link", "parent"
            easing: "swing", // easing of scrolling
            animMode: "duration", // or "speed" mode
            animDuration: 800, // total duration for scroll (any distance)
            animSpeed: 1500, // pixels per second
            anchorActiveClass: "anchor-active",
            sectionActiveClass: "section-active",
            wheelBehavior: "stop", // "stop", "ignore" or "none"
            useNativeAnchorScrolling: false // do not handle click in devices with native smooth scrolling
          },
          options
          );
          this.init();
        }
        SmoothScroll.prototype = {
          init: function() {
            this.initStructure();
            this.attachEvents();
            this.isInit = true;
          },
          initStructure: function() {
            var self = this;
            
            this.container = this.options.container
            ? $(this.options.container)
            : $("html,body");
            this.scrollContainer = this.options.container ? this.container : win;
            this.anchorLinks = jQuery(this.options.anchorLinks).filter(function() {
              return jQuery(self.getAnchorTarget(jQuery(this))).length;
            });
          },
          getId: function(str) {
            try {
              return "#" + str.replace(/^.*?(#|$)/, "");
            } catch (err) {
              return null;
            }
          },
          getAnchorTarget: function(link) {
            // get target block from link href
            var targetId = this.getId($(link).attr("href"));
            return $(targetId.length > 1 ? targetId : "html");
          },
          getTargetOffset: function(block) {
            // get target offset
            var blockOffset = block.offset().top;
            if (this.options.container) {
              blockOffset -=
              this.container.offset().top - this.container.prop("scrollTop");
            }
            
            // handle extra offset
            if (typeof this.options.extraOffset === "number") {
              blockOffset -= this.options.extraOffset;
            } else if (typeof this.options.extraOffset === "function") {
              blockOffset -= this.options.extraOffset(block);
            }
            return {
              top: blockOffset
            };
          },
          attachEvents: function() {
            var self = this;
            
            // handle active classes
            if (this.options.activeClasses && this.anchorLinks.length) {
              // cache structure
              this.anchorData = [];
              
              for (var i = 0; i < this.anchorLinks.length; i++) {
                var link = jQuery(this.anchorLinks[i]),
                targetBlock = self.getAnchorTarget(link),
                anchorDataItem = null;
                
                $.each(self.anchorData, function(index, item) {
                  if (item.block[0] === targetBlock[0]) {
                    anchorDataItem = item;
                  }
                });
                
                if (anchorDataItem) {
                  anchorDataItem.link = anchorDataItem.link.add(link);
                } else {
                  self.anchorData.push({
                    link: link,
                    block: targetBlock
                  });
                }
              }
              
              // add additional event handlers
              this.resizeHandler = function() {
                if (!self.isInit) return;
                self.recalculateOffsets();
              };
              this.scrollHandler = function() {
                self.refreshActiveClass();
              };
              
              this.recalculateOffsets();
              this.scrollContainer.on("scroll", this.scrollHandler);
              win.on(
                "resize load orientationchange refreshAnchor",
                this.resizeHandler
                );
              }
              
              // handle click event
              this.clickHandler = function(e) {
                self.onClick(e);
              };
              if (!this.options.useNativeAnchorScrolling) {
                this.anchorLinks.on("click", this.clickHandler);
              }
            },
            recalculateOffsets: function() {
              var self = this;
              $.each(this.anchorData, function(index, data) {
                data.offset = self.getTargetOffset(data.block);
                data.height = data.block.outerHeight();
              });
              this.refreshActiveClass();
            },
            toggleActiveClass: function(anchor, block, state) {
              anchor.toggleClass(this.options.anchorActiveClass, state);
              block.toggleClass(this.options.sectionActiveClass, state);
            },
            refreshActiveClass: function() {
              var self = this,
              foundFlag = false,
              containerHeight = this.container.prop("scrollHeight"),
              viewPortHeight = this.scrollContainer.height(),
              scrollTop = this.options.container
              ? this.container.prop("scrollTop")
              : win.scrollTop();
              
              // user function instead of default handler
              if (this.options.customScrollHandler) {
                this.options.customScrollHandler.call(this, scrollTop, this.anchorData);
                return;
              }
              
              // sort anchor data by offsets
              this.anchorData.sort(function(a, b) {
                return a.offset.top - b.offset.top;
              });
              
              // default active class handler
              $.each(this.anchorData, function(index) {
                var reverseIndex = self.anchorData.length - index - 1,
                data = self.anchorData[reverseIndex],
                anchorElement =
                self.options.activeClasses === "parent"
                ? data.link.parent()
                : data.link;
                
                if (scrollTop >= containerHeight - viewPortHeight) {
                  // handle last section
                  if (reverseIndex === self.anchorData.length - 1) {
                    self.toggleActiveClass(anchorElement, data.block, true);
                  } else {
                    self.toggleActiveClass(anchorElement, data.block, false);
                  }
                } else {
                  // handle other sections
                  if (
                    !foundFlag &&
                    (scrollTop >= data.offset.top - 1 || reverseIndex === 0)
                    ) {
                      foundFlag = true;
                      self.toggleActiveClass(anchorElement, data.block, true);
                    } else {
                      self.toggleActiveClass(anchorElement, data.block, false);
                    }
                  }
                });
              },
              calculateScrollDuration: function(offset) {
                var distance;
                if (this.options.animMode === "speed") {
                  distance = Math.abs(this.scrollContainer.scrollTop() - offset.top);
                  return distance / this.options.animSpeed * 1000;
                } else {
                  return this.options.animDuration;
                }
              },
              onClick: function(e) {
                var targetBlock = this.getAnchorTarget(e.currentTarget),
                targetOffset = this.getTargetOffset(targetBlock);
                
                e.preventDefault();
                scrollTo(targetOffset, {
                  container: this.container,
                  wheelBehavior: this.options.wheelBehavior,
                  duration: this.calculateScrollDuration(targetOffset)
                });
                this.makeCallback("onBeforeScroll", e.currentTarget);
              },
              makeCallback: function(name) {
                if (typeof this.options[name] === "function") {
                  var args = Array.prototype.slice.call(arguments);
                  args.shift();
                  this.options[name].apply(this, args);
                }
              },
              destroy: function() {
                var self = this;
                
                this.isInit = false;
                if (this.options.activeClasses) {
                  win.off(
                    "resize load orientationchange refreshAnchor",
                    this.resizeHandler
                    );
                    this.scrollContainer.off("scroll", this.scrollHandler);
                    $.each(this.anchorData, function(index) {
                      var reverseIndex = self.anchorData.length - index - 1,
                      data = self.anchorData[reverseIndex],
                      anchorElement =
                      self.options.activeClasses === "parent"
                      ? data.link.parent()
                      : data.link;
                      
                      self.toggleActiveClass(anchorElement, data.block, false);
                    });
                  }
                  this.anchorLinks.off("click", this.clickHandler);
                }
              };
              
              // public API
              $.extend(SmoothScroll, {
                scrollTo: function(blockOrOffset, durationOrOptions, callback) {
                  scrollTo(blockOrOffset, durationOrOptions, callback);
                }
              });
              
              // export module
              exports.SmoothScroll = SmoothScroll;
            })(jQuery, this);
            
            //-------- -------- -------- --------
            //-------- js custom end
            //-------- -------- -------- --------
            