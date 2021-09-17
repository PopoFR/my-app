import React, { useEffect, useState} from "react";
import { AmbientLight } from 'three';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js'
import * as Export from "../components/Export"; 
import {TraitsGenerator} from "./punk/traits/TraitsGenerator.js"
import Punk, { getRandomPunk } from "./Punk.js";

let 
container,
camera, 
lights,
controls, 
renderer,
group;

const Scene = () => {

    const [scene, setScene] = useState(new THREE.Scene());
    const [pixels, setPixels] = useState([]);
    const [punk, setPunk] = useState({name: "", traits: []});
    const [isAnimate, setIsAnimate] = useState(true);
    const [traits, setTraits] = useState([{}]);

    useEffect(()=>{
        console.log("Scene: useEffect");
        init();
        return () => {
        }
    },[]);

    function init(){
        console.log("init")
        TraitsGenerator();
        createScene();
        createCamera();
        createLights();
        createPunk();
        createControls();
        createPanel();
        createRenderer();
        animate();

        console.log(punk.traits)
        // exportPunk();
        // render();
    }

    function createScene(){
        container = document.querySelector("#scene-container");
        scene.name = "P3nkD";
    }

    function createCamera(){
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
        camera.position.x = 0;
        camera.position.y = -12;
        camera.position.z = 50;
    }

    function createLights(){
        // const light = new AmbientLight(
        //     'white', // bright sky color
        //     'darkslategrey', // dim ground color
        //     5);

        // light.position.set(10, 10, 10);

        // return light;
    }

    function createPunk(){
        var p = getRandomPunk(scene, pixels, "punk")


        setPunk({name: p.name, traits: [...p.traits]});

    }

    function createControls(){
        controls = new OrbitControls(camera, container);
        controls.target.set( 0, -12, 0 )
        controls.update();
    }

    function createPanel(){
        const gui = new GUI({ width: 310 })
        const cubeFolder = gui.addFolder('Customize')
        var obj =  scene.getObjectByName("glass01");
    }
    
    function createRenderer(){
        renderer = new THREE.WebGLRenderer();
        renderer.domElement.id = 'p3nkd-canvas';
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( 600, 600 );
        renderer.setClearColor( 0xfafafa  , 1 ); 
                container.appendChild(renderer.domElement);
    }
    
    async function exportPunk(e){
        e.preventDefault();
        setIsAnimate(false);
        scene.rotation.x = 0;
        scene.rotation.y = 0;
        scene.rotation.z = 0;
        render();
        const name = 'P3nkD_xxxx';
        Export.doExport(scene, renderer, name, animatedRender)
            .then(() => console.log("end"));
    }

    function animatedRender(){
        scene.rotation.y += Math.PI / 180;
        render();
    }
    
    function render(){
        renderer.render(scene, camera);
    }

    function animate() {
        if (isAnimate)
            requestAnimationFrame(animate);
        render(); 
    }
    
    function tooglePunk(e){
        e.preventDefault()
        scene.clear();
        scene.children.slice().forEach(obj => scene.remove(obj))

        createPunk();

        // exportPunk();
        console.log(scene)
    }

    function tooglePunk2(e){
        e.preventDefault()
 
    //    scene.children.slice().forEach(obj => scene.remove(obj))

       scene.clear()
       render();
       console.log(scene)
    }

    function addPunk(){
        createPunk();
        console.log(scene)
        render();
    }



    return (
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div id="scene-container"></div>
                <div>
                <button type="button" onClick={exportPunk}>EXPORT</button>
                <button type="button" onClick={addPunk}>addPunk</button>
                    <button type="button" onClick={tooglePunk2}>del punk</button>
                </div>
                <div>
                    <div>
                        Punk: {punk.name}
                    </div>
                    <div>
                        <div>
                            My Traits: 
                        </div>
                        <div>
                            {punk && punk.traits.map(t => 
                                <p>{t.name}</p>
                            )}
                        </div>
                </div> 
            </div>
        {/* <div>
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
        </div> */}
    </div>

    )
}

export default Scene;