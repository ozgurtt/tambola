$(document).ready(function(){
	var request = $.ajax({
  		url: "http://developer.goibibo.com/api/search",
  		type: "GET",
  		data: "app_id=405b12da&app_key=a70688a99cc10199291540e7e63350bc&format=json&source=BLR&destination=MAA&dateofdeparture=20131120&seatingclass=E&adults=1&children=0&infants=0"
	});
 
	request.done(function( msg ) {
  		alert("Success");
	});
 
	request.fail(function( jqXHR, textStatus ) {
  		alert( "Request failed: " + textStatus );
	});
});