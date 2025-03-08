import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/properties');
        setProperties(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProperties();
  }, []);

  return (
    <View>
      <FlatList
        data={properties}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('PropertyDetails', { propertyId: item._id })}>
            <Text>{item.title}</Text>
            <Text>{item.description}</Text>
            <Text>Price: ${item.price}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;