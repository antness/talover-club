require(['ko', 'jquery', 'TheClubView', 'renderer', 'koext/bindings', 'koext/extenders',
	'model/User', 'model/Sections', 'model/Section', 'model/Game', 'model/GameFilter',
	'model/cashbox/Cashbox', 'model/cashbox/DepositOnline', 'model/cashbox/DepositPin', 'model/cashbox/Withdraw', 'model/cashbox/Transactions',
	'model/Settings'
],
	function(ko, $, TheClubView, renderer, bindings, extenders,
	         User, Sections, Section, Game, GameFilter,
	         Cashbox, DepositOnline, DepositPin, Withdraw, Transactions,
			 Settings
	){
	var clubView = new TheClubView();
	window.view = clubView;

	clubView.user = new User();
	clubView.sections = new Sections();
	clubView.cashbox = new Cashbox();
	clubView.cashbox.depositOnline(new DepositOnline());
	clubView.cashbox.depositPin(new DepositPin());
	clubView.cashbox.withdraw(new Withdraw(clubView.user));
	clubView.cashbox.transactions(new Transactions.Transactions());
	clubView.settings = new Settings.Settings();

	var demo = true;
	if(demo)
	{
		clubView.user.username = 'DemoUser';
		clubView.user.balance(4321);

		var section = new Section();
		section.title = 'Casino';
		section.games([
			new Game({title: 'game 1', categoryId: 1, brandId: 1, isNew: true}),
			new Game({title: 'game 2', categoryId: 1, brandId: 1}),
			new Game({title: 'game 3', categoryId: 1, brandId: 2, isNew: true}),
			new Game({title: 'game 4', categoryId: 2, brandId: 2}),
			new Game({title: 'game 5', categoryId: 2, brandId: 3, isNew: true}),
			new Game({title: 'game 6', categoryId: 2, brandId: 3}),
			new Game({title: 'game 7', categoryId: 2, brandId: 3, isNew: true}),
			new Game({title: 'game 8', categoryId: 1, brandId: 4})
		]);
		section.filters = [
			new GameFilter.GamePropertyFilter({
				title: 'Category',
				propertyName: 'categoryId',
				valueList: [
					new GameFilter.GamePropertyItem(1, 'Новинки'),
					new GameFilter.GamePropertyItem(2, 'ДжекПоты'),
					new GameFilter.GamePropertyItem(3, 'Слоты'),
					new GameFilter.GamePropertyItem(4, '3D Слоты'),
					new GameFilter.GamePropertyItem(5, 'Настольные'),
					new GameFilter.GamePropertyItem(6, 'Видеопокер')
				]
			}),
			new GameFilter.GamePropertyFilter({
				title: 'Brand',
				propertyName: 'brandId',
				valueList: [
					new GameFilter.GamePropertyItem(1, 'Brand 1'),
					new GameFilter.GamePropertyItem(2, 'Brand 2'),
					new GameFilter.GamePropertyItem(3, 'Brand 3'),
					new GameFilter.GamePropertyItem(4, 'Brand 4')
				]
			})
		];
		section.filter(section.filters[0]);
		section.filter().value(section.filter().valueList[0]);

		section.customFilters = [
			new GameFilter.GameFilterAll({title: 'All'}),
			new GameFilter.GameFilterNew({title: 'New'})
		];
		clubView.sections.list.push(section);

		section = new Section();
		section.title = 'Bingo';
		clubView.sections.list.push(section);

		clubView.sections.current(clubView.sections.list[0]);

		clubView.cashbox.transactions().list = [
			new Transactions.Transaction({id: 1, type: 'deposit', time: '2013-04-12', amount: 500}),
			new Transactions.Transaction({id: 1, type: 'withdraw', time: '2013-04-12', amount: 500}),
			new Transactions.Transaction({id: 1, type: 'deposit', time: '2013-04-12', amount: 500}),
			new Transactions.Transaction({id: 1, type: 'deposit', time: '2013-04-12', amount: 500}),
			new Transactions.Transaction({id: 1, type: 'deposit', time: '2013-04-12', amount: 500}),
			new Transactions.Transaction({id: 1, type: 'deposit', time: '2013-04-12', amount: 500}),
			new Transactions.Transaction({id: 1, type: 'deposit', time: '2013-04-12', amount: 500})
		];
	}

	$(document).ready(function(){
		ko.applyBindings(clubView);
		renderer.initialize(ko,clubView);
	});
});