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

export function generatePunk(scene){
    console.log("PunkFactory: addPunk");
    console.log(bodyColors[0].hexs['nose']);

    generateElem(scene, bodys[0], bodyColors[2].hexs['body']);

    //BEARD  = MOUTH
    // generateElem(scene, mouths[0], hairColors[2].hex); //Barbe
    generateElem(scene, mouths[1]);//Sourire
    generateElem(scene, mouths[2], hairColors[2].hex)//Pate

    //HAIR = HAT
    // generateElem(scene, hairs[0], hairColors[2].hex);
    generateElem(scene, hairs[2], hairColors[2].hex);
    // generateElem(scene, hairs[0], bodyColors[2].hexs['reflect']); //Default (reflet: quand il n'y a aucun hair/hat)


    //NOSE
    generateElem(scene, noses[0], bodyColors[0].hexs['nose']);

    //EYES = GLASS
    // generateElem(scene, eyes[0]); //Alien
    generateElem(scene, eyes[1]); //Normaux
    // generateElem(scene, eyes[2]); //Louche
    // generateElem(scene, eyes[3]); //Mask


    //ACCESSORIES
    // generateElem(scene, accessories[0]); //Cigarette
    // generateElem(scene, accessories[1]); //Blunt
    // generateElem(scene, accessories[2]); //Pipe
    // generateElem(scene, accessories[3]); //Hoodies
    generateElem(scene, accessories[4], hairColors[3].hex); //Casque audio





    // generateElem(scene, Constants.nose01);

    // generateElem(scene, Constants.glass01);

    // Face.generateHat(scene, Constants.hat01);
    // generateElem(scene, Constants.hair01);
    // generateElem(scene, Constants.hair04);

    // generateElem(scene, Constants.hat03);
    // generateElem(scene, Constants.hat02);
    // Pixel.animateHat(scene);

    // generateElem(scene, Constants.smoke);
    // generateElem(scene, Constants.cigarette);
    // generateElem(scene, Constants.smoke);


}

function generateElem(scene, obj, color){
    
    console.log("color")
    console.log(color)
    console.log("color")

    obj.elems.forEach(element => {
        //ne fonctionne pas sans le string vide.
        let img = require(''+ element.src);
        let elemImg = Pixel.getBuffer(img);
        Pixel.addPixelBlockToScene(element.name, elemImg, scene, color, element.thikness, element.z, element.rotation);
    });
}

