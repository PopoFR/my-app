
//TODO faire en sore qu'on ai une tableau "structure", pour les element en plusieurs morceau, ainsi qu'un tableau "sfx" pour les animation et autre.

export const alien_male_face =  {name: 'alienMaleFace', src: require('./img/body/alien_male_face.png'), thikness: 1, z: 1};
export const alien_male_back =  {name: 'alienMaleBack', src: require('./img/body/alien_male_back.png'), thikness: 1, z: 0} 

export const eyes01 =  {name: 'eye01', src: require('./img/eye/eye01.png'), thikness: 1, z: 1} 

export const glass01_a =  {name: 'glass01_a', src: require('./img/eye/glass01_a.png'), thikness: 2, z: 1} 
export const glass01_b =  {name: 'glass01_b', src: require('./img/eye/glass01_b.png'), thikness: 2, z: 1} 



export const alien_male =  {
    name: 'alienMale', 
    elems: [
        {name: "alienMaleFace", src: require('./img/body/alien_male_face.png'), thikness: 1, z: 1},
        {name: "alienMaleFace", src: require('./img/body/alien_male_back.png'), thikness: 1, z: 0}
    ]
} 

export const glass01 =  {
    name: 'glass01', 
    elems: [
        {name: "glass01_a", src: require('./img/eye/glass01_a.png'), thikness: 1, z: 2}, 
        {name: "glass01_b", src: require('./img/eye/glass01_b.png'), thikness: 1, z: 2} 
    ]
} 

export const hat01 =  {
    name: 'hat01', 
    elems: [
        {name: "hat_cop", src: require('./img/hat/hat_cop.png'), thikness: 3, z: 2}, 
        {name: "hat_cop_back", src: require('./img/hat/hat_cop_back.png'), thikness: 2, z: 0} 
    ]
} 

export const beard01 =  {
    name: 'beard01', 
    elems: [
        {name: "beard01", src: require('./img/mouth/beard01.png'), thikness: 1, z: 2}, 
    ]
} 

export const smoke =  {
    name: 'smoke', 
    elems: [
        {name: "smoke", src: require('./img/sfx/smoke/smoke.png'), thikness: 1, z: 2}, 
        {name: "smoke2", src: require('./img/sfx/smoke/smoke2.png'), thikness: 1, z: 2}

    ]
} 


// import alien_male_back from '../img/body/alien_male_back.png';

// import hat_cop from '../img/hat/hat_cop.png';
// import hat_cop_back from '../img/hat/hat_cop_back.png';

// import eye01 from '../img/eye/eye01.png';
