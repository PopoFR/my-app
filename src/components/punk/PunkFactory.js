import * as Constants from './constants.js'
import * as Pixel from '../Pixel.js';

const bodys = require('../punk/traits/json/Body.json');
const eyes = require('../punk/traits/json/Eye.json');
const noses = require('../punk/traits/json/Nose.json');
const mouths = require('../punk/traits/json/Mouth.json');
const hairs = require('../punk/traits/json/Hair.json');
const accessories = require('../punk/traits/json/Accessories.json');

const hairColors = require('../punk/traits/json/color/HairColor.json');
const bodyColors = require('../punk/traits/json/color/BodyColor.json');
const accessorieColors = require('../punk/traits/json/color/AccessoriesColor.json');


let pixels = [{}];


//TODO : LE REFLECT !
//ACCESSORIES CASQUE POUR CHAQUE COUPE DE CHEVEUX.
//VOIR POUR LE BODY A 0.5 de thikness
export function generatePunk(scene){
    console.log("generatePunk")

    //BODY
    generateElem(scene, hairs[5]);
    generateElem(scene, eyes[1]); //Normaux
    generateElem(scene, mouths[1]);//Sourire
    generateElem(scene, noses[0], bodyColors[2].hexs['nose']); //Nez
    // generateElem(scene, accessories[4]); //Boucle oreille


    generateElem(scene, bodys[0], bodyColors[2].hexs['body']);

    //BEARD  = MOUTH
    // generateElem(scene, mouths[0], hairColors[2].hex); //Barbe
    // generateElem(scene, mouths[1]);//Sourire
    generateElem(scene, mouths[2], hairColors[2].hex)//Pate

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
    obj.elems.forEach(element => {
        //ne fonctionne pas sans le string vide.
        let img = require(''+ element.src);
        let elemImg = Pixel.getBuffer(img);
        pixels.concat(Pixel.addPixelBlockToScene(pixels, element.name, elemImg, scene, color, element.thikness, element.z, element.rotation)); 
    });
}

