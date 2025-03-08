import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import axios from 'axios';

const UpdateScreen = () => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/update');
        setUpdates(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUpdates();
  }, []);

  return (
    <ScrollView>
      <View>
        <Text>Updates</Text>
        {updates.map((update, index) => (
          <View key={index} style={{ marginBottom: 20 }}>
            <Text>{update.title}</Text>
            <Text>{update.description}</Text>
            <Text>Version: {update.version}</Text>
            <Text>Release Date: {new Date(update.releaseDate).toLocaleDateString()}</Text>
            <Text>Features:</Text>
            {update.features.map((feature, i) => (
              <Text key={i}>- {feature}</Text>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default UpdateScreen;