// Code goes here

let suits = ['H', 'C', 'D', 'S'];
let values = ['A', 'K', 'Q', 'J',
  '10', '9', '8', '7', '6',
  '5', '4', '3', '2'
];

let textArea = document.querySelector('#text-area');
let newGameButton = document.querySelector('#new-game-button');
let hitButton = document.querySelector('#hit-button');
let stayButton = document.querySelector('#stay-button');
let showDealerCards = document.querySelector('.dealer');
let showPlayerCards = document.querySelector('.player');
let result = document.querySelector('.result');


hitButton.style.display = 'none';
stayButton.style.display = 'none';

let gameStart = false,
  gameOver = false,
  playWon = false,
  dealerCards = [],
  playerCards = [],
  dealerScore = 0,
  playerScore = 0,
  deck = [],
  balance = 1000,//баланс юзера
  gameBalance = 0;

newGameButton.addEventListener('click', function() {
      gameStart = true;
      gameOver = false;
      playWon = false;

  deck = createDeck();
  shuffleDeck(deck);
  dealerCards = [];
  playerCards = [];
  dealerCards = [getNextCard(), getNextCard()];
  playerCards = [getNextCard(), getNextCard()];
  bet(balance);
  newGameButton.style.display = 'none';
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  result.innerHTML = "";
  showStatus();
});

function createDeck() {
  let deck = [];
  for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
    for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
      let card = {
        suit: suits[suitIdx],
        value: values[valueIdx]
      };
      deck.push(card);
    }
  }
  return deck;
}

function shuffleDeck(deck){
  for(let i=0; i<deck.length; i++)
  {
    let swapIdx = Math.trunc(Math.random() *deck.length);
    let tmp = deck[swapIdx];
    deck[swapIdx] = deck[i];
    deck[i] = tmp; 
  }
}

hitButton.addEventListener('click', function(){
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus(gameOver);
});

stayButton.addEventListener('click', function(){
  gameOver = true;
  checkForEndOfGame();
  showStatus(gameOver);
});

function checkForEndOfGame(){
  updateScores();
  
  if(gameOver){
    while(dealerScore<=playerScore &&
          playerScore <=21 &&
          dealerScore <=21){
            dealerCards.push(getNextCard());
            updateScores();
    }
  }
    
    if(playerScore>21){
          playWon=false;
          gameOver = true;
    }
    
    else if(dealerScore>21){
          playWon = true;
          gameOver = true;
    }
    
    else if(gameOver){
      if(playerScore>dealerScore){
        playWon = true;
      }
      else{
        playWon = false;
      }
    }
}

function getCardString(card) {
  return card.value + card.suit;
}
function getCardNumericValue(card){
  if(card.value=='A'){
        return 1;
  }else if(card.value == 'K' || card.value == 'Q' || card.value == 'J') {
        return 10;
  }else {
      return parseInt(card.value);
  }
}
function showStatus(gameOver)
{
  if(!gameStart)
  {
    textArea.innerText = 'Welcome to Blackjack!';
    return; 
  }
  
  updateScores();
  
  if (gameOver){
    showDealerCards.innerHTML = '';
    for(let i=0; i<dealerCards.length; i++){
      showDealerCards.innerHTML += `
        <img src="static/games/img/${getCardString(dealerCards[i])}.png">
      `; 
      } 
  }else {
    showDealerCards.innerHTML = '';
    showDealerCards.innerHTML += `
      <img src="static/games/img/${getCardString(dealerCards[0])}.png">
    `;
    showDealerCards.innerHTML +=`
     <img src="static/games/img/back.png">  
    `; 
  }  

  showPlayerCards.innerHTML = '';
  for(let i=0; i<playerCards.length; i++)
  {
    showPlayerCards.innerHTML += `
      <img src="static/games/img/${getCardString(playerCards[i])}.png">
    `; 
  }


  if (gameOver){
    showDealerCards.innerHTML += `Dealer score: ${dealerScore} `;
  }
  else {showDealerCards.innerHTML += `Dealer score:
                                 ${getCardNumericValue(dealerCards[0])} `;
  }                      
  showPlayerCards.innerHTML += `Player score: ${playerScore} `; 
  
                        
  if(gameOver){
    if(playWon)
    {
      result.innerText = "YOU WIN!";
      balance += gameBalance;
    }
    else{
      result.innerText = "DEALER WINS";
      balance -=gameBalance;
    }
    newGameButton.style.display = 'inline';
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
    
  }
} 

function bet(value){
  gameBalance = parseInt(prompt(`Сколько хотите поставить?, у вас ${value} `, [1000]));

  while(!(Number.isInteger(gameBalance) && gameBalance<value)){
    gameBalance = parseInt(prompt(`Сколько хотите поставить?, у вас ${value} `, [1000]));
  }
}

function getScore(cardArray){
  let score = 0;
  let hasAce = false;
  for(let i=0; i<cardArray.length; i++){
    let card = cardArray[i];
    score += getCardNumericValue(card);
    if(card.value == 'Ace'){
      hasAce = true;
    }
    
    if(hasAce && score+10<=21){
      return score+10;
    }
  }
   return score; 
}

function updateScores(){
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards); 
}


function getNextCard() {
  return deck.shift();
}
