import React, { useEffect, useState } from "react";
import { AmbientLight } from 'three';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js'
import * as Export from "../components/Export";
import { TraitsGenerator } from "./punk/traits/TraitsGenerator.js"
import { getRandomPunk, getPunk } from './PunkFactory';
import {Menu, ColorMenu} from '../Menu';
import {Link} from "react-router-dom";
import {Viewer} from "./Viewer";
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';

import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';

import helveticaRegular from './punk/Neon 80s_Regular.json';

var camera, scene, renderer,
    geometry, material, mesh,clock,cubeSineDriver
    ,textGeo
    ,textTexture
    ,textMaterial
    ,text
    ,light  
    ,smokeTexture
    ,smokeGeo
    ,p
    ,smokeMaterial
    ,smokeParticles
    ,stats
    ,delta
    , controls
    ;
    let composer;


const Neon = () => {
   
    useEffect(() => {
        init();
        return () => {
        }
    }, []);

    function init() {
        initScene();
        animate(); 
    }

    

    function initScene() {

    
        renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
    
        scene = new THREE.Scene();
     
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.z = 1000;
        scene.add( camera );
     
        geometry = new THREE.BoxGeometry( 200, 200, 200 );
        material = new THREE.MeshLambertMaterial( { color: 0xaa6666, wireframe: false } );
        mesh = new THREE.Mesh( geometry, material );
        //scene.add( mesh );
        cubeSineDriver = 0;
     
        
        light = new THREE.DirectionalLight(0xffffff,0.5);
        light.position.set(-1,0,1);


        scene.add(light);
      
        smokeTexture = THREE.ImageUtils.loadTexture('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/Smoke-Element.png');
        smokeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, map: smokeTexture, transparent: true});
        smokeGeo = new THREE.PlaneGeometry(300,300);
        smokeParticles = [];
    
    
        for (p = 0; p < 150; p++) {
            var particle = new THREE.Mesh(smokeGeo,smokeMaterial);
            particle.position.set(Math.random()*500-250,Math.random()*500-250,Math.random()*1000-100);
            particle.rotation.z = Math.random() * 360;
            // scene.add(particle);
            smokeParticles.push(particle);
        }
     
        var container = document.querySelector("#neon-container");


    

        const boxWidth = 200;
        const boxHeight = 200;
        const boxDepth = 1000;
        const geometry2 = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
        const material2 = new THREE.MeshBasicMaterial({color: 0x44aa88});
        const material3 = new THREE.MeshBasicMaterial({color: 0xaa4466});

        const cube2 = new THREE.Mesh(geometry2, material2);
        const cube3 = new THREE.Mesh(geometry2, material3);


        cube2.position.x += 250;
        scene.add(cube2);
        scene.add(cube3);



        textGeo = new THREE.PlaneGeometry(300,300);
        THREE.ImageUtils.crossOrigin = ''; //Need this to pull in crossdomain images from AWS
        textTexture = THREE.ImageUtils.loadTexture('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/quickText.png');


        const tt = require('./punk/Neon 80s_Regular.json');

        console.log("helveticaRegular")

        console.log(helveticaRegular)
        console.log("helveticaRegular")



        var loader = new THREE.FontLoader(); 
        var myFont = loader.parse(helveticaRegular); 

        var textGeometry = new THREE.TextGeometry( 'Hello three.js!', { 
            font: myFont,
            size: 500,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 8,
            bevelOffset: 0,
            bevelSegments: 5 
        
        } ); 

      
           
           const material0 = new THREE.MeshBasicMaterial({color: 'red'});
           const mesh2 = new THREE.Mesh(textGeometry, material3);
           mesh.position.x += 250;

           scene.add(mesh2);
           console.log('foo');
    


        
        const params = {
            exposure: 1,
            bloomStrength: 1.5,
            bloomThreshold: 0,
            bloomRadius: 0
        };

       controls = new OrbitControls( camera, renderer.domElement );


        document.body.appendChild( renderer.domElement );

        const renderScene = new RenderPass( scene, camera );

				const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.5, 0.4, 0.85 );
				bloomPass.threshold = params.bloomThreshold;
				bloomPass.strength = params.bloomStrength;
				bloomPass.radius = params.bloomRadius;

				composer = new EffectComposer( renderer );
				composer.addPass( renderScene );
				composer.addPass( bloomPass );
                
     
    }


    function animate() {
        requestAnimationFrame( animate );
        // required if controls.enableDamping or controls.autoRotate are set to true
        controls.update();
        composer.render();
    }
     
     
    function evolveSmoke() {
        var sp = smokeParticles.length;
        while(sp--) {
            smokeParticles[sp].rotation.z += (delta * 0.2);
        }
    }
    
    function render() {
        controls.update();

        renderer.render( scene, camera );
     
    }



    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
            <Link to="/Viewer"> Viewer </Link>
            <Link to="/Neon"> Neon </Link>
            <div id="neon-container"></div>
        </div>

    )
}

export default Neon;