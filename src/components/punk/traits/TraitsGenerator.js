
//PAS IMPLEMENTE
export function traitsGenerator(){

    const rarity = [{rarity: "commun"}, {rarity: "rare"}];

    // expected output: 0, 1 or 2
    // console.log(getRandomInt(3));

    function calculNbToMint(rarity, nbItemDifferent){
        const nbPunk = 10000;
        return (nbPunk/100*rarity)/nbItemDifferent;
    }

    // https://stackoverflow.com/questions/62413615/making-a-rarity-chance-in-javascript

    
}

export default traitsGenerator;