import React, { useEffect} from "react";
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as fs from 'fs';
import * as PunkFactory from "./punk/PunkFactory.js";
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
        createRenderer();
        takeScreenshot();

        renderer.setAnimationLoop(() => {
            update();
            render();
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



        var strMime = "image/jpeg";
        var base64Image = renderer.domElement.toDataURL(strMime);
        var base64Code = base64Image.replace("data:image/jpeg;base64,", "");

        console.log(base64Code)
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

    function createRenderer(){
        renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setClearColor( 0xffffff, 50);

        container.appendChild(renderer.domElement);
    }

    function update(){
    }

    function render(){
         renderer.render(scene, camera);
    }

    return (
        <div/>
    )
}

export default Scene;