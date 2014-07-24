var m = angular.module('nnCustomScrollbar', []);

m.directive('nnCustomScrollbar', function(){
	return {
		link: function($scope, $el, attrs){
			$el.mCustomScrollbar();
		}
	};
});


m.directive('kostyl1', function($timeout){
	return {
		link: function($scope, $el){
			var container = $('body'),
				header = container.find('#header'),
				headerHeight = parseInt(header.outerHeight(true)),
				footer = container.find('#footer'),
				footerHeight = parseInt(header.outerHeight(true)),
				footerIndent = 23;

			function updateScrollHolderHeight(){
				$el.css({
					height: container.height() - (headerHeight + footerHeight + footerIndent)
				});
				$el.mCustomScrollbar('update');
			}
			updateScrollHolderHeight();
			$scope.$on('contentSizeChanged', function(event){
				$timeout(updateScrollHolderHeight, 100);
			});
			$(window).on('resize',function(){
				updateScrollHolderHeight();
			});
		}
	};
});