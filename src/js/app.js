const BOARD_SIZE = 4;
let currentPosition = -1;
let score = 0;
let goblin = null;
let gameInterval;

// Создаём игровое поле
function createBoard() {
    const board = document.querySelector('.game-board');
    board.innerHTML = ''; 
    
    for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        
// Обработчик клика для счёта
        cell.addEventListener('click', () => {
          if (goblin && cell.contains(goblin)) {
            score++;
            document.getElementById('score').textContent = score;
// Останавливаем старый интервал
            clearInterval(gameInterval);            
// Временное удаление гоблина
            const currentCell = cell;
            currentCell.removeChild(goblin);
            goblin = null;        
// Создаем гоблина через 0.5 сек
            setTimeout(() => {
              const newPos = getRandomPosition();
              placeGoblin(newPos);              
// Запускаем интервал заново
              gameInterval = setInterval(moveGoblin, 2000);
            }, 500);
          }
        });
        
        board.appendChild(cell);
    }
}

// Создаём гоблина
function createGoblin() {
    const img = document.createElement('img');
    img.src = require('../img/goblin.png');
    img.alt = 'Goblin';
    img.id = 'goblin';
    return img;
}

// Ставим гоблина на клетку
function placeGoblin(position) {
    const cells = document.querySelectorAll('.cell');
    
    if (!goblin) {
        goblin = createGoblin();
        cells[position].appendChild(goblin);
        currentPosition = position;
    } else {
        cells[position].appendChild(goblin);
        currentPosition = position;
    }
}

// Новая случайная позиция
function getRandomPosition() {
    let newPos;
    do {
        newPos = Math.floor(Math.random() * BOARD_SIZE * BOARD_SIZE);
    } while (newPos === currentPosition);
    return newPos;
}

// Логика перемещения
function moveGoblin() {
    if (goblin) {
        const newPos = getRandomPosition();
        placeGoblin(newPos);
    }
}

// Запуск игры
function initGame() {
    createBoard();
    const startPos = Math.floor(Math.random() * BOARD_SIZE * BOARD_SIZE);
    placeGoblin(startPos);
    gameInterval = setInterval(moveGoblin, 2000);
}

// Стартуем когда DOM готов
document.addEventListener('DOMContentLoaded', initGame);