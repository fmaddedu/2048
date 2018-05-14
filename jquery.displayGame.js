(function($)
{
  $.fn.displayGame=function()
  {
		$('.tile-container').empty();
		// $('.tile-container').remove();
		// $('.grid-container').after('<div class="tile-container"></div>')
		var positions = ['0-0', '1-0', '2-0', '3-0', '0-1', '1-1', '2-1', '3-1', '0-2', '1-2', '2-2', '3-2', '0-3', '1-3', '2-3', '3-3'];
		var isPositionFree = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];
		randomTile();
		randomTile();
		
	  $('body').keydown(function(event)
	  {
  		var arrow = event.which || event.keyCode;
  		
  		if (arrow == 37) {
				playLeft();
				gameOn();		
			}
  		else if (arrow == 38) {
				playUp();	  			
				gameOn();		
			}
  		else if (arrow == 39) {
				playRight();	  			
				gameOn();		
			}
  		else if (arrow == 40) {
				playDown();	  			
				gameOn();		
  		}
  		else if (arrow == 82) { //"r" key to restart
				console.log("restart");
			  $('.tile-container').displayGame();	
  		}
  	});
	};
})(jQuery);


$(document).ready(function() {
  $('.tile-container').displayGame();	
	$('.new-game').click(function() {
	  $('.tile-container').displayGame();
	});
});

/**************************************************************
***************************************************************
************************   FUNCTIONS   ***********************/
  			
	function checkPositions(direction) {
		var isPositionFree = [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true];
		
		for (i = 0; i < 16; i++) {
  		if ($('.tile-position-' + direction[i]).length > 0)
  			isPositionFree[i] = false;
		}
		return isPositionFree;
	}

	function randomValue() {
		var value = Math.floor(Math.random() * 10);
		if (value < 8)
			return 2;
		else
			return 4;
	}

	function randomTile() {
		var positions = ['0-0', '1-0', '2-0', '3-0', '0-1', '1-1', '2-1', '3-1', '0-2', '1-2', '2-2', '3-2', '0-3', '1-3', '2-3', '3-3'];
		var isPositionFree = checkPositions(positions);
		var takenP = [];

		for (var i = 0, j = 0; i < 16; i++) {
			if (isPositionFree[i] == false) {
				takenP[j] = positions[i];
				j++;
			}
		}
		var x = Math.floor(Math.random() * 4);
		var y = Math.floor(Math.random() * 4);
		var position = x + "-" + y;
		while ($.inArray(position, takenP) >= 0) {
			x = Math.floor(Math.random() * 4);
			y = Math.floor(Math.random() * 4);
			position = x + "-" + y;
		}
		var randomV = randomValue();
		$('.tile-container').append('<div class="tile tile-' + randomV + ' tile-position-' + position + ' tile-new">' + randomV + '</div>');
		return true;
	}

	function fullGrid() { 
		var positions = ['0-0', '1-0', '2-0', '3-0', '0-1', '1-1', '2-1', '3-1', '0-2', '1-2', '2-2', '3-2', '0-3', '1-3', '2-3', '3-3'];
		var isPositionFree = checkPositions(positions);
		if ($.inArray(true, isPositionFree) >= 0)
			return false;
		else
			return true;
	}

	function noMove(direction) {
		var isPositionFree = checkPositions(direction);
		var count = 0;
		
		for (var x = 0; x < 4; x++)
		{
			for (var p = 4*x+1; p < 4*x+4; p++)
			{
				if ((p)%4 != 0 && !$('.tile-position-' + direction[parseInt(p-1)]).hasClass('tile-merged') && isPositionFree[p] == false && isPositionFree[p-1] == false && $('.tile-position-' + direction[parseInt(p)]).text() == $('.tile-position-' + direction[parseInt(p-1)]).text()) 
					return false;
			}
		}
		return true;
	}

	function gameOn() {
		var left = ['0-0', '1-0', '2-0', '3-0', '0-1', '1-1', '2-1', '3-1', '0-2', '1-2', '2-2', '3-2', '0-3', '1-3', '2-3', '3-3'];
		var right = ['3-3', '2-3', '1-3', '0-3', '3-2', '2-2', '1-2', '0-2', '3-1', '2-1', '1-1', '0-1', '3-0', '2-0', '1-0', '0-0'];
		var up = ['3-0', '3-1', '3-2', '3-3', '2-0', '2-1', '2-2', '2-3', '1-0', '1-1', '1-2', '1-3', '0-0', '0-1', '0-2', '0-3'];
		var down = ['0-3', '0-2', '0-1', '0-0', '1-3', '1-2', '1-1', '1-0', '2-3', '2-2', '2-1', '2-0', '3-3', '3-2', '3-1', '3-0'];
		if (fullGrid() && noMove(left) && noMove(right) && noMove(up) && noMove(down)) 
			alert("LOOOOOOSER!!!");
	}

	function getValue(direction, p) {
		return $('.tile-position-' + direction[parseInt(p)]).text();
	}

	function move(direction) {
		var isPositionFree = checkPositions(direction);
		var offset = 0;
		var count = 0;

		$('.tile-container div').removeClass('tile-new tile-moved tile-merged');
		
		for (var x = 0; x < 4; x++)
		{
			for (var p = 4*x+1; p < 4*x+4; p++)
			{
				offset = 0;
				if (isPositionFree[p] == false && isPositionFree[p-1] == true) 
				{
					offset = 1;
					if (isPositionFree[p-2] == true && p%4 >= 2) {
						offset = 2; 
						if (isPositionFree[p-3] == true && p%4 >= 3) 
							offset = 3; 
					}
				}
				if ((p-offset)%4 != 0 && !$('.tile-position-' + direction[parseInt(p-offset-1)]).hasClass('tile-merged') && isPositionFree[p] == false && isPositionFree[p-offset-1] == false && $('.tile-position-' + direction[parseInt(p)]).text() == $('.tile-position-' + direction[parseInt(p-offset-1)]).text()) {
					count++;
					$('.tile-position-' + direction[parseInt(p-offset-1)]).remove();
					$('.tile-position-' + direction[parseInt(p)]).removeClass('tile-' + getValue(direction, p));
					$('.tile-position-' + direction[parseInt(p)]).addClass('tile-' + getValue(direction, p)*2);
					$('.tile-position-' + direction[parseInt(p)]).text(getValue(direction, p)*2);
					$('.tile-position-' + direction[parseInt(p)]).addClass('tile-position-' + direction[parseInt(p-offset-1)]);
					$('.tile-position-' + direction[parseInt(p)]).addClass('tile-merged');
					$('.tile-position-' + direction[parseInt(p)]).removeClass('tile-position-' + direction[parseInt(p)]);
				}
				else if (offset > 0 && isPositionFree[p] == false && isPositionFree[p-offset] == true) {
					count++;
					$('.tile-position-' + direction[parseInt(p)]).addClass('tile-position-' + direction[parseInt(p-offset)]);
					$('.tile-position-' + direction[parseInt(p)]).addClass('tile-moved');
					$('.tile-position-' + direction[parseInt(p)]).removeClass('tile-position-' + direction[parseInt(p)]);
				}
				isPositionFree = checkPositions(direction);
			}
		}
		if (count > 0) {
			randomTile();
			return true;
		}
		else
			return false;
	}

	function playLeft() {
		var left = ['0-0', '1-0', '2-0', '3-0', '0-1', '1-1', '2-1', '3-1', '0-2', '1-2', '2-2', '3-2', '0-3', '1-3', '2-3', '3-3'];
		move(left);
	}

	function playRight() {
		var right = ['3-3', '2-3', '1-3', '0-3', '3-2', '2-2', '1-2', '0-2', '3-1', '2-1', '1-1', '0-1', '3-0', '2-0', '1-0', '0-0'];
		move(right);
	}

	function playUp() {
		var up = ['3-0', '3-1', '3-2', '3-3', '2-0', '2-1', '2-2', '2-3', '1-0', '1-1', '1-2', '1-3', '0-0', '0-1', '0-2', '0-3'];
		move(up);
	}

	function playDown() {
		var down = ['0-3', '0-2', '0-1', '0-0', '1-3', '1-2', '1-1', '1-0', '2-3', '2-2', '2-1', '2-0', '3-3', '3-2', '3-1', '3-0'];
		move(down);
	}

	function getScore() {
		return $('.score-container').text();
	}

	function addPoints(points) {
		var score = getScore();
		return score + parseInt(points);
	}
