import axios from 'axios'
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter"
import { GifWriter } from 'omggif'
import {NeuQuant} from '../script/NeuQuant'

export async function doExport(scene, renderer, name, animatedRender){
    return Promise.all([
        exportGLB(scene, name)
        ,exportJPG(renderer, name)
        // ,exportGif(animatedRender, name) 
    ])
}

async function updateJson(scene) {
    console.log("updateJson")
    const url = 'http://localhost:8000/updateJson';
    const filename = "test.json";
    await upload(url, new Blob([]), filename);
}

export async function uploadJson(json) {
    console.log("uploadJson")
    const url = 'http://localhost:8000/uploadJson';
    const filename = "NEW.json";
    await axios.post(url, json, {})
}

async function exportGLB(scene, name) {
    console.log(name)
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
    console.log(name)
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

    const canvas = document.createElement('canvas');
    canvas.width = element.width;
    canvas.height = element.height;

    const context = canvas.getContext('2d');

    const buffer = new Uint8Array(canvas.width * canvas.height * frames * 5);
    const pixels = new Uint8Array(canvas.width * canvas.height);
    const writer = new GifWriter(buffer, canvas.width, canvas.height, { loop: 0 });

    let current = 0;

    var thereAreTransparentPixels = false;

    var rgba2rgb = function (data, matte, transparent) {
        var pixels = [];
        var count = 0;
        var len = data.length;
        for (var i = 0; i < len; i += 4) {
            var r = data[i];
            var g = data[i + 1];
            var b = data[i + 2];
            var a = data[i + 3];
            if (transparent && a === 0) {
                // Use transparent color
                r = transparent[0];
                g = transparent[1];
                b = transparent[2];
                thereAreTransparentPixels = true;
            } else if (matte && a < 255) {
                // Use matte with "over" blend mode
                r = ((r * a + (matte[0] * (255 - a))) / 255) | 0;
                g = ((g * a + (matte[1] * (255 - a))) / 255) | 0;
                b = ((b * a + (matte[2] * (255 - a))) / 255) | 0;
            }
            pixels[count++] = r;
            pixels[count++] = g;
            pixels[count++] = b;
        }
        return pixels;
    };


    var rgb2num = function (palette) {
        var colors = [];
        var count = 0;
        var len = palette.length;
        for (var i = 0; i < len; i += 3) {
            colors[count++] = palette[i + 2] | (palette[i + 1] << 8) | (palette[i] << 16);
        }
        return colors;
    };


    return new Promise(async function addFrame(resolve) {

        var matte = [255, 255, 255];
        var transparent = false;

        animatedRender(current / frames);

        context.drawImage(element, 0, 0,);
        const data = context.getImageData(0, 0, canvas.width, canvas.height).data;

        var nqInPixels = rgba2rgb(data, matte, transparent);
        // console.log("nqInPixels")
        // console.log(nqInPixels)
        // console.log("nqInPixels")

        var len = nqInPixels.length;
        var nPix = len / 3;
        var map = [];
        var nq = new NeuQuant(nqInPixels, len, 10);
        // console.log("nq")
        // console.log(nq)
        // console.log("nq")

        // initialize quantizer
        var paletteRGB = nq.process(); // create reduced 
        
        // console.log("paletteRGB")
        // console.log(paletteRGB)
        // console.log("paletteRGB")

        var palette = rgb2num(paletteRGB);

        // console.log("palette")
        // console.log(palette)
        // console.log("palette")

        // Force palette to be power of 2


        var k = 0;
        for (var j = 0; j < nPix; j++) {
          var index = nq.map(nqInPixels[k++] & 0xff, nqInPixels[k++] & 0xff, nqInPixels[k++] & 0xff);
          // usedEntry[index] = true;
          map[j] = index;
        }
        
        const delay = 100 / fps; // Delay in hundredths of a sec (100 = 1s)

        const options = { palette: new Uint32Array(palette), delay: delay };
        writer.addFrame(0, 0, canvas.width, canvas.height, new Uint8Array( map ), options );

        current++;

        // progress.value = current / frames;

        if (current < frames) {
            setTimeout(addFrame, 0, resolve);
        } else {
            resolve(buffer.subarray(0, writer.end()));
        }
    });

}

async function upload(url, file, filename){
    console.log(`uploading ${filename}`);
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


