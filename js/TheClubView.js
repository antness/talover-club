define(['ko'], function(ko) {
	function TheClubView()
	{
		this.backgroundUrl = ko.observable();
		this.user = null;
		this.sections = null;
		this.cashbox = null;
		this.settings = null;
	}

	return TheClubView;
});