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
        scene.add( new THREE.GridHelper( 1000, 10, 0x888888, 0x444444 ) );
    }

    function createCamera() {

        var aspectRatio = 1;
        var fieldOfView = 30;
        var nearPlane = 1;
        var farPlane = 2000;
        camera = new THREE.PerspectiveCamera(
            fieldOfView,
            aspectRatio,
            nearPlane,
            farPlane
        );
        camera.position.x = 0;
        camera.position.y = 12;
        camera.position.z = 50;
        scene.add(camera);
    }

    function createLights() {
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
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.domElement.id = 'p3nkd-canvas';

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(150, 150);
        renderer.setClearColor(0xfafafa, 1);
        container.appendChild(renderer.domElement);
    }

    async function exportPunk() {
        controls.reset();
        controls.target.set(0, 12, 0)
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
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center",  flexWrap: "wrap", alignItems: "center" }}>
                <div id="scene-container"></div>
                <div>
                        {!isLoading &&
                            <button type="button" onClick={exportPunk}>EXPORT</button>
                        }
                        <button type="button" onClick={tooglePunk}>TOOGLE</button>
                        <button type="button" onClick={refresh}>refresh</button>
                </div>
                <div style={{ display: "flex", flex: 1,  flexDirection: "column", alignItems: "center"}}>
                    
                        {
                            punk.children.map(trait => {
                                return <div id={trait.id}>{trait.name}</div>
                            })
                        }
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