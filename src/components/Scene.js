import React, { useEffect, useState} from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import TWEEN from '@tweenjs/tween.js';

import * as PunkFactory from "./punk/PunkFactory.js";

function Scene() {
    
    let scene, camera, renderer, controls;

    useEffect(()=>{
        console.log("Scene: useEffect");

        init();
        addPunk();
        animate();

        return () => {
            // Callback to cleanup three js, cancel animationFrame, etc
        }
    },[]);


    function init(){
        console.log("Scene: init");

        scene = new THREE.Scene();
        scene.name = "P3nkD";

        renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor( 0xffffff, 50);
        // renderer.domElement.addEventListener('click', play, false);

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        camera.position.x = 12;
        camera.position.y = -12;
        camera.position.z = 50;

        controls = new OrbitControls( camera, renderer.domElement );
        controls.target.set( 12, -12, 0 )
        controls.update();

        document.body.appendChild(renderer.domElement);
    }

    function addPunk(){
        console.log("Scene: addPunk");

        PunkFactory.generatePunk(scene);
    }

    function animate(){
        console.log("Scene: render");

        requestAnimationFrame(animate);
        TWEEN.update();
        renderer.render(scene, camera);
    }

    return (
        <div/>
    )
}

export default Scene;