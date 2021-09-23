import {generateTrait, getFixedTraits, getRandomTraits} from './Traits';
import * as THREE from "three";

export function getPunk(name){
    var traits = getFixedTraits();
    var punk = generatePunk(traits);
    
    punk.name = name;

    return punk;
}


export function getRandomPunk(){
    var name = "random punk";
    var randomTraits = getRandomTraits();
    var punk = generatePunk(randomTraits);

    punk.name = name;

    return punk;
}

function generatePunk(traits){
    var punk = new THREE.Group();
    var pixels = [{x:0, y:0, z:0}];
    var colors = [{r:0, g:0, b:0}];

    traits.forEach(trait => {
        punk.add(generateTrait(trait, pixels, colors));
    })

    return punk;
}

