var Letter = require('./letter.js'); //REQUIRE THE LETTER CLASS

var Word = function Word(newWord, chances=8) {
    //variables
    this.letters = []; //array of letter objects
    this.alreadyguessed = []; //array of letters the user already guessed - no penalties for repeats!
    this.chances = chances; //you get 8 chances by default; we can change that if we want

    //methods
    this.guess = function(letter) {
        //first, check if we still have chances...if not, we can't do anything!
        if(this.chances===0) {
            return false;
        }
        //next, check if this is even a valid guess...
        if( !letter.match(/^[a-zA-Z]+$/i) || letter.length > 1) {
            return false;
        }
        //if the guess is already in our array of past guesses, return false
        //(no penalties for having guessed the letter twice)
        if( this.alreadyguessed.includes(letter.toLowerCase() ) || this.alreadyguessed.includes(letter.toUpperCase() )) {
            return false;
        }

        //otherwise, add it to our 'guessed' array (as lowercase, to be standard)
        this.alreadyguessed.push(letter);
        
        //...and see if guess is part of the mysteryword
        var result = false; //assume the guess didn't work until proven otherwise
        this.letters.forEach(currentLetter => {
            //if we haven't already guessed the letter, and it isn't a special character...
            if(!currentLetter.guessed && !currentLetter.isSpecial) {
                if(currentLetter.guess(letter)) {
                    result = true;
                }            
            }
        });

        //if we didn't correctly guess, then we lose a chance
        if(!result) {
            this.chances-=1;
        }

        return result; //returns true if we guessed correctly
    };

    //isRevealed - returns true if the word is totally revealed, false otherwise
    //worst case: O(n) 
    this.isRevealed = function() {
        for(let j = 0; j < this.letters.length; j++) {
            //if we find a character that isn't yet guessed, and it isn't special either...
            if(!this.letters[j].isSpecial && !this.letters[j].guessed) {
                return false;
            }
        }
        return true;
    };

    //purposefully reveal the word 
    this.reveal = function() {
        var myStr=[];
        this.letters.forEach(currentLetter=> {
            myStr.push(currentLetter.letter);
        });
        return myStr.join(""); //return the entire bared word
    };

    //INIT AREA: 
    //when passed a word, first check that it's a non-null string
    if(typeof(newWord)==="string") {
        if(newWord!=="") {
            //attempt to create a letter object for each character in the word!
            for(let i = 0; i < newWord.length; i++) {
                this.letters.push(new Letter(newWord[i]));
            }
        }     
    }
    else { //otherwise, throw an error
        throw new Error("Word must be a non-null string.");
    }
}

Word.prototype.toString = function() {
    return this.letters.join(" ");
}

module.exports = Word;