import React, { Component } from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as UPNG from 'upng-js';

import beard from './male.png';
import hat from './hat2.png';
import hatb from './hat2b.png';

import t from './t.png';
import tb from './t-back.png';
import cigarette from './components/punk/traits/img/male/accessories/cigarette.png';
import smoke from './image/accessories/smoke.png';
import smoke2 from './image/accessories/smoke2.png';

import waveOgv from './image/accessories/glass/wave.ogv';



//Accessoires
//Glass
import glass01a from './image/accessories/glass/glass_01_a.png';
import glass01b from './image/accessories/glass/glass_01_b.png';



import TWEEN from '@tweenjs/tween.js';
let scene, camera, renderer ;

const base64ToArrayBuffer = function(base64) {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
      bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

const getBase64 = function(str) {
  return str.split(',')[1];
}

const getBuffer = function(img){
  const base64 = getBase64(img);
  const buffer = base64ToArrayBuffer(base64);
  return UPNG.decode(buffer);
}

const initScene = () =>{

  scene = new THREE.Scene();
  scene.name = "punk";
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( 0xffffff, 50);
  // renderer.domElement.addEventListener('click', play, false);

  camera.position.x = 12;
  camera.position.y = -12;
  camera.position.z = 50;

  const controls = new OrbitControls( camera, renderer.domElement );
  controls.target.set( 12, -12, 0 )
  controls.update();
  document.body.appendChild( renderer.domElement );
}

const addPixelBlockToScene = function(name, png, scene, thikness = 1, depth = 0, orientation = ""){

  const group = new THREE.Group();
  
  for (var x = 0; x < png.width; x++){
    for (var y = 0; y < png.height; y++){
      let r = png.data[((y * (png.width * 4)) + (x * 4))];
      let g = png.data[((y * (png.width * 4)) + (x * 4)) + 1];
      let b = png.data[((y * (png.width * 4)) + (x * 4)) + 2];
      let a = png.data[((y * (png.width * 4)) + (x * 4)) + 3];

      if (a !== undefined && a !== 0) {

          // console.log(testStr);
          let geometry = new THREE.BoxGeometry(1, 1, thikness);

          const color = new THREE.Color(`rgb(${r}, ${g}, ${b})`);
          
          const material = new THREE.MeshBasicMaterial( { color: color} );
          // console.log(`${r}-${g}-${b}`)
          var cube = new THREE.Mesh(geometry, material);

          addWideFrame(cube);
          cube.position.set(x,-y,depth);

          if (r === 226 && g === 91 && b === 38 ){
            cube.name = "pop"
          }

          group.add(cube);
      }
    }
  }
  
  if (orientation === "h")
    group.rotation.y +=  75; 

  var model = new THREE.Object3D();
  model.add(group);   
  model.name = name;
  scene.add(model);
}

const renderize = () => {
  requestAnimationFrame(renderize);
  TWEEN.update()
  renderer.render(scene, camera);
};

const addWideFrame = (object) =>{
  var geo = new THREE.EdgesGeometry( object.geometry );
  var mat = new THREE.LineBasicMaterial( { 
    color: 0x000000, 
    linewidth: 4,
    transparent: true,
    opacity: 1,
    name: "smoka"
  } );

  var wireframe = new THREE.LineSegments( geo, mat );
  wireframe.name = "test";
  wireframe.renderOrder = 1; // make sure wireframes are rendered 2nd
  object.add(wireframe);
}

//todo utiliser methode addpixel et y passer une texture ?
const addSmoke = (name, png, scene, {r, g, b, a}, {x, y, z}) => {

  const group = new THREE.Group();
  
  for (var x = 0; x < png.width; x++){
    for (var y = 0; y < png.height; y++){
      let a = png.data[((y * (png.width * 4)) + (x * 4)) + 3];

      if (a !== undefined && a !== 0) {
        
          let geometry = new THREE.BoxGeometry(1, 1, 1);

          const color = new THREE.Color(`rgb(211, 211, 211)`);
          const material = new THREE.MeshBasicMaterial( { 
            color: color,
            transparent: true,
            opacity: 1
          } );
          var cube = new THREE.Mesh(geometry, material);
          addWideFrame(cube);
          cube.position.set(x, -y, z);
          group.add(cube);
      }
    }
  }

  group.rotation.y +=  75; 
  
  var model = new THREE.Object3D();
  model.add(group);   
  model.name = name;
  scene.add(model);
}
const reset = (object, material, wideframe) => {
  console.log("Start");
  
  object.position.setY(0);
  material.opacity = 1;
  wideframe.opacity = 1;

  var tweenSmoke = new TWEEN.Tween( material ).to( { opacity: 0 }, 3000 ).start();
  var tweenWidframe =  new TWEEN.Tween(wideframe).to( { opacity: 0 }, 3000 ).start();
  var tween = new TWEEN.Tween(object.position).to(object.position.clone().setY(3), 3000).start()

  tween.update();
  tweenSmoke.update();
  tweenWidframe.update();
}

const animateSmoke = (scene) => {
  var object = scene.getObjectByName("smoke2");

  var material = object.children[0].children[0].clone().material;
  var wide = scene.getObjectByName("test").clone().material;

  // setInterval(()=>{

  // }, 
  // 5000);
  
  var tweenSmoke = new TWEEN.Tween( material ).to( { opacity: 0 }, 3000 ).start();
  var tweenWidframe =  new TWEEN.Tween(wide).to( { opacity: 0 }, 3000 ).start();
  var tween = new TWEEN.Tween(object.position).to(object.position.clone().setY(3), 3000).onComplete(()=>{
    setInterval( ()=>{
      reset(object, material, wide)
    }, 3000);
 
  })

  tween.update();
  tweenSmoke.update();
  tweenWidframe.update();


  const color1 = new THREE.Color("rgb(226, 91, 28)");
  const color2 = new THREE.Color("rgb(255, 187, 0)");
  var pop = scene.getObjectByName("pop");
  popping(pop.material.color, color1, color2);

  

}

const popping = (materialColor, color1, color2) =>{
  var t;
  var isColored = false;


  setInterval(()=>{
    if (isColored){
      t = new TWEEN.Tween(materialColor).to(color1, 1000);
      isColored = false;
    }
    else{
      t = new TWEEN.Tween(materialColor).to(color2, 1000);
      isColored = true;
    }
    
  t.easing(TWEEN.Easing.Quartic.In).start();
  t.update();

  },2000)




}


class App extends Component {

  componentDidMount() {

    initScene();

    const hatBuffer = getBuffer(hat);
    const beardBuffer = getBuffer(beard);
    const tBuffer = getBuffer(t);
    const tbBuffer = getBuffer(tb);
    const hatbBuffer = getBuffer(hatb);
    const cigaretteBuffer = getBuffer(cigarette);
    const smokeBuffer = getBuffer(smoke);
    const smoke2Buffer = getBuffer(smoke2);

    const glass01aBuffer = getBuffer(glass01a);
    const glass01bBuffer = getBuffer(glass01b);


    addPixelBlockToScene("glassA", glass01aBuffer, scene, 1, 2);

    addPixelBlockToScene("face", tBuffer, scene,1,1);
    addPixelBlockToScene("faceback", tbBuffer, scene, 1, 0);

    addPixelBlockToScene("hat", hatBuffer, scene, 2, 1);
    addPixelBlockToScene("hatback", hatbBuffer, scene, 2, 0);
    
    addPixelBlockToScene("beard", beardBuffer, scene, 1, 2);

    addPixelBlockToScene("cigarette", cigaretteBuffer, scene, 1, -2, "h");
    addSmoke("smoke", smokeBuffer, scene, {r: 211, g: 211, b: 211}, {x: 0, y: 0, z: -2})
    addSmoke("smoke2", smoke2Buffer, scene, {r: 211, g: 211, b: 211}, {x: 0, y: 0, z: -2})

    animateSmoke(scene);
    renderize();
  }



  render() {
    return (
      <div />
    )
  }
}

export default App;
