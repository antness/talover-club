define(['ko'], function(ko){
	function Section()
	{
		var section = this;
		this.title = 'default title';
		this.active = ko.observable(false);
		this.games = ko.observableArray([]);
		this.filters = [];
		this.filter = ko.observable(null);
		this.filter.subscribe(function(filter){
			ko.utils.arrayForEach(section.filters, function(eachFilter){
				eachFilter.active(eachFilter === filter);
			});
			if(filter != null)
			{
				section.customFilter(null);
			}
		});
		this.customFilters = [];
		this.customFilter = ko.observable(null);
		this.customFilter.subscribe(function(filter){
			ko.utils.arrayForEach(section.customFilters, function(eachFilter){
				eachFilter.active(eachFilter === filter);
			});
			if(filter != null)
			{
				var propFilter = section.filter();
				if(propFilter != null)
				{
					propFilter.hasEffect(false);
				}
			}
		});
		this.actualFilter = ko.computed(function(){
			var filter = section.filter();
			var customFilter = section.customFilter();
			if(filter != null && filter.hasEffect())
				return filter;
			if(customFilter != null)
				return customFilter;
			return null;
		});
		this.filteredGames = ko.computed(function(){
			var filter = section.actualFilter();
			if(filter == null)
				return section.games();
			return ko.utils.arrayFilter(section.games(), filter.isMatch);
		});
	}

	return Section;
});