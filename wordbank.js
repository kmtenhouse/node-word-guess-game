var Word = require('./word.js');  //require the word class

// now set up some objects full of words!

var oceananimals = {
    title: "Underwater Animals",
    description: "All creatures great and small - from our oceans!",
    wordbank: createWordBank(["mola mola", "dolphin", "hammerhead shark", "manta ray", "walrus", "fur seal", "penguin"])
}

var landanimals = {
    title: "African Animals",
    description: "A selection of amazing animals from the Congo!",
    wordbank: createWordBank(["Ball python", "Black Mamba", "Bonobo", "Cheetah", "Common eland", "Serval", "Spotted Hyena", "Warthog", "Waterbuck", "Yellow-backed duiker"])
}

var birds = {
    title: "Birds of Prey", 
    description: "Dinosaurs didn't go extinct, they just took to the skies!",
    wordbank: createWordBank(["osprey", "red-tailed hawk", "bald eagle", "Cooper's hawk", "falcon", "kestrel", "great horned owl"])
}

//helper function: takes in an array of barewords, returns an array of word objects
function createWordBank(wordArray) {
    var resultsArr = [];
    for(let i=0; i<wordArray.length; i++) {
            resultsArr.push(new Word(wordArray[i]));
        }
    
    return resultsArr;
}

module.exports = {
    oceananimals: oceananimals,
    landanimals: landanimals,
    bird: birds
}