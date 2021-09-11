import { remove } from '@tweenjs/tween.js';
import * as Pixel from '../PixelFactory.js';

const bodys = require('../punk/traits/json/Body.json');
const eyes = require('../punk/traits/json/Eye.json');
const noses = require('../punk/traits/json/Nose.json');
const mouths = require('../punk/traits/json/Mouth.json');
const beards = require('../punk/traits/json/Beard.json');
const hairs = require('../punk/traits/json/Hair.json');
const hats = require('../punk/traits/json/Hat.json');
const eyeBrows = require('../punk/traits/json/EyeBrow.json');
const accessories = require('../punk/traits/json/Accessories.json');
const glasses = require('../punk/traits/json/Glass.json');

const accessorieColors = require('../punk/traits/json/color/AccessoriesColor.json');
const colors = require('../punk/traits/json/Colors.json');

let pixels = [{}];


let punkParts = [];

//TODO : LE REFLECT !
//ACCESSORIES CASQUE POUR CHAQUE COUPE DE CHEVEUX.
//VOIR POUR LE BODY A 0.5 de thikness
//TO AJOUTER LES PATES (poil/cheveux)
//TODO LES VERRES DES LUNETTES.
export function generatePunk(scene){
    console.log("generatePunk")

    let bodyColor = colors['body'][1];
    let hairColor = colors['hair'][1];
    let hairColor2 = colors['hair'][2];

    //ACCESSORIES

    // generateElem(scene, accessories[3]); //SI HOODIE mettre cheveux pour hoodie ou pas de cheveux...
    // generateElem(scene, hairs[10], hairColor['hair']); //BOF !!!!

    //REFLECT (if no hair &&  no hat)
    generateElem(scene, hairs[0], bodyColor.hexs['reflect']);

    //EYES
    generateElem(scene, eyes[0], bodyColor.hexs['eye']);

    //GLASS
    generateElem(scene, glasses[0]);

    //IF LUNETTE PAS D'EYEBROW
    //EYEBROWS
    // generateElem(scene, eyeBrows[0], hairColor['eyebrow']);

    //NOSE
    generateElem(scene, noses[0], bodyColor.hexs["nose"]);

    //MOUTH (lié a beard...)
    generateElem(scene, mouths[0]);//Neutre

    //BEARD
    generateElem(scene, beards[1], hairColor['beard']);

    //BODY
    generateElem(scene, bodys[0], bodyColor.hexs['body']);

    // generateElem(scene, hairs[0], bodyColors[2].hexs['reflect']); //Default (reflet: quand il n'y a aucun hair/hat)
}

function generateElem(scene, obj, color){

    punkParts.push(obj.name);

    console.log("generateElem: "+obj.name)
    obj.elems.forEach(element => {
        //ne fonctionne pas sans le string vide.
        let img = require(''+ element.src);
        let elemImg = Pixel.getBuffer(img);
        pixels.concat(Pixel.addPixelBlockToScene(pixels, element.name, elemImg, scene, color, element.thikness, element.z, element.rotation)); 
    });

    console.log(punkParts);
}

export function toogle (obj, scene, render){
    console.log("toogle")
    console.log(obj)
    scene.remove(obj);

    // var nextIndex = getNextIndex(glasses, obj.name);
    // console.log("glasses");

    // console.log(glasses);
    // console.log(nextIndex)
    // var nextObj = glasses[nextIndex];
    // console.log(nextObj)

    // generateElem(scene, nextObj);
}


export function generateElemByType(elementName){

    getNextIndex(glasses, elementName);
    // var objToDraw, index;

    // switch (type) {
    //     case "hair":
    //         index = hairs.length();

    //         break;
    
    //     default:
    //         break;
    // }
}





//todo, on envoi le nom depuis scene ici, on recup l'id du nouveau composant, on genere le nouveau composant ici.

//si l'index qu'on veut rajouté est superieur a la taille de la liste
function getNextIndex(elements, elementName){
    console.log("getNextIndex");
    console.log(elements);
    console.log(elementName)

    var nextIndex;
    var currentIndex = elements.findIndex(i => i.name === elementName);
   (currentIndex > elements.length -1) ? nextIndex = 0 : nextIndex = currentIndex +4; 

   console.log(`current index is ${currentIndex}`);
   console.log(`next  is ${nextIndex}`);

   return nextIndex;
}