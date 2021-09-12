
import axios from 'axios'
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter"


export function exportGLTF(scene){
    console.log("exportFile");
    
    const url = 'http://localhost:8000/uploadFile';


    const exporter = new GLTFExporter();
    exporter.parse(scene, function (gltfJson) {
      console.log(gltfJson);
      const jsonString = JSON.stringify(gltfJson);
      console.log(jsonString);

    }, { binary: true});




    // var json =JSON.stringify(file);
    // console.log(json)
    // const requestMetadata = {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: data
    // };

    // fetch(recipeUrl, requestMetadata)
    //     .then(res => {
    //         console.log(res);
    //     });
}


// const res = await axios.post('https://httpbin.org/post', json, {
//   headers: {
//     // Overwrite Axios's automatically set Content-Type
//     'Content-Type': 'application/json'
//   }
// });

export function exportPreview(renderer){
    console.log("exportPreview");

    const strMime = "image/jpeg";
    const base64Image = renderer.domElement.toDataURL(strMime);
    console.log(base64Image);

    const file = dataURLtoFile(base64Image, 'P3nkD.jpg')

    const data = new FormData()
    data.append('file', file)

    axios.post("http://localhost:8000/uploadPreview", data, { 
        // receive two    parameter endpoint url ,form data
    })
    .then(res => { // then print response status
        console.log(`p3nk3d (preview) uploader server response: ${res.statusText}`);
    })
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


