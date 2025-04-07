import * as THREE from "three";
import * as UPNG from 'upng-js';

export function addPixelBlockToScene(pixels, colors, element) {
  let group = new THREE.Group();
  group.name = element.name;

  let img = getBuffer(require('' + element.src));
  var geometry = new THREE.BoxGeometry(1, 1, element.thikness);

  //parcours des pixels de l'image (gauche a droite, haut en bas)
  for (let x = 0; x < img.width; x++) {
    for (let y = 0; y < img.height; y++) {
      let r = img.data[((y * (img.width * 4)) + (x * 4))];
      let g = img.data[((y * (img.width * 4)) + (x * 4)) + 1];
      let b = img.data[((y * (img.width * 4)) + (x * 4)) + 2];
      let a = img.data[((y * (img.width * 4)) + (x * 4)) + 3];

      //si le pixel n'est pas transparant (vide)
      if (a !== undefined && a !== 0) {

        //pour centrage
        let newX = x - 11;
        let newY = -y + 13;
        let z = element.z;

        //si le pixel n'existe pas on le crée (evite les chevauchements de texture)
        if (!pixelExist(pixels, newX, newY, z)) {

          //si une couleur perso existe et que le pixels n'est pas noir, on customise la couleur
          let color = (element.color !== undefined && r !== 0 && g !== 0 && b !== 0) ? new THREE.Color(element.color) : new THREE.Color(`rgb(${r}, ${g}, ${b})`);

          //tableau de couleurs
          if (!colors.some(col => col.r === r && col.g === g && col.b === b)) {
            colors.push({ r, g, b });
          }

          if(element.name == "smoke"){
          }

          var material = new THREE.MeshStandardMaterial({ 
            color: color, 
            metalness: 0, 
            roughness: 1,
          });

          //pour lunette 
          if (element.isMerged) {
            material = new THREE.MeshBasicMaterial({ color: color, reflectivity: 90});
            material.transparent = true;
            material.opacity = element.opacity;
            
          }
          
          if(element.name == "puff"){
            geometry = new THREE.BoxGeometry(0.99, 0.99, 0.99);
          }

          if (element.isNoseDrool) {
            geometry = new THREE.BoxGeometry(0.5, 0.85, 0.005);
          }

          if (element.isDrool) {
            geometry = new THREE.BoxGeometry(0.75, 1, 0.005);
          }


          let cube = new THREE.Mesh(geometry, material);
          if (!element.isMerged) {
            cube.castShadow = true;
            cube.receiveShadow = true;
          }
     
          pixels.push({ newX, newY, z })
          cube.position.set(newX, newY, z);
          group.add(cube);
        }
      }
    }
  }

  //a decaller au dessus car tableau pixel faux
  if (element.customX !== 0 && element.customX !== undefined){
    group.translateX(element.customX);
  }

  return group;
}


function getBuffer(img) {
  const base64 = getBase64(img);
  const buffer = base64ToArrayBuffer(base64);
  return UPNG.decode(buffer);
}

function pixelExist(pixels, x, y, z) {
  return pixels.some(pixel => pixel.x == x && pixel.y == y && pixel.z == z);
}

function getBase64(str) {
  return str.default.split(',')[1];
}

const base64ToArrayBuffer = function (base64) {
  let binary_string = window.atob(base64);
  let len = binary_string.length;
  let bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++)
    bytes[i] = binary_string.charCodeAt(i);

  return bytes.buffer;
}