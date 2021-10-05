import React, { useEffect, useState } from "react";
import { AmbientLight } from 'three';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js'
import * as Export from "../components/Export";
import { TraitsGenerator } from "./punk/traits/TraitsGenerator.js"
import { getRandomPunk, getPunk } from './PunkFactory';

let
    container,
    camera,
    lights,
    controls,
    renderer;

const Scene = () => {

    const [scene, setScene] = useState(new THREE.Scene());
    const [punk, setPunk] = useState(new THREE.Group());
    const [isAnimate, setIsAnimate] = useState(true);
    const [typeTraits, setTypeTraits] = useState([]);
    const [t, setT] = useState([]);
    const [traits, setTraits] = useState([]);
    const [currentOnChange, setCurrentOnchange] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log("Scene: useEffect");
        init();
        return () => {
        }
    }, []);

    function init() {
        TraitsGenerator();
        createScene();
        createCamera();
        createWorld();
        createPunk();
        createControls();
        createRenderer();
        animate();

        // exportPunk();
        // render();
    }

    function createScene() {
        container = document.querySelector("#scene-container");
        scene.name = "P3nkD";
        scene.background = new THREE.Color().setHSL( 0.6, 0, 1 );
        scene.fog = new THREE.Fog( scene.background, 1, 5000 );
    }



    function createWorld() {

        // LIGHTS

        const hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.4 );
        hemiLight.color.setHSL( 0.6, 1, 0.6 );
        hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
        hemiLight.position.set( 0, 50, 0 );

        scene.add( hemiLight );

        const hemiLightHelper = new THREE.HemisphereLightHelper( hemiLight, 10 );
        scene.add( hemiLightHelper );

        //

        const dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
        dirLight.color.setHSL( 0.1, 1, 0.95 );
        dirLight.position.set(-0.1, 3, 5 );
        dirLight.position.multiplyScalar( 30 );
        scene.add( dirLight );

        dirLight.castShadow = true;
        dirLight.shadow.mapSize.width = 5000;
        dirLight.shadow.mapSize.height = 5000;
        const d = 50;

        dirLight.shadow.camera.left = - d;
        dirLight.shadow.camera.right = d;
        dirLight.shadow.camera.top = d;
        dirLight.shadow.camera.bottom = - d;

        dirLight.shadow.camera.far = 3500;
        dirLight.shadow.bias = - 0.00001;

        const dirLightHelper = new THREE.DirectionalLightHelper( dirLight, 10 );
        // scene.add( dirLightHelper );

        // GROUND

        const groundGeo = new THREE.PlaneGeometry( 10000, 10000 );
        const groundMat = new THREE.MeshLambertMaterial( { color: 0xffffff } );

        const ground = new THREE.Mesh( groundGeo, groundMat );
        ground.position.y = 0.5;
        ground.rotation.x = - Math.PI / 2;
        ground.receiveShadow = true;
        scene.add( ground );

        // SKYDOME

        const vertexShader = document.getElementById( 'vertexShader' ).textContent;
        const fragmentShader = document.getElementById( 'fragmentShader' ).textContent;
        const uniforms = {
            "topColor": { value: new THREE.Color( 0x0077ff ) },
            "bottomColor": { value: new THREE.Color( 0xffffff ) },
            "offset": { value: 33 },
            "exponent": { value: 0.6 }
        };
        uniforms[ "topColor" ].value.copy( hemiLight.color );

        scene.fog.color.copy( uniforms[ "bottomColor" ].value );

        const skyGeo = new THREE.SphereGeometry( 4000, 32, 15 );
        const skyMat = new THREE.ShaderMaterial( {
            uniforms: uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            side: THREE.BackSide
        } );

        const sky = new THREE.Mesh( skyGeo, skyMat );
        scene.add( sky );
    }


    function createCamera() {

        var aspectRatio = 1;
        var fieldOfView = 30;
        var nearPlane = 1;
        var farPlane = 5000;

        camera = new THREE.PerspectiveCamera(
            fieldOfView,
            aspectRatio,
            nearPlane,
            farPlane
        );
        setCameraPosition();
        scene.add(camera);
    }

    function setCameraPosition(){
        camera.position.x = -25;
        camera.position.y = 15;
        camera.position.z = 50;
    }


    function createLights() {

        const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
        hemiLight.color.setHSL(0.6, 1, 0.6);
        hemiLight.groundColor.setHSL(0.095, 1, 0.75);
        hemiLight.position.set(0, 50, 0);
        scene.add(hemiLight);



        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
        const light = new THREE.HemisphereLight(0xffffff, 0xb3858c, 0.9);
        directionalLight.position.set(0, 8, 2);
        scene.add(light);
        scene.add(directionalLight);
    }

    function createPunk() {
        var myPunk = getPunk("punk 120");
        scene.add(myPunk);
        setPunk(myPunk);
    }

    function createControls() {
        controls = new OrbitControls(camera, container);
        // controls.maxPolarAngle = 0.9 * Math.PI / 2;
        controls.target.set(0, 12, 0)
        controls.update();
    }

    function createRenderer() {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, preserveDrawingBuffer: true });
        renderer.domElement.id = 'p3nkd-canvas';
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(300, 300);
        renderer.setClearColor(0xa9e1ff, 1);
        container.appendChild(renderer.domElement);
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.shadowMap.enabled = true;


    }

    async function exportPunk() {
        controls.reset();
        controls.target.set(0, 12, 0);
        setCameraPosition();
        controls.update();

        setIsLoading(true);
        Export.doExport(scene, renderer, punk.name, animatedRender)
            .then(() => {
                setIsLoading(false);
            });
    }

    function animatedRender() {
        punk.rotation.y += Math.PI / 60;
        render();
    }

    function render() {
        renderer.render(scene, camera);
    }

    function animate() {
        if (isAnimate)
            requestAnimationFrame(animate);
        render();
    }

    function tooglePunk(e) {
        e.preventDefault()
        punk.clear();

        var newPunk = getRandomPunk();
        setPunk(newPunk);
        scene.add(newPunk);
    }

    function refresh() {
        console.log(punk)
    }


    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
            <div id="scene-container"></div>
            <div>
                {!isLoading &&
                    <button type="button" onClick={exportPunk}>EXPORT</button>
                }
                <button type="button" onClick={tooglePunk}>TOOGLE</button>
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