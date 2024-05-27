var direction;

function declOfNum(n, text_forms) {  
    n = Math.abs(n) % 100; 
    var n1 = n % 10;
    if (n > 10 && n < 20) { return text_forms[2]; }
    if (n1 > 1 && n1 < 5) { return text_forms[1]; }
    if (n1 == 1) { return text_forms[0]; }
    return text_forms[2];
}

// function setCountFound(count){
// 	courseword = declOfNum(count, ['курс', 'курса', 'курсов']);
//     $('.js-direction-filter-box-form-count').text(count +' '+ courseword);
// }

function generateItemsPagination(count, limit, page) {
    $('.js-items-box-block-pagination-list').remove();
    if (count >= limit) {
        let pageBox         = '';
        let counter         = 1;
        let additionalClass = '';
        let showPages       = 4;
        let start           = page;
        let maxPages        = Math.ceil(count / limit);
        
        if (page > 1) {
            start = page - 1;
        }
        
        for (var i = start; i <= maxPages; i++) {
            if (counter <= showPages || i ==  maxPages) {
                if (i == page) {
                    additionalClass = 'items-box-block__pagination-link_active js-items-box-block-pagination-link-active';
                }
                else {
                    additionalClass = '';
                }
                
                if (i ==  maxPages && page + 3 < maxPages) {
                    pageBox += `
                        <li class="items-box-block__pagination-item">
                            <span class="items-box-block__pagination-link">...</a>
                        </li>
                    `;
                }
                
                pageBox += `
                    <li class="items-box-block__pagination-item">
                        <a href="#" class="items-box-block__pagination-link ${additionalClass} js-items-box-block-pagination-link" data-page="${i}">${i}</a>
                    </li>
                `;
            }
            
            counter ++;
        }
        
        let pagination = `<ul class="items-box-block__pagination-list js-items-box-block-pagination-list">${pageBox}</ul>`;
        
        $('.js-items-box-block-pagination').append(pagination);
    }
}

function generateItem(data){
    let price = data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
	let kinds = '';
	let hourses = 'часов';
	
	switch(data.kind){
		case 'Повышение квалификации':
			kinds = 'повышения квалификации';
			break;		
		case 'Профессиональная переподготовка':
			kinds = 'профессиональной переподготовки'
			break;		
		case 'Профессиональное обучение':
			kinds = 'профессионального обучения';
			break;		
		case 'Вебинар':
			kinds = '- вебинар'
			break;		
		case 'НМО':
			kinds = 'НМО'
			break;
	}	
	
	switch(data.final_test){
		case '600':
		case '596':
		case '990':
		case '1100':
		case '36':
			hourses = 'часов';
			break;	
		case '144':
		case '72':
		case '152':
			hourses = 'часа';
			break;	
	}
	
	let imgmarker = '';
	let nowtext = '';
/* 	
	if($('input#path').val()=='/katalog/zdravoohranenie/' || $('input#path').val()=='/katalog-short/zdravoohranenie/'){
		if(data.kind == 'Повышение квалификации' && data.price < 9800){
			imgmarker = '<img src="/static/img/lowprice.svg" class="salemarker">';
		} else if(data.kind == 'Повышение квалификации' && data.price == 9800){
			imgmarker = '<img src="/static/img/new.svg" class="salemarker">';
		} else if(data.kind == 'Профессиональная переподготовка' && data.price == 49800){
			imgmarker = '<img src="/static/img/benefits.svg" class="salemarker">';
		} else if(data.kind == 'Профессиональная переподготовка' && data.price > 49800){
			imgmarker = '<img src="/static/img/popular.svg" class="salemarker">';
		}
	}	
	
	
	
	if($('input#path').val() == '/katalog/zdravoohranenie/' || $('input#path').val() == '/katalog-short/zdravoohranenie/'){
		today = new Date().getDate();
		nowhour = new Date().getHours();
		randdigit = nowhour > 21 && nowhour < 8 ? Math.floor(Math.random() * 2) + 1 : Math.floor(Math.random() * 7) + 2;
		humans = [1,5,6,7,8,9].indexOf(randdigit) > 0 ? 'человек' : 'человека';
		if (data.kind == 'Профессиональная переподготовка' && data.price == 49800){
			nowtext = '<div class="intro__flame intro__flame2"><div><svg class="icon-lightning"><use xlink:href="#icon-flame"></use></svg></div><div class="intro__flame-elem intro__flame-elem-now">Сейчас смотрят '+randdigit+' '+humans+'</div></div>';
		} else if (data.kind == 'Профессиональная переподготовка' && data.price > 49800){
			look = today % 2 == 0 ? 'Осталось 4 места' : 'Осталось 5 мест';
			nowtext = '<div class="intro__flame intro__flame2"><div><svg class="icon-lightning"><use xlink:href="#icon-flame"></use></svg></div><div class="intro__flame-elem intro__flame-elem-now">'+look+'</div></div>';
		}

	} */
	
	
	
	if(window.location.hash == '#ppgo') data.name = data.name.replace('Курс ','Курс "')+'"';
	
//<div class="intro__flame"><div><svg class="icon-lightning"><use xlink:href="#icon-flame"></use></svg></div><div class="intro__flame-elem intro__flame-elem-now">${nowtext}</div></div>	
///////////	
/* 	discount = 10;

	newprice = price;
	
	if (data.id == 1999 || data.id == 3783 || data.id == 3893) discount = 5;

	price = price.replace(' ₽','').replace(' ','')
	discount_sum = price*discount/100;
	newprice = price - discount_sum;
	newprice = Math.round(newprice); 

	price = '<del>'+price+'</del>'+' ₽<br>'+newprice.toLocaleString();
	 */
///////////	
    return `
        <div class="items-box-block__element">
            <div class="items-box-block__element-image">
				${imgmarker}
                <a href="${data.slug}"><img src="${data.image}" alt="${data.name}" class="picture"></a>
            </div>
            <div class="items-box-block__element-inner">
                <div class="items-box-block__element-course">
                    <span>Курс ${kinds}</span>
                </div>
                <div class="items-box-block__element-title">
                    <h2 class="items-box-block__element-name">${data.name}</h2>
                </div>
                <div class="items-box-block__element-now">
					${nowtext}
				</div>
                <div class="items-box-block__element-type">
                    <div class="items-box-block__element-type-item">
                        <svg><use href="#clock-icon"></use></svg>
                        <span>${data.final_test} ${hourses}</span>
                    </div>
                    <div class="items-box-block__element-type-item">
                        <svg><use href="#play-icon"></use></svg>
                        <span>Доступна запись</span>
                    </div>
                    <div class="items-box-block__element-type-item">
                        <svg><use href="#portfolio-icon"></use></svg>
                        <span>${data.training_period}</span>
                    </div>
             
                </div>
                
                <div class="items-box-block__element-info">
                    <div class="items-box-block__element-price">
                        <span>${price} ₽</span>
                    </div>
                    <div class="items-box-block__element-btn">
                        <a href="${data.slug}" class="main-btn items-box-block__element-btn-link" target="_blank">О программе</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}



// function getItems(url, page, filter) {
//     data = filter + '&page='+page+'&direction='+direction;
//     $.ajax({
//         url: url,
//         type: 'POST',
//         dataType: 'json',
//         data: data,
//         success: function(request){
//             $('.js-items-box-block').html('');
            
//             $.each(request.items, function(i, data) {
//                 $('.js-items-box-block').append(generateItem(data));
//             });
            
//             generateItemsPagination(request.count, request.limit, request.page)
//             setCountFound(request.count);
//         }
//     });
// }

function generateFilterHours(hours){
    let hoursFilter = `
        <div class="direction-filter-box__data-block-title">
            <span>Количество часов</span>
            <svg><use href="#question-icon"></use></svg>
        </div>
        <div class="direction-filter-box__data-block-subtitle">
            <input type="hidden" class="js-direction-filter-hours-input-min" name="filter-hour-min" value="${hours.min}">
            <input type="hidden" class="js-direction-filter-hours-input-max" name="filter-hour-max" value="${hours.max}">
            <span>от <span class="js-direction-filter-hours-min">${hours.min}</span> до <span class="js-direction-filter-hours-max">${hours.max}</span> часов</span>
        </div>
        <div class="direction-filter-box__data-block-range">
            <div class="js-direction-filter-box-hour" id="js-direction-filter-box-hour"></div>
        </div>
    `;
    
    $('.js-direction-filter-hours').append(hoursFilter).ready(function () {
        var hourSlider = document.getElementById('js-direction-filter-box-hour');
        
        noUiSlider.create(hourSlider, {
            start: [hours.min, hours.max],
            connect: true,
            range: {
                'min': hours.min,
                'max': hours.max
            },
            format: {
                from: function(value) {
                    return parseInt(value);
                },
                to: function(value) {
                    return parseInt(value);
                }
            }
        });
        
        hourSlider.noUiSlider.on("slide", function(event, ui){
            $('.js-direction-filter-hours-min').text(event[0]);
            $('.js-direction-filter-hours-max').text(event[1]);
            $('.js-direction-filter-hours-input-min').val(event[0]).change();
            $('.js-direction-filter-hours-input-max').val(event[1]).change();
        });
    });
}

function generateFilterHSpecialization(specializations){
    if (Object.keys(specializations).length > 0) {
        let specializationFilter = `
            <div class="direction-filter-box__data-block-title">
                <span>Специальность</span><span class="resetspec">Сбросить</span>
            </div>
        `;
        let specializationFilterSelect = '';
        let speciz = [];
        let specializationFilterOptions = '<option value="">Выберите специальность</option>';
		
	//	console.log(specializations);
		$.each(specializations, function(i, spec_full) {
			spec_full = spec_full.split(',');
			$.each(spec_full, function(i, spec_fulls) {	
				speciz.push(spec_fulls.trim());
			});
       
        });
		speciz = Array.from(new Set(speciz));
		speciz.sort();
        
    /*     $.each(specializations, function(i, specialization) {
            specializationFilterOptions += `
                <option value="${i}">${specialization}</option>
            `
        });      */
		
		$.each(speciz, function(i, specialization) {
            specializationFilterOptions += `
                <option value="${specialization}">${specialization}</option>
            `
        });
        
        specializationFilterSelect = `<select class="js-custom-select form-box__select" name="filter-specialization">${specializationFilterOptions}</select>`;
        specializationFilter += specializationFilterSelect;
        
        $('.js-direction-filter-specialization').append(specializationFilter).ready(function () {
            $('.js-direction-filter-specialization select').customSelect();
        });
    }
}

function generateFilterKinds(kinds) {
    let kindBox = `
        <div class="direction-filter-box__data-block-title">
            <span>Тип обучения</span>
            <svg><use href="#question-icon"></use></svg>
        </div>
    `;
    
    kindFilterCheckbox = '';
    
    $.each(kinds, function(i, kind) {
        kindFilterCheckbox += `
            <div class="direction-filter-box__data-block-row">
                <label class="form-box__checkbox-label">
                    <input type="checkbox" class="form-box__checkbox" name="filter-kind[]" value="${i}">
                    <span class="form-box__checkbox-icon"><svg><use href="#checkbox-icon"></use></svg></span>
                    <span class="form-box__checkbox-label-text">${kind}</span>
                </label>
            </div>
        `;
    });
    
    kindBox += kindFilterCheckbox;
    
    $('.js-direction-filter-kind').append(kindBox)
}

function generateFilterDirections(directions) {
    let lists = `
        <div class="direction-filter-box__data-block-title">
            <span>Профессия</span>
            <svg><use href="#question-icon"></use></svg>
        </div>
    `;
    
    if (Object.keys(directions).length > 0) {
        let list = '';
		
//////////
        let profiz = [];

	//	console.log(specializations);
		$.each(directions, function(i, dir_full) {
			dir_full = dir_full.split(',');
			$.each(dir_full, function(i, dir_fulls) {	
				profiz.push(dir_fulls.trim().replace('!', ''));
			});
       
        });
		profiz = Array.from(new Set(profiz));
		profiz.sort();
//////////        
		
     //   $.each(directions, function(i, direction) {
        $.each(profiz, function(z, direction) {
            list += `
                <div class="direction-filter-box__data-block-row">
                    <label class="form-box__checkbox-label">`
					
					if(direction == 'Тренер') list += `<input type="checkbox" class="form-box__checkbox" name="filter-direction[]" value="${direction}!">`
					else list += `<input type="checkbox" class="form-box__checkbox" name="filter-direction[]" value="${direction}">`	
						
                       list += `<span class="form-box__checkbox-icon"><svg><use href="#checkbox-icon"></use></svg></span>
                        <span class="form-box__checkbox-label-text">${direction}</span>
                    </label>
                </div>
            `;
        });
        
        lists += list;
        $('.js-direction-filter-direction').show().append(lists);
    }
    else if (directions.length == 1) {
        currentDirection = `<input type="hidden" name="filter-direction[]" value="${directions[0]}" checked="checked">`;
        
        $('.js-direction-filter-direction').hide().append(currentDirection);
    }
}

$(document).ready(function() {
    direction               = $('.js-items-box-block').data('direction');
    var url                 = $('.js-items-box-block').data('url');
    // var direction           = $('.js-items-box-block').data('direction');
    var csrfmiddlewaretoken = $('.js-items-box-block').data('csrfmiddlewaretoken');
    var page                = $('.js-items-box-block-pagination-link-active').data('page');
    
    if ($('.js-direction-filter-box').length) {
        let filterUrl = $('.js-direction-filter-box').data('url');
        let dataFilter;
        $.ajax({
            url: filterUrl,
            type: 'POST',
            dataType: 'json',
            data: {direction: direction, csrfmiddlewaretoken: csrfmiddlewaretoken},
            success: function(request){
                let data = $('.js-direction-filter-box-form').serialize();
                
                directions = [direction];
                
                if (request.filter.directions) {
                    directions = request.filter.directions;
                }
                
                generateFilterDirections(directions);
                
                if (request.filter.hours) {
                    generateFilterHours(request.filter.hours);
                }
                if (request.filter.specializations) {
                    generateFilterHSpecialization(request.filter.specializations);
                }
                if (request.filter.kinds) {
                    generateFilterKinds(request.filter.kinds);
                }
                
                dataFilter = $('.js-direction-filter-box-form').serialize();
                
                if ($('.js-items-box-block').length) {
                    getItems(url, 1, dataFilter);
                }
            }
        });
        
        $('.js-direction-filter-mobile-btn').click(function(event) {
            $('.js-direction-filter-box-form').appendTo($('.js-modal-box#direction-filter .js-modal-box-content'));
            
            $('.js-modal-box#direction-filter').fadeIn('fast');
        });
        
        $('.js-modal-box-filter-close').click(function(event) {
            $('.js-direction-filter-box-form').appendTo($('.js-direction-filter-box-inner'));
        });
    }
    
    $(document).on('click', '.js-items-box-block-pagination-link', function(event) {
        event.preventDefault();
        let data = $('.js-direction-filter-box-form').serialize();
        
        $('.js-items-box-block-pagination-link-active').removeClass('items-box-block__pagination-link_active  js-items-box-block-pagination-link-active');
        $(this).addClass('items-box-block__pagination-link_active  js-items-box-block-pagination-link-active');

        getItems(url, $(this).data('page'), data);
    });
    
    $('.js-modal-box-filter').click(function(event) {
        if (!$(event.target).closest('.js-modal-box-filter-inner').length) {
            $(this).fadeOut('fast');
            $('.js-direction-filter-box-form').appendTo($('.js-direction-filter-box-inner'));
        }
    });
    
    
    $('.js-direction-filter-box-form').submit(function(event) {
        event.preventDefault();
        let data = $(this).serialize();
        let scrolls = 200;
		if (windowsize < 991) scrolls = 850;
//		$('html, body').animate({scrollTop:  $(window).height() + scrolls}, 600);
        getItems(url, 1, data);
    });
    
    // $(document).on('change', '.js-direction-filter-box-form input, .js-direction-filter-box-form select', function(event) {
		
	// 	if($('.custom-select__option.custom-select__option--value').text().indexOf('Выберите') == 0) $('.resetspec').hide();
	// 	else $('.resetspec').show();

    //     let data = $('.js-direction-filter-box-form').serialize();
    //     data    += '&only_count=true&direction='+direction;
        
    //     $.ajax({
    //         url: url,
    //         type: 'POST',
    //         dataType: 'json',
    //         data: data,
    //         success: function(request){
    //             setCountFound(request.count);
    //         }
    //     });
    // });   

    // $(document).on('click', '.resetspec', function(event) {
	// 	$(this).hide();
	// 	$('.custom-select__option').each(function() {
	// 		if($(this).text().indexOf('Выберите') == 0) $(this).trigger('click');
	// 	});	
	// 	$('.direction-filter-box__info-btn-submit').trigger('click');
	// });

	// // Мобильная версия
	// $(document).on('click', '.js-direction-filter-mobile-btn', function(event) {
	// 	$('.js-direction-filter-box').toggle('slow');
	// });

	// var windowsize = $(window).width();
	// if (windowsize < 991) {
	// 	$('.direction-filter-box__data-block').append('<button type="submit" class="main-btn direction-filter-box__info-btn-submit">'+$('.direction-filter-box__info-btn-submit').html()+'</button>');
	// 	$('.direction-filter-box__info-btn-submit').css('margin-top','20px')
	// 	$('.js-direction-filter-box-inner').css('margin-bottom','20px')
	// }
	
});