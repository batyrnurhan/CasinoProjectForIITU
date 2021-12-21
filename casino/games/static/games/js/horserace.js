// Code goes here

let suits = ['H', 'C', 'D', 'S'];
let values = ['K', 'Q', 'J',
  '10', '9', '8', '7', '6',
  '5', '4', '3', '2'
];


const startButton = document.querySelector('#new-game-button'),
      trackField = document.querySelector('.track'),
      spadePath = document.querySelector('.spade'),
      clubPath = document.querySelector('.club'),
      heartPath = document.querySelector('.heart'),
      diamondPath = document.querySelector('.diamond'),
      result = document.querySelector('.result'),
      hitButton = document.querySelector('#hit-button'),
      secondDeckField = document.querySelector('.second-deck');

let sCounter = 0,
    cCounter = 0,
    hCounter = 0,
    dCounter = 0;

hitButton.style.display = "none";

let gameStart = false,
  gameOver = false,
  playWon = false,
  deck = [], 
  playerChoice = '',
  balance = 1000,
  gameBalance = 0,
  track = [],
  coef = 0;

startButton.addEventListener('click', function() {
    gameStart = true;
    gameOver = false;
    playWon = false;

    deck = createDeck();
    shuffleDeck(deck);
    startButton.style.display = 'none';   
    hitButton.style.display = 'inline';
    trackField.innerHTML = "";
    sFill(sCounter=0);
    cFill(cCounter=0);
    hFill(hCounter=0);
    dFill(dCounter=0);
    coef = 0;
    track = [];
    createTrack(chooseSuit);
    bet(balance, trackCounter);
});


function createTrack(choose) {
    for (let i = 47; i > 40; i--){
        track.push(deck[i].suit); 
        trackField.innerHTML += `
            <img src="static/games/img/${getCardString(deck[i])}.png">
        `;
        
    }
    choose();
}


function chooseSuit(){
    playerChoice = prompt("Choose Suit: S, C, H, D", "S");
}

function trackCounter(suit){
    for (let i = 0; i<track.length; i++){
        if (suit == track[i]) {
            coef++;
        }
    }
    if (coef>=5) {
        alert('В трэке больше 5 карт той масти которую вы выбрали! Начните игру заново');
        startButton.style.display = "inline";
        balance += gameBalance; 
    }
}

function bet(value, count){
    gameBalance = parseInt(prompt(`Сколько хотите поставить? У вас ${value} `, [1000]));
  
    while(!(Number.isInteger(gameBalance) && gameBalance<value)){
      gameBalance = parseInt(prompt(`Сколько хотите поставить? У вас ${value} `, [1000]));
    }

    balance = balance - gameBalance; 
    
    count(playerChoice);
}



function checkForEndOfGame(card, counter){
    if(counter==7 && card.suit == playerChoice){
        alert("YOU WON");
        startButton.style.display = "inline";
        hitButton.style.display = "none";
        balance += coef*gameBalance;
    }else if ( counter==7 && card.suit != playerChoice) {
        alert ("YOU LOSE");
        startButton.style.display = "inline";
        hitButton.style.display = "none";
    }
}


function getNextCard() {
    return deck.shift();
}
function getCardString(card) {
    return card.value + card.suit;
}

hitButton.addEventListener('click', function(){
    showSecondDeck();
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
    for(let i=0; i<deck.length; i++){
      let swapIdx = Math.trunc(Math.random() *deck.length);
      let tmp = deck[swapIdx];
      deck[swapIdx] = deck[i];
      deck[i] = tmp; 
    }
}
  
function defineSuit(card) {
    switch(card.suit){
        case "S": 
            sCounter++;
            sFill(sCounter);
            checkForEndOfGame(card, sCounter);
            break;
        case "C":
            cCounter++;
            cFill(cCounter);
            checkForEndOfGame(card, cCounter);
            break;
        case "H":
            hCounter++;
            hFill(hCounter);
            checkForEndOfGame(card, hCounter);
            break;
        case "D":
            dCounter++;
            dFill(dCounter);
            checkForEndOfGame(card, dCounter);
            break;
    }
}
function showSecondDeck(){
    let card = getNextCard();
    defineSuit(card);
    secondDeckField.innerHTML = `
        <img src="static/games/img/${getCardString(card)}.png">
    `;
}

function sFill(counter) {
    let i = 0;
    spadePath.innerHTML = "";
    while (counter>i){
        spadePath.innerHTML += `
        <img src="static/games/img/back.png">   
        `;  
        i++;
    } 
    spadePath.innerHTML += `
        <img src="static/games/img/AS.png">   
        `;
}

function cFill(counter) {
    let i = 0;
    clubPath.innerHTML = "";
    while (counter>i){
        clubPath.innerHTML += `
        <img src="static/games/img/back.png">   
        `;  
        i++;
    } 
    clubPath.innerHTML += `
        <img src="static/games/img/AC.png">   
        `;
}

function hFill(counter) {
    let i = 0;
    heartPath.innerHTML = "";
    while (counter>i){
        heartPath.innerHTML += `
        <img src="static/games/img/back.png">   
        `;  
        i++;
    } 
    heartPath.innerHTML += `
        <img src="static/games/img/AH.png">   
        `;
}

function dFill(counter) {
    let i = 0;
    diamondPath.innerHTML = "";
    while (counter>i){
        diamondPath.innerHTML += `
        <img src="static/games/img/back.png">   
        `;  
        i++;
    } 
    diamondPath.innerHTML += `
        <img src="static/games/img/AD1.png">   
        `;
}