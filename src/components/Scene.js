import React, { useEffect, useState} from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import TWEEN, { update } from '@tweenjs/tween.js';



import * as PunkFactory from "./punk/PunkFactory.js";

function Scene() {
    
    let 
    scene, 
    camera, 
    renderer, 
    controls,
    container;

    useEffect(()=>{
        console.log("Scene: useEffect");

        init();

        return () => {
            // Callback to cleanup three js, cancel animationFrame, etc
        }
    },[]);


    function init(){
        container = document.querySelector("#scene-container");
        scene = new THREE.Scene();
        scene.name = "P3nkD";

        createCamera();
        createLights();
        createPunk();
        createControls();
        createRenderer();

        renderer.setAnimationLoop(() => {
            update();
            render();
        });

    }

    function createCamera(){
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        camera.position.x = 12;
        camera.position.y = -12;
        camera.position.z = 50;
    }

    function createLights(){

    }

    function createPunk(){
        PunkFactory.generatePunk(scene);
    }

    function createControls(){
        controls = new OrbitControls(camera, container);
        controls.target.set( 12, -12, 0 )
        controls.update();
    }

    function createRenderer(){
        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor( 0xffffff, 50);

        container.appendChild(renderer.domElement);
    }

    function update(){

    }

    function render(){
         renderer.render(scene, camera);
        // renderer.domElement.addEventListener('click', play, false);
    }
    function animate(){
        requestAnimationFrame(animate);
        TWEEN.update();
        renderer.render(scene, camera);
    }

    return (
        <div/>
    )
}

export default Scene;