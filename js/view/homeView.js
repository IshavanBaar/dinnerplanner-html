// View for home page
var HomeView = function (container, model) {
	
	// Temporary - used to show selected page
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
	$('.confirm-dish-button').click(function addDishToList() {
		var tableRef = $('#dinnerCheckList tbody');
		// Hardcoded values for now 
		var quantity = 4;
		var dishName = 'Meatballs';
		var dishCosts = 77.70;
		
		// Add row to table
		tableRef.prepend('<tr class="align-left"><td>'+quantity+'</td><td class="align-center">'+dishName+'</td><td class="align-right">'+dishCosts+'</td></tr>');
		
		// Change total costs
		var oldCosts = $('#totalCosts').text();
		var newCosts = Math.round((parseFloat(oldCosts) + dishCosts)* 10)/10;
		$('#totalCosts').text(newCosts);
	});
}
 
