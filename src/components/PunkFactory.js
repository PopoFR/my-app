import { isIfStatement } from "@babel/types";
import * as THREE from "three";
import { addPixelBlockToScene } from './PixelFactory';
import { getRandomElem } from './Utils'
import * as Export from "../components/Export";


const colors = require('./punk/traits/json/Colors.json');
const hairs = require('./punk/traits/json/Hair.json');
const eyes = require('./punk/traits/json/Eye.json');
const noses = require('./punk/traits/json/Nose.json');
const beards = require('./punk/traits/json/Beard.json');
const hats = require('./punk/traits/json/Hat.json');
const glasses = require('./punk/traits/json/Glasses.json');
const jewels = require('./punk/traits/json/Jewels.json');
const base = require('./punk/traits/json/Base.json');
const smokes = require('./punk/traits/json/Smoke.json');
const masks = require('./punk/traits/json/Mask.json');
const encircleAndDrool = require('./punk/traits/json/EncircleAndDrool.json');

export function getPunk() {
    var name = "random punk";
    var traits = getFixedTraits();
    var punk = generatePunk(traits);
    punk.name = name;
    return punk;
}

export function getRandomPunk() {
    var name = "random punk";

    const hairColor = pickRandom(colors.elems.hairs);
    const bodyColor = pickRandom(colors.elems.body);
    const metalColor = pickRandom(colors.elems.metal);

//préparation des donnés
    //genere les traits (simplifiés)
    var randomSimplifiedTraits = getRandomSimplifiedTraits(hairColor, bodyColor, metalColor);
    // Export.uploadJson();
    //upload la liste des traits


//genération
    //on get la liste
        //tant qu'il y a des items dans la liste
    //on genere le punk n°1 de la liste
    //on upload le punk coté node
    //on supprime de la liste coté node (celle qu'on get)


    var randomDetailedTraits = getDetailedTraits(randomSimplifiedTraits);

    console.log(randomSimplifiedTraits);
    var punk = generatePunk(randomDetailedTraits);
    punk.name = name;

    return punk;
}




function getDetailedTraits(simplifiedTraits){
    var detailedTraits = [];
    simplifiedTraits.forEach(trait => detailedTraits.push(new Trait(getTraitDetail(trait.name, trait.jsonName), trait.color)));
    return detailedTraits;
}

// AJOUTER LE NOM DU PUNK
export function getXPunk(ammount) {
    var randomTraits = [];
    var name = "random punk";

    //on genere les traits de x (ammount) punk
    for (let index = 0; index < 10; index++) {
        randomTraits.push(getRandomSimplifiedTraits());
        // randomTraits.push({name: `junk3d_${index}`, traits: getSimplifiedTraits()});
    }
 
    //on supprime les doublons
    let json = new Set(randomTraits.map(JSON.stringify));

    //la liste de tout les punks (nom+traits)
    let distinctPunkList = Array.from(json).map((res, i)=>{
        var punk = {};
        punk.name = `Junk3D_${i}`;
        punk.traits = JSON.parse(res);
        return punk;
    });

}

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
            let element = new Element(e.name, trait.color, srcPath, customZandThikness.z, customZandThikness.thikness, e.rotation, e.opacity, e.isMerged, customZandThikness.x);
            
            var voxels = addPixelBlockToScene(pixels, colors, element)

            traitGroup.add(voxels);
        });

        punk.add(traitGroup);
    })

    //Gestion Hairpack (si chapeau = hat, hair = hat.haipack/hair)
    function handleHairHat(trait, elem, hairPack) {
        if (trait.type === "hair" && hairPack !== undefined) {
            var elementSplited = elem.src.split("/hair/");
            var newSrcPath = `${elementSplited[0]}/hair/${hairPack}/${elementSplited[1]}`;
            return newSrcPath
        }

        return elem.src
    }

    //Gestion de l'epaisseur, de la profondeur, de la position x et de la rotation, des elements customisé (cigarette, etc...)
    function handleCustomElement(trait, z, thikness, isBeared, bearTickness, bearZ, x) {

        if (isBeared && (trait.type === "mouth")) {
            thikness = bearTickness;
            z = bearZ;
        }

        if (trait.type === "accessory" && trait.isCustomZ === true) {
            z = bearZ;
        }

        if (isBeared && (trait.type === "pipe" || trait.type === "cigarette")) {
            x = 0.7;
            z = bearTickness + 0.30;
        }

        return { z: z, thikness: thikness, x: x };
    }

    return punk;
}

function getFixedTraits() {
    const bodyColor = colors.elems.body[5];
    const hairColor = colors.elems.hairs[2];
    const metalColor = colors.elems.metal[0].hex;

    let traits = [
        // new Trait(accessories[0]), 
        new Trait(base.elems[0], bodyColor.hexs.body),
        new Trait(base.elems[1], bodyColor.hexs.reflect),
        new Trait(base.elems[2], bodyColor.hexs.eye),
        new Trait(beards.elems[0]),
        new Trait(base.elems[4]),
        new Trait(eyes.elems[0]),
        new Trait(encircleAndDrool.elems[0]),        
        new Trait(glasses.elems[9]),
        new Trait(base.elems[5]),
        new Trait(noses.elems[0], bodyColor.hexs.nose),
        new Trait(jewels.elems[1], metalColor),
        new Trait(jewels.elems[0], metalColor),
        new Trait(hats.elems[23]),
        new Trait(hairs.elems[0], hairColor.hexs.hair),
    ]
    return traits;
}



//Affiche/N'affiche pas, aléatoirement selon tableau rarité des items; un item; puis selectionne aleatoirement un item, selon la rarité au sein du type d'item (item.rarity)
function getRandomTrait(traits, max, finalTraits, color) {
    if (checkIsPicked(max)) {
        var trait = pickRandom(traits.elems);
        finalTraits.push({name: trait.name, jsonName: traits.jsonName, color: color});
    }
    return finalTraits;
}




function getRandomSimplifiedTraits(hairColor, bodyColor, metalColor) {

//RARITY
    //base (doit etre 1)
    const eyesRatio = 1;
    const noseRatio = 1;
    
    //autre
    const hairRatio = 1;
    const beardRatio = 5;
    const hatRatio = 5;
    const glassesRatio = 10;
    const jewelRatio = 10;
    const smokingRatio = 5;
    const encirclesAndDroolRatio = 2;
    const maskRatio = 30;

    var isBeared;
    var glassPicked;

    var allTraits = [];

//TRAITS
    //on recupere la base (corps, bouche sourcil, reflet, oeil) (commun a tout les punk)

    allTraits.push({name: base.elems[0].name, jsonName: base.jsonName, color: bodyColor.hexs.body});//BODY
    allTraits.push({name: base.elems[2].name, jsonName: base.jsonName, color: bodyColor.hexs.eye});//BLAND DES YEUX

    // si le punk est un ape, on n'ajoute ni le nez ni le reflet)
    if (bodyColor.name !== 'Ape') {
        allTraits = getRandomTrait(noses, noseRatio, allTraits, bodyColor.hexs.nose);//NEZ
        allTraits.push({name: base.elems[1].name, jsonName: base.jsonName, color: bodyColor.hexs.reflect});//REFLET
    }


    //gère la barbe (utile pour décalage de la bouche et item comme cigarette, drool, mask...)
    //si il y a une barbe, il n'y a pas de mask... sinon il peux y avoir un mask
    if (checkIsPicked(beardRatio)) {
        var beard = pickRandom(beards.elems);
        allTraits.push({name: beard.name, jsonName: beards.jsonName, color: hairColor.hexs.beard});//BARBE
        isBeared = true;
    }
    else{
        allTraits = getRandomTrait(masks, maskRatio, allTraits);
    }

    allTraits.push({name: base.elems[5].name, jsonName: base.jsonName, color: undefined});//BOUCHE
    allTraits = getRandomTrait(eyes, eyesRatio, allTraits);//YEUX


    //gère le nom des lunettes (utile pour le bandeau de pirate)
    if (checkIsPicked(glassesRatio))
        glassPicked = pickRandom(glasses.elems);

    allTraits = getRandomTrait(hats, hatRatio, allTraits);//CHAPEAU
    allTraits = getRandomTrait(jewels, jewelRatio, allTraits);//BIJOUX
    allTraits = getRandomTrait(hairs, hairRatio, allTraits, hairColor.hexs.hair);//CHEVEUX

    //regle pour bandeau pirate
    if (glassPicked?.name !== "glasses_pirate")
        allTraits.push({name: base.elems[3].name, jsonName: base.jsonName, color: hairColor.hexs.eyebrow});//SOURCIL GAUCHE
    allTraits.push({name: base.elems[4].name, jsonName: base.jsonName, color: hairColor.hexs.eyebrow});//SOURCIL DROIT
    
    //CERNE ET BAVE
    if (!bodyColor.name !== "Alien"  && checkIsPicked(encirclesAndDroolRatio)) {
        allTraits.push({name: encircleAndDrool.elems[0].name, jsonName: encircleAndDrool.jsonName, color: bodyColor.hexs.encircles});
        allTraits.push({name: encircleAndDrool.elems[1].name, jsonName: encircleAndDrool.jsonName, color: undefined});
    }

    //LUNETTES
    if (glassPicked)
        allTraits.push({name: glassPicked.name, jsonName: glasses.jsonName, color: undefined});


    allTraits = getRandomTrait(smokes, smokingRatio, allTraits);  //CIGARETTE

    return allTraits;
};

//recupere les infos detaillés d'un trait (elems, z, thikness, etc...)
function getTraitDetail(name, jsonName){
    const itemsJson = require(`./punk/traits/json/${jsonName}`).elems;
    var itemDetail = itemsJson.find(item => item.name === name)
    return itemDetail
}

//un ratio(max) 1, donne donne 1:1 chance, un ratio(max)  de 20, 1:20...
function checkIsPicked(max) {
    max = Math.floor(max);
    var isPicked = Math.floor(Math.random() * (max - 1)) + 1 == 1 ? true : false;
    return isPicked;
}

//choisis aléatoirement un item dans la liste d'items, selon la "rarity", des items...
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