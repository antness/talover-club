var m = angular.module('owlCarousel', []);

m.directive('owlCarousel', function(){
	return {
		restrict: 'A',
		scope: {},
		link: function(scope, el, attrs){

			if(attrs.items)
				scope.$parent.$watch(attrs.items, function(items){
					if(!items) return;
					initCaousel();
				});
			else
				initCaousel();

			function initCaousel(){
				el.owlCarousel({
					itemsCustom: [
						[0, 2],
						[450, 4],
						[600, 7],
						[700, 9],
						[1000, 11],
						[1200, 12],
						[1400, 14],
						[1600, 16],
						[1920, 18]
					],
					autoPlay: attrs.autoPlay || 5000,
					slideSpeed: attrs.slideSpeed || 500
				});
			}

			el.parent().find(".next").click(function () {
				el.trigger('owl.next');
			});
			el.parent().find(".prev").click(function () {
				el.trigger('owl.prev');
			});
		}
	};
});