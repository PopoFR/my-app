import {generateTrait, getRandomTraits, Trait} from './Traits';
import * as THREE from "three";

export function generatePunk(scene, name){
    var punk = new THREE.Group();
    punk.name = name;

    var traits = getRandomTraits();

    var pixels = [{}];

    traits.forEach(trait => {
        punk.add(generateTrait(scene, trait, pixels));
    })

    scene.add(punk);
    return punk;
}


export function generatePunk21(scene, name, traitsObj){
    var punk = new THREE.Group();
    punk.name = name;

    var traits = [];
    traitsObj.forEach(obj => traits.push(new Trait(obj)));

    var pixels = [{}];

    traits.forEach(trait => {
        punk.add(generateTrait(scene, trait, pixels));
    })

    scene.add(punk);
    return punk;
}
