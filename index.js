var Wordbank = require('./wordbank.js'); //load up a wordbank
var inquirer = require('inquirer');
var clear = require('clear');

//global variables
var currentWordList = []; //an array of words we get from our category objects
var currentWord = ""; //the current word we're playing
var playerScore = 0; //our current score
var roundsPlayed = 0; //how many rounds we've completed

//To start, we simply ask the user which category of words to use
askCategory();

//FUNCTION DECLARATIONS
function askCategory() {
    //first, see what categories we have loaded...and make those our choices!
    var allChoices = [];
    for(var key in Wordbank) {
        if(Wordbank[key].hasOwnProperty("title")) {
            var newChoice = {
                name: Wordbank[key].title,
                value: key
            };
            allChoices.push(newChoice);
        }
    }
    //lastly, add in an exit option
    allChoices.push({
        name: "Quit the Game",
        value: -1
    });
    inquirer.prompt({
        type: 'list',
        name: 'category',
        message: 'Please select a category:',
        choices: allChoices
    }).then(function(answer) {
        //first, if they're choosing to quit -- exit 
        if(answer.category===-1) {
            console.log("Goodbye!");
            return;
        }
        //now ask them to confirm after reading the description...if not, ask category again
        //first, set the wordlist equal to the right item
        currentWordList = Wordbank[answer.category].wordbank;
        inquirer.prompt({
            type: 'confirm',
            name: 'confirmCategory',
            message: Wordbank[answer.category].description + " (" + Wordbank[answer.category].wordbank.length + " words)" + "\nDoes this category sound good to you?"
        }).then(function(answer){
            if(!answer.confirmCategory) { 
                //if they didn't like that description, return to the category list
                askCategory();
            }
            else {
                //otherwise, pick a random word to ask!
                askWord();
            }
        });
    });
}

function askWord() {
    //first, we check if we have words left...if not, we'll stop asking from this list!
    if(currentWordList.length===0) {
        console.log("That's all the words we have for that category!\n");
        checkForNextPlay("Would you like to play again with a different category?", "category");
    } 
    else {
    //otherwise, grab a random current word (and remove it from that bank, as we are going to not use the same words twice)
    //NOTE: because we're using splice, we have to grab the '0th' indexed item from the array that splice returns in order to set that equal to our current word ;)
    currentWord = currentWordList.splice(Math.floor(Math.random()*currentWordList.length), 1)[0];  
    askLetter();
    }
}

function askLetter() {
    //first, clear the console and show the current word:
    clear();
    console.log(currentWord.toString() + "\nChances remaining: " + currentWord.chances);
    inquirer.prompt({
        type: 'input',
        name: 'letter',
        message: 'Please guess a letter [a-z]:',
        validate: function(myletter) {
            if(myletter.match(/^[a-zA-Z]+$/i) && myletter.length === 1) {
                return true;
            }
            else {
                console.log("\nPlease input a single letter (a-z) only!");
                return false;
            }
        }
    }).then(function(answer) {
        currentWord.guess(answer.letter);
        console.log(currentWord.toString());
        //check to see if we won...
        if(currentWord.isRevealed() && currentWord.chances>0) {
            playerScore+=currentWord.chances;
            roundsPlayed+=1;
            clear();
            console.log(currentWord.toString());
            console.log("CORRECT!\nYour score is now: " + playerScore);
            checkForNextPlay("Would you like to keep going?", "word");
        }
        else if (currentWord.chances===0) {
            roundsPlayed+=1;
            clear();
            console.log(currentWord.toString());
            console.log("Sorry, you're out of chances. The correct answer was '" + currentWord.reveal() + "'.");
            checkForNextPlay("Would you like to try another word?", "word");
        }
        else {
            askLetter();
        }
    });
}

//Function to help us confirm that the player wants to keep going!  
// This function takes a custom message, and a string that tells us which type of action to take (choose another category or move on to the next word)
function checkForNextPlay(message, type) {
    inquirer.prompt({
        type: 'confirm',
        name: 'playAgain',
        message: message
    }).then(function(answer){   
        if(answer.playAgain) {
            if(type==="category") {
                askCategory();
            } 
            else if(type==="word") {
                askWord();
            }
        }
        else {
            clear();
            console.log("Your final score was " + playerScore + " and you took on " + roundsPlayed + " word" + (roundsPlayed>1 ? "s" : "")+".\nThanks for playing!");
        }
    });
}