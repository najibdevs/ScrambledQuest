let words = [
    {
        word: "Serendipity"
    },
    {
        word: "Paradox"
    },
    {
        word: "Friendly"
    },
    {
        word: "Enigma"
    },
    {
        word: "Exciting"
    },
    {
        word: "Melody"
    },
    {
        word: "Flower"
    },
    {
        word: "Radiant"
    },
    {
        word: "Breeze"
    },
    {
        word: "Harmony"
    },
    {
        word: "Simple"
    },
    {
        word: "Laughter"
    },
    {
        word: "Gentle"
    },
    {
        word: "Delight"
    },
    {
        word: "Sunshine"
    }
];


let currentWordIndex = 0;
let score = 0;
let timerInterval;

function scrambleWords(word) {
    let characters = word.split('');
    for (let i = characters.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [characters[i], characters[j]] = [characters[j], characters[i]];
    }
    return characters.join('');
}

function scrambleAllWords(words) {
    let scrambledWords = [];
    for (let wordObj of words) {
        let scrambled = scrambleWords(wordObj.word);
        scrambledWords.push({ word: scrambled });
    }
    return scrambledWords;
}

let scrambledArray = scrambleAllWords(words);

function displayScrambledWord() {
    if (currentWordIndex < scrambledArray.length) {
        const wordElement = document.querySelector('h2');
        wordElement.textContent = scrambledArray[currentWordIndex].word;

        clearInterval(timerInterval);
        startTimer(15);
    } else {
        if (score === 15) {
            alert('Congratulations! You Win! You correctly unscrambled all the words.');
        } else {
            alert('Game Over! You have scrambled all the words.');
        }
    }
}

function startTimer(seconds) {
    const timerElement = document.querySelector('p');
    timerElement.textContent = `Time Left: ${seconds}s`;

    let timeLeft = seconds;
    timerInterval = setInterval(function () {
        timeLeft--;
        timerElement.textContent = `Time Left: ${timeLeft}s`;

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            alert(`Time is up! Try the next word.`)
            currentWordIndex++;
            displayScrambledWord();
        }
    }, 1000);
}

displayScrambledWord();
updateScore();

function updateScore() {
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = score;
}

const wordForm = document.getElementById('wordForm');

wordForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const userInput = document.querySelector('input[type="text"]').value;
    const originalWord = words[currentWordIndex].word;

    if (userInput.toLowerCase() === originalWord.toLowerCase()) {
        alert('Correct! You earned a point.');
        score++;
        updateScore();
        currentWordIndex++;
        displayScrambledWord();
    } else {
        alert('Incorrect! Try again.');
    }

    document.querySelector('input[type="text"]').value = '';
});

const refreshButton = document.querySelector('[aria-label="Refresh the current word"]');
refreshButton.addEventListener('click', function () {
    displayScrambledWord();
});
