import { addPixelBlockToScene } from './PixelFactory';
import { getRandomElem } from './Utils'
import * as THREE from "three";

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

//methode new Element, + generation dans constructeur Traits.
export class Trait {
    constructor(obj, color) {
        this.name = obj.name;
        this.color = color;
        this.rotation = obj.rotation;
        this.elements = obj.elems;
    }
}

export class Element {
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

export function getTraitObject() {
    const traits = [
        // colors, 
        hats,
        glasses,
        hairs,
        eyebrows,
        eyes,
        noses,
        mouths,
        beards,
        bodys
    ];

    return traits;
}

export function getTraitO(punk) {
    const traits = [
        // colors, 
        { name: "hats", ojb: hats },
        { name: "glasses", ojb: glasses },
        { name: "hairs", ojb: hairs },
        { name: "eyebrows", ojb: eyebrows },
        { name: "eyes", ojb: eyes },
        { name: "noses", ojb: noses },
        { name: "mouths", ojb: mouths },
        { name: "beards", ojb: beards },
        { name: "bodys", ojb: bodys },
    ];
    return traits;
}


export function getTraitsName() {

    const traits = [
        // 'colors',
        'hats',
        'glasses',
        'hairs',
        'eyebrows',
        'eyes',
        'noses',
        'mouths',
        'beards',
        'bodys'
    ];

    return traits;
}

export function getRandomTraits() {

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

    //hat15 marche pas avec masque, 
    //lunette 14 marche pas avec plein de chsoe
export function getFixedTraits() {
    const bodyColor = colors['body'][2].hexs['body'];
    const hairColor = colors['hairs'][0];
    const eyesColor = colors['body'][2].hexs['eye'];
    const noseColor = colors['body'][2].hexs['body'];
    const eyesBrowColor = colors['body'][2].hexs['eyebrow'];
    const beardColor = colors['hairs'][2].hexs.beard;

    let traits = [
        new Trait(bodys[0], bodyColor),
        new Trait(eyebrows[0], eyesBrowColor),
        new Trait(hats[18]), 
        new Trait(glasses[7]),
        new Trait(eyes[1], eyesColor),
        new Trait(noses[2], noseColor),
        new Trait(mouths[0]),
        new Trait(beards[8], beardColor),
        // new Trait(getRandomElem(hairs), hairColor.hexs.hair),
        // new Trait(getRandomElem(mouths)),
    ]
    return traits;
}

export function generateTrait(trait, pixels, colors) {

    let group = new THREE.Group();
    group.name = trait.name;

    //pour chaque element (face, back, etc...) du trait, on genere un element.
    trait.elements.forEach(e => {
        //ne fonctionne pas sans le string vide.
        let element = new Element(e.name, trait.color, e.src, e.z, e.thikness, trait.rotation, e.opacity, e.isMerged);
        group.add(addPixelBlockToScene(pixels, colors, element));
    });

    return group;
}