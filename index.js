$(document).ready(function(){
	$('#enter').on('click', function(){

		/*
		* Hide user name box on click of enter
		* Show game card to the user;
		*/
		$('#userBox').addClass('hide');
		$('#gameCard').addClass('show');


		/**/

		var numberElements = $('#gameCard').find('li');

		var tempArray = [], i=0;

		for(var i=0; i < (numberElements.length)/2; i++){

			var randomN = Math.floor((Math.random()*15)+1);

			if($.inArray(randomN, tempArray) === -1){
				element = numberElements[randomN];
				var s = "<span id=" + randomN + ">"+ randomN +"</span>";
				$(element).append(s);
				tempArray.push(randomN);
			}
		}


		tempArray = [];




	});
});