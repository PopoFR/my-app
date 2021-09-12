import React, { useEffect} from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as PunkFactory from "./punk/PunkFactory.js";
import * as Export from "../components/Export"; 
import { saveAs } from 'file-saver';

import { GUI } from 'three/examples/jsm/libs/dat.gui.module'

import * as Exporter from './exporter.js'
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter"

function Scene() {
    
    let 
    container,
    scene, 
    camera, 
    lights,
    controls, 
    renderer;

    useEffect(()=>{
        console.log("Scene: useEffect");

        init();

        return () => {
            // Callback to cleanup three js, cancel animationFrame, etc
        }
    },[]);

    function init(){
        container = document.querySelector("#scene-container");
        scene = new THREE.Scene();
        scene.name = "P3nkD";

        createCamera();
        createLights();
        createPunk();
        createControls();
        createPanel();
        createRenderer();
        takeScreenshot();

        renderer.setAnimationLoop(() => {
            update();
            render();
        });


    }

    function setOpacity(obj, opacity) {
        obj.traverse(child => {
          if (child instanceof THREE.Mesh) {
            child.material.opacity = opacity;
          }
        });
      }


    function decodeBase64Image(dataString) 
    {
      var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      var response = {};

      if (matches.length !== 3) 
      {
        return new Error('Invalid input string');
      }

      response.type = matches[1];
      response.data = new Buffer.from(matches[2], 'base64');

      return response;
    }

    function takeScreenshot(){
        // console.log("pouf")
        // console.log(scene);
        // var glass = scene.getObjectByName("glass01");
        // console.log(glass)
        // setOpacity(glass, 0.5);

        // glass.material = glass.material.clone();
        // glass.material.opacity = 0.5;
        // glass.material.transparent = true;



        //WORK
        // var canvas = document.getElementById("p3nkd-canvas");
        // canvas.toBlob(function(blob) {
        //     saveAs(blob, "pretty image.jpeg");
        // });
        // console.log(canvas);
        //FIN WORK

        
  
        // var imageBuffer = decodeBase64Image(base64Image);

        // fs.writeFile("out.png", imageBuffer.data,  
        //     function() 
        //     {
        //       console.log('DEBUG - feed:message: Saved to disk image attached by user:');
        //     });

         //base64Image is my image base64 string

        // const path = './';
        // const filename = 'test.jpeg';

        // const filepath = path+filename;
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
        PunkFactory.generatePunk(scene);
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
    
    async function exportGLTF() {

    }

    function doExport(){    
        Export.exportPreview(renderer);
        // Export.exportGLTF(scene);
        Exporter.download(scene);
    }

    function toogle(){
        doExport();
        // console.log(scene.toJSON())
        // var obj =  scene.getObjectByName("glass01");
        // PunkFactory.toogle(obj, scene, render);
        // scene.remove(obj)
    }


    function createRenderer(){
        renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});
        renderer.domElement.id = 'p3nkd-canvas';
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor( 0xffffff, 50);

        container.appendChild(renderer.domElement);
    }

    function update(){
    }

    const test  = () => {
        // Export(renderer);
    }
    function render(){
        renderer.render(scene, camera);
    }

    return (
        <div>
            {/* <button onClick={takeScreenshot}>press</button> */}
            <button onClick={toogle}>del</button>

        </div>
       
    )
}

export default Scene;