import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Linking } from 'react-native';
import axios from 'axios';

const PartnershipScreen = () => {
  const [partnerships, setPartnerships] = useState([]);

  useEffect(() => {
    const fetchPartnerships = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/partnership');
        setPartnerships(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPartnerships();
  }, []);

  return (
    <ScrollView>
      <View>
        <Text>Partnerships</Text>
        {partnerships.map((partnership, index) => (
          <View key={index} style={{ marginBottom: 20 }}>
            <Image source={{ uri: partnership.imageUrl }} style={{ width: '100%', height: 200 }} />
            <Text>{partnership.name}</Text>
            <Text>{partnership.description}</Text>
            <Text style={{ color: 'blue' }} onPress={() => Linking.openURL(partnership.linkUrl)}>Learn More</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default PartnershipScreen;