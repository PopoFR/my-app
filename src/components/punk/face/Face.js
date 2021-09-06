
//TODO faire en sore qu'on ai une tableau "structure", pour les element en plusieurs morceau, ainsi qu'un tableau "sfx" pour les animation et autre.

import * as Pixel from '../../Pixel.js';

export function generateBody(scene, face, back){
    console.log("Face: generateFace");
    generateElem(scene, face);
    generateElem(scene, back);
}

export function generateHat(scene, face, back){
    console.log("Face: generateHat");
    generateElem(scene, face);
    generateElem(scene, back);
}

export function generateGlass(scene, elemA, elemB){
    console.log("Face: generateGlass");
    generateElem(scene, elemA);
    generateElem(scene, elemB);
}

export function generateEye(scene, elem){
    console.log("Face: generateEye");
    generateElem(scene, elem);
}

function generateElem(scene, elem){
    let elemImg = Pixel.getBuffer(elem.src);
    Pixel.addPixelBlockToScene(elem.name, elemImg, scene, elem.thikness, elem.z);
}

