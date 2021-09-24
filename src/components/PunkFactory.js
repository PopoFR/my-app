import * as THREE from "three";
import { addPixelBlockToScene } from './PixelFactory';
import { getRandomElem } from './Utils'

const colors = require('./punk/traits/json/Colors.json');
const hairs = require('./punk/traits/json/Hair.json');
const bodys = require('./punk/traits/json/Body.json');
const eyes = require('./punk/traits/json/Eye.json');
const noses = require('./punk/traits/json/Nose.json');
const mouths = require('./punk/traits/json/Mouth.json');
const beards = require('./punk/traits/json/Beard.json');
const hats = require('./punk/traits/json/Hat.json');
const eyebrows = require('./punk/traits/json/EyeBrow.json');
const glasses = require('./punk/traits/json/Glasses.json');
const accessories = require('./punk/traits/json/Accessories.json');

export function getPunk(name){
    var traits = getFixedTraits();
    var punk = generatePunk(traits);
    punk.name = name;
    return punk;
}

export function getRandomPunk(){
    var name = "random punk";
    var randomTraits = getRandomTraits();
    var punk = generatePunk(randomTraits);
    punk.name = name;
    return punk;
}

function generatePunk(traits){
    var punk = new THREE.Group();
    var pixels = [{x:0, y:0, z:0}];
    var colors = [{r:0, g:0, b:0}];
    var isBeared;
    var bearTickness;
    var bearZ;

    traits.forEach(trait => {

        //si il a une barbe, on elargie plus et on decale plus ou moins la bouche
        if (trait.type === "beard"){
            isBeared = true;
            bearTickness = trait.elems[0].thikness;
            bearZ = trait.elems[0].z;
        }

        if (isBeared === true && trait.type === "mouth"){
            trait.elems[0].thikness = bearTickness;
            trait.elems[0].z = bearZ; //1 = thikness du body
        }


        //on modelise chaque element de chaque trait
        trait.elems.forEach(e => {
            let element = new Element(e.name, trait.color, e.src, e.z, e.thikness, trait.rotation, e.opacity, e.isMerged);
            punk.add(addPixelBlockToScene(pixels, colors, element));
        });
    })

return punk;

function handdleMouthAndBear(){
    
}

}


function generateTrait(trait, pixels, colors) {
    var isCustomMouthZ = false;
    var group = new THREE.Group();
    group.name = trait.name;

    //pour chaque element (face, back, etc...) du trait, on genere un element.
    trait.elements.forEach(e => {
        //ne fonctionne pas sans le string vide.
        let element = new Element(e.name, trait.color, e.src, e.z, e.thikness, trait.rotation, e.opacity, e.isMerged);
        group.add(addPixelBlockToScene(pixels, colors, element));
    });

    return group;

    function customizeZforBeard(){
        console.log(isCustomMouthZ)
        isCustomMouthZ = true;

        console.log("customizeZforBeard")
        if (trait.type === "beard")
            isCustomMouthZ = true;

        if (isCustomMouthZ && trait.type === "mouth"){
            console.log("MouthCustomizedMouthCustomizedMouthCustomizedMouthCustomizedMouthCustomized")
            trait.z += 1;
        }
    }
}

    //hat15 marche pas avec masque, 
    //lunette 14 marche pas avec plein de chsoe
function getFixedTraits() {
    const bodyColor = colors['body'][2].hexs['body'];
    const hairColor = colors['hairs'][2].hexs['hair'];
    const eyesColor = colors['body'][2].hexs['eye'];
    const noseColor = colors['body'][2].hexs['nose'];
    const eyesBrowColor = colors['body'][2].hexs['eyebrow'];
    const beardColor = colors['hairs'][2].hexs.beard;
    const metalColor = colors['metal'][1].hexs;

    let traits = [
        new Trait(bodys[0], bodyColor),

        new Trait(eyebrows[0], eyesBrowColor),
        new Trait(eyes[3], eyesColor),
        new Trait(noses[0], noseColor),
        new Trait(mouths[0]),

        new Trait(hairs[2], hairColor),

        new Trait(glasses[0]),

        new Trait(hats[19]), 

        // new Trait(accessories[7], metalColor),

        // new Trait(getRandomElem(hairs), hairColor.hexs.hair),
        // new Trait(getRandomElem(mouths)),
    ]
    return traits;
}


function getRandomTraits() {

    const bodyColor = getRandomElem(colors['body']);
    const hairColor = getRandomElem(colors['hairs']);
    const furColor = getRandomElem(colors['hairs']);

    let traits = [
        new Trait(getRandomElem(bodys), bodyColor.hexs.body),
        new Trait(getRandomElem(eyes), bodyColor.hexs.eye),
        new Trait(getRandomElem(eyebrows), furColor.hexs.eyebrow),
        new Trait(getRandomElem(glasses)),
        new Trait(getRandomElem(hats)),
        new Trait(getRandomElem(noses), bodyColor.hexs.nose),
        new Trait(getRandomElem(mouths)),
        new Trait(getRandomElem(beards), furColor.hexs.beard),
        // new Trait(getRandomElem(hairs), hairColor.hexs.hair),
    ]
    return traits;
};


class Trait {
    constructor(obj, color) {
        this.name = obj.name;
        this.color = color;
        this.rotation = obj.rotation;
        this.elems = obj.elems;
        this.type = obj.type;
    }
}

class Element {
    constructor(name, color, src, z, thikness, rotation, opacity, isMerged, mouthZ) {
        this.name = name;
        this.color = color;
        this.src = src;
        this.z = z;
        this.thikness = thikness;
        this.rotation = rotation;
        this.opacity = opacity;
        this.isMerged = isMerged;
        this.mouthZ = mouthZ;
    }
}

