import { Link } from "react-router-dom"
import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as Export from "../components/Export";
import { getRandomPunk, getPunk } from '../components/PunkFactory';

let
    container,
    scene,
    camera,
    controls,
    renderer,
    loader,
    light0,
    light1,
    light2,
    INTERSECTED,
    pointer,
    raycaster
    ;
var onOffCubes = []

const Viewer = () => {


    const punkPath = './test.glb';
    const [isLoading, setIsLoading] = useState(false);
    const [punk, setPunk] = useState(new THREE.Group());

    const [clicked, setClicked] = useState(false)
    const [hovered, setHovered] = useState(false)

    useEffect(() => {
        createScene();
        createCamera();
        createLights();
        createControls();
        createRenderer();
        loadMesh();
    }, []);

    function createScene() {
        loader = new GLTFLoader();
        scene = new THREE.Scene();
        scene.name = "P3nkD";
        pointer = new THREE.Vector2();
        scene.background = new THREE.Color(0xcbdaef);
        container = document.querySelector("#viewer-container");

    }

    function createCamera() {
        camera = new THREE.PerspectiveCamera(30, 1, 1, 5000);
        setCameraPosition();
    }

    function setCameraPosition() {
        camera.position.x = -15;
        camera.position.y = 5;
        camera.position.z = 55;
    }

    const d = 30;

    function createLights() {
        light2 = new THREE.DirectionalLight(0xffffff, 1);
        light2.position.set(0.1, 3, -50);
        light2.castShadow = true;
        light2.shadow.mapSize.width = 3000;
        light2.shadow.mapSize.height = 3000;
        light2.shadow.camera.left = - d;
        light2.shadow.camera.right = d;
        light2.shadow.camera.top = d;
        light2.shadow.camera.bottom = - d;
        light2.shadow.camera.far = 3500;
        light2.shadow.bias = - 0.00001;

        light1 = new THREE.DirectionalLight(0xffffff, 0.4);
        light1.position.set(-25, 30, 50);
        light1.color.setHSL(0.6, 1, 0.6);
        light1.castShadow = true;
        light1.shadow.mapSize.width = 3000;
        light1.shadow.mapSize.height = 3000;
        light1.shadow.camera.left = - d;
        light1.shadow.camera.right = d;
        light1.shadow.camera.top = d;
        light1.shadow.camera.bottom = - d;
        light1.shadow.camera.far = 3500;
        light1.shadow.bias = - 0.00001;
        
        light0 = new THREE.DirectionalLight(0xffffff, 0.2);
        light0.position.set(10, 30, 50);
        light0.color.setHSL(0.6, 1, 0.6);
        light0.castShadow = true;
        light0.shadow.mapSize.width = 3000;
        light0.shadow.mapSize.height = 3000;
        light0.shadow.camera.left = - d;
        light0.shadow.camera.right = d;
        light0.shadow.camera.top = d;
        light0.shadow.camera.bottom = - d;
        light0.shadow.camera.far = 3500;
        light0.shadow.bias = - 0.00001;


        camera.add(light0);
        camera.add(light1);
        scene.add(light2);
        scene.add(camera)
    }

    function createControls() {
        controls = new OrbitControls(camera, container);
        controls.update();
    }

    function onPointerMove(event) {
        pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
        pointer.y = - (event.clientY / window.innerHeight) * 2 + 1.2;
        pointer.y = pointer.y
    }

    function onMouseOver(event) {
        document.body.style.cursor = 'grab'
    }

    function onMouseOut(event) {
        document.body.style.cursor = 'default'
    }


    function createRenderer() {
        raycaster = new THREE.Raycaster();
        document.addEventListener('mousemove', onPointerMove);

        renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
        renderer.domElement.id = 'p3nkd-canvas';
        renderer.shadowMap.enabled = true;
        renderer.castShadow = true;
        renderer.outputEncoding = THREE.LinearEncoding;
        renderer.setPixelRatio(devicePixelRatio);
        renderer.setSize(150, 150);
        container.appendChild(renderer.domElement);


        var canvas = document.querySelector("#p3nkd-canvas");
        canvas.addEventListener('mouseover', onMouseOver);
        canvas.addEventListener('mouseout', onMouseOut);

        // renderer.outputEncoding = THREE.sRGBEncoding;
    }

    function render() {

        // raycaster.setFromCamera( pointer, camera );
        // var obj = scene.getObjectByName( "punk_120" );
        // const intersects = raycaster.intersectObjects( onOffCubes, true );
        // if ( intersects.length > 0 ) {
        //     if ( INTERSECTED != intersects[ 0 ].object ) {

        //         if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
        //         INTERSECTED = intersects[ 0 ].object;
        //         INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
        //         INTERSECTED.material.emissive.setHex( 0xff0000 );
        //         document.body.style.cursor = 'grab'
        //         console.log("survol")
        //     }
        // } else {
        //     if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
        //     document.body.style.cursor = 'default'

        //     INTERSECTED = null;
        // }

        renderer.render(scene, camera);
    }

    function loadMesh() {
        loader.load(
            // resource URL
            punkPath,
            // called when the resource is loaded
            function (gltf) {
                // gltf.scene.castShadow = true;
                // scene.castShadow = true;

                // console.log(scene)
                // scene.children.forEach(element => {
                //     element.castShadow = true;

                // });
                scene.add(gltf.scene);

                gltf.scene.traverse(function (obj) {
                    if (obj.isLight) {

                    } else if (obj.isMesh) {
                        obj.castShadow = true
                        obj.receiveShadow = true
                        obj.material.metalness = 0
                        obj.material.roughness = 1
                        onOffCubes.push(obj);
                    }
                })

                setPunk(gltf.scene.children[1]);

                // punk.on('click', function(ev) {
                //     console.log("click")
                // });
                gltf.scene.children[1].position.y -= 10;
                gltf.scene.children[1].position.x += 1;
                animate();
            },
            // called while loading is progressing
            function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },
            // called when loading has errors
            function (error) {
                console.error(error)
                console.log('An error happened');
            }
        );
    }


    function animate() {
        requestAnimationFrame(animate);
        controls.autoRotate = false;
        controls.autoRotateSpeed = 30;
        controls.update();
        render();
    }

    function animatedRender() {
        controls.autoRotate = true;
        controls.update();
        render();
    }

    function tooglePunk(e) {
        e.preventDefault()
        punk.clear();
        var newPunk = getRandomPunk();
        newPunk.position.y -= 10;
        newPunk.position.x += 1;
        setPunk(newPunk);
        scene.add(newPunk);
    }

    async function exportPunk() {
        setIsLoading(true);
        controls.reset();
        setCameraPosition();
        controls.update();
        Export.doExport(scene, renderer, punk.name, animatedRender)
            .then(() => {
                setIsLoading(false);
            });
    }



    return (
        <>
            <Link to="/"> Home </Link>
            <div>
                {!isLoading &&
                    <button type="button" onClick={exportPunk}>EXPORT</button>
                }
                <button type="button" onClick={tooglePunk}>TOOGLE</button>
            </div>

            <div id="viewer-container"></div>
        </>
    )
}


export default Viewer;