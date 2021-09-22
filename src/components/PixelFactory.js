import * as THREE from "three";
import * as UPNG from 'upng-js';
import TWEEN from '@tweenjs/tween.js';

export function addPixelBlockToScene(pixels, element){
  console.log(`Pixel: addPixelBlockToScene(${element.name})`);

  let group = new THREE.Group();
  group.name = element.name;
  
  let img = getBuffer(require(''+ element.src));

  // loop tous les pixels du png, (de gauche a droite et haut en bas), 
  // afin de générer des blocks de la couleur des pixels non transparents.
  for (let x = 0; x < img.width; x++){
    for (let y = 0; y < img.height; y++){
      let r = img.data[((y * (img.width * 4)) + (x * 4))];
      let g = img.data[((y * (img.width * 4)) + (x * 4)) + 1];
      let b = img.data[((y * (img.width * 4)) + (x * 4)) + 2];
      let a = img.data[((y * (img.width * 4)) + (x * 4)) + 3];

      if (a !== undefined && a !== 0) {

          const geometry = new THREE.BoxGeometry(1, 1, element.thikness);

          console.log(element.thikness)

          //si une couleur personnalisée est attribuée et que le pixel n'est pas noir (bordure), on set la couleur perso.
          let color = (element.color !== undefined && r !== 0) ? new THREE.Color(element.color) : new THREE.Color(`rgb(${r}, ${g}, ${b})`);

          const material = new THREE.MeshBasicMaterial( { 
            color: color
          } );

          let cube = new THREE.Mesh(geometry, material);
          cube.position.set(x-12, -y, element.z);

          //deasactivé car wideframe.opacity = 0
          // if (wideFrame)
          //     addWideFrame(cube);

          // console.log(`x: ${x}   y: ${y}`)

          //on s'assure qu'aucun pixel ne se chevauche.
          //Si 2 pixel on un x&&y identique ou un xz ou un yz
          group.add(cube);
      } 
    }
  }
  
  if (element.rotation !== undefined){
      group.rotation.x +=  element.rotation.x; 
      group.rotation.y += element.rotation.y; 
      group.rotation.z +=  element.rotation.z; 
  }
  
  return group;
}   

export function getBuffer(img){
  const base64 = getBase64(img);
  const buffer = base64ToArrayBuffer(base64);
  return UPNG.decode(buffer);
}

const addWideFrame = (object) =>{
  let geo = new THREE.EdgesGeometry( object.geometry );
  let mat = new THREE.LineBasicMaterial( { 
    color: 0x000000, 
    linewidth: 4,
    transparent: true,
    opacity: 0,
    name: "smoka"
  } );

  let wireframe = new THREE.LineSegments( geo, mat );
  wireframe.renderOrder = 1; // make sure wireframes are rendered 2nd
  object.add(wireframe);
}

const getBase64 = function(str) {
  return str.default.split(',')[1];
}

const base64ToArrayBuffer = function(base64) {
  let binary_string = window.atob(base64);
  let len = binary_string.length;
  let bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

// export const animateScene = (scene) => {
//   const group2 = new THREE.Group();

//   console.log(scene);
//   console.log(group);

//   let axis = new THREE.Vector3( 0, 0.5, 0 );
//   group.rotateOnAxis(axis, Math.PI);
//   group.rotation.y += 0.0002;
// }


export const animateHat = (scene) => {
  let object = scene.getObjectByName("hat_helice2");
  console.log(object);
  // let material = object.children[0].children[0].clone().material;
  // let wide = scene.getObjectByName("hat_helice3").clone().material;

  // setInterval(()=>{

  // }, 
  // 5000);
  
  // let tweenSmoke = new TWEEN.Tween( material ).to( { opacity: 0 }, 3000 ).start();
  // let tweenWidframe =  new TWEEN.Tween(wide).to( { opacity: 0 }, 3000 ).start();

  
  let tween = new TWEEN.Tween(object.rotation)
  .to({ y: "-" + Math.PI/2}, 1000)
  .delay(1000)
  .onComplete(function() {
      if (Math.abs(object.rotation.y)>=2*Math.PI) {
        object.rotation.y = object.rotation.y % (2*Math.PI);
      }
  })
  .start();
tween.repeat(Infinity);
}
