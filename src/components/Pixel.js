import * as THREE from "three";
import * as UPNG from 'upng-js';


export function addPixelBlockToScene(name, png, scene, thikness = 1, z = 0, orientation = null, wideFrame = true){
  console.log("Pixel: addPixelBlockToScene");
  console.log(`Pixel: addPixelBlockToScene(${name})`);

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

          // console.log(testStr);
          const geometry = new THREE.BoxGeometry(1, 1, thikness);
          const color = new THREE.Color(`rgb(${r}, ${g}, ${b})`);
          const material = new THREE.MeshBasicMaterial( { color: color} );

          let cube = new THREE.Mesh(geometry, material);
          cube.position.set(x, -y, z);

          if (wideFrame)
              addWideFrame(cube);

          group.add(cube);
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
}   

export function getBuffer(img){
  console.log("Pixel: getBuffer");

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
  wireframe.name = "test";
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