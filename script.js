import { guess_words } from "./words.js";
import { alphabet } from "./words.js";

// if incorrect, it will display the letter below the word and show the next step in the hangman art (head, body, arms, etc)
// once the hangman is complete - the game is over and the option to start a new game is given
// if the user guesses the word before then, the game is won and the option to start a new game is given

// Generate a random number to use as index for selecting random word from array
const rand = Math.floor(Math.random() * guess_words.length);
const word = guess_words[rand];
var letter_space = [];

var game_over = false;

// word space generator
for (let i = 0; i < word.length; i++) {
  // create the element and give it some style
  letter_space[i] = document.createElement("h1");
  letter_space[i].classList.add("w-5");
  letter_space[i].classList.add("md:w-16");
  letter_space[i].classList.add("text-center");
  letter_space[i].classList.add("text-neutral-900");
  letter_space[i].classList.add("text-xl");
  letter_space[i].classList.add("md:text-6xl");
  letter_space[i].classList.add("border-b-2");
  letter_space[i].classList.add("border-red-600");

  var letter = document.createTextNode("*");
  letter_space[i].appendChild(letter);

  document.querySelector(".guess-holder").appendChild(letter_space[i]);
} // end of for

// alphabet selection generator
var alpha_holder = [];
var alpha = [];
var indexes = [];
var button = [];
var counter = 0;
var wrong_choices = 0; // variable to determine loss of game
var hangman_art = document.querySelector(".hangman-art");

alphabet.forEach((a) => {
  button[counter] = true;
  alpha = document.createElement("button");
  alpha.classList.add("md:w-12");
  alpha.classList.add("w-6");
  alpha.classList.add("sm:w-10");
  alpha.classList.add("md:h-12");
  alpha.classList.add("sm:h-10");
  alpha.classList.add("h-6");
  alpha.classList.add("bg-blue-600");
  alpha.classList.add("text-white");
  alpha.classList.add("text-center");
  alpha.classList.add("md:text-3xl");
  alpha.classList.add("rounded-full");
  alpha.classList.add("md:hover:bg-blue-400");

  var alpha_letter = document.createTextNode(a);
  alpha.appendChild(alpha_letter);

  alpha_holder.push(alpha);
  document.querySelector(".alphabet").appendChild(alpha);

  // increment counter
  counter++;
  alpha.addEventListener("click", () => {
    // check that game has not ended
    if (!game_over) {
      // if button is not disabled
      if (button[alphabet.indexOf(a)]) {
        // remove all indexes from indexes array
        if (indexes.length > 0) {
          for (let i = 0; i <= indexes.length + 1; i++) {
            indexes.pop();
          }
        }

        // if the chosen letter is in the word
        if (word.includes(a)) {
          // get all indexes where the chosen letter appears
          for (let i = 0; i < word.length; i++) {
            if (a == word[i]) {
              indexes.push(i);
            }
          }

          // populate blank space(s) with chosen letter
          indexes.forEach((i) => {
            letter_space[i].innerHTML = a;
            letter_space[i].classList.remove("text-neutral-900");
            letter_space[i].classList.add("text-green-600");
          });
        } else {
          // chosen letter is not in word
          // add hangman art to signify wrong choice
          wrong_choices++;
          if (wrong_choices < 10) {
            hangman_art.src = "hangman_" + wrong_choices + ".png";
          } else {
            hangman_art.src = "hangman_end.png";
            game_over = true;
            setTimeout(() => {
              alert("You stink, loser!!");
            }, "500");
          }
        }

        // add linethrough on chosen letter and disable button
        button[alphabet.indexOf(a)] = false;
        alpha_holder[alphabet.indexOf(a)].classList.remove("bg-blue-600");
        alpha_holder[alphabet.indexOf(a)].classList.remove(
          "md:hover:bg-blue-400"
        );
        alpha_holder[alphabet.indexOf(a)].classList.add("bg-neutral-300");
        alpha_holder[alphabet.indexOf(a)].classList.add("cursor-not-allowed");
      }

      // check each character chosen and see if words match
      var points = 0;
      for (let i = 0; i < word.length; i++) {
        if (word[i] == letter_space[i].innerHTML) {
          points++;
        }
      }

      // check for win
      if (points == word.length) {
        setTimeout(() => {
          alert("You win!!!");
        }, "500");
        game_over = true;
        // set message to 'You Win!'
        // stop user from making any more guesses
      } else {
        console.log("not quite there yet.");
      }
    } else {
      console.log("game is over");
    }
  }); // end of event listener
}); // end of foreach
