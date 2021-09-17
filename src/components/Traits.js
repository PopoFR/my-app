import {addPixelBlockToScene, getBuffer} from './PixelFactory';

export default class Trait {
    constructor(scene, pixels, obj, color) {
        this.name = obj.name;
        this.elements = generateTrait(scene, pixels, obj, color);
    }
}

function generateTrait(scene, pixels, obj, color = undefined){

    var trait = [{}];

    obj.elems.forEach(element => {
        //ne fonctionne pas sans le string vide.
        let img = require(''+ element.src);
        let elemImg = getBuffer(img);
        trait.push(addPixelBlockToScene(pixels, element.name, elemImg, scene, color, element.thikness, element.z, element.rotation)); 
    });
    
    return trait;
}

