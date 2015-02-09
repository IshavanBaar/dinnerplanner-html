$(function() {
/*
	//We instantiate our model
	var model = new DinnerModel();
	model.setNumberOfGuests(3);
	
	//And create the needed controllers and views
	var exampleView = new ExampleView($("#exampleView"), model);
*/

	var dinnerModel = new DinnerModel();

	var homeView = new HomeView($('#homePage'), dinnerModel);

	$('.spinner').TouchSpin({
      verticalbuttons: true,
      verticalupclass: 'glyphicon glyphicon-plus',
      verticaldownclass: 'glyphicon glyphicon-minus',
      prefix: 'People: '
    });	
});