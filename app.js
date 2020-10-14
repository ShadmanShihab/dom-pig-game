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


document.querySelector('.btn-roll').addEventListener('click', function(){
    
    if(gamePlaying){
        //1. Random Number
        var dice = Math.floor(Math.random() * 6) + 1;
        console.log(dice);
        //2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        //3. Update the result if the number is not 1
        if(dice !== 1){
            //Add Score
            roundScore += dice;
            document.querySelector("#current-" + activePlayer).textContent = roundScore;
        }
        else{
            //Next Player
            nextPlayer();


            /*
            if(activePlayer === 0) 
                activePlayer = 1;
            else
                activePlayer = 0;
            */
            


            /*
            if(activePlayer === 0){
                document.querySelector('.player-0-panel').classList.remove('active');
                document.querySelector('.player-1-panel').classList.add('active');
            } 
            else{
                document.querySelector('.player-0-panel').classList.add('active');
                document.querySelector('.player-1-panel').classList.remove('active');
            }
            */
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
