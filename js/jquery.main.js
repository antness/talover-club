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
		$('.slider_block').slideUp();
		$('#TopBar .f-left a').removeClass('active');

	});
}

function BarTabs() {
	$('#CasinoJackPotsBtn').on('click',function(){
		$('#CurrentWinners ,#TopGames ,#TopWinners').slideUp()
		$('#CurrentWinnersBtn ,#TopWinnersBtn ,#TopGamesBtn ').removeClass('active');

		$(this).toggleClass('active');
		
		$('#CasinoJackPots').slideToggle();
	});

	$('#CurrentWinnersBtn').on('click',function(){
		$('#CasinoJackPots,#TopWinners,#TopGames').slideUp();	
		$('#CasinoJackPotsBtn,#TopWinnersBtn,#TopGamesBtn').removeClass('active');

		$(this).toggleClass('active');
		$('#CurrentWinners').slideToggle();	
	});

	$('#TopWinnersBtn').on('click',function(){
		$('#CasinoJackPots,#CurrentWinners,#TopGames').slideUp();	
		$('#CasinoJackPotsBtn ,#CurrentWinnersBtn,#TopGamesBtn').removeClass('active');

		$(this).toggleClass('active');
		$('#TopWinners').slideToggle();	
	});

	$('#TopGamesBtn').on('click',function(){
		$('#CasinoJackPots,#CurrentWinners,#TopWinners').slideUp();	
		$('#CasinoJackPotsBtn,#CurrentWinnersBtn,#TopWinnersBtn').removeClass('active');

		$(this).toggleClass('active');
		$('#TopGames').slideToggle();	
	});
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