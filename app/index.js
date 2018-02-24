/**
 * Application entry point
 */

import 'styles/index.css';

import * as THREE from 'three';
import ThreeOrbitControls from 'three-orbit-controls';
import getShoeModel from './getShoeModel';

let scene, renderer, camera;

const setControls = () => {
  const OrbitControls = ThreeOrbitControls(THREE)
  const controls = new OrbitControls( camera, renderer.domElement )
}

const setLights = (scene) => {
  const ambientLight = new THREE.AmbientLight( '#E3E0D8', 0.4 );
  scene.add( ambientLight );
  const directionalLight = new THREE.DirectionalLight( '#FFF', 0.8 );
  directionalLight.position.set( 0, 1, 0 );
  directionalLight.castShadow = true;
  scene.add( directionalLight );
}

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight);
}

const animate = () => {
	requestAnimationFrame( animate );
	scene.rotation.y += 0.005;
	renderer.render(scene, camera);
};

const init = () => {
  scene = new THREE.Scene();
  scene.background = new THREE.Color('#7A6C5B');
  renderer = new THREE.WebGLRenderer();
  camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.0001, 10000 );
  camera.position.z = 1;
  setLights(scene);
  setControls();
  getShoeModel().then((model) => scene.add(model));
  renderer.setSize( window.innerWidth, window.innerHeight );
  document.body.appendChild( renderer.domElement );
  animate();
  window.addEventListener( 'resize', onWindowResize, false );
}

init();
