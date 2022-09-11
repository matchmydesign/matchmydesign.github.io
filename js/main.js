(function ($) {
    "use strict";
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyHXgXItrdgz4i1AhCFdgTIog8qY_c-UYB5RVYqKTaTIayek8PvsdpcLAGU3OLP9G1Olw/exec';
    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').addClass('shadow-sm').css('top', '0px');
        } else {
            $('.sticky-top').removeClass('shadow-sm').css('top', '-100px');
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: false,
        // smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });

    formEvent();

    function validateForm(form) {
        let status = true;
        const validationForm = [{ key: 'name', regex: /\S+/ }, { key: 'phone', regex: /^[6-9]\d{9}$/gi }];
        for (let index = 0; index < form.length; index++) {
            const el = form[index];
            const v = validationForm.find((v) => v.key == el.id);
            if (v && !new RegExp(v.regex).test(el.value)) {
                status = false;
                $(`#e${el.id}`).show();
                break;
            }
        }
        return status;
    }


    function formEvent() {
        const form = document.forms['appointment'];
        form.addEventListener('change', e => {
            const el = e.target && e.target.id;
            el && $(`#e${el}`).hide();
        });

        form.addEventListener('submit', e => {
            e.preventDefault();
            if (!validateForm(form)) { return; }
            fetch(scriptURL, { method: 'POST', body: new FormData(form) })
                .then(response => $('#leadCreated').show() && $('#appointment').hide())
                .catch(error => alert('Error!', error.message))
        });
    }

    $(".filter-button").click(function () {
        removeActiveFilter();
        $(this).addClass("active");
        const value = $(this).attr('data-filter');
        filterPort(value);
    });

    $(".portfolio").click(function () {
        const value = $(this).attr('data-in');
        filterPort(value);
        removeActiveFilter();
        $(`#${value}`).addClass("active");
    });

    function filterPort(value) {
        if (value == "all") {
            $('.filter').show('1000');
        }
        else {
            $(".filter").not('.' + value).hide('3000');
            $('.filter').filter('.' + value).show('3000');
        }
    }

    function removeActiveFilter() {
        if ($(".filter-button").removeClass("active")) {
            $(this).removeClass("active");
        }
    }

    $("#bookEvent").click(function () {
        modelWindow('https://cal.com/match-my-design-vyotwz/30min');
    })

})(jQuery);

