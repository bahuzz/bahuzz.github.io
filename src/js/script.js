$(document).ready(function() {
    $(".menu-btn").on('click', function() {
        $(".mobile-menu").slideToggle('fast');
    });
    $(".mobile-menu-close").on('click', function() {
        $(".mobile-menu").slideUp('fast');
    });
});