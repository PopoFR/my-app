import * as Constants from './constants.js'
import * as Pixel from '../Pixel.js';

const bodys = require('../punk/traits/json/Body.json');
const eyes = require('../punk/traits/json/Eye.json');
const noses = require('../punk/traits/json/Nose.json');
const beards = require('../punk/traits/json/Mouth.json');
const hairColors = require('../punk/traits/json/color/HairColor.json');
const bodyColors = require('../punk/traits/json/color/BodyColor.json');

export function generatePunk(scene){
    console.log("PunkFactory: addPunk");
    generateElem(scene, bodys[0], bodyColors[1].hex);
    generateElem(scene, beards[0], hairColors[1].hex);

    // generateElem(scene, eyes[0]);

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

