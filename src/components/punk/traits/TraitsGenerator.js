const mouths = require('../traits/json/Mouth.json');


export function TraitsGenerator(){

    const rarity = [{rarity: "commun"}, {rarity: "rare"}];

    // expected output: 0, 1 or 2
    // console.log(getRandomInt(3));
    
    mouths.forEach(element => {
        element.test = "T";
    });

    function calculNbToMint(rarity, nbItemDifferent){
        const nbPunk = 10000;
        return (nbPunk/100*rarity)/nbItemDifferent;
    }

    // https://stackoverflow.com/questions/62413615/making-a-rarity-chance-in-javascript

    
}

export default TraitsGenerator;