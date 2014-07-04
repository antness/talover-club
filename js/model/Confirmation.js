define(['ko'], function(ko){
	function Confirmation(okCallback, cancelCallback)
	{
		var self = this;
		this.active = ko.observable(false);
		this.show = function(){
			self.active(true);
		};
		this.ok = function(){
			okCallback();
			self.active(false);
		};
		this.cancel = function(){
			cancelCallback();
			self.active(false);
		};
	}

	return Confirmation;
});
