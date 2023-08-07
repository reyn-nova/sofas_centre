import * as THREE from 'three';
import CameraControls from 'https://cdn.jsdelivr.net/npm/camera-controls@2.7.0/+esm'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

export function setupCameraControls(scene, camera, renderer) {
    CameraControls.install({ THREE });
    const cameraControls = new CameraControls( camera, renderer.domElement );

    const clock = new THREE.Clock();

    applyCameraControlUpdate(clock, scene, camera, renderer, cameraControls);
}

function applyCameraControlUpdate (clock, scene, camera, renderer, cameraControls) {
    const delta = clock.getDelta();
    const hasControlsUpdated = cameraControls.update(delta);

    requestAnimationFrame(() => applyCameraControlUpdate(clock, scene, camera, renderer, cameraControls));

    // you can skip this condition to render though
    if ( hasControlsUpdated ) {
        renderer.render( scene, camera );
    }
}

export async function loadGLTF(path, scene, renderer, camera) {
    const loader = new GLTFLoader();

    await loader.load(
        path,
        function ( gltf ) {
            scene.add( gltf.scene );
            renderer.render(scene,camera);
        },
        function ( xhr ) {
            console.log( ( path + ' ' + xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened, load gltf failed' );
    
        }
    );
}