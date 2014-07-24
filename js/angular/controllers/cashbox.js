var cashboxControllers = angular.module('theclub.cashbox.controllers', []);

cashboxControllers.controller('Cashbox', function($scope, $rootScope) {
	$scope.closePopup = function($event) {
		$($event.currentTarget).closest('.lightbox').hide();
		$rootScope.lightbox._shown = false;
	};
});

cashboxControllers.controller('CashboxDeposit', function($scope, Cashbox) {
	$scope.code = null;
	$scope.error = null;
	$scope.request = function() {
		Cashbox.depositPin({code: $scope.code}).then(function() {
			alert('OK');
		}).catch(function(errorMessage) {
			$scope.error = errorMessage;
		});
	};
});

cashboxControllers.controller('CashboxWithdraw', function($scope, Cashbox) {
	$scope.amount = null;
	$scope.allIn = function() {
		return $scope.amount = 55555;
	};
	$scope.error = null;
	$scope.request = function() {
		Cashbox.withdrawPin({amount: $scope.amount}).then(function() {
			alert('OK');
		}).catch(function(errorMessage) {
			$scope.error = errorMessage;
		});
	};
});

cashboxControllers.controller('CashboxWithdraw', function($scope, Cashbox) {
	$scope.amount = null;
	$scope.allIn = function() {
		return $scope.amount = 55555;
	};
	$scope.error = null;
	$scope.request = function() {
		Cashbox.withdrawPin({amount: $scope.amount}).then(function() {
			alert('OK');
		}).catch(function(errorMessage) {
			$scope.error = errorMessage;
		});
	};
});

cashboxControllers.controller('CashboxHistory', function($scope, Cashbox, $timeout) {
	$scope.history = null;

	var carouselInitialization = function() {
		$("#account_history").owlCarousel({
			navigation: true,
			slideSpeed: 500,
			paginationSpeed: 500,
			singleItem: true
		});
	};

	(function() {
		Cashbox.history().then(function(data) {
			$scope.history = data;

			$timeout(carouselInitialization, 1000);
		});
	})();
});

cashboxControllers.provider('Cashbox', function(){
	var CashboxProvider = {
		$get: function($http, $q){
			var Cashbox = {
				depositPin: function(model){
					return $http.post('/rest_cashbox/deposit_pin', model)
						.then(function(response){
							if(response.data.success)
								return response.data;
							else
								return $q.reject(response.data.message);
						});
				},
				withdrawPin: function(model){
					return $http.post('/rest_cashbox/withdraw_pin', model)
						.then(function(response){
							if(response.data.success)
								return response.data;
							else
								return $q.reject(response.data.message);
						});
				},
				withdrawMethods: function(){
					return $http.get('/rest_cashbox/withdraw_methods')
						.then(function(response){
							return response.data;
						});
				},
				history: function(){
					return $http.get('/rest_cashbox/history').then(function(response){
						if(response.data.success)
							return response.data.history;
						else
							return $q.reject(response.data.message);
					});
				}
			};
			return Cashbox;
		}
	};
	return CashboxProvider;
});