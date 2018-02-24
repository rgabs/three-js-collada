import * as THREE from 'three';
const colladaLoader = require('three-loaders-collada')(THREE);

const getTextures = () => {
  const textureLoader = new THREE.TextureLoader();
  const textureNames = ['DefaultMaterial_albedo.jpg','DefaultMaterial_albedo.jpg','DefaultMaterial_metallic.jpg'];
  return textureNames.map((tName)=> textureLoader.load(`assets/textures/${tName}`));
}

const getShoeModel = () => new Promise((resolve, reject) => {
  const Cloader = new THREE.ColladaLoader();
  const textures = getTextures();
  let index = 1;
  const addNode = (node) => {
    if (node.isMesh) {
      node.material.map = textures[index];
      index++ ;
    }
  }
  Cloader.load('assets/model.dae', (collada) => {
    collada.scene.scale.set(0.2, 0.2, 0.2);
    collada.scene.traverse(addNode);
    resolve(collada.scene);
  }, null, reject);
});

export default getShoeModel;
