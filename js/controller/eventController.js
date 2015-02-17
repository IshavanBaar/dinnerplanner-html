var EventController = function(model) {
	this.currentlySelectedDish = -1;
	
	this.itemClicked = function(id) {
		this.currentlySelectedDish = id;
	}
	
	this.itemAddedToList = function() {
		model.addDishToMenu(currentlySelectedDish);		
	}
}


