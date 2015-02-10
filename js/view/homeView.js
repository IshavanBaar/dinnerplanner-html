// View for home page
var HomeView = function (container, model) {	
	
	// Variable to manage current dish.
	this.currentDish; 
	this.currentDishQuantity; // TODO - something with this.
	
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
	
	// Confirm dish by adding it to list
	$('#confirm-dish-button').click(function addDishToList() {
		var tableRef = $('#dinnerCheckList tbody'); 
		
		var quantity = -999; // TODO - hardcoded values for now
		var dishName = currentDish.name;
		var dishCosts = getCurrentDishPrice(currentDish);
		
		// Add row to table
		tableRef.prepend('<tr class="align-left"><td>'+quantity+'</td><td class="align-center">'+dishName+'</td><td class="align-right">'+dishCosts+'</td></tr>');
		
		// Change total costs
		var oldCosts = $('#totalCosts').text();
		var newCosts = Math.round((parseFloat(oldCosts) + dishCosts)* 10)/10;
		$('#totalCosts').text(newCosts);
	});
	
	// Fills available dishes in dish selection screen
	$('#availableDishes').ready(function fillAvailableDishes() {
		var fullMenu = model.getAllDishes();
		var numberOfMenuItems = fullMenu.length;
		for (var i = 0; i < numberOfMenuItems; i++) {
			var dish = fullMenu[i];
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
		
		// Show dish detail page when clicking a dish
		$('a.dish-item').click(function() {
			// Get dish clicked
			var dishId = $(this).attr('dish-id');
			currentDish = model.getDish(dishId);
			
			// Needed fields for dish detail page
			var dishName = currentDish.name;
			var dishImage = 'images/'+ currentDish.image;
			var dishDescription = currentDish.description.substr(0, 37) + '...'; 
			var dishIngredients = currentDish.ingredients;
			var dishPreparation = currentDish.description.substr(0, 37) + '...'; // No preparation field in dishes array?!
			
			
			// Fill dish detail page if not filled already
			fillPageDishDetail(dishName, dishImage, dishDescription, dishIngredients, dishPreparation);
			
			// Hide all other pages
			$('.page').hide();
			
			// Show selected page
			$('#pageDishDetail').show();
		});
		
		// Fills dish detail page
		function fillPageDishDetail(dishName, dishImage, dishDescription, dishIngredients, dishPreparation) {
			// Fill dish name and description fields
			$('#dishNameDescription').empty();
			$('#dishNameDescription').append(
				'<h2 class="page-header">'+dishName+'</h2>'+
				'<p><img class="dish-image" src="'+dishImage+'"/></p>'+
				'<p class="dish-description">'+dishDescription+'</p>'
			);

			// Fill dish ingredients table
			var numberOfIngredients = dishIngredients.length;
			for (var i = 0; i<numberOfIngredients; i++) {
				var ingredient = dishIngredients[i];
				
				var ingredientName = ingredient.name;
				var ingredientQuantity = ingredient.quantity;
				var ingredientUnit = ingredient.unit;
				var ingredientPrice = ingredient.price;
				
				$('#dishIngredients').empty();
				$('#dishIngredients').append(
					'<tr>'+
						'<td>'+ingredientQuantity+'</td>'+
						'<td>'+ingredientName+'</td>'+
						'<td>'+ingredientUnit+'</td>'+
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
	});
	
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
}
 
