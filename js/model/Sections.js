define(['ko'], function(ko){
	function Sections()
	{
		var sections = this;
		this.list = [];
		this.current = ko.observable(null);
		this.current.subscribe(function(newCurrentSection){
			ko.utils.arrayForEach(sections.list, function(eachSection){
				eachSection.active(eachSection === newCurrentSection);
			});
		});
	}

	return Sections;
});
