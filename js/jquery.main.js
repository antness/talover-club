jQuery(function(){
	clearInputs();
	tools();
	slide_bar();
	BarTabs();
	popup();
	exit();
});

function tools(){
	var tools = $('.tools'),
		backToTop = tools.find('.back-to-top'),
		fullScreen = tools.find('.full-screen'),
		animSpeed = 500;
	fullScreen.on('click',function(){
		$(document).fullScreen(true);
		return false;
	});
	backToTop.on('click',function(){
		$.scrollTo(0,animSpeed);
		return false;
	});
};

/*---- clear inputs ---*/
function clearInputs(){
	$('input:text, input:password, textarea').each(function(){
		var _el = $(this);
		var _val = _el.val();
		_el.on('focus', function(){
			if(this.value == _val) {
				this.value = '';
			}
		}).on('blur', function(){
			if(this.value == '') {
				this.value = _val;
			}
		});
	});
};

function slide_bar(){

	$('#btn_bar').on('click',function(){
		$('#TopBar').slideToggle();
		$('.slider_block').slideUp().removeClass('active');
	});

	$('#HideBar').on('click',function(){
		$('.slider_block').slideUp().removeClass('active');
		$('.toggle').removeClass('active');
		ShowHide();
	});

	$('#ShowBar').on('click',function(){
		$('#btnJackPots').addClass('active');
	});
}

function BarTabs() {

	$("#TopBar .toggle").on('click',function(){
		var slider = $(this).data('toggle');
		$(this).parent().siblings().find('a').removeClass('active');
		$(this).toggleClass('active');

		$(slider).siblings('.slider_block').slideUp().removeClass('active');
		$(slider).slideToggle().toggleClass('active');
		ShowHide();
	});
}

function ShowHide(){

	if($('.slider_block').hasClass('active')){
		$('#ShowBar').hide();
		$('#HideBar').show();
	}else {
		$('#ShowBar').show();
		$('#HideBar').hide();
	}
}

function exit() {
	$('#exit').on('click',function(){
		$('#TopBar').removeClass('active');
		$('#popup_game').fadeOut();
	});
}

function popup(){
	$('.games-list li a').on('click',function(){
		$('#TopBar').addClass('active');
		$('#popup_game').fadeIn();
	});
}