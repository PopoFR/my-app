import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter"
import axios from 'axios'


const url = 'http://localhost:8000/uploadFile';


export function download(scene) {
  const exporter = new GLTFExporter();
  exporter.parse(
    scene,
    function (arrayBuffer) {
      
      console.log(arrayBuffer)
      var fd = new FormData()
      fd.append('file', new Blob([arrayBuffer]))

      fetch(url, {
        method: 'POST',
        body: fd
      }).then(console.log)

      // saveArrayBuffer(arrayBuffer, 'scene.glb');
    },
    { binary: true }
  );
}

// function saveArrayBuffer(buffer, filename) {
//   save(new Blob([buffer], { type: 'application/octet-stream' }), filename);
// }

// const link = document.createElement('a');
// link.style.display = 'none';
// document.body.appendChild(link); // Firefox workaround, see #6594

// function save(blob, filename) {
//   link.href = URL.createObjectURL(blob);
//   link.download = filename;
//   link.click();

//   // URL.revokeObjectURL( url ); breaks Firefox...
// }