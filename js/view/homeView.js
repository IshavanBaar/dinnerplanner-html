// View for home page
var HomeView = function (container, model) {	
	
	// Variable to manage current dish.
	this.currentDishQuantity; // TODO - something with this.
	this.currentDish;
	
	var dummyText = 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.'
		+ '<br/><br/> Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.';
	
	// TODO hardcoded, not get away? - used to show selected page
	$('.page-switch-button').click(function() {
		// hide all other pages
		$('.page').hide();

		// get page div id from button id
		var pageDivId = _getPageDivId($(this).attr('location'));
		// show selected page
		$('#' + pageDivId).show();
	});

	function _getPageDivId(buttonLocation) {
		// a page switch button has the "location" attribute like toPageX, while a page div has the id like PageX
		// remove first 3 letters in the id
		var pageName = buttonLocation.substr(3);
		// add lowercase 'p' letter to the name
		return 'p' + pageName;
	}

	// make the spinner for guest number input
	$('.spinner').TouchSpin({
      verticalbuttons: true,
      verticalupclass: 'glyphicon glyphicon-plus',
      verticaldownclass: 'glyphicon glyphicon-minus',
      prefix: 'People: ',
      max: 100,
      min: 1,
      initval: 1
    });    	

	this.updateSidebar = function() {
		var tableRef = $('#dinnerCheckList tbody').empty();		

		var quantity = model.getNumberOfGuests();

		// update pending dish
		if (this.currentDish) {
			$('.pending-price').html(getCurrentDishPrice(this.currentDish) * quantity);
		} else {
			$('.pending-price').html('0');
		}

		// update menu
		var menu = model.getFullMenu();
		for (var i = 0; i < menu.length; i++) {
			var dishName = menu[i].name;
			var dishCost = getCurrentDishPrice(menu[i]) * quantity;
			tableRef.prepend('<tr class="align-left"><td>'+quantity+'</td><td class="align-center">'+dishName+'</td><td class="align-right">'+dishCost+'</td></tr>');
		}
		var cost = model.getTotalMenuPrice();
		$('.total').html(cost * quantity);
	}
	
	// Fills available dishes in dish selection screen
	$('#availableDishes').ready(function fillAvailableDishes() {
		var allDishes = model.getAllDishes();
		var numberOfMenuItems = allDishes.length;
		for (var i = 0; i < numberOfMenuItems; i++) {
			var dish = allDishes[i];
			var dishId = dish.id;
			var dishName = dish.name;
			var dishImage = 'images/'+ dish.image;
			var dishDescription = dish.description.substr(0, 37) + '...';
			
			$('#availableDishes').append(
				'<li>'+
					'<a href="#" dish-id="'+dishId+'" class="dish-item"><img class="dish-image" src="'+dishImage+'" alt="'+dishName+'"/>'+
					'<div class="dish-name">'+dishName+'</div></a>'+
					'<div class="dish-description">'+dishDescription+'</div>'+
				'</li>'
			);
		}
		
		// deleted. handle dish click event in controller
	});

	// Fills dish detail page
	this.fillPageDishDetail = function() {
		var currentDish = this.currentDish;
		// get fields
		var dishName = currentDish.name;
		var dishImage = 'images/'+ currentDish.image;
		var dishDescription = currentDish.description; 
		var dishIngredients = currentDish.ingredients;
		var dishPreparation = dummyText;

		var guests = model.getNumberOfGuests();

		// Fill dish name and description fields
		$('#dishNameDescription').empty();
		$('#dishNameDescription').append(
			'<h2 class="page-header">'+dishName+'</h2>'+
			'<div class="image-wrap"><img class="dish-image" src="'+dishImage+'"/></div>'+
			'<p class="dish-description">'+dishDescription+'</p>' +
			'<button id="dishDetailBackButton">Back to Select Dish</button>'
		);			

		// Fill dish ingredients table
		$('#dishIngredients').empty();
		var numberOfIngredients = dishIngredients.length;
		for (var i = 0; i<numberOfIngredients; i++) {
			var ingredient = dishIngredients[i];
			
			var ingredientName = ingredient.name;
			var ingredientQuantity = Math.round(ingredient.quantity * guests * 10)/10;
			var ingredientUnit = ingredient.unit;
			var ingredientPrice = ingredient.price * guests;
			
			$('#dishIngredients').append(
				'<tr>'+
					'<td>'+ingredientQuantity+'</td>'+
					'<td>'+ingredientUnit+'</td>'+
					'<td>'+ingredientName+'</td>'+
					'<td>SEK</td>'+
					'<td class="align-right">'+ingredientPrice+'</td>'+
				'</tr>'
			);	
		}

		// Fill preparation field 
		$('#dishPreparation').empty();		
		$('#dishPreparation').append(			
			'<h2 class="page-header">Preparation</h2>'+			
			'<p class="dish-preparation">'+dishPreparation+'</p>'	
		)		
	}	
	
	function getCurrentDishPrice(dish) {
		var dishIngredients = dish.ingredients;
		var currentDishPrice = 0.0;
		var numberOfIngredients = dishIngredients.length;
		for (var i = 0; i<numberOfIngredients; i++) {
			var ingredient = dishIngredients[i];
			
			var ingredientName = ingredient.name;
			var ingredientQuantity = ingredient.quantity;
			var ingredientUnit = ingredient.unit;
			var ingredientPrice = ingredient.price;
			
			// Manage dishPrice
			currentDishPrice += ingredientPrice;
		}
		return Math.round(currentDishPrice * 10)/10;
	}
	
	//Fills the dish overview page.
	$('#confirmDinnerButton').click(function fillPageDishOverview() {
		var fullMenu = model.getFullMenu();
		var numberOfSelectedDishes = fullMenu.length;
		for (var i = 0; i < numberOfSelectedDishes; i++) {
			var dish = fullMenu[i];
			var dishName = dish.name;
			var dishImage = 'images/'+ dish.image;
			
			//$('.overview-dish-list').empty(); TODO this gives problems now
			$('.overview-dish-list').append(
				'<li>'+
					'<a href="#" id="toPagePreparation">'+
						'<img src="'+dishImage+'" alt="'+dishName+'" title="'+dishName+'/>'+
					'<div class="dish-title">'+dishName+'</div></a>'+
					'<div class="dish-price">'+'999'+'</div>'+ //TODO change -999 to dishPrice
				'</li>'
			);
		}
		
		//At the end, append total price.
		$('.overview-dish-list').append(
			'<li class="before-total"></li>'+
			'<li class="total">Total:<br/><b>999 SEK</b></li>' //TODO change 999 to dishPrice
		);
	});
	
	//Fills the preparation page after print button has been hit.
	$('#pagePreparationButton').click(function fillPagePreparation() {	
		var fullMenu = model.getFullMenu();
		var numberOfSelectedDishes = fullMenu.length;
		for (var i = 0; i < numberOfSelectedDishes; i++) {
			var dish = fullMenu[i];
			var dishName = dish.name;
			var dishImage = 'images/'+ dish.image;
			var dishDescription = dish.description.substr(0, 37) + '...';
			
			//$('#overview-preparation-list').empty(); TODO this gives problems now
			$('#overview-preparation-list').append(
				'<div class="row has-background has-extra-padding">'+
					'<div class="background"></div>'+
					'<div class="col-md-2"><img class="dish-image" src="'+dishImage+'" title="'+dishName+'"/></div>'+
					'<div class="col-md-4">'+
						'<h4 class="dish-name">'+dishName+'</h4>'+
						'<p class="dish-description">'+dishDescription+'</p>'+
					'</div>'+
					'<div class="col-md-6">'+
						'<h4>Preparation</h4>'+
						'<p class="dish-preparation">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.'+
						'<br/><br/>'+
						'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</p>'+
					'</div>'+
				'</div>'
			);
		}
	});

	function loadPage(pageSelector) {
		$('.page').hide();
		$(pageSelector).show();
	}

	////
	// Functions to update the view
	////		

	this.update = function(page) {
		// load dynamic fields
		// - number of guests
		var guestCount = model.getNumberOfGuests();
		$('.spinner').val(guestCount);
		$('.guest-count').html(guestCount);

		// - selected dish
		if (this.currentDish) {
			this.fillPageDishDetail();
		}
		// TODO something here on loading the selectDish page
		
		// load the page
		loadPage(page);
	}
}
 
