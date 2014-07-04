define(['ko'], function(ko){
	function Game(props)
	{
		var game = this;
		this.title = props.title || 'default title';
		this.imageUrl = props.imageUrl || null;
		this.categoryId = props.categoryId || 0;
		this.brandId = props.brandId || 0;
		this.isNew = props.isNew || false;
		this.launch = function(){
			alert('Start ' + game.title);
		};
	}

	return Game;
});