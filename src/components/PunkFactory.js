import { ifStatement, isIfStatement } from "@babel/types";
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
    var randomTraits = getRandomTraits();
    var punk = generatePunk(randomTraits);
    punk.name = name;
    return punk;
}


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  }
  
function getRandomLastname(){
    const lastnames = require('./punk/traits/json/Lastname.json');
    const listCount = lastnames.lastname.length;
    var index = getRandomIntInclusive(1, listCount);
    return lastnames.lastname[index];
}

// AJOUTER LE NOM DU PUNK
export function getXPunk(ammount) {

    // var lastname = getRandomLastname();
    // punk.name = `${lastname}_#${i}`;

    var randomTraits = [];

    //on genere les traits de x (ammount) punk
    for (let index = 0; index < ammount; index++) {
        randomTraits.push(getRandomTraits());
    }
    //on supprime les doublons
    let json = new Set(randomTraits.map(JSON.stringify));
    //json to array
    let distinctTraitsList = Array.from(json).map(JSON.parse);

    var punks = [];

    //pour chaques traits, on genere le punk3d
    distinctTraitsList.forEach((element, i) => {
        var punk = generatePunk(element);
        punk.name = `Junk3d_${i+1}`;
        punks.push(punk);
    });

    return punks;
}

function generatePunk(traits) {

    var punk = new THREE.Group();


    var pixels = [{}];
    var colors = [{}];

    var hairPack;

    var isBeared = false;
    var isMasked = false;
    var customThikness;
    var customZ;
    var isApe = false;

    traits.forEach(trait => {
        var traitGroup = new THREE.Group();
        traitGroup.name = trait.name;

        if (trait.isApe)
            isApe = true;
  
        if (trait.type === "hat")
            hairPack = trait.hairPack;

        if (trait.type === "beard") {
            isBeared = true;
            customThikness = trait.elems[1].thikness;
            customZ = trait.elems[1].z;
        }

        if (trait.type === "mask") {
            isMasked = true;
            customThikness = trait.elems[0].thikness;
            customZ = trait.elems[0].z;
        }

        var customX = 0;
        //on modelise chaque element de chaque traitz
        trait.elems.forEach(e => {
            var customZandThikness = handleCustomElement(trait, e.z, e.thikness, isBeared, customThikness, customZ, customX);
            var srcPath = handleHairHat(trait, e, hairPack);

            //copier e.src et renvoyé un modifié .
            let element = new Element(e.name, trait.color, srcPath, customZandThikness.z, customZandThikness.thikness, e.rotation, e.opacity, e.isMerged, customZandThikness.customX, e.isDrool, e.isNoseDrool);
            
            if (trait.name === "blunt"){
                var voxels = createBlunt();
                if (isBeared){
                    voxels.position.z += customZ;
                }
            }
            else
                var voxels = addPixelBlockToScene(pixels, colors, element)


            if (e.isNoseDrool){
                voxels.position.x += 1;
                voxels.position.y += 0.075;
            }

            if (trait.name === "pipe" || trait.name === "cigarette"){
                voxels.rotateY(-Math.PI/2 );
                voxels.rotateY(0.17);

                if (isBeared){
                    voxels.position.z += -0.1;
                    voxels.position.x += 1;
                }
                else{
                    voxels.position.x += 1;
                    voxels.position.z = -1.1;
                }
            }

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
    function handleCustomElement(trait, z, thikness, isBeared, customThikness, customZ, x) {

        if (isBeared && (trait.type === "mouth")) {
            thikness = (customThikness === undefined)? 0 : customThikness;
            z = (customZ === undefined)? z : customZ;
        }

        if (trait.name === "drool") {
            z = (customThikness === undefined)? z : (customThikness/2) + customZ;
        }

        return { z: z, thikness: thikness, customX: x };
    }

    return punk;
}

function createBlunt(){
    const color = new THREE.Color(0xFFFFFF);
    const color2 = new THREE.Color(0xff6000);

    var jointMaterial = new THREE.MeshStandardMaterial({ 
        color: color, 
        metalness: 0, 
        roughness: 1,
        flatShading: true
      });
      var jointMaterial2 = new THREE.MeshStandardMaterial({ 
        color: color2, 
        metalness: 0, 
        roughness: 1,
        flatShading: true
      });

    var jointGeometry = new THREE.CylinderGeometry( 0.6, 1, 4, 4, 1 );
    var jointGeometry2 = new THREE.CylinderGeometry( 1, 1.05, 0.75, 4, 1 );
    
    var jointMesh =  new THREE.Mesh(jointGeometry, jointMaterial);
    var jointMesh2 =  new THREE.Mesh(jointGeometry2, jointMaterial2);

    var group = new THREE.Group();
    group.add(jointMesh);
    group.add(jointMesh2);

    group.rotateX(- Math.PI/2 );
    group.rotateY(Math.PI/4);
    group.updateMatrix()
    group.rotateX(-0.17);
    group.rotateZ(0.14);

    group.position.y += -5;
    group.position.x += 1.5;
    group.position.z += 2.2;
    
    jointMesh2.position.y += -2.33;
    jointMesh.castShadow = true;
    jointMesh2.castShadow = true;

    return group;
}


function getFixedTraits() {
    const bodyColor = colors['body'][2];
    const hairColor = colors['hairs'][2];
    const metalColor = colors['metal'][0].hex;

    let mikey = [
        // new Trait(accessories[0]), 
        new Trait(base[0], bodyColor.hexs.body),
        new Trait(base[1], bodyColor.hexs.reflect),
        new Trait(base[2], bodyColor.hexs.eye),
        new Trait(beards[3], hairColor.hexs.beard),
        new Trait(base[3], hairColor.hexs.eyebrow),
        new Trait(base[4], hairColor.hexs.eyebrow),
        new Trait(eyes[3]),
        new Trait(hats[17]),
        new Trait(encircleAndDrool[0], bodyColor.hexs.encircles),
        new Trait(hairs[4], hairColor.hexs.hair),
        new Trait(glasses[6]),

        new Trait(base[5]),
        new Trait(encircleAndDrool[1]),
        new Trait(encircleAndDrool[2]),
        new Trait(smokes[1]),
    ]

    // let mikey2 = [
    //     new Trait(base[0], bodyColor.hexs.body),
    //     new Trait(base[1], bodyColor.hexs.reflect),
    //     new Trait(base[2], bodyColor.hexs.eye),
    //     new Trait(beards[3], hairColor.hexs.beard),
    //     new Trait(base[3], hairColor.hexs.eyebrow),
    //     new Trait(base[4], hairColor.hexs.eyebrow),
    //     new Trait(eyes[3]),
    //     new Trait(encircleAndDrool[0], bodyColor.hexs.encircles),
    //     new Trait(base[5]),
    //     new Trait(encircleAndDrool[1]),
    //     new Trait(encircleAndDrool[2]),
    //     new Trait(hats[20]),
    //     new Trait(hairs[4], hairColor.hexs.hair),
    //     new Trait(smokes[1]),
    // ]

    // let scumbag = [
    //     new Trait(base[0], bodyColor.hexs.body),
    //     new Trait(base[1], bodyColor.hexs.reflect),
    //     new Trait(base[2], bodyColor.hexs.eye),
    //     new Trait(jewels[1], metalColor),
    //     new Trait(jewels[0], metalColor),
    //     new Trait(beards[8], hairColor.hexs.beard),
    //     new Trait(base[3], hairColor.hexs.eyebrow),
    //     new Trait(base[4], hairColor.hexs.eyebrow),
    //     new Trait(eyes[2]),
    //     new Trait(encircleAndDrool[0], bodyColor.hexs.encircles),
    //     new Trait(base[5]),
    //     new Trait(encircleAndDrool[1]),
    //     new Trait(encircleAndDrool[2]),
    //     new Trait(hats[25]),
    //     new Trait(hairs[0], hairColor.hexs.hair),
    //     new Trait(smokes[1]),
    // ]

    // let traitsRocker = [
    //     new Trait(base[0], bodyColor.hexs.body),
    //     new Trait(base[1], bodyColor.hexs.reflect),
    //     new Trait(base[2], bodyColor.hexs.eye),
    //     new Trait(jewels[1], metalColor),
    //     new Trait(jewels[0], metalColor),
    //     new Trait(beards[3], hairColor.hexs.beard),
    //     new Trait(base[3], hairColor.hexs.eyebrow),
    //     new Trait(base[4], hairColor.hexs.eyebrow),
    //     new Trait(eyes[0]),
    //     new Trait(base[5]),
    //     new Trait(hats[15]),
    //     new Trait(hairs[3], hairColor.hexs.hair),
    // ]

    if (bodyColor.name !== "Ape")
        mikey.push(new Trait(noses[0], bodyColor.hexs.nose))

    return mikey;
}

//body, reflet, blanc des yeux, bouche
function getBase(bodyColor) {
    return [
        new Trait(base[0], bodyColor.hexs.body),
        new Trait(base[2], bodyColor.hexs.eye),
        new Trait(base[5]),
    ];
}


//les ratio de rarity par type d'items
const hairRatio = 1;
const beardRatio = 3;
const hatRatio = 2;
const glassesRatio = 3;
const jewelRatio = 4;
const eyesRatio = 1;
const noseRatio = 1;
const smokingRatio = 5;
const encirclesAndDroolRatio = 3;
const maskRatio = 8;


function getRandomTraits() {

    //On recupere les couleurs peau/cheveux
    const hairColor = pickRandom(colors.hairs);
    // const bodyColor = colors['body'][0];
    const bodyColor = pickRandom(colors.body);
    const metalColor = pickRandom(colors.metal).hex;

    //on recupere la base (corps, bouche sourcil, reflet, oeil) (commun a tout les punk)
    var allTraits = getBase(bodyColor);

    // si le punk est un ape, on n'ajoute ni le nez ni le reflet)
    if (bodyColor.name !== 'Ape') {
        allTraits = getRandomTrait(noses, noseRatio, allTraits, bodyColor.hexs.nose);
        allTraits.push(new Trait(base[1], bodyColor.hexs.reflect));
    }

    //ajout des autres traits

    var isBeared = false;
    var isMasked = false;
    var glassName;

    allTraits = getRandomTrait(jewels, jewelRatio, allTraits, metalColor);    //BIJOUX

    
    //BARBE
    if (checkIsPicked(beardRatio)) {
        allTraits.push(new Trait(pickRandom(beards), hairColor.hexs.beard));
        isBeared = true;
    }

    //MASK
    if (!isBeared && checkIsPicked(maskRatio)) {
        allTraits.push(new Trait(pickRandom(masks)));
        isMasked = true;
    }

    //CERNE ET BAVE
    if (checkIsPicked(encirclesAndDroolRatio)) {
        allTraits.push(new Trait(encircleAndDrool[0], bodyColor.hexs.encircles));
        if (!isMasked){
            allTraits.push(new Trait(encircleAndDrool[1]));
            allTraits.push(new Trait(encircleAndDrool[2]));
        }
    }

    allTraits.push(new Trait(base[5]));    //BOUCHE
    allTraits = getRandomTrait(eyes, eyesRatio, allTraits);    //YEUX


    var randomGlasses;
    //LE NOM DES LUNETTES
    if (checkIsPicked(glassesRatio)) {
        randomGlasses = new Trait(pickRandom(glasses));
        glassName = randomGlasses.name;
    }



    allTraits = getRandomTrait(hats, hatRatio, allTraits);    //CHAPEAU
    allTraits = getRandomTrait(hairs, hairRatio, allTraits, hairColor.hexs.hair);    //CHEVEUX

    //Si bandeau pirate il n'y a pas de sourcil gauche
    if (glassName !== "glasses_pirate" && glassName !== "glasses_thuglife" )
        allTraits.push(new Trait(base[3], hairColor.hexs.eyebrow)); //  SOURCIL GAUCHE
    if (glassName !== "glasses_thuglife" )
        allTraits.push(new Trait(base[4], hairColor.hexs.eyebrow));//  SOURCIL DROIT

        if (randomGlasses !== undefined)
        allTraits.push(randomGlasses);
    //AJOUT DES LUNETTES  (je comprend pas pourquoi cette partie doit etre mise apres la poche sous les yeux... logiquement ca devrait etre l'inverse)


    allTraits = getRandomTrait(smokes, smokingRatio, allTraits);  //CIGARETTE

    return allTraits;
};

//Affiche/N'affiche pas, aléatoirement selon tableau rarité des items; un item; puis selectionne aleatoirement un item, selon la rarité au sein du type d'item (item.rarity)
function getRandomTrait(traits, max, finalTraits, color) {
    if (checkIsPicked(max)) {
        var trait = new Trait(pickRandom(traits), color);
        finalTraits.push(trait);
    }

    return finalTraits;
}

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
    constructor(name, color, src, z, thikness, rotation, opacity, isMerged, customX, isDrool, isNoseDrool) {
        this.name = name;
        this.color = color;
        this.src = src;
        this.z = z;
        this.thikness = thikness;
        this.rotation = rotation;
        this.opacity = opacity;
        this.isMerged = isMerged;
        this.customX = customX;
        this.isDrool = isDrool;
        this.isNoseDrool = isNoseDrool;
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


