import React, { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as Export from "../components/Export";
import { traitsGenerator } from "./punk/traits/TraitsGenerator.js"
import { getRandomPunk, getPunk, getXPunk} from './PunkFactory';
import {Link} from "react-router-dom";

let
    container,
    scene,
    camera,
    controls,
    renderer;

const Scene = () => {
    const [punk, setPunk] = useState(new THREE.Group());
    const [isLoading, setIsLoading] = useState(false);
    const myRefname= useRef(null);
    const [punks, setPunks] = useState([]);

    useEffect(() => {
        init();
        return () => {
        }
    }, []);

    function init() {
        traitsGenerator();
        createScene();
        createCamera();
        createLights();
        createPunk();
        createControls();
        createRenderer();
        animate();
        setPunks(getXPunk(1))
    }


    function createScene() {
        container = document.querySelector("#scene-container");
        scene = new THREE.Scene();  
        scene.name = "P3nkD";
        scene.background = new THREE.Color().setHSL( 0.6, 0, 1 );
        scene.fog = new THREE.Fog( scene.background, 1, 5000 );
    }

    function createCamera() {
        camera = new THREE.PerspectiveCamera(30, 1, 1, 5000);
        setCameraPosition();
        scene.add(camera);
    }

    function createLights() {
        const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x00000, 0.4);
        hemiLight.color.setHSL( 0.6, 1, 0.6 );
        hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
        hemiLight.position.set( 0, 30, 0 );
        scene.add( hemiLight );

        const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
        dirLight.position.set(0.1, 3, 5 );
        scene.add( dirLight );
        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 10000;
        dirLight.shadow.mapSize.height = 10000;

        const d = 30;
        dirLight.shadow.camera.left = - d;
        dirLight.shadow.camera.right = d;
        dirLight.shadow.camera.top = d;
        dirLight.shadow.camera.bottom = - d;

        dirLight.shadow.camera.far = 3500;
        dirLight.shadow.bias = - 0.00001;
    }


    function setCameraPosition(){
        camera.position.x = -25;
        camera.position.y = 15;
        camera.position.z = 50;
    }


    function createPunk() {
        var myPunk = getPunk("punk 120");
        scene.add(myPunk);
        setPunk(myPunk);
    }

    function createControls() {
        controls = new OrbitControls(camera, container);
        controls.target.set(0, 0, 0)
    }

    function createRenderer() {
        renderer = new THREE.WebGLRenderer({antialias: true, preserveDrawingBuffer: true });
        renderer.domElement.id = 'p3nkd-canvas';
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(150, 150);
        container.appendChild(renderer.domElement);
        renderer.shadowMap.enabled = true;
        renderer.castShadow = true;

        renderer.outputEncoding = THREE.LinearEncoding;
        // renderer.outputEncoding = THREE.sRGBEncoding;

    }

    var currentPunk;


    var i = 0;
    async function exportPunk() {
        punk.clear();

        setIsLoading(true);
        controls.reset();
        controls.target.set(0, 0, 0);
        setCameraPosition();
        controls.update();
        
        for (let index = 0; index < 3; index++) {
            await tooglePunk();
            i++;
        }
     
        setIsLoading(false);
    }



    async function tooglePunk() {
        scene.add(punks[i]);

        await Export.doExport(scene, renderer, punk.name, animatedRender)
        punks[i].clear();

    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function animatedRender() {
        requestAnimationFrame(animate);
        punk.rotation.y += Math.PI / 60;
        render();
    }

    function render() {
        renderer.render(scene, camera);
    }

    function animate() {
        requestAnimationFrame(animate);
        controls.update();
        render();
    }


    function refresh() {
        getXPunk() 
       }


    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>

            <Link to="/Viewer"> Viewer </Link>
            <Link to="/Neon"> Neon </Link>
            <div id="scene-container"></div>
            <div>
                {! isLoading &&
                    <button type="button" onClick={exportPunk}>EXPORT</button>
                }
                <button ref={myRefname} type="button" onClick={tooglePunk}>TOOGLE</button>
                <button type="button" onClick={refresh}>refresh</button>
            </div>
            <div style={{ display: "flex", flex: 1, flexDirection: "column", alignItems: "center" }}>

                {
                    punk.children.map(trait => {
                        return <div id={trait.id}>{trait.name}</div>
                    })
                }
            </div>
        </div>

    )
}

export default Scene;