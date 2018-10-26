var Letter = function(letter) {
    this.letter = letter;
    this.isSpecial = false; //assume the letter is normal unless told otherwise
    this.guessed = false; //we start out having not guessed the letter
    this.guess = function(input) {
        if(this.letter === input.toLowerCase() || this.letter === input.toUpperCase()) {
            this.guessed = true;
            return true;
        }
        return false;
    }
    //INIT AREA
    if(typeof(letter)==="undefined") {
        throw(new Error("Letter is undefined."));
    }
    if(typeof(letter)!=="string") {
        throw(new Error("Letter must be a string."));
    }
    else if(letter.length>1) {
        throw(new Error("Letter must be a single character."));
    }
    else { //otherwise, we've passed the test (so far)
    //check for matching  a-z
        if(letter.match(/^[a-zA-Z]+$/i)) {
            this.letter = letter; //at long last
        }
        else { 
        //otherwise, this will be treated as a special character - we don't guess those, only display them
        //example: periods, spaces
            this.letter = letter;
            this.isSpecial = true; // special characters are shown by default
        }
    }
}

Letter.prototype.toString = function() {
    if(this.isSpecial || this.guessed) {
        return this.letter;
    }
    else {
        return "_";
    }
}

module.exports = Letter;