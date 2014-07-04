define(['ko', 'model/Confirmation'], function(ko, Confirmation){
	function DepositOnline()
	{
		var self = this;
		this.active = ko.observable(false);
		this.title = 'Deposit';
		this.subTitle = 'online';
		this.predefinedValues = [
			new DepositValue(100),
			new DepositValue(300),
			new DepositValue(500),
			new DepositValue(1000),
			new DepositValue(3000)
		];
		this.selectedPredefinedValue = ko.observable(null);
		this.selectedPredefinedValue.subscribe(function(newValue){
			ko.utils.arrayForEach(self.predefinedValues, function(eachValue){
				eachValue.active(eachValue === newValue);
			});
			if(newValue !== null)
				self.manualValue(null);
		});
		this.clickPredefinedValue = function(predefinedValue){
			self.selectedPredefinedValue(predefinedValue);
		};

		this.manualValue = ko.observable(null);
		this.manualValue.subscribe(function(newValue){
			if(newValue == null)
				return;
			newValue = parseFloat(newValue);
			if(newValue > 0)
				self.selectedPredefinedValue(null);
		});

		this.amount = ko.computed(function(){
			var selectedPredefined = self.selectedPredefinedValue();
			var manual = self.manualValue();

			return selectedPredefined && selectedPredefined.value || manual || 0;
		});

		this.submit = function(){
			self.confirmation.show();
		};
		this.reset = function(){
			self.selectedPredefinedValue(null);
			self.manualValue(null);
		};

		this.confirmation = new Confirmation(function(){
			alert('ajax request... blah blah');
		}, function(){});
	}

	function DepositValue(value)
	{
		this.value = value;
		this.active = ko.observable(false);
	}

	return DepositOnline;
});
