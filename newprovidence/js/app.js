$(document).ready(function() {
    $('.nav-icon').click(function() {
        $(this).toggleClass('open');
        $(this).parents('.header').toggleClass('header--open');
    });

    $('.slider').bxSlider({
        prevText: '',
        nextText: ''
    });
});

$(document).scroll(function() {
    docScroll();
});

function docScroll() {
    var doc = $(document);
    var top = doc.scrollTop();
    var header = $('.header');

    if (top > 0) {
        header.addClass('header--scrolled');
    } else {
        header.removeClass('header--scrolled');
    }
}