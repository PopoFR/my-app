import {generateTrait, getFixedTraits, getRandomTraits} from './Traits';
import * as THREE from "three";

export function generatePunk(name){
    var punk = new THREE.Group();
    var traits = getFixedTraits();
    var randomTraits = getRandomTraits();
    var pixels = [{}];

    traits.forEach(trait => {
        punk.add(generateTrait(trait, pixels));
    })

    punk.name = name;
    return punk;
}
