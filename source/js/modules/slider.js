if (document.querySelector('.swiper-container')) {
	new Swiper('.swiper-container', {
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev'
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true,
			renderBullet: function (index, className) {
				return '<span class="' + className + '">' + (index + 1) + '</span>';
			}
		},
		grabCursor: true,
		keyboard: {
			enabled: true,
			onlyInViewport: true,
		},
		autoheight: true,
		slidesPerView: 'auto',
		spaceBetween: 30,
		slidesPerGroup: 4,
		loop: true,
		breakpoints: {
			320: {
				pagination: {
					el: '.swiper-pagination',
					type: 'fraction',
					clickable: true,
					renderFraction: function (currentClass, totalClass) {
						return '<span class="' + currentClass + '"></span>' +
							'&nbsp;&nbsp;of&nbsp;&nbsp;' +
							'<span class="' + totalClass + '"></span>';
					},
				},
				slidesPerView: 2,
				slidesPerGroup: 2,
			},
			768: {
				slidesPerView: 2,
				slidesPerGroup: 2,
				pagination: {
					el: '.swiper-pagination',
					type: 'bullets',
					clickable: true,
					renderBullet: function (index, className) {
						return '<span class="' + className + '">' + (index + 1) + '</span>';
					}
				}
			},
			1024: {
				slidesPerView: 3,
				slidesPerGroup: 3,
			},
			1300: {
				slidesPerView: 4,
				slidesPerGroup: 4,
			}
		}
	});
}
