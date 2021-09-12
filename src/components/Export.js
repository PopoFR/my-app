
import axios from 'axios'
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter"

export function doExport(scene, renderer, name){
    exportGLB(scene, name)
    exportJPG(renderer, name)
}

function exportGLB(scene, name) {
    console.log("exportGLB");

    const filename = `${name}.glb`
    const url = 'http://localhost:8000/uploadGLB';
    const exporter = new GLTFExporter();

    exporter.parse(
        scene,
        function (arrayBuffer) {
            upload(url, new Blob([arrayBuffer]), filename);
        },
        { binary: true }
    );
}

function exportJPG(renderer, name){
    console.log("exportJPG");

    const filename = `${name}.jpg`
    const url = "http://localhost:8000/uploadJPG";
    const strMime = "image/jpeg";
    const base64Image = renderer.domElement.toDataURL(strMime);
    const file = dataURLtoFile(base64Image, filename);

    upload(url, file, filename)
}


function upload(url, file, filename){

    const data = new FormData();
    data.append('file', file, filename);

    axios.post(url, data, {})
    .then(res => {
        console.log(`server response: ${res.statusText}`);
    });
}

function dataURLtoFile(dataurl, filename) {
 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
}


