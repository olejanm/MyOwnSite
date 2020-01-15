//-------- -------- -------- --------
//-------- included js libs start
//-------- -------- -------- --------
//menu
// mobile menu init
function initMobileNav() {
    jQuery(".wrap").mobileNav({
        menuActiveClass: "active",
        menuOpener: ".opener"
    }), jQuery(".wrap2").mobileNav({
        hideOnClick: !0,
        menuActiveClass: "active",
        menuOpener: ".opener",
        menuDrop: ".drop"
    }), jQuery(".menu li").touchHover({
        hoverClass: "custom-hover"
    });
}

/*
* Simple Mobile Navigation
*/
// initialize smooth anchor links
function initAnchors() {
    // simple case:
    new SmoothScroll({
        anchorLinks: "a.back-to-top"
    }), 
    // custom case:
    new SmoothScroll({
        anchorLinks: ".inner-links a",
        container: ".inner-container",
        activeClasses: "parent"
    });
    // hash case:
    var hash, hashOption = new SmoothScroll({
        anchorLinks: ".anchor-nav a",
        // extraOffset: jQuery(".anchor-nav").outerHeight() || 0,
        activeClasses: "link"
    });
    if (
    //scrollto when click to link
    jQuery(hashOption.options.anchorLinks).on("click", function() {
        var url = jQuery(this).attr("href");
        hash = url.substring(url.indexOf("#")), jQuery("body").removeClass("nav-active");
    }), "" != (
    //scrollto when click to other link with hash
    hash = window.location.hash.replace("#", ""))) 
    // scrollToWithHash(hash);
    return function(hash) {
        if (jQuery(hash).length) return jQuery("html, body").animate({
            scrollTop: jQuery(hash).offset().top - hashOption.options.extraOffset
        }, 600), !1;
    }(hash = "#" + hash);
}

/*!
  * SmoothScroll module
  */ !function(factory) {
    "use strict";
    "function" == typeof define && define.amd ? define([ "jquery" ], factory) : "undefined" != typeof exports ? module.exports = factory(require("jquery")) : factory(jQuery);
}(function($) {
    "use strict";
    var instanceUid, Slick = window.Slick || {};
    instanceUid = 0, (Slick = function(element, settings) {
        var dataSettings, _ = this;
        _.defaults = {
            accessibility: !0,
            adaptiveHeight: !1,
            appendArrows: $(element),
            appendDots: $(element),
            arrows: !0,
            asNavFor: null,
            prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
            nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
            autoplay: !1,
            autoplaySpeed: 3e3,
            centerMode: !1,
            centerPadding: "50px",
            cssEase: "ease",
            customPaging: function(slider, i) {
                return $('<button type="button" />').text(i + 1);
            },
            dots: !1,
            dotsClass: "slick-dots",
            draggable: !0,
            easing: "linear",
            edgeFriction: .35,
            fade: !1,
            focusOnSelect: !1,
            focusOnChange: !1,
            infinite: !0,
            initialSlide: 0,
            lazyLoad: "ondemand",
            mobileFirst: !1,
            pauseOnHover: !0,
            pauseOnFocus: !0,
            pauseOnDotsHover: !1,
            respondTo: "window",
            responsive: null,
            rows: 1,
            rtl: !1,
            slide: "",
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
            speed: 500,
            swipe: !0,
            swipeToSlide: !1,
            touchMove: !0,
            touchThreshold: 5,
            useCSS: !0,
            useTransform: !0,
            variableWidth: !1,
            vertical: !1,
            verticalSwiping: !1,
            waitForAnimate: !0,
            zIndex: 1e3
        }, _.initials = {
            animating: !1,
            dragging: !1,
            autoPlayTimer: null,
            currentDirection: 0,
            currentLeft: null,
            currentSlide: 0,
            direction: 1,
            $dots: null,
            listWidth: null,
            listHeight: null,
            loadIndex: 0,
            $nextArrow: null,
            $prevArrow: null,
            scrolling: !1,
            slideCount: null,
            slideWidth: null,
            $slideTrack: null,
            $slides: null,
            sliding: !1,
            slideOffset: 0,
            swipeLeft: null,
            swiping: !1,
            $list: null,
            touchObject: {},
            transformsEnabled: !1,
            unslicked: !1
        }, $.extend(_, _.initials), _.activeBreakpoint = null, _.animType = null, _.animProp = null, 
        _.breakpoints = [], _.breakpointSettings = [], _.cssTransitions = !1, _.focussed = !1, 
        _.interrupted = !1, _.hidden = "hidden", _.paused = !0, _.positionProp = null, _.respondTo = null, 
        _.rowCount = 1, _.shouldClick = !0, _.$slider = $(element), _.$slidesCache = null, 
        _.transformType = null, _.transitionType = null, _.visibilityChange = "visibilitychange", 
        _.windowWidth = 0, _.windowTimer = null, dataSettings = $(element).data("slick") || {}, 
        _.options = $.extend({}, _.defaults, settings, dataSettings), _.currentSlide = _.options.initialSlide, 
        _.originalSettings = _.options, void 0 !== document.mozHidden ? (_.hidden = "mozHidden", 
        _.visibilityChange = "mozvisibilitychange") : void 0 !== document.webkitHidden && (_.hidden = "webkitHidden", 
        _.visibilityChange = "webkitvisibilitychange"), _.autoPlay = $.proxy(_.autoPlay, _), 
        _.autoPlayClear = $.proxy(_.autoPlayClear, _), _.autoPlayIterator = $.proxy(_.autoPlayIterator, _), 
        _.changeSlide = $.proxy(_.changeSlide, _), _.clickHandler = $.proxy(_.clickHandler, _), 
        _.selectHandler = $.proxy(_.selectHandler, _), _.setPosition = $.proxy(_.setPosition, _), 
        _.swipeHandler = $.proxy(_.swipeHandler, _), _.dragHandler = $.proxy(_.dragHandler, _), 
        _.keyHandler = $.proxy(_.keyHandler, _), _.instanceUid = instanceUid++, _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/, 
        _.registerBreakpoints(), _.init(!0);
    }).prototype.activateADA = function() {
        this.$slideTrack.find(".slick-active").attr({
            "aria-hidden": "false"
        }).find("a, input, button, select").attr({
            tabindex: "0"
        });
    }, Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {
        var _ = this;
        if ("boolean" == typeof index) addBefore = index, index = null; else if (index < 0 || index >= _.slideCount) return !1;
        _.unload(), "number" == typeof index ? 0 === index && 0 === _.$slides.length ? $(markup).appendTo(_.$slideTrack) : addBefore ? $(markup).insertBefore(_.$slides.eq(index)) : $(markup).insertAfter(_.$slides.eq(index)) : !0 === addBefore ? $(markup).prependTo(_.$slideTrack) : $(markup).appendTo(_.$slideTrack), 
        _.$slides = _.$slideTrack.children(this.options.slide), _.$slideTrack.children(this.options.slide).detach(), 
        _.$slideTrack.append(_.$slides), _.$slides.each(function(index, element) {
            $(element).attr("data-slick-index", index);
        }), _.$slidesCache = _.$slides, _.reinit();
    }, Slick.prototype.animateHeight = function() {
        var _ = this;
        if (1 === _.options.slidesToShow && !0 === _.options.adaptiveHeight && !1 === _.options.vertical) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(!0);
            _.$list.animate({
                height: targetHeight
            }, _.options.speed);
        }
    }, Slick.prototype.animateSlide = function(targetLeft, callback) {
        var animProps = {}, _ = this;
        _.animateHeight(), !0 === _.options.rtl && !1 === _.options.vertical && (targetLeft = -targetLeft), 
        !1 === _.transformsEnabled ? !1 === _.options.vertical ? _.$slideTrack.animate({
            left: targetLeft
        }, _.options.speed, _.options.easing, callback) : _.$slideTrack.animate({
            top: targetLeft
        }, _.options.speed, _.options.easing, callback) : !1 === _.cssTransitions ? (!0 === _.options.rtl && (_.currentLeft = -_.currentLeft), 
        $({
            animStart: _.currentLeft
        }).animate({
            animStart: targetLeft
        }, {
            duration: _.options.speed,
            easing: _.options.easing,
            step: function(now) {
                now = Math.ceil(now), !1 === _.options.vertical ? animProps[_.animType] = "translate(" + now + "px, 0px)" : animProps[_.animType] = "translate(0px," + now + "px)", 
                _.$slideTrack.css(animProps);
            },
            complete: function() {
                callback && callback.call();
            }
        })) : (_.applyTransition(), targetLeft = Math.ceil(targetLeft), !1 === _.options.vertical ? animProps[_.animType] = "translate3d(" + targetLeft + "px, 0px, 0px)" : animProps[_.animType] = "translate3d(0px," + targetLeft + "px, 0px)", 
        _.$slideTrack.css(animProps), callback && setTimeout(function() {
            _.disableTransition(), callback.call();
        }, _.options.speed));
    }, Slick.prototype.getNavTarget = function() {
        var asNavFor = this.options.asNavFor;
        return asNavFor && null !== asNavFor && (asNavFor = $(asNavFor).not(this.$slider)), 
        asNavFor;
    }, Slick.prototype.asNavFor = function(index) {
        var asNavFor = this.getNavTarget();
        null !== asNavFor && "object" == typeof asNavFor && asNavFor.each(function() {
            var target = $(this).slick("getSlick");
            target.unslicked || target.slideHandler(index, !0);
        });
    }, Slick.prototype.applyTransition = function(slide) {
        var _ = this, transition = {};
        !1 === _.options.fade ? transition[_.transitionType] = _.transformType + " " + _.options.speed + "ms " + _.options.cssEase : transition[_.transitionType] = "opacity " + _.options.speed + "ms " + _.options.cssEase, 
        !1 === _.options.fade ? _.$slideTrack.css(transition) : _.$slides.eq(slide).css(transition);
    }, Slick.prototype.autoPlay = function() {
        var _ = this;
        _.autoPlayClear(), _.slideCount > _.options.slidesToShow && (_.autoPlayTimer = setInterval(_.autoPlayIterator, _.options.autoplaySpeed));
    }, Slick.prototype.autoPlayClear = function() {
        this.autoPlayTimer && clearInterval(this.autoPlayTimer);
    }, Slick.prototype.autoPlayIterator = function() {
        var _ = this, slideTo = _.currentSlide + _.options.slidesToScroll;
        _.paused || _.interrupted || _.focussed || (!1 === _.options.infinite && (1 === _.direction && _.currentSlide + 1 === _.slideCount - 1 ? _.direction = 0 : 0 === _.direction && (slideTo = _.currentSlide - _.options.slidesToScroll, 
        _.currentSlide - 1 == 0 && (_.direction = 1))), _.slideHandler(slideTo));
    }, Slick.prototype.buildArrows = function() {
        var _ = this;
        !0 === _.options.arrows && (_.$prevArrow = $(_.options.prevArrow).addClass("slick-arrow"), 
        _.$nextArrow = $(_.options.nextArrow).addClass("slick-arrow"), _.slideCount > _.options.slidesToShow ? (_.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), 
        _.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), _.htmlExpr.test(_.options.prevArrow) && _.$prevArrow.prependTo(_.options.appendArrows), 
        _.htmlExpr.test(_.options.nextArrow) && _.$nextArrow.appendTo(_.options.appendArrows), 
        !0 !== _.options.infinite && _.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : _.$prevArrow.add(_.$nextArrow).addClass("slick-hidden").attr({
            "aria-disabled": "true",
            tabindex: "-1"
        }));
    }, Slick.prototype.buildDots = function() {
        var i, dot, _ = this;
        if (!0 === _.options.dots && _.slideCount > _.options.slidesToShow) {
            for (_.$slider.addClass("slick-dotted"), dot = $("<ul />").addClass(_.options.dotsClass), 
            i = 0; i <= _.getDotCount(); i += 1) dot.append($("<li />").append(_.options.customPaging.call(this, _, i)));
            _.$dots = dot.appendTo(_.options.appendDots), _.$dots.find("li").first().addClass("slick-active");
        }
    }, Slick.prototype.buildOut = function() {
        var _ = this;
        _.$slides = _.$slider.children(_.options.slide + ":not(.slick-cloned)").addClass("slick-slide"), 
        _.slideCount = _.$slides.length, _.$slides.each(function(index, element) {
            $(element).attr("data-slick-index", index).data("originalStyling", $(element).attr("style") || "");
        }), _.$slider.addClass("slick-slider"), _.$slideTrack = 0 === _.slideCount ? $('<div class="slick-track"/>').appendTo(_.$slider) : _.$slides.wrapAll('<div class="slick-track"/>').parent(), 
        _.$list = _.$slideTrack.wrap('<div class="slick-list"/>').parent(), _.$slideTrack.css("opacity", 0), 
        !0 !== _.options.centerMode && !0 !== _.options.swipeToSlide || (_.options.slidesToScroll = 1), 
        $("img[data-lazy]", _.$slider).not("[src]").addClass("slick-loading"), _.setupInfinite(), 
        _.buildArrows(), _.buildDots(), _.updateDots(), _.setSlideClasses("number" == typeof _.currentSlide ? _.currentSlide : 0), 
        !0 === _.options.draggable && _.$list.addClass("draggable");
    }, Slick.prototype.buildRows = function() {
        var a, b, c, newSlides, numOfSlides, originalSlides, slidesPerSection, _ = this;
        if (newSlides = document.createDocumentFragment(), originalSlides = _.$slider.children(), 
        0 < _.options.rows) {
            for (slidesPerSection = _.options.slidesPerRow * _.options.rows, numOfSlides = Math.ceil(originalSlides.length / slidesPerSection), 
            a = 0; a < numOfSlides; a++) {
                var slide = document.createElement("div");
                for (b = 0; b < _.options.rows; b++) {
                    var row = document.createElement("div");
                    for (c = 0; c < _.options.slidesPerRow; c++) {
                        var target = a * slidesPerSection + (b * _.options.slidesPerRow + c);
                        originalSlides.get(target) && row.appendChild(originalSlides.get(target));
                    }
                    slide.appendChild(row);
                }
                newSlides.appendChild(slide);
            }
            _.$slider.empty().append(newSlides), _.$slider.children().children().children().css({
                width: 100 / _.options.slidesPerRow + "%",
                display: "inline-block"
            });
        }
    }, Slick.prototype.checkResponsive = function(initial, forceUpdate) {
        var breakpoint, targetBreakpoint, respondToWidth, _ = this, triggerBreakpoint = !1, sliderWidth = _.$slider.width(), windowWidth = window.innerWidth || $(window).width();
        if ("window" === _.respondTo ? respondToWidth = windowWidth : "slider" === _.respondTo ? respondToWidth = sliderWidth : "min" === _.respondTo && (respondToWidth = Math.min(windowWidth, sliderWidth)), 
        _.options.responsive && _.options.responsive.length && null !== _.options.responsive) {
            for (breakpoint in targetBreakpoint = null, _.breakpoints) _.breakpoints.hasOwnProperty(breakpoint) && (!1 === _.originalSettings.mobileFirst ? respondToWidth < _.breakpoints[breakpoint] && (targetBreakpoint = _.breakpoints[breakpoint]) : respondToWidth > _.breakpoints[breakpoint] && (targetBreakpoint = _.breakpoints[breakpoint]));
            null !== targetBreakpoint ? null !== _.activeBreakpoint && targetBreakpoint === _.activeBreakpoint && !forceUpdate || (_.activeBreakpoint = targetBreakpoint, 
            "unslick" === _.breakpointSettings[targetBreakpoint] ? _.unslick(targetBreakpoint) : (_.options = $.extend({}, _.originalSettings, _.breakpointSettings[targetBreakpoint]), 
            !0 === initial && (_.currentSlide = _.options.initialSlide), _.refresh(initial)), 
            triggerBreakpoint = targetBreakpoint) : null !== _.activeBreakpoint && (_.activeBreakpoint = null, 
            _.options = _.originalSettings, !0 === initial && (_.currentSlide = _.options.initialSlide), 
            _.refresh(initial), triggerBreakpoint = targetBreakpoint), initial || !1 === triggerBreakpoint || _.$slider.trigger("breakpoint", [ _, triggerBreakpoint ]);
        }
    }, Slick.prototype.changeSlide = function(event, dontAnimate) {
        var indexOffset, slideOffset, _ = this, $target = $(event.currentTarget);
        switch ($target.is("a") && event.preventDefault(), $target.is("li") || ($target = $target.closest("li")), 
        indexOffset = _.slideCount % _.options.slidesToScroll != 0 ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll, 
        event.data.message) {
          case "previous":
            slideOffset = 0 == indexOffset ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset, 
            _.slideCount > _.options.slidesToShow && _.slideHandler(_.currentSlide - slideOffset, !1, dontAnimate);
            break;

          case "next":
            slideOffset = 0 == indexOffset ? _.options.slidesToScroll : indexOffset, _.slideCount > _.options.slidesToShow && _.slideHandler(_.currentSlide + slideOffset, !1, dontAnimate);
            break;

          case "index":
            var index = 0 === event.data.index ? 0 : event.data.index || $target.index() * _.options.slidesToScroll;
            _.slideHandler(_.checkNavigable(index), !1, dontAnimate), $target.children().trigger("focus");
            break;

          default:
            return;
        }
    }, Slick.prototype.checkNavigable = function(index) {
        var navigables, prevNavigable;
        if (prevNavigable = 0, index > (navigables = this.getNavigableIndexes())[navigables.length - 1]) index = navigables[navigables.length - 1]; else for (var n in navigables) {
            if (index < navigables[n]) {
                index = prevNavigable;
                break;
            }
            prevNavigable = navigables[n];
        }
        return index;
    }, Slick.prototype.cleanUpEvents = function() {
        var _ = this;
        _.options.dots && null !== _.$dots && ($("li", _.$dots).off("click.slick", _.changeSlide).off("mouseenter.slick", $.proxy(_.interrupt, _, !0)).off("mouseleave.slick", $.proxy(_.interrupt, _, !1)), 
        !0 === _.options.accessibility && _.$dots.off("keydown.slick", _.keyHandler)), _.$slider.off("focus.slick blur.slick"), 
        !0 === _.options.arrows && _.slideCount > _.options.slidesToShow && (_.$prevArrow && _.$prevArrow.off("click.slick", _.changeSlide), 
        _.$nextArrow && _.$nextArrow.off("click.slick", _.changeSlide), !0 === _.options.accessibility && (_.$prevArrow && _.$prevArrow.off("keydown.slick", _.keyHandler), 
        _.$nextArrow && _.$nextArrow.off("keydown.slick", _.keyHandler))), _.$list.off("touchstart.slick mousedown.slick", _.swipeHandler), 
        _.$list.off("touchmove.slick mousemove.slick", _.swipeHandler), _.$list.off("touchend.slick mouseup.slick", _.swipeHandler), 
        _.$list.off("touchcancel.slick mouseleave.slick", _.swipeHandler), _.$list.off("click.slick", _.clickHandler), 
        $(document).off(_.visibilityChange, _.visibility), _.cleanUpSlideEvents(), !0 === _.options.accessibility && _.$list.off("keydown.slick", _.keyHandler), 
        !0 === _.options.focusOnSelect && $(_.$slideTrack).children().off("click.slick", _.selectHandler), 
        $(window).off("orientationchange.slick.slick-" + _.instanceUid, _.orientationChange), 
        $(window).off("resize.slick.slick-" + _.instanceUid, _.resize), $("[draggable!=true]", _.$slideTrack).off("dragstart", _.preventDefault), 
        $(window).off("load.slick.slick-" + _.instanceUid, _.setPosition);
    }, Slick.prototype.cleanUpSlideEvents = function() {
        var _ = this;
        _.$list.off("mouseenter.slick", $.proxy(_.interrupt, _, !0)), _.$list.off("mouseleave.slick", $.proxy(_.interrupt, _, !1));
    }, Slick.prototype.cleanUpRows = function() {
        var originalSlides, _ = this;
        0 < _.options.rows && ((originalSlides = _.$slides.children().children()).removeAttr("style"), 
        _.$slider.empty().append(originalSlides));
    }, Slick.prototype.clickHandler = function(event) {
        !1 === this.shouldClick && (event.stopImmediatePropagation(), event.stopPropagation(), 
        event.preventDefault());
    }, Slick.prototype.destroy = function(refresh) {
        var _ = this;
        _.autoPlayClear(), _.touchObject = {}, _.cleanUpEvents(), $(".slick-cloned", _.$slider).detach(), 
        _.$dots && _.$dots.remove(), _.$prevArrow && _.$prevArrow.length && (_.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), 
        _.htmlExpr.test(_.options.prevArrow) && _.$prevArrow.remove()), _.$nextArrow && _.$nextArrow.length && (_.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), 
        _.htmlExpr.test(_.options.nextArrow) && _.$nextArrow.remove()), _.$slides && (_.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function() {
            $(this).attr("style", $(this).data("originalStyling"));
        }), _.$slideTrack.children(this.options.slide).detach(), _.$slideTrack.detach(), 
        _.$list.detach(), _.$slider.append(_.$slides)), _.cleanUpRows(), _.$slider.removeClass("slick-slider"), 
        _.$slider.removeClass("slick-initialized"), _.$slider.removeClass("slick-dotted"), 
        _.unslicked = !0, refresh || _.$slider.trigger("destroy", [ _ ]);
    }, Slick.prototype.disableTransition = function(slide) {
        var _ = this, transition = {};
        transition[_.transitionType] = "", !1 === _.options.fade ? _.$slideTrack.css(transition) : _.$slides.eq(slide).css(transition);
    }, Slick.prototype.fadeSlide = function(slideIndex, callback) {
        var _ = this;
        !1 === _.cssTransitions ? (_.$slides.eq(slideIndex).css({
            zIndex: _.options.zIndex
        }), _.$slides.eq(slideIndex).animate({
            opacity: 1
        }, _.options.speed, _.options.easing, callback)) : (_.applyTransition(slideIndex), 
        _.$slides.eq(slideIndex).css({
            opacity: 1,
            zIndex: _.options.zIndex
        }), callback && setTimeout(function() {
            _.disableTransition(slideIndex), callback.call();
        }, _.options.speed));
    }, Slick.prototype.fadeSlideOut = function(slideIndex) {
        var _ = this;
        !1 === _.cssTransitions ? _.$slides.eq(slideIndex).animate({
            opacity: 0,
            zIndex: _.options.zIndex - 2
        }, _.options.speed, _.options.easing) : (_.applyTransition(slideIndex), _.$slides.eq(slideIndex).css({
            opacity: 0,
            zIndex: _.options.zIndex - 2
        }));
    }, Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {
        var _ = this;
        null !== filter && (_.$slidesCache = _.$slides, _.unload(), _.$slideTrack.children(this.options.slide).detach(), 
        _.$slidesCache.filter(filter).appendTo(_.$slideTrack), _.reinit());
    }, Slick.prototype.focusHandler = function() {
        var _ = this;
        _.$slider.off("focus.slick blur.slick").on("focus.slick", "*", function(event) {
            var $sf = $(this);
            setTimeout(function() {
                _.options.pauseOnFocus && $sf.is(":focus") && (_.focussed = !0, _.autoPlay());
            }, 0);
        }).on("blur.slick", "*", function(event) {
            $(this);
            _.options.pauseOnFocus && (_.focussed = !1, _.autoPlay());
        });
    }, Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {
        return this.currentSlide;
    }, Slick.prototype.getDotCount = function() {
        var _ = this, breakPoint = 0, counter = 0, pagerQty = 0;
        if (!0 === _.options.infinite) if (_.slideCount <= _.options.slidesToShow) ++pagerQty; else for (;breakPoint < _.slideCount; ) ++pagerQty, 
        breakPoint = counter + _.options.slidesToScroll, counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow; else if (!0 === _.options.centerMode) pagerQty = _.slideCount; else if (_.options.asNavFor) for (;breakPoint < _.slideCount; ) ++pagerQty, 
        breakPoint = counter + _.options.slidesToScroll, counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow; else pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
        return pagerQty - 1;
    }, Slick.prototype.getLeft = function(slideIndex) {
        var targetLeft, verticalHeight, targetSlide, coef, _ = this, verticalOffset = 0;
        return _.slideOffset = 0, verticalHeight = _.$slides.first().outerHeight(!0), !0 === _.options.infinite ? (_.slideCount > _.options.slidesToShow && (_.slideOffset = _.slideWidth * _.options.slidesToShow * -1, 
        coef = -1, !0 === _.options.vertical && !0 === _.options.centerMode && (2 === _.options.slidesToShow ? coef = -1.5 : 1 === _.options.slidesToShow && (coef = -2)), 
        verticalOffset = verticalHeight * _.options.slidesToShow * coef), _.slideCount % _.options.slidesToScroll != 0 && slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow && (verticalOffset = slideIndex > _.slideCount ? (_.slideOffset = (_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth * -1, 
        (_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight * -1) : (_.slideOffset = _.slideCount % _.options.slidesToScroll * _.slideWidth * -1, 
        _.slideCount % _.options.slidesToScroll * verticalHeight * -1))) : slideIndex + _.options.slidesToShow > _.slideCount && (_.slideOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * _.slideWidth, 
        verticalOffset = (slideIndex + _.options.slidesToShow - _.slideCount) * verticalHeight), 
        _.slideCount <= _.options.slidesToShow && (verticalOffset = _.slideOffset = 0), 
        !0 === _.options.centerMode && _.slideCount <= _.options.slidesToShow ? _.slideOffset = _.slideWidth * Math.floor(_.options.slidesToShow) / 2 - _.slideWidth * _.slideCount / 2 : !0 === _.options.centerMode && !0 === _.options.infinite ? _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth : !0 === _.options.centerMode && (_.slideOffset = 0, 
        _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2)), targetLeft = !1 === _.options.vertical ? slideIndex * _.slideWidth * -1 + _.slideOffset : slideIndex * verticalHeight * -1 + verticalOffset, 
        !0 === _.options.variableWidth && (targetSlide = _.slideCount <= _.options.slidesToShow || !1 === _.options.infinite ? _.$slideTrack.children(".slick-slide").eq(slideIndex) : _.$slideTrack.children(".slick-slide").eq(slideIndex + _.options.slidesToShow), 
        targetLeft = !0 === _.options.rtl ? targetSlide[0] ? -1 * (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) : 0 : targetSlide[0] ? -1 * targetSlide[0].offsetLeft : 0, 
        !0 === _.options.centerMode && (targetSlide = _.slideCount <= _.options.slidesToShow || !1 === _.options.infinite ? _.$slideTrack.children(".slick-slide").eq(slideIndex) : _.$slideTrack.children(".slick-slide").eq(slideIndex + _.options.slidesToShow + 1), 
        targetLeft = !0 === _.options.rtl ? targetSlide[0] ? -1 * (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) : 0 : targetSlide[0] ? -1 * targetSlide[0].offsetLeft : 0, 
        targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2)), targetLeft;
    }, Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {
        return this.options[option];
    }, Slick.prototype.getNavigableIndexes = function() {
        var max, _ = this, breakPoint = 0, counter = 0, indexes = [];
        for (max = !1 === _.options.infinite ? _.slideCount : (breakPoint = -1 * _.options.slidesToScroll, 
        counter = -1 * _.options.slidesToScroll, 2 * _.slideCount); breakPoint < max; ) indexes.push(breakPoint), 
        breakPoint = counter + _.options.slidesToScroll, counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        return indexes;
    }, Slick.prototype.getSlick = function() {
        return this;
    }, Slick.prototype.getSlideCount = function() {
        var swipedSlide, swipeTarget, centerOffset, _ = this;
        return centerOffset = !0 === _.options.centerMode ? Math.floor(_.$list.width() / 2) : 0, 
        swipeTarget = -1 * _.swipeLeft + centerOffset, !0 === _.options.swipeToSlide ? (_.$slideTrack.find(".slick-slide").each(function(index, slide) {
            var slideOuterWidth, slideOffset;
            if (slideOuterWidth = $(slide).outerWidth(), slideOffset = slide.offsetLeft, !0 !== _.options.centerMode && (slideOffset += slideOuterWidth / 2), 
            swipeTarget < slideOffset + slideOuterWidth) return swipedSlide = slide, !1;
        }), Math.abs($(swipedSlide).attr("data-slick-index") - _.currentSlide) || 1) : _.options.slidesToScroll;
    }, Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {
        this.changeSlide({
            data: {
                message: "index",
                index: parseInt(slide)
            }
        }, dontAnimate);
    }, Slick.prototype.init = function(creation) {
        var _ = this;
        $(_.$slider).hasClass("slick-initialized") || ($(_.$slider).addClass("slick-initialized"), 
        _.buildRows(), _.buildOut(), _.setProps(), _.startLoad(), _.loadSlider(), _.initializeEvents(), 
        _.updateArrows(), _.updateDots(), _.checkResponsive(!0), _.focusHandler()), creation && _.$slider.trigger("init", [ _ ]), 
        !0 === _.options.accessibility && _.initADA(), _.options.autoplay && (_.paused = !1, 
        _.autoPlay());
    }, Slick.prototype.initADA = function() {
        var _ = this, numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow), tabControlIndexes = _.getNavigableIndexes().filter(function(val) {
            return 0 <= val && val < _.slideCount;
        });
        _.$slides.add(_.$slideTrack.find(".slick-cloned")).attr({
            "aria-hidden": "true",
            tabindex: "-1"
        }).find("a, input, button, select").attr({
            tabindex: "-1"
        }), null !== _.$dots && (_.$slides.not(_.$slideTrack.find(".slick-cloned")).each(function(i) {
            var slideControlIndex = tabControlIndexes.indexOf(i);
            if ($(this).attr({
                role: "tabpanel",
                id: "slick-slide" + _.instanceUid + i,
                tabindex: -1
            }), -1 !== slideControlIndex) {
                var ariaButtonControl = "slick-slide-control" + _.instanceUid + slideControlIndex;
                $("#" + ariaButtonControl).length && $(this).attr({
                    "aria-describedby": ariaButtonControl
                });
            }
        }), _.$dots.attr("role", "tablist").find("li").each(function(i) {
            var mappedSlideIndex = tabControlIndexes[i];
            $(this).attr({
                role: "presentation"
            }), $(this).find("button").first().attr({
                role: "tab",
                id: "slick-slide-control" + _.instanceUid + i,
                "aria-controls": "slick-slide" + _.instanceUid + mappedSlideIndex,
                "aria-label": i + 1 + " of " + numDotGroups,
                "aria-selected": null,
                tabindex: "-1"
            });
        }).eq(_.currentSlide).find("button").attr({
            "aria-selected": "true",
            tabindex: "0"
        }).end());
        for (var i = _.currentSlide, max = i + _.options.slidesToShow; i < max; i++) _.options.focusOnChange ? _.$slides.eq(i).attr({
            tabindex: "0"
        }) : _.$slides.eq(i).removeAttr("tabindex");
        _.activateADA();
    }, Slick.prototype.initArrowEvents = function() {
        var _ = this;
        !0 === _.options.arrows && _.slideCount > _.options.slidesToShow && (_.$prevArrow.off("click.slick").on("click.slick", {
            message: "previous"
        }, _.changeSlide), _.$nextArrow.off("click.slick").on("click.slick", {
            message: "next"
        }, _.changeSlide), !0 === _.options.accessibility && (_.$prevArrow.on("keydown.slick", _.keyHandler), 
        _.$nextArrow.on("keydown.slick", _.keyHandler)));
    }, Slick.prototype.initDotEvents = function() {
        var _ = this;
        !0 === _.options.dots && _.slideCount > _.options.slidesToShow && ($("li", _.$dots).on("click.slick", {
            message: "index"
        }, _.changeSlide), !0 === _.options.accessibility && _.$dots.on("keydown.slick", _.keyHandler)), 
        !0 === _.options.dots && !0 === _.options.pauseOnDotsHover && _.slideCount > _.options.slidesToShow && $("li", _.$dots).on("mouseenter.slick", $.proxy(_.interrupt, _, !0)).on("mouseleave.slick", $.proxy(_.interrupt, _, !1));
    }, Slick.prototype.initSlideEvents = function() {
        var _ = this;
        _.options.pauseOnHover && (_.$list.on("mouseenter.slick", $.proxy(_.interrupt, _, !0)), 
        _.$list.on("mouseleave.slick", $.proxy(_.interrupt, _, !1)));
    }, Slick.prototype.initializeEvents = function() {
        var _ = this;
        _.initArrowEvents(), _.initDotEvents(), _.initSlideEvents(), _.$list.on("touchstart.slick mousedown.slick", {
            action: "start"
        }, _.swipeHandler), _.$list.on("touchmove.slick mousemove.slick", {
            action: "move"
        }, _.swipeHandler), _.$list.on("touchend.slick mouseup.slick", {
            action: "end"
        }, _.swipeHandler), _.$list.on("touchcancel.slick mouseleave.slick", {
            action: "end"
        }, _.swipeHandler), _.$list.on("click.slick", _.clickHandler), $(document).on(_.visibilityChange, $.proxy(_.visibility, _)), 
        !0 === _.options.accessibility && _.$list.on("keydown.slick", _.keyHandler), !0 === _.options.focusOnSelect && $(_.$slideTrack).children().on("click.slick", _.selectHandler), 
        $(window).on("orientationchange.slick.slick-" + _.instanceUid, $.proxy(_.orientationChange, _)), 
        $(window).on("resize.slick.slick-" + _.instanceUid, $.proxy(_.resize, _)), $("[draggable!=true]", _.$slideTrack).on("dragstart", _.preventDefault), 
        $(window).on("load.slick.slick-" + _.instanceUid, _.setPosition), $(_.setPosition);
    }, Slick.prototype.initUI = function() {
        var _ = this;
        !0 === _.options.arrows && _.slideCount > _.options.slidesToShow && (_.$prevArrow.show(), 
        _.$nextArrow.show()), !0 === _.options.dots && _.slideCount > _.options.slidesToShow && _.$dots.show();
    }, Slick.prototype.keyHandler = function(event) {
        var _ = this;
        event.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === event.keyCode && !0 === _.options.accessibility ? _.changeSlide({
            data: {
                message: !0 === _.options.rtl ? "next" : "previous"
            }
        }) : 39 === event.keyCode && !0 === _.options.accessibility && _.changeSlide({
            data: {
                message: !0 === _.options.rtl ? "previous" : "next"
            }
        }));
    }, Slick.prototype.lazyLoad = function() {
        var loadRange, rangeStart, rangeEnd, _ = this;
        function loadImages(imagesScope) {
            $("img[data-lazy]", imagesScope).each(function() {
                var image = $(this), imageSource = $(this).attr("data-lazy"), imageSrcSet = $(this).attr("data-srcset"), imageSizes = $(this).attr("data-sizes") || _.$slider.attr("data-sizes"), imageToLoad = document.createElement("img");
                imageToLoad.onload = function() {
                    image.animate({
                        opacity: 0
                    }, 100, function() {
                        imageSrcSet && (image.attr("srcset", imageSrcSet), imageSizes && image.attr("sizes", imageSizes)), 
                        image.attr("src", imageSource).animate({
                            opacity: 1
                        }, 200, function() {
                            image.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading");
                        }), _.$slider.trigger("lazyLoaded", [ _, image, imageSource ]);
                    });
                }, imageToLoad.onerror = function() {
                    image.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), 
                    _.$slider.trigger("lazyLoadError", [ _, image, imageSource ]);
                }, imageToLoad.src = imageSource;
            });
        }
        if (!0 === _.options.centerMode ? rangeEnd = !0 === _.options.infinite ? (rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1)) + _.options.slidesToShow + 2 : (rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1)), 
        _.options.slidesToShow / 2 + 1 + 2 + _.currentSlide) : (rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide, 
        rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow), !0 === _.options.fade && (0 < rangeStart && rangeStart--, 
        rangeEnd <= _.slideCount && rangeEnd++)), loadRange = _.$slider.find(".slick-slide").slice(rangeStart, rangeEnd), 
        "anticipated" === _.options.lazyLoad) for (var prevSlide = rangeStart - 1, nextSlide = rangeEnd, $slides = _.$slider.find(".slick-slide"), i = 0; i < _.options.slidesToScroll; i++) prevSlide < 0 && (prevSlide = _.slideCount - 1), 
        loadRange = (loadRange = loadRange.add($slides.eq(prevSlide))).add($slides.eq(nextSlide)), 
        prevSlide--, nextSlide++;
        loadImages(loadRange), _.slideCount <= _.options.slidesToShow ? loadImages(_.$slider.find(".slick-slide")) : _.currentSlide >= _.slideCount - _.options.slidesToShow ? loadImages(_.$slider.find(".slick-cloned").slice(0, _.options.slidesToShow)) : 0 === _.currentSlide && loadImages(_.$slider.find(".slick-cloned").slice(-1 * _.options.slidesToShow));
    }, Slick.prototype.loadSlider = function() {
        var _ = this;
        _.setPosition(), _.$slideTrack.css({
            opacity: 1
        }), _.$slider.removeClass("slick-loading"), _.initUI(), "progressive" === _.options.lazyLoad && _.progressiveLazyLoad();
    }, Slick.prototype.next = Slick.prototype.slickNext = function() {
        this.changeSlide({
            data: {
                message: "next"
            }
        });
    }, Slick.prototype.orientationChange = function() {
        this.checkResponsive(), this.setPosition();
    }, Slick.prototype.pause = Slick.prototype.slickPause = function() {
        this.autoPlayClear(), this.paused = !0;
    }, Slick.prototype.play = Slick.prototype.slickPlay = function() {
        var _ = this;
        _.autoPlay(), _.options.autoplay = !0, _.paused = !1, _.focussed = !1, _.interrupted = !1;
    }, Slick.prototype.postSlide = function(index) {
        var _ = this;
        _.unslicked || (_.$slider.trigger("afterChange", [ _, index ]), _.animating = !1, 
        _.slideCount > _.options.slidesToShow && _.setPosition(), _.swipeLeft = null, _.options.autoplay && _.autoPlay(), 
        !0 === _.options.accessibility && (_.initADA(), _.options.focusOnChange && $(_.$slides.get(_.currentSlide)).attr("tabindex", 0).focus()));
    }, Slick.prototype.prev = Slick.prototype.slickPrev = function() {
        this.changeSlide({
            data: {
                message: "previous"
            }
        });
    }, Slick.prototype.preventDefault = function(event) {
        event.preventDefault();
    }, Slick.prototype.progressiveLazyLoad = function(tryCount) {
        tryCount = tryCount || 1;
        var image, imageSource, imageSrcSet, imageSizes, imageToLoad, _ = this, $imgsToLoad = $("img[data-lazy]", _.$slider);
        $imgsToLoad.length ? (image = $imgsToLoad.first(), imageSource = image.attr("data-lazy"), 
        imageSrcSet = image.attr("data-srcset"), imageSizes = image.attr("data-sizes") || _.$slider.attr("data-sizes"), 
        (imageToLoad = document.createElement("img")).onload = function() {
            imageSrcSet && (image.attr("srcset", imageSrcSet), imageSizes && image.attr("sizes", imageSizes)), 
            image.attr("src", imageSource).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"), 
            !0 === _.options.adaptiveHeight && _.setPosition(), _.$slider.trigger("lazyLoaded", [ _, image, imageSource ]), 
            _.progressiveLazyLoad();
        }, imageToLoad.onerror = function() {
            tryCount < 3 ? setTimeout(function() {
                _.progressiveLazyLoad(tryCount + 1);
            }, 500) : (image.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), 
            _.$slider.trigger("lazyLoadError", [ _, image, imageSource ]), _.progressiveLazyLoad());
        }, imageToLoad.src = imageSource) : _.$slider.trigger("allImagesLoaded", [ _ ]);
    }, Slick.prototype.refresh = function(initializing) {
        var currentSlide, lastVisibleIndex, _ = this;
        lastVisibleIndex = _.slideCount - _.options.slidesToShow, !_.options.infinite && _.currentSlide > lastVisibleIndex && (_.currentSlide = lastVisibleIndex), 
        _.slideCount <= _.options.slidesToShow && (_.currentSlide = 0), currentSlide = _.currentSlide, 
        _.destroy(!0), $.extend(_, _.initials, {
            currentSlide: currentSlide
        }), _.init(), initializing || _.changeSlide({
            data: {
                message: "index",
                index: currentSlide
            }
        }, !1);
    }, Slick.prototype.registerBreakpoints = function() {
        var breakpoint, currentBreakpoint, l, _ = this, responsiveSettings = _.options.responsive || null;
        if ("array" === $.type(responsiveSettings) && responsiveSettings.length) {
            for (breakpoint in _.respondTo = _.options.respondTo || "window", responsiveSettings) if (l = _.breakpoints.length - 1, 
            responsiveSettings.hasOwnProperty(breakpoint)) {
                for (currentBreakpoint = responsiveSettings[breakpoint].breakpoint; 0 <= l; ) _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint && _.breakpoints.splice(l, 1), 
                l--;
                _.breakpoints.push(currentBreakpoint), _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;
            }
            _.breakpoints.sort(function(a, b) {
                return _.options.mobileFirst ? a - b : b - a;
            });
        }
    }, Slick.prototype.reinit = function() {
        var _ = this;
        _.$slides = _.$slideTrack.children(_.options.slide).addClass("slick-slide"), _.slideCount = _.$slides.length, 
        _.currentSlide >= _.slideCount && 0 !== _.currentSlide && (_.currentSlide = _.currentSlide - _.options.slidesToScroll), 
        _.slideCount <= _.options.slidesToShow && (_.currentSlide = 0), _.registerBreakpoints(), 
        _.setProps(), _.setupInfinite(), _.buildArrows(), _.updateArrows(), _.initArrowEvents(), 
        _.buildDots(), _.updateDots(), _.initDotEvents(), _.cleanUpSlideEvents(), _.initSlideEvents(), 
        _.checkResponsive(!1, !0), !0 === _.options.focusOnSelect && $(_.$slideTrack).children().on("click.slick", _.selectHandler), 
        _.setSlideClasses("number" == typeof _.currentSlide ? _.currentSlide : 0), _.setPosition(), 
        _.focusHandler(), _.paused = !_.options.autoplay, _.autoPlay(), _.$slider.trigger("reInit", [ _ ]);
    }, Slick.prototype.resize = function() {
        var _ = this;
        $(window).width() !== _.windowWidth && (clearTimeout(_.windowDelay), _.windowDelay = window.setTimeout(function() {
            _.windowWidth = $(window).width(), _.checkResponsive(), _.unslicked || _.setPosition();
        }, 50));
    }, Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {
        var _ = this;
        if (index = "boolean" == typeof index ? !0 === (removeBefore = index) ? 0 : _.slideCount - 1 : !0 === removeBefore ? --index : index, 
        _.slideCount < 1 || index < 0 || index > _.slideCount - 1) return !1;
        _.unload(), !0 === removeAll ? _.$slideTrack.children().remove() : _.$slideTrack.children(this.options.slide).eq(index).remove(), 
        _.$slides = _.$slideTrack.children(this.options.slide), _.$slideTrack.children(this.options.slide).detach(), 
        _.$slideTrack.append(_.$slides), _.$slidesCache = _.$slides, _.reinit();
    }, Slick.prototype.setCSS = function(position) {
        var x, y, _ = this, positionProps = {};
        !0 === _.options.rtl && (position = -position), x = "left" == _.positionProp ? Math.ceil(position) + "px" : "0px", 
        y = "top" == _.positionProp ? Math.ceil(position) + "px" : "0px", positionProps[_.positionProp] = position, 
        !1 === _.transformsEnabled || (!(positionProps = {}) === _.cssTransitions ? positionProps[_.animType] = "translate(" + x + ", " + y + ")" : positionProps[_.animType] = "translate3d(" + x + ", " + y + ", 0px)"), 
        _.$slideTrack.css(positionProps);
    }, Slick.prototype.setDimensions = function() {
        var _ = this;
        !1 === _.options.vertical ? !0 === _.options.centerMode && _.$list.css({
            padding: "0px " + _.options.centerPadding
        }) : (_.$list.height(_.$slides.first().outerHeight(!0) * _.options.slidesToShow), 
        !0 === _.options.centerMode && _.$list.css({
            padding: _.options.centerPadding + " 0px"
        })), _.listWidth = _.$list.width(), _.listHeight = _.$list.height(), !1 === _.options.vertical && !1 === _.options.variableWidth ? (_.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow), 
        _.$slideTrack.width(Math.ceil(_.slideWidth * _.$slideTrack.children(".slick-slide").length))) : !0 === _.options.variableWidth ? _.$slideTrack.width(5e3 * _.slideCount) : (_.slideWidth = Math.ceil(_.listWidth), 
        _.$slideTrack.height(Math.ceil(_.$slides.first().outerHeight(!0) * _.$slideTrack.children(".slick-slide").length)));
        var offset = _.$slides.first().outerWidth(!0) - _.$slides.first().width();
        !1 === _.options.variableWidth && _.$slideTrack.children(".slick-slide").width(_.slideWidth - offset);
    }, Slick.prototype.setFade = function() {
        var targetLeft, _ = this;
        _.$slides.each(function(index, element) {
            targetLeft = _.slideWidth * index * -1, !0 === _.options.rtl ? $(element).css({
                position: "relative",
                right: targetLeft,
                top: 0,
                zIndex: _.options.zIndex - 2,
                opacity: 0
            }) : $(element).css({
                position: "relative",
                left: targetLeft,
                top: 0,
                zIndex: _.options.zIndex - 2,
                opacity: 0
            });
        }), _.$slides.eq(_.currentSlide).css({
            zIndex: _.options.zIndex - 1,
            opacity: 1
        });
    }, Slick.prototype.setHeight = function() {
        var _ = this;
        if (1 === _.options.slidesToShow && !0 === _.options.adaptiveHeight && !1 === _.options.vertical) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(!0);
            _.$list.css("height", targetHeight);
        }
    }, Slick.prototype.setOption = Slick.prototype.slickSetOption = function() {
        var l, item, option, value, type, _ = this, refresh = !1;
        if ("object" === $.type(arguments[0]) ? (option = arguments[0], refresh = arguments[1], 
        type = "multiple") : "string" === $.type(arguments[0]) && (value = arguments[1], 
        refresh = arguments[2], "responsive" === (option = arguments[0]) && "array" === $.type(arguments[1]) ? type = "responsive" : void 0 !== arguments[1] && (type = "single")), 
        "single" === type) _.options[option] = value; else if ("multiple" === type) $.each(option, function(opt, val) {
            _.options[opt] = val;
        }); else if ("responsive" === type) for (item in value) if ("array" !== $.type(_.options.responsive)) _.options.responsive = [ value[item] ]; else {
            for (l = _.options.responsive.length - 1; 0 <= l; ) _.options.responsive[l].breakpoint === value[item].breakpoint && _.options.responsive.splice(l, 1), 
            l--;
            _.options.responsive.push(value[item]);
        }
        refresh && (_.unload(), _.reinit());
    }, Slick.prototype.setPosition = function() {
        var _ = this;
        _.setDimensions(), _.setHeight(), !1 === _.options.fade ? _.setCSS(_.getLeft(_.currentSlide)) : _.setFade(), 
        _.$slider.trigger("setPosition", [ _ ]);
    }, Slick.prototype.setProps = function() {
        var _ = this, bodyStyle = document.body.style;
        _.positionProp = !0 === _.options.vertical ? "top" : "left", "top" === _.positionProp ? _.$slider.addClass("slick-vertical") : _.$slider.removeClass("slick-vertical"), 
        void 0 === bodyStyle.WebkitTransition && void 0 === bodyStyle.MozTransition && void 0 === bodyStyle.msTransition || !0 === _.options.useCSS && (_.cssTransitions = !0), 
        _.options.fade && ("number" == typeof _.options.zIndex ? _.options.zIndex < 3 && (_.options.zIndex = 3) : _.options.zIndex = _.defaults.zIndex), 
        void 0 !== bodyStyle.OTransform && (_.animType = "OTransform", _.transformType = "-o-transform", 
        _.transitionType = "OTransition", void 0 === bodyStyle.perspectiveProperty && void 0 === bodyStyle.webkitPerspective && (_.animType = !1)), 
        void 0 !== bodyStyle.MozTransform && (_.animType = "MozTransform", _.transformType = "-moz-transform", 
        _.transitionType = "MozTransition", void 0 === bodyStyle.perspectiveProperty && void 0 === bodyStyle.MozPerspective && (_.animType = !1)), 
        void 0 !== bodyStyle.webkitTransform && (_.animType = "webkitTransform", _.transformType = "-webkit-transform", 
        _.transitionType = "webkitTransition", void 0 === bodyStyle.perspectiveProperty && void 0 === bodyStyle.webkitPerspective && (_.animType = !1)), 
        void 0 !== bodyStyle.msTransform && (_.animType = "msTransform", _.transformType = "-ms-transform", 
        _.transitionType = "msTransition", void 0 === bodyStyle.msTransform && (_.animType = !1)), 
        void 0 !== bodyStyle.transform && !1 !== _.animType && (_.animType = "transform", 
        _.transformType = "transform", _.transitionType = "transition"), _.transformsEnabled = _.options.useTransform && null !== _.animType && !1 !== _.animType;
    }, Slick.prototype.setSlideClasses = function(index) {
        var centerOffset, allSlides, indexOffset, remainder, _ = this;
        if (allSlides = _.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true"), 
        _.$slides.eq(index).addClass("slick-current"), !0 === _.options.centerMode) {
            var evenCoef = _.options.slidesToShow % 2 == 0 ? 1 : 0;
            centerOffset = Math.floor(_.options.slidesToShow / 2), !0 === _.options.infinite && (centerOffset <= index && index <= _.slideCount - 1 - centerOffset ? _.$slides.slice(index - centerOffset + evenCoef, index + centerOffset + 1).addClass("slick-active").attr("aria-hidden", "false") : (indexOffset = _.options.slidesToShow + index, 
            allSlides.slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2).addClass("slick-active").attr("aria-hidden", "false")), 
            0 === index ? allSlides.eq(allSlides.length - 1 - _.options.slidesToShow).addClass("slick-center") : index === _.slideCount - 1 && allSlides.eq(_.options.slidesToShow).addClass("slick-center")), 
            _.$slides.eq(index).addClass("slick-center");
        } else 0 <= index && index <= _.slideCount - _.options.slidesToShow ? _.$slides.slice(index, index + _.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : allSlides.length <= _.options.slidesToShow ? allSlides.addClass("slick-active").attr("aria-hidden", "false") : (remainder = _.slideCount % _.options.slidesToShow, 
        indexOffset = !0 === _.options.infinite ? _.options.slidesToShow + index : index, 
        _.options.slidesToShow == _.options.slidesToScroll && _.slideCount - index < _.options.slidesToShow ? allSlides.slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder).addClass("slick-active").attr("aria-hidden", "false") : allSlides.slice(indexOffset, indexOffset + _.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
        "ondemand" !== _.options.lazyLoad && "anticipated" !== _.options.lazyLoad || _.lazyLoad();
    }, Slick.prototype.setupInfinite = function() {
        var i, slideIndex, infiniteCount, _ = this;
        if (!0 === _.options.fade && (_.options.centerMode = !1), !0 === _.options.infinite && !1 === _.options.fade && (slideIndex = null, 
        _.slideCount > _.options.slidesToShow)) {
            for (infiniteCount = !0 === _.options.centerMode ? _.options.slidesToShow + 1 : _.options.slidesToShow, 
            i = _.slideCount; i > _.slideCount - infiniteCount; i -= 1) slideIndex = i - 1, 
            $(_.$slides[slideIndex]).clone(!0).attr("id", "").attr("data-slick-index", slideIndex - _.slideCount).prependTo(_.$slideTrack).addClass("slick-cloned");
            for (i = 0; i < infiniteCount + _.slideCount; i += 1) slideIndex = i, $(_.$slides[slideIndex]).clone(!0).attr("id", "").attr("data-slick-index", slideIndex + _.slideCount).appendTo(_.$slideTrack).addClass("slick-cloned");
            _.$slideTrack.find(".slick-cloned").find("[id]").each(function() {
                $(this).attr("id", "");
            });
        }
    }, Slick.prototype.interrupt = function(toggle) {
        toggle || this.autoPlay(), this.interrupted = toggle;
    }, Slick.prototype.selectHandler = function(event) {
        var _ = this, targetElement = $(event.target).is(".slick-slide") ? $(event.target) : $(event.target).parents(".slick-slide"), index = parseInt(targetElement.attr("data-slick-index"));
        index = index || 0, _.slideCount <= _.options.slidesToShow ? _.slideHandler(index, !1, !0) : _.slideHandler(index);
    }, Slick.prototype.slideHandler = function(index, sync, dontAnimate) {
        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft, navTarget, _ = this;
        if (sync = sync || !1, !(!0 === _.animating && !0 === _.options.waitForAnimate || !0 === _.options.fade && _.currentSlide === index)) if (!1 === sync && _.asNavFor(index), 
        targetSlide = index, targetLeft = _.getLeft(targetSlide), slideLeft = _.getLeft(_.currentSlide), 
        _.currentLeft = null === _.swipeLeft ? slideLeft : _.swipeLeft, !1 === _.options.infinite && !1 === _.options.centerMode && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) !1 === _.options.fade && (targetSlide = _.currentSlide, 
        !0 !== dontAnimate && _.slideCount > _.options.slidesToShow ? _.animateSlide(slideLeft, function() {
            _.postSlide(targetSlide);
        }) : _.postSlide(targetSlide)); else if (!1 === _.options.infinite && !0 === _.options.centerMode && (index < 0 || index > _.slideCount - _.options.slidesToScroll)) !1 === _.options.fade && (targetSlide = _.currentSlide, 
        !0 !== dontAnimate && _.slideCount > _.options.slidesToShow ? _.animateSlide(slideLeft, function() {
            _.postSlide(targetSlide);
        }) : _.postSlide(targetSlide)); else {
            if (_.options.autoplay && clearInterval(_.autoPlayTimer), animSlide = targetSlide < 0 ? _.slideCount % _.options.slidesToScroll != 0 ? _.slideCount - _.slideCount % _.options.slidesToScroll : _.slideCount + targetSlide : targetSlide >= _.slideCount ? _.slideCount % _.options.slidesToScroll != 0 ? 0 : targetSlide - _.slideCount : targetSlide, 
            _.animating = !0, _.$slider.trigger("beforeChange", [ _, _.currentSlide, animSlide ]), 
            oldSlide = _.currentSlide, _.currentSlide = animSlide, _.setSlideClasses(_.currentSlide), 
            _.options.asNavFor && (navTarget = (navTarget = _.getNavTarget()).slick("getSlick")).slideCount <= navTarget.options.slidesToShow && navTarget.setSlideClasses(_.currentSlide), 
            _.updateDots(), _.updateArrows(), !0 === _.options.fade) return !0 !== dontAnimate ? (_.fadeSlideOut(oldSlide), 
            _.fadeSlide(animSlide, function() {
                _.postSlide(animSlide);
            })) : _.postSlide(animSlide), void _.animateHeight();
            !0 !== dontAnimate && _.slideCount > _.options.slidesToShow ? _.animateSlide(targetLeft, function() {
                _.postSlide(animSlide);
            }) : _.postSlide(animSlide);
        }
    }, Slick.prototype.startLoad = function() {
        var _ = this;
        !0 === _.options.arrows && _.slideCount > _.options.slidesToShow && (_.$prevArrow.hide(), 
        _.$nextArrow.hide()), !0 === _.options.dots && _.slideCount > _.options.slidesToShow && _.$dots.hide(), 
        _.$slider.addClass("slick-loading");
    }, Slick.prototype.swipeDirection = function() {
        var xDist, yDist, r, swipeAngle, _ = this;
        return xDist = _.touchObject.startX - _.touchObject.curX, yDist = _.touchObject.startY - _.touchObject.curY, 
        r = Math.atan2(yDist, xDist), (swipeAngle = Math.round(180 * r / Math.PI)) < 0 && (swipeAngle = 360 - Math.abs(swipeAngle)), 
        swipeAngle <= 45 && 0 <= swipeAngle ? !1 === _.options.rtl ? "left" : "right" : swipeAngle <= 360 && 315 <= swipeAngle ? !1 === _.options.rtl ? "left" : "right" : 135 <= swipeAngle && swipeAngle <= 225 ? !1 === _.options.rtl ? "right" : "left" : !0 === _.options.verticalSwiping ? 35 <= swipeAngle && swipeAngle <= 135 ? "down" : "up" : "vertical";
    }, Slick.prototype.swipeEnd = function(event) {
        var slideCount, direction, _ = this;
        if (_.dragging = !1, _.swiping = !1, _.scrolling) return _.scrolling = !1;
        if (_.interrupted = !1, _.shouldClick = !(10 < _.touchObject.swipeLength), void 0 === _.touchObject.curX) return !1;
        if (!0 === _.touchObject.edgeHit && _.$slider.trigger("edge", [ _, _.swipeDirection() ]), 
        _.touchObject.swipeLength >= _.touchObject.minSwipe) {
            switch (direction = _.swipeDirection()) {
              case "left":
              case "down":
                slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide + _.getSlideCount()) : _.currentSlide + _.getSlideCount(), 
                _.currentDirection = 0;
                break;

              case "right":
              case "up":
                slideCount = _.options.swipeToSlide ? _.checkNavigable(_.currentSlide - _.getSlideCount()) : _.currentSlide - _.getSlideCount(), 
                _.currentDirection = 1;
            }
            "vertical" != direction && (_.slideHandler(slideCount), _.touchObject = {}, _.$slider.trigger("swipe", [ _, direction ]));
        } else _.touchObject.startX !== _.touchObject.curX && (_.slideHandler(_.currentSlide), 
        _.touchObject = {});
    }, Slick.prototype.swipeHandler = function(event) {
        var _ = this;
        if (!(!1 === _.options.swipe || "ontouchend" in document && !1 === _.options.swipe || !1 === _.options.draggable && -1 !== event.type.indexOf("mouse"))) switch (_.touchObject.fingerCount = event.originalEvent && void 0 !== event.originalEvent.touches ? event.originalEvent.touches.length : 1, 
        _.touchObject.minSwipe = _.listWidth / _.options.touchThreshold, !0 === _.options.verticalSwiping && (_.touchObject.minSwipe = _.listHeight / _.options.touchThreshold), 
        event.data.action) {
          case "start":
            _.swipeStart(event);
            break;

          case "move":
            _.swipeMove(event);
            break;

          case "end":
            _.swipeEnd(event);
        }
    }, Slick.prototype.swipeMove = function(event) {
        var curLeft, swipeDirection, swipeLength, positionOffset, touches, verticalSwipeLength, _ = this;
        return touches = void 0 !== event.originalEvent ? event.originalEvent.touches : null, 
        !(!_.dragging || _.scrolling || touches && 1 !== touches.length) && (curLeft = _.getLeft(_.currentSlide), 
        _.touchObject.curX = void 0 !== touches ? touches[0].pageX : event.clientX, _.touchObject.curY = void 0 !== touches ? touches[0].pageY : event.clientY, 
        _.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curX - _.touchObject.startX, 2))), 
        verticalSwipeLength = Math.round(Math.sqrt(Math.pow(_.touchObject.curY - _.touchObject.startY, 2))), 
        !_.options.verticalSwiping && !_.swiping && 4 < verticalSwipeLength ? !(_.scrolling = !0) : (!0 === _.options.verticalSwiping && (_.touchObject.swipeLength = verticalSwipeLength), 
        swipeDirection = _.swipeDirection(), void 0 !== event.originalEvent && 4 < _.touchObject.swipeLength && (_.swiping = !0, 
        event.preventDefault()), positionOffset = (!1 === _.options.rtl ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1), 
        !0 === _.options.verticalSwiping && (positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1), 
        swipeLength = _.touchObject.swipeLength, (_.touchObject.edgeHit = !1) === _.options.infinite && (0 === _.currentSlide && "right" === swipeDirection || _.currentSlide >= _.getDotCount() && "left" === swipeDirection) && (swipeLength = _.touchObject.swipeLength * _.options.edgeFriction, 
        _.touchObject.edgeHit = !0), !1 === _.options.vertical ? _.swipeLeft = curLeft + swipeLength * positionOffset : _.swipeLeft = curLeft + swipeLength * (_.$list.height() / _.listWidth) * positionOffset, 
        !0 === _.options.verticalSwiping && (_.swipeLeft = curLeft + swipeLength * positionOffset), 
        !0 !== _.options.fade && !1 !== _.options.touchMove && (!0 === _.animating ? (_.swipeLeft = null, 
        !1) : void _.setCSS(_.swipeLeft))));
    }, Slick.prototype.swipeStart = function(event) {
        var touches, _ = this;
        if (_.interrupted = !0, 1 !== _.touchObject.fingerCount || _.slideCount <= _.options.slidesToShow) return !(_.touchObject = {});
        void 0 !== event.originalEvent && void 0 !== event.originalEvent.touches && (touches = event.originalEvent.touches[0]), 
        _.touchObject.startX = _.touchObject.curX = void 0 !== touches ? touches.pageX : event.clientX, 
        _.touchObject.startY = _.touchObject.curY = void 0 !== touches ? touches.pageY : event.clientY, 
        _.dragging = !0;
    }, Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {
        var _ = this;
        null !== _.$slidesCache && (_.unload(), _.$slideTrack.children(this.options.slide).detach(), 
        _.$slidesCache.appendTo(_.$slideTrack), _.reinit());
    }, Slick.prototype.unload = function() {
        var _ = this;
        $(".slick-cloned", _.$slider).remove(), _.$dots && _.$dots.remove(), _.$prevArrow && _.htmlExpr.test(_.options.prevArrow) && _.$prevArrow.remove(), 
        _.$nextArrow && _.htmlExpr.test(_.options.nextArrow) && _.$nextArrow.remove(), _.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "");
    }, Slick.prototype.unslick = function(fromBreakpoint) {
        var _ = this;
        _.$slider.trigger("unslick", [ _, fromBreakpoint ]), _.destroy();
    }, Slick.prototype.updateArrows = function() {
        var _ = this;
        Math.floor(_.options.slidesToShow / 2), !0 === _.options.arrows && _.slideCount > _.options.slidesToShow && !_.options.infinite && (_.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 
        _.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === _.currentSlide ? (_.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), 
        _.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : _.currentSlide >= _.slideCount - _.options.slidesToShow && !1 === _.options.centerMode ? (_.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), 
        _.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : _.currentSlide >= _.slideCount - 1 && !0 === _.options.centerMode && (_.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), 
        _.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")));
    }, Slick.prototype.updateDots = function() {
        var _ = this;
        null !== _.$dots && (_.$dots.find("li").removeClass("slick-active").end(), _.$dots.find("li").eq(Math.floor(_.currentSlide / _.options.slidesToScroll)).addClass("slick-active"));
    }, Slick.prototype.visibility = function() {
        var _ = this;
        _.options.autoplay && (document[_.hidden] ? _.interrupted = !0 : _.interrupted = !1);
    }, $.fn.slick = function() {
        var i, ret, _ = this, opt = arguments[0], args = Array.prototype.slice.call(arguments, 1), l = _.length;
        for (i = 0; i < l; i++) if ("object" == typeof opt || void 0 === opt ? _[i].slick = new Slick(_[i], opt) : ret = _[i].slick[opt].apply(_[i].slick, args), 
        void 0 !== ret) return ret;
        return _;
    };
}), 
/*
    The MIT License (MIT)

    Copyright (c) 2014 Dirk Groenen

    Permission is hereby granted, free of charge, to any person obtaining a copy of
    this software and associated documentation files (the "Software"), to deal in
    the Software without restriction, including without limitation the rights to
    use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
    the Software, and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
*/
function($) {
    $.fn.viewportChecker = function(useroptions) {
        // Define options and extend with user
        var options = {
            classToAdd: "visible",
            classToRemove: "invisible",
            classToAddForFullView: "full-visible",
            removeClassAfterAnimation: !1,
            offset: 100,
            repeat: !1,
            invertBottomOffset: !0,
            callbackFunction: function(elem, action) {},
            scrollHorizontal: !1,
            scrollBox: window
        };
        $.extend(options, useroptions);
        // Cache the given element and height of the browser
        var $elem = this, boxSize = {
            height: $(options.scrollBox).height(),
            width: $(options.scrollBox).width()
        };
        /*
         * Main method that checks the elements and adds or removes the class(es)
         */        
        // Default jquery plugin behaviour
        return this.checkElements = function() {
            var viewportStart, viewportEnd;
            // Set some vars to check with
                        viewportEnd = options.scrollHorizontal ? (viewportStart = Math.max($("html").scrollLeft(), $("body").scrollLeft(), $(window).scrollLeft())) + boxSize.width : (viewportStart = Math.max($("html").scrollTop(), $("body").scrollTop(), $(window).scrollTop())) + boxSize.height, 
            // Loop through all given dom elements
            $elem.each(function() {
                var $obj = $(this), objOptions = {}, attrOptions = {};
                //  Get any individual attribution data
                                // If class already exists; quit
                if ($obj.data("vp-add-class") && (attrOptions.classToAdd = $obj.data("vp-add-class")), 
                $obj.data("vp-remove-class") && (attrOptions.classToRemove = $obj.data("vp-remove-class")), 
                $obj.data("vp-add-class-full-view") && (attrOptions.classToAddForFullView = $obj.data("vp-add-class-full-view")), 
                $obj.data("vp-keep-add-class") && (attrOptions.removeClassAfterAnimation = $obj.data("vp-remove-after-animation")), 
                $obj.data("vp-offset") && (attrOptions.offset = $obj.data("vp-offset")), $obj.data("vp-repeat") && (attrOptions.repeat = $obj.data("vp-repeat")), 
                $obj.data("vp-scrollHorizontal") && (attrOptions.scrollHorizontal = $obj.data("vp-scrollHorizontal")), 
                $obj.data("vp-invertBottomOffset") && (attrOptions.scrollHorizontal = $obj.data("vp-invertBottomOffset")), 
                // Extend objOptions with data attributes and default options
                $.extend(objOptions, options), $.extend(objOptions, attrOptions), !$obj.data("vp-animated") || objOptions.repeat) {
                    // Check if the offset is percentage based
                    0 < String(objOptions.offset).indexOf("%") && (objOptions.offset = parseInt(objOptions.offset) / 100 * boxSize.height);
                    // Get the raw start and end positions
                                        var rawStart = objOptions.scrollHorizontal ? $obj.offset().left : $obj.offset().top, rawEnd = objOptions.scrollHorizontal ? rawStart + $obj.width() : rawStart + $obj.height(), elemStart = Math.round(rawStart) + objOptions.offset, elemEnd = objOptions.scrollHorizontal ? elemStart + $obj.width() : elemStart + $obj.height();
                    // Add the defined offset
                                        objOptions.invertBottomOffset && (elemEnd -= 2 * objOptions.offset), 
                    // Add class if in viewport
                    elemStart < viewportEnd && viewportStart < elemEnd ? (
                    // Remove class
                    $obj.removeClass(objOptions.classToRemove), $obj.addClass(objOptions.classToAdd), 
                    // Do the callback function. Callback wil send the jQuery object as parameter
                    objOptions.callbackFunction($obj, "add"), 
                    // Check if full element is in view
                    rawEnd <= viewportEnd && viewportStart <= rawStart ? $obj.addClass(objOptions.classToAddForFullView) : $obj.removeClass(objOptions.classToAddForFullView), 
                    // Set element as already animated
                    $obj.data("vp-animated", !0), objOptions.removeClassAfterAnimation && $obj.one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function() {
                        $obj.removeClass(objOptions.classToAdd);
                    })) : $obj.hasClass(objOptions.classToAdd) && objOptions.repeat && ($obj.removeClass(objOptions.classToAdd + " " + objOptions.classToAddForFullView), 
                    // Do the callback function.
                    objOptions.callbackFunction($obj, "remove"), 
                    // Remove already-animated-flag
                    $obj.data("vp-animated", !1));
                }
            });
        }, 
        /**
         * Binding the correct event listener is still a tricky thing.
         * People have expierenced sloppy scrolling when both scroll and touch
         * events are added, but to make sure devices with both scroll and touch
         * are handles too we always have to add the window.scroll event
         *
         * @see  https://github.com/dirkgroenen/jQuery-viewport-checker/issues/25
         * @see  https://github.com/dirkgroenen/jQuery-viewport-checker/issues/27
         */
        // Select the correct events
        ("ontouchstart" in window || "onmsgesturechange" in window) && 
        // Device with touchscreen
        $(document).bind("touchmove MSPointerMove pointermove", this.checkElements), 
        // Always load on window load
        $(options.scrollBox).bind("load scroll", this.checkElements), 
        // On resize change the height var
        $(window).resize(function(e) {
            boxSize = {
                height: $(options.scrollBox).height(),
                width: $(options.scrollBox).width()
            }, $elem.checkElements();
        }), 
        // trigger inital check if elements already visible
        this.checkElements(), this;
    };
}(jQuery), 
/*
 * LucidScroll
 * 
 * Created by Shikkediel (c) 2013-2019 ataredo.com
 * 
 * Version 3.4.3
 *
 * Requires jQuery 1.8.0+
 * Includes easing equations
 *
 */
function($, nib) {
    $.fn.impulse = function(options) {
        var entity, morph, way, speed, set = $.extend({}, $.fn.impulse.default, options), gate = $(nib), vessel = this, object = $(set.target), area = {}, edge = [], fad = {}, brink = [], outset = [], quit = [], destined = [], pour = "requestAnimationFrame", use = $.extend({
            novel: pour in nib,
            turned: 0
        }, set);
        return function() {
            var item = $();
            object.length || (use.crux = !0, object = vessel);
            object.each(function() {
                $.zenith(this) ? use.main || (use.novel ? use.main = nib : use.main = function() {
                    var origin = gate.scrollTop();
                    if (gate.scrollTop(1), $("html").scrollTop()) var root = "html"; else root = $("body").scrollTop() ? "body" : "html, body";
                    return gate.scrollTop(origin), root;
                }(), item = item.add(use.main)) : item = item.add(this);
            }), use.target = object = item, object.each(function(zest) {
                $.zenith(this) ? area[zest] = "hub" : area[zest] = "sub";
            }), use.crux && use.main && (vessel = object);
            detectOverflow();
        }(), vessel.each(function(hit) {
            use = $.extend({}, use), $(this).data("impulse", use).on("wheel.excite", function(act, info) {
                if (use.keen || act.mien) {
                    if (act.mien) {
                        fad = $.extend({}, use, info), use.annul = 1 == fad.delay;
                        var loom = act.mien;
                        fad.fluid = !1;
                    } else {
                        if (use.annul) return;
                        fad = use, loom = act.originalEvent.deltaY;
                    }
                    loom /= Math.abs(loom), use.crux ? (entity = $(this), brink[0] = edge[hit]) : (entity = object, 
                    brink = edge), $.each({
                        range: "orbit",
                        tempo: "pace"
                    }, function(slot, mate) {
                        "function" == typeof fad[slot] ? fad[mate] = fad[slot]() : fad[mate] = fad[slot];
                    }), loom != use.zeal || act.mien ? use.turned = 1 : use.turned = Math.min(use.curb, use.turned + 1), 
                    morph = !fad.delay && fad.fluid && 1 == use.turned ? "curve" : fad.effect, way = loom * fad.orbit * Math.pow(use.leap, use.turned - 1), 
                    speed = fad.pace * Math.pow(use.sloth, use.turned - 1) || 1, use.zeal = loom, entity.each(function(part) {
                        outset[part] = $(this).scrollTop(), destined[part] = outset[part] + way, quit[part] = onFringe(this, part, outset[part]);
                    }), use.waive = ceaseOperation(), way || (speed = 1), use.novel ? (use.motion ? (cancelAnimationFrame(use.motion), 
                    use.initial = use.present) : use.initial = Date.now(), use.motion = nib[pour](streamCore)) : entity.each(function(beat) {
                        quit[beat] || $(this).stop().animate({
                            scrollTop: destined[beat]
                        }, {
                            duration: speed,
                            easing: morph,
                            progress: function(current, sequence) {
                                checkLimits(this, beat, sequence);
                            },
                            complete: hindStage
                        });
                    });
                }
            }), this.addEventListener("wheel", function(tick) {
                if (use.keen) {
                    if (use.annul) return denyRise(tick);
                    1 != fad.delay || use.waive || (use.annul = !0), use.waive && use.occur || denyRise(tick);
                }
            }, !!function() {
                function hike() {}
                var cold = !1;
                try {
                    var aid = Object.defineProperty({}, "passive", {
                        get: function() {
                            cold = !0;
                        }
                    });
                    nib.addEventListener("test", hike, aid), nib.removeEventListener("test", hike, aid);
                } catch (e) {}
                return cold;
            }() && {
                passive: !1
            });
        }), $.easing.curve = $.easing.easeInOutSine, gate.resize(function() {
            clearTimeout(use.bound), use.bound = setTimeout(detectOverflow, 100);
        }), this;
        function streamCore() {
            use.present = Date.now();
            var advance = Math.min(use.present - use.initial, speed) / speed, increase = $.easing[morph](advance);
            entity.each(function(key) {
                quit[key] || ($(this).scrollTop(outset[key] + increase * way), checkLimits(this, key, advance));
            }), advance < 1 && !use.waive ? use.motion = nib[pour](streamCore) : hindStage();
        }
        function checkLimits(essence, rank, factor) {
            100 * factor >= fad.reset && (use.turned = 0), onFringe(essence, rank) && (quit[rank] = !0, 
            use.novel || $(essence).stop(!0, !0), use.waive = ceaseOperation());
        }
        function onFringe(matter, cue, genesis) {
            var put = Math.round(genesis || $(matter).scrollTop()), above = destined[cue] < 0 && !put, below = destined[cue] > brink[cue] && put == brink[cue] && 0 < fad.orbit;
            return above || below;
        }
        function ceaseOperation() {
            return quit.every(function(flag) {
                return flag;
            });
        }
        function hindStage() {
            use.turned = use.annul = use.motion = 0;
        }
        function denyRise(jab) {
            jab.preventDefault(), jab.stopPropagation();
        }
        function detectOverflow() {
            object.each(function(peg) {
                if ("hub" == area[peg]) var teem = $(document).height() - gate.height(); else teem = this.scrollHeight - $(this).height();
                edge[peg] = Math.round(teem);
            });
        }
    }, $.zenith = function(sample) {
        var facet, peak = [ nib, document, "HTML", "BODY" ];
        return sample ? -1 < peak.indexOf(sample) || -1 < peak.indexOf(sample.tagName) : ($.each(peak, function(spot, detail) {
            if (facet = $(detail).data("impulse")) return !1;
        }), facet);
    }, $.fn.impulse.default = {
        target: "",
        range: 135,
        leap: 1.35,
        tempo: 500,
        sloth: 1.1,
        curb: 5,
        reset: 85,
        effect: "easeOutSine",
        keen: !0,
        delay: !1,
        occur: !0,
        fluid: !0
    }, $.fn.demit = function() {
        return this.each(function() {
            if ($.zenith(this)) var habit = $.zenith(); else habit = $(this).data("impulse");
            habit && (habit.novel ? cancelAnimationFrame(habit.motion) : habit.target.stop(), 
            habit.turned = habit.annul = habit.motion = 0);
        });
    }, $.fn.amend = function(gist) {
        return this.each(function() {
            if ($.zenith(this)) var quirk = $.zenith(); else quirk = $(this).data("impulse");
            quirk && $.each(gist, function(sign, rate) {
                sign in quirk && (quirk[sign] = rate);
            });
        });
    }, $.fn.evoke = function(unit) {
        var bulk, lot = $.Event("wheel.excite", {
            mien: !0
        });
        return this.each(function() {
            $.zenith(this) ? bulk || (bulk = $.zenith()) && $(bulk.main).trigger(lot, unit) : $(this).trigger(lot, unit);
        });
    };
}(jQuery, window), 
/*
 * THIS SOFTWARE IS PROVIDED BY THE CONTRIBUTORS "AS IS" THROUGH OPEN SOURCE AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL
 * THE CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY OR
 * CONSEQUENTIAL DAMAGES (INCLUDING BUT NOT LIMITED TO PROCUREMENT OF SUBSTITUTE GOODS
 * OR SERVICES, LOSS OF USE, DATA, PROFITS OR BUSINESS INTERRUPTION) HOWEVER CAUSED
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF
 * ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */
// Based on easing equations from Robert Penner - robertpenner.com/easing
function($) {
    var b = {};
    $.each([ "Quad", "Cubic", "Quart", "Quint", "Expo" ], function(i, n) {
        b[n] = function(p) {
            return Math.pow(p, i + 2);
        };
    }), $.extend(b, {
        Sine: function(p) {
            return 1 - Math.cos(p * Math.PI / 2);
        },
        Circ: function(p) {
            return 1 - Math.sqrt(1 - p * p);
        },
        Elastic: function(p) {
            return 0 === p || 1 === p ? p : -Math.pow(2, 8 * (p - 1)) * Math.sin((80 * (p - 1) - 7.5) * Math.PI / 15);
        },
        Back: function(p) {
            return p * p * (3 * p - 2);
        },
        Bounce: function(p) {
            for (var f, h = 4; p < ((f = Math.pow(2, --h)) - 1) / 11; ) ;
            return 1 / Math.pow(4, 3 - h) - 7.5625 * Math.pow((3 * f - 2) / 22 - p, 2);
        }
    }), $.each(b, function(n, e) {
        $.easing["easeIn" + n] = e, $.easing["easeOut" + n] = function(p) {
            return 1 - e(1 - p);
        }, $.easing["easeInOut" + n] = function(p) {
            return p < .5 ? e(2 * p) / 2 : 1 - e(-2 * p + 2) / 2;
        };
    });
}(jQuery), 
//-------- -------- -------- --------
//-------- included js libs end
//-------- -------- -------- --------
//-------- -------- -------- --------
//-------- js custom start
//-------- -------- -------- --------
// page init
$(window).on("load", function() {
    $(this).impulse();
}), jQuery(function() {
    initMobileNav(), initAnchors();
}), 
// function jsActive(arg) {
//   console.log(arg);
// };
//slick
jQuery(document).ready(function($) {
    $(".slider").slick({
        dots: !0,
        dotsClass: "custom-dots",
        infinite: !0,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: !1,
        autoplaySpeed: 2e3,
        arrows: !1,
        fade: !0,
        cssEase: "linear"
    });
}), 
//Parallax
jQuery(function() {
    jQuery(".bg-stretch").parallaxBlock({
        parallaxOffset: -50,
        fallbackClass: "fallback-class"
    });
}), function($) {
    "use strict";
    var $win, items, winProps, isTouchDevice = /MSIE 10.*Touch/.test(navigator.userAgent) || "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch, ParallaxController = ($win = $(window), 
    items = [], winProps = {
        width: 0,
        height: 0,
        scrollTop: 0
    }, {
        init: function() {
            $win.on("load resize orientationchange", this.resizeHandler.bind(this)), $win.on("scroll", this.scrollHandler.bind(this)), 
            this.resizeHandler();
        },
        resizeHandler: function() {
            winProps.width = $win.width(), winProps.height = $win.height(), $.each(items, this.calculateSize.bind(this));
        },
        scrollHandler: function() {
            winProps.scrollTop = $win.scrollTop(), $.each(items, this.calculateScroll.bind(this));
        },
        calculateSize: function(i) {
            var bgWidth, bgHeight, item = items[i];
            item.height = item.$el.outerHeight(), item.width = item.$el.outerWidth(), item.topOffset = item.$el.offset().top, 
            item.bgHeight = winProps.height + item.options.parallaxOffset, item.itemRatio = winProps.width / (winProps.height + item.options.parallaxOffset), 
            item.imageRatio <= item.itemRatio ? (bgHeight = (bgWidth = winProps.width) / item.imageRatio, 
            bgWidth += "px ") : (bgWidth = "auto ", bgHeight = winProps.height + item.options.parallaxOffset), 
            bgHeight += "px ", item.$el.css({
                backgroundSize: bgWidth + bgHeight
            }), this.calculateScroll(i);
        },
        calculateScroll: function(i) {
            var curPos, item = items[i], offsetPercentage = Math.max(0, Math.min((winProps.scrollTop + winProps.height - item.topOffset) / (winProps.height + item.height), 1)).toFixed(4);
            curPos = item.imageRatio <= item.itemRatio ? "50% " + (-parseFloat(offsetPercentage) * item.options.parallaxOffset - (item.bgHeight - winProps.height) / 2) + "px" : "50% " + -parseFloat(offsetPercentage) * item.options.parallaxOffset + "px", 
            item.$el.css({
                backgroundPosition: curPos
            });
        },
        add: function(el, options) {
            var $el = $(el), $image = $("#img-parallax"), imageRatio = $image.attr("width") / $image.attr("height") || $image.width() / $image.height();
            if ($el.css({
                backgroundImage: "url(" + $image.attr("src") + ")"
            }), isTouchDevice) $el.addClass(options.fallbackClass); else {
                $image.remove(), options.parallaxOffset = Math.abs(options.parallaxOffset);
                var newIndex = items.push({
                    $el: $(el),
                    options: options,
                    imageRatio: imageRatio
                });
                this.calculateSize(newIndex - 1);
            }
        }
    });
    ParallaxController.init(), $.fn.parallaxBlock = function(options) {
        return options = $.extend({
            parallaxOffset: 100,
            fallbackClass: "fallback-class",
            image: "img"
        }, options), this.each(function() {
            this.added || (this.added = !0, ParallaxController.add(this, options));
        });
    };
}(jQuery), 
//animate
jQuery(document).ready(function() {
    jQuery(".post").addClass("hidden-animate").viewportChecker({
        classToAdd: "visible animated fadeInDown",
        // Class to add to the elements when they are visible
        offset: 100
    });
}), function($) {
    function MobileNav(options) {
        this.options = $.extend({
            container: null,
            hideOnClickOutside: !0,
            menuActiveClass: "active",
            menuOpener: ".opener",
            menuDrop: ".drop",
            toggleEvent: "click",
            outsideClickEvent: "click touchstart pointerdown MSPointerDown"
        }, options), this.initStructure(), this.attachEvents();
    }
    MobileNav.prototype = {
        initStructure: function() {
            this.page = $("html"), this.container = $(this.options.container), this.opener = this.container.find(this.options.menuOpener), 
            this.drop = this.container.find(this.options.menuDrop);
        },
        attachEvents: function() {
            var self = this;
            activateResizeHandler && (activateResizeHandler(), activateResizeHandler = null), 
            this.outsideClickHandler = function(e) {
                if (self.isOpened()) {
                    var target = $(e.target);
                    target.closest(self.opener).length || target.closest(self.drop).length || self.hide();
                }
            }, this.openerClickHandler = function(e) {
                e.preventDefault(), self.toggle();
            }, this.opener.on(this.options.toggleEvent, this.openerClickHandler);
        },
        isOpened: function() {
            return this.container.hasClass(this.options.menuActiveClass);
        },
        show: function() {
            this.container.addClass(this.options.menuActiveClass), this.options.hideOnClickOutside && this.page.on(this.options.outsideClickEvent, this.outsideClickHandler);
        },
        hide: function() {
            this.container.removeClass(this.options.menuActiveClass), this.options.hideOnClickOutside && this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
        },
        toggle: function() {
            this.isOpened() ? this.hide() : this.show();
        },
        destroy: function() {
            this.container.removeClass(this.options.menuActiveClass), this.opener.off(this.options.toggleEvent, this.clickHandler), 
            this.page.off(this.options.outsideClickEvent, this.outsideClickHandler);
        }
    };
    var activateResizeHandler = function() {
        function removeClassHandler() {
            flag = !1, doc.removeClass("resize-active");
        }
        var flag, timer, win = $(window), doc = $("html");
        win.on("resize orientationchange", function() {
            flag || (flag = !0, doc.addClass("resize-active")), clearTimeout(timer), timer = setTimeout(removeClassHandler, 500);
        });
    };
    $.fn.mobileNav = function(options) {
        return this.each(function() {
            var instance = new MobileNav($.extend({}, options, {
                container: this
            }));
            $.data(this, "MobileNav", instance);
        });
    };
}(jQuery), function($) {
    // detect device type
    var toggleOn, toggleOff, preventHandler, isTouchDevice = "ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch, isWinPhoneDevice = /Windows Phone/.test(navigator.userAgent), eventOn = (isTouchDevice ? "touchstart" : isWinPhoneDevice && navigator.pointerEnabled && "pointerdown") || isWinPhoneDevice && navigator.msPointerEnabled && "MSPointerDown" || "mouseenter", eventOff = (isTouchDevice ? "touchend" : isWinPhoneDevice && navigator.pointerEnabled && "pointerup") || isWinPhoneDevice && navigator.msPointerEnabled && "MSPointerUp" || "mouseleave";
    // define events
        isTouchDevice || isWinPhoneDevice ? (
    // prevent click handler
    preventHandler = function(e) {
        e.preventDefault();
    }, 
    // touch device handlers
    toggleOn = function(e) {
        var options = e.data, element = $(this), toggleOff = function(e) {
            var target = $(e.target);
            target.is(element) || target.closest(element).length || (element.removeClass(options.hoverClass), 
            element.off("click", preventHandler), options.onLeave && options.onLeave(element), 
            $(document).off(eventOn, toggleOff));
        };
        element.hasClass(options.hoverClass) || (element.addClass(options.hoverClass), element.one("click", preventHandler), 
        $(document).on(eventOn, toggleOff), options.onHover && options.onHover(element));
    }) : (
    // desktop browser handlers
    toggleOn = function(e) {
        var options = e.data, element = $(this);
        element.addClass(options.hoverClass), $(options.context).on(eventOff, options.selector, options, toggleOff), 
        options.onHover && options.onHover(element);
    }, toggleOff = function(e) {
        var options = e.data, element = $(this);
        element.removeClass(options.hoverClass), $(options.context).off(eventOff, options.selector, toggleOff), 
        options.onLeave && options.onLeave(element);
    }), 
    // jQuery plugin
    $.fn.touchHover = function(opt) {
        var options = $.extend({
            context: this.context,
            selector: this.selector,
            hoverClass: "hover"
        }, opt);
        return $(this.context).on(eventOn, this.selector, options, toggleOn), this;
    };
}(jQuery), $(window).resize(function() {
    $(window).width() < 960 && ($(document).ready(function() {
        $(".menu-item").click(function() {
            $(".drop").hide(), $(".wrap").removeClass("active");
        });
    }), $(document).ready(function() {
        $(".opener").click(function() {
            $(".drop").show();
        });
    }));
}), jQuery(window).on("load", function() {}), 
/*!
  * SmoothScroll module
  */
function($, exports) {
    // private variables
    var page, activeBlock, activeWheelHandler, win = $(window), wheelEvents = "onwheel" in document || 9 <= document.documentMode ? "wheel" : "mousewheel DOMMouseScroll";
    // animation handlers
        function scrollTo(offset, options, callback) {
        // initialize variables
        var scrollBlock;
        document.body && (options = "number" == typeof options ? {
            duration: options
        } : options || {}, page = page || $("html, body"), scrollBlock = options.container || page, 
        // treat single number as scrollTop
        "number" == typeof offset && (offset = {
            top: offset
        }), 
        // handle mousewheel/trackpad while animation is active
        activeBlock && activeWheelHandler && activeBlock.off(wheelEvents, activeWheelHandler), 
        options.wheelBehavior && "none" !== options.wheelBehavior && (activeWheelHandler = function(e) {
            "stop" === options.wheelBehavior ? (scrollBlock.off(wheelEvents, activeWheelHandler), 
            scrollBlock.stop()) : "ignore" === options.wheelBehavior && e.preventDefault();
        }, activeBlock = scrollBlock.on(wheelEvents, activeWheelHandler)), 
        // start scrolling animation
        scrollBlock.stop().animate({
            scrollLeft: offset.left,
            scrollTop: offset.top
        }, options.duration, function() {
            activeWheelHandler && scrollBlock.off(wheelEvents, activeWheelHandler), $.isFunction(callback) && callback();
        }));
    }
    // smooth scroll contstructor
        function SmoothScroll(options) {
        this.options = $.extend({
            anchorLinks: 'a[href^="#"]',
            // selector or jQuery object
            container: null,
            // specify container for scrolling (default - whole page)
            extraOffset: null,
            // function or fixed number
            activeClasses: null,
            // null, "link", "parent"
            easing: "swing",
            // easing of scrolling
            animMode: "duration",
            // or "speed" mode
            animDuration: 800,
            // total duration for scroll (any distance)
            animSpeed: 1500,
            // pixels per second
            anchorActiveClass: "anchor-active",
            sectionActiveClass: "section-active",
            wheelBehavior: "stop",
            // "stop", "ignore" or "none"
            useNativeAnchorScrolling: !1
        }, options), this.init();
    }
    SmoothScroll.prototype = {
        init: function() {
            this.initStructure(), this.attachEvents(), this.isInit = !0;
        },
        initStructure: function() {
            var self = this;
            this.container = this.options.container ? $(this.options.container) : $("html,body"), 
            this.scrollContainer = this.options.container ? this.container : win, this.anchorLinks = jQuery(this.options.anchorLinks).filter(function() {
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
            return $(1 < targetId.length ? targetId : "html");
        },
        getTargetOffset: function(block) {
            // get target offset
            var blockOffset = block.offset().top;
            return this.options.container && (blockOffset -= this.container.offset().top - this.container.prop("scrollTop")), 
            // handle extra offset
            "number" == typeof this.options.extraOffset ? blockOffset -= this.options.extraOffset : "function" == typeof this.options.extraOffset && (blockOffset -= this.options.extraOffset(block)), 
            {
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
                    var link = jQuery(this.anchorLinks[i]), targetBlock = self.getAnchorTarget(link), anchorDataItem = null;
                    $.each(self.anchorData, function(index, item) {
                        item.block[0] === targetBlock[0] && (anchorDataItem = item);
                    }), anchorDataItem ? anchorDataItem.link = anchorDataItem.link.add(link) : self.anchorData.push({
                        link: link,
                        block: targetBlock
                    });
                }
                // add additional event handlers
                                this.resizeHandler = function() {
                    self.isInit && self.recalculateOffsets();
                }, this.scrollHandler = function() {
                    self.refreshActiveClass();
                }, this.recalculateOffsets(), this.scrollContainer.on("scroll", this.scrollHandler), 
                win.on("resize load orientationchange refreshAnchor", this.resizeHandler);
            }
            // handle click event
                        this.clickHandler = function(e) {
                self.onClick(e);
            }, this.options.useNativeAnchorScrolling || this.anchorLinks.on("click", this.clickHandler);
        },
        recalculateOffsets: function() {
            var self = this;
            $.each(this.anchorData, function(index, data) {
                data.offset = self.getTargetOffset(data.block), data.height = data.block.outerHeight();
            }), this.refreshActiveClass();
        },
        toggleActiveClass: function(anchor, block, state) {
            anchor.toggleClass(this.options.anchorActiveClass, state), block.toggleClass(this.options.sectionActiveClass, state);
        },
        refreshActiveClass: function() {
            var self = this, foundFlag = !1, containerHeight = this.container.prop("scrollHeight"), viewPortHeight = this.scrollContainer.height(), scrollTop = this.options.container ? this.container.prop("scrollTop") : win.scrollTop();
            // user function instead of default handler
                        this.options.customScrollHandler ? this.options.customScrollHandler.call(this, scrollTop, this.anchorData) : (
            // sort anchor data by offsets
            this.anchorData.sort(function(a, b) {
                return a.offset.top - b.offset.top;
            }), 
            // default active class handler
            $.each(this.anchorData, function(index) {
                var reverseIndex = self.anchorData.length - index - 1, data = self.anchorData[reverseIndex], anchorElement = "parent" === self.options.activeClasses ? data.link.parent() : data.link;
                containerHeight - viewPortHeight <= scrollTop ? 
                // handle last section
                reverseIndex == self.anchorData.length - 1 ? self.toggleActiveClass(anchorElement, data.block, !0) : self.toggleActiveClass(anchorElement, data.block, !1) : 
                // handle other sections
                !foundFlag && (scrollTop >= data.offset.top - 1 || 0 == reverseIndex) ? (foundFlag = !0, 
                self.toggleActiveClass(anchorElement, data.block, !0)) : self.toggleActiveClass(anchorElement, data.block, !1);
            }));
        },
        calculateScrollDuration: function(offset) {
            return "speed" === this.options.animMode ? Math.abs(this.scrollContainer.scrollTop() - offset.top) / this.options.animSpeed * 1e3 : this.options.animDuration;
        },
        onClick: function(e) {
            var targetBlock = this.getAnchorTarget(e.currentTarget), targetOffset = this.getTargetOffset(targetBlock);
            e.preventDefault(), scrollTo(targetOffset, {
                container: this.container,
                wheelBehavior: this.options.wheelBehavior,
                duration: this.calculateScrollDuration(targetOffset)
            }), this.makeCallback("onBeforeScroll", e.currentTarget);
        },
        makeCallback: function(name) {
            if ("function" == typeof this.options[name]) {
                var args = Array.prototype.slice.call(arguments);
                args.shift(), this.options[name].apply(this, args);
            }
        },
        destroy: function() {
            var self = this;
            this.isInit = !1, this.options.activeClasses && (win.off("resize load orientationchange refreshAnchor", this.resizeHandler), 
            this.scrollContainer.off("scroll", this.scrollHandler), $.each(this.anchorData, function(index) {
                var reverseIndex = self.anchorData.length - index - 1, data = self.anchorData[reverseIndex], anchorElement = "parent" === self.options.activeClasses ? data.link.parent() : data.link;
                self.toggleActiveClass(anchorElement, data.block, !1);
            })), this.anchorLinks.off("click", this.clickHandler);
        }
    }, 
    // public API
    $.extend(SmoothScroll, {
        scrollTo: function(blockOrOffset, durationOrOptions, callback) {
            scrollTo(blockOrOffset, durationOrOptions, callback);
        }
    }), 
    // export module
    exports.SmoothScroll = SmoothScroll;
}(jQuery, this);
//-------- -------- -------- --------
//-------- js custom end
//-------- -------- -------- --------