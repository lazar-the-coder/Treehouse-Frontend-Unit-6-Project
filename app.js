const qwertyHolder = document.getElementById('qwerty');
const phraseHolder = document.getElementById('phrase');
const startOverlay = document.getElementById('overlay');
const scoreboard = document.getElementById('scoreboard');

const phraseLine = phraseHolder.getElementsByTagName('ul')[0];
const scoreLine = scoreboard.getElementsByTagName('ol')[0];

let missed = 0;
phrases = ['tom is the bomb', 'yolo swag', 'great googly moogly', 'be good to bugs', 'the very model of a modern major general'];


function removePhrase() {
    while (phraseLine.firstChild) {
        phraseLine.removeChild(phraseLine.firstChild);
    }
    const allButtons = qwertyHolder.getElementsByClassName('chosen');
    if (allButtons.length > 0) {
        for (let i = allButtons.length -1; i >= 0; i--) {
            allButtons[i].disabled = false;
            allButtons[i].classList.remove('chosen');
        }
    }
    const allHearts = scoreLine.getElementsByTagName('img');
    for (image of allHearts) {
        image.src = 'images/liveHeart.png';
    }
}

function startGame() {
    startOverlay.style.display = 'none';
    missed = 0;
    removePhrase();
    const phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
}

startOverlay.addEventListener('click', (event) => {
    if (event.target.className === 'btn__reset') {
        startGame()
    }
});

function getRandomPhraseAsArray(arr) {
    const phrase = arr[Math.floor(Math.random() * arr.length)];
    return phrase.split('');
}

function addPhraseToDisplay(arr) {
    for (let letter in arr) {
        const letterItem = document.createElement('li');
        letterItem.textContent = arr[letter];
        if (arr[letter] != ' ') {
            letterItem.classList.add('letter');
        } else {
            letterItem.classList.add('space');
        }
        phraseLine.appendChild(letterItem);
    }
}

function checkLetter(button) {
    const letter = button.textContent;
    const children = phraseLine.children;
    let matched = false;
    for (let listItem in children) {
        if (children[listItem].className === 'letter') {
            if (children[listItem].textContent === letter){
                children[listItem].classList.add('show');
                matched = true;
            }
        }
    }
    if (matched) {
        return letter;
    } else {
        return null;
    }
}

function checkForWin() {
    if ((phraseLine.getElementsByClassName('letter')).length === (phraseLine.getElementsByClassName('show')).length) {
        changeScreen('win');
    } else if (missed >= 5) {
        changeScreen('lose');
    }
}

function changeScreen(word) {
    startOverlay.className = '';
    startOverlay.classList.add(word);
    startOverlay.classList.add('start');
    startOverlay.style.display = 'block';
    startOverlay.getElementsByClassName('btn__reset')[0].textContent = 'Reset Game';
    startOverlay.getElementsByClassName('title')[0].textContent = 'You ' + word;

}

qwertyHolder.addEventListener('click', (event) => {
    const scoreChildren = scoreLine.children[missed];
    if (event.target.nodeName === 'BUTTON') {
        event.target.classList.add('chosen');
        event.target.disabled = true;
        let letterFound = checkLetter(event.target);
        if (letterFound === null) {
            let heart = scoreChildren.children[0]
            heart.src = 'images/lostHeart.png';
            missed++;
        }
    }
    checkForWin();
});

