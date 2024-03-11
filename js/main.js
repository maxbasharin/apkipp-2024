$(document).ready(function () {
    $('.dropdown').hover(
        function () {
            $(this).find('.dropdown-menu').stop().fadeIn(100);
        },
        function () {
            $(this).find('.dropdown-menu').stop().fadeOut(100);
        }
    );
 
    $('.header__menu-opener').click(function() {
        $('.main-menu').fadeToggle(200);
        $('.overlay').toggleClass('active');
        
    });

});