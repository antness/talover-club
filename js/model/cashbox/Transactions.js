define(['ko'], function(ko){
	function Transactions()
	{
		var self = this;
		this.active = ko.observable(false);
		this.title = 'Account History';
		this.subTitle = 'transaction list';
		this.list = [];
		this.current = ko.observable(null);
		this.current.subscribe(function(current){
			ko.utils.arrayForEach(self.list, function(transaction){
				transaction.active(transaction === current);
			});
		});
		this.clickTransaction = function (transaction) {
			if(self.current() === transaction)
				self.current(null);
			else
				self.current(transaction);
		};
	}

	function Transaction(params)
	{
		var trans = this;
		this.active = ko.observable(false);
		this.id = params.id || 'id';
		this.time = params.time || 0;
		this.type = params.type || 'unknown'; // deposit | withdraw
		this.amount = params.amount || '?';
		this.method = params.method || 'unknown';
		this.account = params.account || 'unknown';
		this.pin = params.pin || 'unknown';
		this.status = params.status || 'unknown';
	}

	return {
		Transactions: Transactions,
		Transaction: Transaction
	};
});