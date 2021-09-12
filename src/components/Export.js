
import axios from 'axios'
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter"

export async function doExport(scene, renderer, name){
    return  Promise.all([exportGLB(scene, name), exportJPG(renderer, name)])
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function exportGLB(scene, name) {
    const filename = `${name}.glb`
    const url = 'http://localhost:8000/uploadGLB';
    const exporter = new GLTFExporter();

    //POSE PROBLEME VOIR COMMENT ASYNC CETTE PARTIE?
    exporter.parse(
        scene,
         async function (arrayBuffer) {
             await upload(url, new Blob([arrayBuffer]), filename);
        },
        { binary: true }
    );
}

async function exportJPG(renderer, name){

    const filename = `${name}.jpg`
    const url = "http://localhost:8000/uploadJPG";
    const strMime = "image/jpeg";
    const base64Image = renderer.domElement.toDataURL(strMime);
    const file = dataURLtoFile(base64Image, filename);

    await upload(url, file, filename)
}



/// CA VIENT DE LA !!!!
async function upload(url, file, filename){
    console.log(`exporting ${filename}`);

    const data = new FormData();
    data.append('file', file, filename);

    axios.post(url, data, {})
    .then ((res)=> {
        console.log(res)
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


