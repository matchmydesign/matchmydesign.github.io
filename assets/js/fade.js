window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
        window.location.reload();
    }
}, false);

$(document).on('ready', function () {
    Site.init();
});

var Site = {
    init: function () {
        var _ = this;
        _.buttons();
        _.show();
    },
    buttons: function () {
        $("a[href^='http://'],a[href^='https://'],a[href^='mailto:']").each(function () {
            /* type in conditions to say whether or not the page is part of the current site */
            if ($(this).attr('href').indexOf('mafco') <= 0 || $(this).attr('target') == "_blank") {
                var nothing = true;
            } else {
                $(this).on('click', function (e) {
                    e.preventDefault();
                    var href = $(this).attr('href');
                    $('.preloader').fadeIn(function () {
                        window.location.href = href;
                    });
                });
            }
        });
    },
    show: function () {
        setTimeout(function () {
            $('body').addClass('loaded');
            $('.preloader').fadeOut(400);
        }, 200);
    }
}