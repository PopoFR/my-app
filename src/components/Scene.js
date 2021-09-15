import React, { useEffect, useState} from "react";
import * as Pixel from './PixelFactory.js';

import * as THREE from "three";
import TWEEN from '@tweenjs/tween.js'


import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js'

import * as PunkFactory from "./punk/PunkFactory.js";
import * as Export from "../components/Export"; 
import Menu from './Menu'
import {TraitsGenerator} from "./punk/traits/TraitsGenerator.js"
let 
container,
scene, 
camera, 
lights,
controls, 
renderer,
group;

const Scene = () => {

    const [loading, setLoading] = useState(false);
    const [hair, setHair] = useState(0);
    const [actualTraits, setActualTraits] = useState([]);

    function handleState(state){
        setLoading(state);
    }

    useEffect(()=>{
        console.log("Scene: useEffect");
        init();
        return () => {
        }
    },[]);

    function init(){
        TraitsGenerator();
        createScene();
        createCamera();
        createLights();
        createPunk();
        createControls();
        createPanel();
        createRenderer();
        animate();
        // rotateScene();
        // Pixel.animateScene(scene)
        // exportPunk();
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
        PunkFactory.generatePunk(scene, setActualTraits);
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
    
    async function exportPunk(){
        setLoading(true);
        const name = 'P3nkD_xxxx';
        Export.doExport(scene, renderer, name)
            .then(() => setLoading(false));
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

    function rotateScene(){
        console.log("rotateScene")
    }

    function toogleHair(e, type){
        console.log(type)
        setHair(e)
    }

    function animate() {
        // var axis = new THREE.Vector3( 0, 1, 0 );
        // scene.rotateOnAxis(axis, 0.01);
 
        requestAnimationFrame( animate );
        controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
        TWEEN.update();
        render();
    }

    return (
        <>
            <div>
                My Traits: 
                {actualTraits.forEach((item)=>{
                    <span>{item.id}</span>
                })}
            </div>
            <div>
                <Menu toogleHair = {toogleHair}/>
                my hair : {hair}
            </div>
            <div>
                {loading ? <div className="loader"/> : <button type="button" onClick={exportPunk}>export</button>}
                {loading ? <p>loading</p> : <p>pas loading</p>}
            </div>
        </>
       
    )
}

export default Scene;