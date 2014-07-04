define(['ko'], function(ko){
	function GameFilter(props)
	{
		props = props || {};
		this.title = props.title || 'default title';
		this.isMatch = props.isMatch || function(game){return true;};
		this.active = ko.observable(false);
	}

	function GamePropertyFilter(props)
	{
		var filter = this;
		GameFilter.call(this, props);
		this.propertyName = props.propertyName;
		this.valueList = props.valueList; // array of GamePropertyItem
		this.value = ko.observable(null); // GamePropertyItem
		this.value.subscribe(function(newValue){
			ko.utils.arrayForEach(filter.valueList, function(eachValue){
				eachValue.active(eachValue === newValue);
			});
		});
		this.select = function(value){
			filter.value(value);
		};
		this.hasEffect = ko.computed({
			read: function(){
				return filter.active() && filter.value() != null;
			},
			write: function(value){
				if(!value){
					filter.value(null);
				}
			}
		});
		this.isMatch = function(game){
			var filterValue = filter.value(); // GamePropertyItem
			if(filterValue == null)
				return true;
			return ko.utils.unwrapObservable(game[filter.propertyName]) == filterValue.value;
		};
	}

	function GamePropertyItem(value, title)
	{
		this.value = value;
		this.title = title;
		this.active = ko.observable(false);
	}

	function GameFilterNew(props)
	{
		var filter = this;
		GameFilter.call(this, props);
		this.isMatch = function(game){
			return ko.utils.unwrapObservable(game.isNew);
		};
	}

	function GameFilterAll(props)
	{
		var filter = this;
		GameFilter.call(this, props);
		this.isMatch = function(game){
			return true;
		};
	}

	return {
		GameFilter: GameFilter,
		GamePropertyFilter: GamePropertyFilter,
		GameFilterNew: GameFilterNew,
		GameFilterAll: GameFilterAll,
		GamePropertyItem: GamePropertyItem
	};
});
