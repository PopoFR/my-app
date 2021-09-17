import Trait from './Traits';
import {getRandomElem} from './Utils'

const colors = require('./punk/traits/json/Colors.json');
const hairs = require('./punk/traits/json/Hair.json');
const bodys = require('./punk/traits/json/Body.json');
const eyes = require('./punk/traits/json/Eye.json');
const noses = require('./punk/traits/json/Nose.json');
const mouths = require('./punk/traits/json/Mouth.json');
const beards = require('./punk/traits/json/Beard.json');
const hats = require('./punk/traits/json/Hat.json');
const eyebrows = require('./punk/traits/json/EyeBrow.json');
const glasses = require('./punk/traits/json/Glass.json');
const accessories = require('./punk/traits/json/Accessories.json');


export function getRandomPunk(scene, pixels, name){

    const bodyColor = getRandomElem(colors['body']);
    const hairColor = getRandomElem(colors['hairs']);
    const furColor = getRandomElem(colors['hairs']);

    var punk = new Punk();
    punk.name = name;
    punk.traits = [             
        new Trait(scene, pixels, getRandomElem(hats)),
        new Trait(scene, pixels, getRandomElem(glasses)),
        new Trait(scene, pixels, getRandomElem(hairs), hairColor.hexs.hair),
        new Trait(scene, pixels, getRandomElem(eyebrows), furColor.hexs.eyebrow),
        new Trait(scene, pixels, getRandomElem(eyes), bodyColor.hexs.eye),
        new Trait(scene, pixels, getRandomElem(noses), bodyColor.hexs.nose),
        new Trait(scene, pixels, getRandomElem(mouths)),
        new Trait(scene, pixels, getRandomElem(beards), furColor.hexs.beard),
        new Trait(scene, pixels, getRandomElem(bodys), bodyColor.hexs.body)
    ]

    return {name: punk.name, traits: punk.traits};
};


export function getPunk(scene, pixels, name){
    
    // var traits = [             
    //     new Trait(scene, pixels, getRandomElem(hats)).name,
    //     new Trait(scene, pixels, getRandomElem(glasses)).name,
    //     new Trait(scene, pixels, getRandomElem(hairs), hairColor.hexs.hair).name,
    //     new Trait(scene, pixels, getRandomElem(eyebrows), furColor.hexs.eyebrow).name,
    //     new Trait(scene, pixels, getRandomElem(eyes), bodyColor.hexs.eye).name,
    //     new Trait(scene, pixels, getRandomElem(noses), bodyColor.hexs.nose).name,
    //     new Trait(scene, pixels, getRandomElem(mouths)).name,
    //     new Trait(scene, pixels, getRandomElem(beards), furColor.hexs.beard).name,
    //     new Trait(scene, pixels, getRandomElem(bodys), bodyColor.hexs.body).name
    // ];
    
    // return new Punk(name, traits);
}

function getTraitsList(type){

    var trait;
    
    switch (type) {
        case "body":
            trait = "";
            break;
    
        default:
            break;
    }
}

export default class Punk{
    constructor(name, traits){
        this.name = name;
        this.traits = [traits]
    }
}
