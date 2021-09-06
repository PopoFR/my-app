
//TODO faire en sore qu'on ai une tableau "structure", pour les element en plusieurs morceau, ainsi qu'un tableau "sfx" pour les animation et autre.

export const alien_male_face =  {name: 'alienMaleFace', src: require('./img/body/alien_male_face.png'), thikness: 1, z: 1};
export const alien_male_back =  {name: 'alienMaleBack', src: require('./img/body/alien_male_back.png'), thikness: 1, z: 0} 

export const eyes01 =  {name: 'eye01', src: require('./img/eye/eye01.png'), thikness: 1, z: 1} 

export const glass01_a =  {name: 'glass01_a', src: require('./img/eye/glass01_a.png'), thikness: 2, z: 1} 
export const glass01_b =  {name: 'glass01_b', src: require('./img/eye/glass01_b.png'), thikness: 2, z: 1} 


export const alien_male =  {
    name: 'alienMale', 
    elem: [
        {name: "alienMaleFace", src: require('./img/body/alien_male_face.png'), thikness: 1, z: 1},
        {name: "alienMaleFace", src: require('./img/body/alien_male_face.png'), thikness: 1, z: 0}
    ]
} 



// import alien_male_back from '../img/body/alien_male_back.png';

// import hat_cop from '../img/hat/hat_cop.png';
// import hat_cop_back from '../img/hat/hat_cop_back.png';

// import eye01 from '../img/eye/eye01.png';
