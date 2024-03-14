$(document).ready(function () {
    /* Выпадающие списки шапки*/
    $('.dropdown').hover(
        function () {
            $(this).find('.dropdown-menu').stop().fadeIn(100);
        },
        function () {
            $(this).find('.dropdown-menu').stop().fadeOut(100);
        }
    );
    /* Бургер навигация */
    $('.header__menu-opener').click(function () {
        $('.main-menu').fadeToggle(200);
        $('.navigation').css('position', 'static');
        $("body").toggleClass("overflow-hidden");

        if ($("body").hasClass("overflow-hidden")) {
            $('body').css('overflow', 'hidden');
        } else {
            $('body').css('overflow', 'auto');
        }
    });



    /* Модальное окно popup */
    $('.popup-btn').click(function () {
        $('body').css('overflow', 'hidden');
        $('.popup').fadeIn();
        return false;
    });

    $('.popup-close').click(function () {
        $('body').css('overflow', 'auto');
        $(this).parents('.popup').fadeOut();
        return false;
    });

    $(document).keydown(function (e) {
        if (e.keyCode === 27) {
            e.stopPropagation();
            $('body').css('overflow', 'auto');
            $('.popup').fadeOut();
        }
    });

    $('.popup').click(function (e) {
        if ($(e.target).closest('.popup-content').length == 0) {
            $('body').css('overflow', 'auto');
            $(this).fadeOut();
        }
    });

    // клик по иконке WhatsApp
    $('body').on('click', '.wthsbutton', function (e) {
        window.open('https://api.whatsapp.com/send?phone=79613084929', '_blank');
    });



});