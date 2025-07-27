const messageBox = document.getElementById("message");
const startGAMEbtn = document.getElementById("startGAME");
const guessInput = document.getElementById("guessNum");
const rangeBtn = document.getElementById("range");

//sound
const winSound = document.getElementById("winSound");
const tryAgainSound = document.getElementById("tryAgainSound");
const loseSound = document.getElementById("loseSound");

// variable
let maxRange, randomNum, maxAttempts, attempts;

const showMess = (text) => {
  messageBox.textContent = text;
};

const setRange = () => {
  maxRange = parseInt(document.getElementById("range").value);
  randomNum = Math.floor(Math.random() * maxRange) + 1;
  maxAttempts = Math.ceil(Math.log2(maxRange)) + 3;

  attempts = 0;

  showMess(
    `Guess a number between 1 and ${maxRange}. You have ${maxAttempts} attemps left.`
  );
  startGAMEbtn.style.display = "none";
};

rangeBtn.addEventListener("change",setRange);


const makeGuess = () => {
  let guessNum = parseInt(guessInput.value);
  attempts++;

  if (isNaN(guessNum) || guessNum < 1 || guessNum > maxRange) {
    showMess(`Please enter a valid number between 1 and ${maxAttempts}.
            Attempts left : ${maxAttempts - attempts}`);
    return;
  }

  if(attempts > maxAttempts){
    loseSound.play();
    showMess(`Game Over ! You Lose , You 've used all ${maxAttempts}. The number was  ${randomNum}`)
    startGAMEbtn.style.display = "block";
    return;
  }

  if(guessNum === randomNum){
    winSound.play();
    showMess(`🎉 You guessed it! You Win ! The number was ${randomNum}. You used ${attempts} attempts.`);
    startGAMEbtn.style.display = "block";
    return;
  }
  if(guessNum < randomNum){
    tryAgainSound.play();
    showMess(`🔼 Too low! Attempts left: ${maxAttempts - attempts}`)
  }else {
    tryAgainSound.play();
    showMess(`🔼 Too high! Attempts left: ${maxAttempts - attempts}`)
  }

  if(attempts === maxAttempts && guessNum !== randomNum){
    loseSound.play();
    showMess(`Game Over ! You Lose , You 've used all ${maxAttempts}. The number was  ${randomNum}`)
    startGAMEbtn.style.display = "block";
  }
};

const startGame = () => {
    setRange();
    guessInput.value = '';
};

startGAMEbtn.addEventListener("click",startGame)

guessInput.addEventListener("keydown",(e)=>{
    if(e.key === 'Enter'){
        makeGuess();
        guessInput.value = '';
    }
})
