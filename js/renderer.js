define(['jquery', 'scroll', 'scrollTo', 'fullscreen', 'ko'], function($){
	return {
		initialize: function(ko,clubView){
			console.log('renderer ready');
			// initialize custom scrolls
			$('.payment-options').mCustomScrollbar({
				horizontalScroll:true
			});
			$('.table-holder').mCustomScrollbar();
			// custom scroll container height function
			var container = $('body'),
				header = container.find('#header'),
				headerHeight = parseInt(header.outerHeight(true)),
				footer = container.find('#footer'),
				footerHeight = parseInt(header.outerHeight(true)),
				scrollHolder = container.find('.scroll-holder').mCustomScrollbar(),
				footerIndent = 23;
			function updateScrollHolderHeight(){
				scrollHolder.css({
					height: container.height() - (headerHeight + footerHeight + footerIndent)
				});
				scrollHolder.mCustomScrollbar('update');
			}
			updateScrollHolderHeight();
			$(window).on('resize',function(){
				updateScrollHolderHeight();
			});
			ko.utils.arrayForEach(clubView.sections.list, function(section){
				section.filteredGames.subscribe(function(){
					scrollHolder.mCustomScrollbar('update');
				});
			});
		}
	}
});