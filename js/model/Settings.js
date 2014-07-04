define(['ko', 'model/Confirmation', 'model/Tabs'], function(ko, Confirmation, Tabs){
	function Settings()
	{
		var settings = this;
		this.active = ko.observable(false);
		this.title = 'Base';
		this.subTitle = 'Game Settings';
		this.toggle = function(show){
			if(typeof show === 'undefined')
				show = null;
			if(show === null)
				settings.active(!settings.active());
			else
				settings.active(show);
		};

		this.settingsBase = new SettingsBase();
		this.tabs = new Tabs.Tabs([
			new Tabs.Tab({title: 'Base', subTitle: 'Game Settings', model: this.settingsBase})
		]);
	}

	function SettingsBase()
	{
		var settingsBase = this;
		this.active = ko.observable(false);

		this.languages = [
			new Language({title: 'Русский', value: 'ru'}),
			new Language({title: 'English', value: 'en'}),
			new Language({title: 'Italian', value: 'it', enabled: false}),
			new Language({title: 'French', value: 'fr', enabled: false})
		];

		this.language = ko.observable();
		this.language.subscribe(function(current){
			ko.utils.arrayForEach(settingsBase.languages, function(lang){
				lang.active(lang === current);
			});
		});
		this.language(this.languages[0]);

		this.currencies = [
			new Currency({title: 'USD', value: 'usd'}),
			new Currency({title: 'EUR', value: 'eur'}),
			new Currency({title: 'RUR', value: 'rur', enabled: false})
		];

		this.currency = ko.observable();
		this.currency.subscribe(function(current){
			ko.utils.arrayForEach(settingsBase.currencies, function(currency){
				currency.active(currency === current);
			});
		});
		this.currency(this.currencies[0]);

		this.denominations = [
			new Denomination({value: 0.01}),
			new Denomination({value: 0.1}),
			new Denomination({value: 1})
		];

		this.denomination = ko.observable();
		this.denomination.subscribe(function(current){
			ko.utils.arrayForEach(settingsBase.denominations, function(denomination){
				denomination.active(denomination === current);
			});
		});
		this.denomination(this.denominations[2]);

		this.confirmation = new Confirmation(function(){
			alert('ajax bla bla');
		}, function(){});
	}

	function Language(params)
	{
		params = params || {};
		this.active = ko.observable(false);
		this.enabled = 'enabled' in params ? !!params.enabled : true;
		this.value = params.value || 'none';
		this.title = params.title || this.value;
		this.imageUrl = params.imageUrl || null;
	}

	function Currency(params)
	{
		params = params || {};
		this.active = ko.observable(false);
		this.enabled = 'enabled' in params ? !!params.enabled : true;
		this.value = params.value || 'none';
		this.title = params.title || this.value;
	}

	function Denomination(params)
	{
		params = params || {};
		this.active = ko.observable(false);
		this.enabled = 'enabled' in params ? !!params.enabled : true;
		this.value = params.value || 'none';
		this.title = '1 coin = ' + this.value.toFixed(2);
	}

	return {
		Settings: Settings,
		Language: Language,
		Currency: Currency,
		Denomination: Denomination
	};
});