var m = angular.module('nnFullHeight', []);
m.directive('nnFullHeight', function() {
	return {
		link: function($scope, $el, attrs) {
			$el.css({height: $('body').height() - $('#TopBar').outerHeight(true)});
		}
	};
});