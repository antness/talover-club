m = angular.module('theclub.topBar.controllers', []);

m.controller('TopBarCtrl', function($scope, Game, Section){
	Section.query().then(function(sections){
		$scope.sections = sections;
	});

	$scope.$watchCollection('sections', function(sections){
		if(!sections)return;
		for(var i = 0; i < sections.length; ++i)
		{
			Game.query({section_id: sections[i].id}).then(function(i){
				return function(games){
					sections[i].games = games;
				};
			}(i));
		}
	});
});