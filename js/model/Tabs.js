define(['ko'], function(ko){
	function Tabs(list)
	{
		var tabs = this;
		this.list = list;
		this.current = ko.observable();
		this.current.subscribe(function(current){
			ko.utils.arrayForEach(tabs.list, function(tab){
				tab.active(tab === current);
			});
		});
		this.current(this.list[0]);
	}

	function Tab(params)
	{
		params = params || {};
		this.title = params.title || 'default';
		this.subTitle = params.subTitle || 'default';
		this.active = ko.observable(false);
		this.model = params.model;
	}

	return {
		Tabs: Tabs,
		Tab: Tab
	};
});