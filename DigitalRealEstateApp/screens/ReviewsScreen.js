import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';

const ReviewsScreen = ({ route }) => {
  const { propertyId } = route.params;
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/reviews/property/${propertyId}`);
        setReviews(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchReviews();
  }, [propertyId]);

  return (
    <View>
      <FlatList
        data={reviews}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View>
            <Text>Rating: {item.rating}</Text>
            <Text>{item.comment}</Text>
            {item.verified && <Text>Verified Purchase</Text>}
          </View>
        )}
      />
    </View>
  );
};

export default ReviewsScreen;