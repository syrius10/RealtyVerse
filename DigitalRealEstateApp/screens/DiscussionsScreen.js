import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';

const DiscussionsScreen = ({ route, navigation }) => {
  const { forumId } = route.params;
  const [discussions, setDiscussions] = useState([]);

  useEffect(() => {
    const fetchDiscussions = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/forum/forums/${forumId}/discussions`);
        setDiscussions(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchDiscussions();
  }, [forumId]);

  return (
    <ScrollView>
      <View>
        <Text>Discussions</Text>
        {discussions.length > 0 ? (
          discussions.map((discussion) => (
            <TouchableOpacity key={discussion._id} onPress={() => navigation.navigate('DiscussionDetails', { discussionId: discussion._id })}>
              <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
                <Text style={{ fontSize: 18 }}>{discussion.title}</Text>
                <Text>{discussion.content}</Text>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No discussions available</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default DiscussionsScreen;