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
	$('.confirm-dish-button').click(function() {
		// hide all other pages
		$('.page').hide();

		// get page div id from button id
		var pageDivId = _getPageDivId($(this).attr('id'));
		// show selected page
		$('#' + pageDivId).show();
	});
	
	function insertText () {
		document.getElementById('td1').innerHTML = "Some text to enter";	
	}
}
 
