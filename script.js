// css class for different card image
const CARD_TECHS = [
  "html5",
  "css3",
  "js",
  "sass",
  "nodejs",
  "react",
  "linkedin",
  "heroku",
  "github",
  "aws",
];

// only list out some of the properties,
// add more when needed
const game = {
  score: 0,
  level: 1,
  timer: 60,
  timerDisplay: null,
  scoreDisplay: null,
  levelDisplay: null,
  timerInterval: null,
  startButton: null,

  // and much more

  gameboard: null,
  gameoverStatus: true,
  totalCards: 0,
  
};

setGame();

/*******************************************
/     game process
/******************************************/
function setGame() {
  // register any element in your game object
  // game-stats__level--value
  // game-stats__score--value
  // game-stats__button
  // game-timer__bar
  // game-board

  game.levelDisplay = document.querySelector(".game-stats__level--value");
  game.scoreDisplay = document.querySelector(".game-stats__score--value");
  game.startButton = document.querySelector(".game-stats__button");
  game.timerDisplay = document.querySelector(".game-timer__bar");
  game.gameboard = document.querySelector(".game-board");

  bindStartButton();
}

function startGame() {
  const { gameboard } = game;
  console.log(game.gameboard);
  while (gameboard.firstChild) {
    gameboard.removeChild(gameboard.firstChild);
  }
  game.levelDisplay.innerHTML = 1;
  game.scoreDisplay.innerHTML = 0;

  game.gameoverStatus = false;
  game.startButton.innerHTML = "End Game";

  // game.level.innerHTML = game.level;
  // game.score.innerHTML = game.score;

  generateCard();
  bindCardClick();
  timeStart();
}

function timeStart(){
  if(game.timerInterval){
    stopTimer()
  }
  game.timer = 60;
  updateTimerDisplay();
  game.timerInterval=setInterval(()=>{
  game.timer--;
  updateTimerDisplay();

  if(game.time===0){
    handleGameOver();
  }
  },1000);

  

  
  

}

function handleCardFlip() {
  
}

function nextLevel() {}

function handleGameOver() {
  game.levelDisplay.innerHTML = 5;
  game.scoreDisplay.innerHTML = 30;
  game.gameoverStatus = true;
  game.startButton.innerHTML = "Start Game";
  game.timerDisplay.innerHTML = "60s";
  game.timerDisplay.style.width ="100%";
  if(game.timerInterval){
    stopTimer()
  }
}

function generateCard() {
  const gameSize = game.level * 2;
  const totalCards = gameSize * gameSize;
  game.totalCards = totalCards;
  game.gameboard.style["grid-template-columns"] = `repeat(${gameSize}, 1fr)`;
  const cards = [];
  for (let i = 0; i < totalCards / 2; i++) {
    if (i < CARD_TECHS.length) {
      const tech = CARD_TECHS[i];
      const card = createSingleCard(tech);
      cards.push(card);
      cards.push(card);
      cards.push(card.cloneNode(true));
      //  cards.unshift(card.cloneNode(true));
    } else {
      const j = Math.floor(Math.random() * CARD_TECHS.length);
      const tech = CARD_TECHS[j];
      const card = createSingleCard(tech);
      cards.push(card);
      cards.push(card);
      cards.push(card.cloneNode(true));
      //  cards.unshift(card.cloneNode(true));
    }
  }

  while (cards.length > 0) {
    const index = Math.floor(Math.random() * cards.length);
    const card = cards.splice(index, 1)[0];
    console.log(index);
    console.log(card);
    game.gameboard.appendChild(card);
  }
}

function createSingleCard(tech) {
  const node = document.createElement("div");
  const cardFront = document.createElement("div");
  const cardBack = document.createElement("div");

  cardFront.classList.add("card__face", "card__face--front");
  cardBack.classList.add("card__face", "card__face--back");

  node.classList.add("card", tech);
  node.dataset.tech = tech;

  node.appendChild(cardFront);
  node.appendChild(cardBack);
  return node;
}

function stopTimer(){
  clearInterval(game.timerInterval);
}

/*******************************************
/     UI update
/******************************************/
function updateScore() {}

function updateTimerDisplay() {
  game.timerDisplay.innerHTML=`${game.timer}s`;
  const percentage = (game.timer/60)*100;
  game.timerDisplay.style.width = percentage+'%';
}

/*******************************************
/     bindings
/******************************************/
function bindStartButton() {
  game.startButton.addEventListener("click", () => {
    if (game.gameoverStatus) {
      startGame();
    } else {
      handleGameOver();
    }
  });
}

function unBindCardClick(card) {}

function bindCardClick() {
  const cards = document.querySelectorAll(".card");
  cards.forEach(card=>{
    card.addEventListener('click',handleCardFlip);
  });
}


