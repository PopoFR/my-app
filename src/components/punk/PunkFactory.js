
import * as Pixel from '../Pixel.js';
import * as Face from './face/Face.js';

import * as Constants from './constants.js'


export function generatePunk(scene){
    console.log("PunkFactory: addPunk");

    // Face.generateBody(scene, Constants.alien_male_face, Constants.alien_male_back);
    Face.generateBody(scene, Constants.alien_male);
    // Face.generateEye(scene, Constants.eyes01);

    Face.generateGlass(scene, Constants.glass01);
    Face.generateHat(scene, Constants.hat01);
    Face.generateMouth(scene, Constants.beard01);


    // Face.generateHat(scene);

}


