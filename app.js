/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
    -- test
*/
var scores, roundScore = 0, activePlayer = 0, gamePlaying;
init();




//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML =  '<em>' + dice + '</em>';




var prevOne = 0, prevTwo = 0;

var lastDice;

document.querySelector('.btn-roll').addEventListener('click', function(){
    
    if(gamePlaying){
        //1. Random Number
        var dice = Math.floor(Math.random() * 6) + 1;
        dice  = 6;
        var flag = true;

        /*
        if(activePlayer === 0){
            if(prevOne === 0){
                prevOne = dice;
            }
            else{
                if(prevOne === 6 && dice === 6){
                    flag = false;
                    scores[activePlayer] = 0;
                    document.querySelector('#score-' + activePlayer).textContent = '0';
                    alert("Your score is zero. You rolled 6 twice.")
                    nextPlayer();
                    prevOne = 0;
                }
                else{
                    prevOne = dice;
                }
            }
        }
        else{
            if(prevTwo === 0){
                prevTwo = dice;
            }
            else{
                if(prevTwo === 6 && dice === 6){
                    scores[activePlayer] = 0;
                    document.querySelector('#score-' + activePlayer).textContent = '0';
                    alert("Your score is zero. You rolled 6 twice.")
                    flag = false;
                    nextPlayer();
                    prevTwo = 0;
                }
                else{
                    prevTwo = dice;
                }
            }
        }

        */

        if(flag){
            //2. Display the result
            var diceDOM = document.querySelector('.dice');
            diceDOM.style.display = 'block';
            diceDOM.src = 'dice-' + dice + '.png';

            //3. Update the result if the number is not 1
            if(dice === 6 && lastDice === 6){
                //player looses score
                scores[activePlayer] = 0;
                document.querySelector('#score-' + activePlayer).textContent = '0';
                nextPlayer();
            }

            if(dice !== 1){
                //Add Score
                roundScore += dice;
                document.querySelector("#current-" + activePlayer).textContent = roundScore;
            }
            else{
                //Next Player
                nextPlayer();
            }

            lastDice = dice;
        }
    }
});


document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        //add current score to global score
        scores[activePlayer] += roundScore;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        //check if the player wins
        if(scores[activePlayer] >= 20){
            document.querySelector('#name-' + activePlayer).textContent = "Winner!!!!"
            document.querySelector('.dice').style.display = 'none';

            //adding winner class
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('Winner!!');

            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            gamePlaying = false;
        }
        else{
            //next player
            nextPlayer();
        }
    }
});


function nextPlayer(){
    //next player
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
        roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';

    prevTwo = 0;
    prevOne = 0;
}

//new game 
document.querySelector('.btn-new').addEventListener('click', function(){
    init();
});


function init(){
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = "Player 1";
    document.getElementById('name-1').textContent = "Player 2";

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    document.querySelector('.player-0-panel').classList.add('active');
}
