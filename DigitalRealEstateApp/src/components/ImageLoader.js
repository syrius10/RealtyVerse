import React from 'react';
import { Image } from 'react-native';
import { CDN_URL } from '../config';

const ImageLoader = ({ src, style }) => {
  return <Image source={{ uri: `${CDN_URL}/${src}` }} style={style} />;
};

export default ImageLoader;