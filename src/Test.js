import React, { useEffect, useState } from "react";
import { Intro } from "./Intro";
import * as THREE from "three";

import waveOgv from './image/accessories/glass/wave.ogv';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

let container;

			let camera, scene, renderer;
			let video, texture, mesh;
			let geometry;

function init(){
  container = document.createElement( 'div' );
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 500;

  scene = new THREE.Scene();

  const light = new THREE.DirectionalLight( 0xffffff );
  light.position.set( 0.5, 1, 1 ).normalize();
  scene.add( light );

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.setClearColor( 0xffffff, 50);
  renderer.domElement.addEventListener('click', onClick, false);

  const controls = new OrbitControls( camera, renderer.domElement );
  controls.target.set( 12, -12, 0 )
  controls.update();

  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2()

  container.appendChild( renderer.domElement );

  video = document.createElement("video");
  video.src = waveOgv;
  video.crossOrigin = "Anonymous";
  video.loop = true;  
  video.play();

  texture = new THREE.VideoTexture( video );
  geometry = new THREE.BoxGeometry( 2,1, 1 );
  const parameters = { color: 0xffffff, map: texture };

  var materials = new THREE.MeshLambertMaterial( parameters );

  mesh = new THREE.Mesh( geometry, materials );

  mesh.scale.x = mesh.scale.y = mesh.scale.z = 1;

  scene.add( mesh );
}

var raycaster, mouse;

function onClick( event ) {
  console.log(mouse.x)
	event.preventDefault();

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	raycaster.setFromCamera( mouse, camera );

	var intersects = raycaster.intersectObjects( scene.children, true );

	if ( intersects.length > 0 ) {

		console.log( 'Intersection:', intersects[ 0 ] );

	}
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function play(){
  init();
  animate();
}

export default function Test() {
  return (
    <> <button onClick = {play}>dfdffff</button></>
  );
}
