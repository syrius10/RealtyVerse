import React, { useState } from 'react';
import axios from 'axios';

const VirtualStaging = ({ propertyId }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState([]);

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const onFileUpload = async () => {
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const res = await axios.post(`/api/virtual-staging/upload/${propertyId}`, formData);
      setImages(res.data.virtualStagingImages);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchImages = async () => {
    try {
      const res = await axios.get(`/api/virtual-staging/${propertyId}`);
      setImages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useState(() => {
    fetchImages();
  }, [propertyId]);

  return (
    <div>
      <h2>Virtual Staging</h2>
      <input type="file" onChange={onFileChange} />
      <button onClick={onFileUpload}>Upload</button>
      <div>
        {images.map((image, index) => (
          <img key={index} src={image} alt="Virtual Staging" style={{ width: '200px', margin: '10px' }} />
        ))}
      </div>
    </div>
  );
};

export default VirtualStaging;