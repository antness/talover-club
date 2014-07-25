var m = angular.module('nnCustomScrollbar', []);

m.directive('nnCustomScrollbar', function() {
	return {
		link: function($scope, $el, attrs) {
			$el.mCustomScrollbar();
		}
	};
});


m.directive('kostyl1', function($timeout) {
	return {
		link: function($scope, $el) {
			var updateScrollHolderHeight = function() {
				var selectors = ['#header', '#footer']; //'#TopBar',
				var heightSum = _.reduce(selectors, function(memo, selector) { return memo + $(selector).outerHeight(true); }, 0);
				$el.css({height: $('body').height() - heightSum - 30});
				$el.mCustomScrollbar('update');
			};

			$scope.$on('contentSizeChanged', function(event) {
				$timeout(updateScrollHolderHeight, 100);
			});

			$(window).on('resize',function() {
				updateScrollHolderHeight();
			});
		}
	};
});