document.addEventListener('DOMContentLoaded', () => {
  const cardArray = [
    { name: 'crafting_table', img: '../assets/memory/crafting_table_front.png' },
    { name: 'diamond_block', img: '../assets/memory/diamond_block.png' },
    { name: 'enchanting_table', img: '../assets/memory/enchanting_table_top.png'},
    { name: 'furnace',img: '../assets/memory/furnace_front_on.png' },
    { name: 'glowstone', img: '../assets/memory/glowstone.png' }, 
    { name: 'haybale', img: '../assets/memory/hay_block_side.png' },
    { name: 'piston', img: '../assets/memory/piston_top_sticky.png' },
    { name: 'tnt', img: '../assets/memory/tnt_side.png' },
    { name: 'crafting_table', img: '../assets/memory/crafting_table_front.png' },
    { name: 'diamond_block', img: '../assets/memory/diamond_block.png' },
    { name: 'enchanting_table', img: '../assets/memory/enchanting_table_top.png'},
    { name: 'furnace',img: '../assets/memory/furnace_front_on.png' },
    { name: 'glowstone', img: '../assets/memory/glowstone.png' }, 
    { name: 'haybale', img: '../assets/memory/hay_block_side.png' },
    { name: 'piston', img: '../assets/memory/piston_top_sticky.png' },
    { name: 'tnt', img: '../assets/memory/tnt_side.png' },
  ]

  cardArray.sort(() => 0.5 - Math.random())

  const grid = document.querySelector('.grid')
  const resultDisplay = document.querySelector('#result')
  let cardsChosen = []
  let cardsChosenId = []
  let cardsWon = []
  let score = 0;
  let highScore = 1000;
  let isMainMenu = true;

  function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
      const card = document.createElement('img')
      card.setAttribute('src', '../assets/memory/cobblestone_mossy.png')
      card.classList.add('card');
      card.setAttribute('data-id', i)
      card.setAttribute('alt', 'minecraft block');

      card.addEventListener('click', flipCard)
      grid.appendChild(card)
    }
  }

  function checkForMatch() {
    const winBoard = document.getElementById('win_board');
    const scoreBoard = document.getElementById('score_board');
    const highScoreBoard = document.getElementById('high_score_board');
    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenId[0]
    const optionTwoId = cardsChosenId[1]
    
    if(optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute('src', '../assets/memory/cobblestone.png')
      cards[optionTwoId].setAttribute('src', '../assets/memory/cobblestone.png')
    }
    else if (cardsChosen[0] === cardsChosen[1]) {
      cards[optionOneId].setAttribute('src', '../assets/memory/diamond_block.png')
      cards[optionTwoId].setAttribute('src', '../assets/memory/diamond_block.png')
      cards[optionOneId].removeEventListener('click', flipCard)
      cards[optionTwoId].removeEventListener('click', flipCard)
      cardsWon.push(cardsChosen)
    } else {
      cards[optionOneId].setAttribute('src', '../assets/memory/cobblestone.png')
      cards[optionTwoId].setAttribute('src', '../assets/memory/cobblestone.png')
    }
    cardsChosen = []
    cardsChosenId = []
    if  (cardsWon.length === cardArray.length/2) {
      console.log('you win');
      winBoard.style.display = 'flex';
      scoreBoard.style.display = 'none';
      highScoreBoard.style.display = 'none';
      if (score < highScore) {
        highScore = score;
        highScoreBoard.textContent = "HighScore: " + highScore;
      }

      setTimeout(() => {
        winBoard.style.display = 'none';
        scoreBoard.style.display = 'flex';
        highScoreBoard.style.display = 'flex';
        score = 0;
        resultDisplay.textContent = score;
      }, 3000)
    }
  }

  function flipCard() {
    const highScoreBoard = document.getElementById('high_score_board');
    let cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length ===2) {
      setTimeout(checkForMatch, 500)
    }
    score++;
    resultDisplay.textContent = score;

  }
  
  const startButton = document.getElementById('start_button');
  const resetButton = document.getElementById('reset_button');
  const instructionsButton = document.getElementById('instructions_button');
  const gameControls = document.getElementsByClassName('game_controls')[0];
  const gameContainer = document.getElementsByClassName('game_container')[0];
  const mainMenu = document.getElementById('game_title');

  instructionsButton.addEventListener('click',() => {
    let instructions = document.getElementById('instructions');
    if (instructions.classList.contains('open')) {
      instructions.classList.remove('open');
      if (isMainMenu) {
        gameContainer.style.display = 'none';
      } else {
        gameContainer.style.display = 'flex';
      }
    } else {
      instructions.classList.add('open');
      gameContainer.style.display = 'none';
    }
  });

  startButton.addEventListener('click', () => {
    isMainMenu = false;
    startButton.style.display = 'none';
    resetButton.style.display = 'inline-block';
    resetButton.style.width = '48%';
    resetButton.style.fontSize = '.8rem';
    instructionsButton.style.width = '48%';
    instructionsButton.style.fontSize = '.8rem';
    gameContainer.style.display = 'flex';
    gameControls.style.flexDirection = 'row';
    gameControls.style.justifyContent = 'space-between';
    gameControls.style.maxWidth = '400px';
    mainMenu.style.fontSize = '1.2rem';
  })

  resetButton.addEventListener('click', () => {
    const winBoard = document.getElementById('win_board');
    const scoreBoard = document.getElementById('score_board');
    const highScoreBoard = document.getElementById('high_score_board');
    const cards = document.querySelectorAll('img')
    winBoard.style.display = 'none';
    scoreBoard.style.display = 'flex';
    highScoreBoard.style.display = 'flex';
    score = 0;
    resultDisplay.textContent = score;
    cardsWon = [];
    cards.forEach(card => {
      card.setAttribute('src', '../assets/memory/cobblestone_mossy.png')
      card.addEventListener('click', flipCard)
    })
    cardArray.sort(() => 0.5 - Math.random())
  }); 

  createBoard()
})

