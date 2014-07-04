define(['ko', 'model/Confirmation'], function(ko, Confirmation){
	function Withdraw(user)
	{
		var self = this;
		this.active = ko.observable(false);
		this.title = 'Withdraw';
		this.subTitle = 'through gameagent';
		this.predefinedValues = [
			new WithdrawValue(100),
			new WithdrawValue(300),
			new WithdrawValue(500),
			new WithdrawValue(1000),
			new WithdrawValue(-1, 'All')
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
			if(selectedPredefined !== null && selectedPredefined.value === -1)
			{
				return user.balance();
			}
			var manual = self.manualValue();

			return selectedPredefined && selectedPredefined.value || manual || 0;
		});

		this.submit = function(){
			self.confirmation.show();
		};

		this.confirmation = new Confirmation(function(){
			alert('ajax request... blah blah');
		}, function(){});
	}

	function WithdrawValue(value, title)
	{
		this.value = value;
		this.title = title || value;
		this.active = ko.observable(false);
	}

	return Withdraw;
});
