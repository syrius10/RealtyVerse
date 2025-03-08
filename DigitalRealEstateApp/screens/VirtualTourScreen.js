import React, { useEffect, useRef } from 'react';
import { View } from 'react-native';
import * as THREE from 'three';

const VirtualTourScreen = ({ route }) => {
  const { modelUrl } = route.params;
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    const loader = new THREE.GLTFLoader();
    loader.load(modelUrl, (gltf) => {
      scene.add(gltf.scene);
    });

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [modelUrl]);

  return <View ref={mountRef} style={{ flex: 1 }} />;
};

export default VirtualTourScreen;