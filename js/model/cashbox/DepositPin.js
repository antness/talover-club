define(['ko'], function(ko){
	function DepositPin()
	{
		var self = this;
		this.active = ko.observable(false);
		this.title = 'Deposit';
		this.subTitle = 'pin';
		this.pin = ko.observable('');
		this.pinFocus = ko.observable(false);
		this.submit = function(){
			var pin = self.pin();
			alert('DepositPin submitted ' + pin);

			self.reset();
		};

		this.ok = function(){
			self.submit();
		};
		this.cancel = function(){
			self.reset();
			self.pinFocus(true);
		};
		this.reset = function(){
			self.pin('');
		};
	}

	return DepositPin;
});
