import React, { useEffect, useState } from "react";
import { AmbientLight } from 'three';
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js'
import * as Export from "../components/Export";
import { TraitsGenerator } from "./punk/traits/TraitsGenerator.js"
import { getRandomPunk, getPunk } from './PunkFactory';
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

        var group = new THREE.Group();

        renderer = new THREE.WebGLRenderer({antialias: true});
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
     


       const material2 = new THREE.MeshBasicMaterial({color: 0x44aa88});
        const material3 = new THREE.MeshBasicMaterial({color: 0xaa4466});
        const material4 = new THREE.MeshBasicMaterial({color: 0x7caa44});



        textGeo = new THREE.PlaneGeometry(300,300);
        THREE.ImageUtils.crossOrigin = ''; //Need this to pull in crossdomain images from AWS
        textTexture = THREE.ImageUtils.loadTexture('https://s3-us-west-2.amazonaws.com/s.cdpn.io/95637/quickText.png');

        var loader = new THREE.FontLoader(); 
        var myFont = loader.parse(helveticaRegular); 

        var textGeometry = new THREE.TextGeometry( 'x', { 
            font: myFont,
            size: 500,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 30,
            bevelSize: 10,
            bevelOffset: 0,
            bevelSegments: 10
        } ); 

        var textGeometry2 = new THREE.TextGeometry( 'o', { 
            font: myFont,
            size: 500,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 30,
            bevelSize: 10,
            bevelOffset: 0,
            bevelSegments: 10
        } ); 

        var textGeometry3 = new THREE.TextGeometry( 'z', { 
            font: myFont,
            size: 500,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 30,
            bevelSize: 10,
            bevelOffset: 0,
            bevelSegments: 10
        } ); 

           const meshX = new THREE.Mesh(textGeometry, material2);
           const meshO = new THREE.Mesh(textGeometry2, material3);
           const meshT = new THREE.Mesh(textGeometry3, material4);

           meshX.position.x = 350;
           meshO.position.x = 750;
           meshT.position.x = 1150;

           group.add(meshX)
           group.add(meshO)
           group.add(meshT)

           scene.add(group);
           console.log('foo');
    
        
        const params = {
            exposure: 1,
            bloomStrength: 1.5,
            bloomThreshold: 0,
            bloomRadius: 0
        };

       controls = new OrbitControls( camera, renderer.domElement );
       controls.autoRotate = false;
       controls.autoRotateSpeed = 30;
      controls.target = new THREE.Vector3(950, 0, 0); // what 

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