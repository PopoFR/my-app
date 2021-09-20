import React, { useEffect, useState} from "react";
import { AmbientLight } from 'three';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js'
import * as Export from "../components/Export"; 
import {TraitsGenerator} from "./punk/traits/TraitsGenerator.js"
import { generatePunk } from "./Punk.js";
import {getTraitsName, getTraitObject, getTraitO, Trait} from './Traits.js'

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
    useEffect(()=>{
        console.log("Scene: useEffect");
        init();
        return () => {
        }
    },[]);

    function init(){
        setTypeTraits(getTraitsName());
        setTraits(getTraitObject());

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
				scene.add( camera );
    }

    function createLights(){

        const pointLight = new THREE.PointLight( 0xffffff, 0.8);
        camera.add( pointLight );
    }

    function createPunk(){
        var myPunk = generatePunk(scene, "punk 120");
        setPunk(myPunk);

        // myPunk.traverse( function( node ) {
        //     if( node.material ) {
        //         node.material.opacity = 0.8;
        //         node.material.transparent = true;
        //     }
        // });
    }

    function createControls(){
        controls = new OrbitControls(camera, container);
        controls.target.set( 0, -12, 0 )
        controls.update();
    }

    function createPanel(){
        // const gui = new GUI({ width: 310 })
        // const cubeFolder = gui.addFolder('Customize')
        // var obj =  scene.getObjectByName("glass01");
    }
    
    function createRenderer(){
        renderer = new THREE.WebGLRenderer();
        renderer.domElement.id = 'p3nkd-canvas';
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( 800, 500 );
        renderer.setClearColor( 0xfafafa  , 1 ); 
        container.appendChild(renderer.domElement);
    }
    
    async function exportPunk(e){

        render();
        const name = 'P3nkD_xxxx';
        Export.doExport(scene, renderer, name, animatedRender)            
        .then((RES) => console.log(RES));
    }

    function animatedRender(){
        scene.rotation.y += Math.PI / 60;
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
        punk.clear();
        var myPunk = generatePunk(scene, "punk 121");
        setPunk(myPunk);
    }

    function addPunk(){
        createPunk();
        console.log(scene)
        render();
    }





    function handleChange(e){
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
    function onFocus(selectedTrait, typeTraitLibelle){
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
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <div id="scene-container"></div>
                <div>
                    {punk.name}
                <div>
                <button type="button" onClick={exportPunk}>EXPORT</button>
                <button type="button" onClick={tooglePunk}>TOOGLE</button>
                <button type="button" onClick={render}>refresh</button>
                </div>
                <div>
                    <div>
                        Punk: {punk.name}
                    </div>
                        <div>
                            My Traits: 
                        </div>
                    <div>
                        {typeTraits && typeTraits.map((typeTraitLibelle, typeTraitId) => 
                        <div key={typeTraitId}>
                            <span>{typeTraitLibelle}: </span>
                            <select onFocus = {()=>onFocus(punk.children[typeTraitId].name, typeTraitLibelle)} key={typeTraitId} onChange={handleChange}>
                                {traits[typeTraitId] && traits[typeTraitId].map((traitLibelle, traitId) => 
                                    <option selected={punk.children[typeTraitId].name == traitLibelle.name} key={traitId} value={traitLibelle.name}>{traitLibelle.name}</option>
                                )}
                            </select>
                        </div>
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