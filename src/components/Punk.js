import {generateTrait, getFixedTraits, getRandomTraits} from './Traits';
import * as THREE from "three";

export function generatePunk(name){
    var punk = new THREE.Group();

    var traits = getFixedTraits();
    var randomTraits = getRandomTraits();

    var pixels = [{x:0, y:0, z:0}];
    var colors = [{r:0, g:0, b:0}];

    traits.forEach(trait => {
        punk.add(generateTrait(trait, pixels, colors));
    })

    console.log(colors)
    punk.name = name;
    return punk;
}
