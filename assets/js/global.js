$(document).ready(function () {

    $("#nav-icon").click(function () {
        var icon = $(this);

        if ($(this).hasClass("open")) {

            var load_out = 0;
            $($(".menu-main-container a").get().reverse()).each(function (index) {
                var current = $(this);
                setTimeout(function () { current.removeClass('visible'); }, load_out * 100);
                load_out++;
            });

            setTimeout(function () {
                var fade_in_m = 0;
                $($(".m span").get().reverse()).each(function (index) {
                    var letter_m = $(this);
                    setTimeout(function () { letter_m.removeClass('visible'); }, fade_in_m * 100);
                    fade_in_m++;
                });
            }, 400);

            setTimeout(function () {
                var fade_in_h = 0;
                $($(".h span").get().reverse()).each(function (index) {
                    var letter_h = $(this);
                    setTimeout(function () { letter_h.removeClass('visible'); }, fade_in_h * 100);
                    fade_in_h++;
                });
            }, 0);

            setTimeout(function () {
                icon.removeClass("open");
                if ($(window).scrollTop() > 0) {
                    $('.logo').css('opacity', '0');
                } else {
                    $('.logo').css('opacity', '1');
                }
            }, 500);
            setTimeout(function () { $('.logo').removeClass("expand"); }, 500);
            setTimeout(function () { $('.logo').removeClass("open"); }, 500);
            setTimeout(function () { $('nav').removeClass("open"); }, 1000);
            setTimeout(function () { $('nav').hide(); }, 1500);
        } else {

            icon.addClass("open");
            $('nav').show();
            setTimeout(function () { $('nav').show().addClass("open"); }, 400);
            $('.logo').css('opacity', '1').addClass("open");
            setTimeout(function () { $('.logo').addClass("expand"); }, 300);

            setTimeout(function () {
                var fade_in_m = 0;
                $(".m span").each(function (index) {
                    var letter_m = $(this);
                    setTimeout(function () { letter_m.addClass('visible'); }, fade_in_m * 100);
                    fade_in_m++;
                });
            }, 1200);

            setTimeout(function () {
                var fade_in_h = 0;
                $(".h span").each(function (index) {
                    var letter_h = $(this);
                    setTimeout(function () { letter_h.addClass('visible'); }, fade_in_h * 100);
                    fade_in_h++;
                });
            }, 1600);

            setTimeout(function () {
                var load_in = 0;
                $(".menu a").each(function (index) {
                    var current = $(this);
                    setTimeout(function () { current.addClass('visible'); }, load_in * 100);
                    load_in++;
                });
            }, 400);

        }
    });

    var $animation_elements = $('h4');
    var $window = $(window);

    function check_if_in_view() {
        var window_height = $window.height();
        var window_top_position = $window.scrollTop();
        var window_bottom_position = (window_top_position + window_height);

        $.each($animation_elements, function () {
            var $element = $(this);
            var element_height = $element.outerHeight();
            var element_top_position = $element.offset().top + 100;
            var element_bottom_position = (element_top_position + element_height);

            if ((element_bottom_position >= window_top_position) &&
                (element_top_position <= window_bottom_position)) {
                $element.addClass('visible');
            } else {
                $element.removeClass('visible');
            }
        });
    }

    check_if_in_view();

    /* On Scroll */
    $window.on('scroll resize', check_if_in_view);

    /* Faders */
    Faders.init();

    /* On Load */
    setTimeout(function () {
        $('#nav-icon span:nth-child(1)').addClass('visible');
    }, 250);
    setTimeout(function () {
        $('#nav-icon span:nth-child(2)').addClass('visible');
    }, 500);

    $(window).scroll(function () {
        $(".fade-on-scroll").css("opacity", 1 - $(window).scrollTop());
    });

    $("main").css("margin-bottom", $('footer').outerHeight());

    $(window).resize(function () {
        $("main").css("margin-bottom", $('footer').outerHeight());
    });

    $window = $(window);
    $window.scroll(function () {
        $(".process").each(function (index) {
            if ($window.scrollTop() >= $(this).offset().top - 5) {
                $('.sticky div').removeClass('current');
                $('.' + $(this).attr('id')).addClass('current');
            }
        });
    });

    $(".sticky div").click(function () {
        item = $("#" + $(this).data('identifier'));
        $('html, body').animate({
            scrollTop: item.offset().top + 1
        }, 1000);
    });

    $('.slider').find(".project-link").click(function () {
        if (isSliding) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
            return;
        }
    });

    $('.gallery').find("a").click(function () {
        if (isSliding) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
            return;
        }
    });

    /* Sticky Product Info */

    if ($('.sticky')[0]) {
        $(window).scroll(function () {
            fixSideBar();
        })
        fixSideBar();
    }

    function fixSideBar() {
        var start = $('.sticky-track').offset().top - 100
        var end = $('.sticky-track').outerHeight() - $('.sticky').outerHeight() + start - 50
        var offset = $('.sticky-track').outerHeight() - $('.sticky').outerHeight() + start + 50
        var stickyheight = $('.sticky').outerHeight()
        var trackheight = $('.sticky-track').outerHeight()
        if (window.scrollY >= start && window.scrollY <= end) {
            $('.sticky').addClass('fixed');
            $('.sticky').css('top', '100px')
        } else if (window.scrollY >= end) {
            $('.sticky').removeClass('fixed');
            $('.sticky').css('top', offset)
        } else {
            $('.sticky').removeClass('fixed');
            $('.sticky').css('top', '85vh')
        }
    }

});

/* Slideshow */

var Faders = {
    init: function () {
        var _ = this;
        _.faders();
    },
    fade: function (num, skip) {
        var _ = this,
            skip = (typeof skip !== 'undefined') ? skip : false;
        if ($('.pan').length && $('.pan .img').length > 1) {
            clearTimeout(_.fadeTimer);
            _.fadeTimer = setTimeout(function () {
                $('.pan .img').removeClass('displayed');
                $('.pan .img[data-num="' + num + '"]').addClass('displayed');
                if ($('.pan .img[data-num="' + (num + 1) + '"]').length) {
                    _.fade(num + 1);
                } else {
                    _.fade(1);
                }
            }, (skip ? 0 : 6000));
        }
    },
    faders: function () {
        var _ = this;
        if ($('.pan').length) {
            var num = 1;

            $('.pan .img').each(function () {
                $(this).attr('data-num', num);
                num++;
            });
            $('.pan .img[data-num="1"]').addClass('displayed');
            _.fade(2)
        }
    },
    fadeTimer: null
}