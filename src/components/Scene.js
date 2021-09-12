import React, { useEffect, useState} from "react";

import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js'

import * as PunkFactory from "./punk/PunkFactory.js";
import * as Export from "../components/Export"; 

function Scene() {
    let 
    container,
    scene, 
    camera, 
    lights,
    controls, 
    renderer;

    useEffect(()=>{
        console.log("Scene: useEffect");
        init();
        return () => {
            // Callback to cleanup three js, cancel animationFrame, etc
        }
    },[]);

    function init(){
        createScene();
        createCamera();
        createLights();
        createPunk();
        createControls();
        createPanel();
        createRenderer();
        // exportPunk(); //doit attendre que le render client soit terminé

        renderer.setAnimationLoop(() => {
            update();
            render();
        });
    }

    function createScene(){
        container = document.querySelector("#scene-container");
        scene = new THREE.Scene();
        scene.name = "P3nkD";
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

    function createPanel(){
        const gui = new GUI({ width: 310 })
        const cubeFolder = gui.addFolder('Customize')
        var obj =  scene.getObjectByName("glass01");
    }
    
    function createRenderer(){
        renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});
        renderer.domElement.id = 'p3nkd-canvas';
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor( 0xffffff, 50);

        container.appendChild(renderer.domElement);
    }
    
    async function exportPunk(e){
        e.preventDefault();
        const name = 'P3nkD_xxxx';
        Export.doExport(scene, renderer, name);
    }

    function update(){
    }

    function render(){
        renderer.render(scene, camera);
    }

    // function setOpacity(obj, opacity) {
    //     obj.traverse(child => {
    //       if (child instanceof THREE.Mesh) {
    //         child.material.opacity = opacity;
    //       }
    //     });
    // }

    return (
        <div>
            <button onClick={exportPunk}>export</button>
        </div>
       
    )
}

export default Scene;