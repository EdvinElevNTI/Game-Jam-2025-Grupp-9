'use strict';

//Data
let secretNumber = Math.floor(Math.random() * 20) + 1; //the rng number
// let secretNumber = 10; //the rng number
let score = 5; //your current score
let gamestop = 0; //guessing switch: on/off
let audio_num = 0; //audio number
let currentAudio = ""; //current audio

// array with audio files
const audioArray = [
  "audio/Lös_uppgiften.mp3",
  "audio/Har_du_gjort_övningsprovet.mp3",
  "audio/Har_du_ens_öppnat_gleerups.mp3",
  "audio/Minst_två_uppgifter_ska_du_göra.mp3",
  "audio/Du_lyssnar_ju_aldrig.mp3",
];

//Visuals and interactions
const numberdisplay = document.querySelector('.number'); //[?] display
const visualscore = document.querySelector('.score'); //score: x
const guessinput = document.querySelector('.guess'); //input in bar
const displaymessage = document.querySelector('.message'); //message on screen
const intro_text = document.querySelector('.intro_text'); //intro message

//Send and update the message
function setMessage(theMessage)
{
  displaymessage.textContent = theMessage; //send the message in identifier
}

function setIntroMessage(theMessage)
{
  intro_text.textContent = theMessage; //send the message in identifier
}

//Again - reset the game
function reset()
{
  gamestop = 0; //guessing: on
  secretNumber = Math.floor(Math.random() * 20) + 1; //new rng number
  score = 5; //reset score
  visualscore.textContent = score; //reset the visual score
  guessinput.value = ''; //empty the input data
  numberdisplay.textContent = '?'; //update number display back to '?'
  setMessage('Guess...'); //send starting message
  setIntroMessage('Guess my secret number, and I shall reveal the truth of this world'); //send starting message
  numberdisplay.style.backgroundColor = "#eee"; //white

}

//When out of points
function gameover()
{
  numberdisplay.textContent = secretNumber; //show what the number was
  setMessage('Game over'); //display the game over message
  setIntroMessage('You have failed to guess my number...'); //display the message
  visualscore.textContent = 0; //score-- doesn't affect the last point because of its placement 
  numberdisplay.style.backgroundColor = "rgb(200, 60, 60)"; //red
}

//When "Check" button is pressed
document.querySelector('.check').addEventListener('click', function () {
  if (audio_num >= audioArray.length) { audio_num = 0; } //reset audio number
  currentAudio = new Audio(audioArray[audio_num]); //audio file
  audio_num += 1; //audio number
  currentAudio.play()

  const guess = Number(guessinput.value); //convert to a number value

  //guessing off if you already won/lost
  if (gamestop == 1) { return; }

  //If invalid guess
  if (!guess || guess < 1 || guess > 20)
  {
    score--;
    visualscore.textContent = score;
    setMessage('Invalid');
    if (score < 1) { gameover(); }
    return;
  }

  //if NOT a decimal
  else if (Number.isInteger(guess))
  {
    //If correct guess
    if (guess === secretNumber)
    {
      gamestop = 1; //guessing: off
      numberdisplay.textContent = secretNumber; //update the display
      setMessage("Correct..."); //display the message
      setIntroMessage('You guessed correct, I shall now reveal the truth of this world'); //display the message

      // numberdisplay color
      numberdisplay.style.backgroundColor = "rgb(90, 215, 90)"; //green

        setTimeout(function() {
            Achievement(); // run the achievement function
        }, 2000); // wait 2 seconds before running the function
    }
    else
    {
      //If the guess is wrong
      if (score > 1)
      {
        let LowOrHigh = ''; //decides the message to send to function
        
        // randomize 0 to 2
        let wildcard = Math.floor(Math.random() * 3);  // Chance: 1/3
        if (score === 5) { wildcard = 1; } //if first guess, then hint is on
        if (wildcard === 0)
        { LowOrHigh = 'No hint...'; }
        else if (guess > secretNumber) { LowOrHigh = 'Too high'}
        else { LowOrHigh = 'Too low'}
        setMessage(LowOrHigh); //send the message of the variable
      
        score--; //remove 1 point when wrong
        visualscore.textContent = score; //update the score visually
      }
    
      //if out of points
      else
      { 
        gamestop = 1; //switch off ability to guess
        gameover(); //run the gameover() function
      }
    }
  }

  //if decimal number
  else
  {
    score--;
    visualscore.textContent = score;
    setMessage('Invalid');
    if (score < 1) { gameover(); }
  }

}); //end of: when "check" button is pressed

//jump to reset function when "Again" is pressed
document.querySelector('.again').addEventListener('click', reset);

function Achievement() {
  const achievementBg = document.querySelector('.achievement_bg');
  const main_content = document.querySelector('.main_content');
   
  achievementBg.style.opacity = 0; // Ensure it starts from 0 opacity
  achievementBg.classList.add('fade-in');
  main_content.classList.add('fadeOut');
  // dots.classList.add('loading_animation');

  
  // Run the showAchievement function after a short delay
  setTimeout(function() {
      main_content.classList.add('d-none');
      showAchievement(); // run the achievement function
  }, 1500); // wait 1.5 second before running the function
}

function showAchievement() {
  const achievement = document.querySelector('.achievement');
  achievement.classList.remove('d-none');
  achievement.classList.add('show');
}

// Press Enter
document.addEventListener('DOMContentLoaded', () => {
  const inputField = document.querySelector('.guess');
  const checkButton = document.querySelector('.check');

  inputField.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
          checkButton.click();
      }
  });
});