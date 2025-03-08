import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';

const FAQsScreen = () => {
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/support/faqs');
        setFaqs(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFaqs();
  }, []);

  return (
    <View>
      <Text>Frequently Asked Questions</Text>
      <FlatList
        data={faqs}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Text style={{ fontSize: 18 }}>{item.question}</Text>
            <Text>{item.answer}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default FAQsScreen;