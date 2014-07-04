define(['ko'], function(ko){
	ko.bindingHandlers.popup = {
		update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		// element - тот элемент на котором стоит data-bind="popup..."
		var show = ko.utils.unwrapObservable(valueAccessor()),
			targetElement = $(element);
			if(show){
				targetElement.show();
			}
			else{
				targetElement.hide();
			}
		}
	};
});
