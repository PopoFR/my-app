
import axios from 'axios'

export function Export(renderer){ 

    console.log(renderer )
    console.log("export");
    exportPreview(renderer)
}

function exportPreview(renderer){
    console.log("exportPreview");

    const strMime = "image/jpeg";
    const base64Image = renderer.domElement.toDataURL(strMime);
    console.log(base64Image);

    const file = dataURLtoFile(base64Image, 'P3nkD.jpg')

    const data = new FormData()
    data.append('file', file)

    axios.post("http://localhost:8000/upload", data, { 
        // receive two    parameter endpoint url ,form data
    })
    .then(res => { // then print response status
        console.log(res);
        console.log("punk uploaded");
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

//Usage example:
var file = dataURLtoFile('data:text/plain;base64,aGVsbG8gd29ybGQ=','hello.txt');
console.log(file);

export default Export;

