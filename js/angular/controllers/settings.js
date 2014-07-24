var settingsController = angular.module('theclub.settings.controllers', []);

settingsController.controller('Settings', function($scope, $rootScope, Settings, $cookies) {
	$scope.model = Settings.loaded;

	$scope.request = function() {
		Settings.save($scope.model).then(function(data) {
			$scope.model = data;
		});
	};
});

settingsController.provider('Settings', function() {
	var SettingsProvider = {
		allow: {
			auto_login: false,
			hide_settings: false,
			hide_cashbox: false,
			auto_withdraw: false
		},
		$get: function($http, $q, $cookies) {
			var Settings = {
				loaded: {},
				save: function(model) {
					var cookies = _.pick(model, _.keys(SettingsProvider.allow));
					_.each(cookies, function(value, key) {
						this.loaded[key] = value ? _.now().toString() : '';
					}.bind(this));

					// save
					angular.extend($cookies, this.loaded);

					// reload loaded-object
					this.load();

					return $q.when(this.loaded);
				},
				load: function() {
					this.loaded = _.pick($cookies, _.keys(SettingsProvider.allow));
					_.each(this.loaded, function(value, key) {
						this.loaded[key] = !!value;
					}.bind(this));
					this.loaded = _.defaults(this.loaded, SettingsProvider.allow);

					this.applyLoaded();
				},
				applyLoaded: function() {
					$('.action-settings').toggle(!this.loaded.hide_settings);
					$('.action-cashbox').toggle(!this.loaded.hide_cashbox);
				}
			};
			return Settings;
		}
	};
	return SettingsProvider;
});

settingsController.directive('stylerCheckbox', function($timeout) {
	return {
		require: '?ngModel',
		priority: 100,
		link: function($scope, $el, attrs, ngModel) {
			var st = $el.styler();

			ngModel.$render = function() {
				$el.prop('checked', ngModel.$viewValue);
				$el.parent().toggleClass('checked', ngModel.$viewValue);
			};

			$el.change(function() {
				var value = $el.prop('checked');
				$scope.$apply(function() {
					ngModel.$setViewValue(value);
				});
			});
		}
	};
});
