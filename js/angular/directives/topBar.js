var m = angular.module('topBar', []);
m.directive('topBar', function(){
	return {
		restrict: 'A',
		controller: function($scope){
			$scope.bar = {
				visible: false,
				pages: this.pages = [],
				activePage: null,
				clickPageBtn: function(page){
					if(page === $scope.bar.activePage)
						$scope.bar.hideAll();
					else
						$scope.bar.setPage(page);
				},
				setPage: function(page){
					$scope.bar.activePage = page;
					$scope.bar.visible = true;
				},
				hideAll: function(){
					$scope.bar.activePage = null;
					$scope.bar.visible = false;
				}
			};
			this.addPage = function(page){
				this.pages.push(page);
			};
			this.removePage = function(page){
				var pos = this.pages.indexOf(page);
				if(pos >= 0)
					this.pages.splice(pos, 1);
			};
		},
		link: function(scope, el, attrs){
			scope.$watch('bar.visible', function(v){
				if(v === true && scope.bar.activePage === null){
					scope.bar.setPage(scope.bar.pages[0]);
				}else if(v === false && scope.bar.activePage !== null){
					scope.bar.hideAll();
				}
			});
		}
	};
});
m.directive('topBarPage', function(){
	return {
		restrict: 'A',
		require: '^topBar',
		link: function(scope, el, attrs, topBar){
			var page = {
				el: el,
				title: null
			};
			topBar.addPage(page);
			attrs.$observe('pageTitle', function(title){
				page.title = title;
			});
			scope.$watch('bar.activePage', function(p, old){
				if(p === old) return;
				if(p === page)
				{
					// show
					el.slideDown().addClass('active');
				}
				else
				{
					// hide
					el.slideUp().removeClass('active')
				}
			});
			scope.$on('$destroy', function(){
				topBar.removePage(page);
			});
		}
	};
});

m.directive('tbToggleButton', function(){
	return {
		restrict: 'E',
		require: '?ngModel',
		template:
			'<a id="ShowBar" data-toggle="#CasinoJackPots" href="javascript:void(0)" ng-show="!visible" ng-click="show()">Show Bar<i></i></a>' +
			'<a id="HideBar" href="javascript:void(0)" ng-show="visible" ng-click="hide()">Hide Bar<i></i></a>',
		link: function($scope, $el, attrs, ngModel){
			$scope.visible = false;
			ngModel.$render = function(){
				$scope.visible = ngModel.$modelValue;
			};
			$scope.show = function(){
				ngModel.$setViewValue(true);
				ngModel.$render();
			};
			$scope.hide = function(){
				ngModel.$setViewValue(false);
				ngModel.$render();
			};
		}
	};
});