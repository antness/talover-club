var gamesModule = angular.module('theclub.games', [
	'ui.router'
]);

gamesModule.config(function($stateProvider, $urlRouterProvider) {
	/*$stateProvider
		.state('games', {
			url: '/games',
			templateUrl: '/templates/games.html',
			resolve: {
				filters: function(Game) {
					return Game.filters();
				},
				mainFilterId: function() {return 0;}
			},
			controller: function($scope, filters, $state, $stateParams, mainFilterId) {
				$scope.filterValues = filters[mainFilterId].values;
				$scope.currentCategory = $scope.filterValues[mainFilterId];

				if(!$state.params.categoryId)
					$state.go('games.category', {categoryId: $scope.currentCategory.id});
			}
		})
		.state('games.category', {
			url: '/{categoryId}',
			templateUrl: '/templates/games.category.html',
			controller: function($scope, filters, $state, $stateParams) {
				var category = null;
				for(var key in $scope.filterValues)
				{
					if($scope.filterValues.hasOwnProperty(key) && $scope.filterValues[key].id == $stateParams.categoryId)
					{
						category = $scope.filterValues[key];
						break;
					}
				}

				if(category === null)
					return $state.go('error', {id: 404});

				$scope.currentCategory = category;
				$scope.pages = [];

				var pageItemsSize = 12;

				$scope.$watchCollection('currentCategory.games', function(items) {
					var countPages = Math.ceil(items.length / pageItemsSize);

					$scope.pages.splice(0, $scope.pages.length);

					for(var i=0; i < countPages; ++i)
					{
						var page = items.slice(i * pageItemsSize, (i + 1) * pageItemsSize);
						$scope.pages.push(page);
					}
				});
			}
		});*/

	$urlRouterProvider
		.when('', '/sections')
		.otherwise('/error/404');

	$stateProvider
		.state('root', {
			abstract: true,
			template: '<ui-view></ui-view>'
		})
		.state('root.sections', {
			url: '/sections'
		})
		.state('root.section', {
			url: '/section/:section',
			templateUrl: 'templates/games.section.html',
			controller: function($scope, $q, Game, Category, $stateParams) {
				Category.list($stateParams.section).then(function(categories){
					$scope.categories = categories;
				});
			}
		})
		.state('root.section.category', {
			url: '/:category',
			templateUrl: 'templates/games.category.html',
			controller: function($scope, Game, $stateParams){
				Game.list($stateParams.section, $stateParams.category).then(function(games){
					$scope.games = games;
				});
				$scope.$watchCollection('games', function(){
					$scope.$broadcast('contentSizeChanged');
				});
			}
		})
		.state('root.game', {
			url: '/:game',
			templateUrl: 'templates/games.game.html',
			onEnter: function() {
				$('#footer').hide();
			},
			onExit: function() {
				$('#footer').show();
			},
			controller: function($scope) {

			}
		});
});

gamesModule.run(function($rootScope, Category, $state, $stateParams, Section) {

	$rootScope.sections = null;
	var sectionsPromise = Section.query().then(function(sections) {
		$rootScope.sections = sections;
	});

	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
		if(toState.name === 'root.section')
		{
			Category.list($stateParams.section).then(function(categories){
				if(categories.length > 0)
					$state.go('root.section.category', {category: categories[0].id});
			});
		}

		if(toState.name === 'root.sections') {
			sectionsPromise.then(function() {
				$state.go('root.section', {section: $rootScope.sections[0].id});
			});
		}
	});
});

gamesModule.factory('Section', function($http){
	return {
		query: function () {
			return $http.get('/rest_section/query', {cache: true}).then(function (response) {
				return response.data;
			});
		}
	};
});

gamesModule.provider('Game', function() {
	var GameProvider = {
		$get: function($q, $http, Category) {
			var Game = {
				query: function(params) {
					return $http.get('/rest_game/query', {params: params, cache: true}).then(function(response){
						return response.data;
					});
				},
				list: function(sectionId, categoryId){
					return Category.get(sectionId, categoryId).then(function(cat){
						return cat.games;
					});
				}
			};
			return Game;
		}
	};
	return GameProvider;
});

gamesModule.factory('Category', function($http, $q){
	var Category = {
		list: function(sectionId){
			return $http.get('/rest_game/by_filter', {params: {section_id: sectionId}, cache: true})
				.then(function(response){
					return response.data[0].values;
				});
		},
		get: function(sectionId, catId){
			return Category.list(sectionId).then(function(cats){
				for(var i = 0; i < cats.length; ++i)
				{
					if(cats[i].id == catId)
					{
						return cats[i];
					}
				}
				return $q.reject('Category not found');
			});
		}
	};
	return Category;
});

gamesModule.provider('Jackpot', function() {
	var JackpotProvider = {
		$get: function($http, $q, $interval) {
			function startUpdating() {
				$interval(function(){
					Jackpot.value += 0.02;
				}, 1000);
			}

			function httpGetJackpot(){
				return $http.get('/rest_jackpot/query').then(function(response){
					return parseFloat(response.data);
				});
			}

			var Jackpot = {
				value: 0,
				get: function() {
					return $q.when(httpGetJackpot()).then(function(jpvalue) {
						Jackpot.value = jpvalue;

						startUpdating();

						return jpvalue;
					});
				}
			};
			return Jackpot;
		}
	};
	return JackpotProvider;
});
