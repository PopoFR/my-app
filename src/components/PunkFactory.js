import { isIfStatement } from "@babel/types";
import * as THREE from "three";
import { addPixelBlockToScene } from './PixelFactory';
import { getRandomElem } from './Utils'

const colors = require('./punk/traits/json/Colors.json');
const hairs = require('./punk/traits/json/Hair.json');
const eyes = require('./punk/traits/json/Eye.json');
const noses = require('./punk/traits/json/Nose.json');
const beards = require('./punk/traits/json/Beard.json');
const hats = require('./punk/traits/json/Hat.json');
const glasses = require('./punk/traits/json/Glasses.json');
const accessories = require('./punk/traits/json/Accessories.json');
const jewels = require('./punk/traits/json/Jewels.json');
const base = require('./punk/traits/json/Base.json');
const smokes = require('./punk/traits/json/Smoke.json');
const masks = require('./punk/traits/json/Mask.json');

export function getPunk() {
    var name = "random punk";
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


// AJOUTER LE NOM DU PUNK
export function getXPunk(ammount) {
    var randomTraits = [];
    var name = "random punk";

    //on genere les traits de x (ammount) punk
    for (let index = 0; index < 10; index++) {
        randomTraits.push(getRandomTraits());
    }
    //on supprime les doublons
    let json  = new Set(randomTraits.map(JSON.stringify));
    //json to array
    let distinctTraitsList = Array.from(json).map(JSON.parse);

    console.log(distinctTraitsList)

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

        var traitGroup = new THREE.Group();
        traitGroup.name = trait.name;

        if (trait.type === "hat")
            hairPack = trait.hairPack;

        if (trait.type === "beard") {
            isBeared = true;
            bearTickness = trait.elems[0].thikness;
            bearZ = trait.elems[0].z;
        }

        var customX = 0;
        //on modelise chaque element de chaque traitz
        trait.elems.forEach(e => {
            var customZandThikness = handleCustomElement(trait, e.z, e.thikness, isBeared, bearTickness, bearZ, customX);
            var srcPath = handleHairHat(trait, e, hairPack);

            //copier e.src et renvoyé un modifié .
            let element = new Element(e.name, trait.color, srcPath, customZandThikness.z, customZandThikness.thikness, e.rotation, e.opacity, e.isMerged, customZandThikness.customX);
            var voxels = addPixelBlockToScene(pixels, colors, element)

            traitGroup.add(voxels);
        });

        punk.add(traitGroup);
    })

    function handleHairHat(trait, elem, hairPack) {
        if (trait.type === "hair" && hairPack !== undefined) {
            var elementSplited = elem.src.split("/hair/");
            var newSrcPath = `${elementSplited[0]}/hair/${hairPack}/${elementSplited[1]}`;
            return newSrcPath
        }

        return elem.src
    }

    function handleCustomElement(trait, z, thikness, isBeared, customThikness, customZ, x) {
        if (isBeared && (trait.type === "mouth")) {
            thikness = customThikness;
            z = customZ;
        }

        if (trait.type === "accessory" && trait.isCustomZ === true) {
            z = customZ;
        }

        if (trait.type === "glasses" && trait.hide === true) {
            z = 0;
        }

        if (isBeared && (trait.name === "pipe" || trait.name === "cigarette")) {
            x = 0.7;
            z = customZ+0.30;
        }


        return { z: z, thikness: thikness, customX: x };
    }

    return punk;
}

//hat15 marche pas avec masque, 
//lunette 14 marche pas avec plein de chsoe
function getFixedTraits() {
    const bodyColor = colors['body'][5];
    const hairColor = colors['hairs'][2];
    const metalColor = colors['metal'][0].hex;

    let traits = [
        // new Trait(accessories[0]), 
        new Trait(base[0], bodyColor.hexs.body),
        new Trait(base[1], bodyColor.hexs.reflect),
        new Trait(base[3], hairColor.hexs.eyebrow),
        new Trait(base[2], bodyColor.hexs.eye),
        new Trait(beards[0]),
        new Trait(base[4]),
        new Trait(eyes[0]),
        // new Trait(glasses[6]),
        new Trait(noses[0], bodyColor.hexs.nose),
        new Trait(jewels[1], metalColor),
        new Trait(jewels[0], metalColor),
        new Trait(hats[6]),
        new Trait(hairs[0], hairColor.hexs.hair),
    ]
    return traits;
}


function getRandomTrait(traits, max, finalTraits, color) {
    if (checkIsPicked(max)) {
        var trait = new Trait(pickRandom(traits), color);
        finalTraits.push(trait);
    }
    
    return finalTraits;
}

function getBase(bodyColor, hairColor) {

    var bases = [
        new Trait(base[0], bodyColor.hexs.body),
        new Trait(base[1], bodyColor.hexs.reflect),
        new Trait(base[2], bodyColor.hexs.eye),
        new Trait(base[5]),
    ];

    return bases;
}


//TODO SET DROOL ET GOAT    
function getRandomTraits() {

    //les ratio de rarity par type d'items
    const ratioHairs = 1;
    const ratioBear = 1;
    const ratioHat = 5;
    const rationGlasses = 1;
    const ratioJewels = 1;
    const ratioAccessorys = 30;
    const ratioEyes = 1;
    const ratioNoses = 1;
    const ratioSmoke = 1;
    const ratioEncirclesAndDrool = 1;

    const ratioMask = 1;

    //On recupere les couleurs peau/cheveux
    const hairColor = pickRandom(colors.hairs);
    const bodyColor = pickRandom(colors.body);
    const metalColor = pickRandom(colors.metal).hex;
    
    //on recupere la base (corps, bouche sourcil, reflet, oeil) (commun a tout les punk)
    var allTraits = getBase(bodyColor, hairColor);

    // si le punk est un ape, on n'ajoute ni le nez ni le reflet)
    if (bodyColor.name !== 'Ape') {
        allTraits = getRandomTrait(noses, ratioNoses, allTraits, bodyColor.hexs.nose);
        allTraits.push(new Trait(base[4], bodyColor.hexs.reflect));
    }

    //ajout des autres traits

    var isBeared = false;
    var glassName;

    if (checkIsPicked(ratioBear)){
        allTraits.push(new Trait(pickRandom(beards), hairColor.hexs.beard));
        isBeared = true;
    }
    
    allTraits.push(new Trait(base[5]));//bouche
    allTraits = getRandomTrait(eyes, ratioEyes, allTraits);

    if (checkIsPicked(rationGlasses)){
        var trait = new Trait(pickRandom(glasses));
        allTraits.push(trait);
        glassName = trait.name;
    }   

    allTraits = getRandomTrait(hats, ratioHat, allTraits);
    allTraits = getRandomTrait(jewels, ratioJewels, allTraits, metalColor);
    allTraits = getRandomTrait(hairs, ratioHairs, allTraits, hairColor.hexs.hair);

    //bave et cerne (1:10)
    // if (checkIsPicked(ratioEncirclesAndDrool)){
    //     allTraits.push(new Trait(accessories[2], bodyColor.hexs.encircles));
    //     allTraits.push(new Trait(accessories[3]));
    // }

  
    //sourcil droit si pas bandeau de pirate
        if(glassName !== "glasses_pirate")
            allTraits.push(new Trait(base[3], hairColor.hexs.eyebrow));
        allTraits.push(new Trait(base[4], hairColor.hexs.eyebrow));

        
    allTraits = getRandomTrait(smokes, ratioSmoke, allTraits);

    return allTraits;
};

function getJson(traits) {
    var simplified = [];

    traits.forEach(trait => {
        simplified.push({ name: trait.name, color: trait.color })
    });

    return JSON.stringify(simplified)
}

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
    constructor(name, color, src, z, thikness, rotation, opacity, isMerged, customX) {
        this.name = name;
        this.color = color;
        this.src = src;
        this.z = z;
        this.thikness = thikness;
        this.rotation = rotation;
        this.opacity = opacity;
        this.isMerged = isMerged;
        this.customX = customX;
    }
}

//un ratio(max) 1, donne donne 1:1 chance, un ratio(max)  de 20, 1:20...
function checkIsPicked(max) {
    max = Math.floor(max);
    var isPicked = Math.floor(Math.random() * (max - 1)) + 1 == 1 ? true : false;
    return isPicked;
}

function pickRandom(items) {

    // Calculate chances for common
    var filler = 100 - items.map(r => r.rarity).reduce((sum, current) => sum + current);

    if (filler <= 0) {
        console.log("chances sum is higher than 100!");
        return;
    }

    // Create an array of 100 elements, based on the chances field
    var probability = items.map((r, i) => Array(r.rarity === 0 ? filler : r.rarity).fill(i)).reduce((c, v) => c.concat(v), []);

    // Pick one
    var pIndex = Math.floor(Math.random() * 100);

    var rarity = items[probability[pIndex]];

    return (rarity);
}


