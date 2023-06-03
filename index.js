var Spot00AV = true;
var Spot01AV = true;
var Spot02AV = true;
var Spot03AV = true;
var Spot04AV = true;
var Spot05AV = true;
var Spot06AV = true;
var Spot10AV = true;
var Spot11AV = true;
var Spot22AV = true;
var Spot23AV = true;
var Spot24AV = true;
var Spot25AV = true;
var Spot26AV = true;
var Spot30AV = true;
var Spot31AV = true;
var Spot32AV = true;
var Spot33AV = true;
var Spot34AV = true;
var Spot35AV = true;
var Spot36AV = true;
var Spot40AV = true;
var Spot41AV = true;
var Spot42AV = true;
var Spot43AV = true;
var Spot44AV = true;
var Spot45AV = true;
var Spot46AV = true;
var Spot50AV = true;
var Spot51AV = true;
var Spot52AV = true;
var Spot53AV = true;
var Spot54AV = true;
var Spot55AV = true;
var Spot56AV = true;
let squares;
let result;
let displayCurrentPlayer
let currentPlayer = 1
  
  var Turn = true;
var numofTurns = 0;
let board = [
['', '', '', '', '', '', ''],
['', '', '', '', '', '', ''],
['', '', '', '', '', '', ''],
['', '', '', '', '', '', ''],
['', '', '', '', '', '', ''],
['', '', '', '', '', '', ''],
];

let i;
let j;
let bestScore;
let score;
let isMaximizing;
let moveX;
let moveY;
var ai = 'O';
var noWinner;
var winner = '';

//var result;
var Openspots;

document.addEventListener('DOMContentLoaded', () => {
  squares = document.querySelectorAll('.grid div');
  result = document.querySelector('#result')
  displayCurrentPlayer = document.querySelector('#current-player')
  
});

function checkforPlacement()  
	{
		var bestScore = -10000;
		for(let i = 0; i < winningArrays.length; i++) {
			for(let j = 0; j < winningArrays.length; j++)
			{
        
				if (squares[i + 7].classList.contains('taken') &&!squares[i].classList.contains('taken')) {
					board[i][j] = 'O';
					let score = minimax(board, 0, false)
					board[i][j] = '';
					if (score > bestScore) {
						bestScore = score;	//100000
						moveX = i; 
						moveY = j;
					}
				}
			}
		}
    if(moveX == 0 && moveY == 0)
		{
			Spot00o.style.display = "block"
			Spot00AV = false;
			board[0][0] = 'O';
		}
		
		else if(moveX == 1 && moveY == 1)
		{
			Spot11o.style.display = "block"
			Spot11AV = false;
			board[1][1] = 'O';
		}

		else if(moveX == 2 && moveY == 2)
		{
			Spot22o.style.display = "block"
			Spot22AV = false;
			board[2][2] = 'O';
		}

		else if(moveX == 0 && moveY == 1)
		{
			Spot01o.style.display = "block"
			Spot01AV = false;
			board[0][1] = 'O';
		}

		else if(moveX == 0 && moveY == 2)
		{
			Spot02o.style.display = "block"
			Spot02AV = false;
			board[0][2] = 'O';
		}

		else if(moveX == 1 && moveY == 0)
		{
			Spot10o.style.display = "block"
			Spot10AV = false;
			board[1][0] = 'O';
		}

		else if(moveX == 1 && moveY == 2)
		{
			Spot12o.style.display = "block"
			Spot12AV = false;
			board[1][2] = 'O';
		}

		else if(moveX == 2 && moveY == 0)
		{
			Spot20o.style.display = "block"
			Spot20AV = false;
			board[2][0] = 'O';
		}
		
		else if(moveX == 2 && moveY == 1)
    {
      Spot21o.style.display = "block";
    Spot21AV = false;board[2][1] = 'O';
  }
		result = checkforWin();
		if(result == null)
		{
			Turn = true;
		}
		else {
			$("#winner").text(result + ' Wins');
		}

  }

  
  $('#mainBody').click(function(e)
{
	 var buttonId = e.target.id; 
	 var imageID = '#'+ buttonId + 'x';
	 console.log(imageID);
	 console.log(buttonId);
	 if(Turn == true && board[parseInt(buttonId.substring(4,5))][parseInt(buttonId.substring(5,6))] == '')
	 {
		  $(imageID).show();
		  board[parseInt(buttonId.substring(4,5))][parseInt(buttonId.substring(5,6))] = 'X';
		  Turn = false;

		  if(Turn == false)
		  {
				checkforPlacement();
		  }
	 }
})

function bestMove() {
  // AI to make its turn
  let bestScore = -100000;
  let move;
  for (let i = 0; i < squares.length; i++) {
    for (let j = 0; j < squares.length; j++) {
      if (board[i][j] == '') {
        board[i][j] = ai;
        let score = minimax(board, 0, false);
        board[i][j] = '';
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }
  board[move.i][move.j] = ai;
  currentPlayer = human;
}

function checkBoard() {
    for (let y = 0; y < winningArrays.length; y++) {
    const square1 = squares[winningArrays[y][0]]
    const square2 = squares[winningArrays[y][1]]
    const square3 = squares[winningArrays[y][2]]
    const square4 = squares[winningArrays[y][3]]

    //check those squares to see if they all have the class of player-one
    if (
      square1.classList.contains('player-one') &&
      square2.classList.contains('player-one') &&
      square3.classList.contains('player-one') &&
      square4.classList.contains('player-one')
    )
    {
      result.innerHTML = 'Player One Wins!'
    }
    //check those squares to see if they all have the class of player-two
    if (
      square1.classList.contains('player-two') &&
      square2.classList.contains('player-two') &&
      square3.classList.contains('player-two') &&
      square4.classList.contains('player-two')
    )
    {
      result.innerHTML = 'Player Two Wins!'
    }
  }
}

for (let i = 0; i < squares.length; i++) {
    squares[i].onclick = () => {
      //if the square below your current square is taken, you can go ontop of it
    if (squares[i + 7].classList.contains('taken') &&!squares[i].classList.contains('taken')) {
      if (currentPlayer == 1) {
        squares[i].classList.add('taken')
        squares[i].classList.add('player-one')
        currentPlayer = 2
        displayCurrentPlayer.innerHTML = currentPlayer
      } else if (currentPlayer == 2){
        squares[i].classList.add('taken')
        squares[i].classList.add('player-two')
        currentPlayer = 1
        displayCurrentPlayer.innerHTML = currentPlayer;        
      } 
    } else {
    alert('cant go here');
    checkBoard();
    bestMove();
    }
  }
}