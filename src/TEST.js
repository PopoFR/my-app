

// import { Trait } from './components/PunkFactory';
// import { Element } from './components/Traits';


// function testColor(){
//     const colors = require('./punk/traits/json/Colors.json');
// }

// function testTraits() {
//     console.log(`testRessourcesTraits: start...`)

//     const hairs = require('./punk/traits/json/Hair.json');
//     const bodys = require('./punk/traits/json/Body.json');
//     const eyes = require('./punk/traits/json/Eye.json');
//     const noses = require('./punk/traits/json/Nose.json');
//     const beards = require('./punk/traits/json/Beard.json');
//     const hats = require('./punk/traits/json/Hat.json');
//     const eyebrows = require('./punk/traits/json/EyeBrow.json');
//     const glasses = require('./punk/traits/json/Glasses.json');
//     const accessories = require('./punk/traits/json/Accessories.json');

//     //ne pas inclure color
//     const traits = [
//         hairs,
//         bodys,
//         eyes,
//         noses,
//         mouths,
//         beards,
//         hats,
//         eyebrows,
//         glasses,
//         accessories
//     ]

//     let errors = [];

//     //pour chaque trait de la liste trait, verfie que tout les elements du trait, se genere bien.
//     traits.forEach(trait => {
//         try {
//             new Trait(trait);
//             var varname = Object.keys(trait)[0];

//             trait.elems.forEach(element=>{
//                 new Element(element);//génération de l'element 3d
//             });

//         } catch (error) {
//             // console.error(`Ressource ${varname} indisponible`);
//             console.error('error');
//             errors.push(varname);
//         }
//     });
    
//     console.log(`testRessourcesTraits: il y a eu ${errors.length}`)

// }