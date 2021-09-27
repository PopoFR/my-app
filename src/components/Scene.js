import React, { useEffect, useState } from "react";
import { AmbientLight } from 'three';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js'
import * as Export from "../components/Export";
import { TraitsGenerator } from "./punk/traits/TraitsGenerator.js"
import {getRandomPunk, getPunk} from './PunkFactory';

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
        createLights();
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

    }

    function createCamera() {

        var HEIGHT = window.innerHeight;
        var WIDTH = window.innerWidth;
        var windowHalfX = WIDTH / 2;
        var windowHalfY = HEIGHT / 2;
      
        var aspectRatio = WIDTH / HEIGHT;
        var fieldOfView = 50;
        var nearPlane = 1;
        var farPlane = 2000;
        camera = new THREE.PerspectiveCamera(
          fieldOfView,
          aspectRatio,
          nearPlane,
          farPlane
          );
        camera.position.x = 0;
        camera.position.y = -12;
        camera.position.z = 50;
        scene.add(camera);
    }

    function createLights() {
        const directionalLight = new THREE.DirectionalLight( 0xffffff, 0.6, 100 );
        const light = new THREE.HemisphereLight(0xffffff, 0xb3858c, 0.9);
     
        
        directionalLight.position.set( 8, 8, 2 );
        directionalLight.castShadow = true;
        
        directionalLight.shadow.mapSize.width = 512;  // default
        directionalLight.shadow.mapSize.height = 512; // default
        directionalLight.shadow.camera.near = 0.5;    // default
        directionalLight.shadow.camera.far = 500;

         
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
        controls.target.set(0, -12, 0)
        controls.update();
    }

    function createRenderer() {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.domElement.id = 'p3nkd-canvas';
        
        renderer.setPixelRatio( window.devicePixelRatio );
        
        renderer.setSize(800, 800);
        renderer.setClearColor(0xfafafa, 1);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMapEnabled = true;
        renderer.shadowMapSoft = true;

        renderer.shadowCameraNear = 1;
        renderer.shadowCameraFar = 500;
        renderer.shadowCameraFov = 60;

        renderer.shadowMapBias = 0.05;
        renderer.shadowMapDarkness = 1;
        renderer.shadowMapWidth = 512;
        renderer.shadowMapHeight = 512;
                container.appendChild(renderer.domElement);
    }

    async function exportPunk() {
        controls.reset();        
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
    function handleChange(e) {
        console.log('handleChange')
        // let newTraits = [];
        // // punk.children.forEach(trait => {
        // //     if (trait.name !== e.target.value) 
        // //     newTraits.push(trait);
        // // });

        // setT(t.push(e.target.value))
        // let traitsObject = getTraitO();

        // t.forEach(n=>{
        //     let i = traitsObject.findIndex(trait => trait.name === n);
        //     // console.log(n)

        //     // console.log(traitsObject.filter(traitObject=>traitObject.name === n).obj)
        // })

    }

    //TODO recuperer la position dans la liste. et gerer les couleur
    function onFocus(selectedTrait, typeTraitLibelle) {
        console.log('onfocus')

        // setCurrentOnchange(selectedTrait);
        // let newTraitsName = [{name: "", type: ""}];

        // punk.children.forEach(trait => {
        //     if (trait.name !== selectedTrait)
        //     newTraitsName.push({name: trait.name, type: typeTraitLibelle});
        // })

        // setT(newTraitsName)
        // console.log(newTraitsName)
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div id="scene-container"></div>
            <div>
                {punk.name}
                <div>
                    {!isLoading && 
                        <button type="button" onClick={exportPunk}>EXPORT</button>
                    }
                    <button type="button" onClick={tooglePunk}>TOOGLE</button>
                    <button type="button" onClick={refresh}>refresh</button>
                </div>
                <div>
                    <div>
                      {
                          punk.children.map(trait=>{
                              return <div id={trait.id}>{trait.name}</div>
                          })
                      }
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