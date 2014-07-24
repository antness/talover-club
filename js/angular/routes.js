var routes = angular.module('theclub.routes', [
	'ui.router'
]);

routes.config(function() {

});

routes.run(function($rootScope, $state, $stateParams) {
	console.log('Routing started...');

	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
});