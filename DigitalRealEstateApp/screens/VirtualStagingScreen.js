import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const VirtualStagingScreen = ({ route }) => {
  const { propertyId } = route.params;
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/virtual-staging/${propertyId}`);
        setImages(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchImages();
  }, [propertyId]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.uri);
    }
  };

  const uploadImage = async () => {
    let localUri = selectedImage;
    let filename = localUri.split('/').pop();

    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    let formData = new FormData();
    formData.append('image', { uri: localUri, name: filename, type });

    try {
      const res = await axios.post(`http://localhost:5000/api/virtual-staging/upload/${propertyId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setImages(res.data.virtualStagingImages);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ScrollView>
      <View>
        <Text>Virtual Staging</Text>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {selectedImage && <Image source={{ uri: selectedImage }} style={{ width: 200, height: 200 }} />}
        <Button title="Upload Image" onPress={uploadImage} />
        <View>
          {images.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={{ width: 200, height: 200, margin: 10 }} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default VirtualStagingScreen;