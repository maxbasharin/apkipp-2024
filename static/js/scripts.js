function controlCategoriesShowHide(){
    if ($(window).width() < 480) {
        $('.js-catalog-box-items .catalog-box__item-col:gt(5)').hide()
    } else {
        $('.js-catalog-box-items .catalog-box__item-col:gt(5)').show()
    }
}

function controlHeader(headerBox) {
    let scrollTop = $(document).scrollTop();
    let headerSpace = $('.js-header-box-info').height();
    let headerMobile = $('.header-box__mobile');

    if (headerSpace < scrollTop && !headerBox.hasClass('header-box__content_fixed-active')) {
        headerBox.addClass('header-box__content_fixed-active');
        headerMobile.addClass('header-box__mobile-active');
    } else if (headerSpace >= scrollTop && headerBox.hasClass('header-box__content_fixed-active')) {
        headerBox.removeClass('header-box__content_fixed-active');
        headerMobile.removeClass('header-box__mobile-active');
    }
}



$(document).ready(function() {
	console.log($('.pfModalOverlay'));
	$('.pfModalOverlay').remove();
	$('body').on('click', '.pfWidget', function(e){
	console.log('!!!!!!');
	});
	
    $('.js-offer-box-modal-btn').click(function(event) {
        $('.js-offer-box-modal-inner').appendTo('.js-offer-box-modal .js-offer-box-modal-content');
        $('.js-offer-box-modal').fadeIn('fast');
    });
    
    $('.js-calculator-box').submit(function(event) {
        event.preventDefault();
        if ($('.js-calculator-box-result:visible').length == 0) {
            $('.js-modal-box#calculator-modal').fadeIn('fast');
        }
    });
    
    $('.js-input-box-plus').click(function(event) {
        event.preventDefault();
        let box   = $(this).closest('.js-input-box-wrapper');
        let input = box.find('.js-input-box');
        input.val(parseInt(input.val()) + 1);
    });
    
    $('.js-input-box-minus').click(function(event) {
        event.preventDefault();
        let box   = $(this).closest('.js-input-box-wrapper');
        let input = box.find('.js-input-box');
        if (parseInt(input.val()) != 0) {
            input.val(parseInt(input.val()) - 1);
        }
    }); 
	// рассчитать (калькулятор)
	$('.calculator-box__item-action-form-submit-btn').click(function(event) {
        event.preventDefault();
		let years = $('.div_year').find('.custom-select__option--value').text();
		let pk_balls = $('.pk_balls').val();
		let mer_balls = $('.mer_balls').val();
		let pk_need = 0;
		let mer_need = 0;
		let all_need = 0;

		if(years == 2022){
			pk_need = 144 - pk_balls;
			mer_need = 0;
		} else if(years == 2023){
			pk_need = 180 - pk_balls;
			mer_need = 70 - mer_balls;
		} else if(years == 2024){
			pk_need = 144 - pk_balls;
			mer_need = 56 - mer_balls;
		} else if(years == 2025){
			pk_need = 108 - pk_balls;
			mer_need = 42 - mer_balls;
		} else if(years == 2025){
			pk_need = 72 - pk_balls;
			mer_need = 28 - mer_balls;
		} else if(years == 2025){
			pk_need = 36 - pk_balls;
			mer_need = 14 - mer_balls;
		} 
		
		if(pk_need < 0) pk_need = 0;
		if(mer_need < 0) mer_need = 0;
		
		all_need = pk_need + mer_need;
		pk_cost = pk_need*68;
		mer_cost = mer_need*699;
		itog_cost = pk_cost+mer_cost;
		itog_arif_year = itog_cost / 5;
		
		$('.pk_need,.pk_need2').text(pk_need);
		$('.mer_need,.mer_need2').text(mer_need);
		$('.all_need').text(all_need);
		
		$('.pk_cost').text(pk_cost.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')+' р.');
		$('.mer_cost').text(mer_cost.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')+' р.');
		$('.itog_cost').text(itog_cost.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')+' р.');
		
		$('.pk_arif').text('68 р. x '+pk_need+' б.');
		$('.mer_arif').text('699 р. x '+mer_need+' б.');
		$('.itog_arif').text(pk_cost.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')+' р. + '+mer_cost.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')+' р.');
		
		$('.itog_arif_year').text(itog_arif_year.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ')+' р. в год');
	
    });
	
	
	// аккредитация, площадки
    $('div.accreditation_region,div.accreditation_spec').click(function(event) {
        event.preventDefault();
		let accreditation_region = $('div.accreditation_region').find('button.custom-select__option--value').text();
		let accreditation_spec = $('div.accreditation_spec').find('button.custom-select__option--value').text();
		if(accreditation_region !='Выберите регион' && accreditation_spec != 'Выберите специальность'){
				   $.ajax({
					  url: 'https://web-apkipp.ru/b24connect/accreditation.php',
					  type: 'POST',
						data: {
						'region': accreditation_region,
						'spec': accreditation_spec
					  },
					  success: function(datas) { 
						if(datas.length <=10) sq = 'Нет доступных площадок в выбранном регионе';
						else sq = datas;
						$('.acreditation-form__info-title').html(sq);	
					  }
					  
					}); 
		}

    });
 
 
	
	
    $('.js-dropdown-box-btn').click(function(event) {
        $(this).closest('.js-dropdown-box').find('.js-dropdown-box-content').slideToggle('fast')
    });
    $('.js-custom-select').customSelect();
    
    $('.js-modal-box-close').click(function(event) {
        $(this).closest('.js-modal-box').fadeOut('fast');
    });
    
    $('.js-modal-box-btn').click(function(event) {
        event.preventDefault();
        $('.js-modal-box#'+$(this).data('modal')).fadeIn('fast');
    });
    
    $('.js-modal-box').click(function(event) {
        if (!$(event.target).closest('.js-modal-box-inner').length) {
            $(this).fadeOut('fast');
        }
    });    
	$('.course-requirements-close,.course-requirements-close svg').click(function(event) {
            $('.js-modal-box').fadeOut('fast');
    });
    // header start
    var headerBox = $('.js-header-box-content');
    controlHeader(headerBox);

    $('.js-header-box-mobile-catalog-btn-link').click(function(event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
        $(this).toggleClass('header-box__mobile-catalog-btn-link_active');
        $('.js-header-box-mobile-direction').toggle('fast');
    });

    $('.js-header-box-btn').click(function(event) {
        event.preventDefault();
        let catalog = $(this).closest('.js-header-box').find('.js-header-box-catalog');

        if (catalog.hasClass('js-header-box-catalog-active')) {
            catalog.removeClass('js-header-box-catalog-active').slideUp('fast', function() {
                headerBox.removeAttr('style')
            });
        } else {
            catalog.addClass('js-header-box-catalog-active').slideDown('fast');
            headerBox.css('background-color', catalog.css('background-color'))
        }
    });

    $('.js-header-box-data-btn').click(function(event) {
        event.preventDefault();
        $('.js-header-box-data').fadeIn('fast');
    });

    $('.js-header-box-data-close').click(function(event) {
        event.preventDefault();
        $('.js-header-box-data').fadeOut('fast');
    });

    $('.js-header-mobile-search').click(function(event) {
        event.preventDefault();
        $('.js-header-mobile-search-box').toggle('fast');
    });
    
    // header end
    
	
    // type start
        $('.js-type-box-btn').click(function(event) {
            let typeBox = $(this).closest('.js-type-box');
            typeBox.find('.js-type-box-btn').removeClass('type-box__item-btn_active');
            $(this).addClass('type-box__item-btn_active');
            typeBox.find('.js-type-box-text').removeClass('type-box__info-text_active');
            typeBox.find('.js-type-box-text').eq($(this).index()).addClass('type-box__info-text_active');
        });
    // type end
	// type start
        $('.js-type-box-btn').click(function(event) {
            let typeBox = $(this).closest('.js-type-box_basket');
            typeBox.find('.js-type-box-btn').removeClass('type-box__item-btn_active');
            $(this).addClass('type-box__item-btn_active');
            typeBox.find('.js-type-box-text').removeClass('type-box__info-text_active');
            typeBox.find('.js-type-box-text').eq($(this).index()).addClass('type-box__info-text_active');
        });
    // type end


    // $("body").children().each(function() {
    //     $(this).html($(this).html().replace(/&#8232;/g, " "));
    // });
    
    
    controlCategoriesShowHide();
    
    $('.catalog-box__btn').click(function(event) {
        if ($(this).hasClass('js-catalog-box-items-active')) {
            $(this).removeClass('js-catalog-box-items-active');
            $('.js-catalog-box-items .catalog-box__item-col:gt(5)').hide('fast');
            $(this).text($(this).data('showtext'));
        }
        else {
            $(this).addClass('js-catalog-box-items-active');
            $('.js-catalog-box-items .catalog-box__item-col:gt(5)').show('fast');
            $(this).text($(this).data('hidetext'));
        }
    });
});

$(document).scroll(function() {  // OR  $(window).scroll(function() {
    controlHeader($('.js-header-box-content'));
});

$(window).resize(function() {

    controlCategoriesShowHide();
  
});
 

