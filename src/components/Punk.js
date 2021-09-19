import {generateTrait, getRandomTraits} from './Traits';

export default class Punk{
    constructor(name, traits){
        this.name = name;
        this.traits = traits;
    }
}


export function getRandomPunk(scene, name){
    var punk = new Punk(name, getRandomTraits());
    generatePunk(scene, punk);
    return punk;
}

export function generatePunk(scene, punk){
    let pixels = [{}];
    punk.traits.forEach(trait=>{
        console.log(trait)
        generateTrait(scene, pixels, trait);
    })
}