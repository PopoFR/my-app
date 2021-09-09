import * as THREE from "three";
import * as UPNG from 'upng-js';
import TWEEN from '@tweenjs/tween.js';


export function addPixelBlockToScene(pixels, name, png, scene, customColor, thikness = 1, z = 0, orientation = null, wideFrame = true){
  console.log(`Pixel: addPixelBlockToScene(${customColor})`);

  const group = new THREE.Group();
  
  // loop tous les pixels du png, (de gauche a droite et haut en bas), 
  // afin de générer des blocks de la couleur des pixels non transparents.
  for (var x = 0; x < png.width; x++){
    for (var y = 0; y < png.height; y++){
      let r = png.data[((y * (png.width * 4)) + (x * 4))];
      let g = png.data[((y * (png.width * 4)) + (x * 4)) + 1];
      let b = png.data[((y * (png.width * 4)) + (x * 4)) + 2];
      let a = png.data[((y * (png.width * 4)) + (x * 4)) + 3];

      if (a !== undefined && a !== 0) {

          const geometry = new THREE.BoxGeometry(1, 1, thikness);

          //si une couleur personnalisé est attribué et que le pixel n'est pas noir (bordure), on set la couleur perso.
          var color = (customColor !== undefined && r !== 0) ? new THREE.Color(customColor) : new THREE.Color(`rgb(${r}, ${g}, ${b})`);

          const material = new THREE.MeshBasicMaterial( { color: color} );

          let cube = new THREE.Mesh(geometry, material);
          cube.position.set(x, -y, z);

          //deasactivé car wideframe.opacity = 0
          if (wideFrame)
              addWideFrame(cube);

          // console.log(`x: ${x}   y: ${y}`)

          //on s'assure qu'aucun pixel ne se chevauche.
          //Si 2 pixel on un x&&y identique ou un xz ou un yz
          if (!pixels.some(elem => elem.x  == x && elem.y == y && elem.z == z)){
            pixels.push({x, y, z});
            group.add(cube);
          }
      } 
    }
  }
  
  if (orientation !== null){
      group.rotation.x +=  orientation.x; 
      group.rotation.y += orientation.y; 
      group.rotation.z +=  orientation.z; 
  }
  
  //Pour nanimg de l'objet entier
  let model = new THREE.Object3D();
  model.name = name;
  model.add(group);   
  scene.add(model);

  return pixels;
}   


export function getBuffer(img){
  const base64 = getBase64(img);
  const buffer = base64ToArrayBuffer(base64);
  return UPNG.decode(buffer);
}

const addWideFrame = (object) =>{
  var geo = new THREE.EdgesGeometry( object.geometry );
  var mat = new THREE.LineBasicMaterial( { 
    color: 0x000000, 
    linewidth: 4,
    transparent: true,
    opacity: 0,
    name: "smoka"
  } );

  var wireframe = new THREE.LineSegments( geo, mat );
  wireframe.renderOrder = 1; // make sure wireframes are rendered 2nd
  object.add(wireframe);
}

const getBase64 = function(str) {
  return str.default.split(',')[1];
}

const base64ToArrayBuffer = function(base64) {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

export const animateHat = (scene) => {
  var object = scene.getObjectByName("hat_helice2");
  console.log(object);
  // var material = object.children[0].children[0].clone().material;
  // var wide = scene.getObjectByName("hat_helice3").clone().material;

  // setInterval(()=>{

  // }, 
  // 5000);
  
  // var tweenSmoke = new TWEEN.Tween( material ).to( { opacity: 0 }, 3000 ).start();
  // var tweenWidframe =  new TWEEN.Tween(wide).to( { opacity: 0 }, 3000 ).start();

  
  var tween = new TWEEN.Tween(object.rotation)
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
