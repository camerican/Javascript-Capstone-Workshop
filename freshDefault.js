$(document).ready(function(){

	var questionBank = new Array;
	var wordArray = new Array;
	var previousGuesses = new Array;
	var currentWord;
	var currentClue;
	var wrongAnswerCount;

	$.getJSON('bank.json', function(data){
		for(i = 0; i < data.wordlist.length; i++){
			questionBank[i] = new Array;
			questionBank[i][0] = data.wordlist[i].word;
			questionBank[i][1] = data.wordlist[i].clue;
	}
		titleScreen();
	}) // end get JSON function

 
	function titleScreen(){
		$('#gameContent').append('<div id="gameTitle">HANGMAN</div><div id="startButton" class="button">BEGIN</div>');		
		$('#startButton').on("click",function (){gameScreen()});
	}//end titleScreen function 

	function gameScreen(){
		$('.gameContent').empty();
		$('.gameContent').append('<div id="pixHolder"> <img id="hangman" src="man.png"> </div>');
		$('.gameContent').append('<div id="wordHolder"></div>');
		$('.gameContent').append('<div id="clueHolder"></div>');
		$('.gameContent').append('<div id="guesses"> Previous Guesses: </div>');
		$('.gameContent').append('<div id="feedback"></div>');
		$('.gameContent').append('<form><input type="text" id="dummy"></form>');

		getWord();
		var numberOfTiles = currentWord.length;
		wrongAnswerCount = 0;
		previousGuesses = [];

		for(i = 0; i < numberOfTiles; i++){
			$('#wordHolder').append('<div class="tile" id=t'+i+'></div>');
		}

		$('#clueHolder').append("Hint: " + currentClue);
		$(document).on("keyup", handleKeyUp);
		$(document),on("click", function(){
			$('#dummy').focus();
		});
	} // end gameScreen function

	function getWord(){
		var rnd = Math.floor(Math.random() * questionBank.length);
		currentWord = questionBank[rnd][0];
		currentClue = questionBank[rnd][1];
		questionBank.splice(rnd, 1);
		wordArray = currentWord.split("");
	}// end getWord funciton



	function checkAnswer(){
		var currentAnswer = "";
		for(i = 0; i < currentWord.length; i++){
			currentAnswer += ($('#t'+i).text());
		}
		if (currentAnswer == currentWord){
			victoryMessage();
		};
	} // end of checkAnswer function

	function wrongAnswer(a){
		wrongAnswer++;
		var pos = (wrongAnswerCount *- 75) + "px"
		$("#guesses").append(" " + a);
		$("#hangman").css("left", pos);
			if (wrongAnswerCount == 6){
				defeatMessage();
			}
	} // end of wrongAnswer function 

	function victoryMessage(){
		document.activateElement.blur();
		$("#feedback").append('You are correct!!! <br> <br> <br> <div id="replay" class="button">< Continue</div>');
		$('#replay').on("cllick", function(){
			if (bank.length > 0){
				gameScreen()}
				else{
					finalPage()}
			})
		}; // end of victoryMessage function


	function defeatMessage(){
		document.activateElement.blur();
		$('#feedback').append("You lose! <br> (answer = '+ currentWord +' <div id='replay' class='button'><Continue? </div>");
		$('#replay').on("click" function(){
			if(questionBank.length > 0){
				gameScreen()}
			else{
				finalPage()}
		}; // end defeatMessage function

		function finalPage(){
			$(".gameContent").empty();
			$(".gameContent").append('<div id="finalMessage"> You have played all the current words in this game! </div>');
		}
	});
}}); // end .ready function

















