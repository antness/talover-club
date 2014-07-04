define(['ko', 'model/Tabs'], function(ko, Tabs){
	function Cashbox()
	{
		var cashbox = this;

		this.active = ko.observable(false);
		this.show = function(){
			cashbox.active(true);
		};
		this.toggle = function(show){
			if(typeof show === 'undefined')
				show = null;
			if(show === null)
				cashbox.active(!cashbox.active());
			else
				cashbox.active(show);
		};
		this.current = ko.observable(null);
		this.current.subscribe(function(view){
			ko.utils.arrayForEach(cashbox.list(), function(item){
				item.active(item === view);
			});
		});

		this.depositOnline = ko.observable(null);
		this.depositPin = ko.observable(null);
		this.withdraw = ko.observable(null);
		this.transactions = ko.observable(null);

		var itemNames = ['depositOnline', 'depositPin', 'withdraw', 'transactions'];
		this.list = ko.computed(function(){
			var list = [];

			ko.utils.arrayForEach(itemNames, function(name){
				var value = cashbox[name]();
				if(value !== null)
					list.push(value);
			});

			return list;
		});
	}

	return Cashbox;
});
