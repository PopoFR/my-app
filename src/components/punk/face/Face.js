
//TODO faire en sore qu'on ai une tableau "structure", pour les element en plusieurs morceau, ainsi qu'un tableau "sfx" pour les animation et autre.

import * as Pixel from '../../Pixel.js';

export function generateBody(scene, obj){
    console.log("Face: generateFace");
    generateElem(scene, obj);
}

export function generateHat(scene, obj){
    console.log("Face: generateHat");
    generateElem(scene, obj);
}

export function generateGlass(scene, obj){
    console.log("Face: generateGlass");
    generateElem(scene, obj);
}

export function generateEye(scene, obj){
    console.log("Face: generateEye");
    generateElem(scene, obj);
}

export function generateMouth(scene, obj){
    console.log("Face: generateMouth");
    generateElem(scene, obj);
}


function generateElem(scene, obj){
    obj.elems.forEach(element => {
        let elemImg = Pixel.getBuffer(element.src);
        Pixel.addPixelBlockToScene(element.name, elemImg, scene, element.thikness, element.z);
    });
}
