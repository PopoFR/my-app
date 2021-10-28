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
    for (let index = 0; index < 1000; index++) {
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
    var isHair = false;


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
        if (trait.type === "hair") {
            isHair = true;
        }


        //on modelise chaque element de chaque traitz
        trait.elems.forEach(e => {
            var customZandThikness = handleCustomElement(trait, e.z, e.thikness, isBeared, bearTickness, bearZ);
            var srcPath = handleHairHat(trait, e, hairPack);

            //copier e.src et renvoyé un modifié .
            let element = new Element(e.name, trait.color, srcPath, customZandThikness.z, customZandThikness.thikness, e.rotation, e.opacity, e.isMerged);
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

    function handleCustomElement(trait, z, thikness, isBeared, customThikness, customZ) {
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

        return { z: z, thikness: thikness };
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
        new Trait(base[0], bodyColor.hexs.body),
        new Trait(base[1], bodyColor.hexs.reflect),
        new Trait(base[3], hairColor.hexs.eyebrow),
        new Trait(base[2], bodyColor.hexs.eye),
        new Trait(beards[0]),
        new Trait(base[4]),
        new Trait(eyes[0]),
        new Trait(accessories[5], bodyColor.hexs.encircles),
        new Trait(noses[0], bodyColor.hexs.nose),
        new Trait(jewels[3], metalColor),
        new Trait(jewels[0], metalColor),
        // new Trait(accessories[3]), //hoodies
        new Trait(accessories[6]),
        new Trait(glasses[7]),
        new Trait(hats[20]),
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
        new Trait(base[3], hairColor.hexs.eyebrow),
        new Trait(base[2], bodyColor.hexs.eye),
    ];

    return bases;
}


function getRandomTraits() {

    //les ratio de rarity par type d'items
    const ratioHairs = 3;
    const ratioBear = 3;
    const ratioHat = 5;
    const rationGlasses = 10;
    const ratioJewels = 1;
    const ratioEncircles = 20;
    const ratioDrool = 20;
    const ratioAccessorys = 30;
    const ratioEyes = 1;
    const ratioNoses = 1;

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
    allTraits = getRandomTrait(eyes, ratioEyes, allTraits);
    allTraits = getRandomTrait(beards, ratioBear, allTraits, hairColor.hexs.beard);
    allTraits.push(new Trait(base[4]));//bouche
    allTraits = getRandomTrait(glasses, rationGlasses, allTraits);
    allTraits = getRandomTrait(hats, ratioHat, allTraits);
    allTraits = getRandomTrait(jewels, ratioJewels, allTraits, metalColor);
    allTraits = getRandomTrait(hairs, ratioHairs, allTraits, hairColor.hexs.hair);
    allTraits.push(new Trait(accessories[2]));//bouche

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


