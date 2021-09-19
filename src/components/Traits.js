import {addPixelBlockToScene} from './PixelFactory';
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

export default class Trait {
    constructor(obj, color) {
        this.name = obj.name;
        this.color = color;
        this.rotation = obj.rotation;
        this.elements = obj.elems;
    }
}

export class Element {
    constructor(name, color, src, z, thikness, rotation) {
        this.name = name;
        this.color = color;
        this.src = src;
        this.z = z;
        this.thikness = thikness;
        this.rotation = rotation;
    }
}

export function getRandomTraits(){
    const bodyColor = getRandomElem(colors['body']);
    const hairColor = getRandomElem(colors['hairs']);
    const furColor = getRandomElem(colors['hairs']);

    let traits = [  
        new Trait(getRandomElem(hats)),
        new Trait(getRandomElem(glasses)),
        new Trait(getRandomElem(hairs), hairColor.hexs.hair),
        new Trait(getRandomElem(eyebrows), furColor.hexs.eyebrow),
        new Trait(getRandomElem(eyes), bodyColor.hexs.eye),
        new Trait(getRandomElem(noses), bodyColor.hexs.nose),
        new Trait(getRandomElem(mouths)),
        new Trait(getRandomElem(beards), furColor.hexs.beard),
        new Trait(getRandomElem(bodys), bodyColor.hexs.body)
    ]
    return traits;
};

export function generateTrait(scene, pixels, trait){
    var elements = [];
    trait.elements.forEach(e => {
        //ne fonctionne pas sans le string vide.
        let element = new Element (e.name, trait.color, e.src, e.z, e.thikness, trait.rotation);
        pixels.push(addPixelBlockToScene(scene, pixels, element)); 
        elements.push(element);
    });
}