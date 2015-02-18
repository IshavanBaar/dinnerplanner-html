var EventController = function(view, model) {
	this.currentlySelectedDish = -1;
	
	this.itemClicked = function(id) {
		this.currentlySelectedDish = id;
	}
	
	this.itemAddedToList = function() {
		model.addDishToMenu(currentlySelectedDish);		
	}	

	////
	// Start new dinner
	////
	$('#startButton').click(function() {
		// reset everything
		model.setNumberOfGuests(1);
		view.currentDish = null;
		view.update('#pageSelectDish');		
	});

	////
	// Handle guest number changed
	////
	$('.spinner').change(function() {
		// check if new value is an integer
		var guestCount = getIntValue($(this).val());

		// update model
		model.setNumberOfGuests(guestCount);
		// update relevant fields
		$('.guest-count').html(guestCount);		
		view.updateSidebar();
		view.fillPageDishDetail();
	});

	function getIntValue(value) {
		try {
			return parseInt(value);
		} catch(err) {
			return 0;
		}
	}

	////
	// Handle dish selection changed
	////
	$('#availableDishes').ready(function() {
		$('a.dish-item').click(function() {

			var dishId = $(this).attr('dish-id');
			var dish = model.getDish(parseInt(dishId));

			$('#confirmDishButton').attr('dish-id', dishId);

			view.currentDish = dish;

			view.updateSidebar();
			view.update('#pageDishDetail');
		});	
	});
	
	////
	// Handle confirmation of dish
	////
	$('#confirmDishButton').click(function() {
		var dishId = $(this).attr('dish-id');

		// clear current dish
		view.currentDish = null;

		model.addDishToMenu(dishId);

		view.updateSidebar();
		view.update('#pageSelectDish');
	});

	////
	// Handle back to select dish button
	////
	$('#pageDishDetail').on('click', '#dishDetailBackButton', function() {
		view.update('#pageSelectDish');
	});	
}