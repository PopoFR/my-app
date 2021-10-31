
import axios from 'axios'
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter"
import { GifWriter } from 'omggif'

export async function doExport(scene, renderer, name, animatedRender){
    return Promise.all([
        exportGLB(scene, name), 
        // exportJPG(renderer, name),
        // exportGif(animatedRender, name) 
    ])
}
export function getListGeneratedPunk(){
    const url = 'http://localhost:8000/getListGeneratedPunk';

    axios.get(url)
    .then(res => {
        console.log(res)
        console.log(res.data)
    })
}

async function updateJson(scene) {
    console.log("updateJson")
    const url = 'http://localhost:8000/updateJson';
    const filename = "test.json";
    await upload(url, new Blob([]), filename);
}


export async function uploadJson(json) {
    console.log("uploadJson")
    console.log(json)
    const url = 'http://localhost:8000/uploadJson';
    const filename = "NEW.json";
    await axios.post(url, json, {})
}

async function exportGLB(scene, name) {
    const filename = `${name}.glb`
    const url = 'http://localhost:8000/uploadGLB';
    const exporter = new GLTFExporter();

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

async function exportGif(animatedRender, name){
    console.log("exportGif")

    const filename = `${name}.gif`
    const url = "http://localhost:8000/uploadGIF";
    const canvas1 = document.getElementById( 'p3nkd-canvas' );
    const buffer = await generateGIF( canvas1, animatedRender, 4, 30 );
    const blob = new Blob( [ buffer ], { type: 'image/gif' } );

    await upload(url, blob, filename)
}


async function generateGIF(element, animatedRender, duration = 1, fps = 30) {

    const frames = duration * fps;

	const canvas = document.createElement( 'canvas' );
    canvas.width = element.width;
    canvas.height = element.height;

    const context = canvas.getContext( '2d' );

    const buffer = new Uint8Array( canvas.width * canvas.height * frames * 5 );
    const pixels = new Uint8Array( canvas.width * canvas.height );
    const writer = new GifWriter( buffer, canvas.width, canvas.height, { loop: 0 } );

    let current = 0;

    return new Promise( async function addFrame( resolve ) {

        animatedRender( current / frames );

        context.drawImage( element, 0, 0 );
        const data = context.getImageData( 0, 0, canvas.width, canvas.height ).data;

        const palette = [];

        for ( var j = 0, k = 0, jl = data.length; j < jl; j += 4, k ++ ) {

            const r = Math.floor( data[ j + 0 ] * 0.1 ) * 10;
            const g = Math.floor( data[ j + 1 ] * 0.1 ) * 10;
            const b = Math.floor( data[ j + 2 ] * 0.1 ) * 10;
            const color = r << 16 | g << 8 | b << 0;

            const index = palette.indexOf( color );

            if ( index === -1 ) {

                pixels[ k ] = palette.length;
                palette.push( color );

            } else {
                pixels[ k ] = index;
            }

        }

        // Force palette to be power of 2
        let powof2 = 1;
        while ( powof2 < palette.length ) powof2 <<= 1;
        palette.length = powof2;
        
        const delay = 100 / fps; // Delay in hundredths of a sec (100 = 1s)
        const options = { palette: new Uint32Array( palette ), delay: delay };
        writer.addFrame( 0, 0, canvas.width, canvas.height, pixels, options );

        current ++;

        // progress.value = current / frames;

        if ( current < frames ) {
            setTimeout(addFrame, 0, resolve);
        } else {
            resolve( buffer.subarray( 0, writer.end() ) );
        }
    } );

}


/// CA VIENT DE LA !!!!
async function upload(url, file, filename){
    console.log(`exporting ${filename}`);
    const data = new FormData();
    data.append('file', file, filename);

    axios.post(url, data, {})
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


