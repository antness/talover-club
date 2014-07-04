define(['ko'], function(ko){
	function User()
	{
		var user = this;
		this.username = 'default name'
		this.balance = ko.observable(0);
		this.balanceText = ko.computed(function(){return user.balance() + '$';});
	}

	return User;
});