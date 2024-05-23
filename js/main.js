$(document).ready(function () {

  // Отложенная загрузка
  const observer = lozad();
  observer.observe();
  lozad('.lozad', {
    load: function (el) {
      el.src = el.dataset.src;
      el.onload = function () {
        el.classList.add('fade')
      }
    }
  }).observe()


  // Выпадающие списки шапки
  $(".dropdown").hover(
    function () {
      $(this).find(".dropdown-menu").stop().fadeIn(100);
    },
    function () {
      $(this).find(".dropdown-menu").stop().fadeOut(100);
    }
  );
  // Бургер навигация
  $(".header__menu-opener").click(function () {
    $(".main-menu").fadeToggle(200);
    $(".navigation__section").fadeToggle(200);
    $("body").toggleClass("overflow-hidden");

    if ($("body").hasClass("overflow-hidden")) {
      $("body").css("overflow", "hidden");
    } else {
      $("body").css("overflow", "auto");
    }
  });
  // Модальное окно popup
  $(".popup-btn").click(function () {
    $("body").css("overflow", "hidden");
    $(".popup").show();
    return false;
  });
  $(".popup-close").click(function () {
    $("body").css("overflow", "auto");
    $(this).parents(".popup").hide();
    return false;
  });
  $(document).keydown(function (e) {
    if (e.keyCode === 27) {
      e.stopPropagation();
      $("body").css("overflow", "auto");
      $(".popup").hide();
    }
  });
  $(".popup").click(function (e) {
    if ($(e.target).closest(".popup-content").length == 0) {
      $("body").css("overflow", "auto");
      $(this).hide();
    }
  });

  // клик по иконке WhatsApp
  $("body").on("click", ".wthsbutton", function (e) {
    window.open("https://api.whatsapp.com/send?phone=79613084929", "_blank");
  });


  let isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };

  // Фотогалерея кафедры
  const gallery = document.querySelector(".gallery__body");
  let galleryItems, galleryColumn, speed, positionX, coordXpercentage;

  if (gallery && !isMobile.any()) {
    galleryItems = document.querySelector(".gallery__items");
    galleryColumn = document.querySelectorAll(".gallery__column");

    // Скорость анимации
    speed = gallery.dataset.speed;

    positionX = 0;
    coordXpercentage = 0;

    gallery.addEventListener("mousemove", function (e) {
      const furnitureWidth = gallery.offsetWidth;

      const coordX = e.pageX - furnitureWidth / 2;

      coordXpercentage = (coordX / furnitureWidth) * 200;

      if (!gallery.classList.contains("_init")) {
        requestAnimationFrame(setMouseGalleryStyle);
        gallery.classList.add("_init");
      }
    });
  }

  // Прослеживание движения мыши
  function setMouseGalleryStyle() {
    let galleryItemsWidth = 0;
    galleryColumn.forEach((element) => {
      galleryItemsWidth += element.offsetWidth;
    });

    const furnitureDifferent = galleryItemsWidth - gallery.offsetWidth;
    const distX = Math.floor(coordXpercentage - positionX);

    positionX = positionX + distX * speed;
    let position = (furnitureDifferent / 200) * positionX;

    galleryItems.style.cssText = `transform: translate3d(${-position}px,0,0);`;

    if (Math.abs(distX) > 0) {
      requestAnimationFrame(setMouseGalleryStyle);
    } else {
      gallery.classList.remove("_init");
    }
  }

  // Стандартный слайдер контента
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      720: {
        slidesPerView: 4,
      },
      480: {
        slidesPerView: 2,
      },
      230: {
        slidesPerView: 1,
      },
    },
  });

  // Слайдер отзывов с счетчиком
  var swiperReviews = new Swiper(".swiper-reviews", {
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // Слайдер баннеров на каталоге
  var swiperProgramBanner = new Swiper(".program__banner-slider", {
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // Навигация скролл по странице
  $(".refers a").on("click", function (event) {
    event.preventDefault();
    var target = $(this).attr("href");
    var targetPosition = $(target).offset().top - 110;

    $("html, body").animate(
      {
        scrollTop: targetPosition,
      },
      300
    );
  });

  // Выделение активного пункта при скролле навигации
  $(window).on("scroll", function () {
    var scrollPosition = $(window).scrollTop() + 120;

    $(".sidebar__nav a").each(function () {
      var target = $(this).attr("href");
      var targetElement = $(target);

      if (targetElement.length) {
        var targetPosition = targetElement.offset().top;
        var targetHeight = targetElement.outerHeight();

        if (
          scrollPosition >= targetPosition &&
          scrollPosition < targetPosition + targetHeight
        ) {
          $(".sidebar__nav a").removeClass("active");
          $(this).addClass("active");
        } else {
          $(this).removeClass("active");
        }
      }
    });
  });

  // Раскрывающий список вопрос ответ
  $(".content__accordion .content__accordion-item .content__accordion-header"),
    $(".content__accordion-header").on("click", function () {
      $(".icon-plus").removeClass("active");
      $(this).hasClass("active")
        ? ($(this).siblings(".content__accordion-text").slideUp(),
          $(this).removeClass("active"),
          $(this).find(".icon-plus").removeClass("active"))
        : ($(".content__accordion-text").slideUp(),
          $(".content__accordion-header").removeClass("active"),
          $(this).siblings(".content__accordion-text").slideToggle(),
          $(this).toggleClass("active"),
          $(this).find(".icon-plus").addClass("active"));
    });

  // Скрывать контент когда ширина меньше 997px 
  $(window).resize(function () {
    var screenWidth = $(window).width();
    var contentItemWrapper = $('.content__item-wrapper');

    if (screenWidth <= 997) {
      contentItemWrapper.addClass('js-accordion-content');
    } else {
      contentItemWrapper.removeClass('js-accordion-content');
    }
  });

  // Раскрывающий список стандартный
  $(".js-accordion-toggle").on("click", function () {
    $(this).siblings(".js-accordion-content").slideToggle();
    $(this).toggleClass("active");
    $(this).find(".js-accordion-icon").toggleClass("active");
    });
});

  // Плашка подать заявку
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();
    var windowHeight = $(window).height();
    var documentHeight = $(document).height();
    var applyHeight = $('.apply').outerHeight();

    if (scroll > 0) {
        $('.apply').addClass('active');
    } else {
        $('.apply').removeClass('active');
    }
});