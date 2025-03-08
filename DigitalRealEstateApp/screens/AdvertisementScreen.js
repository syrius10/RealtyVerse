import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Linking } from 'react-native';
import axios from 'axios';

const AdvertisementScreen = () => {
  const [advertisements, setAdvertisements] = useState([]);

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/advertisement');
        setAdvertisements(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAdvertisements();
  }, []);

  return (
    <ScrollView>
      <View>
        <Text>Advertisements</Text>
        {advertisements.map((ad, index) => (
          <View key={index} style={{ marginBottom: 20 }}>
            <Image source={{ uri: ad.imageUrl }} style={{ width: '100%', height: 200 }} />
            <Text>{ad.title}</Text>
            <Text>{ad.description}</Text>
            <Text style={{ color: 'blue' }} onPress={() => Linking.openURL(ad.linkUrl)}>Learn More</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default AdvertisementScreen;