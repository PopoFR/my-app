
import * as Pixel from '../Pixel.js';
import * as Face from './face/Face.js';

import * as Constants from './constants.js'


export function generatePunk(scene){
    console.log("PunkFactory: addPunk");

    Face.generateBody(scene, Constants.alien_male_face, Constants.alien_male_back);

    // Face.generateEye(scene, Constants.eyes01);

    Face.generateGlass(scene, Constants.glass01_a, Constants.glass01_b);
    

    // Face.generateHat(scene);

}


