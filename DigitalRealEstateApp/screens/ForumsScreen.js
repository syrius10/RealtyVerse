import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';

const ForumsScreen = ({ navigation }) => {
  const [forums, setForums] = useState([]);

  useEffect(() => {
    const fetchForums = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/forum/forums');
        setForums(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchForums();
  }, []);

  return (
    <ScrollView>
      <View>
        <Text>Forums</Text>
        {forums.length > 0 ? (
          forums.map((forum) => (
            <TouchableOpacity key={forum._id} onPress={() => navigation.navigate('Discussions', { forumId: forum._id })}>
              <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                <Text style={{ fontSize: 18 }}>{forum.title}</Text>
                <Text>{forum.description}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No forums available</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default ForumsScreen;