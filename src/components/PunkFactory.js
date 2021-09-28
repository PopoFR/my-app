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

export function getPunk(name) {
    var traits = getFixedTraits();
    var punk = generatePunk(traits);
    punk.name = name;
    return punk;
}

export function getRandomPunk() {
    var name = "random punk";
    var randomTraits = getRandomTraits();
    var punk = generatePunk(randomTraits);
    punk.name = name;
    return punk;
}


//RARITY
// plus simple et de mettre une rarity sur les type ET une rarity par item
function generatePunk(traits) {
    var punk = new THREE.Group();
    var pixels = [{ x: 0, y: 0, z: 0 }];
    var colors = [{ r: 0, g: 0, b: 0 }];

    var hairPack;


    var isBeared = false;
    var bearTickness;
    var bearZ;


    traits.forEach(trait => {
        //jouer avec les dossier... genre au lieu de pointer tout le chemin du png, ne pointer que 
        //si il a une barbe, on elargie plus et on decale plus ou moins la bouche

        if (trait.type === "hat")
            hairPack = trait.hairPack;

        if (trait.type === "beard") {
            isBeared = true;
            bearTickness = trait.elems[0].thikness;
            bearZ = trait.elems[0].z;
        }


        //on modelise chaque element de chaque traitz
        trait.elems.forEach(e => {
            
            var customZandThikness = handleMouthBeard(trait, e.z, e.thikness, isBeared, bearTickness, bearZ);
            var srcPath = handleHairHat(trait, e, hairPack);
            //copier e.src et renvoyé un modifié .
            let element = new Element(e.name, trait.color, srcPath, customZandThikness.z, customZandThikness.thikness, e.rotation, e.opacity, e.isMerged);
            punk.add(addPixelBlockToScene(pixels, colors, element));
        });
    })

    function handleHairHat(tr, elem, hairPack) {
        if (tr.type === "hair" && hairPack !== undefined) {
            var elementSplited = elem.src.split("/hair/");
            var newSrcPath = `${elementSplited[0]}/hair/${hairPack}/${elementSplited[1]}`;
            return newSrcPath
        }

        return elem.src
    }


    function handleMouthBeard(trait, z, thikness, isBeared, customThikness, customZ) {
        if (isBeared && (trait.type === "mouth")) {
            console.log("here")
            thikness = customThikness;
            z = customZ;
        }
        
        if (trait.type === "accessory" && trait.isCustomZ === true)
            z = customZ;


        return {z: z, thikness: thikness};
    }

    return punk;
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
        new Trait(hairs[0], colors['body'][2].hexs.reflect),
        new Trait(eyebrows[0], eyesBrowColor),
        new Trait(eyes[2]),
        // new Trait(beards[0]),
        new Trait(mouths[0]),
        new Trait(noses[0], noseColor),
        new Trait(accessories[9]),
        new Trait(hats[10]),



        // new Trait(hairs[13]),
        /*  */
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
        new Trait(getRandomElem(noses), bodyColor.hexs.nose),
        new Trait(getRandomElem(glasses)),
        new Trait(getRandomElem(beards), furColor.hexs.beard),
        new Trait(getRandomElem(mouths)),
        new Trait(getRandomElem(hats)),
        new Trait(getRandomElem(hairs), furColor.hexs.beard),

        // new Trait(getRandomElem(hairs), hairColor.hexs.hair),
    ]
    return traits;
};


class Trait {
    constructor(obj, color) {
        this.name = obj.name;
        this.color = color;
            this.elems = obj.elems;
        this.type = obj.type;
        this.hairPack = obj.hairPack;
        this.isCustomZ = obj.isCustomZ;
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

