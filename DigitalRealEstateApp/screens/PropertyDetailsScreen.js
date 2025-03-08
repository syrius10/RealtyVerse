import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import axios from 'axios';

const PropertyDetailsScreen = ({ route, navigation }) => {
  const { propertyId } = route.params;
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/properties/${propertyId}`);
        setProperty(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProperty();
  }, [propertyId]);

  if (!property) {
    return <Text>Loading...</Text>;
  }

  const propertyUrl = `http://localhost:3000/property/${propertyId}`;

  return (
    <View>
      <Text>{property.title}</Text>
      <Text>{property.description}</Text>
      <Text>Price: ${property.price}</Text>
      <Button title="Chat with Agent" onPress={() => navigation.navigate('Chat', { agentId: property.agent })} />
      <Button title="Virtual Staging" onPress={() => navigation.navigate('VirtualStaging', { propertyId: property._id })} />
      <Button title="Share on Social Media" onPress={() => navigation.navigate('SocialShare', { url: propertyUrl })} />
      <Button title="View Partnerships" onPress={() => navigation.navigate('Partnership')} />
    </View>
  );
};

export default PropertyDetailsScreen;