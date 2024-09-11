const words = ['JAVASCRIPT', 'HANGMAN', 'DEVELOPER', 'PROGRAMMING'];
let chosenWord;
let guessedLetters;
let incorrectGuesses;
const maxIncorrectGuesses = 6;

function chooseRandomWord() {
    return words[Math.floor(Math.random() * words.length)];
}

function initializeGame() {
    chosenWord = chooseRandomWord();
    guessedLetters = [];
    incorrectGuesses = 0;
    document.querySelector('.container').style.opacity = 0;
    setTimeout(() => {
        updateWordDisplay();
        updateHangmanImage();
        updateStatus();
        createLetterButtons();
        document.querySelector('.container').style.opacity = 1;
    }, 300);
}

function updateWordDisplay() {
    const wordDisplay = document.getElementById('word');
    wordDisplay.innerHTML = chosenWord
        .split('')
        .map(letter => guessedLetters.includes(letter) ? `<span>${letter}</span>` : `<span>_</span>`)
        .join(' ');

    const spans = document.querySelectorAll('#word span');
    spans.forEach((span, index) => {
        span.style.animationDelay = `${index * 0.1}s`;
    });
}

function updateHangmanImage() {
    const hangmanImage = document.getElementById('hangmanImage');
    hangmanImage.src = `hangman${incorrectGuesses}.png`;

    // Ako igrač pogreši, dodajemo efekt treskanja
    if (incorrectGuesses > 0) {
        hangmanImage.classList.add('shake');
        setTimeout(() => {
            hangmanImage.classList.remove('shake');
        }, 500);
    }
}

function updateStatus() {
    const status = document.getElementById('status');
    if (incorrectGuesses >= maxIncorrectGuesses) {
        status.innerHTML = `Game Over! The word was ${chosenWord}.`;
        disableLetterButtons();
    } else if (!document.getElementById('word').innerText.includes('_')) {
        status.innerHTML = 'Congratulations! You guessed the word!';
        disableLetterButtons();
    } else {
        status.innerHTML = `Incorrect guesses: ${incorrectGuesses}`;
    }
}

function createLetterButtons() {
    const lettersDiv = document.getElementById('letters');
    lettersDiv.innerHTML = '';
    for (let charCode = 65; charCode <= 90; charCode++) {
        const letter = String.fromCharCode(charCode);
        const button = document.createElement('button');
        button.innerText = letter;
        button.addEventListener('click', () => guessLetter(letter));
        lettersDiv.appendChild(button);
    }
}

function guessLetter(letter) {
    if (chosenWord.includes(letter)) {
        guessedLetters.push(letter);
    } else {
        incorrectGuesses++;
    }
    updateWordDisplay();
    updateHangmanImage();
    updateStatus();
}

function disableLetterButtons() {
    document.querySelectorAll('#letters button').forEach(button => {
        button.disabled = true;
    });
}

document.getElementById('reset').addEventListener('click', initializeGame);

initializeGame();
