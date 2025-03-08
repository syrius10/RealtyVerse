import React, { useEffect } from 'react';

const ARVisualization = ({ property }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://aframe.io/releases/1.2.0/aframe.min.js';
    script.onload = () => {
      const arScript = document.createElement('script');
      arScript.src = 'https://cdn.rawgit.com/jeromeetienne/AR.js/master/aframe/build/aframe-ar.js';
      document.body.appendChild(arScript);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <a-scene embedded arjs='sourceType: webcam;'>
      <a-marker preset="hiro">
        <a-entity gltf-model={property.modelUrl} scale="0.5 0.5 0.5"></a-entity>
      </a-marker>
      <a-entity camera></a-entity>
    </a-scene>
  );
};

export default ARVisualization;