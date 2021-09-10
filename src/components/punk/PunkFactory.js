import { BufferGeometry } from 'three';
import * as Pixel from '../Pixel.js';

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
    // generateElem(scene, accessories[0]);
    // generateElem(scene, accessories[1]);
    // generateElem(scene, accessories[2]);
    // generateElem(scene, accessories[3]); //SI HOODIE mettre cheveux pour hoodie ou pas de cheveux...
    // generateElem(scene, accessories[4]);
    // generateElem(scene, accessories[5]);
    // generateElem(scene, accessories[6]);

    //HAIR
    // generateElem(scene, hairs[0], hairColor['hair']);
    // generateElem(scene, hairs[1], hairColor['hair']);
    // generateElem(scene, hairs[2], hairColor['hair']);
    // generateElem(scene, hairs[3], hairColor['hair']);
    // generateElem(scene, hairs[4], hairColor['hair']);
    // generateElem(scene, hairs[5], hairColor['hair']);
    // generateElem(scene, hairs[6], hairColor['hair']);
    // generateElem(scene, hairs[7], hairColor['hair']);
    // generateElem(scene, hairs[8], hairColor['hair']);
    // generateElem(scene, hairs[9], hairColor['hair']);
    // generateElem(scene, hairs[10], hairColor['hair']); //BOF !!!!

    //HAT
    // generateElem(scene, hats[0]);
    // generateElem(scene, hats[1]);
    // generateElem(scene, hats[2]);
    // generateElem(scene, hats[3]);
    // generateElem(scene, hats[4]);
    // generateElem(scene, hats[5]);
    // generateElem(scene, hats[6]);
    // generateElem(scene, hats[7]);
    // generateElem(scene, hats[8]);


    //REFLECT (if no hair &&  no hat)
    generateElem(scene, hairs[0], bodyColor.hexs['reflect']);

    //EYES
    generateElem(scene, eyes[0], bodyColor.hexs['eye']);

    //GLASS
    generateElem(scene, glasses[10]);

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





    //BODY
    // generateElem(scene, hairs[5]);
    // generateElem(scene, eyes[1]); //Normaux
    // generateElem(scene, mouths[1]);//Sourire
    // generateElem(scene, noses[0], bodyColors[2].hexs['nose']); //Nez
    // generateElem(scene, accessories[4]); //Boucle oreille


    // generateElem(scene, bodys[0], bodyColors[2].hexs['body']);

    //BEARD  = MOUTH
    // generateElem(scene, mouths[0], hairColors[2].hex); //Barbe
    // generateElem(scene, mouths[1]);//Sourire
    // generateElem(scene, mouths[2], hairColors[2].hex)//Pate

    //HAIR = HAT
    // generateElem(scene, hairs[0], hairColors[2].hex);
    // generateElem(scene, hairs[0], bodyColors[2].hexs['reflect']); //Default (reflet: quand il n'y a aucun hair/hat)


    //NOSE
    // generateElem(scene, noses[0], bodyColors[0].hexs['nose']);

    //EYES = GLASS
    // generateElem(scene, eyes[0]); //Alien
    // generateElem(scene, eyes[2]); //Louche
    // generateElem(scene, eyes[3]); //Mask


    //ACCESSORIES
    // generateElem(scene, accessories[0]); //Cigarette
    // generateElem(scene, accessories[1]); //Blunt
    // generateElem(scene, accessories[2]); //Pipe
    // generateElem(scene, accessories[3]); //Hoodies
    // generateElem(scene, accessories[4], hairColors[3].hex); //Casque audio



    // Pixel.animateHat(scene);

    // generateElem(scene, Constants.smoke);
    // generateElem(scene, Constants.cigarette);
    // generateElem(scene, Constants.smoke);


}

function generateElem(scene, obj, color){
    console.log(obj.name)
    obj.elems.forEach(element => {
        //ne fonctionne pas sans le string vide.
        let img = require(''+ element.src);
        let elemImg = Pixel.getBuffer(img);
        pixels.concat(Pixel.addPixelBlockToScene(pixels, element.name, elemImg, scene, color, element.thikness, element.z, element.rotation)); 
    });
}

